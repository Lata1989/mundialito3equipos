"use client";
import { useState, useMemo, useEffect } from "react";
import { QUESTIONS_DB } from "./lib/questions";
import { FORMATION } from "./lib/game";
import { playSound } from "./lib/sounds";

// --- CONFIGURACIÓN Y TIPOS ---
const BANDERAS: Record<string, string> = {
  "Japón": "🇯🇵", "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Colombia": "🇨🇴", "Francia": "🇫🇷", "Canadá": "🇨🇦", "Uruguay": "🇺🇾",
  "Brasil": "🇧🇷", "Marruecos": "🇲🇦", "Croacia": "🇭🇷", "España": "🇪🇸", "EEUU": "🇺🇸", "Ecuador": "🇪🇨",
  "Alemania": "🇩🇪", "Bélgica": "🇧🇪", "Paraguay": "🇵🇾", "Arabia": "🇸🇦", "Países Bajos": "🇳🇱", "México": "🇲🇽",
  "Suiza": "🇨🇭", "Austria": "🇦🇹", "Egipto": "🇪🇬", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Portugal": "🇵🇹", "Noruega": "🇳🇴",
};

type Role = "DEF" | "5" | "VOL" | "ENG" | "9";
type TeamColor = 'blue' | 'red' | 'white';

export default function SoccerQuizTriangular() {
  const [teams, setTeams] = useState<{ blue: string, red: string, white: string } | null>(null);
  const [possession, setPossession] = useState<{ team: TeamColor, role: Role }>({ team: 'blue', role: '5' });
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [score, setScore] = useState({ blue: 0, red: 0, white: 0 });
  const [currentQ, setCurrentQ] = useState(QUESTIONS_DB[0]);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(40);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Lógica estricta de recuperaciones según quién pierde el balón
  const getRecoveryRole = (currentRole: Role): Role => {
    switch (currentRole) {
      case "DEF": return "9";      // Si la pierde el 2 (DEF) -> recupera el 9 rival
      case "9": return "DEF";       // Si la pierde el 9 -> recupera el 2 (DEF) rival
      case "5": return "ENG";       // Si la pierde el 5 -> recupera el ENG rival
      case "ENG": return "5";       // Si la pierde el ENG -> recupera el 5 rival
      case "VOL": return "VOL";     // Si la pierde el VOL -> recupera el VOL rival
      default: return "5";
    }
  };

  // Obtener dinámicamente cuál es el equipo defensor actual
  const getDefenderTeam = (currentTeam: TeamColor): TeamColor => {
    if (currentTeam === 'blue') return 'red';
    if (currentTeam === 'red') return 'white';
    return 'blue';
  };

  // Timer de 40 segundos
  useEffect(() => {
    if (!teams || !teams.white) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 40;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [teams, possession]); // Añadido possession para sincronizar correctamente el timer

  // Obtener preguntas disponibles
  const availableQuestions = useMemo(() => {
    if (!teams) return [];
    const allowedCountries = [teams.blue, teams.red, teams.white, "Argentina"];
    return QUESTIONS_DB.filter(q => allowedCountries.includes(q.country));
  }, [teams]);

  // Siguiente pregunta sin repetir
  const getNextQuestion = () => {
    const availableIdx = availableQuestions
      .map((q, idx) => ({ q, idx: QUESTIONS_DB.indexOf(q) }))
      .filter(item => !usedQuestions.includes(item.idx))
      .map(item => item.idx);
    
    if (availableIdx.length === 0) {
      setUsedQuestions([]);
      return QUESTIONS_DB[Math.floor(Math.random() * QUESTIONS_DB.length)];
    }
    
    const randomIdx = availableIdx[Math.floor(Math.random() * availableIdx.length)];
    setUsedQuestions(prev => [...prev, randomIdx]);
    return QUESTIONS_DB[randomIdx];
  };

  const currentTeamName = useMemo(() => {
    if (!teams) return "";
    return teams[possession.team];
  }, [teams, possession.team]);

  const selectTeam = (name: string) => {
    if (!teams) setTeams({ blue: name, red: "", white: "" });
    else if (!teams.red) setTeams({ ...teams, red: name });
    else if (!teams.white) {
      setTeams({ ...teams, white: name });
      setTimeout(() => setCurrentQ(getNextQuestion()), 100);
    }
  };

  const handleTimeOut = () => {
    setPossession(prev => {
      const nextTeam = getDefenderTeam(prev.team);
      const nextRole = getRecoveryRole(prev.role);
      return { team: nextTeam, role: nextRole };
    });
    setTimeLeft(40);
    setIsMultipleChoice(false);
    setCurrentQ(getNextQuestion());
  };

  // Botones del flujo principal
  const handleButtonClick = (buttonType: 'pase-largo' | 'pase-corto' | 'mal-pase' | 'gol') => {
    if (buttonType === 'gol') {
      playSound('gol');
      setScore(prev => ({ ...prev, [possession.team]: prev[possession.team] + 1 }));
      
      // Reinicio de ronda ordenado: Pasa al rival y recupera según el rol que anotó/tenía la pelota
      setPossession(prev => {
        const nextTeam = getDefenderTeam(prev.team);
        const nextRole = getRecoveryRole(prev.role);
        return { team: nextTeam, role: nextRole };
      });
      
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'mal-pase') {
      playSound('perdida');
      
      // Pérdida inmediata: Cambia de equipo atómicamente usando el estado previo exacto
      setPossession(prev => {
        const nextTeam = getDefenderTeam(prev.team);
        const nextRole = getRecoveryRole(prev.role);
        return { team: nextTeam, role: nextRole };
      });
      
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'pase-largo') {
      playSound('pase-largo');
      const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
      const currentIndex = roles.indexOf(possession.role);
      let nextIndex = Math.min(currentIndex + 2, roles.length - 1);
      const nextRole = roles[nextIndex];
      setPossession(prev => ({ ...prev, role: nextRole }));
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'pase-corto') {
      playSound('pase-corto');
      setIsMultipleChoice(true);
    }
  };

  // Resoluciones manuales del docente dentro del panel de opciones abiertas (Pase corto / Tiro colocado)
  const handleMenuDecision = (isSuccess: boolean) => {
    if (isSuccess) {
      if (possession.role === "9") {
        playSound('gol');
        setScore(prev => ({ ...prev, [possession.team]: prev[possession.team] + 1 }));
        setPossession(prev => {
          const nextTeam = getDefenderTeam(prev.team);
          const nextRole = getRecoveryRole(prev.role);
          return { team: nextTeam, role: nextRole };
        });
      } else {
        playSound('pase-corto');
        const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
        const currentIndex = roles.indexOf(possession.role);
        let nextIndex = Math.min(currentIndex + 1, roles.length - 1);
        setPossession(prev => ({ ...prev, role: roles[nextIndex] }));
      }
    } else {
      playSound('perdida');
      setPossession(prev => {
        const nextTeam = getDefenderTeam(prev.team);
        const nextRole = getRecoveryRole(prev.role);
        return { team: nextTeam, role: nextRole };
      });
    }
    
    setTimeLeft(40);
    setIsMultipleChoice(false);
    setCurrentQ(getNextQuestion());
  };

  if (!teams || !teams.white) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 text-center transition-colors duration-300 ${
        isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-slate-900'
      }`}>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`mb-8 px-6 py-3 rounded-xl font-bold transition-colors shadow-md ${
            isDarkTheme ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {isDarkTheme ? '☀️ Tema Claro' : '🌙 Tema Oscuro'}
        </button>

        <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Triangular de Selección</h1>
        <p className={`mb-8 font-black uppercase tracking-widest text-sm ${isDarkTheme ? 'text-zinc-400' : 'text-slate-600'}`}>
          Seleccionando: <span className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}>{!teams ? "Equipo Azul" : !teams.red ? "Equipo Rojo" : "Equipo Blanco"}</span>
        </p>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 max-w-5xl w-full">
          {Object.entries(BANDERAS).map(([name, flag]) => (
            <button 
              key={name} 
              onClick={() => selectTeam(name)} 
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center transform hover:scale-105 active:scale-95 shadow-md ${
                isDarkTheme ? 'bg-zinc-900 border-zinc-800 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-500'
              }`}
            >
              <span className="text-5xl md:text-6xl drop-shadow-sm">{flag}</span>
              <p className="text-[10px] font-black mt-3 uppercase tracking-wider text-center">{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Determinar quién defiende para renderizar la cancha
  const activeDefenderTeam = getDefenderTeam(possession.team);

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen font-sans overflow-hidden transition-colors duration-300 ${
      isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      <div className={`flex-[1] p-6 flex flex-col ${isDarkTheme ? 'border-r border-zinc-800' : 'border-r border-slate-300'}`}>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`mb-4 px-3 py-1 rounded text-sm font-bold transition-colors self-start ${
            isDarkTheme ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>

        <div className={`grid grid-cols-3 gap-2 mb-8 p-4 rounded-3xl border transition-colors ${
          isDarkTheme ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-200/50 border-slate-400'
        }`}>
          <ScoreItem team={teams.blue} flag={BANDERAS[teams.blue]} score={score.blue} isPlaying={possession.team === 'blue'} color="text-blue-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.red} flag={BANDERAS[teams.red]} score={score.red} isPlaying={possession.team === 'red'} color="text-red-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.white} flag={BANDERAS[teams.white]} score={score.white} isPlaying={possession.team === 'white'} color="text-zinc-400" isDark={isDarkTheme} />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          <div className="mb-2 flex items-center gap-2">
            <span className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${
              isDarkTheme ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-blue-100 border-blue-400 text-blue-600'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Ataca: {BANDERAS[currentTeamName]} {currentTeamName} ({possession.role})
            </span>
          </div>

          <div className={`mb-4 text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            ⏱️ {timeLeft}s
          </div>

          <div className={`mb-2 text-xs font-black tracking-widest uppercase italic ${isDarkTheme ? 'text-zinc-500' : 'text-slate-600'}`}>
            Pregunta de {currentQ.country}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-10 leading-none italic uppercase tracking-tight">{currentQ.question}</h2>

          <div className="space-y-3">
            {!isMultipleChoice ? (
              <>
                {possession.role === "9" ? (
                  <>
                    <button 
                      onClick={() => handleButtonClick('gol')}
                      className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-orange-600 text-white border-orange-600 hover:bg-orange-700"
                    >
                      🚀 Tiro Fuerte (¡Gol Directo!)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('pase-corto')}
                      className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      🎯 Tiro Colocado (Ver Opciones)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('mal-pase')}
                      className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${
                        isDarkTheme ? 'bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40' : 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      ❌ Errar Tiro Fuerte (Pérdida)
                    </button>
                  </>
                ) : possession.role === "ENG" ? (
                  <>
                    <button 
                      onClick={() => handleButtonClick('gol')}
                      className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-orange-600 text-white border-orange-600 hover:bg-orange-700"
                    >
                      🚀 Tiro Fuerte (¡Gol Directo!)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('pase-corto')}
                      className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      🎯 Pase Corto (Ver Opciones)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('mal-pase')}
                      className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${
                        isDarkTheme ? 'bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40' : 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      ❌ Errar Jugada (Pérdida)
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleButtonClick('pase-largo')}
                      className={`w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 ${
                        isDarkTheme ? 'bg-white text-black border-white hover:bg-zinc-100' : 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      🔫 Pase Largo
                    </button>
                    <button 
                      onClick={() => handleButtonClick('pase-corto')}
                      className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      🎯 Pase Corto (Ver Opciones)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('mal-pase')}
                      className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${
                        isDarkTheme ? 'bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40' : 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      ❌ Pelota Perdida / Error
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className={`text-sm font-black tracking-widest uppercase ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
                  {possession.role === "9" ? "Opciones para definir Colocado:" : "Opciones para descargar Pase Corto:"}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {currentQ.options.map(opt => (
                    <div 
                      key={opt} 
                      className={`p-4 font-bold rounded-lg text-base uppercase border ${
                        isDarkTheme ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      • {opt}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => handleMenuDecision(true)}
                    className="p-5 font-black rounded-xl transition-all text-lg uppercase bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md"
                  >
                    {possession.role === "9" ? "⚽ ¡GOL!" : "✅ Pase Exitoso"}
                  </button>
                  <button 
                    onClick={() => handleMenuDecision(false)}
                    className="p-5 font-black rounded-xl transition-all text-lg uppercase bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-md"
                  >
                    {possession.role === "9" ? "❌ Tiro Errado" : "❌ Pase Cortado"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campo de Fútbol */}
      <div className={`flex-[1.2] relative flex items-center justify-center p-6 ${isDarkTheme ? 'bg-zinc-950' : 'bg-slate-100'}`}>
        <div className={`relative w-full max-w-[380px] aspect-[3/4] border-2 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ${
          isDarkTheme ? 'border-white/10 bg-emerald-900/20' : 'border-slate-400/40 bg-emerald-100/40'
        }`}>
          <div className={`absolute top-1/2 w-full h-px ${isDarkTheme ? 'bg-white/10' : 'bg-slate-400/30'}`} />
          <div className={`absolute top-1/2 left-1/2 w-24 h-24 border rounded-full -translate-x-1/2 -translate-y-1/2 ${
            isDarkTheme ? 'border-white/10' : 'border-slate-400/30'
          }`} />

          {FORMATION.map(p => (
            <div key={p.id}>
              {/* Equipo Azul */}
              <PlayerCircle pos={p} color="bg-blue-600" isVisible={possession.team === 'blue' || activeDefenderTeam === 'blue'} isBallOwner={possession.team === 'blue' && p.role === possession.role} />
              {/* Equipo Rojo */}
              <PlayerCircle pos={{ ...p, top: 100 - p.top }} color="bg-red-600" isVisible={possession.team === 'red' || activeDefenderTeam === 'red'} isBallOwner={possession.team === 'red' && p.role === possession.role} />
              {/* Equipo Blanco */}
              <PlayerCircle pos={{ ...p, left: 100 - p.left }} color="bg-white" isVisible={possession.team === 'white' || activeDefenderTeam === 'white'} isBallOwner={possession.team === 'white' && p.role === possession.role} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Subcomponentes ScoreItem y PlayerCircle
function ScoreItem({ team, flag, score, isPlaying, color, isDark }: { team: string, flag: string, score: number, isPlaying: boolean, color: string, isDark: boolean }) {
  return (
    <div className={`flex flex-col items-center transition-all duration-500 relative ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
      <span className="text-4xl mb-1">{flag}</span>
      <div className={`text-[10px] font-black uppercase truncate max-w-[70px] text-center ${color}`}>{team}</div>
      <div className="text-4xl font-black tabular-nums tracking-tighter">{score}</div>
      {isPlaying && <div className="absolute -top-2 w-full flex justify-center"><div className={`w-8 h-1 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} animate-pulse`} /></div>}
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