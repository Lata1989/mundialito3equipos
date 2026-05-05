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

// Formación de 5 jugadores por equipo
const formation: Player[] = [
  { id: 1, role: "DEF", top: 87, left: 60 },
  { id: 2, role: "5",   top: 65, left: 50 },
  { id: 3, role: "VOL", top: 45, left: 30 },
  { id: 4, role: "ENG", top: 30, left: 70 },
  { id: 5, role: "9",   top: 15, left: 50 },
];

const QUESTIONS_DB = [
  { country: "España", question: "¿Quién pintó 'Las Meninas'?", answer: "Velazquez", options: ["Goya", "Velazquez", "El Greco", "Picasso"] },
  { country: "Argentina", question: "¿En qué ciudad se encuentra el famoso Obelisco?", answer: "Buenos Aires", options: ["Mendoza", "Córdoba", "Buenos Aires", "Rosario"] },
  { country: "Brasil", question: "¿Qué ciudad es la capital de Brasil?", answer: "Brasília", options: ["Río", "São Paulo", "Brasília", "Salvador"] },
];

export default function SoccerQuizTriangular() {
  const [teams, setTeams] = useState<{ blue: string, red: string, white: string } | null>(null);
  const [possession, setPossession] = useState<{ team: TeamColor, role: Role }>({ team: 'blue', role: '5' });
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({ blue: 0, red: 0, white: 0 });
  const [feedback, setFeedback] = useState("");
  const [currentQ, setCurrentQ] = useState(QUESTIONS_DB[0]);

  // Lógica Triangular: ¿Quién es el defensor actual?
  // Azul ataca a Rojo | Rojo ataca a Blanco | Blanco ataca a Azul
  const defenderTeam = useMemo((): TeamColor => {
    if (possession.team === 'blue') return 'red';
    if (possession.team === 'red') return 'white';
    return 'blue';
  }, [possession.team]);

  const activePlayerId = useMemo(() => {
    const playersInRole = formation.filter(p => p.role === possession.role);
    return playersInRole[0].id; // Con 5 jugadores, solo hay uno por rol
  }, [possession.role]);

  const selectTeam = (name: string) => {
    if (!teams) setTeams({ blue: name, red: "", white: "" });
    else if (!teams.red) setTeams({ ...teams, red: name });
    else if (!teams.white) {
      setTeams({ ...teams, white: name });
    }
  };

  const processAnswer = (ans: string) => {
    const isCorrect = ans.toLowerCase().trim() === currentQ.answer.toLowerCase();
    const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
    
    if (isCorrect) {
      const currentIndex = roles.indexOf(possession.role);
      if (currentIndex === roles.length - 1) { // GOL
        setScore(prev => ({ ...prev, [possession.team]: prev[possession.team] + 1 }));
        setFeedback("¡GOOOOOOOL! ⚽");
        setTimeout(() => {
          setPossession({ team: defenderTeam, role: '5' }); // Saca el que recibió el gol
          setFeedback("");
        }, 2000);
      } else {
        setPossession({ ...possession, role: roles[currentIndex + 1] });
        setFeedback("¡Pase correcto! ✅");
      }
    } else {
      // Si falla, el defensor recupera la pelota
      setPossession({ team: defenderTeam, role: '5' });
      setFeedback(`¡Recuperó el equipo ${defenderTeam.toUpperCase()}! ❌`);
    }
    setUserInput("");
    setIsMultipleChoice(false);
    setCurrentQ(QUESTIONS_DB[Math.floor(Math.random() * QUESTIONS_DB.length)]);
  };

  if (!teams || !teams.white) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white p-6">
        <h1 className="text-3xl font-black mb-8 italic">SELECCIONA LOS 3 EQUIPOS</h1>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {Object.entries(BANDERAS).map(([name, flag]) => (
            <button key={name} onClick={() => selectTeam(name)} className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:bg-zinc-800 flex flex-col items-center">
              <span className="text-4xl">{flag}</span>
              <p className="text-[10px] font-bold mt-2">{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* PANEL IZQUIERDO: JUEGO */}
      <div className="flex-[1] p-8 flex flex-col border-r border-zinc-800">
        <div className="grid grid-cols-3 gap-4 mb-10 bg-zinc-900 p-4 rounded-2xl">
          <ScoreItem team="AZUL" name={teams.blue} flag={BANDERAS[teams.blue]} score={score.blue} active={possession.team === 'blue' || defenderTeam === 'blue'} />
          <ScoreItem team="ROJO" name={teams.red} flag={BANDERAS[teams.red]} score={score.red} active={possession.team === 'red' || defenderTeam === 'red'} />
          <ScoreItem team="BLANCO" name={teams.white} flag={BANDERAS[teams.white]} score={score.white} active={possession.team === 'white' || defenderTeam === 'white'} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-black mb-10 leading-tight italic uppercase">{currentQ.question}</h2>
          
          <div className="space-y-4">
            {!isMultipleChoice ? (
              <>
                <input 
                  type="text" value={userInput} 
                  onChange={e => setUserInput(e.target.value)}
                  className="w-full bg-zinc-900 border-b-4 border-blue-500 p-6 text-2xl font-black outline-none"
                  placeholder="ESCRIBE AQUÍ..."
                  onKeyDown={e => e.key === 'Enter' && processAnswer(userInput)}
                />
                <button onClick={() => processAnswer(userInput)} className="w-full bg-white text-black p-5 font-black uppercase text-xl transition-transform active:scale-95">DAR PASE LARGO / PATEAR</button>
                <button onClick={() => setIsMultipleChoice(true)} className="w-full border-2 border-zinc-700 p-3 font-bold text-zinc-400 text-sm hover:text-white transition-colors">BUSCAR PASE CORTO (OPCIONES)</button>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map(opt => (
                  <button key={opt} onClick={() => processAnswer(opt)} className="p-5 text-left bg-zinc-900 border-2 border-zinc-800 rounded-xl font-black hover:border-white transition-all">
                    {opt.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
          {feedback && <div className="mt-8 p-4 bg-blue-600 text-white font-black italic uppercase text-center animate-pulse">{feedback}</div>}
        </div>
      </div>

      {/* PANEL DERECHO: ESTADIO */}
      <div className="flex-[1] bg-black relative flex items-center justify-center p-4">
        <div className="relative w-full max-w-[400px] aspect-[3/4] border-4 border-white/20 rounded-lg bg-emerald-950/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Líneas del campo */}
          <div className="absolute top-1/2 w-full h-[2px] bg-white/10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

          {/* Renderizado de Jugadores */}
          {formation.map(p => (
            <div key={p.id}>
              {/* Equipo Azul */}
              <PlayerCircle 
                pos={p} 
                color="bg-blue-600" 
                isVisible={possession.team === 'blue' || defenderTeam === 'blue'} 
                isBallOwner={possession.team === 'blue' && p.id === activePlayerId} 
              />
              {/* Equipo Rojo */}
              <PlayerCircle 
                pos={{...p, top: 100 - p.top}} 
                color="bg-red-600" 
                isVisible={possession.team === 'red' || defenderTeam === 'red'} 
                isBallOwner={possession.team === 'red' && p.id === activePlayerId} 
              />
              {/* Equipo Blanco */}
              <PlayerCircle 
                pos={{...p, left: 100 - p.left}} 
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

// Componentes Auxiliares
function ScoreItem({ team, name, flag, score, active }: { team: string, name: string, flag: string, score: number, active: boolean }) {
  return (
    <div className={`text-center transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-2xl">{flag}</span>
      <p className="text-[10px] font-black text-zinc-500 uppercase">{team}</p>
      <p className="text-2xl font-black">{score}</p>
    </div>
  );
}

function PlayerCircle({ pos, color, isVisible, isBallOwner }: { pos: any, color: string, isVisible: boolean, isBallOwner: boolean }) {
  return (
    <div 
      className={`absolute w-8 h-8 rounded-full border-2 border-white/80 transition-all duration-700 flex items-center justify-center
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
        ${isBallOwner ? `scale-150 z-50 ring-4 ring-yellow-400 shadow-[0_0_25px_rgba(255,255,255,0.4)] ${color}` : color}
      `}
      style={{ top: `${pos.top}%`, left: `${pos.left}%`, transform: 'translate(-50%, -50%)' }}
    >
      {isBallOwner && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
    </div>
  );
}