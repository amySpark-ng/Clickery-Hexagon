import { AreaComp, Comp, GameObj, Vec2 } from "kaplay";
import { dragComp } from "../plugins/drag";

export interface hovereableComp extends Comp {
	clickIndex: number;
}

export interface smartAreaComp extends Comp {
	isHovering(): boolean,
	area: { scale: Vec2 },
}

/** Like area but doesn't check for scale comp */
export function smartArea() : smartAreaComp {
	return {
		id: "smartArea",
		require: ["pos"],
		area: { scale: vec2(1) },
		isHovering() {
			const topLeftPos = this.screenPos().sub(vec2(this.width / 2, this.height / 2))

			const theRect = new Rect(topLeftPos, this.width * this.area.scale.x, this.height * this.area.scale.y)
			return theRect.contains(mousePos())
		},
		
		update() {
			
		}
	}
}

export function hovereable(clickIndex: number) : hovereableComp {
	return {
		id: "hovereable",
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