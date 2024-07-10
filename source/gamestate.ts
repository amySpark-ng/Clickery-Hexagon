import { saveAnim } from "./game/utils"

export let GameState = {
	score: 0,
	totalScore: 0,
	mana: 0,

	clickers: 0,
	clicksUpgradesValue: 0, // multiplier for clicks
	clickPercentage: 0, // percentage added

	cursors: 0,
	cursorsUpgradesValue: 0, // multiplier for cursors
	cursorsPercentage: 0, // percentage added
	timeUntilAutoLoopEnds: 10, // cursor frequency

	upgradesBought: ["c_0"],
	
	hasUnlockedPowerups: false,
	powerupsBought: 0,
	powerupsFrequency: 120,
	powerupsChance: 0.1,
	powerupsPower: 0,
	
	achievementMultiplierPercentage: 0,
	generalUpgrades: 1, // general multiplier

	ascendLevel: 0,

	unlockedAchievements: [],

	unlockedWindows: [],
	taskbar: [],

	stats: {
		timesClicked: 0,
		powerupsClicked: 0,
		timesAscended: 0,
		totalTimePlayed: 0,
	},

	settings: {
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
	},

	save(anim = true) {
		if (anim) {
			setData("hexagon-save", this)
			saveAnim()
			
		}
		else {
			setData("hexagon-save", this)
		}
	},

	load() {
		let gottenData = getData("hexagon-save") 
		if (gottenData) {
			Object.assign(this, gottenData)
		}
		else {
			// no data????
		}
	},

	delete() {
		localStorage.removeItem("hexagon-save")
		Object.assign(this, this)
		go("gamescene")
	},

	cheat() {
		this.score = 1000000
		this.totalScore = 1000000
		this.scoreMultiplier = 500
		this.cursors = 500
	},

	addScore(amount) {
		this.score += amount
		this.totalScore += amount
	},

	setScore(amount) {
		this.score = amount
		this.totalScore = amount
	},
}
