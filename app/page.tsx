"use client";
import { useState, useMemo } from "react";

// --- CONFIGURACIÓN Y TIPOS ---
const BANDERAS: Record<string, string> = {
  "Japón": "🇯🇵", "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Colombia": "🇨🇴", "Francia": "🇫🇷", "Canadá": "🇨🇦", "Uruguay": "🇺🇾",
  "Brasil": "🇧🇷", "Marruecos": "🇲🇦", "Croacia": "🇭🇷", "España": "🇪🇸", "EEUU": "🇺🇸", "Ecuador": "🇪🇨",
  "Alemania": "🇩🇪", "Bélgica": "🇧🇪", "Paraguay": "🇵🇾", "Arabia": "🇸🇦", "Países Bajos": "🇳🇱", "México": "🇲🇽",
  "Suiza": "🇨🇭", "Austria": "🇦🇹", "Egipto": "🇪🇬", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Portugal": "🇵🇹", "Noruega": "🇳🇴",
  "Argentina": "🇦🇷"
};

type Role = "DEF" | "5" | "VOL" | "ENG" | "9";
type TeamColor = 'blue' | 'red' | 'white';

interface Player {
  id: number;
  role: Role;
  top: number;
  left: number;
}

const formation: Player[] = [
  { id: 1, role: "DEF", top: 85, left: 60 },
  { id: 2, role: "5", top: 65, left: 40 },
  { id: 3, role: "VOL", top: 45, left: 25 },
  { id: 4, role: "ENG", top: 30, left: 50 },
  { id: 5, role: "9", top: 13, left: 28 },
];

const QUESTIONS_DB = [
  { country: "España", question: "¿Quién pintó 'Las Meninas'?", answer: "Velazquez", options: ["Goya", "Velazquez", "El Greco", "Picasso"] },
  { country: "Argentina", question: "¿En qué ciudad se encuentra el famoso Obelisco?", answer: "Buenos Aires", options: ["Mendoza", "Córdoba", "Buenos Aires", "Rosario"] },
  { country: "Brasil", question: "¿Qué ciudad es la capital de Brasil?", answer: "Brasilia", options: ["Río", "São Paulo", "Brasília", "Salvador"] },
  { country: "Francia", question: "¿En qué año ganó Francia su primer Mundial?", answer: "1998", options: ["1958", "1986", "1998", "2018"] },
  { country: "Inglaterra", question: "¿Quién escribió 'Hamlet'?", answer: "Shakespeare", options: ["Dickens", "Shakespeare", "Orwell", "Austen"] },
];

export default function SoccerQuizTriangular() {
  const [teams, setTeams] = useState<{ blue: string, red: string, white: string } | null>(null);
  const [possession, setPossession] = useState<{ team: TeamColor, role: Role }>({ team: 'blue', role: '5' });
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({ blue: 0, red: 0, white: 0 });
  const [feedback, setFeedback] = useState("");
  const [currentQ, setCurrentQ] = useState(QUESTIONS_DB[0]);

  const defenderTeam = useMemo((): TeamColor => {
    if (possession.team === 'blue') return 'red';
    if (possession.team === 'red') return 'white';
    return 'blue';
  }, [possession.team]);

  const activePlayerId = useMemo(() => {
    return formation.find(p => p.role === possession.role)?.id || 1;
  }, [possession.role]);

  // Obtener el nombre del país que tiene la pelota actualmente
  const currentTeamName = useMemo(() => {
    if (!teams) return "";
    return teams[possession.team];
  }, [teams, possession.team]);

  const selectTeam = (name: string) => {
    if (!teams) setTeams({ blue: name, red: "", white: "" });
    else if (!teams.red) setTeams({ ...teams, red: name });
    else if (!teams.white) setTeams({ ...teams, white: name });
  };

  const processAnswer = (ans: string) => {
    const isCorrect = ans.toLowerCase().trim() === currentQ.answer.toLowerCase();
    const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
    const currentRole = possession.role;
    const currentIndex = roles.indexOf(currentRole);

    if (isCorrect) {
      const esTiroAlArco = currentRole === "9" || (currentRole === "ENG" && !isMultipleChoice);

      if (esTiroAlArco) {
        setScore(prev => ({ ...prev, [possession.team]: prev[possession.team] + 1 }));
        setFeedback("¡GOOOOOOOL! ⚽🔥");
        setTimeout(() => {
          setPossession({ team: defenderTeam, role: '5' });
          setFeedback("");
        }, 2000);
      } else {
        const salto = !isMultipleChoice ? 2 : 1;
        let nextIndex = currentIndex + salto;
        if (nextIndex >= roles.length) nextIndex = roles.length - 1;

        const nextRole = roles[nextIndex];
        setPossession({ ...possession, role: nextRole });
        setFeedback(salto === 2 ? "¡Gran pase largo! 🚀" : "¡Pase corto preciso! ✅");
      }
    } else {
      setPossession({ team: defenderTeam, role: '5' });
      setFeedback(`¡Intercepción! Turno de ${teams?.[defenderTeam].toUpperCase()} ❌`);
    }

    setUserInput("");
    setIsMultipleChoice(false);
    setCurrentQ(QUESTIONS_DB[Math.floor(Math.random() * QUESTIONS_DB.length)]);
  };

  if (!teams || !teams.white) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6 text-center">
        <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Triangular de Selección</h1>
        <p className="mb-6 text-zinc-400 font-bold uppercase tracking-widest text-xs">
          Seleccionando: <span className="text-white">{!teams ? "Equipo Azul" : !teams.red ? "Equipo Rojo" : "Equipo Blanco"}</span>
        </p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {Object.entries(BANDERAS).map(([name, flag]) => (
            <button key={name} onClick={() => selectTeam(name)} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-white transition-all flex flex-col items-center">
              <span className="text-3xl">{flag}</span>
              <p className="text-[8px] font-black mt-2 uppercase">{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      <div className="flex-[1] p-6 flex flex-col border-r border-zinc-800">
        
        {/* Marcador Triple con Indicador de Posesión */}
        <div className="grid grid-cols-3 gap-2 mb-8 bg-zinc-900/50 p-4 rounded-3xl border border-zinc-800 relative">
          <ScoreItem team={teams.blue} flag={BANDERAS[teams.blue]} score={score.blue} isPlaying={possession.team === 'blue'} color="text-blue-500" />
          <ScoreItem team={teams.red} flag={BANDERAS[teams.red]} score={score.red} isPlaying={possession.team === 'red'} color="text-red-500" />
          <ScoreItem team={teams.white} flag={BANDERAS[teams.white]} score={score.white} isPlaying={possession.team === 'white'} color="text-zinc-100" />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          {/* Indicador de Posesión actual */}
          <div className="mb-4 flex items-center gap-2">
             <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               Ataca: {BANDERAS[currentTeamName]} {currentTeamName}
             </span>
          </div>

          <div className="mb-2 text-xs font-black text-zinc-500 tracking-widest uppercase italic">Pregunta de {currentQ.country}</div>
          <h2 className="text-4xl font-black mb-10 leading-none italic uppercase tracking-tight">{currentQ.question}</h2>

          <div className="space-y-4">
            {!isMultipleChoice ? (
              <>
                <input
                  type="text" value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  className="w-full bg-zinc-900 border-b-4 border-blue-600 p-5 text-2xl font-black outline-none placeholder:text-zinc-800 uppercase focus:bg-zinc-800/50 transition-colors"
                  placeholder="Respuesta..."
                  onKeyDown={e => e.key === 'Enter' && processAnswer(userInput)}
                  autoFocus
                />
                <button onClick={() => processAnswer(userInput)} className="w-full bg-white text-black p-5 font-black uppercase text-xl hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg">
                  {possession.role === "9" || possession.role === "ENG" ? "⚽ ¡Tirar al Arco!" : "Dar Pase Largo"}
                </button>
                <button onClick={() => setIsMultipleChoice(true)} className="w-full border-2 border-zinc-800 p-3 font-black text-zinc-500 text-xs hover:text-white transition-colors uppercase tracking-widest">
                  {possession.role === "9" ? "Tiro Colocado (Opciones)" : "Pase Corto (Opciones)"}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {currentQ.options.map(opt => (
                  <button key={opt} onClick={() => processAnswer(opt)} className="p-5 text-left bg-zinc-900 border border-zinc-800 rounded-xl font-black hover:border-blue-500 transition-all uppercase text-sm">
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          {feedback && <div className="mt-8 p-4 bg-blue-600 text-white font-black italic uppercase text-center text-md skew-x-[-10deg] animate-pulse">{feedback}</div>}
        </div>
      </div>

      <div className="flex-[1.2] bg-zinc-950 relative flex items-center justify-center p-6">
        <div className="relative w-full max-w-[380px] aspect-[3/4] border-2 border-white/10 rounded-sm bg-emerald-900/5 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-1/2 w-full h-px bg-white/10" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

          {formation.map(p => (
            <div key={p.id}>
              <PlayerCircle
                pos={p}
                color="bg-blue-600"
                isVisible={possession.team === 'blue' || defenderTeam === 'blue'}
                isBallOwner={possession.team === 'blue' && p.id === activePlayerId}
              />
              <PlayerCircle
                pos={{ ...p, top: 100 - p.top }}
                color="bg-red-600"
                isVisible={possession.team === 'red' || defenderTeam === 'red'}
                isBallOwner={possession.team === 'red' && p.id === activePlayerId}
              />
              <PlayerCircle
                pos={{ ...p, left: 100 - p.left }}
                color="bg-white"
                isVisible={possession.team === 'white' || defenderTeam === 'white'}
                isBallOwner={possession.team === 'white' && p.id === activePlayerId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ team, flag, score, isPlaying, color }: { team: string, flag: string, score: number, isPlaying: boolean, color: string }) {
  return (
    <div className={`flex flex-col items-center transition-all duration-500 ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-20'}`}>
      <span className="text-4xl mb-1">{flag}</span>
      <div className={`text-[9px] font-black uppercase truncate max-w-[60px] ${color}`}>{team}</div>
      <div className="text-4xl font-black tabular-nums tracking-tighter">{score}</div>
      {isPlaying && <div className="absolute -top-1 w-full flex justify-center"><div className="w-8 h-1 bg-blue-500 rounded-full animate-pulse" /></div>}
    </div>
  );
}

function PlayerCircle({ pos, color, isVisible, isBallOwner }: { pos: any, color: string, isVisible: boolean, isBallOwner: boolean }) {
  return (
    <div
      className={`absolute w-8 h-8 rounded-full border border-white/40 transition-all duration-700 shadow-xl
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
        ${isBallOwner ? `scale-[1.8] z-50 ring-4 ring-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)] ${color}` : `${color}`}
      `}
      style={{ top: `${pos.top}%`, left: `${pos.left}%`, transform: 'translate(-50%, -50%)' }}
    >
      {isBallOwner && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-sm" />
        </div>
      )}
    </div>
  );
}