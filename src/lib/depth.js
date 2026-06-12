// Profondeur simulée en fonction de la progression du scroll (0 → 1).
// Descente jusqu'au fond (−42 m) sur 84% de la page, puis remontée
// vers le palier de sécurité (−3 m) sur la fin — le CTA final.

export const MAX_DEPTH = 42
export const SAFETY_STOP = 3
const TURN = 0.84

export function depthAt(progress) {
  const p = Math.min(Math.max(progress, 0), 1)
  if (p <= TURN) {
    return (p / TURN) * MAX_DEPTH
  }
  const t = (p - TURN) / (1 - TURN)
  return MAX_DEPTH - (MAX_DEPTH - SAFETY_STOP) * t
}

export function scrollProgress() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  return max > 0 ? window.scrollY / max : 0
}
