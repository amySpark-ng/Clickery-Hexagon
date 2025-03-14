import { GameState, scoreManager } from "../gamestate.ts"
import { addHexagon, hexagon } from "./hexagon.ts"
import { buildingsText, scoreText, spsText, uiCounters } from "./uicounters.ts"
import { coolSetFullscreen, debugFunctions, formatNumber, formatTime, randomPos, runInTauri, saveColorToColor, toggleTheFullscreen } from "./utils.ts"
import { addToast, gameBg, mouse } from "./additives.ts"
import { musicHandler, playMusic, playSfx, stopAllSounds } from "../sound.ts"
import { songs } from "./windows/musicWindow.ts"
import { appWindow, DEBUG, GAME_VERSION, ROOT } from "../main.ts"
import { allPowerupsInfo, Powerup_NaturalSpawnManager, Powerup_RemovalTimeManager, spawnPowerup } from "./powerups.ts"
import { checkForUnlockable, isAchievementUnlocked, unlockAchievement } from "./unlockables/achievements.ts"
import { ascension } from "./ascension/ascension.ts"
import { folderObj, addFolderObj } from "./windows/windows-api/folderObj.ts"
import { curDraggin } from "./plugins/drag.ts"
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { ngEnabled, postEverything } from "../newgrounds.ts"
import { drawDumbOutline } from "./plugins/drawThings.ts"
import { allObjWindows } from "./windows/windows-api/windowManaging.ts"
import ng from "newgrounds.js"
import { hoverManaging } from "../hoverManaging.ts"

let panderitoLetters = "panderito".split("")
export let panderitoIndex = 0

let isTabActive = true; // Variable to track if the tab is currently active
let totalTimeOutsideTab = 0; // Variable to store the total time the user has been outside of the tab ; Miliseconds
let startTimeOutsideTab:DOMHighResTimeStamp; // Variable to store the start time when the tab becomes inactive
export let excessTime = 0; // Time that has passed after autoLoopTime

export let autoLoopTime = 0;

let idleWaiter:any;
let sleeping = false;
let timeSlept = 0;

export let cam = null;

export function togglePanderito() {
	GameState.settings.panderitoMode = !GameState.settings.panderitoMode
	panderitoIndex = 0

	if (!isAchievementUnlocked("panderitomode")) {
		unlockAchievement("extra.panderito")
	}

	let block = add([
		rect(width(), 100),
		pos(center()),
		anchor("center"),
		opacity(0.5),
		color(BLACK),
		layer("mouse"),
		z(mouse.z - 2),
	])

	let panderitoText = add([
		text(`Panderito mode: ${GameState.settings.panderitoMode ? "ACTIVATED" : "DEACTIVATED"}`, {
			size: 26,
			font: 'emulogic',
		}),
		pos(center()),
		anchor("center"),
		layer("mouse"),
		z(mouse.z - 1),
		opacity(1),
	])

	wait(0.8, () => {
		tween(0.5, 0, 0.5, (p) => block.opacity = p, )
		tween(1, 0, 0.5, (p) => panderitoText.opacity = p, )
		wait(0.5, () => {
			destroy(panderitoText)
			destroy(block)
		})
	})

	if (GameState.settings.panderitoMode) {
		hexagon.use(sprite("panderito"))
	}
	
	else {
		hexagon.use(sprite("hexagon"))
	}

	GameState.save(false)
}

/**
 * Takes this amount of seconds to be considered "asleep"
 */
const TIME_FOR_SLEEP = 60

// idle means the game was open but the player stoped moving
function triggerZZZ(playerInactivity = true) {
	if (playerInactivity) sleeping = true
	
	let black = add([
		rect(width(), height()),
		pos(center()),
		anchor("center"),
		color(BLACK),
		layer("mouse"),
		z(mouse.z - 2),
		opacity(1),
	])
	if (playerInactivity) black.fadeIn(0.5)

	let sleepyText = add([
		text("Z Z Z . . . ", {
			size: 90,
			font: "lambda",
			transform: (idx) => ({
				pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
				scale: wave(1, 1.2, time() * 3 + idx),
				angle: wave(-9, 9, time() * 3 + idx),
			}),
		}),
		z(mouse.z - 1),
		layer("mouse"),
		anchor("center"),
		pos(center()),
		opacity(1),
	])
	if (playerInactivity) sleepyText.fadeIn(0.5)

	let events:any[];
	function wakeUp() {
		sleeping = false
		wait(0.5, () => {
			black.fadeOut(0.5)
			sleepyText.fadeOut(0.5).onEnd(() => {
				black?.destroy()
				sleepyText?.destroy()
				if (playerInactivity) welcomeBack(true)
			})
		})
		events?.forEach(event => {
			event.cancel()
		});
	}

	if (playerInactivity) {
		let mouse = onMouseMove(() => wakeUp())
		let click = onClick(() => wakeUp())
		let key = onKeyPress(() => wakeUp())
		events = [mouse, click, key]
	}

	else wakeUp()
}

function welcomeBack(idle = false) {
	let timeSinceLeave = 0
	let scoreGained = 0

	function addWelcomeBackToast(score:any, timeInSeconds:number) {
		
		let body = `You were out for: ${formatTime(timeInSeconds, true)}`; 
		if (score != null) body += `\n+${formatNumber(score)}` 
		
		let hasCombo = scoreManager.combo > 1
		let hasPowerup = get("putimer")?.length > 0
		let applicationMessage = ""
		
		if (hasCombo) applicationMessage += `\n(Combo is not applicable)`
		else if (hasPowerup) applicationMessage += "\n(Power-ups are not applicable)"
		else if (hasCombo && hasPowerup) applicationMessage += "\n(Combo nor Power-ups are applicable)"
		body += applicationMessage

		let toast = addToast({ icon: "welcomeBackIcon", title: "Welcome back!", body: body, type: "welcome" })
	
		if (GameState.hasUnlockedPowerups == true) {
			// if you left for this seconds there's a 10% chance you get a powerup
			if (timeInSeconds > TIME_FOR_SLEEP) {
				if (chance(0.1)) spawnPowerup({ type: "random" })
			}
		}

		return toast;
	}

	if (idle == false) {
		timeSinceLeave = totalTimeOutsideTab / 1000

		autoLoopTime += totalTimeOutsideTab / 1000
		excessTime = autoLoopTime - GameState.timeUntilAutoLoopEnds
		let gainedScore = 0
		if (excessTime >= 0) {
			gainedScore = Math.floor(excessTime / GameState.timeUntilAutoLoopEnds); // can't add scorePerAutoClick here bc
			excessTime -= GameState.timeUntilAutoLoopEnds * gainedScore // I use it before to shave off the extra time
			// actual gainedScore
			gainedScore = gainedScore * scoreManager.scorePerAutoClick(false)
			scoreManager.addTweenScore(gainedScore)
			
			scoreGained = gainedScore // this is for the log
		}
	}

	else {
		timeSinceLeave = timeSlept
		if (GameState.cursors < 1 || ascension.ascending == true) {addWelcomeBackToast(null, timeSlept); return;}
		
		// SECONDS FOR LOG
		if (timeSlept > 60) {
			timeSlept = 0
		}

		scoreGained = Math.round(scoreManager.autoScorePerSecond() * timeSinceLeave) // this is for the log
		// don't add no score because it is aded in the loop
	}

	// now add the toast
	let welcomebacktoasts = get("toast").filter(t => t.type == "welcome")
	
	// if time since leave is greater than 10 seconds and there's already a log
	// it means the player came back, but left again, so add another one
	if (timeSinceLeave > 10 && welcomebacktoasts.length > 0) {
		welcomebacktoasts.forEach(toast => toast.destroy())
	}

	if (GameState.cursors < 1 || ascension.ascending == true) {
		addWelcomeBackToast(null, timeSinceLeave)
	}

	else {
		addWelcomeBackToast(scoreGained, timeSinceLeave)
	}
}

function resetIdleTime() {
	idleWaiter.cancel()
	idleWaiter = wait(TIME_FOR_SLEEP, () => {
		// true means it's idle
		triggerZZZ(true)
	})
}

export function triggerGnome() {
	let gnome = add([
		sprite("gnome"),
		pos(),
		layer("mouse"),
		scale(1.25),
		z(mouse.z - 1),
		anchor("center"),
		{
			update() {
				this.angle = wave(-10, 10, time() / 2)
			}
		}
	])

	playSfx("gnome")
	
	tween(0, width(), 0.1, (p) => gnome.pos.x = p, easings.linear)
	tween(0, height(), 0.1, (p) => gnome.pos.y = p, easings.linear).onEnd(() => {
		destroy(gnome)
	})

	GameState.stats.beenGnomed
	if (!isAchievementUnlocked("extra.gnome")) unlockAchievement("extra.gnome")
}

export let hexagonIntro:() => void;
export let hasStartedGame:boolean;

export const gamescene = () => scene("gamescene", async () => {
	hasStartedGame = GameState.scoreAllTime > 1
	ascension.ascending = false
	allPowerupsInfo.isHoveringAPowerup = false

	cam = {
		pos: center(),
		zoom: 1,
		rotation: 0,
	}
	
	setGravity(1600)

	addHexagon()
	uiCounters()
	addFolderObj()
	checkForUnlockable()
	hoverManaging();

	ROOT.on("gamestart", async () => {
		runInTauri(() => appWindow.setTitle("Clickery Hexagon"))
		
		// wait 60 seconds
		wait(60, () => {
			loop(120, () => {
				if (GameState.scoreAllTime > 25) {
					if (ngEnabled == true) {
						postEverything()
					}
					GameState.save(true)
				}
			})
		})
	
		if (!GameState.hasUnlockedPowerups) {
			ROOT.on("powerupunlock", () => {
				allPowerupsInfo.canSpawnPowerups = true
			})
		}
	
		else {
			allPowerupsInfo.canSpawnPowerups = true
		}
	
		// check for idling
		idleWaiter = wait(0, () => {})
		onMouseMove(() => resetIdleTime())
		onKeyPress(() => resetIdleTime())
		onClick(() => resetIdleTime())
	
		// panderito checkin
		onCharInput((ch) => {
			if (!hasStartedGame) return
			if (ch == panderitoLetters[panderitoIndex]) {
				panderitoIndex++
			}
		
			else {
				panderitoIndex = 0	
			}
		
			if (panderitoIndex == panderitoLetters.length) {
				togglePanderito()
			}
		})
	
		// gnome
		if (!isAchievementUnlocked("gnome")) {
			wait(60, () => {
				loop(1, () => {
					if (isAchievementUnlocked("extra.gnome")) return
					if (GameState.stats.timesAscended < 1) return
					if (sleeping == true) return
					if (chance(0.0020)) {
						triggerGnome()
					}
				})
			})
		}
	
		function saveVersionToNumber(str: string) {
			let number = 0
			str.split(".").forEach((n) => {
				number += Number(n)
			})
			return number;
		}

		if (typeof GameState.saveVersion == "number") {
			GameState.saveVersion = String(GameState.saveVersion)
		}

		// // changelog
		if (saveVersionToNumber(GameState.saveVersion) < saveVersionToNumber(GAME_VERSION)) {
			let changelogInfo = await (await fetch("https://raw.githubusercontent.com/amyspark-ng/clickery-hexagon/refs/heads/main/CHANGELOG.md")).text()
			let data = ""
			let startingIndex = 0
			let endingIndex = 0

			for (let i = 0; i < changelogInfo.split("\n").length; i++) {
				const line = changelogInfo.split("\n")[i].trim()
				if (line.startsWith("## ") && line.endsWith(`${GAME_VERSION}`)) {
					startingIndex = i
					// debug.log("found the starting line at " + i + " it says: " + line)
				}
				if (line.startsWith("## ") && !line.endsWith(`${GAME_VERSION}`)) {
					endingIndex = i
					// debug.log("found the ending line at " + i + " it says: " + line)
					break;
				}
			}

			data = changelogInfo.split("\n").splice(startingIndex, endingIndex - startingIndex).join("\n")
			addToast({ icon: "welcomeBackIcon", title: "New update!", body: data, type: "welcome" })
		}
	})
	
	onUpdate(() => {
		camRot(cam.rotation)
		camScale(vec2(cam.zoom))
		camPos(cam.pos)
		
		if (isKeyDown("shift") && isKeyPressed("r") && panderitoIndex != 6) {
			musicHandler.stop()
			stopAllSounds()
			
			go("gamescene")
		}
		
		if (isKeyDown("shift") && isKeyPressed("s") && GameState.scoreAllTime > 25) GameState.save()
		
		if (isKeyPressed("f2")) {
			get("toast").forEach(toast => toast.close())
		}

		if (isKeyPressed("f") && !DEBUG) {
			toggleTheFullscreen()
		}

		GameState.stats.totalTimePlayed += dt()
		if (!isAchievementUnlocked("extra.ALL")) GameState.stats.timeGameComplete = GameState.stats.totalTimePlayed

		GameState.score = clamp(GameState.score, 0, Infinity)
		GameState.score = Math.round(GameState.score)
	
		// INCREASES MANA
		if (GameState.scoreAllTime >= scoreManager.scoreYouGetNextManaAt()) {
			GameState.ascension.mana++
			GameState.ascension.manaAllTime++
			ROOT.trigger("manaGained")
		}

		// auto loop stuff
		if (GameState.cursors >= 1 && ascension.ascending == false) {
			autoLoopTime += dt()
			
			// this runs when time's up
			if (autoLoopTime >= GameState.timeUntilAutoLoopEnds) {
				if (excessTime > 0) autoLoopTime = excessTime
				else { autoLoopTime = 0; hexagon.autoClick() }
				excessTime = 0
			}
		}
	
		else {
			autoLoopTime = 0
		}
	
		if (sleeping) timeSlept += dt()
	
		if (GameState.hasUnlockedPowerups == true) {
			Powerup_NaturalSpawnManager()
			Powerup_RemovalTimeManager()
		}
	})
	
	// #region OUTSIDE OF TAB STUFF
	// Function to handle tab visibility change
	function handleVisibilityChange() {
		if (!hasStartedGame) return;
		
		if (document.hidden) {
			// Tab becomes inactive
			totalTimeOutsideTab = 0
			isTabActive = false;
			startTimeOutsideTab = performance.now(); // Store the start time when the tab becomes inactive
		}
	
		else {
			if (!isTabActive) {
				isTabActive = true
				
				GameState.save(false)

				// If the tab was previously inactive, calculate the time outside the tab and update the total time
				const timeOutsideTab = performance.now() - startTimeOutsideTab;
				totalTimeOutsideTab += timeOutsideTab;
				GameState.stats.totalTimePlayed += totalTimeOutsideTab / 1000
	
				if (!(GameState.scoreAllTime > 0)) return;
				// 30 being the seconds outside of screen to get the zzz screen
				if (totalTimeOutsideTab / 1000 > 30) {
					// false means it was out not idle
					triggerZZZ(false)
					// false means it was out not idle
					welcomeBack(false)
				}
			}
		}
	}
	
	// Listen for visibility change events
	document.addEventListener("visibilitychange", handleVisibilityChange);
	// #endregion
	
	// prevent dumb ctrl + s
	document.addEventListener("keydown", (event) => {
		if (event.keyCode == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
			event.preventDefault();
		}
	}, false);
	
	document.getElementById("kanva").addEventListener("mouseout", () => {
		// all of the objects that are draggable have this function
		if (curDraggin && curDraggin.releaseDrop) curDraggin.releaseDrop()
	}, false);
	
	document.getElementById("kanva").addEventListener("fullscreenchange", () => {
		ROOT.trigger("checkFullscreen")
	})
	
	let introAnimations = {
		intro_hopes() {
			// field of hopes and dreams reference
			// when the ominus stuff ends do this
			let reference = add([
				text("♪ ~ Clicker.wav", {
					align: "right",
					font: "lambdao",
				}),
				opacity(),
				pos(width(), -2),
			])
			tween(reference.pos.x, 733, 0.32, (p) => reference.pos.x = p, easings.easeOutCubic)
			tween(0, 1, 0.32, (p) => reference.opacity = p, easings.easeOutCubic)
			
			wait(4, () => {
				tween(reference.pos.x, width(), 0.32, (p) => reference.pos.x = p, easings.easeInCubic).onEnd(() => destroy(reference))
				tween(1, 0, 0.32, (p) => reference.opacity = p, easings.easeOutCubic)
			})
		},
		intro_playMusic() {
			// don't check anything for muted, it will play but no sound, that's good
			let song = GameState.settings.music.favoriteIdx == null ? "clicker.wav" : Object.keys(songs)[GameState.settings.music.favoriteIdx]
			playMusic(song)
			musicHandler.paused = GameState.settings.music.paused
		},
		intro_hexagon() {
			tween(vec2(center().x, center().y + 110), vec2(center().x, center().y + 55), 0.5, (p) => hexagon.pos = p, easings.easeOutQuad).onEnd(() => {
				hexagon.trigger("startAnimEnd")
			})
			tween(0.25, 1, 1, (p) => hexagon.opacity = p, easings.easeOutQuad)
		},
		intro_gameBg() {
			tween(BLACK, saveColorToColor(GameState.settings.bgColor), 0.5, (p) => gameBg.color = p, easings.easeOutQuad)
			tween(1, GameState.settings.bgColor.a, 0.5, (p) => gameBg.colorA = p, easings.easeOutQuad)
			tween(-5, 5, 0.5, (p) => gameBg.movAngle = p, easings.easeOutQuad)
		},
		intro_scoreCounter() {
			// scoreCounter
			tween(scoreText.scoreShown, GameState.score, 0.25, (p) => scoreText.scoreShown = p, easings.easeOutQuint)
			tween(vec2(center().x, 80), vec2(center().x, 60), 0.5, (p) => scoreText.pos = p, easings.easeOutQuad).onEnd(() => {
				scoreText.trigger("startAnimEnd")
			})
			tween(0.25, 1, 0.5, (p) => scoreText.opacity = p, easings.easeOutQuad)
		},
		intro_spsText() {
			tween(0.25, 1, 0.5, (p) => spsText.opacity = p, easings.easeOutQuad)
		},
		intro_buildingsText() {
			// buildingsText
			tween(5, 10, 0.5, (p) => buildingsText.pos.x = p, easings.easeOutQuad)
			tween(0.25, 1, 0.5, (p) => buildingsText.opacity = p, easings.easeOutQuad)
		},
		intro_folderObj() {
			// folderObj
			tween(width() - 30, width() - 40, 0.5, (p) => folderObj.pos.x = p, easings.easeOutQuad)
			tween(0.25, 1, 0.5, (p) => folderObj.opacity = p, easings.easeOutQuad)
		}
	}
	
	hexagonIntro = introAnimations.intro_hexagon
	
	if (GameState.settings.fullscreen == true) coolSetFullscreen(true)
	if (!isFullscreen()) GameState.settings.fullscreen = false

	if (hasStartedGame) {
		Object.values(introAnimations).filter(animation => !animation.name.includes("hopes")).forEach((animation) => {
			animation() // animations take 0.5 seconds
		})
	
		wait(0.5, () => {
			hexagon.interactable = true
			ROOT.trigger("gamestart")
		})
	}
	
	else {
		gameBg.colorA = 1
		hexagon.interactable = false
		let black = add([
			rect(width(), height()),
			pos(center()),
			anchor("center"),
			color(BLACK),
			opacity(),
			layer("mouse"),
			z(mouse.z - 1)
		])
	
		wait(2, () => {
			black.destroy()
			let ominus = playSfx("ominus", { loop: true })
			playSfx("biglight")
			hexagon.interactable = true
			folderObj.interactable = false
			spsText.opacity = 0
			scoreText.opacity = 0
			buildingsText.opacity = 0
			folderObj.opacity = 0
	
			hexagon.on("clickrelease", () => {
				switch (GameState.scoreAllTime) {
					case 1:
						ominus.stop()
						gameBg.colorA = 0.84
						introAnimations.intro_scoreCounter()
					break;
				
					case 2: 
						introAnimations.intro_playMusic()
						introAnimations.intro_hopes()
						introAnimations.intro_spsText()
					break;
	
					case 3: 
						introAnimations.intro_buildingsText()
					break;
	
					case 25:
						introAnimations.intro_folderObj()
						hasStartedGame = true;
						folderObj.interactable = true
						ROOT.trigger("gamestart")
					break;
				}
			})
		})
	}
	
	ROOT.on("buy", (info) => {
		checkForUnlockable()
	})

	runInTauri(() => {
		ROOT.on("scoreGained", () => {
			appWindow.setTitle(`Clickery Hexagon - ${formatNumber(Math.round(GameState.score))} score`)
		})

		ROOT.on("scoreDecreased", () => {
			appWindow.setTitle(`Clickery Hexagon - ${formatNumber(Math.round(GameState.score))} score`)
		})

		// # make it exitable
		
		// from 0 to 5 i guess being seconds	
		let exitDesire = 0
		let desireToOpacity = 0
		let phrase = "" 
		
		const goodbyephrases = [
			"don't go :(",
			":(",
			"fine i don't care",
			"the most difficult part of programming this game\nwas programming a button to leave\nbecause im no good with goobyes"
		]
		
		const backagainphrases = [
			"good, i missed you",
			":)",
			"i knew it",
			"i knew you'd come back!"
		]

		let drawing = add([layer("mouse"), z(mouse.z + 1)])
		drawing.onUpdate(() => {
			let mapped = map(exitDesire, 0, 1.2, 0, 1)
			desireToOpacity = lerp(desireToOpacity, mapped, 0.1)
		})
		drawing.onDraw(() => {
			drawRect({
				width: width(),
				height: height(),
				fixed: true,
				pos: vec2(center()),
				color: BLACK,
				anchor: "center",
				opacity: desireToOpacity,
			})

			drawText({
				text: phrase,
				fixed: true,
				size: 30,
				pos: vec2(center()),
				color: WHITE,
				align: "center",
				anchor: "center",
				opacity: desireToOpacity,
			})
		})

		onKeyPress("escape", () => phrase = choose(goodbyephrases))

		onKeyDown("escape", () => {
			exitDesire += dt()
			if (exitDesire >= 1.2) {
				appWindow.close()
				quit()
				phrase = choose(["goodbye...", "AAAAAAAAAAAAAAAAAAAAAAAA", "...", "i hate you"])
			}
		})

		onKeyRelease("escape", () => {
			phrase = choose(backagainphrases)
			exitDesire = 0
		})
	})

	ng.autoPing(5000)

	if (DEBUG == true) debugFunctions()
})