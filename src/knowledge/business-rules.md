# Business Rules — How Decisions Are Made at TACC

## CSR Cost Recognition Rules

### Allocation Rule Priorities
When a cost is incurred through procurement, the system must decide **which document triggers cost recognition** in the CSR Column B (Cost to Date). Three priority orders are supported:

**Priority 1 — PO First (Default)**
`PO → Receipt → Payment`
Cost recognized at Purchase Order creation. If no PO exists, falls back to Receipt; if no Receipt, falls back to Payment.

**Priority 2 — Receipt First**
`Receipt → PO → Payment`
Cost recognized when goods/services are physically received and validated by the PM. Used when management wants cost recognition tied to delivery confirmation.

**Priority 3 — Payment First**
`Payment → PO → Receipt`
Cost recognized at actual cash outflow. Most conservative approach.

### Setting Allocation Rules
- Default setting is at the **Cost Breakdown level** — applies to all transactions under that breakdown category
- Can be **overridden at the Supplier level** — a specific supplier can use a different rule than the cost breakdown default
- [TODO: Confirm which rule is active by default across all TACC projects]

### Conservatism Principle
- **Inventory items**: Fully expensed for CSR purposes at the time of stock issuance — even though they remain as assets in the accounting books
- **Fixed assets**: Fully expensed for CSR purposes upon receipt — even though capitalized in accounting (depreciated over useful life)
- **Rationale**: Management wants to see worst-case cost projections to avoid surprises at project close-out

---

## Approval Matrices

### Material Purchase Requisition (MPR)

**Site requests:**
```
Requestor (Docs Controller / Site Admin)
  → Approver 1: PIC (Person in Charge)
    → Approver 2: Project Manager
```

**Head Office requests:**
```
Requestor
  → Approver: Department Head
```

### Purchase Order

```
Preparer: Purchaser
  → Approver 1: Sir Nick
    → Approver 2: Sir Ryan
```

Note: POs require e-signature on external documents sent to suppliers.

### Pull-Out Request (Stock Transfer from Site)

```
Requestor: Purchaser
  → Approver: Sir Nick
```

### Payment Entry (AP / Check Voucher)

```
Preparer: AP Processor
  → Approver 1: Sir Ben
    → Approver 2: Sir Raymund or Sir BE
```

### Petty Cash Journal Entry

```
Preparer: Site Petty Cash Custodian
  → Approver 1: AP Processor
    → Approver 2: Sir Ben
```

---

## Financial Rules

### Revenue & Billing
- Customer downpayments (DP) recorded as advances in the system
- Progress billing tied to accomplishment percentage milestones
- VAT computed on: `Gross Billing − DP Recoupment`
- EWT (Expanded Withholding Tax) computed at invoice processing
- Customer invoices are generated **outside ERPNext** [TODO: verify current status]
- Payment Entry must capture customer check details (check no., date, bank)
- Payment number series configured per disbursing bank — bank account auto-fetches based on series

### Profitability Formula
```
Net Profit After Tax (NPAT) = (Contract Amount − CSR Column D) × 95%
NPAT% = NPAT / Contract Amount
```
The 5% deduction accounts for income tax. Management reviews NPAT% per project and at portfolio level.

### Portfolio Financial Targets (as of CSR New Projects file)
- **Gross Contract Amount**: ₱5,002,609,086.88
- **5% Tax**: ₱250,130,454.34
- **Contract Amount After Tax**: ₱4,752,478,632.54
- **15% Profit Target** (of gross): ₱750,391,363.03
- **Target Direct Cost**: ₱4,002,087,269.50

### Document Control
- Mandatory cancellation reason for all document reversals
- Accounting period locking — prevents posting of entries after period cut-off date
- Duplicate invoice alert — system warns if same supplier invoice number already exists

---

## Procurement Rules

- Purchaser must check Central WH stock availability **before** creating a purchase
- Only buy the quantity the Central WH cannot fulfill (partial fulfillment is standard)
- Items must be selected from the system's item master — **no free-text items allowed**
- Central WH has read-only view of: stock ledger, open MPRs, and light tools inventory
- Subcontractor agreements are Purchase Orders with the **"Contract" tag** — same PO number series as regular goods purchases
- Employees are tracked as suppliers (HR module not implemented in Phase 2)

---

## Inventory Rules

- **Valuation method**: FIFO (First In, First Out)
- **Inventory method**: Perpetual inventory
- Staging warehouse (virtual) used for consolidation before shipping to site
- Subcontractor "pasabay" materials (materials the subcon brings through TACC) are **not tracked** in the inventory system
- Light tools and equipment are tracked with a custom status field: `Operational`, `Standby`, `Transferred`, `Pulled Out`
- Inventory items are **fully expensed for CSR** even though they remain as stock in accounting books (see conservatism principle above)

### Stock Transfer Notification Chain
1. CW ships to Site → Site Warehouse notified
2. Site accepts stock → CW notified of acceptance
3. Site-to-Site transfers → CW notified

---

## Project & CSR Rules

- Cost Breakdown structure is standardized and managed centrally by PMU/Estimating
- **PMs cannot add new cost breakdown members** without management approval
- Column A (Budgetary) is entered by Estimating/PMU and **locked** for all other users after initial save
- `ColumnAOnly = true` generates a budgetary-only report (for initial project setup)
- `EnableRowSuppression = true` — rows with all-zero values are hidden by default (reduces clutter)
- `EnableRowGrouping = true` — rows are grouped by indent level (collapsible in Excel)
- The `Show Supplier` flag on a Project determines which cost breakdowns display supplier-level detail in the CSR
- CSR files are saved to the Digital Ocean repository (`prod` folder) per reporting period
- PMU monitors all submitted CSR files and verifies accuracy

### CSR Risk Flags (what management looks for)
- Cost breakdown where **CTD / Budget > 70%** (high burn rate) — e.g., GVMC Mechanical at 74.9%
- Items with **actual spend but ₱0 budget** — e.g., GVMC "Other Costs" ₱102.4M unbudgeted
- Individual items **already over budget** — e.g., GVMC CHB 6" overspent 31.9%
- Projects with **0% accomplishment** but costs posting — e.g., Maribago Resort (Rowell Clarin)
- Large CTC column C estimates that push D far above A

---

## Data Entry Rules for GL Postings

For costs to appear correctly in CSR Column B (CTD), **all journal entries** related to projects must include:
1. **Project** — the project code (e.g., `PROJ-0020`)
2. **Cost Breakdown** — the specific breakdown item (e.g., `A.12.1.1.1. Salary including 13th Month Pay`)
3. **Breakdown Type** — Material, Labor, Equipment, or Others

This applies to: payroll JEs, petty cash JEs, advance liquidations, and any direct GL postings to project costs. Missing any of these three fields means the cost will **not appear** in the CSR.
