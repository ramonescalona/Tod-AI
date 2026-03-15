export function enrichManager(manager) {
  const allSubs = manager.projects.flatMap(p => p.subs)
  const totalC = allSubs.reduce((s, x) => s + (x.contract || 0), 0)
  const wPct = totalC > 0
    ? allSubs.reduce((s, x) => s + x.pct * (x.contract || 0), 0) / totalC
    : 0
  return {
    ...manager,
    allSubs,
    totalC,
    wPct,
    count: allSubs.length,
  }
}

export function buildSystemPrompt(managers, csr, knowledge = {}) {
  const knowledgeSection = Object.entries(knowledge)
    .filter(([, content]) => content?.trim())
    .map(([name, content]) => `--- ${name} ---\n${content.trim()}`)
    .join('\n\n')

  return `You are Tod, an AI construction ERP analyst for TERP. You know all project data.

PORTFOLIO: 10 managers, ₱5.0B gross contract, ~35% weighted progress.
Managers: Jun David (₱561M, JIL Tower+Woodsville), Ramel De Castro (₱537M, Sierra Valley), Godfrey Aranzaso (₱1.05B, GVMC+Tarlac), Alfhie Masinadiong (₱589M, One Tolentino), Ryan Legaspi (₱1.55B, Mantawi Cebu 18%), Mark Tumpalan (₱339M, Dumaguete projects), Reymark La Guardia (₱25M, Amisa 11%), Giselle Gerardo (₱43M, Lolo Uweng+Belfry), Dolphy Esteban (₱207M, Fili+Grand Summit), Rowell Clarin (₱102M, Maribago 0%).

GVMC ARCHITECTURAL CSR (PROJ-0020): Budget ₱531.6M, Actual ₱130.5M (24.5%), Remaining ₱401.1M.
Divisions: A.General Req ₱87.2M bud/₱6.2M act(7.2%), B.Civil ₱0 bud/₱15K act, D.Architectural ₱164.9M/₱56.1M(34%), E.Mechanical ₱69.3M/₱51.9M(74.9% HIGH), F.Electrical ₱37.4M/₱0.5M(1.3%), G.Plumbing ₱21.1M/₱0.2M, H.Fire Prot ₱21.5M/₱0, I.Auxiliary ₱130.3M/₱15.5M.
Key risks: Mechanical 74.9% consumed, Other costs ₱102.4M with ₱0 budget, CHB 6" overspent 31.9%, CTC column empty.
D.1.3 Masonry Subcontractor: ₱35.9M actual vs ₱47M budget, ₱34.6M in Other. Staff salary ₱5.72M of ₱9.75M (58.6%).

Full CSR data: ${JSON.stringify(csr)}
Full project data: ${JSON.stringify(managers.map(m => ({ mgr: m.mgr, contract: m.contract, projects: m.projects })))}

Rules: Use ₱ peso formatting. Be concise. Flag risks. Answer from data only. Keep responses under 1000 tokens.
${knowledgeSection ? `\n=== COMPANY KNOWLEDGE BASE ===\n${knowledgeSection}` : ''}`
}
