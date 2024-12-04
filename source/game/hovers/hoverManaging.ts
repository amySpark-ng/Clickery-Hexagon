import { AreaComp, Comp, GameObj } from "kaplay";
import { dragComp } from "../plugins/drag";

export interface hovereableComp extends Comp {
	clickIndex: number;
}

export function hovereable(clickIndex: number) : hovereableComp {
	return {
		id: "hovereable",
		require: ["area", "pos"],
		clickIndex: clickIndex,
	}
}

type typicalHovereable = GameObj<AreaComp | hovereableComp | dragComp>

export function hoverManaging() {
	onUpdate("hovereable", (hoverObj: typicalHovereable) => {
		const hoveredObjects = get("hovereable", { recursive: true }) as typicalHovereable[] 
		// not the best approach to "turn off" the area
		if (hoveredObjects.some((obj) => obj.isHovering() && (obj.clickIndex > hoverObj.clickIndex) && !hoverObj.dragging)) {
			hoverObj.area.scale = vec2(0)
		}

		else {
			hoverObj.area.scale = vec2(1)
		}
	})
}