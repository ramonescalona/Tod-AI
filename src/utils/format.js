export function formatCurrency(v) {
  if (!v && v !== 0) return '—'
  if (Math.abs(v) >= 1e9) return '₱' + (v / 1e9).toFixed(2) + 'B'
  if (Math.abs(v) >= 1e6) return '₱' + (v / 1e6).toFixed(1) + 'M'
  if (Math.abs(v) >= 1e3) return '₱' + (v / 1e3).toFixed(0) + 'K'
  return '₱' + Math.round(v).toLocaleString()
}

export function formatNumber(v) {
  if (!v && v !== 0) return '—'
  return v.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatPercent(v, decimals = 1) {
  return (v * 100).toFixed(decimals) + '%'
}

export function clampPercent(v) {
  return Math.max(0, Math.min(100, v * 100))
}
