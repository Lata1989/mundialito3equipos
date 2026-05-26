export type TeamColor = "blue" | "red" | "white";
export type Role = "DEF" | "5" | "VOL" | "ENG" | "9";

export interface Player {
  id: number;
  role: Role;
  top: number;
  left: number;
}

export const TEAM_ORDER: TeamColor[] = ["blue", "red", "white"];

export const FORMATION: Player[] = [
  { id: 1, role: "DEF", top: 85, left: 60 },
  { id: 2, role: "5", top: 65, left: 40 },
  { id: 3, role: "VOL", top: 45, left: 25 },
  { id: 4, role: "ENG", top: 30, left: 50 },
  { id: 5, role: "9", top: 13, left: 28 },
];
