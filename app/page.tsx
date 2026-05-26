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
  }, [teams]);

  // No es necesario aplicar clases al documento, Tailwind maneja esto automáticamente

  // Obtener preguntas disponibles (equipos seleccionados + Argentina)
  const availableQuestions = useMemo(() => {
    if (!teams) return [];
    const allowedCountries = [teams.blue, teams.red, teams.white, "Argentina"];
    return QUESTIONS_DB.filter(q => allowedCountries.includes(q.country));
  }, [teams]);

  // Obtener siguiente pregunta sin repetir
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

  const defenderTeam = useMemo((): TeamColor => {
    if (possession.team === 'blue') return 'red';
    if (possession.team === 'red') return 'white';
    return 'blue';
  }, [possession.team]);

  const activePlayerId = useMemo(() => {
    return FORMATION.find(p => p.role === possession.role)?.id || 1;
  }, [possession.role]);

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

  // Recuperación correcta de pelota según quién la pierde
  const getRecoveryRole = (currentRole: Role): Role => {
    switch (currentRole) {
      case "DEF": return "9";      // Si pierde DEF → recupera 9
      case "9": return "DEF";       // Si pierde 9 → recupera DEF (del siguiente equipo)
      case "5": return "ENG";       // Si pierde 5 → recupera ENG
      case "ENG": return "5";       // Si pierde ENG → recupera 5
      case "VOL": return "VOL";     // Si pierde VOL → recupera VOL (del siguiente equipo)
      default: return "5";
    }
  };

  const handleTimeOut = () => {
    // Timeout: se pierde la pelota
    const newRole = getRecoveryRole(possession.role);
    setPossession({ team: defenderTeam, role: newRole });
    setTimeLeft(40);
    setIsMultipleChoice(false);
    setCurrentQ(getNextQuestion());
  };

  // Botones de respuesta según posición
  const handleButtonClick = (buttonType: 'pase-largo' | 'pase-corto' | 'mal-pase' | 'gol') => {
    // El docente decide si es correcto o incorrecto
    // No hay validación automática
    
    if (buttonType === 'gol') {
      playSound('gol'); // 🔊 SONIDO DE GOL
      setScore(prev => ({ ...prev, [possession.team]: prev[possession.team] + 1 }));
      const newRole = getRecoveryRole(possession.role);
      setPossession({ team: defenderTeam, role: newRole });
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'mal-pase') {
      playSound('perdida'); // 🔊 SONIDO DE PÉRDIDA
      // Se pierde la pelota
      const newRole = getRecoveryRole(possession.role);
      setPossession({ team: defenderTeam, role: newRole });
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'pase-largo') {
      playSound('pase-largo'); // 🔊 SONIDO DE PASE LARGO
      // Pase largo: avanza 2 posiciones
      const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
      const currentIndex = roles.indexOf(possession.role);
      let nextIndex = Math.min(currentIndex + 2, roles.length - 1);
      const nextRole = roles[nextIndex];
      setPossession({ ...possession, role: nextRole });
      setTimeLeft(40);
      setIsMultipleChoice(false);
      setCurrentQ(getNextQuestion());
    } else if (buttonType === 'pase-corto') {
      playSound('pase-corto'); // 🔊 SONIDO DE PASE CORTO
      // Pase corto: muestra opciones
      setIsMultipleChoice(true);
    }
  };

  const handleShortPassOption = (selected: boolean) => {
    // El docente eligió una opción para pase corto
    if (selected) {
      playSound('pase-corto'); // 🔊 SONIDO DE PASE CORTO EXITOSO
      // Avanza 1 posición
      const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
      const currentIndex = roles.indexOf(possession.role);
      let nextIndex = Math.min(currentIndex + 1, roles.length - 1);
      const nextRole = roles[nextIndex];
      setPossession({ ...possession, role: nextRole });
    } else {
      playSound('perdida'); // 🔊 SONIDO DE PÉRDIDA
      // Se pierde la pelota
      const newRole = getRecoveryRole(possession.role);
      setPossession({ team: defenderTeam, role: newRole });
    }
    setTimeLeft(40);
    setIsMultipleChoice(false);
    setCurrentQ(getNextQuestion());
  };

  if (!teams || !teams.white) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 text-center transition-colors duration-300 ${
        isDarkTheme 
          ? 'bg-zinc-950 text-white' 
          : 'bg-slate-100 text-slate-900'
      }`}>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`mb-8 px-4 py-2 rounded-lg font-bold transition-colors ${
            isDarkTheme
              ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {isDarkTheme ? '☀️ Tema Claro' : '🌙 Tema Oscuro'}
        </button>

        <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Triangular de Selección</h1>
        <p className={`mb-6 font-bold uppercase tracking-widest text-xs ${isDarkTheme ? 'text-zinc-400' : 'text-slate-600'}`}>
          Seleccionando: <span className={isDarkTheme ? 'text-white' : 'text-slate-900'}>{!teams ? "Equipo Azul" : !teams.red ? "Equipo Rojo" : "Equipo Blanco"}</span>
        </p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {Object.entries(BANDERAS).map(([name, flag]) => (
            <button 
              key={name} 
              onClick={() => selectTeam(name)} 
              className={`p-3 rounded-xl border transition-all flex flex-col items-center ${
                isDarkTheme
                  ? 'bg-zinc-900 border-zinc-800 hover:border-white'
                  : 'bg-white border-slate-300 hover:border-slate-600'
              }`}
            >
              <span className="text-3xl">{flag}</span>
              <p className="text-[8px] font-black mt-2 uppercase">{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen font-sans overflow-hidden transition-colors duration-300 ${
      isDarkTheme
        ? 'bg-zinc-950 text-white'
        : 'bg-slate-100 text-slate-900'
    }`}>
      <div className={`flex-[1] p-6 flex flex-col ${isDarkTheme ? 'border-r border-zinc-800' : 'border-r border-slate-300'}`}>
        {/* Toggle Tema */}
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className={`mb-4 px-3 py-1 rounded text-sm font-bold transition-colors ${
            isDarkTheme
              ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>

        {/* Marcador Triple */}
        <div className={`grid grid-cols-3 gap-2 mb-8 p-4 rounded-3xl border transition-colors ${
          isDarkTheme
            ? 'bg-zinc-900/50 border-zinc-800'
            : 'bg-slate-200/50 border-slate-400'
        }`}>
          <ScoreItem team={teams.blue} flag={BANDERAS[teams.blue]} score={score.blue} isPlaying={possession.team === 'blue'} color="text-blue-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.red} flag={BANDERAS[teams.red]} score={score.red} isPlaying={possession.team === 'red'} color="text-red-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.white} flag={BANDERAS[teams.white]} score={score.white} isPlaying={possession.team === 'white'} color="text-zinc-100" isDark={isDarkTheme} />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          {/* Indicador de Posesión actual */}
          <div className="mb-2 flex items-center gap-2">
            <span className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${
              isDarkTheme
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                : 'bg-blue-100 border-blue-400 text-blue-600'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Ataca: {BANDERAS[currentTeamName]} {currentTeamName}
            </span>
          </div>

          {/* Timer */}
          <div className={`mb-4 text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            ⏱️ {timeLeft}s
          </div>

          <div className={`mb-2 text-xs font-black tracking-widest uppercase italic ${isDarkTheme ? 'text-zinc-500' : 'text-slate-600'}`}>
            Pregunta de {currentQ.country}
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-10 leading-none italic uppercase tracking-tight">{currentQ.question}</h2>

          {/* Opciones según posición */}
          <div className="space-y-3">
            {!isMultipleChoice ? (
              <>
                {/* Botones según posición del jugador */}
                {possession.role === "9" ? (
                  // El 9 tiene dos botones de tiro
                  <>
                    <button 
                      onClick={() => handleButtonClick('gol')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded ${
                        isDarkTheme
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      ⚽ Tiro Colocado
                    </button>
                    <button 
                      onClick={() => handleButtonClick('gol')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded ${
                        isDarkTheme
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      ⚽ Tiro Fuerte
                    </button>
                  </>
                ) : possession.role === "ENG" ? (
                  // El enganche tiene pase largo (tiro) y pase corto (opciones)
                  <>
                    <button 
                      onClick={() => handleButtonClick('gol')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded ${
                        isDarkTheme
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      🔫 Pase Largo (Tiro)
                    </button>
                    <button 
                      onClick={() => handleButtonClick('pase-corto')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded border-2 ${
                        isDarkTheme
                          ? 'border-zinc-800 text-zinc-500 hover:text-white hover:border-blue-500'
                          : 'border-slate-400 text-slate-600 hover:text-slate-900 hover:border-blue-500'
                      }`}
                    >
                      🎯 Pase Corto (Opciones)
                    </button>
                  </>
                ) : (
                  // Otros roles: pase largo y pase corto
                  <>
                    <button 
                      onClick={() => handleButtonClick('pase-largo')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded ${
                        isDarkTheme
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      🔫 Pase Largo
                    </button>
                    <button 
                      onClick={() => handleButtonClick('pase-corto')}
                      className={`w-full p-5 font-black uppercase text-xl transition-all active:scale-95 shadow-lg rounded border-2 ${
                        isDarkTheme
                          ? 'border-zinc-800 text-zinc-500 hover:text-white hover:border-blue-500'
                          : 'border-slate-400 text-slate-600 hover:text-slate-900 hover:border-blue-500'
                      }`}
                    >
                      🎯 Pase Corto (Opciones)
                    </button>
                  </>
                )}
              </>
            ) : (
              // Mostrar opciones de pase corto
              <div className="grid grid-cols-1 gap-2">
                {currentQ.options.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => handleShortPassOption(true)}
                    className={`p-5 text-left font-black rounded-xl transition-all text-sm uppercase ${
                      isDarkTheme
                        ? 'bg-zinc-900 border border-zinc-800 hover:border-blue-500'
                        : 'bg-white border border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    ✅ {opt}
                  </button>
                ))}
              </div>
            )}
            
            {/* Botón "Mal el Pase" siempre visible */}
            <button 
              onClick={() => handleShortPassOption(false)}
              className={`p-5 font-black rounded-xl transition-all text-sm uppercase w-full ${
                isDarkTheme
                  ? 'bg-red-900/30 border-2 border-red-600 text-red-400 hover:bg-red-900/50'
                  : 'bg-red-100 border-2 border-red-400 text-red-600 hover:bg-red-200'
              }`}
            >
              ❌ Mal el Pase
            </button>
          </div>
        </div>
      </div>

      {/* Campo de Fútbol */}
      <div className={`flex-[1.2] relative flex items-center justify-center p-6 ${isDarkTheme ? 'bg-zinc-950' : 'bg-slate-100'}`}>
        <div className={`relative w-full max-w-[380px] aspect-[3/4] border-2 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ${
          isDarkTheme
            ? 'border-white/10 bg-emerald-900/20'
            : 'border-slate-400/40 bg-emerald-100/40'
        }`}>
          {/* Línea central */}
          <div className={`absolute top-1/2 w-full h-px ${isDarkTheme ? 'bg-white/10' : 'bg-slate-400/30'}`} />
          {/* Círculo central */}
          <div className={`absolute top-1/2 left-1/2 w-24 h-24 border rounded-full -translate-x-1/2 -translate-y-1/2 ${
            isDarkTheme
              ? 'border-white/10'
              : 'border-slate-400/30'
          }`} />

          {FORMATION.map(p => (
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

function ScoreItem({ team, flag, score, isPlaying, color, isDark }: { team: string, flag: string, score: number, isPlaying: boolean, color: string, isDark: boolean }) {
  return (
    <div className={`flex flex-col items-center transition-all duration-500 ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-20'}`}>
      <span className="text-4xl mb-1">{flag}</span>
      <div className={`text-[9px] font-black uppercase truncate max-w-[60px] ${color}`}>{team}</div>
      <div className="text-4xl font-black tabular-nums tracking-tighter">{score}</div>
      {isPlaying && <div className={`absolute -top-1 w-full flex justify-center ${isDark ? 'bg-blue-500' : 'bg-blue-400'} rounded-full animate-pulse`}><div className="w-8 h-1" /></div>}
    </div>
  );
}

interface PlayerPosition {
  id: number;
  role: "DEF" | "5" | "VOL" | "ENG" | "9";
  top: number;
  left: number;
}

function PlayerCircle({ pos, color, isVisible, isBallOwner }: { pos: PlayerPosition, color: string, isVisible: boolean, isBallOwner: boolean }) {
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