export default function Breadcrumb({ path, onHome, onNavigate }) {
  if (path.length === 0) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 0', flexWrap: 'wrap' }}>
      <span onClick={onHome} style={{ fontSize: 13, cursor: 'pointer', color: '#085041', fontWeight: 600 }}>
        All Projects
      </span>
      {path.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#aaa', fontSize: 12 }}>›</span>
          <span
            onClick={() => i < path.length - 1 ? onNavigate(i) : undefined}
            style={{
              fontSize: 13,
              cursor: i < path.length - 1 ? 'pointer' : 'default',
              color: i === path.length - 1 ? '#1a1a1a' : '#085041',
              fontWeight: 600,
            }}
          >
            {item.name || item.mgr}
          </span>
        </span>
      ))}
    </div>
  )
}
