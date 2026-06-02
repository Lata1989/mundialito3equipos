"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { QUESTIONS_DB } from "./lib/questions";
import { FORMATION } from "./lib/game";

// --- CONFIGURACIÓN Y TIPOS ---
const BANDERAS: Record<string, string> = {
  Japón: "🇯🇵",
  Inglaterra: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Colombia: "🇨🇴",
  Francia: "🇫🇷",
  Canadá: "🇨🇦",
  Uruguay: "🇺🇾",
  Brasil: "🇧🇷",
  Marruecos: "🇲🇦",
  Croacia: "🇭🇷",
  España: "🇪🇸",
  EEUU: "🇺🇸",
  Ecuador: "🇪🇨",
  Alemania: "🇩🇪",
  Bélgica: "🇧🇪",
  Paraguay: "🇵🇾",
  Arabia: "🇸🇦",
  "Países Bajos": "🇳🇱",
  México: "🇲🇽",
  Suiza: "🇨🇭",
  Austria: "🇦🇹",
  Egipto: "🇪🇬",
  Escocia: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Portugal: "🇵🇹",
  Noruega: "🇳🇴",
};

type Role = "ARQ" | "DEF" | "5" | "VOL" | "ENG" | "9";
type TeamColor = "blue" | "red" | "white";

const DORSALES: Record<Role, string> = {
  ARQ: "1",
  DEF: "2",
  "5": "5",
  VOL: "8",
  ENG: "10",
  "9": "9",
};

interface PlayerPosition {
  id: number;
  role: Role;
  top: number;
  left: number;
}

export default function SoccerQuizTriangular() {
  const [teams, setTeams] = useState<{
    blue: string;
    red: string;
    white: string;
  } | null>(null);
  const [possession, setPossession] = useState<{ team: TeamColor; role: Role }>(
    { team: "blue", role: "5" },
  );
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [score, setScore] = useState({ blue: 0, red: 0, white: 0 });
  
  // --- ESTADOS DE PREGUNTAS ---
  const [poolQuestions, setPoolQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState<any>(null);

  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const recentPasesCortos = useRef<string[]>([]);
  const recentPasesLargos = useRef<string[]>([]);
  const recentGoles = useRef<string[]>([]);
  const recentErrores = useRef<string[]>([]);

  // --- HOOKS DE OPTIMIZACIÓN (SIEMPRE ARRIBA DE TODO) ---
  const availableQuestionsPool = useMemo(() => {
    if (!teams || !teams.blue || !teams.red || !teams.white) return [];
    const allowedCountries = [teams.blue, teams.red, teams.white, "Argentina"];
    return QUESTIONS_DB.filter((q) => allowedCountries.includes(q.country));
  }, [teams]);

  const completeFormation = useMemo<PlayerPosition[]>(() => {
    const baseFields = FORMATION as any[];
    const goalkeeper: PlayerPosition = { 
      id: 99, 
      role: "ARQ" as Role, 
      top: 97, 
      left: 50 
    };
    return [goalkeeper, ...baseFields];
  }, []);

  // --- TIMER ---
  useEffect(() => {
    if (!teams || !teams.white || !isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [teams, possession, isTimerRunning]);

  // --- REPRODUCTOR DE AUDIOS ---
  const triggerAudio = (
    type: "pase-corto" | "pase-largo" | "gol" | "error" | "incorrecta",
  ) => {
    let audioFile = "";

    const getUniqueRandom = (
      pool: string[],
      recentRef: React.MutableRefObject<string[]>,
      maxHistory: number,
    ) => {
      let validOptions = pool.filter((f) => !recentRef.current.includes(f));
      if (validOptions.length === 0) {
        recentRef.current = [];
        validOptions = pool;
      }
      const chosen = validOptions[Math.floor(Math.random() * validOptions.length)];
      recentRef.current.push(chosen);
      if (recentRef.current.length > maxHistory) {
        recentRef.current.shift();
      }
      return chosen;
    };

    switch (type) {
      case "pase-corto": {
        const pool = ["PASE CORTO.m4a", "PASE CORTO CENTURION (1).m4a", "PASE CORTO MARADONA.m4a"];
        audioFile = getUniqueRandom(pool, recentPasesCortos, 1);
        break;
      }
      case "pase-largo": {
        const pool = [
          "PASE LARGO.m4a",
          "BRRR PASE LARGO.m4a",
          "PASE LARGO INVENTE.m4a",
          "PASE LARGO MARADONA .m4a",
          "PASE LARGO POCHO.m4a",
          "PASE LARGO POMELO.m4a",
          "pase largo vignolo.m4a",
        ];
        audioFile = getUniqueRandom(pool, recentPasesLargos, 3);
        break;
      }
      case "gol": {
        const pool = [
          "gol 1.m4a",
          "gol 2.m4a",
          "gol 3.m4a",
          "gol almiron.m4a",
          "gola.m4a",
          "GOL BENZEMAAAA.m4a",
          "gol canrtalo cantalo.m4a",
          "GOL DI MARIA.m4a",
          "GOL PALERMO .m4a",
          "relato gol araujo.m4a",
          "marteee gol araujo.m4a",
        ];
        audioFile = getUniqueRandom(pool, recentGoles, 5);
        break;
      }
      case "error": {
        const pool = Array.from({ length: 17 }, (_, i) => `pase incorrecto ${i + 1}.m4a`);
        audioFile = getUniqueRandom(pool, recentErrores, 8);
        break;
      }
      case "incorrecta":
        audioFile = "incorrecta respuesta.m4a";
        break;
    }

    if (audioFile) {
      const audio = new Audio(`/sounds/${audioFile}`);
      audio.play().catch((err) => console.log("Error al reproducir audio:", err));
    }
  };

  const getRecoveryRole = (currentRole: Role): Role => {
    switch (currentRole) {
      case "DEF": return "9";
      case "9": return "DEF";
      case "5": return "ENG";
      case "ENG": return "5";
      case "VOL": return "VOL";
      default: return "5";
    }
  };

  const getDefenderTeam = (currentTeam: TeamColor): TeamColor => {
    if (currentTeam === "blue") return "red";
    if (currentTeam === "red") return "white";
    return "blue";
  };

  const advanceToNextPlay = (updatedPool?: any[]) => {
    const currentPool = updatedPool || poolQuestions;

    if (currentPool.length === 0) {
      const freshPool = [...availableQuestionsPool];
      const randomIdx = Math.floor(Math.random() * freshPool.length);
      setCurrentQ(freshPool[randomIdx]);
      setPoolQuestions(freshPool.filter((_, idx) => idx !== randomIdx));
      return;
    }

    const randomIdx = Math.floor(Math.random() * currentPool.length);
    setCurrentQ(currentPool[randomIdx]);
    setPoolQuestions(currentPool.filter((_, idx) => idx !== randomIdx));
  };

  const selectTeam = (name: string) => {
    if (!teams) setTeams({ blue: name, red: "", white: "" });
    else if (!teams.red) setTeams({ ...teams, red: name });
    else if (!teams.white) {
      const finalTeams = { ...teams, white: name };
      setTeams(finalTeams);
      
      const allowed = [finalTeams.blue, finalTeams.red, finalTeams.white, "Argentina"];
      const initialPool = QUESTIONS_DB.filter((q) => allowed.includes(q.country));
      
      if (initialPool.length > 0) {
        const randomIdx = Math.floor(Math.random() * initialPool.length);
        setCurrentQ(initialPool[randomIdx]);
        setPoolQuestions(initialPool.filter((_, idx) => idx !== randomIdx));
      } else {
        setCurrentQ(QUESTIONS_DB[0]);
      }
    }
  };

  const handleTimeOut = () => {
    triggerAudio("incorrecta");
    setIsTimerRunning(false); 
    setPossession((prev) => {
      const nextTeam = getDefenderTeam(prev.team);
      const nextRole = getRecoveryRole(prev.role);
      return { team: nextTeam, role: nextRole };
    });
    setTimeLeft(30);
    setIsMultipleChoice(false);
    advanceToNextPlay();
  };

  const handleSkipQuestion = () => {
    setIsTimerRunning(false);
    setIsMultipleChoice(false);
    setTimeLeft(30);
    advanceToNextPlay();
  };

  const handleButtonClick = (
    buttonType: "pase-largo" | "pase-corto" | "mal-pase" | "gol",
  ) => {
    setIsTimerRunning(false); 
    if (buttonType === "gol") {
      triggerAudio("gol");
      setScore((prev) => ({
        ...prev,
        [possession.team]: prev[possession.team] + 1,
      }));
      setPossession((prev) => ({
        team: getDefenderTeam(prev.team),
        role: "5", // CORREGIDO: El equipo que recibe el gol saca desde el medio con el '5'
      }));
      setTimeLeft(30);
      setIsMultipleChoice(false);
      advanceToNextPlay();
    } else if (buttonType === "mal-pase") {
      triggerAudio("error");
      setPossession((prev) => ({
        team: getDefenderTeam(prev.team),
        role: getRecoveryRole(prev.role),
      }));
      setTimeLeft(30);
      setIsMultipleChoice(false);
      advanceToNextPlay();
    } else if (buttonType === "pase-largo") {
      triggerAudio("pase-largo");
      const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
      const currentIndex = roles.indexOf(possession.role as any);
      let nextIndex = Math.min(currentIndex + 2, roles.length - 1);
      setPossession((prev) => ({ ...prev, role: roles[nextIndex] }));
      setTimeLeft(30);
      setIsMultipleChoice(false);
      advanceToNextPlay();
    } else if (buttonType === "pase-corto") {
      setIsMultipleChoice(true);
    }
  };

  const handleMenuDecision = (isSuccess: boolean) => {
    setIsTimerRunning(false); 
    if (isSuccess) {
      if (possession.role === "9") {
        triggerAudio("gol");
        setScore((prev) => ({
          ...prev,
          [possession.team]: prev[possession.team] + 1,
        }));
        setPossession((prev) => ({
          team: getDefenderTeam(prev.team),
          role: "5", // CORREGIDO: Al definir colocado y meter gol, también saca el '5' rival
        }));
      } else {
        triggerAudio("pase-corto");
        const roles: Role[] = ["DEF", "5", "VOL", "ENG", "9"];
        const currentIndex = roles.indexOf(possession.role as any);
        let nextIndex = Math.min(currentIndex + 1, roles.length - 1);
        setPossession((prev) => ({ ...prev, role: roles[nextIndex] }));
      }
    } else {
      triggerAudio("error");
      setPossession((prev) => ({
        team: getDefenderTeam(prev.team),
        role: getRecoveryRole(prev.role),
      }));
    }

    setTimeLeft(30);
    setIsMultipleChoice(false);
    advanceToNextPlay();
  };

  // RENDERS TEMPRANOS DESPUÉS DE DECLARAR TODOS LOS HOOKS
  if (!teams || !teams.white) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 text-center transition-colors duration-300 ${isDarkTheme ? "bg-zinc-950 text-white" : "bg-slate-100 text-slate-900"}`}>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={`mb-8 px-6 py-3 rounded-xl font-bold transition-colors shadow-md ${isDarkTheme ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}>
          {isDarkTheme ? "☀️ Tema Claro" : "🌙 Tema Oscuro"}
        </button>
        <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Triangular de Selecciones</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 max-w-5xl w-full">
          {Object.entries(BANDERAS).map(([name, flag]) => (
            <button key={name} onClick={() => selectTeam(name)} className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center transform hover:scale-105 active:scale-95 shadow-md ${isDarkTheme ? "bg-zinc-900 border-zinc-800 hover:border-blue-500" : "bg-white border-slate-200 hover:border-blue-500"}`}>
              <span className="text-5xl md:text-6xl drop-shadow-sm">{flag}</span>
              <p className="text-[10px] font-black mt-3 uppercase tracking-wider text-center">{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const activeDefenderTeam = getDefenderTeam(possession.team);
  const currentTeamName = teams[possession.team];

  const getDynamicPosition = (p: PlayerPosition, currentRenderColor: TeamColor) => {
    if (possession.team === currentRenderColor) {
      return { top: p.top, left: p.left };
    } else if (activeDefenderTeam === currentRenderColor) {
      return { top: 100 - p.top, left: p.left };
    }
    return { top: 0, left: 0 };
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkTheme ? "bg-zinc-950 text-white" : "bg-slate-100 text-slate-900"}`}>
      {/* Panel Izquierdo de Preguntas */}
      <div className={`flex-[1] p-6 flex flex-col ${isDarkTheme ? "border-r border-zinc-800" : "border-r border-slate-300"}`}>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={`mb-4 px-3 py-1 rounded text-sm font-bold transition-colors self-start ${isDarkTheme ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}>
          {isDarkTheme ? "☀️" : "🌙"}
        </button>

        <div className={`grid grid-cols-3 gap-2 mb-8 p-4 rounded-3xl border transition-colors ${isDarkTheme ? "bg-zinc-900/50 border-zinc-800" : "bg-slate-200/50 border-slate-400"}`}>
          <ScoreItem team={teams.blue} flag={BANDERAS[teams.blue]} score={score.blue} isPlaying={possession.team === "blue"} color="text-blue-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.red} flag={BANDERAS[teams.red]} score={score.red} isPlaying={possession.team === "red"} color="text-red-500" isDark={isDarkTheme} />
          <ScoreItem team={teams.white} flag={BANDERAS[teams.white]} score={score.white} isPlaying={possession.team === "white"} color="text-zinc-400" isDark={isDarkTheme} />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          <div className="mb-2 flex items-center gap-2">
            <span className={`px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${isDarkTheme ? "bg-blue-600/20 border-blue-500/50 text-blue-400" : "bg-blue-100 border-blue-400 text-blue-600"}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Ataca: {BANDERAS[currentTeamName]} {currentTeamName} (Dorsal {DORSALES[possession.role] || "1"})
            </span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-slate-300 dark:border-zinc-800 w-full justify-between sm:w-fit">
            <div className={`text-3xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>⏱️ {timeLeft}s</div>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setIsTimerRunning(true)} className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${isTimerRunning ? "bg-green-600 text-white opacity-40 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 shadow-md"}`} disabled={isTimerRunning}>▶️ Play</button>
              <button onClick={() => setIsTimerRunning(false)} className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${!isTimerRunning ? "bg-amber-500 text-white opacity-40 cursor-not-allowed" : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"}`} disabled={!isTimerRunning}>⏸️ Pausa</button>
              <button onClick={handleSkipQuestion} className={`px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-95 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md border-b-2 border-indigo-800`}>🔄 Cambiar</button>
            </div>
          </div>

          <div className={`mb-2 text-xs font-black tracking-widest uppercase italic ${isDarkTheme ? "text-zinc-500" : "text-slate-600"}`}>Pregunta de {currentQ?.country || "Fútbol"}</div>
          <h2 className="text-3xl md:text-4xl font-black mb-10 leading-none italic uppercase tracking-tight">{currentQ?.question}</h2>

          <div className="space-y-3">
            {!isMultipleChoice ? (
              <>
                {possession.role === "9" ? (
                  <>
                    <button onClick={() => handleButtonClick("gol")} className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-orange-600 text-white border-orange-600 hover:bg-orange-700">🚀 Reventar el Arco (GOOOOL!!!!)</button>
                    <button onClick={() => handleButtonClick("pase-corto")} className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">🎯 Tiro colocado (Ver Opciones)</button>
                    <button onClick={() => handleButtonClick("mal-pase")} className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${isDarkTheme ? "bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40" : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"}`}>❌ Tirarla a la tribuna</button>
                  </>
                ) : possession.role === "ENG" ? (
                  <>
                    <button onClick={() => handleButtonClick("gol")} className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-orange-600 text-white border-orange-600 hover:bg-orange-700">🚀 Tiro fuerte (¡Gol!)</button>
                    <button onClick={() => handleButtonClick("pase-corto")} className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">🎯 Pase corto (Ver Opciones)</button>
                    <button onClick={() => handleButtonClick("mal-pase")} className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${isDarkTheme ? "bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40" : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"}`}>❌ Mal pase</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleButtonClick("pase-largo")} className={`w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 ${isDarkTheme ? "bg-white text-black border-white hover:bg-zinc-100" : "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"}`}>🔫 Pase Largo</button>
                    <button onClick={() => handleButtonClick("pase-corto")} className="w-full p-5 font-black uppercase text-lg transition-all active:scale-95 shadow-lg rounded border-2 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">🎯 Pase Corto (Ver Opciones)</button>
                    <button onClick={() => handleButtonClick("mal-pase")} className={`w-full p-4 font-black rounded-lg transition-all text-base uppercase border-2 ${isDarkTheme ? "bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/40" : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"}`}>❌ Pelota perdida</button>
                  </>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className={`text-sm font-black tracking-widest uppercase ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>{possession.role === "9" ? "Opciones para definir Colocado:" : "Opciones para descargar Pase Corto:"}</div>
                <div className="grid grid-cols-1 gap-2">
                  {currentQ?.options.map((opt: string) => (
                    <div key={opt} className={`p-4 font-bold rounded-lg text-base uppercase border ${isDarkTheme ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-slate-200 text-slate-700"}`}>• {opt}</div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={() => handleMenuDecision(true)} className="p-5 font-black rounded-xl transition-all text-lg uppercase bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md">{possession.role === "9" ? "⚽ ¡GOL!" : "✅ Pase Exitoso"}</button>
                  <button onClick={() => handleMenuDecision(false)} className="p-5 font-black rounded-xl transition-all text-lg uppercase bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-md">{possession.role === "9" ? "❌ Tiro Errado" : "❌ Pase Cortado"}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campo de Fútbol */}
      <div className={`flex-[2] relative flex items-center justify-center p-4 min-h-[70vh] lg:min-h-0 ${isDarkTheme ? "bg-zinc-950" : "bg-slate-100"}`}>
        <div className={`relative w-full max-w-[850px] max-h-[85vh] aspect-[3/4] border-4 rounded-2xl overflow-hidden shadow-[0_0_65px_rgba(0,0,0,0.65)] transition-all duration-300 bg-gradient-to-b from-emerald-600 to-green-700 ${isDarkTheme ? "border-zinc-700" : "border-slate-800"}`}>
          {/* LÍNEAS CANCHA */}
          <div className="absolute top-1/2 w-full h-[3px] bg-white/40 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-44 h-44 border-[3px] border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-[60%] h-[15%] border-b-[3px] border-x-[3px] border-white/40 -translate-x-1/2" />
          <div className="absolute top-0 left-1/2 w-[30%] h-[6%] border-b-[3px] border-x-[3px] border-white/30 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-[60%] h-[15%] border-t-[3px] border-x-[3px] border-white/40 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-[30%] h-[6%] border-t-[3px] border-x-[3px] border-white/30 -translate-x-1/2" />
          <div className="absolute inset-3 border-2 border-white/20 rounded-lg pointer-events-none" />

          {completeFormation.map((p) => {
            const bluePos = getDynamicPosition(p, "blue");
            const redPos = getDynamicPosition(p, "red");
            const whitePos = getDynamicPosition(p, "white");

            return (
              <div key={p.id}>
                <PlayerCircle
                  pos={bluePos}
                  color="bg-blue-600"
                  isVisible={possession.team === "blue" || activeDefenderTeam === "blue"}
                  isBallOwner={possession.team === "blue" && p.role === possession.role}
                  role={p.role}
                />
                <PlayerCircle
                  pos={redPos}
                  color="bg-red-600"
                  isVisible={possession.team === "red" || activeDefenderTeam === "red"}
                  isBallOwner={possession.team === "red" && p.role === possession.role}
                  role={p.role}
                />
                <PlayerCircle
                  pos={whitePos}
                  color="bg-white"
                  isVisible={possession.team === "white" || activeDefenderTeam === "white"}
                  isBallOwner={possession.team === "white" && p.role === possession.role}
                  role={p.role}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Subcomponentes Internos
function ScoreItem({ team, flag, score, isPlaying, color, isDark }: { team: string; flag: string; score: number; isPlaying: boolean; color: string; isDark: boolean }) {
  return (
    <div className={`flex flex-col items-center transition-all duration-500 relative ${isPlaying ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
      <span className="text-4xl mb-1">{flag}</span>
      <div className={`text-[10px] font-black uppercase truncate max-w-[70px] text-center ${color}`}>{team}</div>
      <div className="text-4xl font-black tabular-nums tracking-tighter">{score}</div>
      {isPlaying && <div className="absolute -top-2 w-full flex justify-center"><div className={`w-8 h-1 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-400"} animate-pulse`} /></div>}
    </div>
  );
}

function PlayerCircle({ pos, color, isVisible, isBallOwner, role }: { pos: { top: number; left: number }; color: string; isVisible: boolean; isBallOwner: boolean; role: Role }) {
  const isArq = role === "ARQ";
  
  return (
    <div
      className={`absolute w-12 h-12 rounded-full border-2 transition-all duration-500 shadow-xl flex items-center justify-center font-black text-sm text-black
        ${isArq ? "border-yellow-300 scale-95" : "border-white/70"}
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}
        ${isBallOwner ? `scale-[1.4] z-50 ring-4 ring-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.7)] ${color}` : `${color}`}
      `}
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {isBallOwner ? <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse shadow-md" /> : DORSALES[role]}
    </div>
  );
}