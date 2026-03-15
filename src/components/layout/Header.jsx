export default function Header({ onHome }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 16, borderBottom: '1px solid #ddd' }}>
      <div
        onClick={onHome}
        style={{
          width: 48, height: 48, borderRadius: 14, background: '#085041',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 20, color: '#5DCAA5', cursor: 'pointer', flexShrink: 0
        }}
      >
        T
      </div>
      <div style={{ flex: 1 }}>
        <h1 onClick={onHome} style={{ fontSize: 19, fontWeight: 700, cursor: 'pointer' }}>Tod</h1>
        <p style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Project portfolio dashboard</p>
      </div>
      <div style={{ textAlign: 'right', fontSize: 12, color: '#888' }}>
        <span>TERP New Projects</span>
        <b style={{ color: '#1a1a1a', display: 'block', marginTop: 2 }}>March 2026</b>
      </div>
    </div>
  )
}
