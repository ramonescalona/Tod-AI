# Tod — AI Employee for Construction ERP

Tod is an AI-powered construction project portfolio dashboard for TERP Asia. It provides real-time visibility into ₱5B+ in active construction projects across 10 project managers.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Anthropic API key (for AI chat feature)

### Setup
```bash
# Clone and install
git clone <your-repo-url>
cd tod-app
npm install

# Set up environment
cp .env.example .env
# Add your Anthropic API key to .env

# Start development server
npm run dev
```

### Deploy
```bash
npm run build
npx vercel --prod
```

## Project Structure
```
tod-app/
├── CLAUDE.md              # AI context file (Claude Code memory)
├── prototype/             # Original HTML prototypes
│   ├── tod.html           # Current working prototype (start here)
│   ├── tod_ai_employee_V1.html
│   └── tod_ai_employee_V2.html
├── data/                  # Source Excel files
│   ├── GVMC_Architectural_CSR_v1_031326.xlsm
│   └── CSR_New_Projects.xlsx
├── docs/
│   └── SPEC.md            # Project specification and milestones
├── src/                   # React application (to be scaffolded)
│   ├── components/
│   ├── data/
│   ├── utils/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Features
- **Portfolio Dashboard** — Overview of all 10 project managers with ₱5B+ in contracts
- **Smart Filters** — Search, sort by contract/progress/name, filter by stage
- **Drill-Down Navigation** — Manager → Projects → Packages → Cost Status Report
- **Excel-Style CSR Viewer** — 114 line items with frozen columns, collapsible rows
- **AI Chat (Tod)** — Ask questions about any project, budget, or risk area
- **iPad Optimized** — Large touch targets, PWA support, works offline

## Data Sources
- `CSR_New_Projects.xlsx` — Project manager assignments and package accomplishment %
- `GVMC_Architectural_CSR_v1_031326.xlsm` — Detailed cost status report for GVMC Architectural

## For Claude Code
Start by reading `CLAUDE.md` for full project context, then read `docs/SPEC.md` for the implementation plan. The working prototype is at `prototype/tod.html`.
