export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search manager, project, or package..."
        style={{
          width: '100%', padding: '13px 16px 13px 44px',
          border: '1.5px solid #ddd', borderRadius: 12,
          fontSize: 15, fontFamily: 'inherit', outline: 'none', background: '#fff',
        }}
        onFocus={e => e.target.style.borderColor = '#085041'}
        onBlur={e => e.target.style.borderColor = '#ddd'}
      />
      <svg style={{ position: 'absolute', left: 15, top: 16, opacity: 0.35 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ position: 'absolute', right: 12, top: 10, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer', padding: 4 }}
        >
          ×
        </button>
      )}
    </div>
  )
}
