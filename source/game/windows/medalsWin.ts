import { GameObj, SpriteComp } from "kaplay";
import { DEBUG } from "../../main";
import { addTooltip, mouse } from "../additives";
import { AchievementInterface, achievements, getAchievement, isAchievementUnlocked, unlockAchievement } from "../unlockables/achievements";
import { blendColors, getPositionOfSide } from "../utils";
import { curDraggin, drag, setCurDraggin } from "../plugins/drag";
import { playSfx } from "../../sound";
import { ngEnabled } from "../../newgrounds";
import ng from "newgrounds.js";
import { GameState } from "../../gamestate";
import * as env from "../../env.json"
import { hoverController } from "../../hoverManaging";

// Constants
const totalColumns = 5;
const totalRows = 7;
const initialPos = { x: -132, y: 42 };
const spacing = { x: 66, y: 65 };
const availableAchievements = achievements.slice(0, 49);
let medalsContainer: GameObj | undefined;
let medalMap: Map<string, GameObj> = new Map();

// Position Calculation
function getPositionInWindow(row: number, column: number) {
	const posX = initialPos.x + spacing.x * (column - 1);
	const posY = initialPos.y + spacing.y * (row - 1);
	return vec2(posX, posY);
}

function indexToGrid(i: number) {
	return { row: Math.floor(i / totalColumns) + 1, column: (i % totalColumns) + 1 };
}

// Initialize medal window content
export function medalsWinContent(winParent: GameObj) {
	// Clear any existing medals
	clearMedals();

	medalsContainer = winParent.add([
		pos(-18, -214),
		rect(350, winParent.height - 35 * 2, { radius: 5 }),
		color(BLACK),
		opacity(0.5),
		anchor("top"),
	]);

	addScrollBar(medalsContainer, 3)
	// Add all medals
	addAllMedals();

	winParent.onScroll(delta => {
		if (!winParent.active || (DEBUG && isKeyDown("shift"))) return;
		scroll(delta.y > 0 ? "down" : "up");
	});

	winParent.onKeyPress(["up", "left"], () => {
		if (!winParent.active) return
		scroll("up")
	})

	winParent.onKeyPress(["down", "right"], () => {
		if (!winParent.active) return
		scroll("down")
	})

	// Add cleanup logic when the window is closed
	winParent.on("close", clearMedals);
}

// Clear medals from the screen
function clearMedals() {
	if (medalsContainer) {
		medalsContainer.get("medal").forEach(medal => {
			if (medal) {
				medal.destroy(); // Remove individual medal
			}
		});
		medalsContainer.destroy(); // Remove the goddam container
		medalsContainer = undefined;
	}
	medalMap.clear();
}

// Add all medals to the display
function addAllMedals() {
	for (let row = 1; row <= totalRows; row++) {
		const medalIndex = (row - 1) * totalColumns; // Adjust index for first column
		if (medalIndex < achievements.length) {
			const achievementId = achievements[medalIndex].id;
			addMedal({ row: row, column: 1 }, achievementId);
		} else {
			console.warn(`No achievement available for row ${row}, column 1`);
		}
	}

	for (let i = 0; i < achievements.length; i++) {
		if (i >= totalColumns * totalRows) break;
		addMedal(indexToGrid(i), achievements[i].id);
	}
}

// Add a medal to the display
function addMedal(gridPosition: { row: number, column: number }, medal_ID: string, position?: { x: number; y: number }) {
	if (!medalsContainer) {
		console.error("medalsContainer is not defined in addMedal");
		return;
	}
	if (medalMap.has(medal_ID)) return;

	// Check for existing medals at the same position
	const existingMedal = medalsContainer.get("medal").find(medal => medal.row === gridPosition.row && medal.column === gridPosition.column);
	if (existingMedal) {
		console.warn(`Medal at row ${gridPosition.row}, column ${gridPosition.column} already exists. Skipping addition for ${medal_ID}.`);
		return;
	}

	const medalObj = medalsContainer.add(createMedalObject(gridPosition, medal_ID));
	if (position) {
		medalObj.pos = vec2(position.x, position.y);
	} else {
		medalObj.pos = getPositionInWindow(gridPosition.row, gridPosition.column);
	}
	medalObj.achievementIdx = achievements.findIndex(a => a.id === medal_ID);
	medalObj.onClick(() => handleMedalClick(medalObj));
	medalObj.onHover(() => handleMedalHover(medalObj));
	medalObj.onHoverEnd(() => handleMedalHoverEnd(medalObj));
	medalObj.onDraw(() => handleMedalDraw(medalObj, isAchievementUnlocked(medalObj.achievementId) && medalObj.achievementId != "extra.theSlot"));
	medalMap.set(medal_ID, medalObj);
}

// Create medal
function createMedalObject(gridPosition: { row: number, column: number }, medal_ID: string) {
	return [
		sprite("medalsUnknown"),
		pos(getPositionInWindow(gridPosition.row, gridPosition.column)),
		anchor("center"),
		layer("windows"), ,
		area(),
		hoverController(),
		color(),
		"medal",
		{
			achievementIdx: achievements.indexOf(getAchievement(medal_ID)),
			achievementId: medal_ID,
			row: gridPosition.row,
			column: gridPosition.column,
			update() {
				updateMedalState(this);
			},
		}
	];
}

// Update medal state
function updateMedalState(medalObj:GameObj) {
	if (!medalsContainer) {
		console.error("medalsContainer is not defined in updateMedalState");
		return;
	}
	const theAchievement = getAchievement(medalObj.achievementId);
	const medalSprite = "medals_" + theAchievement.id

	// is unlocked 
	if (isAchievementUnlocked(medalObj.achievementId)) {
		if (medalObj.sprite != medalSprite) medalObj.sprite = medalSprite
		if (medalObj.color != WHITE) medalObj.color = WHITE		
		// manages master medal
		if (medalObj.achievementId == "extra.ALL" && medalObj.getCurAnim() == null) medalObj.play("master")
		medalObj.opacity = 1
	}
	
	else {
		manageLockedMedalApp(medalObj, theAchievement);
	}
}

/**
* Gets the color and sprite of the medal when it's locked 
* Runs on update
*/
function manageLockedMedalApp(medalObj:GameObj, theAchievement:AchievementInterface) {
	const PURPLE = blendColors(RED, BLUE, 0.5);
	
	if (theAchievement.id === "extra.theSlot" && medalObj.sprite !== "medalsUnknown_tap") {
		medalObj.sprite = "medalsUnknown_tap";
	}

	else if (theAchievement.id != "extra.theSlot" && medalObj.sprite != "medalsUnknown") {
		medalObj.sprite = "medalsUnknown"
	}

	if (theAchievement.id == "extra.ALL") medalObj.color = hsl2rgb((time() * 0.2 + 0 * 0.1) % 1, 0.6, 0.6)
	
	else {
		if (theAchievement.visibleCondition != null) {
			if (theAchievement.visibleCondition() == true) {
				if (theAchievement.rare == true) medalObj.color = YELLOW
				else medalObj.color = RED
			}

			else {
				medalObj.color = PURPLE
			}
		}

		else {
			if (theAchievement.rare == true) medalObj.color = YELLOW
			else medalObj.color = RED
		}
	}

	medalObj.opacity = 0.5
}

// Handle medal click
function handleMedalClick(medalObj) {
	if (medalObj.achievementId === "extra.theSlot" && !isAchievementUnlocked(medalObj.achievementId)) {
		unlockAchievement(medalObj.achievementId);
	}
}

// Handle medal hover
function handleMedalHover(medalObj) {
	const theAchievement = getAchievement(medalObj.achievementId);
	let title = formatTooltipText(theAchievement.title, 50);
	let description = formatTooltipText(theAchievement.description, 50);
	let flavorText = theAchievement.flavorText;
	
	title = `[title]${title}[/title]`
	if (!isAchievementUnlocked(theAchievement.id)) {
		if (theAchievement.visibleCondition && !theAchievement.visibleCondition()) {
			title = "???";
			description = "This achievement is secret\nFor now...";
			flavorText = "";
		} else {
			title = "???";
			description = theAchievement.description;
			flavorText = "";
		}
	}
	const tooltip = addTooltip(medalObj, {
		text: `${title}\n${description}${flavorText.length < 50 ? `. ${flavorText}` : ""}`,
		direction: "down",
		lerpValue: 0.5
	});
	tooltip.tooltipText.align = "center";
	medalObj.tooltip = tooltip;
}

// drawDumbOutline
function handleMedalDraw(medalObj:GameObj, drawOutline: boolean) {
	if (drawOutline == false) return
	drawRect({
		anchor: medalObj.anchor,
		width: medalObj.width,
		height: medalObj.height,
		color: BLACK,
		fill: false,
		outline: {
			width: 3,
			color: BLACK
		}
	})
}

// Format text for tooltip
function formatTooltipText(text: string, maxLength: number) {
	return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

// Handle hover end
function handleMedalHoverEnd(medalObj:GameObj) {
	if (medalObj.tooltip) {
		medalObj.tooltip.end();
	}
}

// Scroll handling
function scroll(direction: "up" | "down") {
	if (!medalsContainer) {
		console.error("medalsContainer is not defined in scroll function");
		return;
	}
	const medals = medalsContainer.get("medal").filter(medal => medal !== undefined);
	const sortedMedals = medals.sort((a, b) => a.achievementIdx - b.achievementIdx);
	if ((direction === "down" && sortedMedals[sortedMedals.length - 1]?.achievementIdx === achievements.length - 1) ||
		(direction === "up" && sortedMedals[0]?.achievementIdx === 0)) return;

	const isScrollingDown = direction === "down";
	const rowChange = isScrollingDown ? -1 : 1;
	const yOffset = isScrollingDown ? -spacing.y : spacing.y;

	// Remove off-screen medals
	medals.forEach(medal => {
		if (medal) {
			if ((isScrollingDown && medal.row === 1) || (!isScrollingDown && medal.row === totalRows)) {
				medalMap.delete(medal.achievementId);
				medal.destroy();
			} else {
				medal.row += rowChange;
				medal.pos.y += yOffset;
			}
		}
	});

	const firstOrLastIdx = sortedMedals[isScrollingDown ? medals.length - 1 : 0]?.achievementIdx;
	if (firstOrLastIdx === undefined) return;

	const nextAchievements = achievements.slice(
		firstOrLastIdx + (isScrollingDown ? 1 : -totalColumns),
		firstOrLastIdx + (isScrollingDown ? 1 : -totalColumns) + totalColumns
	);

	nextAchievements.forEach((achievement, index) => {
		const gridPos = indexToGrid(index);
		addMedal({ row: isScrollingDown ? totalRows : 1, column: gridPos.column }, achievement.id);
	});
}

function addScrollBar(medalsContainer:GameObj, totalScrolls = 3) {
	const winParent = medalsContainer.parent;
	
	if (!medalsContainer) {
		console.error("medalsContainer is not defined in addScrollBar");
		return;
	}

	const scrollBarWidth = 10;
	const scrollBarHeight = medalsContainer.height;
	const totalParts = totalScrolls;

	const bar = medalsContainer.add([
		pos(medalsContainer.width / 2 + 20, 0),
		rect(scrollBarWidth, scrollBarHeight, { radius: 2.5 }),
		color(BLACK),
		opacity(0.5),
		layer("ui"),
	]);

	let elevatorYPos = 0;
	const elevatorHeight = scrollBarHeight / totalParts;
	const elevator = medalsContainer.add([
		pos(medalsContainer.width / 2 + 20, 0),
		rect(scrollBarWidth, elevatorHeight, { radius: 2.5 }),
		color(255, 255, 255),
		layer("ui"),
		area({ scale: vec2(2, 1) }),
		opacity(0.5),
		hoverController(),
		"elevator",
	]);

	let isDragging = false

	elevator.onHover(() => {
		if (isDragging == false) {
			tween(elevator.opacity, 1, 0.15, (p) => elevator.opacity = p, easings.easeOutQuad);
		}
	})

	elevator.onHoverEnd(() => {
		if (isDragging == false) {
			tween(elevator.opacity, 0.5, 0.15, (p) => elevator.opacity = p, easings.easeOutQuad);
		}
	})

	let currentScroll = 0;
	let hasCheckedLastScroll = false

	/**
	 * Increases elevator y position by scrollStep based on total scrolls 
	 * @param scrollStep between -1 and 1
	 */
	function updateElevator(scrollStep:number) {
		currentScroll = Math.max(0, Math.min(currentScroll + scrollStep, totalScrolls));
		const elevatorY = (currentScroll / totalScrolls) * (scrollBarHeight - elevatorHeight);
		elevatorYPos = elevatorY;
	
		// add goober devky
		if (currentScroll == totalScrolls && medalsContainer.get("goober").length == 0 && hasCheckedLastScroll == false) {
			if (!chance(0.4)) {
				hasCheckedLastScroll = true
				return
			}
			const lastAchievement = medalsContainer.get("medal").filter(medal => medal.row == totalRows && medal.column == totalColumns - 1)[0] 
			const thePosition = getPositionInWindow(lastAchievement.row, lastAchievement.column + 1)
			let goober = medalsContainer.add([
				sprite("devkyGoober"),
				pos(thePosition.x, thePosition.y + 30),
				anchor("bot"),
				area(),
				scale(),
				hoverController(),
				"goober",
			])

			goober.onClick(() => {
				if (ngEnabled == true) {
					if (GameState.stats.hasDevkyGoobered == false) {
						GameState.stats.hasDevkyGoobered = true
						ng.unlockMedal(env.DEVKY_MEDAL_ID)
					}
				}
				
				tween(rand(0.7, 0.9), 1, 0.15, (p) => goober.scale.y = p)
				playSfx("squeak", { detune: rand(-100, 100) })
			})

			goober.width = 60
			goober.height = 60
		}

		else {
			if (currentScroll == totalScrolls) return
			hasCheckedLastScroll = false
			if (medalsContainer.get("goober").length > 0) medalsContainer.get("goober")[0].destroy()
		}
	}

	medalsContainer.onScroll((delta) => {
		if (isDragging == true) return
		if (delta.y > 0) {
			updateElevator(1);
		} else if (delta.y < 0) {
			updateElevator(-1);
		}
	});

	medalsContainer.onKeyPress(["down", "right"], () => { updateElevator(1) })
	medalsContainer.onKeyPress(["left", "up"], () => { updateElevator(-1) })

	elevator.onClick(() => {
		if (elevator.isHovering()) {
			isDragging = true
			// only doing it so it counts as it's there something being dragged
			setCurDraggin(elevator)
		}
	})

	elevator.onMouseRelease("left", () => {
		if (isDragging == true) {
			isDragging = false
			setCurDraggin(null)
		}
	});

	elevator.onUpdate(() => {
		if (isDragging == true) {
			// Update the current scroll based on the new elevator position
			currentScroll = Math.round((elevatorYPos / (scrollBarHeight - elevatorHeight)) * totalScrolls);
		
			if (mousePos().y > elevator.worldPos().y + elevator.height / 2) {
				updateElevator(1)
				scroll("down");
			}

			else if (mousePos().y < elevator.worldPos().y - elevator.height / 2) {
				updateElevator(-1)
				scroll("up")
			}
		}

		elevator.pos.y = lerp(elevator.pos.y, elevatorYPos, 0.5)
		elevator.pos.y = clamp(elevator.pos.y, 0, scrollBarHeight - elevatorHeight);
	});
}