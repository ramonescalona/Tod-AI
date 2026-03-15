import { useState, useMemo } from 'react'
import { CSR } from '../../data/csr'
import { formatNumber } from '../../utils/format'

const COL_W = 130
const HEADER_GROUPS = [
  { name: 'Budgetary (A)', bg: '#1a5276', bg2: '#21618c' },
  { name: 'Cost to Date (B)', bg: '#7d3c00', bg2: '#8b4513' },
  { name: 'CSR (D = B + C)', bg: '#085041', bg2: '#0a6b55' },
]
const SUB_COLS = ['Material', 'Labor', 'Equip.', 'Other', 'Total']

function hasChildren(id) {
  return CSR.some(r => r[0].startsWith(id + '.') && r[0] !== id)
}

export default function CSRSpreadsheet({ onBack }) {
  const [collapsed, setCollapsed] = useState({})
  const [section, setSection] = useState('all')

  const toggle = id => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))

  const sections = useMemo(
    () => CSR.filter(r => r[3] === 1).map(r => ({ id: r[0], name: r[1] })),
    []
  )

  const visibleRows = useMemo(() => {
    const rows = []
    let currentGroup = null
    for (const row of CSR) {
      if (row[3]) currentGroup = row[0]
      if (section !== 'all' && currentGroup !== section && row[0] !== 'GRAND TOTAL') continue

      const parentId = row[0].includes('.') ? row[0].substring(0, row[0].lastIndexOf('.')) : null
      let hidden = false
      if (parentId) {
        let p = parentId
        while (p) {
          if (collapsed[p]) { hidden = true; break }
          p = p.includes('.') ? p.substring(0, p.lastIndexOf('.')) : null
        }
      }
      if (!hidden) rows.push(row)
    }
    return rows
  }, [collapsed, section])

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', border: '1px solid #ddd', borderRadius: 10,
          fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
          background: '#fff', color: '#1a1a1a', fontWeight: 600, marginBottom: 16,
        }}
      >
        ← Back to projects
      </button>

      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 18 }}>GVMC Architectural Works</h2>
        <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Cost Status Report · PROJ-0020</p>
      </div>

      {/* Section filter pills */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        <button
          className={section === 'all' ? 'active' : ''}
          onClick={() => setSection('all')}
          style={{
            padding: '6px 14px', border: '1px solid',
            borderColor: section === 'all' ? '#085041' : '#ddd',
            borderRadius: 20, fontSize: 11, fontFamily: 'inherit', cursor: 'pointer',
            background: section === 'all' ? '#08504114' : 'transparent',
            color: section === 'all' ? '#085041' : '#888',
            fontWeight: section === 'all' ? 600 : 400,
          }}
        >
          All sections
        </button>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(section === s.id ? 'all' : s.id)}
            style={{
              padding: '6px 14px', border: '1px solid',
              borderColor: section === s.id ? '#085041' : '#ddd',
              borderRadius: 20, fontSize: 11, fontFamily: 'inherit', cursor: 'pointer',
              background: section === s.id ? '#08504114' : 'transparent',
              color: section === s.id ? '#085041' : '#888',
              fontWeight: section === s.id ? 600 : 400,
            }}
          >
            {s.id}. {s.name}
          </button>
        ))}
      </div>

      {/* Spreadsheet */}
      <div style={{ border: '2px solid #505050', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '70vh', WebkitOverflowScrolling: 'touch' }}>
          <table style={{
            borderCollapse: 'separate', borderSpacing: 0,
            fontSize: 11, fontFamily: "'Courier New', monospace",
            tableLayout: 'fixed',
            width: 80 + 210 + COL_W * 15,
          }}>
            <colgroup>
              <col style={{ width: 80 }} />
              <col style={{ width: 210 }} />
              {Array.from({ length: 15 }, (_, i) => <col key={i} style={{ width: COL_W }} />)}
            </colgroup>
            <thead>
              <tr>
                <th className="frozen-item frozen-corner" style={{ background: '#085041', left: 0, textAlign: 'left', color: '#fff', fontWeight: 600, padding: '8px 10px', borderBottom: '2px solid #505050', borderRight: '1px solid rgba(255,255,255,.2)', position: 'sticky', top: 0, zIndex: 35 }}>
                  Item
                </th>
                <th className="frozen-desc frozen-corner" style={{ background: '#085041', left: 80, textAlign: 'left', borderRight: '2px solid #333', color: '#fff', fontWeight: 600, padding: '8px 10px', borderBottom: '2px solid #505050', position: 'sticky', top: 0, zIndex: 35 }}>
                  Description
                </th>
                {HEADER_GROUPS.map((g, gi) => (
                  <th key={gi} colSpan={5} style={{
                    background: g.bg, borderRight: gi < 2 ? '2px solid #333' : 'none',
                    color: '#fff', fontWeight: 600, padding: '8px 10px', textAlign: 'center',
                    letterSpacing: '0.3px', borderBottom: '2px solid #505050',
                    borderLeft: '1px solid rgba(255,255,255,.2)',
                    position: 'sticky', top: 0, zIndex: 20,
                  }}>
                    {g.name}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="frozen-item frozen-corner" style={{ background: '#0a6b55', left: 0, position: 'sticky', top: 32, zIndex: 35, borderBottom: '2px solid #505050' }} />
                <th className="frozen-desc frozen-corner" style={{ background: '#0a6b55', left: 80, borderRight: '2px solid #333', position: 'sticky', top: 32, zIndex: 35, borderBottom: '2px solid #505050' }} />
                {HEADER_GROUPS.map((g, gi) =>
                  SUB_COLS.map((col, ci) => (
                    <th key={`${gi}-${ci}`} style={{
                      background: g.bg2, fontSize: 9, fontWeight: 500,
                      color: '#fff', padding: '8px 10px', textAlign: 'center',
                      borderRight: ci === 4 && gi < 2 ? '2px solid #333' : '1px solid rgba(255,255,255,.15)',
                      borderBottom: '2px solid #505050',
                      position: 'sticky', top: 32, zIndex: 20,
                    }}>
                      {col}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                const [id, desc, lvl, isGroup] = row
                const isTotal = id === 'GRAND TOTAL'
                const isSection = isGroup === 1
                const canCollapse = hasChildren(id)
                const bg = isTotal ? '#e8e4da' : isSection ? '#dceeda' : i % 2 === 0 ? '#ffffff' : '#f7f7f5'
                const indent = lvl * 14
                const isOver = row[8] > 0 && row[13] > row[8]

                return (
                  <tr key={id + i} className={isTotal ? 'row-total' : isSection ? 'row-group' : ''} style={{ background: bg }}>
                    {/* Item column */}
                    <td className="frozen-item" style={{
                      background: bg, left: 0, fontSize: 10, color: '#888',
                      textAlign: 'left', padding: '6px 12px',
                      borderBottom: '1px solid #c0c0c0', borderRight: '1px solid #c0c0c0',
                    }}>
                      {isTotal ? '' : id}
                    </td>
                    {/* Description column */}
                    <td className="frozen-desc" style={{
                      background: bg, left: 80, textAlign: 'left',
                      paddingLeft: 10 + indent, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
                      cursor: canCollapse ? 'pointer' : 'default',
                      borderRight: '2px solid #505050',
                      borderBottom: '1px solid #c0c0c0',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      fontWeight: isSection || isTotal ? 700 : 400,
                    }} onClick={canCollapse ? () => toggle(id) : undefined}>
                      {canCollapse && (
                        <span style={{ display: 'inline-block', width: 16, fontSize: 10, color: '#888', textAlign: 'center' }}>
                          {collapsed[id] ? '▸' : '▾'}
                        </span>
                      )}
                      {isTotal ? 'GRAND TOTAL' : desc}
                    </td>
                    {/* Budgetary columns (indices 4-8) */}
                    {[4, 5, 6, 7].map(c => (
                      <td key={c} style={{ padding: '6px 12px', textAlign: 'right', borderBottom: '1px solid #c0c0c0', borderRight: '1px solid #c0c0c0', whiteSpace: 'nowrap', color: '#1a1a1a' }}>
                        {row[c] ? formatNumber(row[c]) : '—'}
                      </td>
                    ))}
                    <td style={{
                      padding: '6px 12px', textAlign: 'right', fontWeight: 700,
                      borderRight: '2px solid #505050', borderBottom: '1px solid #c0c0c0',
                      background: isTotal ? '#ddd8cc' : isSection ? '#cee6cc' : bg,
                      whiteSpace: 'nowrap',
                    }}>
                      {row[8] ? formatNumber(row[8]) : '—'}
                    </td>
                    {/* Cost to Date columns (indices 9-13) */}
                    {[9, 10, 11, 12].map(c => (
                      <td key={c} style={{ padding: '6px 12px', textAlign: 'right', borderBottom: '1px solid #c0c0c0', borderRight: '1px solid #c0c0c0', whiteSpace: 'nowrap', color: '#1a1a1a' }}>
                        {row[c] ? formatNumber(row[c]) : '—'}
                      </td>
                    ))}
                    <td style={{
                      padding: '6px 12px', textAlign: 'right', fontWeight: 700,
                      borderRight: '2px solid #505050', borderBottom: '1px solid #c0c0c0',
                      background: isTotal ? '#ddd8cc' : isSection ? '#cee6cc' : bg,
                      color: isOver ? '#A32D2D' : undefined,
                      whiteSpace: 'nowrap',
                    }}>
                      {row[13] ? formatNumber(row[13]) : '—'}
                    </td>
                    {/* CSR columns (indices 14-18) */}
                    {[14, 15, 16, 17].map(c => (
                      <td key={c} style={{ padding: '6px 12px', textAlign: 'right', borderBottom: '1px solid #c0c0c0', borderRight: '1px solid #c0c0c0', whiteSpace: 'nowrap', color: '#1a1a1a' }}>
                        {row[c] ? formatNumber(row[c]) : '—'}
                      </td>
                    ))}
                    <td style={{
                      padding: '6px 12px', textAlign: 'right', fontWeight: 700,
                      borderRight: 'none', borderBottom: '1px solid #c0c0c0',
                      background: isTotal ? '#ddd8cc' : isSection ? '#cee6cc' : bg,
                      whiteSpace: 'nowrap',
                    }}>
                      {row[18] ? formatNumber(row[18]) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ marginTop: 8, fontSize: 11, color: '#888' }}>
        {visibleRows.length} of {CSR.length} rows · Tap ▾ to collapse · Swipe right for more columns
      </p>
    </div>
  )
}
