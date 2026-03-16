export default function ChatFab({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed', bottom: 24, right: 24,
        width: 60, height: 60, borderRadius: '50%',
        background: '#085041', border: 'none', cursor: 'pointer',
        zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,.25)', transition: 'transform .2s',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5DCAA5" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
  )
}
