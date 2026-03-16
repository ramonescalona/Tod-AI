import { statusColor, statusLabel } from '../../utils/colors'
import { formatCurrency, clampPercent } from '../../utils/format'

export default function ManagerCard({ manager, onClick }) {
  const color = statusColor(manager.wPct)
  const initials = manager.mgr.split(' ').map(w => w[0]).join('')

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', border: '1px solid #e5e5e3', borderRadius: 14,
        padding: '18px 22px', cursor: 'pointer', marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: color + '18', color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{manager.mgr}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
              {manager.count} pkg{manager.count !== 1 ? 's' : ''} · {formatCurrency(manager.totalC)}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color }}>
            {(manager.wPct * 100).toFixed(0)}%
          </div>
          <div style={{ fontSize: 11, color: '#888', fontWeight: 400, marginTop: 2 }}>
            {statusLabel(manager.wPct)}
          </div>
        </div>
      </div>
      <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: clampPercent(manager.wPct) + '%', background: color, borderRadius: 4 }} />
      </div>
    </div>
  )
}
