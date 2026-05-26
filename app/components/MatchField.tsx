"use client";

import type { Player, Role, TeamColor } from "../lib/game";

interface MatchFieldProps {
  formation: Player[];
  possession: { team: TeamColor; role: Role };
  activePlayerId: number;
  defenderTeam: TeamColor;
  flagMap: Record<string, string>;
  teams: Record<TeamColor, string>;
}

const teamStyles: Record<TeamColor, string> = {
  blue: "bg-blue-600",
  red: "bg-red-600",
  white: "bg-white",
};

export default function MatchField({ formation, possession, activePlayerId, defenderTeam, flagMap, teams }: MatchFieldProps) {
  const renderTeamPlayers = (teamColor: TeamColor, mirrorX: boolean, mirrorY: boolean) => {
    return formation.map((player) => {
      const position = {
        top: mirrorY ? 100 - player.top : player.top,
        left: mirrorX ? 100 - player.left : player.left,
      };
      const isBallOwner = possession.team === teamColor && player.id === activePlayerId;
      const isVisible = possession.team === teamColor || defenderTeam === teamColor;

      return (
        <div
          key={`${teamColor}-${player.id}`}
          className={`absolute w-10 h-10 rounded-full border border-white/40 transition-all duration-700 shadow-xl ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
          } ${isBallOwner ? "z-50" : ""}`}
          style={{ top: `${position.top}%`, left: `${position.left}%`, transform: "translate(-50%, -50%)" }}
        >
          <div
            className={`relative w-full h-full rounded-full ${teamStyles[teamColor]} ${
              isBallOwner ? "ring-4 ring-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]" : ""
            }`}
          >
            {isBallOwner && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-sm" />
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-amber-400/20 shadow-[0_0_60px_rgba(251,191,36,0.18)] bg-[#081b2a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.75))]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-x-0 top-12 h-px bg-white/12" />
        <div className="absolute inset-x-0 bottom-12 h-px bg-white/12" />
        <div className="absolute left-1/2 top-1/2 w-24 h-24 border border-white/15 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-1/2 w-px bg-white/12 -translate-x-1/2" />
        <div className="absolute inset-x-8 top-10 border-t border-white/10" />
        <div className="absolute inset-x-8 bottom-10 border-t border-white/10" />
      </div>

      <div className="relative h-full w-full">
        {renderTeamPlayers("blue", false, false)}
        {renderTeamPlayers("red", true, false)}
        {renderTeamPlayers("white", false, true)}
      </div>

      <div className="absolute left-4 top-4 text-xs uppercase tracking-[0.2em] text-white/60">
        Bombonera style: fondo de cancha traslúcido
      </div>
      <div className="absolute right-4 bottom-4 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {teams[possession.team]} presionando
      </div>
    </div>
  );
}
