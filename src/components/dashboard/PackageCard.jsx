import { statusColor } from '../../utils/colors'
import { formatCurrency, clampPercent } from '../../utils/format'

export default function PackageCard({ pkg, onClick, showMeta = false }) {
  const color = statusColor(pkg.pct)

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', border: '1px solid #e5e5e3', borderRadius: 12,
        padding: '15px 18px', cursor: 'pointer', marginBottom: 6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {pkg.name}
          </div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
            {showMeta ? `${pkg.mn} · ${pkg.pn}${pkg.contract > 0 ? ' · ' + formatCurrency(pkg.contract) : ''}` : formatCurrency(pkg.contract)}
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color, flexShrink: 0, marginLeft: 12 }}>
          {(pkg.pct * 100).toFixed(1)}%
        </div>
      </div>
      <div style={{ height: 6, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: clampPercent(pkg.pct) + '%', background: color, borderRadius: 4 }} />
      </div>
      {pkg.hasCSR && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#085041', fontWeight: 600 }}>
          📊 Open detailed Cost Status Report
        </div>
      )}
    </div>
  )
}
