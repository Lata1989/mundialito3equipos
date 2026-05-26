"use client";

import type { TeamColor } from "../lib/game";

interface ScoreboardProps {
  teams: Record<TeamColor, string>;
  flagMap: Record<string, string>;
  score: Record<TeamColor, number>;
  activeTeam: TeamColor;
}

export default function Scoreboard({ teams, flagMap, score, activeTeam }: ScoreboardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-8 bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 relative">
      {(["blue", "red", "white"] as TeamColor[]).map((teamColor) => (
        <div key={teamColor} className={`relative flex flex-col items-center transition-all duration-500 ${activeTeam === teamColor ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
          <span className="text-4xl mb-1">{flagMap[teams[teamColor]]}</span>
          <div className="text-[9px] font-black uppercase truncate max-w-[60px] text-zinc-100">{teams[teamColor]}</div>
          <div className="text-4xl font-black tabular-nums tracking-tighter mt-2">{score[teamColor]}</div>
          {activeTeam === teamColor && (
            <div className="absolute -top-1 w-full flex justify-center">
              <div className="w-8 h-1 bg-blue-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
