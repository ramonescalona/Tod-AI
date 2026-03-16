import { formatCurrency } from '../../utils/format'

export default function KPICards({ totalContract, activePackages, weightedProgress }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '20px 0' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px' }}>
        <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 8 }}>Gross contract</label>
        <div style={{ fontSize: 26, fontWeight: 700 }}>{formatCurrency(totalContract)}</div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px' }}>
        <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 8 }}>Active packages</label>
        <div style={{ fontSize: 26, fontWeight: 700 }}>{activePackages}</div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px' }}>
        <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 8 }}>Weighted progress</label>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#085041' }}>
          {(weightedProgress * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  )
}
