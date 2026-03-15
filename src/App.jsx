import { useState, useMemo } from 'react'
import { MANAGERS } from './data/managers'
import { TOTAL_CONTRACT } from './data/constants'
import { enrichManager } from './utils/stats'
import { stageKey } from './utils/colors'

import Header from './components/layout/Header'
import Breadcrumb from './components/layout/Breadcrumb'
import KPICards from './components/dashboard/KPICards'
import SearchBar from './components/dashboard/SearchBar'
import StageFilter from './components/dashboard/StageFilter'
import SortDropdown from './components/dashboard/SortDropdown'
import ManagerCard from './components/dashboard/ManagerCard'
import PackageCard from './components/dashboard/PackageCard'
import PortfolioSummary from './components/dashboard/PortfolioSummary'
import CSRSpreadsheet from './components/project/CSRSpreadsheet'
import ChatFab from './components/chat/ChatFab'
import ChatPanel from './components/chat/ChatPanel'

// Pre-enrich all managers
const ENRICHED = MANAGERS.map(enrichManager)

// Flatten all packages with manager/project context
const ALL_PKGS = []
MANAGERS.forEach(m => m.projects.forEach(p => p.subs.forEach(s => {
  ALL_PKGS.push({ ...s, mn: m.mgr, mi: m.id, pn: p.name })
})))

function sortItems(items, sortBy) {
  return [...items].sort((a, b) => ({
    ch: (b.totalC || b.contract || 0) - (a.totalC || a.contract || 0),
    cl: (a.totalC || a.contract || 0) - (b.totalC || b.contract || 0),
    ph: (b.wPct ?? b.pct ?? 0) - (a.wPct ?? a.pct ?? 0),
    pl: (a.wPct ?? a.pct ?? 0) - (b.wPct ?? b.pct ?? 0),
    na: (a.mgr || a.name || '').localeCompare(b.mgr || b.name || ''),
    pk: (b.count || 0) - (a.count || 0),
  }[sortBy] || 0))
}

export default function App() {
  const [path, setPath] = useState([])
  const [sortBy, setSortBy] = useState('ch')
  const [stage, setStage] = useState('all')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('managers')
  const [showCSR, setShowCSR] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const nav = item => setPath(p => [...p, item])
  const goHome = () => { setPath([]); setShowCSR(false) }
  const goTo = idx => setPath(p => p.slice(0, idx + 1))

  const current = path[path.length - 1]
  const level = path.length

  // Filtered managers
  const filteredManagers = useMemo(() => {
    let list = [...ENRICHED]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        m.mgr.toLowerCase().includes(q) ||
        m.projects.some(p =>
          p.name.toLowerCase().includes(q) ||
          p.subs.some(s => s.name.toLowerCase().includes(q))
        )
      )
    }
    if (stage !== 'all') list = list.filter(m => stageKey(m.wPct) === stage)
    return sortItems(list, sortBy)
  }, [sortBy, stage, search])

  // Filtered packages
  const filteredPkgs = useMemo(() => {
    let list = [...ALL_PKGS]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.mn.toLowerCase().includes(q))
    }
    if (stage !== 'all') list = list.filter(s => stageKey(s.pct) === stage)
    return sortItems(list, sortBy)
  }, [sortBy, stage, search])

  // KPI stats
  const weightedProgress = useMemo(() => {
    let total = 0, weighted = 0
    MANAGERS.forEach(m => m.projects.forEach(p => p.subs.forEach(s => {
      if (s.contract > 0) { total += s.contract; weighted += s.pct * s.contract }
    })))
    return total > 0 ? weighted / total : 0
  }, [])

  const activePackages = useMemo(() => {
    let count = 0
    MANAGERS.forEach(m => m.projects.forEach(p => p.subs.forEach(s => {
      if (s.pct > 0 && s.pct < 1) count++
    })))
    return count
  }, [])

  const stageCounts = useMemo(() => {
    const c = { es: 0, ip: 0, ot: 0, nd: 0 }
    ALL_PKGS.forEach(s => c[stageKey(s.pct)]++)
    return { ...c, total: ALL_PKGS.length }
  }, [])

  const hasFilters = sortBy !== 'ch' || stage !== 'all' || search

  // CSR view
  if (showCSR) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px', paddingBottom: 100 }}>
        <Header onHome={goHome} />
        <Breadcrumb path={path} onHome={goHome} onNavigate={goTo} />
        <CSRSpreadsheet onBack={() => setShowCSR(false)} />
        <ChatFab onClick={() => setChatOpen(true)} />
        <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px', paddingBottom: 100 }}>
      <Header onHome={goHome} />
      <Breadcrumb path={path} onHome={goHome} onNavigate={goTo} />

      {/* Dashboard — Level 0 */}
      {level === 0 && (
        <div>
          <KPICards
            totalContract={TOTAL_CONTRACT}
            activePackages={activePackages}
            weightedProgress={weightedProgress}
          />

          <SearchBar value={search} onChange={setSearch} />

          <StageFilter stage={stage} onStage={setStage} counts={stageCounts} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 8, flexWrap: 'wrap' }}>
            {/* View toggle */}
            <div style={{ display: 'flex', background: '#eee', borderRadius: 10, padding: 3 }}>
              {['managers', 'packages'].map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: '8px 20px', border: 'none', borderRadius: 8,
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
                  background: view === v ? '#fff' : 'transparent',
                  color: view === v ? '#1a1a1a' : '#888',
                  boxShadow: view === v ? '0 1px 3px rgba(0,0,0,.06)' : 'none',
                }}>
                  {v === 'managers' ? 'By manager' : 'All packages'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {hasFilters && (
                <button onClick={() => { setSortBy('ch'); setStage('all'); setSearch('') }} style={{
                  fontSize: 12, color: '#A32D2D', background: '#FCEBEB',
                  border: 'none', borderRadius: 20, padding: '7px 16px',
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                }}>
                  Clear
                </button>
              )}
              <SortDropdown sortBy={sortBy} onSort={setSortBy} />
            </div>
          </div>

          {view === 'managers' && (
            <div>
              {filteredManagers.map(m => (
                <ManagerCard key={m.id} manager={m} onClick={() => nav(m)} />
              ))}
            </div>
          )}

          {view === 'packages' && (
            <div>
              {filteredPkgs.map((s, i) => (
                <PackageCard
                  key={s.id + i}
                  pkg={s}
                  showMeta={true}
                  onClick={() => {
                    const mgr = ENRICHED.find(x => x.id === s.mi)
                    if (mgr) nav(mgr)
                  }}
                />
              ))}
            </div>
          )}

          <PortfolioSummary />
        </div>
      )}

      {/* Manager detail — Level 1 */}
      {level === 1 && current && (
        <div>
          <div style={{ margin: '16px 0 20px' }}>
            <h2 style={{ fontSize: 18 }}>{current.mgr}</h2>
            <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
              Total contract: {current.projects.flatMap(p => p.subs).reduce((s, x) => s + (x.contract || 0), 0).toLocaleString('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })}
            </p>
          </div>
          {current.projects.map(p => (
            <div key={p.id}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#888', marginBottom: 8, marginTop: 16 }}>
                {p.name}
              </div>
              {p.subs.map(s => (
                <PackageCard
                  key={s.id}
                  pkg={s}
                  onClick={() => {
                    if (s.hasCSR) setShowCSR(true)
                    else nav({ ...s, parentProject: p.name })
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Package detail — Level 2 (no CSR available) */}
      {level === 2 && current && !showCSR && (
        <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: '#1a1a1a' }}>
            Detailed CSR not yet available
          </h3>
          <p>{(current.pct * 100).toFixed(1)}% complete</p>
        </div>
      )}

      <ChatFab onClick={() => setChatOpen(true)} />
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
