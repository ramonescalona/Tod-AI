export function statusColor(pct) {
  if (pct >= 0.9) return '#085041'
  if (pct >= 0.6) return '#1D9E75'
  if (pct >= 0.3) return '#BA7517'
  return '#D85A30'
}

export function statusLabel(pct) {
  if (pct >= 0.9) return 'Nearly done'
  if (pct >= 0.6) return 'On track'
  if (pct >= 0.3) return 'In progress'
  return 'Early stage'
}

export function stageKey(pct) {
  if (pct >= 0.9) return 'nd'
  if (pct >= 0.6) return 'ot'
  if (pct >= 0.3) return 'ip'
  return 'es'
}
