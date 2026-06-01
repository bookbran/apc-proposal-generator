# APC Proposal Generator

Reference library for **A Portland Career** organizational proposals, service agreements, and employee-facing documents. Use these files when preparing future invoices and client packages for universities, employers, and other organizations.

This repo is not a deployed application. It is a collection of print-ready HTML templates, completed client examples, and supporting assets that define APC's standard structure, design, payment terms, legal language, and signature workflow.

---

## How to use this repo

When starting a new client engagement:

1. **Copy the relevant templates** (`*_template.html`) and rename for the client (e.g. `acme_service_agreement.html`).
2. **Search and replace placeholders** such as `[Client Name]`, `[Hours per Employee]`, `[Rate per Hour]`, and `[Maximum Investment]`.
3. **Reference a completed example** (Lewis & Clark, Micron Laser) for finalized wording, payment terms, and pricing presentation.
4. **Open the HTML file in a browser**, review layout, then print or export to PDF (service agreements include a built-in PDF download button).

---

## Document types

### Templates (starting point for new clients)

| File | Purpose |
|------|---------|
| `service_agreement_template.html` | Legal service agreement with engagement terms, billing, eligibility, refunds, reporting, confidentiality, termination, and dual signature blocks |
| `career_coaching_package_template.html` | Multi-page strategic outplacement proposal with pricing tiers, services, process timeline, and next steps |
| `employee_welcome_guide_template.html` | Employee onboarding guide explaining how to access coaching and what to expect |

### Completed client examples

| File | Purpose |
|------|---------|
| `lewis_clark_service_agreement.html` | Signed-ready service agreement for Lewis & Clark College — includes full payment terms (14-day due, ACH/check, late fees) |
| `APC_Lewis_Clark_Service_Agreement.pdf` | Exported PDF of the Lewis & Clark agreement |
| `career_coaching_package.html` | Completed proposal with confirmed pricing ($2,700/employee, 15 hours, max $40,500 for 15 staff) |
| `employee_welcome_guide.html` | Completed employee welcome guide |
| `micron_laser_career_coaching_package.html` | Proposal customized for Micron Laser |
| `micron_laser_employee_welcome_guide.html` | Employee welcome guide customized for Micron Laser |

### Employee-facing materials

| File | Purpose |
|------|---------|
| `career_explorer_journey.html` | Landscape visual of the career exploration journey (phases, milestones) — print-ready at 11×8.5 in |

### Assets

| File | Purpose |
|------|---------|
| `dansig.PNG` | Dan Hahn signature image for documents |

---

## What to reference for each concern

### Structure & layout

- **Proposals** follow a multi-page letter-size (8.5×11 in) format with page numbers, executive summary, credentials, process timeline, investment/pricing, services list, guarantee/terms, and contact footer.
- **Service agreements** use a two-page legal format with numbered clauses and a signature page.
- **Employee guides** use a friendly, instructional layout with clear sections for getting started.
- **Career journey** uses landscape (11×8.5 in) for a visual roadmap.

See `career_coaching_package_template.html` for proposal structure and `service_agreement_template.html` for agreement structure.

### Design & branding

All documents share a consistent APC visual system:

- **Navy:** `#16163f`
- **Accent blue:** `#2DA3CB`
- **Typography:** Georgia (headings) + system UI sans-serif (body)
- **Top accent bar:** Navy-to-blue gradient stripe on every page
- **Logo:** APC logo from aportlandcareer.com (with SVG fallback)

Copy CSS variables from any template's `:root` block when creating new documents.

### Payment terms & invoicing

Standard language lives in two places:

1. **Proposal — Investment Summary** (`career_coaching_package.html`, `career_coaching_package_template.html`): per-employee pricing, maximum cohort investment, "invoiced upon completion of initial strategy session," pay-only-for-active-engagement, prorated refunds for unused hours.
2. **Service Agreement — Section 4: Billing & Invoicing** (`service_agreement_template.html`, `lewis_clark_service_agreement.html`): invoice trigger (after intake/strategy session), payment due window, accepted methods (ACH preferred, check), and late-fee policy.

The Lewis & Clark agreement is the most complete reference for finalized payment terms:

- $2,700 per employee upon initial strategy session completion
- Payment due within 14 days of invoice date
- ACH (preferred) or check
- 1.5% monthly late fee after 30 days unpaid

### Engagement terms

Key terms to keep consistent across proposal and agreement:

- **Hours per participant** — individual cap, no pooling across cohort
- **Intake deadline** — days from separation date to complete intake (e.g. 60 days)
- **Usage window** — months from intake to use allocated hours (e.g. 9 months)
- **Refund policy** — prorated refund at per-hour rate for unused hours after window closes
- **Reporting** — monthly usage reports to client (hours used/remaining, engagement status)
- **Confidentiality** — coaching content stays private; reports show hours only

See Section 3 (Engagement Terms) and Sections 5–8 in `service_agreement_template.html`.

### Services agreement & legal clauses

`service_agreement_template.html` defines the full clause set:

1. Parties & scope of services
2. Services provided (checklist)
3. Engagement terms (hours, rate, max participants, max investment)
4. Billing & invoicing
5. Eligibility & timeline
6. Unused hours & refund policy
7. Reporting
8. Confidentiality
9. Term & termination

Use `lewis_clark_service_agreement.html` as the filled-in reference for tone and specificity.

### Signatures

`service_agreement_template.html` and `lewis_clark_service_agreement.html` include:

- Dual signature blocks (Client + A Portland Career)
- Canvas-based draw-to-sign pads with clear/reset
- Printed name, title, and date fields
- **Download Signed Agreement as PDF** button (html2canvas + jsPDF)

Provider defaults: Dan Hahn, CEO & Founder. Client fields use placeholders to customize per organization.

---

## Creating a new client package

Typical deliverable set for an organizational engagement:

```
1. career_coaching_package_[client].html   ← proposal / invoice reference
2. service_agreement_[client].html         ← contract for signatures
3. employee_welcome_guide_[client].html    ← handout for departing staff
4. career_explorer_journey.html            ← optional journey visual (reuse as-is)
```

Workflow:

1. Duplicate the three templates.
2. Fill client-specific names, headcount, rates, and dates.
3. Align proposal pricing with service agreement Section 3 and 4.
4. Send proposal first; upon acceptance, send service agreement for signature.
5. Distribute employee welcome guide when program launches.

---

## Viewing & exporting

Open any `.html` file directly in a browser (Chrome or Edge recommended).

- **Print to PDF:** Browser menu → Print → Save as PDF. Use `@page` sizes already defined in each file.
- **Service agreements:** Use the on-page **Download Signed Agreement as PDF** button after both parties sign.

---

## File inventory (other)

| File | Notes |
|------|-------|
| `bmad_course_outline_cohort2.html` | APC AI Course cohort outline — separate from outplacement proposals |
| `APC AI Course - Cohort 2 docs.md` | Internal course session documentation |
| `index.html`, `script.js`, `style.css` | Unrelated todo app prototype — not part of the proposal workflow |

---

## Contact

**A Portland Career** — [aportlandcareer.com](https://www.aportlandcareer.com)

For questions about document content or client terms, contact Dan Hahn.
