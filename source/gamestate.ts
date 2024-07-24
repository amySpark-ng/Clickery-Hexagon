import { clickVars } from "./game/hexagon"
import { powerupTypes } from "./game/powerups"
import { percentage, saveAnim } from "./game/utils"
import { musicHandler, sfxHandler } from "./sound"

class _GameState {	
	score = 0
	scoreThisRun = 0
	scoreAllTime = 0
	mana = 0

	clickers = 1
	clicksUpgradesValue = 1 // multiplier for clicks
	clickPercentage = 0 // percentage added

	cursors = 0
	cursorsUpgradesValue = 1 // multiplier for cursors
	cursorsPercentage = 0 // percentage added
	timeUntilAutoLoopEnds = 10 // cursor frequency

	upgradesBought = ["c_0"]
	
	hasUnlockedPowerups = false
	powerupsBought = 0
	powerupsFrequency = 120
	powerupsChance = 0.1
	powerupsPower = 0
	
	achievementMultiplierPercentage = 0
	generalUpgrades = 1 // general multiplier

	timesAscended = 0

	unlockedAchievements = []

	unlockedWindows = []
	taskbar = []

	stats = {
		timesClicked: 0,
		powerupsClicked: 0,
		timesAscended: 0,
		totalTimePlayed: 0,
	}

	settings = {
		sfx: { volume: 1, muted: false },
		music: { volume: 1, muted: false, favoriteIdx: 0 },
		volume: 1,
		hexColor: [255, 255, 255],
		bgColor: [0, 0, 0, 0.84],
		keepAudioOnTabChange: true,
		dropDragsOnMouseOut: true,
		commaInsteadOfDot: false,
		fullscreen: false,
		panderitoMode: false,
		spsTextMode: 1,
	}

	save(anim = true) {
		setData("hexagon-save", this)
		if (anim) saveAnim()
	}

	load() {
		let gottenData = getData("hexagon-save") 
		if (gottenData) {
			Object.assign(this, gottenData)
		}
		else {
			gottenData = new _GameState();
		}
		return gottenData;
	}

	delete() {
		let oldvolume = this.settings.volume
		
		// remove data
		localStorage.removeItem("hexagon-save")
		Object.assign(this, new _GameState())

		musicHandler?.stop()
		sfxHandler?.stop()
		this.settings.volume = oldvolume
		
		go("gamescene")
	}

	cheat() {
		this.clickers = 500
		this.cursors = 500
	}
}

export let GameState = new _GameState()

class _scoreManager {
	// score per click (no combo or powerups or percentage)
	scorePerClick_Vanilla = () => {
		return Math.round(GameState.clickers * GameState.clicksUpgradesValue)
	}

	// score per click
	scorePerClick = () => {
		let vanillaValue = this.scorePerClick_Vanilla()
		let noPercentage = (vanillaValue * powerupTypes.clicks.multiplier * this.combo)
		let returnValue = noPercentage + percentage(GameState.clickPercentage, noPercentage)
		return Math.round(returnValue)
	}

	// score per cursor click (not including powerups or percentages)
	scorePerAutoClick_Vanilla = () => {
		return Math.round(GameState.cursors * GameState.cursorsUpgradesValue)
	}

	// score per cursor click
	scorePerAutoClick = () => {
		let noPercentage = GameState.cursors * GameState.clicksUpgradesValue * powerupTypes.cursors.multiplier
		let returnValue = noPercentage + percentage(GameState.cursorsPercentage, noPercentage)
		return Math.round(returnValue)
	}

	// the score per second you're getting by cursors
	// no rounding because can be decimal (0.1)
	autoScorePerSecond = () => {
		let returnValue = this.scorePerAutoClick() / GameState.timeUntilAutoLoopEnds
		return returnValue
	}

	// the general score per second clicks and all
	// no rounding because can be decimal (0.1)
	scorePerSecond = () => {
		return (clickVars.clicksPerSecond * this.scorePerClick()) + this.autoScorePerSecond()
	}

	scoreNeededToAscend = 1000000
	combo = 1

	addScore(amount:number) {
		GameState.score += amount
		GameState.scoreThisRun += amount
		GameState.scoreAllTime += amount
	}

	// used usually when buying
	subScore(amount:number) {
		// GameState.score -= amount
		tween(GameState.score, GameState.score - amount, 0.32, (p) => GameState.score = p, easings.easeOutExpo)
	}

	addTweenScore(amount:number) {
		tween(GameState.score, GameState.score + amount, 0.32, (p) => GameState.score = p, easings.easeOutExpo)
	}

	resetScoreBcAscend() {
		// GameState.score = 0
		// GameState.scoreThisRun = 0
		tween(GameState.score, 0, 0.32, (p) => GameState.score = p, easings.easeOutCirc)
		tween(GameState.scoreThisRun, 0, 0.32, (p) => GameState.scoreThisRun = p, easings.easeOutCirc)
	}
}

export let scoreManager = new _scoreManager()