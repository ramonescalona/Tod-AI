# ERP System — How TERP / ERPNext Works

## System Overview

| Item | Value |
|------|-------|
| **URL** | `https://terpasia.xurpaslabs.com` |
| **Platform** | ERPNext (Frappe framework) |
| **Custom App** | `terp` |
| **Implementor** | Xurpas Software / Xurpas Labs |
| **Primary user login** | e.g., `ramonescalona@tacc.com.ph` |

TACC (The Asian Construction Company / TERP Asia Construction Corporation) runs ERPNext as its core business system. Phase 2 implementation covers six process areas: Record to Report, Procurement & Payments, Inventory Management, Sales & Cash Collection, Asset Management, and CSR Customization.

The Excel-based CSR files connect to this system via Frappe's REST API (`/api/method/terp.*`) to pull live cost data into Column B (Cost to Date).

---

## End-to-End Process Architecture

### 1. Order to Cash (O2C)

```
Contract Awarded
  → Sales Order (created by Billing & Collection Rep)
    → Progress Billing (per accomplishment milestone)
      → Sales Invoice (customer invoice — generated outside ERPNext [TODO: verify])
        → Payment Collection (Payment Entry, capturing check details)
          → DP Recoupment (deducted from progress billing)
```

Key rules:
- Item detail at **work category level** (Structural, Civil, Architectural, etc.) — not full BOQ line items
- Customer downpayments recorded as advances in the system
- VAT calculated on gross billing minus DP recoupment
- Expanded Withholding Tax (EWT) computed at invoice processing time
- Payment Entry must capture customer check details
- Payment series configured per disbursing bank (auto-fetches bank account)

### 2. Procure to Pay (P2P)

```
Material Purchase Requisition (MPR)
  → Purchaser checks Central WH stock availability
    → (if CW cannot fulfill) Request for Quotation (RFQ)
      → Supplier Quotation
        → Purchase Order (PO) [approval required]
          → Purchase Receipt (RIR - Receiving and Inspection Report)
            → Purchase Invoice
              → Payment Entry (Check Voucher / AP Voucher)
```

Key rules:
- Purchaser must check Central WH availability before buying; buy only the shortfall quantity
- Items must be selected from system master — no free-text item entry
- Subcontractor agreements are managed as **Purchase Orders tagged "Contract"**
- Same PO number series for goods and subcon contracts
- Employees tracked as a Supplier group (HR module not implemented)
- E-signature required on external PO documents; button approval for internal approvals
- Expense recognized at receipt (validated by PM), not at invoice

### 3. Inventory to Deliver (I2D)

```
Goods Received at Central Warehouse (CW)
  → Stock stored in Central WH
    → Site Requestor submits Pull-Out Request
      → Purchaser reviews → Sir Nick approves
        → Stock Transfer (CW → Site Warehouse)
          → Site accepts (triggers notification back to CW)
            → Stock Issue to project (tagged with Project + Cost Breakdown)
```

Site-to-site transfers are also supported (Site A → Site B), with CW notified.

Key rules:
- Staging warehouse (virtual) used for consolidation before shipping
- Subcontractor "pasabay" items (pass-through materials) not tracked in inventory
- Light tools and equipment have a custom status field: `Operational`, `Standby`, `Transferred`, `Pulled Out`
- FIFO (First In, First Out) stock valuation method
- Perpetual inventory method enabled

### 4. Record to Report (R2R)

**AP Processing:**
- PO-based payments: PO → Receipt → Invoice → Payment
- Non-PO payments: Direct AP Voucher
- Petty cash: Site custodians prepare Journal Entries for replenishment
- Employee advances: Journal Entry → Liquidation (with mandatory cancellation reason for reversals)

**AR Processing:**
- Customer downpayment (advance)
- Progress billing (per accomplishment %)
- Retention release

**Period Closing:**
- Accounting period locking prevents entries after cut-off
- Mandatory cancellation reason for document reversals
- [TODO: Add period-close checklist from BRD]

### 5. Acquire to Retire (A2R)

```
Asset received (Purchase Receipt)
  → Asset created in system
    → Asset details entered (serial no., person responsible, location)
      → Depreciation schedule set
        → Asset movements tracked (site to site)
          → Revaluation / Repair as needed
            → Disposal (with approval)
```

Key rules:
- Assets are **fully expensed for CSR purposes** even though capitalized in accounting books (conservatism)
- Custom fields: Person Responsible, Tool/Equipment Status
- [TODO: Add depreciation method and asset categories from BRD]

---

## Master Data Entities

| Entity | Key Fields / Notes |
|--------|-------------------|
| **Company** | TACC / TERP Asia Construction Corporation |
| **Chart of Accounts** | Standard + construction-specific GL accounts |
| **Supplier** | Includes subcontractors and employees (HR not implemented) |
| **Customer** | Project owners / clients |
| **Item** | Managed centrally; includes construction materials, services, equipment |
| **Warehouse** | Central WH, Site Warehouses (per project), Staging (virtual) |
| **Project** | One per work package; code format: `PROJ-XXXX` (e.g., `PROJ-0020`) |
| **Cost Breakdown** | Hierarchical (A.1.1.1 style); centrally managed by PMU |
| **Cost Center** | Maps to projects/departments |
| **Asset** | Fixed assets per project; includes light tools and heavy equipment |
| **Asset Category** | [TODO: List from BRD] |
| **Tax Category** | Used for VAT and EWT computation |

---

## Custom Fields & Enhancements

### Custom Workflows
| Workflow | Approvers |
|----------|----------|
| MPR Approval (Site) | Requestor (Docs Controller) → PIC → Project Manager |
| MPR Approval (HO) | Requestor → Department Head |
| PO Approval | Purchaser → Sir Nick → Sir Ryan |
| Pull-Out Request | Purchaser → Sir Nick |
| Payment Entry | AP Processor → Sir Ben → Sir Raymund/Sir BE |
| Petty Cash Journal | Site PC Custodian → AP Processor → Sir Ben |

### Custom Forms
| Form | Purpose |
|------|---------|
| **AP Voucher** | Non-PO accounts payable processing |
| **Check Voucher** | Payment disbursement record |
| **RIR (Receiving and Inspection Report)** | Goods receipt confirmation at site |
| **Warehouse Transmittal** | Stock transfer documentation (CW → Site) |
| **Pull-Out Slip** | Authorization for stock movement out of site |

### Custom Fields
- **PO "Contract" tag** — marks a PO as a subcontractor contract
- **Purpose field on MPR items** — describes what the material is for
- **Original Contract vs. Change Order** — on Sales Order
- **Cost Breakdown on Stock Transfers** — required field when issuing stock to project
- **Person Responsible on Assets** — who is accountable for the asset
- **Tool/Equipment Status** — `Operational`, `Standby`, `Transferred`, `Pulled Out`

### System Enhancements
- Duplicate invoice alert — warns AP processor if same invoice number already exists for supplier
- Notification chain for stock transfers (CW→Site confirmation, Site→CW acceptance, CW notified on site-to-site transfers)
- E-signature integration for PO documents sent externally

---

## Roles & Responsibilities

| Role | Responsibilities |
|------|----------------|
| **Billing & Collection Rep** | Creates Sales Orders, manages progress billing and collections |
| **Project Manager (PM)** | Approves MPRs (site), validates receipts, fills CSR Col C (CTC), monitors project costs |
| **Construction Manager (CM)** | Senior oversight of multiple project managers |
| **Purchaser** | Prepares MPRs (HO), creates RFQs and POs, manages pull-out requests |
| **Central Warehouse (CW)** | Manages stock receipts, fulfills pull-out requests, tracks inventory |
| **Site Warehouse** | Receives stock from CW, manages site-level inventory |
| **Site Admin / Docs Controller** | Initiates MPRs at site level |
| **AP Processor** | Processes supplier invoices and payment entries |
| **AP Approver (Sir Ben / Sir Raymund / Sir BE)** | Approves payment entries |
| **General Accountant** | Manages period closing, GL entries, financial reporting |
| **Site Accountant** | Manages site-level petty cash and liquidations |
| **Estimating/PMU** | Enters Col A budgetary data in CSR; monitors submissions; manages cost breakdown master |
| **Sir Nick** | PO approver (Approver 1), pull-out request approver |
| **Sir Ryan** | PO final approver (Approver 2) |

---

## CSR API Integration

The Excel CSR files connect to ERPNext via Frappe's REST API:

- **Base URL**: `https://terpasia.xurpaslabs.com`
- **App**: `terp`
- **Authentication**: Username/password (prompted on file open when `LoginOnOpen = true`)
- **Data flow**: VBA macros call API endpoints to:
  1. Fetch cost breakdown list for selected project
  2. Pull CTD (Column B) figures per cost breakdown
  3. Save CTC (Column C) entries back to database
  4. Upload completed CSR file to Digital Ocean (`prod` folder)
- **Project selection**: Controlled by `SelectedProject` named range (e.g., `PROJ-0020`)

[TODO: Document specific API endpoint URLs from TERP app once available]
