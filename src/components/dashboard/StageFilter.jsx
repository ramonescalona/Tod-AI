import { STAGES } from '../../data/constants'

export default function StageFilter({ stage, onStage, counts }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
      {STAGES.map(s => {
        const active = stage === s.k
        const count = s.k === 'all' ? counts.total : (counts[s.k] || 0)
        return (
          <button
            key={s.k}
            onClick={() => onStage(stage === s.k && s.k !== 'all' ? 'all' : s.k)}
            style={{
              padding: '9px 18px',
              border: `1.5px solid ${active ? s.c : '#ddd'}`,
              borderRadius: 24,
              fontSize: 13,
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: active ? s.c + '14' : 'transparent',
              color: active ? s.c : '#888',
              fontWeight: active ? 600 : 400,
              whiteSpace: 'nowrap',
            }}
          >
            {s.l} ({count})
          </button>
        )
      })}
    </div>
  )
}
