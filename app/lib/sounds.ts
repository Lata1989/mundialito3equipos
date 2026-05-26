/**
 * SISTEMA DE SONIDOS - MUNDIALITO
 * 
 * Este archivo maneja todos los efectos de sonido del juego.
 * 
 * TIPOS DE SONIDOS:
 * - pase-largo: Sonido cuando se da un pase largo
 * - pase-corto: Sonido cuando se da un pase corto
 * - perdida: Sonido cuando se pierde la pelota o falla
 * - gol: Sonido cuando se marca un gol
 * 
 * INSTALACIÓN:
 * 1. Coloca los archivos MP3 en: public/sounds/
 *    - public/sounds/pase-largo.mp3
 *    - public/sounds/pase-corto.mp3
 *    - public/sounds/perdida.mp3
 *    - public/sounds/gol.mp3
 * 
 * 2. Si no tienes los archivos, descárgalos desde:
 *    - Freesound.org
 *    - Zapsplat.com
 *    - BBC Sound Effects
 * 
 * 3. Convierte a MP3 si es necesario (max 200KB recomendado)
 */

export type SoundEffect = "pase-largo" | "pase-corto" | "perdida" | "gol";

export const SOUND_URLS: Record<SoundEffect, string> = {
  "pase-largo": "/sounds/pase-largo.mp3",
  "pase-corto": "/sounds/pase-corto.mp3",
  "perdida": "/sounds/perdida.mp3",
  "gol": "/sounds/gol.mp3",
};

/**
 * Reproduce un efecto de sonido
 * 
 * EJEMPLO DE USO:
 * import { playSound } from './lib/sounds';
 * 
 * playSound('gol');        // Reproduce sonido de gol
 * playSound('pase-largo'); // Reproduce sonido de pase largo
 * playSound('perdida');    // Reproduce sonido de pérdida
 * playSound('pase-corto'); // Reproduce sonido de pase corto
 */
export function playSound(effect: SoundEffect) {
  // Solo en el navegador (no en SSR)
  if (typeof window === "undefined") return;

  const url = SOUND_URLS[effect];
  if (!url) return;

  try {
    const audio = new Audio(url);
    audio.volume = 0.6; // Volumen entre 0 y 1 (0.6 = 60%)
    audio.currentTime = 0; // Reiniciar el audio si estaba en reproducción
    
    // Intenta reproducir, pero no falla si el navegador lo bloquea
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Reproducción de audio bloqueada:", error);
      });
    }
  } catch (error) {
    console.log("Error al reproducir sonido:", error);
  }
}

/**
 * Versión alternativa con control mejorado si lo necesitas:
 * 
 * export function playSoundWithOptions(
 *   effect: SoundEffect,
 *   options?: { volume?: number; loop?: boolean }
 * ) {
 *   if (typeof window === "undefined") return;
 * 
 *   const url = SOUND_URLS[effect];
 *   if (!url) return;
 * 
 *   const audio = new Audio(url);
 *   audio.volume = options?.volume ?? 0.6;
 *   audio.loop = options?.loop ?? false;
 *   audio.play().catch(() => {});
 * }
 */

