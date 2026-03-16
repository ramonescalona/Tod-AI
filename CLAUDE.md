# Tod — AI Employee for Construction ERP

## What is Tod?

Tod is an AI-powered construction ERP dashboard for **TERP (Terp Asia)**. It serves as a digital employee that mirrors how the company boss reviews project portfolios, cost status reports, and makes business decisions.

The primary user is a **65-year-old construction company owner** who is not tech-savvy. Every design decision must prioritize clarity, large touch targets, and simplicity. He uses an iPad primarily.

## Project Status

We have a **working HTML prototype** at `prototype/tod.html` that needs to be converted into a proper React application. The prototype is fully functional with:

- Portfolio dashboard showing 10 project managers and ~30 work packages
- Drill-down navigation: Managers → Projects → Packages → CSR Spreadsheet
- Excel-style Cost Status Report (CSR) viewer with frozen columns, collapsible rows
- Search, filter by stage, sort by multiple criteria
- AI chat panel powered by Anthropic API (Claude Sonnet)
- iPad-optimized with PWA meta tags

## Architecture

### Target Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (keep the warm, clean aesthetic from prototype)
- **Font**: Nunito Sans (already in prototype)
- **State Management**: React useState/useContext (keep it simple, no Redux)
- **Routing**: React Router v6
- **AI Chat**: Anthropic Messages API (claude-sonnet-4-20250514)
- **Deployment**: Vercel (or any static host for Phase 1)
- **Future backend**: Supabase (Phase 2)

### Component Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Tod logo, title, date
│   │   ├── Breadcrumb.jsx      # Navigation trail
│   │   └── Layout.jsx          # Main wrapper
│   ├── dashboard/
│   │   ├── KPICards.jsx         # Gross contract, active packages, weighted progress
│   │   ├── SearchBar.jsx        # Search across managers/projects/packages
│   │   ├── StageFilter.jsx      # Early/In progress/On track/Nearly done pills
│   │   ├── SortDropdown.jsx     # Sort by contract, progress, name, packages
│   │   ├── ViewToggle.jsx       # "By manager" / "All packages" toggle
│   │   ├── ManagerCard.jsx      # Individual manager card with progress bar
│   │   ├── PackageCard.jsx      # Individual package card
│   │   └── PortfolioSummary.jsx # Tax, profit, target cost summary
│   ├── project/
│   │   ├── ManagerDetail.jsx    # Shows all projects under a manager
│   │   ├── PackageDetail.jsx    # Empty state or CSR link
│   │   └── CSRSpreadsheet.jsx   # Excel-style cost report viewer
│   └── chat/
│       ├── ChatFab.jsx          # Floating "Ask Tod" button
│       ├── ChatPanel.jsx        # Slide-up chat panel
│       ├── ChatMessage.jsx      # Individual message bubble
│       └── ChatSuggestions.jsx  # Quick-ask suggestion chips
├── data/
│   ├── managers.js              # All 10 managers with projects and packages
│   ├── csr.js                   # GVMC CSR line items (114 rows)
│   └── constants.js             # Portfolio totals, tax rates, color config
├── utils/
│   ├── format.js                # Currency formatting (₱), number formatting
│   ├── colors.js                # Status colors, risk colors
│   └── stats.js                 # Weighted progress, stage classification
├── hooks/
│   ├── useNavigation.js         # Drill-down path state
│   └── useFilters.js            # Search, sort, stage filter state
├── pages/
│   ├── Dashboard.jsx            # Home page with all filters and cards
│   ├── ManagerPage.jsx          # Manager drill-down
│   ├── PackagePage.jsx          # Package detail or CSR
│   └── CSRPage.jsx              # Full spreadsheet view
├── App.jsx
├── main.jsx
└── index.css                    # Tailwind + custom styles
```

## Data Sources

### Current (Phase 1 — hardcoded)
All data lives in `src/data/`:
- `managers.js` — 10 managers, their projects, sub-packages, contract amounts, accomplishment %
- `csr.js` — 114 line items from GVMC Architectural CSR with budgetary, actual, and CSR columns
- Source Excel files are in `data/` folder for reference

### Future (Phase 2 — live database)
- Supabase PostgreSQL for project/package data
- Excel file upload and parsing (SheetJS) for CSR imports
- Real-time sync from TERP ERP system (Frappe/ERPNext at terpasia.xurpaslabs.com)

## Key Data Points

### Portfolio
- **Total gross contract**: ₱5,002,609,086.88
- **10 project managers**, ~30 active work packages
- **Weighted accomplishment**: ~35%

### Managers (sorted by contract)
1. Ryan Legaspi — ₱1.55B (Mantawi Residences, Cebu) — 18.2%
2. Godfrey Aranzaso — ₱1.05B (GVMC + Tarlac) — mixed
3. Alfhie Masinadiong — ₱589M (One Tolentino East) — 81%
4. Jun David — ₱561M (JIL Tower + Woodsville) — ~45%
5. Ramel De Castro — ₱537M (Sierra Valley Gardens) — ~35%
6. Mark Tumpalan — ₱339M (Dumaguete projects) — mixed
7. Dolphy Esteban — ₱207M (Fili + Grand Summit) — mixed
8. Rowell Clarin — ₱102M (Maribago Resort) — 0%
9. Giselle Gerardo — ₱43M (Lolo Uweng + Belfry) — mixed
10. Reymark La Guardia — ₱25M (Amisa painting) — 11%

### GVMC CSR (the only project with detailed cost data)
- **Budget**: ₱531.6M
- **Actual spend**: ₱130.5M (24.5%)
- **8 divisions**: General Req, Civil, Architectural, Mechanical, Electrical, Plumbing, Fire Protection, Auxiliary
- **Key risks**: Mechanical at 74.9%, Other costs ₱102.4M unbudgeted, CHB 6" overspent 31.9%

## Design Principles

### For the primary user (65 years old, iPad)
1. **Large text** — minimum 13px body, 15px+ for important numbers
2. **Big tap targets** — minimum 44px touch areas on all interactive elements
3. **Obvious navigation** — breadcrumb trail always visible, "← Back" buttons prominent
4. **Color-coded status** — consistent everywhere:
   - `#085041` (dark green) = Nearly done (90%+)
   - `#1D9E75` (green) = On track (60-89%)
   - `#BA7517` (amber) = In progress (30-59%)
   - `#D85A30` (coral) = Early stage (0-29%)
5. **No jargon** — use "Nearly done" not "Phase 4 completion"
6. **Progressive disclosure** — show overview first, details on tap
7. **Familiar patterns** — the CSR spreadsheet looks like the Excel file he already uses

### Visual Identity
- **Primary color**: `#085041` (TERP dark green)
- **Accent**: `#5DCAA5` (light green for Tod avatar)
- **Background**: `#f5f5f3` (warm off-white)
- **Cards**: `#ffffff` with `1px solid #e5e5e3` borders
- **Font**: Nunito Sans 400/500/600/700
- **Monospace** (for numbers): Courier New in spreadsheet view

### Spreadsheet CSR Rules
- Frozen Item + Description columns (left 80px + 210px) — these MUST have opaque backgrounds and z-index 25+ so scrolling numbers pass BEHIND them
- Section group rows: green tint `#dceeda`
- Grand total row: tan tint `#e8e4da`
- Alternating rows: `#ffffff` / `#f7f7f5`
- Over-budget items: red text `#A32D2D`
- Column groups separated by `2px solid #505050` borders
- Collapsible sections with ▾/▸ toggle

## AI Chat Configuration

### System Prompt
The chat uses Claude Sonnet with a system prompt containing ALL project data (managers, packages, CSR line items). Tod responds as a construction ERP analyst who:
- Uses ₱ (Philippine Peso) formatting
- Is concise and flags risks proactively
- Answers only from the data provided
- Keeps responses under 1000 tokens

### Suggested Queries
- "Give me a portfolio overview"
- "Which projects are at risk?"
- "Summarize the GVMC cost status"
- "Who has the most packages?"
- "What's Mechanical Works status?"
- "Explain the ₱102M Other costs"

## File References
- `prototype/tod.html` — **Current working prototype** (single HTML, 405 lines)
- `prototype/tod_ai_employee_V1.html` — Earlier version without chat
- `prototype/tod_ai_employee_V2.html` — Earlier version with chat
- `data/GVMC_Architectural_CSR_v1_031326.xlsm` — Source Excel CSR file
- `data/CSR_New_Projects.xlsx` — Source project list from ERP

## Development Commands
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to Vercel
```

## Important Notes
- Philippine Peso (₱) currency throughout — never use $ or other currencies
- All contract amounts are in Philippine Pesos
- The company name is TERP / Terp Asia / TACC (The Asian Construction Company)
- The ERP system is Frappe-based at terpasia.xurpaslabs.com (future API integration)
- The primary user accesses the app on an iPad in Safari
- The app must work offline (PWA) since construction sites may have poor connectivity
