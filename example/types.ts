export type PlayType = "hamlet" | "as-like" | "othello"

export type Performance = {
  playID: PlayType
  audience: number
}

export interface Play {
  name: string
  type: "tragedy" | "comedy"
}

export type Plays = {
  [key in PlayType]: Play
}

export interface Invoice {
  customer: string,
  performances: Performance[]
}