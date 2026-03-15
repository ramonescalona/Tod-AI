import { useState } from 'react'
import { SORTS } from '../../data/constants'

export default function SortDropdown({ sortBy, onSort }) {
  const [open, setOpen] = useState(false)
  const current = SORTS.find(s => s.k === sortBy)

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '9px 16px', border: '1px solid #ddd', borderRadius: 10,
          fontSize: 12, fontFamily: 'inherit', cursor: 'pointer',
          background: '#fff', color: '#1a1a1a', fontWeight: 500,
        }}
      >
        {current?.l} ▾
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)',
            background: '#fff', border: '1px solid #ccc', borderRadius: 12,
            padding: 6, zIndex: 100, minWidth: 210,
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
          }}>
            {SORTS.map(s => (
              <button
                key={s.k}
                onClick={() => { onSort(s.k); setOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '11px 14px', border: 'none', borderRadius: 8,
                  fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
                  background: sortBy === s.k ? '#f0f0ee' : 'transparent',
                  color: sortBy === s.k ? '#085041' : '#1a1a1a',
                  fontWeight: sortBy === s.k ? 600 : 400,
                }}
              >
                {s.l}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
