export enum Direction {
	Up = "up",
	Down = "down",
	Left = "left",
	Right = "right"
}

const { Up, Down, Left, Right } = Direction

type Stratagem = Direction[]

export const stratagems: { [key: string]: Stratagem } = {
	"Reinforce": [Up, Down, Right, Left, Up],
	"Resupply": [Down, Down, Up, Right],
	"Orbital Precision Strike": [Right, Right, Up],
	"SEAF Artillery": [Up, Down, Right, Up]
}

// export const stratagems = Stratagems as [][string, Stratagem];
