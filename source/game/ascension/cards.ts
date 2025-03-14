import { GameObj, Vec2 } from "kaplay"
import { getPrice, getVariable, setVariable } from "../utils"
import { GameState } from "../../gamestate"
import { addLeaveButton, ascension, leaveButtonSpawnAnim } from "./ascension"
import { ROOT } from "../../main"
import { playSfx } from "../../sound"
import { windowKey } from "../windows/windows-api/windowManaging"
import { isWindowUnlocked, unlockWindow } from "../unlockables/windowUnlocks"
import { talk } from "./dialogues"
import { hoverController } from "../../hoverManaging"

let cardsInfo = {
	"clickersCard": { 
		info: "Clickers are +[number]% more efficient",
		basePrice: 1,
		percentageIncrease: 80,
		idx: 0,
		gamestateInfo: {
			key: "clickPercentage",
			objectAmount: "ascension.clickPercentagesBought"
		}
	},
	"cursorsCard": { 
		info: "Cursors are +[number]% more efficient",
		basePrice: 1,
		percentageIncrease: 110,
		idx: 1,
		gamestateInfo: {
			key: "cursorsPercentage",
			objectAmount: "ascension.cursorsPercentagesBought"
		}
	},
	"powerupsCard": { 
		info: "Powerups will be +[number]x more powerful",
		basePrice: 4,
		percentageIncrease: 75,
		idx: 2,
		gamestateInfo: {
			key: "powerupPower",
			objectAmount: "ascension.powerupPowersBought"
		}
	},
	"critsCard": {
		info: "Criticals will be +[number]x more powerful",
		basePrice: 5,
		percentageIncrease: 90,
		idx: 3,
		gamestateInfo: {
			key: "critPower",
			objectAmount: "ascension.critPowersBought"
		}
	},
	"hexColorCard": { 
		info: "You can customize the hexagon's color",
		unlockPrice: 5,
		idx: 4,
	},
	"bgColorCard": { 
		info: "You can customize the background's color",
		unlockPrice: 5,
		idx: 5,
	},
}

function cardTypes() {
	return Object.keys(cardsInfo).sort((a, b) => cardsInfo[a].idx - cardsInfo[b].idx)
}

type card = keyof typeof cardsInfo

let cardYPositions = {
	hidden: 691,
	/**
	 * The position they are when they're stacked
	 */
	dealing: 341,
	unhovered: 544,
	hovered: 524,
}

/**
 * Gets a random additive value based on the card type
 * @returns the additive  
 */
function getAdditive(type:card) {
	let additive:number

	if (type == "clickersCard" || type == "cursorsCard") {
		additive = randi(8, 12)
	}

	else if (type == "powerupsCard") {
		additive = rand(0.1, 0.6)
	}

	else if (type == "critsCard") {
		if (GameState.ascension.critPowersBought == 0) additive = 1
		else additive = rand(0.1, 0.25)
	}

	else if (type == "hexColorCard" || type == "bgColorCard") {
		additive = 0
	}

	additive = parseFloat(additive.toFixed(1))

	return additive;
}

// clickersCard -> card_clickers
const typeToSprite = (type:card | string) => `card_${type.replace("Card", "")}`    

function flipCard(card:GameObj, newType:card | string) {
	let flipOneSideTime = 0.075
	
	// turn it to middle
	card.area.scale = vec2(0)
	tween(1, 0, flipOneSideTime, (p) => card.scale.x = p).onEnd(() => {
		card.type = newType as card
		card.typeIdx = cardsInfo[card.type as string].idx
		card.additive = getAdditive(card.type as card)
		card.sprite = typeToSprite(card.type)
		
		tween(0, 1, flipOneSideTime, (p) => card.scale.x = p).onEnd(() => {
			card.area.scale = vec2(1)
			card.trigger("flip")
		})
	})
}

function addCard(cardType:string | card, position: Vec2) {
	
	const card = add([
		// starts at backcard
		sprite("backcard"),
		pos(position),
		rotate(0),
		layer("ascension"),
		z(6),
		scale(),
		anchor("center"),
		area(),
		"card",
		{
			indexInDeck: 0, // 1 - 4 / 1 being leftmost
			price: 1,
			type: cardType,
			typeIdx: cardsInfo[cardType].idx as number,
			additive: getAdditive(cardType as card),
			buy() {
				tween(0.75, 1, 0.15, (p) => this.scale.y = p, easings.easeOutQuart)
			
				// unlock color window
				if (this.type == "hexColorCard" || this.type == "bgColorCard") {
					let oldType = this.type // get it before it changes
					flipCard(card, cardTypes()[this.typeIdx - 2])

					let endascensioncheck = ROOT.on("endAscension", () => {
						wait(1, () => {
							unlockWindow(oldType.replace("Card", "Win") as windowKey)
						})
						endascensioncheck.cancel()
					})
				}

				// add percentages
				else {
					if (this.type == "critsCard" && GameState.ascension.critPowersBought == 0) {
						GameState.critPower = 1
						GameState.ascension.critPowersBought = 1
					}

					else {
						// actually add the stuff LOL!
						let currentPercentage = getVariable(GameState, cardsInfo[this.type].gamestateInfo.key)
						let percentagesBought = getVariable(GameState, cardsInfo[this.type].gamestateInfo.objectAmount)
	
						// add the actual percentage
						setVariable(GameState, cardsInfo[this.type].gamestateInfo.key, currentPercentage + this.additive)
						// set the percentagesBought
						setVariable(GameState, cardsInfo[this.type].gamestateInfo.objectAmount, percentagesBought + 1)
					}

					// get new additive
					this.additive = getAdditive(this.type as card)
					this.trigger("startHover") // talk , don't do this at home, code from kaplay
				}

				function subMana(amount:number) {
					tween(GameState.ascension.mana, GameState.ascension.mana - amount, 0.32, (p) => GameState.ascension.mana = Math.round(p), easings.easeOutExpo)
				}

				subMana(this.price)
				playSfx("kaching", { detune: rand(-50, 50) })
				if (ascension.canLeave == false) {ascension.canLeave = true; ROOT.trigger("canLeaveAscension")}
			},

			startHover() {
				tween(this.pos.y, cardYPositions.hovered, 0.25, (p) => this.pos.y = p, easings.easeOutQuart)
				tween(this.angle, choose([-1.5, 1.5]), 0.25, (p) => this.angle = p, easings.easeOutQuart)
	
				let message:string = "";
	
				if (this.type == "critsCard" && GameState.ascension.critPowersBought == 0) {
					message = "When you click, you will have a random chance of getting more score per click"
				}
	
				else {
					// it adds the % on the info message
					message = cardsInfo[this.type].info.replace("[number]", this.additive)
					if (!(this.type == "hexColorCard" || this.type == "bgColorCard")) {
						let currentGot = getVariable(GameState, cardsInfo[this.type].gamestateInfo.key)
						currentGot = parseFloat(currentGot.toFixed(1))
						
						if (this.type == "powerupsCard" || this.type == "critsCard") {
							message += ` (Current power: ${currentGot}x)`
						}
						
						else {
							message += ` (You have: ${currentGot}%)`
						}
					}
				}
	
				talk("card", message)
				playSfx("onecard", { detune: rand(-75, 75) * this.indexInDeck })
			},

			drawInspect() {
				drawText({
					text: `deck: ${this.indexInDeck}\ntype: ${this.typeIdx} - ${this.type}`,
					pos: vec2(0, -this.height),
					anchor: "center",
					size: 25,
					color: WHITE
				})
			}
		}
	])

	card.onUpdate(() => {
		// sets price
		if (!(card.type == "hexColorCard" || card.type == "bgColorCard")) {
			let objectAmount = getVariable(GameState, cardsInfo[card.type].gamestateInfo.objectAmount)

			card.price = getPrice({
				basePrice: cardsInfo[card.type].basePrice,
				percentageIncrease: cardsInfo[card.type].percentageIncrease,
				objectAmount: objectAmount
			})
		}

		else {
			card.price = cardsInfo[card.type].unlockPrice
		}
	})

	card.on("dealingOver", () => {
		card.onHover(() => {
			card.startHover()
		})

		card.onHoverEnd(() => {
			tween(card.pos.y, cardYPositions.unhovered, 0.25, (p) => card.pos.y = p, easings.easeOutQuart)
		})

		card.onClick(() => {
			if (GameState.ascension.mana >= card.price) card.buy()
			else {
				tween(0.75, 1, 0.15, (p) => card.scale.x = p, easings.easeOutQuart)
			}
		})

		const greenPrice = GREEN.lighten(30)
		const redPrice = RED.lighten(30) 
		card.onDraw(() => {
			drawText({
				text: `${card.price}✦`,
				align: "center",
				anchor: "center",
				pos: vec2(0, 35),
				size: 26,
				scale: card.scale,
				color: GameState.ascension.mana >= card.price ? greenPrice : redPrice
			})

			if (!(card.type == "hexColorCard" || card.type == "bgColorCard")) {
				drawText({
					text: `+${card.additive}%`,
					size: 15,
					color: BLACK,
					align: "left",
					pos: vec2(-59, -82)
				})
			}
		})
	})

	return card;
}

// is the part where they're dealt and send to their corresponding positions
// in deck
export function spawnCards() {
	const cardSpacing = 150;
	
	// from left to right
	let cardsToAdd = [
		"clickersCard",
		"cursorsCard",
		!isWindowUnlocked("hexColorWin") ? "hexColorCard" : "powerupsCard",
		!isWindowUnlocked("bgColorWin") ? "bgColorCard" : "critsCard"
	]

	// now add the cards
	let dealingXPosition = 947;
	playSfx("allcards", { detune: rand(-25, 25) })
	cardsToAdd.forEach((cardToAdd, index) => {
		let theCard = addCard(cardToAdd, vec2(dealingXPosition, cardYPositions.hidden))
		theCard.angle = rand(-4, 4)
		theCard.pos.x = dealingXPosition + rand(-5, 5)
		theCard.pos.y = cardYPositions.hidden
		theCard.indexInDeck = index

		// put it in the dealing position
		let randOffset = rand(-5, 5)
		tween(theCard.pos.y, cardYPositions.dealing + randOffset, 0.75, (p) => theCard.pos.y = p, easings.easeOutQuint)

		function dealTheCards() {
			// now, deal them to them places
			wait(0.25 * theCard.indexInDeck, () => {
				function getCardXPos(index:number) {
					let startPoint = 492
					return (startPoint + cardSpacing) + cardSpacing * (index - 1);
				}

				playSfx("onecard", { detune: rand(-25, 25) * theCard.indexInDeck})
				tween(theCard.angle, rand(-1.5, 1.5), 0.25, (p) => theCard.angle = p, easings.easeOutQuart)
			
				// pos
				tween(theCard.pos.x, getCardXPos(theCard.indexInDeck), 0.25, (p) => theCard.pos.x = p, easings.easeOutQuart)
				tween(theCard.pos.y, cardYPositions.unhovered, 0.25, (p) => theCard.pos.y = p, easings.easeOutQuart)
				
				// turn it over
				tween(theCard.scale.x, 0, 0.25, (p) => theCard.scale.x = p, easings.easeOutQuart).onEnd(() => {
					theCard.sprite = typeToSprite(theCard.type)
					
					tween(theCard.scale.x, 1, 0.25, (p) => theCard.scale.x = p, easings.easeOutQuart).onEnd(() => {
						theCard.area.scale = vec2(1)
						theCard.trigger("dealingOver")

						if (GameState.stats.timesAscended > 0) {
							if (theCard.indexInDeck == 3) {
								let button = addLeaveButton()
								leaveButtonSpawnAnim(button)
							}
						}
					})
				})
			})
		}

		// wait
		wait(0.75, () => {
			dealTheCards()
		})
	})
}
