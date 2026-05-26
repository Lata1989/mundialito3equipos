# 🏗️ ARQUITECTURA DEL CÓDIGO

## Estructura de componentes

### 1. Pantalla de Selección de Equipos

```
┌─────────────────────────────────────────┐
│  ☀️ / 🌙 Toggle Tema                   │
├─────────────────────────────────────────┤
│     TRIANGULAR DE SELECCIÓN             │
│                                         │
│  Seleccionando: Equipo Azul             │
│                                         │
│  🇯🇵 🏴 🇨🇴 🇫🇷 🇨🇦 🇺🇾              │
│  Japón Ing Colombia Francia Canadá Uru  │
│                                         │
│  🇧🇷 🇲🇦 🇭🇷 🇪🇸 🇺🇸 🇪🇨              │
│  Brasil Marr Croacia España EEUU Ecua   │
│                                         │
│  [+ 12 países más]                      │
└─────────────────────────────────────────┘
```

### 2. Pantalla de Juego (Tema Oscuro)

```
┌─────────────────────────────────────────────────────────────┐
│ ☀️                      │ CAMPO TRASLÚCIDO                 │
├──────────────────────────────────────────┬─────────────────┤
│                                          │                 │
│  🇦🇷 Argentina 0                        │  ┌─────────────┐ │
│  🇧🇷 Brasil 0                           │  │             │ │
│  🇪🇸 España 0                           │  │   □ ← DEF  │ │
│                                          │  │  □ ← VOL   │ │
│ ⏱️ 40s                                   │  │  □ ← ENG   │ │
│                                          │  │   □ ← 9    │ │
│ Pregunta de Argentina                   │  │             │ │
│                                          │  │             │ │
│ ¿En qué ciudad se encuentra              │  │             │ │
│ el famoso Obelisco?                      │  └─────────────┘ │
│                                          │                 │
│ [🔫 Pase Largo]                          │ Jugadores de:   │
│ [🎯 Pase Corto]                          │ • Azul         │
│                                          │ • Rojo         │
│ O mostrar opciones...                    │ • Blanco       │
│                                          │                 │
└──────────────────────────────────────────┴─────────────────┘
```

### 3. Pantalla de Juego (Tema Claro)

Misma estructura pero con colores claros (blanco/gris).

---

## Componentes React

### 1. `ScoreItem` - Marcador de equipo

```tsx
function ScoreItem({ 
  team, 
  flag, 
  score, 
  isPlaying, 
  color, 
  isDark 
}) {
  return (
    <div className={`scale-${isPlaying ? '110' : '90'}`}>
      <span className="text-4xl">{flag}</span>
      <div className={`${color}`}>{team}</div>
      <div className="text-4xl">{score}</div>
    </div>
  );
}
```

**Props**:
- `team`: Nombre del país (ej: "Argentina")
- `flag`: Emoji de bandera
- `score`: Número de goles
- `isPlaying`: Si este equipo tiene la pelota
- `color`: Clase de color del texto
- `isDark`: Si está en tema oscuro

### 2. `PlayerCircle` - Jugador en el campo

```tsx
function PlayerCircle({ 
  pos, 
  color, 
  isVisible, 
  isBallOwner 
}) {
  return (
    <div className={`absolute w-8 h-8 rounded-full`} 
         style={{ top: `${pos.top}%`, left: `${pos.left}%` }}>
      {isBallOwner && <div>⚪ (pelota)</div>}
    </div>
  );
}
```

**Props**:
- `pos`: Posición { top: número, left: número, id: número }
- `color`: Color (bg-blue-600, bg-red-600, bg-white)
- `isVisible`: Si se muestra el jugador
- `isBallOwner`: Si tiene la pelota

---

## Estados principales

```tsx
const [teams, setTeams] = useState(null);              // 3 equipos seleccionados
const [possession, setPossession] = useState({
  team: 'blue',  // 'blue' | 'red' | 'white'
  role: '5'      // 'DEF' | '5' | 'VOL' | 'ENG' | '9'
});
const [isMultipleChoice, setIsMultipleChoice] = useState(false); // Mostrar opciones
const [score, setScore] = useState({ blue: 0, red: 0, white: 0 });
const [currentQ, setCurrentQ] = useState(QUESTIONS_DB[0]);
const [usedQuestions, setUsedQuestions] = useState([]);
const [timeLeft, setTimeLeft] = useState(40);
const [isDarkTheme, setIsDarkTheme] = useState(true);
```

---

## Flujo de juego

```
1. INICIO
   ↓
2. Seleccionar 3 equipos
   ↓
3. Cargar primera pregunta (filtrada por equipos)
   ↓
4. Mostrar pregunta con 40 segundos
   ↓
5. Docente elige botón (Pase largo/corto/Mal pase/Gol)
   ↓
6. Sistema actualiza:
   - Pelota (nuevo jugador)
   - Pregunta (nueva, sin repetir)
   - Timer (reinicia en 40)
   - Sonido (reproduce según acción)
   ↓
7. Volver a paso 4
```

---

## Campo de Fútbol

El campo es un `div` traslúcido con:

```tsx
<div className="relative w-full max-w-[380px] aspect-[3/4] border-2 rounded-sm overflow-hidden">
  {/* Línea central horizontal */}
  <div className="absolute top-1/2 w-full h-px" />
  
  {/* Círculo central */}
  <div className="absolute top-1/2 left-1/2 w-24 h-24 border rounded-full" />
  
  {/* Jugadores (DIVs posicionados con %) */}
  {FORMATION.map(p => <PlayerCircle ... />)}
</div>
```

**Personalización**:

Para cambiar el aspecto traslúcido:
```tsx
// Actual
bg-emerald-900/5 border-white/10

// Opciones:
bg-emerald-900/10  // Más verde
bg-emerald-900/2   // Más traslúcido
bg-green-900/5     // Verde más intenso
```

---

## Atajos de teclado

(No implementados aún, se pueden agregar):

```tsx
const handleKeyPress = (e) => {
  if (e.key === '1') handleButtonClick('pase-largo');
  if (e.key === '2') handleButtonClick('pase-corto');
  if (e.key === '3' && isMultipleChoice) handleShortPassOption(true);
  if (e.key === '0' && isMultipleChoice) handleShortPassOption(false);
};

useEffect(() => {
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

---

## Mejoras futuras

1. **Atajos de teclado** para que el docente pueda usar números
2. **Historial de jugadas** para revisar lo jugado
3. **Estadísticas por jugador** (quién falló más, etc)
4. **Animaciones** cuando se marcan goles
5. **Modo multijugador** (tableta para docente + pantalla grande)
6. **Persistencia de datos** (guardar partidos)
7. **Música de fondo** (opcional)
8. **Efectos visuales** cuando se pierden la pelota

---

## Archivos y carpetas clave

```
mundialito3equipos/
├── app/
│   ├── page.tsx              ← Lógica principal
│   ├── globals.css           ← Estilos y tema
│   ├── layout.tsx            ← Layout base
│   └── lib/
│       ├── game.ts           ← Tipos y formación
│       ├── questions.ts      ← Base de preguntas
│       ├── sounds.ts         ← Sistema de sonidos
│       ├── sounds-guide.ts   ← Guía (para referencia)
│       └── sounds-guide.ts   ← Comentarios útiles
├── public/
│   └── sounds/               ← Archivos MP3
│       ├── pase-largo.mp3
│       ├── pase-corto.mp3
│       ├── perdida.mp3
│       └── gol.mp3
├── CAMBIOS_v2.md            ← Este documento
└── package.json
```

---

## Debugging

Si algo no funciona:

1. **Timer no funciona**: Revisar que `teams` esté completo
2. **Sonidos no suenan**: Revisar que los archivos MP3 existan en `public/sounds/`
3. **Preguntas se repiten**: Verificar `usedQuestions` state
4. **Tema no cambia**: Verificar que `isDarkTheme` actualiza el DOM
5. **Jugadores no se ven**: Revisar que `isVisible` sea true

---

## Notas importantes

⚠️ Los sonidos son **opcionales** - El juego funciona sin ellos
⚠️ Las validaciones son **MANUALES** - El docente decide qué botón presionar
⚠️ El timer es **AUTOMÁTICO** - Llama `handleTimeOut()` al llegar a 0
⚠️ Las preguntas se **FILTRAN** - Solo de los equipos seleccionados + Argentina
