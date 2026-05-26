"use client";

import type { TeamColor } from "../lib/game";

interface TeamSelectorProps {
  availableTeams: string[];
  selectedTeams: Partial<Record<TeamColor, string>>;
  currentSlot: TeamColor;
  flags: Record<string, string>;
  onSelect: (team: string) => void;
}

export default function TeamSelector({ availableTeams, selectedTeams, currentSlot, flags, onSelect }: TeamSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6 text-center">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Triangular de Selección</h1>
      <p className="mb-6 text-zinc-400 font-bold uppercase tracking-widest text-xs">
        Selecciona 3 equipos + Argentina (Argentina no es seleccionable)
      </p>

      <div className="mb-4 text-sm text-zinc-300 max-w-lg">
        <span className="font-black uppercase">Siguiente:</span> {currentSlot === "blue" ? "Equipo Azul" : currentSlot === "red" ? "Equipo Rojo" : "Equipo Blanco"}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableTeams.map((name) => {
          const isSelected = Object.values(selectedTeams).includes(name);
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              disabled={isSelected}
              className={`p-3 rounded-2xl border transition-all text-left ${isSelected ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed" : "bg-zinc-900 border-zinc-800 hover:border-white"}`}
            >
              <div className="text-3xl mb-2">{flags[name] || "🏳️"}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em]">{name}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-3xl text-left">
        {(["blue", "red", "white"] as TeamColor[]).map((slot) => (
          <div key={slot} className="bg-zinc-900/70 rounded-3xl border border-zinc-800 p-4">
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-2">{slot === "blue" ? "Equipo Azul" : slot === "red" ? "Equipo Rojo" : "Equipo Blanco"}</div>
            <div className="text-xl font-black text-white">{selectedTeams[slot] || "Pendiente"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
