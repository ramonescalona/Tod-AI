# Glossary — TACC Construction & ERP Terms

Alphabetical reference for construction, ERP, financial, and project-specific terminology used at TACC / TERP Asia.

---

## A

**Accomplishment (%)** — The percentage of work physically completed on a project or work package. Used as the basis for progress billing and CSR reporting. Also called "physical accomplishment" or "percent complete."

**Accounts Payable (AP)** — Money TACC owes to suppliers and subcontractors. Managed in ERPNext through Purchase Invoices and Payment Entries. See also: AP Voucher, Check Voucher.

**Accounts Receivable (AR)** — Money owed to TACC by clients/customers. Managed through Sales Orders, Sales Invoices, and Payment Entries (collections).

**Advance Payment** — Payment made to a supplier or received from a customer before work or delivery is complete. Customer advances (downpayments) are recorded as liabilities until applied to progress billing.

**Allocation Rules** — The priority order used to determine when a cost is recognized in the CSR (Cost to Date). Three options: (1) PO first, (2) Receipt first, (3) Payment first. Set at Cost Breakdown or Supplier level. See `business-rules.md`.

**AP Approver** — The person who authorizes payment entries in ERPNext. Currently: Sir Ben (Approver 1), Sir Raymund / Sir BE (Approver 2).

**API_Link** — Named range in the CSR Excel Controls sheet. Value: `https://terpasia.xurpaslabs.com`. The ERPNext server URL used for all VBA macro API calls.

**API_TerpApp** — Named range in CSR Controls sheet. Value: `terp`. The Frappe custom app name used in API calls.

**AP Processor** — Staff responsible for processing supplier invoices and preparing payment entries for approval.

**AP Voucher** — Internal form used for non-PO-based accounts payable transactions (e.g., utilities, professional fees paid directly).

**As-Built Plans** — Final construction drawings reflecting how the building was actually built, as opposed to the original design plans. Required for project close-out.

---

## B

**Bill of Quantity (BOQ)** — A detailed list of materials, parts, and labor required for a construction project, with quantities and estimated unit costs. Source document for budgetary estimates in CSR Column A.

**Billing & Collection Rep** — ERPNext role responsible for creating Sales Orders, processing progress billings, and managing customer payments.

**BIM (Building Information Modeling)** — 3D modeling technology used for design coordination. Appears as a cost breakdown item under `A.8.2.2. BIM`.

**Breakdown Type** — The cost category of a transaction: `Material`, `Labor`, `Equipment`, or `Others`. Required field on all project-tagged journal entries. Corresponds to the four unit cost sub-columns in the CSR.

**Budget (Column A)** — See "Column A."

---

## C

**CARI (100%)** — Contractors' All Risk Insurance. A project insurance requirement. Appears as cost breakdown `A.2.1. CARI (100%)`.

**Certificate of Completion** — Document issued when a project or milestone is officially completed. Triggers final billing and retention release.

**Change Order** — A formal modification to the original construction contract, changing scope, price, or schedule. Tracked separately from original contract amount in CSR New Projects portfolio.

**Chart of Accounts (COA)** — The structured list of all GL accounts in ERPNext. Includes project cost accounts, income accounts, and balance sheet accounts.

**Check Voucher (CV)** — Internal payment document used when disbursing funds by check. The physical check authorization form.

**CHB 4" / CHB 6"** — Concrete Hollow Blocks in 4-inch or 6-inch size. Common masonry materials. In GVMC Architectural CSR, CHB 6" is a tracked risk item (overspent 31.9%).

**Column A** — Budgetary cost column in the CSR. Entered by Estimating/PMU at project start. Locked after initial save. Represents planned cost at 0% accomplishment.

**Column B** — Cost to Date (CTD) column. Auto-pulled from ERPNext. Not editable by users. Reflects actual costs transacted.

**Column C** — Cost to Complete (CTC) column. Filled by the Project Manager. Estimated remaining cost to finish the project.

**Column D** — Cost Status Report column. Calculated as D = B + C. Total projected cost at completion. Used for profitability reporting.

**Column E** — Remarks. Free-text notes entered by the PM per cost breakdown line.

**ColumnAOnly** — Named range in CSR Controls sheet. If `true`, only Column A (Budgetary) is generated. Used during initial project setup.

**Construction Manager (CM)** — Senior role overseeing multiple Project Managers. Reviews CSR at program level.

**Controls Sheet** — The second sheet in TACC's CSR Excel files. Contains: named ranges configuration, column field mappings, formatting table, and remarks table. Managed by the system — users should not edit rows below the Remarks Table header.

**Cost Breakdown** — The hierarchical cost categorization system (e.g., `A.12.1.1.1. Salary including 13th Month Pay`). Every project cost in ERPNext must be tagged to a Cost Breakdown. Centrally managed by PMU. PMs cannot add new items without approval.

**Cost Center** — ERPNext organizational unit for cost allocation. Maps to projects or departments.

**Cost Status Report (CSR)** — TACC's primary project cost management report. Shows budgetary estimates, actual costs to date, estimates to complete, and projected final cost. Produced in Excel, connected to ERPNext. See `csr-guide.md`.

**Cost to Complete (CTC)** — The PM's estimate of remaining costs to finish a project (CSR Column C).

**Cost to Date (CTD)** — Actual costs incurred to date, pulled from ERPNext (CSR Column B).

**CTC Template** — The first sheet in TACC's CSR Excel files. Contains the four-column CSR table with all cost breakdown rows, populated by VBA macros from ERPNext data.

**Controlled Demolition Works** — A scope item for carefully removing existing structures. Example: JIL Tower Package 1.1.5 (₱1.4M, 34.2% done).

---

## D

**Demobilization** — The process of closing down a construction site at project end — removing equipment, temporary facilities, and personnel. Cost breakdown item `A.14. DEMOBILIZATION`.

**Digital Ocean (DO)** — Cloud storage platform used to store completed CSR files. Folder `prod` is the production repository. Files are uploaded via VBA macro after PM saves.

**Docs Controller** — Site-level role that initiates Material Purchase Requisitions (MPRs).

**DP (Downpayment)** — Advance payment from client. Recorded as a customer advance. Recouped (deducted) proportionally from each progress billing.

**DP Recoupment** — The deduction of previously received downpayments from progress billing invoices. VAT is computed after DP recoupment.

---

## E

**ECC (Environmental Compliance Certificate)** — Government permit required for construction projects. Cost breakdown item `A.3.6`.

**EnableRowGrouping** — CSR Controls named range. If `true`, rows are grouped by indent level (collapsible outline in Excel). Default: `true`.

**EnableRowSuppression** — CSR Controls named range. If `true`, rows with all-zero values across all columns are hidden. Default: `true`. Reduces clutter for inactive cost breakdowns.

**ERIS** — Legacy ERP system previously used at TACC, now being replaced by ERPNext (TERP). [TODO: Add more detail about what ERIS tracked]

**ERPNext** — Open-source ERP platform (built on Frappe) used by TACC. Hosted at `terpasia.xurpaslabs.com`. Manages procurement, inventory, sales, accounting, and assets.

**Estimating** — The team (under PMU) responsible for preparing budgetary cost estimates and entering CSR Column A data for new projects.

**EWT (Expanded Withholding Tax)** — Philippine tax withheld at source from supplier payments. Calculated at invoice processing time in ERPNext.

---

## F

**Fabrication Area** — Dedicated space where structural steel or other components are pre-fabricated before installation at the construction site.

**FIFO** — First In, First Out. The stock valuation method used by TACC. Items received first are costed first when issued.

**Fixed Asset** — Equipment, tools, or infrastructure with a useful life greater than one year. Capitalized in accounting books but **fully expensed for CSR purposes** (conservatism). Managed through ERPNext's Asset module.

**Formworks** — Temporary molds used to shape poured concrete (walls, slabs, columns). A significant cost item in structural works packages.

**Frappe** — The Python web framework underlying ERPNext. TACC's custom logic lives in the `terp` Frappe app.

---

## G

**General Accountant** — ERPNext role responsible for period closing, GL entries, and financial reporting at head office.

**General Ledger (GL)** — The master record of all financial transactions in ERPNext. Project costs post to GL accounts and must be tagged with Project + Cost Breakdown + Breakdown Type for CSR recognition.

**General Requirements** — Cost breakdown category `A. GENERAL REQUIREMENTS`. Covers mobilization, bonds, permits, temporary facilities, utilities, safety, site management, and demobilization — i.e., all project overhead costs (as opposed to direct construction costs).

**Gross Billing** — Total billing amount before deductions. VAT is applied to Gross Billing minus DP recoupment.

**Guarantee Bond (10%)** — A performance security posted to guarantee the quality of completed work. Cost breakdown item `A.2.4`.

**GVMC** — Great Valley Medical Center. TACC's largest project under Godfrey Aranzaso (PM). Project code `PROJ-0020` for the Architectural Works package (₱640M contract, 14.7% accomplishment as of last data). The only project with full CSR detail in the Tod system.

---

## I

**IsDataChanged** — CSR Controls named range. Tracks whether unsaved changes exist in the CTC Template. Set to `true` by VBA when PM edits data; reset to `false` after save.

**Item** — An ERPNext master data entity representing a material, service, or asset. Items must be selected from the system master — no free-text entry allowed. Managed centrally for standardization.

---

## J

**Journal Entry (JE)** — A direct accounting entry in ERPNext's GL. Used for payroll, petty cash replenishment, advance liquidations, and other non-PO costs. All project-related JEs must include: Project, Cost Breakdown, and Breakdown Type fields.

---

## L

**Liquidation** — The process of accounting for advances (employee or petty cash) against actual expenses. Produces a Journal Entry showing how the advance was spent.

**LoginOnOpen** — CSR Controls named range. If `true`, the Excel file prompts for ERPNext credentials when opened and closes if authentication fails.

---

## M

**Material Purchase Requisition (MPR)** — The request document for purchasing materials. Initiated at site (by Docs Controller) or HO. Requires multi-level approval before purchasing proceeds. See approval matrix in `business-rules.md`.

**Mobilization** — The process of setting up a construction site at project start — bringing in equipment, establishing temporary facilities, obtaining permits. Cost breakdown `A.1. MOBILIZATION`.

---

## N

**Named Ranges** — Excel named cells/ranges in the CSR Controls sheet that drive VBA macro behavior (API URL, project selection, feature flags). Editable by authorized users only (white cells). See full list in `csr-guide.md`.

**NPAT (Net Profit After Tax)** — `(Contract Amount − CSR Column D) × 95%`. The primary profitability metric reviewed by management for each project and the overall portfolio.

---

## P

**Pasabay** — Filipino term for subcontractor materials that pass through TACC logistics but are not tracked in TACC's inventory (the subcon owns and manages these materials). Not recorded as stock entries.

**Payment Entry** — ERPNext document recording actual payment to a supplier or from a customer. Requires approval. Must capture check details for supplier payments.

**Performance Bond** — A surety posted to guarantee project completion per contract terms. Cost breakdown item `A.2.2`.

**Perpetual Inventory** — Inventory accounting method where the stock ledger is updated in real-time with every transaction (as opposed to periodic counting). Enabled in ERPNext for TACC.

**Petty Cash** — Small-value cash fund managed by site custodians for minor site expenses. Replenishments processed as Journal Entries with PM Breakdown Type tagging.

**PIC (Person in Charge)** — The site-level manager responsible for day-to-day supervision. First approver in the site MPR workflow.

**PMU (Project Management Unit)** — Internal team overseeing all project managers. Enters CSR budgetary data (Column A), monitors CSR submissions, and manages the cost breakdown master list.

**PROJ-XXXX** — ERPNext project code format. Example: `PROJ-0020` = GVMC Architectural Works.

**Progress Billing** — Periodic billing to the client based on percent of work accomplished. Basis for revenue recognition.

**Pull-Out Request** — Formal request to transfer stock from a site warehouse (back to CW or to another site). Requires approval from Purchaser → Sir Nick.

**Purchase Invoice** — ERPNext document for recording the supplier's invoice after goods/services are received.

**Purchase Order (PO)** — ERPNext document for ordering goods or services from a supplier. Requires e-signature for external documents. Used for both materials and subcontractor contracts (tagged "Contract").

**Purchase Receipt** — ERPNext document recording the physical receipt of goods (triggers inventory update). For CSR: triggers cost recognition when allocation rule is "Receipt first."

**Purchaser** — Staff role in the Purchasing Department. Prepares RFQs, POs, and pull-out requests.

---

## R

**r-format** — A column field identifier used in the CSR Controls sheet row 3. It marks the "row format indicator" column — a hidden column containing formatting/type flags for each data row (e.g., `is_group`, `is_supplier_breakdown`). Not visible in print output.

**Receiving and Inspection Report (RIR)** — Document confirming receipt and inspection of delivered goods at the site or CW. Equivalent to ERPNext's Purchase Receipt for site deliveries.

**Remarks Table** — Section of the CSR Controls sheet (below row 62). Stores PM remarks as key-value pairs: `PROJECT_ID|Cost_Breakdown_Name` → remark text. Do not add content below this area manually — VBA manages it.

**Reinforcing Steel Bars (RSB)** — Steel bars used to reinforce concrete structures. A major cost category in structural projects (e.g., One Tolentino East RSB Fabrication: ₱1.8M).

**Request for Quotation (RFQ)** — Sent to suppliers to get pricing before issuing a Purchase Order.

**Retention** — A percentage of billing withheld by the client until project completion (typically 10%). Released upon certificate of completion or agreed milestones.

**Retrofitting Works** — Structural reinforcement of an existing building (e.g., JIL Tower Packages 2 and 3). Common in TACC's portfolio for older buildings being upgraded.

**RIR** — See "Receiving and Inspection Report."

**RowFields** — CSR Controls named range. Value: `name,item_id,description`. Defines which cost breakdown fields are fetched per row from the ERPNext API.

**Row Suppression** — See "EnableRowSuppression."

---

## S

**Sales Invoice** — The formal billing document sent to the customer for a progress billing milestone. [TODO: Confirm if generated in ERPNext or outside]

**Sales Order** — ERPNext document representing the project contract with the customer. Created by Billing & Collection Rep. Contains original contract amount and change orders.

**SelectedProject** — CSR Controls named range. Set to the active project code (e.g., `PROJ-0020`). Drives all API calls to fetch project-specific data.

**SetReadOnlyOnOpen** — CSR Controls named range. If `true`, the CSR file opens in read-only mode (used for archived files retrieved from Digital Ocean).

**Show Supplier Flag** — A flag on the ERPNext Project master. When enabled, the CSR report displays supplier-level cost breakdown rows (showing which supplier is responsible for each cost item).

**Sierra Valley Gardens** — Project under Ramel De Castro (PM). Two work packages: Tower 4 (₱439M, 31.5%) and Tower 1 Fit-out (₱98M, 55.2%).

**Site Accountant** — ERPNext role at the project site level. Manages petty cash journal entries and site-level cost tracking.

**Site Admin** — See "Docs Controller."

**Stock Entry** — ERPNext document for inventory movements: receipts, transfers (CW→Site), and issuances. Stock transfers to site must be tagged with Project and Cost Breakdown.

**Stock Received But Not Billed** — Accrual account in ERPNext for goods received but not yet invoiced by the supplier. Part of perpetual inventory accounting.

**Structural Works** — Major construction category covering concrete, steel, and foundational work. Often the largest cost category in TACC projects.

**Subcon / Subcontractor** — A third-party company engaged to perform specific construction works (e.g., masonry, electrical, mechanical). Contracts managed as POs tagged "Contract" in ERPNext.

**Supplier Quotation** — ERPNext document capturing a supplier's price offer in response to an RFQ. Basis for PO creation.

**Surety Bond** — A guarantee bond posted by TACC to assure contract performance. Cost breakdown item `A.2.3`.

---

## T

**TACC** — The Asian Construction Company / TERP Asia Construction Corporation. The full legal entity name for TERP's construction arm.

**Tax Category** — ERPNext field on suppliers/customers that determines applicable tax rates (VAT, EWT).

**Temporary Facilities** — Construction-period structures: site offices, manpower barracks, staff houses. Cost breakdown `A.4`. Subcategories: TACC-provided (`A.4`) and CM-provided (`A.5`).

**TERP** — Trade name for TACC / Terp Asia. Used interchangeably with TACC.

**terpasia.xurpaslabs.com** — The ERPNext production server URL. All CSR Excel files connect here for data sync.

**Towercrane** — Heavy lifting equipment at construction sites. Cost breakdown `A.11.2.1. Towercrane`. Typically a rental cost under Equipment cost type.

---

## U

**Unbilled Payable** — Liability account for costs recognized (e.g., from PO allocation rule) but not yet invoiced.

---

## V

**VAT (Value Added Tax)** — 12% tax applied to supplier invoices and customer billings in the Philippines. For customer billing: VAT applied to gross billing minus DP recoupment.

---

## W

**Warehouse Transmittal** — Form accompanying stock transfers from Central Warehouse to site. Documents what was shipped, quantity, and authorization.

**Work Package** — A discrete scope of work under a project, managed as a separate contract and tracked independently in the CSR. Example: JIL Tower has 5 work packages (Structural Pkg 1, Retrofitting Pkg 2, Retrofitting Pkg 3, Electrical, Demolition).

---

## X

**Xurpas Software / Xurpas Labs** — The technology partner implementing ERPNext for TACC. Maintains the `terp` custom Frappe app and the `terpasia.xurpaslabs.com` server.

---

## Project Quick Reference

| Code | Project | PM | Contract |
|------|---------|----|---------:|
| PROJ-0020 | GVMC Architectural Works | Godfrey Aranzaso | ₱640M |
| — | GVMC Phase I (12-15Fa) | Godfrey Aranzaso | ₱126M |
| — | GVMC Phase II (12-15Fb) | Godfrey Aranzaso | ₱101M |
| — | Tarlac Hall of Justice | Godfrey Aranzaso | ₱182M |
| — | Mantawi Residences - Cebu | Ryan Legaspi | ₱1,550M |
| — | One Tolentino East Residences | Alfhie Masinadiong | ₱499M |
| — | JIL Tower (5 packages) | Jun David | various |
| — | Woodsville Crest Residences | Jun David | various |
| — | Sierra Tower 4 | Ramel De Castro | ₱439M |
| — | Sierra Tower 1 Fit-out | Ramel De Castro | ₱98M |
| — | Dumaguete Medical City | Mark Tumpalan | ₱219M |
| — | Dumaguete Government Center | Mark Tumpalan | ₱82M |
| — | Grand Summit Pangasinan | Dolphy Esteban | ₱198M |
| — | Maribago Mercado Resort | Rowell Clarin | ₱102M |
| — | Amisa Residences (Painting) | Reymark La Guardia | ₱25M |
| — | Belfry Tower - Sacred Heart Parish | Giselle Gerardo | ₱15M |
| — | Lolo Uweng Phase 2 | Giselle Gerardo | ₱28M |
| — | Fili Bridgetown - Service Elevator | Dolphy Esteban | ₱8.8M |
