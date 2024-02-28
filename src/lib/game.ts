import { A } from "@mobily/ts-belt"

export enum Direction {
	Up = "up",
	Down = "down",
	Left = "left",
	Right = "right"
}

const { Up, Down, Left, Right } = Direction

export type Code = Direction[]
export type Stratagem = [string, Code]
export type Stratagems = Stratagem[]

export function MatchingGems(input: Code): Stratagems {
	return stratagems.filter((gem) => {
		return A.eq(gem[1].slice(0, input.length), input, (a, b) => a == b)
	})
}

export function CheckMatchingCode(input: Code, gem: Code): number {
	if (A.eq(gem.slice(0, input.length), input, (a, b) => a == b)) {
		return input.length
	}

	return 0
}

export const stratagems: Stratagems = [
	// General
	["Reinforcement", [Up, Down, Right, Left, Up]],
	["Resupply", [Down, Down, Up, Right]],
	["SOS Beacon", [Up, Down, Right, Up]],
	["SEAF Artillery", [Right, Up, Up, Down]],
	["Hellbomb", [Down, Up, Left, Down, Up, Right, Down, Up]],
	["Super Earth Flag", [Down, Up, Down, Up]],

	// Missions
	["Prospecting Drill", [Down, Down, Left, Right, Down, Down]],

	// Patriotic Administration Center
	["Machine Gun", [Down, Left, Down, Up, Right]],
	["Anti-Material Rifle", [Down, Left, Right, Up, Down]],
	["Stalwart", [Down, Left, Down, Up, Up, Left]],
	["Expendable Anti-Tank", [Down, Down, Left, Up, Right]],
	["Recoiless Rifle", [Down, Left, Right, Right, Left]],
	["Flamethrower", [Down, Left, Up, Down, Up]],
	["Auto-Canon", [Down, Left, Down, Up, Up, Right]],
	["Railgun", [Down, Right, Down, Up, Left, Right]],
	["Spear", [Down, Down, Up, Down, Down]],

	// Orbital
	["Orbital Gatling Barrage", [Right, Down, Left, Up, Up]],
	["Orbital Airburst Strike", [Right, Right, Right]],
	["Orbital 120MM HE Barrage", [Right, Right, Down, Left, Right, Down]],
	["Orbital 380MM HE Barrage", [Right, Down, Up, Up, Left, Down, Down]],
	["Orbital Walking Barrage", [Right, Down, Right, Down, Right, Down]],
	["Orbital Laser", [Right, Down, Up, Right, Down]],
	["Orbital Railgun Strike", [Right, Up, Down, Down, Right]],

	// Hangar
	["Eagle Straffing Run", [Up, Right, Right]],
	["Eagle Airstrike", [Up, Right, Down, Right]],
	["Eagle Cluster Bomb", [Up, Right, Down, Down, Right]],
	["Eagle Napalm Strike", [Up, Right, Down, Up]],
	["Jump Pack", [Down, Up, Up, Down, Up]],
	["Eagle Smoke Strike", [Up, Right, Down, Up]],
	["Eagle 110MM Rocket Pods", [Up, Right, Up, Left]],
	["Eagle 500KG Bomb", [Up, Right, Down, Down, Down]],
	["Eagle Rearm", [Up, Up, Left, Up, Right]],

	// Bridge

	["Orbital Precision Strike", [Right, Right, Up]],
	["Orbital Gas Strike", [Right, Right, Down, Right]],
	["Orbital EMS Strike", [Right, Right, Left, Down]],
	["Orbital Smoke Strike", [Right, Right, Down, Up]],
	["HMG Placement", [Down, Up, Left, Right, Right, Left]],
	["Shield Generator", [Down, Down, Left, Right, Left, Right]],
	["Tesla Tower", [Down, Up, Right, Up, Left, Right]],

	// Engineering Bay

	["Anti-Personnel Minefield", [Down, Left, Up, Right]],
	["Supply Pack", [Down, Left, Down, Up, Up, Down]],
	["Grenade Launcher", [Down, Left, Up, Left, Down]],
	["Laser Canon", [Down, Left, Down, Up, Left]],
	["Incendiary Mines", [Down, Left, Left, Down]],
	["Guard Dog Rover", [Up, Down, Left, Up, Right, Right]],
	["Ballistic Shield", [Down, Left, Down, Down, Up, Left]],
	["Arc Thrower", [Down, Right, Down, Up, Left, Left]],
	["Shield Generator Pack", [Down, Up, Left, Right, Left, Right]],

	// Robotic Workshop

	["Machine Gun Sentry", [Down, Up, Right, Right, Up]],
	["Gatling Sentry", [Down, Up, Right, Left]],
	["Mortar Sentry", [Down, Up, Right, Right, Down]],
	["Guard Dog", [Down, Up, Left, Up, Right, Down]],
	["Autocanon Sentry", [Down, Up, Right, Up, Left, Up]],
	["Rocket Sentry", [Down, Up, Right, Right, Left]],
	["EMS Mortar Sentry", [Down, Up, Right, Down, Right]]
]
