import { GameObj, Vec2 } from "kaplay"
import { GameState, scoreManager } from "../../../gamestate"
import { playSfx } from "../../../sound"
import { ROOT } from "../../../main"
import { bop, formatNumber, getPrice, getRandomDirection, getVariable, percentage, randomPos } from "../../utils"
import { addTooltip } from "../../additives"
import { allPowerupsInfo, powerupTypes, spawnPowerup } from "../../powerups"
import { isHoveringUpgrade, storeElements, storePitchJuice } from "./storeWin"
import { isAchievementUnlocked, unlockAchievement } from "../../unlockables/achievements"
import { hovereable, smartArea } from "../../hovers/hoverManaging"
import { WindowGameObj } from "../windows-api/windowManaging"

export let storeElementsInfo = {
	"clickersElement": { 
		gamestateKey: "clickers",
		basePrice: 25,
		percentageIncrease: 15
	},
	"cursorsElement": { 
		gamestateKey: "cursors",
		basePrice: 50,
		percentageIncrease: 20
	},
	"powerupsElement": { 
		gamestateKey: "stats.powerupsBoughtThisRun",
		basePrice: 50500,
		percentageIncrease: 110,
		unlockPrice: 10500
	},
}

/**
 * Increases price by ascension times
 * @param percentage must be between 0 and 1 (15 / 100 -> 0.15) 
 */
export function priceAscensionMultiplier(basePrice:number, percentage: number) {
	return basePrice + basePrice * (percentage * 1.5) * GameState.stats.timesAscended
} 

function addSmoke(winParent:any, btn:any) {
	let smoke = winParent.add([
		sprite("smoke"),
		pos(btn.pos.x - btn.width / 2, btn.pos.y - btn.height / 2),
		opacity(),
		anchor("center"),
		z(btn.z - 1),
		"smoke",
	])

	smoke.fadeIn(1)
	smoke.play("smoking")
	return smoke;
}

function isThereSmoke() {
	return get("smoke", { recursive: true }) ?? true
}

function regularStoreElement(winParent) {
	let thisElement = null

	let timer = 0;
	let minTime = 0.08
	let timeUntilAnotherBuy = 1.2
	let maxTime = 1.2
	let hold_timesBought = 0

	let downEvent = null;
	
	return {
		add() {
			thisElement = this

			thisElement.onMousePress("left", () => {
				if (allPowerupsInfo.isHoveringAPowerup == true) return
				if (thisElement.isBeingHovered == false) return
				if (!winParent.active) return
				
				if (isHoveringUpgrade) return
				if (!thisElement.isHovering()) return;
				if (GameState.score < thisElement.price) {
					thisElement.trigger("notEnoughMoney")
					return
				}
				
				downEvent = thisElement.onMouseDown(() => {
					thisElement.isBeingClicked = true
					if (GameState.score < thisElement.price) return
			
					if (hold_timesBought == 0) {
						timeUntilAnotherBuy = maxTime
					}
			
					timer += dt()
			
					timeUntilAnotherBuy = maxTime / (hold_timesBought)
					timeUntilAnotherBuy = clamp(timeUntilAnotherBuy, minTime, maxTime)
			
					if (hold_timesBought == 0) {
						hold_timesBought = 1
						thisElement.buy(amountToBuy)
					}
			
					if (timer > timeUntilAnotherBuy) {
						timer = 0
						hold_timesBought++	
						thisElement.buy(amountToBuy)
						this.timesBoughtConsecutively++
					}
				})
			})
		
			thisElement.onMouseRelease(() => {
				if (allPowerupsInfo.isHoveringAPowerup == true) return
				if (!winParent.active) return
				
				downEvent?.cancel()
				downEvent = null
		
				if (!thisElement.isHovering()) return
				thisElement.isBeingClicked = false
				
				timer = 0
				hold_timesBought = 0
				timeUntilAnotherBuy = 2.25
			})
		
			thisElement.on("endHover", () => {
				timer = 0
				hold_timesBought = 0
			})
		},
	}
}

function lockedPowerupStoreElement(winParent:GameObj) {
	let thisElement = null;
	let progressSound = null;

	const unlockPrice = storeElementsInfo.powerupsElement.unlockPrice
	return {
		id: "lockedPowerupStoreElement",
		chains: null,
		boughtProgress: 0,
		
		dropUnlock() {
			tween(thisElement.boughtProgress, 0, 0.15, (p) => thisElement.boughtProgress = p)
			tween(this.scale, vec2(1.025), 0.15, (p) => this.scale = p, easings.easeOutQuad)
			tween(thisElement.chains.opacity, 1, 0.15, (p) => thisElement.chains.opacity = p, easings.easeOutQuad)
		},

		add() {
			thisElement = this
		
			thisElement.chains = thisElement.add([
				sprite("chains"),
				pos(),
				anchor("center"),
				opacity(1),
			])

			thisElement.onDraw(() => {
				drawRect({
					width: thisElement.width,
					height: map(thisElement.boughtProgress, 0, 100, thisElement.height, 0),
					anchor: "bot",
					color: BLACK,
					pos: vec2(0, thisElement.height / 2),
					radius: 5,
					opacity: 0.8,
				})
			})
	
			let downEvent = null;
			thisElement.onMousePress("left", () => {
				if (allPowerupsInfo.isHoveringAPowerup == true) return
				if (thisElement.isBeingHovered == false) return
				if (!winParent.active) return
			
				downEvent?.cancel()
				if (!thisElement.isHovering()) return;

				if (GameState.score < thisElement.price) {
					thisElement.trigger("notEnoughMoney")
					return
				}

				progressSound = playSfx("progress")

				downEvent = thisElement.onMouseDown("left", () => {
					if (thisElement.isBeingHovered == false) return
					
					if (thisElement.boughtProgress < 100) {
						thisElement.boughtProgress += 1.5
						thisElement.scale.x = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9)
						thisElement.scale.y = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9)
						thisElement.chains.opacity = map(thisElement.boughtProgress, 0, 100, 1, 0.25)
						progressSound.detune = thisElement.boughtProgress * 1.1
					}
		
					if (thisElement.boughtProgress >= 100 && !GameState.hasUnlockedPowerups) {
						thisElement.unlock()
					}
				})
			})
	
			thisElement.onMouseRelease("left", () => {
				if (allPowerupsInfo.isHoveringAPowerup == true) return
				if (!winParent.active) return
			
				if (!thisElement.isHovering()) return;
	
				thisElement.dropUnlock()
				if (thisElement.boughtProgress > 0) {
				}
				
				else {
					if (GameState.score >= this.price) bop(thisElement)
				}

				progressSound?.seek(1)
			})
		},

		unlock() {
			GameState.hasUnlockedPowerups = true
			playSfx("kaching")
			playSfx("chainbreak")
			
			let copyOfOld = thisElement
			
			thisElement.destroy()
			let newElement = addStoreElement(winParent, { type: "powerupsElement", pos: thisElement.pos })
			
			// update the new powerup store element
			let index = storeElements.indexOf(copyOfOld)
			if (index > -1) storeElements[index] = newElement 
			
			ROOT.trigger("powerupunlock")
			scoreManager.subTweenScore(unlockPrice)
		},
	}
}

let buyTimer = null // this is for the smoke stuff
let amountToBuy = 1
type storeElementOpt = {
	type: "clickersElement" | "cursorsElement" | "powerupsElement",
	pos: Vec2,
}

export function addStoreElement(winParent:WindowGameObj, opts:storeElementOpt) {
	const btn = winParent.add([
		sprite(opts.type),
		pos(opts.pos),
		smartArea(),
		color(),
		opacity(1),
		scale(1),
		anchor("center"),
		z(winParent.z + 1),
		hovereable(0),
		"storeElement",
		`${opts.type}`,
		{
			price: 0,
			isBeingClicked: false,
			down: false,
			timesBoughtConsecutively: 0,
			buy(amount:number) {
				if (winParent.dragging) return
				
				GameState[storeElementsInfo[opts.type].gamestateKey] += amount

				storePitchJuice.hasBoughtRecently = true;
				storePitchJuice.timeSinceBought = 0;
				if (storePitchJuice.hasBoughtRecently == true) storePitchJuice.storeTune += 25;
				storePitchJuice.storeTune = clamp(storePitchJuice.storeTune, -100, 500)
				playSfx("kaching", { detune: storePitchJuice.storeTune })
				
				scoreManager.subTweenScore(this.price)

				if (this.isBeingClicked) {
					this.play("down")
					this.get("*").forEach(element => {
						element.pos.y += 2
					});
					wait(0.15, () => {
						this.play("up")
						this.get("*").forEach(element => {
							element.pos.y -= 2
						});
					})
				}

				this.timesBoughtConsecutively++ 
				buyTimer?.cancel()
				buyTimer = wait(0.75, () => {
					this.timesBoughtConsecutively = 0
					
					// if there's smoke
					let smoke = get("smoke", { recursive: true })[0]
					if (smoke) {
						smoke.unuse("smoke")
						smoke.fadeOut(1)
						tween(smoke.pos.y, smoke.pos.y - 15, 0.5, (p) => smoke.pos.y = p)
					}
				})

				if (this.timesBoughtConsecutively >= 5 && !isThereSmoke()) {
					addSmoke(winParent, this)
				}

				ROOT.trigger("buy", { element: "storeElement", type: opts.type == "clickersElement" ? "clickers" : "cursors", price: this.price })
			
				if (opts.type == "powerupsElement") {
					spawnPowerup({
						type: "random",
						pos: randomPos(),
						natural: false,
					})
					GameState.stats.powerupsBought++
					GameState.stats.powerupsBoughtThisRun++
				}

				if (this.timesBoughtConsecutively >= 10 && !isAchievementUnlocked("store.stuffBought_10")) unlockAchievement("store.stuffBought_10") 
				
				this.trigger("buy")
			},
		}
	])

	btn.clickIndex = btn.parent.clickIndex

	// # EVENTS
	let tooltip = null;
	if (opts.type == "powerupsElement" && GameState.hasUnlockedPowerups == false) {
		btn.use(lockedPowerupStoreElement(winParent))
		tooltip = addTooltip(btn, {
			text: `${formatNumber(btn.price, { price: true })}`,
			direction: "down",
			lerpValue: 1,
			layer: winParent.layer,
			z: winParent.z,
			type: "store",
		})

		const greenPrice = GREEN.lighten(30)
		const redPrice = RED.lighten(30) 

		tooltip.tooltipText.onUpdate(() => {
			if (GameState.score >= storeElementsInfo.powerupsElement.unlockPrice) tooltip.tooltipText.color = greenPrice
			else tooltip.tooltipText.color = redPrice  

			tooltip.tooltipText.text = formatNumber(btn.price, { price: true })
		})
	}

	else btn.use(regularStoreElement(winParent))
	
	// update
	btn.onUpdate(() => {
		// sets amountToBuy
		if (isKeyDown("shift")) amountToBuy = 10 // this could be moved to storeWin
		else amountToBuy = 1

		// area
		if (opts.type == "powerupsElement" && GameState.hasUnlockedPowerups == false) {
			btn.price = priceAscensionMultiplier(storeElementsInfo.powerupsElement.unlockPrice, storeElementsInfo.powerupsElement.percentageIncrease / 100)
		}

		else {
			const amountBought = getVariable(GameState, storeElementsInfo[opts.type].gamestateKey) 
	
			let priceMultiplier = 1
			if (opts.type != "powerupsElement") priceMultiplier = powerupTypes.store.multiplier
			
			// price
			const elementInfo = storeElementsInfo[opts.type]
			btn.price = getPrice({
				basePrice: priceAscensionMultiplier(elementInfo.basePrice, elementInfo.percentageIncrease / 100),
				percentageIncrease: elementInfo.percentageIncrease,
				objectAmount: amountBought,
				amountToBuy: opts.type == "powerupsElement" ? 1 : amountToBuy,
				gifted: opts.type == "clickersElement" ? 1 : 0
			}) * priceMultiplier
		}
	})

	btn.onUpdate(() => {
		// btn.area.scale = btn.area.scale.invRotate()
		
		if (btn.isHovering()) {
			btn.scale = lerp(btn.scale, vec2(1.025), 0.25)
		}
		
		else {
			btn.scale = lerp(btn.scale, vec2(1), 0.25)
			if (btn.isBeingClicked == true) btn.isBeingClicked = false
		}
	})

	// # Other objects
	let stacksText = btn.add([
		text("Stacked upgrades: 0", {
			size: 14,
			align: "left",
		}),
		anchor("left"),
		pos(-155, 24),
		color(BLACK),
		z(btn.z + 1),
		"stacksText",
		{
			update() {
				if (opts.type == "clickersElement") {
					let percentage = `(+${GameState.clickPercentage}%)`
					let stuff = [
						`Stacked upgrades: ${GameState.clicksUpgradesValue == 1 ? GameState.clicksUpgradesValue - 1: GameState.clicksUpgradesValue}`,
						`${GameState.clickPercentage < 1 ? "" : percentage}`
					]

					this.text = stuff.join(" ")
				}

				else if (opts.type == "cursorsElement") {
					let percentage = `(+${GameState.cursorsPercentage}%)`
					let stuff = [
						`Stacked upgrades: ${GameState.cursorsUpgradesValue == 1 ? GameState.cursorsUpgradesValue - 1: GameState.cursorsUpgradesValue}`,
						`${GameState.clickPercentage < 1 ? "" : percentage}`
					]

					this.text = stuff.join(" ")
				}

				else if (opts.type == "powerupsElement") this.destroy()
			}
		}
	])

	let priceText = btn.add([
		text("$50", {
			size: 18,
			align: "center",
		}),
		anchor("center"),
		pos(-100, stacksText.pos.y + 15),
		color(BLACK),
		rotate(0),
		z(btn.z + 1),
		{
			update() {
				this.text = `${formatNumber(Math.round(btn.price), { price: true, fixAmount: 2 })}`
				if (GameState.score >= btn.price) this.color = GREEN
				else this.color = RED
			
				if (opts.type == "powerupsElement") {
					if (GameState.hasUnlockedPowerups == false) this.destroy()
					else this.pos = vec2(-5, 41) 
				}
			}
		}
	])

	let amountText = btn.add([
		text("x1", {
			size: 18,
			align: "left",
		}),
		anchor("center"),
		pos(-159, -52),
		color(BLACK),
		opacity(0.25),
		z(btn.z + 1),
		{
			update() {
				this.text = "x" + amountToBuy
				if (amountToBuy == 10) this.opacity = 0.45
				else this.opacity = 0.252
				
				if (opts.type == "powerupsElement") this.destroy()
			}
		}
	])

	if (opts.type == "powerupsElement") {
		let powerupText = btn.add([
			text("x1", {
				size: 18,
				align: "left",
			}),
			anchor("center"),
			pos(-139, -52),
			color(BLACK),
			opacity(0.45),
			z(btn.z + 1),
			{
				update() {
					if (GameState.hasUnlockedPowerups == false) this.destroy() 
					GameState.powerupPower = parseFloat(GameState.powerupPower.toFixed(1))
					this.text = `Power: ${GameState.powerupPower}x`
				}
			}
		])
	}

	btn.on("notEnoughMoney", () => {
		// opts.pos is the position it was added to
		const direction = getRandomDirection(opts.pos, false, 1.25)
		tween(direction, opts.pos, 0.25, (p) => btn.pos = p, easings.easeOutQuint)
		
		if (btn.is("lockedPowerupStoreElement")) {
			tween(choose([-15, 15]), 0, 0.25, (p) => tooltip.tooltipText.angle = p, easings.easeOutQuint)
			playSfx("chainwrong", { detune: rand(-50, 50) })
		}
		
		else {
			tween(choose([-15, 15]), 0, 0.25, (p) => priceText.angle = p, easings.easeOutQuint)
		}

		playSfx("wrong", { detune: rand(-50, 50) })
	})

	btn.on("buy", () => {
		// if i check the price here it just gets the one before the buy
	})

	return btn;
}