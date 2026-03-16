import { useState, useRef, useEffect } from 'react'
import { MANAGERS } from '../../data/managers'
import { CSR } from '../../data/csr'
import { CHAT_SUGGESTIONS } from '../../data/constants'
import { buildSystemPrompt } from '../../utils/stats'
import csrGuide from '../../knowledge/csr-guide.md?raw'
import erpSystem from '../../knowledge/erp-system.md?raw'
import businessRules from '../../knowledge/business-rules.md?raw'
import glossary from '../../knowledge/glossary.md?raw'

const SYS_PROMPT = buildSystemPrompt(MANAGERS, CSR, {
  'CSR Guide': csrGuide,
  'ERP System': erpSystem,
  'Business Rules': businessRules,
  'Glossary': glossary,
})

export default function ChatPanel({ open, onClose }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400)
  }, [open])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const newMsgs = [...msgs, { role: 'user', content: msg }]
    setMsgs(newMsgs)
    setLoading(true)
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYS_PROMPT }] },
            contents: newMsgs.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
            generationConfig: { maxOutputTokens: 1000 },
          }),
        }
      )
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const reply = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n')
        || "Sorry, I couldn't process that."
      setMsgs([...newMsgs, { role: 'assistant', content: reply }])
    } catch (err) {
      setMsgs([...newMsgs, { role: 'assistant', content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.3)', zIndex: 300,
          opacity: open ? 1 : 0, transition: 'opacity .3s',
          pointerEvents: open ? 'auto' : 'none',
        }}
      />
      {/* Panel */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        maxWidth: 600, margin: '0 auto',
        height: '75vh', maxHeight: 680,
        background: '#fff', borderRadius: '20px 20px 0 0',
        zIndex: 301,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform .35s cubic-bezier(.32,.72,.37,1.12)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 -8px 40px rgba(0,0,0,.15)',
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#ccc', margin: '10px auto 0' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#085041', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#5DCAA5' }}>
            T
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Ask Tod</h3>
            <p style={{ fontSize: 11, color: '#888' }}>AI project analyst</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#f0f0ee', cursor: 'pointer', fontSize: 18, color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', WebkitOverflowScrolling: 'touch' }}>
          {msgs.length === 0 && (
            <div>
              <div style={{ padding: '12px 0 16px' }}>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
                  Hi! I'm Tod. Ask me anything about the portfolio — budgets, progress, risks, any project or manager.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {CHAT_SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => send(s)} style={{
                    padding: '8px 14px', border: '1px solid #ddd', borderRadius: 20,
                    fontSize: 12, fontFamily: 'inherit', cursor: 'pointer',
                    background: '#fff', color: '#1a1a1a', textAlign: 'left', lineHeight: 1.3,
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} style={{ marginBottom: 14, display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              {m.role === 'assistant' && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#085041', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, color: '#5DCAA5', flexShrink: 0, marginTop: 2 }}>
                  T
                </div>
              )}
              <div style={{
                maxWidth: '85%', padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.55,
                background: m.role === 'user' ? '#085041' : '#f0f0ee',
                color: m.role === 'user' ? '#fff' : '#1a1a1a',
                borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                borderBottomLeftRadius: m.role === 'assistant' ? 4 : 14,
                whiteSpace: 'pre-wrap',
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ marginBottom: 14, display: 'flex', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#085041', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10, color: '#5DCAA5', flexShrink: 0, marginTop: 2 }}>
                T
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 14, background: '#f0f0ee', borderBottomLeftRadius: 4 }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '8px 0' }}>
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid #eee', flexShrink: 0, background: '#fff' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about any project..."
            rows={1}
            style={{
              flex: 1, border: '1.5px solid #ddd', borderRadius: 12,
              padding: '10px 14px', fontSize: 14, fontFamily: 'inherit',
              resize: 'none', outline: 'none', lineHeight: 1.4, maxHeight: 80,
            }}
            onFocus={e => e.target.style.borderColor = '#085041'}
            onBlur={e => e.target.style.borderColor = '#ddd'}
          />
          <button
            onClick={() => send()}
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: input.trim() && !loading ? '#085041' : '#eee',
              transition: 'background .15s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? '#fff' : '#aaa'} strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
