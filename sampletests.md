# Velocity Racing Engineering

A React + TypeScript web application showcasing a race car engineering team's development workflow, component registry, and engineering personnel. Built with Vite, Tailwind CSS, shadcn/ui, and Framer Motion.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling via semantic design tokens)
- **Framer Motion** (animations)
- **React Router v6** (routing)
- **shadcn/ui** (component library)

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home (Index) | Hero, application form, engineering dashboard, component registry, footer |
| `/schedule` | Development Timeline | 8 engineering milestones with phase numbers, facilities, dates, and completion status |
| `/team` | Engineering Team | 6 team member cards with names, roles, driver numbers (where applicable), and bios |
| `*` | Not Found | 404 page |

---

## Automated Test Scenarios

Below are detailed test scenarios with steps and the `data-testid` selectors needed to write automated tests (e.g. Playwright, Cypress).

---

### 1. Hero Section (`data-testid="hero-section"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 1.1 | Hero renders with engineering copy | Navigate to `/`. Verify the hero section is visible. | `hero-section`, `hero-subtitle` (text: "Engineering Excellence") |
| 1.2 | CTA buttons navigate correctly | Click "Development Timeline" button → should navigate to `/schedule`. Go back. Click "Engineering Team" → should navigate to `/team`. | `start-engine-btn` (href `/schedule`), `pit-stop-btn` (href `/team`) |
| 1.3 | Hero image loads | Verify the hero image element is visible and has a valid `src`. | `hero-section` → `img[alt="Race car engineering prototype"]` |

---

### 2. Form Section (`data-testid="form-section"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 2.1 | Form renders with all fields | Navigate to `/`. Scroll to form section. Verify name input, department select, experience slider, checkbox, and submit button are visible. | `registration-form`, `driver-input`, `team-select`, `lap-slider`, `agree-checkbox`, `submit-btn` |
| 2.2 | Submit button is disabled by default | Without filling any fields, verify submit button has `disabled` attribute. | `submit-btn` |
| 2.3 | Submit button enables when form is valid | Fill name (`driver-input`), select department (`team-select`), check agreement (`agree-checkbox`). Verify `submit-btn` is no longer disabled. | `driver-input`, `team-select`, `agree-checkbox`, `submit-btn` |
| 2.4 | Successful form submission | Fill all required fields and submit. Verify success message appears with submitted data displayed. | `success-message`, `submitted-driver`, `submitted-team`, `submitted-laps` |
| 2.5 | Experience slider updates display | Move the slider (`lap-slider`) to value 10. Verify `lap-count` text updates to "10 years". | `lap-slider`, `lap-count` |
| 2.6 | Reset after submission | Submit the form, then click "Submit Another" (`reset-btn`). Verify the form reappears empty. | `reset-btn`, `registration-form` |

---

### 3. Interactive Section — Engineering Dashboard (`data-testid="interactive-section"`)

#### 3a. Design Iteration Counter (`data-testid="counter-card"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 3a.1 | Counter starts at 0 | Verify `counter-value` text is "0". | `counter-value` |
| 3a.2 | Increment counter | Click `increment-btn` 3 times. Verify `counter-value` is "3". | `increment-btn`, `counter-value` |
| 3a.3 | Decrement counter | From value 3, click `decrement-btn` once. Verify value is "2". | `decrement-btn`, `counter-value` |
| 3a.4 | Reset counter | Click `reset-counter-btn`. Verify `counter-value` is "0". | `reset-counter-btn`, `counter-value` |

#### 3b. Active Aero Toggle (`data-testid="toggle-card"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 3b.1 | Toggle starts inactive | Verify `drs-status` text contains "Standby". | `drs-status` |
| 3b.2 | Toggle on | Click `drs-toggle`. Verify `drs-status` text contains "Engaged". | `drs-toggle`, `drs-status` |
| 3b.3 | Toggle off | Click `drs-toggle` again. Verify status reverts to "Standby". | `drs-toggle`, `drs-status` |
| 3b.4 | Toast notification | Click `toast-btn`. Verify `toast-notification` appears with diagnostic message. Wait 3 seconds, verify it disappears. | `toast-btn`, `toast-notification` |

#### 3c. Test Schedule List (`data-testid="list-card"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 3c.1 | Default items render | Verify 3 default items: "Wind Tunnel Test", "CFD Analysis", "Dyno Calibration". Check `item-count` shows "3 sessions". | `list-item-0`, `list-item-1`, `list-item-2`, `item-count` |
| 3c.2 | Add new item | Type "Crash Test" in `add-item-input`, click `add-item-btn`. Verify `list-item-3` appears, `item-count` shows "4 sessions". | `add-item-input`, `add-item-btn`, `list-item-3`, `item-count` |
| 3c.3 | Add item via Enter key | Type "Tire Test" in `add-item-input`, press Enter. Verify new item appears. | `add-item-input` |
| 3c.4 | Remove item | Click `remove-item-0`. Verify `item-count` decrements and first item changes. | `remove-item-0`, `item-count` |
| 3c.5 | Empty input does not add | Leave `add-item-input` empty, click `add-item-btn`. Verify `item-count` unchanged. | `add-item-input`, `add-item-btn`, `item-count` |

#### 3d. Performance Metrics (`data-testid="hover-card"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 3d.1 | Default hover text | Verify `hover-info` text is "Hover for details". | `hover-info` |
| 3d.2 | Hover shows detail | Hover over `telemetry-1`. Verify `hover-info` shows "Downforce: 847 kg". | `telemetry-1`, `hover-info` |
| 3d.3 | Hover another metric | Hover over `telemetry-2`. Verify `hover-info` shows "Power: 1000 HP". | `telemetry-2`, `hover-info` |
| 3d.4 | Mouse leave resets | Move mouse away from all telemetry cards. Verify `hover-info` reverts to "Hover for details". | `hover-info` |

#### 3e. Engineering Brief Modal

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 3e.1 | Open modal | Click `open-modal-btn`. Verify `modal-overlay` and `modal-content` are visible. | `open-modal-btn`, `modal-overlay`, `modal-content` |
| 3e.2 | Modal content | Verify modal contains text about "Aero package revision B3". | `modal-content` |
| 3e.3 | Close via button | Click `close-modal-btn`. Verify `modal-overlay` is removed from DOM. | `close-modal-btn` |
| 3e.4 | Close via overlay | Open modal, click on `modal-overlay` (outside content). Verify modal closes. | `modal-overlay` |

---

### 4. Component Registry Table (`data-testid="table-section"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 4.1 | Table renders 5 rows | Verify `table-row-0` through `table-row-4` are present. `table-count` shows "5 components". | `standings-table`, `table-row-0`…`table-row-4`, `table-count` |
| 4.2 | Filter by component | Type "diffuser" in `table-filter`. Verify only 1 row remains. `table-count` shows "1 components". | `table-filter`, `table-count` |
| 4.3 | Filter by subsystem | Type "Aerodynamics" in `table-filter`. Verify 2 rows remain. | `table-filter`, `table-count` |
| 4.4 | Clear filter restores all | Clear `table-filter`. Verify 5 rows. | `table-filter`, `table-count` |
| 4.5 | Sort by # | Click `sort-pos`. Verify order toggles ascending/descending. | `sort-pos`, `driver-name-0` |
| 4.6 | Sort by Weight | Click `sort-points`. Verify rows reorder by weight. | `sort-points`, `table-row-0` |
| 4.7 | Status badges | Verify `status-0` shows "Validated", `status-1` shows "Testing", `status-3` shows "In Development", `status-4` shows "Revision". | `status-0`…`status-4` |

---

### 5. Development Timeline Page (`/schedule`, `data-testid="schedule-page"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 5.1 | Page renders | Navigate to `/schedule`. Verify `schedule-page` is visible. | `schedule-page` |
| 5.2 | Title is correct | Verify `schedule-title` text is "Development Timeline". | `schedule-title` |
| 5.3 | 8 milestones render | Verify `race-0` through `race-7` are present. | `race-0`…`race-7` |
| 5.4 | Milestone names | Verify `race-name-0` is "Concept Design Review", `race-name-7` is "Homologation Sign-Off". | `race-name-0`, `race-name-7` |
| 5.5 | Status values | Verify `race-status-0` is "Completed", `race-status-3` is "Upcoming". | `race-status-0`, `race-status-3` |
| 5.6 | Navigation links | Verify `back-home-link` href is `/`, `nav-team-link` href is `/team`. | `back-home-link`, `nav-team-link` |

---

### 6. Engineering Team Page (`/team`, `data-testid="team-page"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 6.1 | Page renders | Navigate to `/team`. Verify `team-page` is visible. | `team-page` |
| 6.2 | Title is correct | Verify `team-title` text is "Engineering Team". | `team-title` |
| 6.3 | 6 members render | Verify `team-member-0` through `team-member-5` are present. | `team-member-0`…`team-member-5` |
| 6.4 | Member names | `member-name-0` → "Marcus Webb", `member-name-1` → "Sofia Chen". | `member-name-0`, `member-name-1` |
| 6.5 | Member roles | `member-role-0` → "Lead Driver", `member-role-2` → "Technical Director". | `member-role-0`, `member-role-2` |
| 6.6 | Driver numbers | `member-number-0` → "#07", `member-number-1` → "#22". `member-number-2` should NOT exist (non-driver). | `member-number-0`, `member-number-1`, `member-number-2` |
| 6.7 | Bios | `member-bio-0` should contain "Three-time champion". | `member-bio-0` |
| 6.8 | Navigation links | `back-home-link` → `/`, `nav-schedule-link` → `/schedule`. | `back-home-link`, `nav-schedule-link` |

---

### 7. Footer (`data-testid="footer"`)

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 7.1 | Footer renders | Scroll to bottom of `/`. Verify `footer` is visible with "Velocity Racing Engineering" text. | `footer` |

---

### 8. Routing & 404

| # | Scenario | Steps | Key Selectors |
|---|----------|-------|----------------|
| 8.1 | Home route | Navigate to `/`. Verify `hero-section` is visible. | `hero-section` |
| 8.2 | Schedule route | Navigate to `/schedule`. Verify `schedule-page`. | `schedule-page` |
| 8.3 | Team route | Navigate to `/team`. Verify `team-page`. | `team-page` |
| 8.4 | 404 page | Navigate to `/nonexistent`. Verify 404 content renders. | — |

---

## Running the App

```sh
npm install
npm run dev
```

## Building for Production

```sh
npm run build
```
