import { PORTFOLIO_SUMMARY } from '../../data/constants'
import { formatCurrency } from '../../utils/format'

export default function PortfolioSummary() {
  return (
    <div style={{ marginTop: 24, padding: '16px 20px', background: '#fff', borderRadius: 12 }}>
      <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Portfolio summary</h4>
      {PORTFOLIO_SUMMARY.map(({ label, value }, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee', fontSize: 13 }}>
          <span style={{ color: '#888' }}>{label}</span>
          <span style={{ fontWeight: 600 }}>{formatCurrency(value)}</span>
        </div>
      ))}
    </div>
  )
}
