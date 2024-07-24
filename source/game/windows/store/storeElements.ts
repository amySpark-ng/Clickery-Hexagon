import { GameObj, Vec2 } from "kaplay"
import { GameState, scoreManager } from "../../../gamestate"
import { playSfx } from "../../../sound"
import { ROOT } from "../../../main"
import { bop, formatNumber, getPrice, randomPos, randomPowerup } from "../../utils"
import { addTooltip } from "../../additives"
import { powerupTypes, spawnPowerup } from "../../powerups"
import { isHoveringUpgrade, storeElements, storePitchJuice } from "./storeWindows"

export let storeElementsInfo = {
	"clickersElement": { 
		gamestateKey: "clickers",
		basePrice: 25,
		percentageIncrease: 15
	},
	"cursorsElement": { 
		gamestateKey: "cursors",
		basePrice: 50,
		percentageIncrease: 25
	},
	"powerupsElement": { 
		gamestateKey: "powerupsBought",
		basePrice: 10500,
		percentageIncrease: 180,
		unlockPrice: 10100
	},
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
				if (!winParent.active) return
				
				if (isHoveringUpgrade) return
				if (!thisElement.isHovering()) return;
				if (GameState.score < thisElement.price) return;
		
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
					}
				})
			})
		
			thisElement.onMouseRelease(() => {
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
				if (!winParent.active) return
			
				downEvent?.cancel()
				if (!thisElement.isHovering()) return;

				if (GameState.score < storeElementsInfo.powerupsElement.unlockPrice) {
					bop(thisElement)
					return;
				} 

				downEvent = thisElement.onMouseDown("left", () => {
					if (thisElement.boughtProgress < 100) {
						thisElement.boughtProgress += 1.5
						thisElement.scale.x = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9)
						thisElement.scale.y = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9)
						thisElement.chains.opacity = map(thisElement.boughtProgress, 0, 100, 1, 0.25)
					}
		
					if (thisElement.boughtProgress >= 100 && !GameState.hasUnlockedPowerups) {
						thisElement.unlock()
					}
				})
			})
	
			thisElement.onMouseRelease("left", () => {
				if (!winParent.active) return
			
				if (!thisElement.isHovering()) return;
	
				thisElement.dropUnlock()
			})
		},

		unlock() {
			GameState.hasUnlockedPowerups = true
			playSfx("kaching")
			let copyOfOld = thisElement
			
			thisElement.destroy()
			let newElement = addStoreElement(winParent, { type: "powerupsElement", pos: thisElement.pos })
			
			// update the new powerup store element
			let index = storeElements.indexOf(copyOfOld)
			if (index > -1) storeElements[index] = newElement 
			
			ROOT.trigger("powerupunlock")
			scoreManager.subScore(storeElementsInfo.powerupsElement.unlockPrice)
		},
	}
}

let buyTimer = null // this is for the smoke stuff
let amountToBuy = 1
type storeElementOpt = {
	type: "clickersElement" | "cursorsElement" | "powerupsElement",
	pos: Vec2,
}

export function addStoreElement(winParent:any, opts:storeElementOpt) {
	const btn = winParent.add([
		sprite(opts.type),
		pos(opts.pos),
		area(),
		color(),
		opacity(1),
		scale(1),
		anchor("center"),
		z(winParent.z + 1),
		"hoverObj",
		"storeElement",
		`${opts.type}`,
		{
			price: 0,
			isBeingHovered: false,
			isBeingClicked: false,
			down: false,
			timesBoughtConsecutively: 0,
			buy(amount:number) {
				if (winParent.dragging) return
				
				GameState[storeElementsInfo[opts.type].gamestateKey] += amount
				scoreManager.subScore(this.price)

				storePitchJuice.hasBoughtRecently = true;
				storePitchJuice.timeSinceBought = 0;
				if (storePitchJuice.hasBoughtRecently == true) storePitchJuice.storeTune += 25;
				storePitchJuice.storeTune = clamp(storePitchJuice.storeTune, -100, 500)
				playSfx("kaching", { detune: storePitchJuice.storeTune })
				
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

				if (this.timesBoughtConsecutively < 6) this.timesBoughtConsecutively++ 
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

				if (this.timesBoughtConsecutively == 5) {
					addSmoke(winParent, this)
				}
				ROOT.trigger("buy", { element: "storeElement", type: opts.type == "clickersElement" ? "clickers" : "cursors", price: this.price })
			
				if (opts.type == "powerupsElement") {
					spawnPowerup({
						pos: randomPos(),
						type: randomPowerup(),
					})
					GameState.powerupsBought++
				}
			},

			startHover() {
				tween(this.scale, vec2(1.025), 0.15, (p) => this.scale = p, easings.easeOutQuad)
				this.isBeingHovered = true
			},

			endHover() {
				tween(this.scale, vec2(1), 0.15, (p) => this.scale = p, easings.easeOutQuad)
				this.isBeingHovered = false
				this.trigger("endHover")
			},
		}
	])

	// # EVENTS
	// add the tooltip
	if (opts.type == "powerupsElement") {
		let tooltip = addTooltip(btn, {
			text: `${formatNumber(btn.price)}`,
			direction: "down",
			lerpValue: 0.9
		})

		tooltip.tooltipText.onUpdate(() => {
			tooltip.tooltipText.text = `${formatNumber(btn.price, { price: true })}`
			if (GameState.score >= btn.price) tooltip.tooltipText.color = GREEN
			else tooltip.tooltipText.color = RED
		})

		btn.onDestroy(() => {
			tooltip.end()
		})

		if (GameState.hasUnlockedPowerups == false) btn.use(lockedPowerupStoreElement(winParent))
		else btn.use(regularStoreElement(winParent))
	}

	else btn.use(regularStoreElement(winParent))

	// update
	btn.onUpdate(() => {
		// sets amountToBuy
		if (isKeyDown("shift")) amountToBuy = 10
		else amountToBuy = 1

		// price
		if (opts.type == "clickersElement" || opts.type == "cursorsElement") {
			const elementInfo = storeElementsInfo[opts.type]
			btn.price = getPrice({
				basePrice: elementInfo.basePrice,
				percentageIncrease: elementInfo.percentageIncrease,
				objectAmount: GameState[elementInfo.gamestateKey],
				amountToBuy: amountToBuy,
				gifted: opts.type == "clickersElement" ? 1 : 0
			}) * powerupTypes.store.multiplier
		}

		else if (opts.type == "powerupsElement") {
			if (!GameState.hasUnlockedPowerups) btn.price = storeElementsInfo.powerupsElement.unlockPrice
			else {
				const elementInfo = storeElementsInfo.powerupsElement
				btn.price = getPrice({
					basePrice: elementInfo.basePrice,
					percentageIncrease: elementInfo.percentageIncrease,
					objectAmount: GameState[elementInfo.gamestateKey],
					amountToBuy: 1
				}) * powerupTypes.store.multiplier
			}
		}

		// area
		btn.area.scale = vec2(1 / btn.scale.x, 1 / btn.scale.y)
	})

	// ### HOVERS
	btn.onHover(() => {
		if (!winParent.active) return
		
		btn.startHover()
	})

	btn.onHoverEnd(() => {
		if (!winParent.active) return
		if (btn.isBeingClicked) btn.isBeingClicked = false
		btn.endHover()
	})

	// # Other objects
	let stacksText = btn.add([
		text("Stacked upgrades: 0", {
			size: 14,
		}),
		anchor("center"),
		pos(-100, 24),
		color(BLACK),
		z(btn.z + 1),
		"stacksText",
		{
			update() {
				if (opts.type == "clickersElement") {
					this.text = `Stacked upgrades: ${GameState.clicksUpgradesValue == 1 ? GameState.clicksUpgradesValue - 1: GameState.clicksUpgradesValue}`
				}

				else if (opts.type == "cursorsElement") {
					this.text = `Stacked upgrades: ${GameState.cursorsUpgradesValue == 1 ? GameState.cursorsUpgradesValue - 1: GameState.cursorsUpgradesValue}`
				}

				else if (opts.type == "powerupsElement") this.destroy()
			}
		}
	])

	let priceText = btn.add([
		text("$50", {
			size: 18,
		}),
		anchor("center"),
		pos(stacksText.pos.x - 5, stacksText.pos.y + 15),
		color(BLACK),
		z(btn.z + 1),
		{
			update() {
				this.text = `${formatNumber(Math.round(btn.price), { price: true, fixAmount: 2 })}`
				if (GameState.score >= btn.price) this.color = GREEN
				else this.color = RED
			
				if (opts.type == "powerupsElement") this.destroy()
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

	return btn;
}