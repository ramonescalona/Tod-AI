---
name: ERP Integration Plan
description: Phase 2 plan to connect Frappe/ERPNext ERP at terpasia.xurpaslabs.com to Tod dashboard
type: project
---

User has API access credentials for the Frappe/ERPNext ERP at terpasia.xurpaslabs.com.

Priority data to pull into Tod:
1. Cost actuals (actual expenditures per project/work package) — to replace hardcoded CSR data
2. Purchase Order transactions — to show PO status and committed costs on the dashboard

**Why:** Currently all data in Tod is hardcoded. Phase 2 goal is live data from the ERP so the dashboard auto-updates without manual edits.

**How to apply:** When building Phase 2, plan a backend proxy (Vercel serverless functions or Supabase Edge Functions) to securely call the Frappe REST API using the ERP API key, since keys cannot be exposed in browser HTML files.

Relevant Frappe endpoints likely needed:
- /api/resource/Purchase Order
- /api/resource/Purchase Invoice (cost actuals)
- /api/resource/Project
- /api/resource/Stock Entry (material consumption)
