export type PlayType = "hamlet" | "as-like" | "othello";

export type Performance = {
  playID: PlayType;
  audience: number;
};

export interface Play {
  name: string;
  type: "tragedy" | "comedy";
}

export type Plays = {
  [key in PlayType]: Play;
};

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface PerformanceStatement extends Performance {
  play: Play;
  amount: number;
  volumeCredits: number;
}

export interface StatementData extends Invoice {
  performances: PerformanceStatement[];
  totalAmount: number;
  totalVolumeCredits: number;
}
