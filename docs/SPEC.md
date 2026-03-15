# Tod — Project Specification

## Overview
Convert the working HTML prototype (`prototype/tod.html`) into a production-grade React application while preserving all existing functionality exactly as-is.

## Milestone 1: React Scaffold (MVP)
**Goal**: Exact feature parity with `prototype/tod.html` as a React + Vite app.

### Tasks
1. Initialize Vite + React project with Tailwind CSS
2. Extract all hardcoded data (MANAGERS, CSR arrays) into `src/data/` modules
3. Extract utility functions (format, colors, stats) into `src/utils/`
4. Build the navigation system (path-based drill-down with breadcrumbs)
5. Build the Dashboard page:
   - KPI cards (gross contract, active packages, weighted progress)
   - Search bar (searches managers, projects, packages)
   - Stage filter pills (All, Early, In progress, On track, Nearly done)
   - Sort dropdown (contract high/low, progress high/low, name, packages)
   - View toggle (By manager / All packages)
   - Manager cards with avatar initials, progress bars, project tags
   - Package cards with progress bars
   - Portfolio summary table
6. Build the Manager Detail page (projects grouped by name, sub-package cards)
7. Build the CSR Spreadsheet page:
   - Excel-style table with frozen Item + Description columns
   - Three column groups: Budgetary (A), Cost to Date (B), CSR (D = B + C)
   - Collapsible row sections
   - Section filter pills (All sections, A, B, D, E, F, G, H, I)
   - Over-budget highlighting in red
   - Proper sticky headers with z-index layering
8. Build the Chat panel:
   - Floating green FAB button on every page
   - Slide-up panel with backdrop
   - Anthropic API integration (claude-sonnet-4-20250514)
   - System prompt with all project + CSR data
   - Suggestion chips for quick queries
   - Typing animation
   - Message history within session
9. Add PWA meta tags and iPad optimizations
10. Verify all numbers match the prototype exactly

### Acceptance Criteria
- Every screen looks and behaves identically to `prototype/tod.html`
- All 10 managers, all packages, all 114 CSR rows display correctly
- Filters (search, stage, sort) work correctly in both view modes
- CSR spreadsheet frozen columns work — numbers scroll behind Item/Description
- Chat panel opens/closes, sends messages, receives AI responses
- Works on iPad Safari with touch interactions

## Milestone 2: Deployment + PWA
**Goal**: Live URL accessible from iPad.

### Tasks
1. Configure Vercel deployment (vercel.json)
2. Add PWA service worker for offline support
3. Add apple-touch-icon and splash screens
4. Configure proper meta tags for iPad home screen
5. Set up environment variable for Anthropic API key
6. Test on actual iPad device

## Milestone 3: Live Data (Future)
**Goal**: Replace hardcoded data with database.

### Tasks
1. Set up Supabase project
2. Create tables: managers, projects, packages, csr_line_items
3. Import existing data into Supabase
4. Build Excel upload feature (parse .xlsm/.xlsx with SheetJS)
5. Replace hardcoded imports with Supabase queries
6. Add real-time updates

## Tech Constraints
- No TypeScript for Phase 1 (keep it simple, `.jsx` files)
- No state management library (useState + useContext only)
- No CSS-in-JS — use Tailwind utility classes + minimal custom CSS
- All monetary values in Philippine Pesos (₱)
- Anthropic API called client-side for Phase 1 (move to server route in Phase 2)
