"use client";

import type { QuestionItem } from "../lib/questions";
import type { Role } from "../lib/game";

interface QuestionPanelProps {
  currentQ: QuestionItem | null;
  currentTeamName: string;
  isMultipleChoice: boolean;
  userInput: string;
  setUserInput: (value: string) => void;
  onAnswer: (answer: string) => void;
  onToggleMultipleChoice: () => void;
  possessionRole: Role;
  feedback: string;
}

export default function QuestionPanel({
  currentQ,
  currentTeamName,
  isMultipleChoice,
  userInput,
  setUserInput,
  onAnswer,
  onToggleMultipleChoice,
  possessionRole,
  feedback,
}: QuestionPanelProps) {
  if (!currentQ) {
    return (
      <div className="text-center text-zinc-400 text-lg font-black uppercase tracking-[0.2em]">
        No quedan preguntas en el triangular.
      </div>
    );
  }

  // Definición de etiquetas dinámicas según la posición táctica
  const getButtonsConfig = () => {
    if (possessionRole === "9") {
      return { primary: "🚀 Reventar al arquero", alternate: "🎯 Tiro Colocado (Opciones)" };
    }
    if (possessionRole === "ENG") {
      return { primary: "🚀 Reventar al arquero", alternate: "🎯 Pase Corto (Opciones)" };
    }
    return { primary: "🔫 Dar Pase Largo", alternate: "🎯 Pase Corto (Opciones)" };
  };

  const { primary, alternate } = getButtonsConfig();

  return (
    <>
      <div className="mb-2 text-xs font-black text-zinc-500 tracking-widest uppercase italic">Pregunta de {currentQ.country}</div>
      <h2 className="text-4xl font-black mb-10 leading-none italic uppercase tracking-tight">{currentQ.question}</h2>

      <div className="space-y-4">
        {!isMultipleChoice ? (
          <>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full bg-zinc-900 border-b-4 border-blue-600 p-5 text-2xl font-black outline-none placeholder:text-zinc-800 uppercase focus:bg-zinc-800/50 transition-colors text-white"
              placeholder="Respuesta..."
              onKeyDown={(e) => e.key === "Enter" && onAnswer(userInput)}
              autoFocus
            />
            <button
              onClick={() => onAnswer(userInput)}
              className="w-full bg-white text-black p-5 font-black uppercase text-xl hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg"
            >
              {primary}
            </button>
            <button
              onClick={onToggleMultipleChoice}
              className="w-full border-2 border-zinc-800 p-3 font-black text-zinc-500 text-xs hover:text-white transition-colors uppercase tracking-widest"
            >
              {alternate}
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-black text-blue-500 uppercase tracking-widest">
              {possessionRole === "9" ? "Opciones del Tiro Colocado:" : "Opciones del Pase Corto:"}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {currentQ.options.map((opt) => (
                <div
                  key={opt}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl font-black uppercase text-sm text-zinc-300"
                >
                  • {opt}
                </div>
              ))}
            </div>

            {/* Decisiones del Docente */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onAnswer(currentQ.answer)}
                className="p-4 bg-green-600 text-white font-black uppercase text-sm rounded-xl hover:bg-green-700 transition-colors"
              >
                {possessionRole === "9" ? "⚽ Registrar GOL" : "✅ Confirmar Pase"}
              </button>
              <button
                onClick={() => onAnswer("INCORRECT_MANUAL_TRIGGER")}
                className="p-4 bg-red-600 text-white font-black uppercase text-sm rounded-xl hover:bg-red-700 transition-colors"
              >
                {possessionRole === "9" ? "❌ Tiro Errado" : "❌ Pase Fallido"}
              </button>
            </div>
          </div>
        )}
      </div>

      {feedback && (
        <div className="mt-8 p-4 bg-blue-600 text-white font-black italic uppercase text-center text-md skew-x-[-10deg] animate-pulse">
          {feedback}
        </div>
      )}
    </>
  );
}