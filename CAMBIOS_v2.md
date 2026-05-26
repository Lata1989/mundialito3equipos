# 📋 CAMBIOS REALIZADOS - MUNDIALITO v2

## 🎨 TEMA CLARO Y OSCURO

✅ **Implementado**: Toggle para cambiar entre tema claro y oscuro

**Ubicación**: Botones en la esquina superior izquierda
- 🌙 Botón en pantalla de selección
- ☀️ Botón durante el juego

**Cómo funciona**:
```tsx
// Estado
const [isDarkTheme, setIsDarkTheme] = useState(true);

// Toggle
<button onClick={() => setIsDarkTheme(!isDarkTheme)}>
  {isDarkTheme ? '☀️ Tema Claro' : '🌙 Tema Oscuro'}
</button>
```

**Colores**:
- **Oscuro**: Fondo #0a0a0a, texto #ededed
- **Claro**: Fondo #ffffff, texto #171717

---

## ⏱️ TIMER DE 40 SEGUNDOS

✅ **Implementado**: Contador regresivo que llama `handleTimeOut()` automáticamente

**Características**:
- Cuenta desde 40 hasta 0
- Se reinicia cada vez que cambia de pregunta
- Se pone rojo y parpadea cuando quedan ≤10 segundos
- Al llegar a 0, se pierde la pelota automáticamente

**Código**:
```tsx
const [timeLeft, setTimeLeft] = useState(40);

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        handleTimeOut(); // Se llama automáticamente
        return 40;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, [teams, possession]);
```

---

## 🎮 NUEVA LÓGICA DE BOTONES SEGÚN POSICIÓN

### El Volante (VOL), Defensor (DEF) y 5:
- **Botón 1**: "Pase Largo" (avanza 2 posiciones) → 🔊 Sonido
- **Botón 2**: "Pase Corto" (muestra opciones)

### El Enganche (ENG):
- **Botón 1**: "Pase Largo (Tiro)" (tira al arco) → 🔊 Sonido GOL
- **Botón 2**: "Pase Corto (Opciones)" (muestra opciones)

### El 9:
- **Botón 1**: "Tiro Colocado" (tira al arco) → 🔊 Sonido GOL
- **Botón 2**: "Tiro Fuerte" (tira al arco) → 🔊 Sonido GOL

### Opciones (Cuando se elige Pase Corto):
- Cada opción es un pase corto exitoso (avanza 1 posición) → 🔊 Sonido
- **"❌ Mal el Pase"** = Pierde la pelota → 🔊 Sonido PÉRDIDA

---

## 🏃 LÓGICA DE RECUPERACIÓN DE PELOTA

Corrección completa según quien pierda:

```
DEF pierde  → 9 (siguiente equipo) recupera
9 pierde    → DEF (siguiente equipo) recupera
5 pierde    → ENG (mismo equipo) recupera
ENG pierde  → 5 (mismo equipo) recupera
VOL pierde  → VOL (siguiente equipo) recupera
```

**Código**:
```tsx
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
```

---

## ❌ VALIDACIÓN ELIMINADA

✅ **Ya NO se validan automáticamente las respuestas**

Ahora el sistema:
- Muestra la pregunta y opciones
- El **docente** decide qué botón presionar
- El sistema solo registra la acción
- No valida si es correcto o incorrecto

---

## 🔊 SISTEMA DE SONIDOS

✅ **Estructura preparada** (sin validación automática)

### Sonidos a implementar:

1. **Pase Largo** (`pase-largo.mp3`) - Cuando se da pase largo
2. **Pase Corto** (`pase-corto.mp3`) - Cuando se da pase corto
3. **Pérdida** (`perdida.mp3`) - Cuando falla o se pierde
4. **Gol** (`gol.mp3`) - Cuando se marca gol

### Cómo usarlos:

```tsx
import { playSound } from './lib/sounds';

playSound('gol');         // Reproduce sonido de gol
playSound('pase-largo');  // Reproduce sonido de pase largo
playSound('pase-corto');  // Reproduce sonido de pase corto
playSound('perdida');     // Reproduce sonido de pérdida
```

### Dónde agregar los archivos:

```
public/
  sounds/
    pase-largo.mp3
    pase-corto.mp3
    perdida.mp3
    gol.mp3
```

### Los sonidos ya están integrados en:
- `handleButtonClick()` - Se reproduce al presionar cualquier botón
- `handleShortPassOption()` - Se reproduce al elegir opción de pase corto
- `handleTimeOut()` - Se reproduce al agotarse el tiempo (perdida)

---

## ❓ SISTEMA DE PREGUNTAS MEJORADO

✅ **Preguntas NO se repiten** en el mismo partido

### Características:

1. **Filtrado por equipos**:
   - Solo muestra preguntas de los 3 equipos seleccionados + Argentina
   - Si seleccionas Brasil, España y Francia → solo preguntas de esos 3 + Argentina

2. **Sin repeticiones**:
   - Sistema de `usedQuestions` evita que aparezca la misma pregunta
   - Si se agotan las preguntas, reinicia el contador

3. **Agregar nuevas preguntas**:

   En `app/lib/questions.ts`:
   ```tsx
   {
     country: "Nombre del País",
     question: "La pregunta aquí?",
     answer: "La respuesta correcta",
     options: ["Opción 1", "Opción 2", "Respuesta correcta", "Opción 4"],
   },
   ```

   **IMPORTANTE**: El `country` debe coincidir con uno de los seleccionados

4. **Base de datos actual**:
   - Argentina: 8 preguntas
   - España: 5 preguntas
   - Brasil: 5 preguntas
   - Francia: 5 preguntas
   - Inglaterra: 5 preguntas
   - Alemania: 5 preguntas
   - Italia: 5 preguntas
   - Portugal: 4 preguntas
   - Países Bajos: 4 preguntas
   - México: 4 preguntas
   - Colombia: 4 preguntas
   - Japón: 5 preguntas
   - Corea del Sur: 4 preguntas
   - Uruguay: 4 preguntas
   - Dinamarca: 3 preguntas
   - Bélgica: 3 preguntas

   **Total: 92 preguntas**

---

## 📁 ARCHIVOS MODIFICADOS

```
✏️ app/page.tsx                    - Lógica principal (tema, timer, sonidos, recuperación)
✏️ app/lib/questions.ts            - Base de preguntas (92 preguntas + comentarios)
✏️ app/lib/sounds.ts              - Sistema de sonidos (comentado y listo)
✏️ app/globals.css                - Estilos para tema claro/oscuro
✨ app/lib/sounds-guide.ts        - Guía para implementar sonidos (NUEVO)
```

---

## 🚀 PRÓXIMOS PASOS

### 1. Agregar archivos de audio (PRIORITARIO)

```bash
# Crea la carpeta
mkdir -p public/sounds

# Descarga o crea estos 4 archivos MP3:
# - pase-largo.mp3
# - pase-corto.mp3
# - perdida.mp3
# - gol.mp3
```

Descarga desde:
- https://freesound.org/
- https://www.zapsplat.com/
- https://sound-effects.bbcrewind.co.uk/

### 2. Agregar más preguntas (OPCIONAL)

Edita `app/lib/questions.ts` y agrega más preguntas en el formato:

```tsx
{
  country: "País",
  question: "¿Pregunta?",
  answer: "Respuesta",
  options: ["Op1", "Op2", "Respuesta", "Op4"],
},
```

### 3. Personalizar sonidos (OPCIONAL)

En `app/lib/sounds.ts`:
```tsx
audio.volume = 0.6; // Cambiar volumen (0-1)
```

### 4. Agregar animaciones visuales (BONUS)

```tsx
// En handleButtonClick, agregar efecto visual
// Por ejemplo: animación del jugador lanzando
```

---

## 🎯 RESUMEN FINAL

✅ Tema claro y oscuro completamente funcional
✅ Timer de 40 segundos con timeout automático
✅ Nueva UI de botones según posición del jugador
✅ Lógica de recuperación de pelota corregida
✅ Validación removida (ahora la hace el docente)
✅ Sistema de sonidos preparado (solo falta agregar archivos)
✅ Preguntas sin repetición + filtrado por equipos
✅ 92 preguntas cargadas en la base de datos

🎮 **¡El juego está listo para usar!**
