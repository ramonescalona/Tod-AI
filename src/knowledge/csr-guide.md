# CSR Guide — How the Cost Status Report Works

## Purpose & Overview

The Cost Status Report (CSR) is TACC's primary tool for management to assess project progress and project costs until completion. It answers the key question: **"Given what we've spent and what's left to do, will this project come in on budget?"**

Current state: Excel-based `.xlsm` files connected to ERPNext via VBA macros. Each project has its own CSR file. Files are uploaded to a Digital Ocean repository per reporting period and monitored by PMU.

The primary audience is the company owner (Chairman/President) who reviews portfolio-level profitability and flags risk projects.

---

## The Four-Column Structure

The CSR has four main data columns (A through D) plus a Remarks column:

| Column | Label | Who Enters | Source |
|--------|-------|-----------|--------|
| **A** | Budgetary at 0% Accomplishment | Estimating/PMU team | Manual entry; locked read-only after save |
| **B** | Cost to Date (CTD) | System (auto-pull) | ERPNext via API — not editable by users |
| **C** | Cost to Complete (CTC) | Project Manager | Manual entry by PM; PM's estimate of remaining costs |
| **D** | Cost Status Report (D = B + C) | Calculated | Auto-calculated; saved to database for consolidation |
| **E** | Remarks | Project Manager | Free-text notes per line item |

Each column contains the same sub-fields:
- **Quantity** — physical quantity
- **UOM** — unit of measure
- **Unit Cost** broken into four types:
  - Material Cost
  - Labor Cost
  - Equipment Cost
  - Other Cost
- **Total Cost** — sum of the four unit cost types × quantity

### Column A — Budgetary
Initial estimate prepared by the Estimating/PMU team before construction starts. Represents the planned cost at 0% accomplishment. Once saved, this column is locked for everyone except Estimating/PMU. This is the baseline for variance tracking.

### Column B — Cost to Date (CTD)
Actual costs pulled automatically from ERPNext. Shows real quantities and actual unit costs incurred to date. PMs cannot edit this — it reflects what has actually been transacted in the system (POs, receipts, payments, stock issuances, journal entries, etc.).

### Column C — Cost to Complete (CTC)
The PM's best estimate of what it will still cost to finish the project. This is the most judgment-intensive column. The PM fills this in after reviewing current site conditions, pending work, and outstanding commitments.

### Column D — Cost Status Report
Calculated as `D = B + C`. This represents the total projected cost at completion. It is saved to the ERPNext database and used for consolidated reporting. Management tracks D vs. A to see if a project is trending over or under budget.

---

## Cost Breakdown Hierarchy

Cost breakdowns are standardized and centrally managed by PMU. PMs cannot add new cost breakdown items without management approval.

The hierarchy follows a dot-notation system (e.g., `A.4.1.1`). The full structure extracted from GVMC Architectural (PROJ-0020):

```
A. GENERAL REQUIREMENTS
  A.1. MOBILIZATION
    A.1.1. Transportation and Accommodation (Air, Sea, Land & Hotels)
      A.1.1.1. Staff
  A.2. BONDS & INSURANCE
    A.2.1. CARI (100%)
    A.2.2. Performance Bond
    A.2.3. Surety Bond
    A.2.4. Guarantee Bond (10%)
  A.3. PERMIT & LICENSES
    A.3.3. Building Permit
    A.3.6. ECC (If charge to contractor) - Include DENR Requirements
  A.4. TEMPORARY FACILITIES - TACC
    A.4.1. Construction of
      A.4.1.1. On Site: Site Office
      A.4.1.2. Offsite: Manpower Barracks
    A.4.2. Rental (off-site)
      A.4.2.1. Staff House
      A.4.2.2. Mancamp
    A.4.4. IT Equipments
      A.4.4.1. Computers, Printers, Scanner
    A.4.5. Office Supplies
    A.4.8. Potable Water
  A.5. TEMPORARY FACILITIES - CM
    A.5.2. Rental (off-site)
  A.6. TEMPORARY UTILITIES - TACC
    A.6.1. Electricity
      A.6.1.1. Materials
    A.6.2. Water
      A.6.2.2. Labor
    A.6.3. Communication
      A.6.3.1. Materials
  A.7. TEMPORARY UTILITIES - CM
    A.7.1. Electricity / A.7.2. Water / A.7.3. Communication
  A.8. SHOP DRAWINGS & AS-BUILT PLANS
    A.8.1. Subcontractor
    A.8.2. Others
      A.8.2.1. Issuance of FCD Plans from Designer
      A.8.2.2. BIM
  A.9. CONSTRUCTION HEALTH, SAFETY, ENVIRONMENT & SECURITY
    A.9.1. Security
    A.9.3. Environment
      A.9.3.2. Garbage Disposal
  A.11. SUPPORT EQUIPMENT
    A.11.1. Light Equipment (A.11.1.5. Angle Grinders)
    A.11.2. Heavy Equipment (Rental)
      A.11.2.1. Towercrane
      A.11.2.2. Personnel Hoist
    A.11.4. Fuel, Parking & Toll Fees
  A.12. SITE MANAGEMENT
    A.12.1. Site Supervision - Support team personnel
      A.12.1.1. Staff → Salary including 13th Month Pay
      A.12.1.2. Admin Workers → Salary including 13th Month Pay
    A.12.3. Team Building
    A.12.5. Others
  A.13. REPRESENTATION
    A.13.1. Weekly Coordination Meeting
    A.13.2. Monthly Management Meeting
  A.14. DEMOBILIZATION
    A.14.3. Others

B. CIVIL WORKS and SITE DEVELOPMENT WORKS
  B.1. DEMOLITION WORKS
    B.1.3. Blasting

D. ARCHITECTURAL WORKS
  D.1. MASONRY WORKS
    D.1.1. Materials
      D.1.1.1. CHB 6"
      D.1.1.2. Cement
      D.1.1.3. White Sand
      D.1.1.4. Gravel
      D.1.1.5. CHB 4"
      D.1.1.6. Phenolic Plywood
      D.1.1.7. Vibro Sand
    D.1.3. Subcontractor
    D.1.4. Others
  D.2. PLASTERING WORKS
    D.2.3. Subcontractor
  D.3. FLOOR FINISHES
    D.3.1. Materials (Tile Adhesive, Tile Grout)
    D.3.3. Subcontractor
  D.4. WALL FINISHES
    D.4.1. Materials / D.4.3. Subcontractor / D.4.4. Others
  D.5. OTHERS
    D.5.3. Subcontractor

E. MECHANICAL WORKS
  E.1. Materials / E.4. Others

F. ELECTRICAL WORKS
  F.1. Materials / F.4. Others

G. PLUMBING & SANITARY WORKS
  G.1. Materials / G.4. Others

H. FIRE PROTECTION WORKS
  H.3. Subcontractor / H.4. Others

I. AUXILIARY WORKS
  I.1. Materials / I.4. Others

!GRAND TOTAL!
```

> Note: Letter "C" (Structural Works) is present in other projects (e.g., Tarlac Hall of Justice) but not in the GVMC Architectural package, which is trade-specific. Each project's cost breakdown is configured to match its scope of work.

---

## CSR Reporting Templates

### Report 1 — Cost Status Report per Project
The main template described above. One file per project. Shows A/B/C/D/E columns for all cost breakdowns. Used by PM and PMU.

### Report 2 — Consolidated Projects: Budgetary vs. Cost at Completion
- Rows: Major cost breakdown categories
- Columns: Individual projects
- Shows: Budget (Col A), CSR (Col D), Variance, % Variance
- Purpose: Cross-project comparison of cost categories

### Report 3 — Consolidated Project Profitability
- Rows: Projects grouped by customer
- Columns: Contract Amount (from Sales Order), Estimated Cost at Completion (CSR Col D), Net Profit After Tax
- Formula: `NPAT = (Contract Amount − CSR) × 95%`
- Purpose: Overall portfolio profitability tracking for management

---

## Cost Data Flow into Column B (CTD)

All costs feeding into Column B (Cost to Date) must be tagged with **Project** and **Cost Breakdown** in ERPNext:

| Source | ERPNext Document | Notes |
|--------|-----------------|-------|
| Materials purchased | Purchase Order / Receipt / Payment | Depends on allocation rule (see below) |
| Stock issued to site | Stock Entry (Central WH → Site) | Cost breakdown defaults from Item master, modifiable |
| Subcontractor costs | Purchase Order (tagged "Contract") | |
| Payroll | Journal Entry | Must have Project + Cost Breakdown + Breakdown Type |
| Petty cash | Journal Entry | Same tagging requirement |
| Advances/liquidations | Journal Entry | Same tagging requirement |
| Inventory | Fully expensed for CSR purposes (conservatism principle) | |
| Fixed assets | Fully expensed for CSR purposes | Even though capitalized in accounting books |

---

## Allocation Rules (Cost Recognition)

The CSR uses three possible allocation rule priorities for purchase-related costs. The rule determines **which ERPNext document triggers cost recognition** in Column B:

**Priority Order 1 (Default):** PO → Receipt → Payment
- Cost recognized at Purchase Order stage
- Falls back to Receipt if no PO; falls back to Payment if no Receipt

**Priority Order 2:** Receipt → PO → Payment
- Cost recognized at Purchase Receipt (validated by PM)
- Used when expense should be recognized only upon delivery confirmation

**Priority Order 3:** Payment → PO → Receipt
- Cost recognized at actual cash outflow
- Used for conservative cash-basis reporting

Rules can be set at two levels:
1. **Cost Breakdown level** — applies to all transactions under that breakdown
2. **Supplier level** — overrides the Cost Breakdown rule for a specific supplier

[TODO: Confirm which allocation rule is the default for GVMC and other active projects]

---

## CSR Update Process (Typical Cycle)

1. **Project awarded** → Estimating/PMU opens CSR template, selects project (`SelectedProject` = e.g., `PROJ-0020`), enters Column A budgetary details, saves and locks
2. **PM reviews** → opens file, checks Column A, may add initial CTC estimates in Column C
3. **Costs post in ERPNext** → PMs or PMU refresh Column B (CTD) via the "Refresh" macro button which calls the ERPNext API
4. **PM updates CTC** → adjusts Column C estimates based on current site conditions
5. **PM saves and uploads** → file saved to Digital Ocean repository (`prod` folder) for the reporting period
6. **PMU monitors** → verifies submissions, checks for over-budget items, flags risks to management

---

## Spreadsheet Technical Details

### API Connection
- **API_Link**: `https://terpasia.xurpaslabs.com`
- **API_TerpApp**: `terp`
- Authentication: User login via `LoginUser` (e.g., `ramonescalona@tacc.com.ph`)
- `LoginOnOpen = true` — prompts login on file open, closes if authentication fails

### Named Ranges in Controls Sheet

| Named Range | Example Value | Purpose |
|-------------|--------------|---------|
| `API_Link` | `https://terpasia.xurpaslabs.com` | ERPNext API base URL |
| `API_TerpApp` | `terp` | Frappe app name |
| `SelectedProject` | `PROJ-0020` | Active project code |
| `SelectedProjectDesc` | `GVMC Architectural Works` | Active project name |
| `SelectedCostBreakdown` | `!ALL` | Filter by cost breakdown (`!ALL` = show all) |
| `SelectedCostBreakdownDesc` | `[ALL]` | Display label for filter |
| `RowFieldRange` | `B13:D13` | Where row data is generated in CTC Template |
| `RowFields` | `name,item_id,description` | Fields fetched per cost breakdown row |
| `ColumnFieldStartRange` | `E3` | Starting cell for column fields in CTC Template |
| `ColumnFieldsSource` | `I3:AP3` | Column field IDs in Controls sheet |
| `IsDataChanged` | `false` | Tracks unsaved changes |
| `SourceHeaders` | `F5:AP8` | Source column header cells |
| `TotalFormulaSource` | `1:1` | Row 1 contains total formulas |
| `EnableRowSuppression` | `true` | Hide rows where all values = zero |
| `EnableRowGrouping` | `true` | Group rows by indent level (collapsible) |
| `EnableFreezePane` | `true` | Freeze Item No. + Description columns |
| `ColumnAOnly` | `false` | If true, generates budgetary column only |
| `DgOcMainFolder` | `prod` | Digital Ocean folder for file storage |
| `SetReadOnlyOnOpen` | `false` | Files from DO open as read-only when true |

### Column Field Mapping (Row 3 Format)
Each data column in the spreadsheet is identified by a `field_name,section_name` pair:
```
budgetary_cost:  r-format | quantity | uom | material_cost | labor_cost | equipment_cost | other_cost | total_cost
allocation_cost: r-format | quantity | uom | material_cost | labor_cost | equipment_cost | other_cost | total_cost
cost_to_complete: r-format | quantity | uom | material_cost | labor_cost | equipment_cost | other_cost | total_cost
cost_status:     r-format | quantity | uom | material_cost | labor_cost | equipment_cost | other_cost | total_cost
```
Plus a final `remarks` column.

### Formatting Rules (Formatting Table)
| Format Name | Applied To |
|-------------|-----------|
| `Data` | Regular data rows (numeric cells) |
| `Headers` | Column header rows |
| `Row, [is_group=1]` | Group/section header rows (green tint in display) |
| `Row, [is_supplier_breakdown=1]` | Rows showing supplier-level cost breakdown |
| `Column, <total_cost>` | Total cost columns |
| `Row, end` | End-of-section spacer rows |
| `Row, <!GRAND TOTAL!>` | Grand total row (tan tint) |
| `Column, <r-format>` | Row format indicator column (hidden in print) |

### Remarks Table
Stored in Controls sheet below row 62. Format: `Key` → `Value`
- Key format: `PROJECT_ID|Cost_Breakdown_Name` or `PROJECT_ID|Cost_Breakdown_Name|Supplier_Name`
- Examples:
  - `PROJ-0001|A.2.2. Performance Bond` → `"Test 01x01"`
  - `PROJ-0020|D.1.3. Subcontractor` → PM note about subcon status
  - `PROJ-0001|C.1.1.1.1. Cement|Supplier 002` → supplier-specific remark
- **Do not add anything below the remarks table** — VBA macros write to this area dynamically
