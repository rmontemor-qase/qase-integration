# Test Track Express

A React + TypeScript web application (hosted demo: **Test Track Express**) showcasing a race car engineering team's development workflow, component registry, and engineering personnel. Built with Vite, Tailwind CSS, shadcn/ui, and Framer Motion.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling via semantic design tokens)
- **Framer Motion** (animations)
- **React Router v6** (routing)
- **shadcn/ui** (component library)

---

## Pages & Routes

| Route | Page | Component | Description |
|-------|------|-----------|-------------|
| `/` | Home | `Index` | Hero section with nav bar, engineering dashboard, component registry, footer (registration: `/form`) |
| `/login` | Login | `Login` | Sign-in form with dummy credentials |
| `/form` | Expo Registration | `AutomationForm` | Motorsport Engineering Expo registration form (8 text fields) |
| `/schedule` | Development Timeline | `Schedule` | 8 engineering milestones with phase numbers, facilities, dates, and completion status |
| `/team` | Engineering Team | `Team` | 6 team member cards with names, roles, driver numbers, and bios |
| `*` | Not Found | `NotFound` | 404 page |

---

## Authentication (Client-Side)

The app uses an **optional** client-side login flow with hardcoded dummy credentials stored in `AuthContext`. No backend is required. Login state is persisted in `localStorage` (`auth`, `auth_user` keys).

### Dummy Accounts

| Username | Password |
|----------|----------|
| `admin` | `password123` |
| `engineer` | `test456` |
| `testuser` | `qwerty` |

---

## Test Automation Guide

All interactive elements use `data-testid` attributes for reliable selector targeting. Below is an exhaustive reference of every testable scenario, organized by page and section.

---

### 0. Login Flow

**URL:** `/login`  
**Page container:** `data-testid="login-page"`

#### Elements

| Selector | Element | Type | Description |
|----------|---------|------|-------------|
| `login-page` | Page wrapper | `div` | Confirms login page is loaded |
| `login-form` | Form | `form` | Contains username, password, and submit |
| `username-input` | Username field | `input[type="text"]` | Required. Placeholder: "Enter username" |
| `password-input` | Password field | `input[type="password"]` | Required. Placeholder: "Enter password" |
| `login-btn` | Submit button | `button[type="submit"]` | Text: "Sign In" |
| `login-error` | Error message | `div` | Appears on invalid credentials. Text: "Invalid credentials. Try admin / password123" |
| `skip-login-btn` | Skip button | `button` | Text: "Skip login →". Navigates to `/` |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 0.1 | Successful login | Navigate to `/login`. Fill `username-input` with `admin`, `password-input` with `password123`. Click `login-btn`. | Redirects to `/`. `logged-in-user` displays "admin". |
| 0.2 | Failed login | Navigate to `/login`. Fill `username-input` with `wrong`, `password-input` with `wrong`. Click `login-btn`. | `login-error` appears with error text. |
| 0.3 | Skip login | Navigate to `/login`. Click `skip-login-btn`. | Redirects to `/`. |
| 0.4 | Logout | Login successfully, then on `/` click `logout-btn`. | `nav-login-btn` appears. `logged-in-user` and `logout-btn` disappear. |
| 0.5 | Nav bar auth state | Visit `/` without login. | `nav-login-btn` is visible. After login: `logged-in-user` and `logout-btn` are visible instead. |

---

### 0.6 Motorsport Engineering Expo Registration

**URL:** `/form`  
**Page container:** `data-testid="automation-form-page"`

#### Elements

| Selector | Element | Type | Label | Placeholder |
|----------|---------|------|-------|-------------|
| `automation-form-page` | Page wrapper | `div` | — | — |
| `automation-form` | Form | `form` | — | — |
| `back-home-btn` | Back button | `button` | — | Text: "← Back to Home" |
| `first-name-input` | First Name | `input[type="text"]` | First Name | "Alex" |
| `last-name-input` | Last Name | `input[type="text"]` | Last Name | "Rivera" |
| `email-input` | Work Email | `input[type="email"]` | Work Email | "alex.rivera@motorsport.com" |
| `phone-input` | Phone | `input[type="tel"]` | Phone | "+1 (555) 123-4567" |
| `address-input` | Company / Organization | `input[type="text"]` | Company / Organization | "Velocity Racing Engineering" |
| `city-input` | City | `input[type="text"]` | City | "Stuttgart" |
| `state-input` | Country | `input[type="text"]` | Country | "Germany" |
| `zip-input` | Badge ID / Employee # | `input[type="text"]` | Badge ID / Employee # | "ENG-0042" |
| `submit-form-btn` | Submit | `button[type="submit"]` | — | Text: "Register" |
| `clear-form-btn` | Clear | `button[type="button"]` | — | Text: "Clear" |
| `form-success` | Success container | `div` | — | Shown after submission |
| `submitted-firstName` | Submitted first name | `p` | — | Shows entered first name |
| `submitted-lastName` | Submitted last name | `p` | — | Shows entered last name |
| `submitted-email` | Submitted email | `p` | — | Shows entered email |
| `submitted-phone` | Submitted phone | `p` | — | Shows entered phone |
| `submitted-address` | Submitted address | `p` | — | Shows entered company |
| `submitted-city` | Submitted city | `p` | — | Shows entered city |
| `submitted-state` | Submitted country | `p` | — | Shows entered country |
| `submitted-zipCode` | Submitted badge ID | `p` | — | Shows entered badge ID |
| `reset-form-btn` | Reset button | `button` | — | Text: "Register Another Attendee" |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 0.6.1 | Fill and submit | Navigate to `/form`. Fill all 8 fields with valid data. Click `submit-form-btn`. | `form-success` appears. `submitted-firstName` shows the entered first name. All submitted values are displayed. |
| 0.6.2 | Clear form | Fill some fields. Click `clear-form-btn`. | All 8 input fields are cleared to empty strings. |
| 0.6.3 | Submit another | After successful submission, click `reset-form-btn`. | Form reappears (`automation-form` visible) with all fields empty. |
| 0.6.4 | Back navigation | Click `back-home-btn`. | Redirects to `/`. |
| 0.6.5 | All fields required | Leave any field empty, click `submit-form-btn`. | Browser native validation prevents submission (all fields have `required`). |

---

### 1. Hero Section

**URL:** `/`  
**Section container:** `data-testid="hero-section"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `hero-section` | Section wrapper | Main hero area |
| `hero-subtitle` | Subtitle text | Text: "Engineering Excellence" |
| `nav-bar` | Navigation bar | Top nav with links and auth controls; brand text **Test Track Express** |
| `nav-form-link` | Expo link | Link to `/form`, text: "Expo" |
| `nav-login-btn` | Sign In button | Link to `/login`, visible when logged out |
| `logged-in-user` | User display | Text: "Signed in as {username}", visible when logged in |
| `logout-btn` | Sign Out button | Visible when logged in |
| `start-engine-btn` | CTA button | Link to `/schedule`, text: "Development Timeline" |
| `pit-stop-btn` | CTA button | Link to `/team`, text: "Engineering Team" |
| Hero image | `img` | `alt="Race car engineering prototype"` |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 1.1 | Hero renders | Navigate to `/`. | `hero-section`, `nav-bar` contains "Test Track Express", and `hero-subtitle` ("Engineering Excellence") are visible. |
| 1.2 | CTA navigation | Click `start-engine-btn`. | Navigates to `/schedule`. Go back. Click `pit-stop-btn` → navigates to `/team`. |
| 1.3 | Hero image loads | Check hero image element. | Image is visible with valid `src` attribute. |
| 1.4 | Nav links | Check `nav-bar` links. | Contains links to Timeline, Team, and Expo. Click `nav-form-link` → navigates to `/form`. |

---

### 2. Home Page Layout (no inline application form)

The **inline application / registration form was removed** from `/`. Multi-field registration lives only on **`/form`** (Motorsport Engineering Expo — see §0.6).

On `/`, after the hero, the home page continues with the **Engineering Dashboard** (§3) and **Component Registry** (§4).

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 2.1 | Engineering Dashboard visible | Navigate to `/`. Scroll to `interactive-section`. | Visible heading **"Engineering Dashboard"**, `counter-card`, `toggle-card`, `list-card` present. |
| 2.2 | Component registry visible | Scroll to `table-section`. | `standings-table`, `table-row-0`–`table-row-4`, `table-count` shows **"5 components"**. |
| 2.3 | Default test sessions | On `interactive-section`, check list card. | `list-item-0`–`2` default labels, `item-count` shows **"3 sessions"**. |

---

### 3. Engineering Dashboard (Interactive Section)

**URL:** `/` (scroll to interactive section)  
**Section container:** `data-testid="interactive-section"`  
**Section heading (visible):** "Engineering Dashboard"

---

#### 3a. Design Iteration Counter

**Card container:** `data-testid="counter-card"`

| Selector | Element | Description |
|----------|---------|-------------|
| `counter-value` | Counter display | Default: "0" |
| `increment-btn` | "+" button | Increments counter by 1 |
| `decrement-btn` | "−" button | Decrements counter by 1 |
| `reset-counter-btn` | Reset button | Resets counter to 0 |

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3a.1 | Starts at 0 | Load page. | `counter-value` text is "0". |
| 3a.2 | Increment | Click `increment-btn` 3 times. | `counter-value` is "3". |
| 3a.3 | Decrement | From 3, click `decrement-btn` once. | `counter-value` is "2". |
| 3a.4 | Reset | Click `reset-counter-btn`. | `counter-value` is "0". |

---

#### 3b. Active Aero Toggle

**Card container:** `data-testid="toggle-card"`

| Selector | Element | Description |
|----------|---------|-------------|
| `drs-toggle` | Toggle switch | Toggles active aero on/off |
| `drs-status` | Status text | "Active Aero Standby" or "Active Aero Engaged" |
| `toast-btn` | Diagnostic button | Text: "Run Diagnostic". Triggers toast |
| `toast-notification` | Toast message | Text: "All systems nominal — diagnostics passed." Auto-dismisses after 3 seconds. |

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3b.1 | Starts inactive | Load page. | `drs-status` contains "Standby". |
| 3b.2 | Toggle on | Click `drs-toggle`. | `drs-status` contains "Engaged". |
| 3b.3 | Toggle off | Click `drs-toggle` again. | `drs-status` reverts to "Standby". |
| 3b.4 | Toast notification | Click `toast-btn`. | `toast-notification` appears. Wait 3s → it disappears. |

---

#### 3c. Test Schedule List

**Card container:** `data-testid="list-card"`

| Selector | Element | Description |
|----------|---------|-------------|
| `add-item-input` | Text input | Placeholder: "Add test session..." |
| `add-item-btn` | Add button | Adds item from input |
| `list-item-{n}` | List item | Zero-indexed. Default items: "Wind Tunnel Test" (0), "CFD Analysis" (1), "Dyno Calibration" (2) |
| `remove-item-{n}` | Remove button | "✕" button on each list item |
| `item-count` | Count display | Text: "{n} sessions" |

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3c.1 | Default items | Load page. | 3 items present: `list-item-0` ("Wind Tunnel Test"), `list-item-1` ("CFD Analysis"), `list-item-2` ("Dyno Calibration"). `item-count` shows "3 sessions". |
| 3c.2 | Add item | Type "Crash Test" in `add-item-input`, click `add-item-btn`. | `list-item-3` appears with "Crash Test". `item-count` shows "4 sessions". |
| 3c.3 | Add via Enter | Type "Tire Test" in `add-item-input`, press Enter. | New item appears in list. |
| 3c.4 | Remove item | Click `remove-item-0`. | `item-count` decrements. First item changes to what was previously second. |
| 3c.5 | Empty input | Leave `add-item-input` empty, click `add-item-btn`. | `item-count` unchanged. No item added. |

---

#### 3d. Performance Metrics (Hover Cards)

**Card container:** `data-testid="hover-card"`

| Selector | Element | Description |
|----------|---------|-------------|
| `telemetry-1` | Downforce card | Hover shows "Downforce: 847 kg" |
| `telemetry-2` | Power card | Hover shows "Power: 1000 HP" |
| `telemetry-3` | Weight card | Hover shows "Weight: 798 kg" |
| `hover-info` | Info display | Default: "Hover for details". Updates on hover. |

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3d.1 | Default text | Load page. | `hover-info` text is "Hover for details". |
| 3d.2 | Hover downforce | Hover over `telemetry-1`. | `hover-info` shows "Downforce: 847 kg". |
| 3d.3 | Hover power | Hover over `telemetry-2`. | `hover-info` shows "Power: 1000 HP". |
| 3d.4 | Hover weight | Hover over `telemetry-3`. | `hover-info` shows "Weight: 798 kg". |
| 3d.5 | Mouse leave | Move mouse away from all telemetry cards. | `hover-info` reverts to "Hover for details". |

---

#### 3e. Engineering Brief Modal

| Selector | Element | Description |
|----------|---------|-------------|
| `open-modal-btn` | Open button | Text: "Engineering Brief" |
| `modal-overlay` | Overlay backdrop | Clicking it closes the modal |
| `modal-content` | Modal body | Contains engineering update text about "Aero package revision B3" |
| `close-modal-btn` | Close button | Text: "Acknowledged" |

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3e.1 | Open modal | Click `open-modal-btn`. | `modal-overlay` and `modal-content` are visible. |
| 3e.2 | Modal content | Read modal text. | Contains "Aero package revision B3". |
| 3e.3 | Close via button | Click `close-modal-btn`. | `modal-overlay` removed from DOM. |
| 3e.4 | Close via overlay | Open modal, click `modal-overlay` (outside `modal-content`). | Modal closes. |

---

### 4. Component Registry Table

**URL:** `/` (scroll to table section)  
**Section container:** `data-testid="table-section"`

#### Table Data (5 rows)

| # | Component | Subsystem | Weight (kg) | Status |
|---|-----------|-----------|-------------|--------|
| 1 | Front Wing Assembly | Aerodynamics | 12.4 | Validated |
| 2 | Rear Diffuser v3 | Aerodynamics | 8.7 | Testing |
| 3 | Carbon Monocoque | Chassis | 42.1 | Validated |
| 4 | Hybrid Power Unit | Powertrain | 150.0 | In Development |
| 5 | Pushrod Suspension | Suspension | 18.3 | Revision |

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `standings-table` | Table | Main table element |
| `table-filter` | Filter input | Placeholder: "Search component or subsystem..." |
| `table-count` | Count display | Text: "{n} components" |
| `sort-pos` | Sort by # header | Toggles ascending/descending sort by position |
| `sort-points` | Sort by Weight header | Toggles ascending/descending sort by weight |
| `table-row-{n}` | Table row | Zero-indexed row in current sort/filter |
| `driver-name-{n}` | Component name cell | Zero-indexed |
| `status-{n}` | Status badge | Zero-indexed. Values: "Validated", "Testing", "In Development", "Revision" |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 4.1 | Table renders | Load page, scroll to table. | `table-row-0` through `table-row-4` present. `table-count` shows "5 components". |
| 4.2 | Filter by component | Type "diffuser" in `table-filter`. | 1 row remains. `table-count` shows "1 components". |
| 4.3 | Filter by subsystem | Type "Aerodynamics" in `table-filter`. | 2 rows remain. `table-count` shows "2 components". |
| 4.4 | Clear filter | Clear `table-filter`. | 5 rows restored. |
| 4.5 | Sort by # | Click `sort-pos`. | Rows reorder by position (toggles asc/desc). |
| 4.6 | Sort by Weight | Click `sort-points`. | Rows reorder by weight (toggles asc/desc). |
| 4.7 | Status badges | Check badge values. | `status-0`: "Validated", `status-1`: "Testing", `status-3`: "In Development", `status-4`: "Revision". |

---

### 5. Development Timeline Page

**URL:** `/schedule`  
**Page container:** `data-testid="schedule-page"`

#### Milestone Data (8 items)

| Phase | Name | Facility | Date | Status |
|-------|------|----------|------|--------|
| 01 | Concept Design Review | Wind Tunnel Lab A | Jan 15 | Completed |
| 02 | CFD Simulation Batch | HPC Cluster | Feb 5 | Completed |
| 03 | Monocoque Layup | Composites Workshop | Mar 1 | Completed |
| 04 | Powertrain Integration | Dyno Cell 3 | Apr 10 | Upcoming |
| 05 | Suspension Rig Testing | Seven-Post Rig | May 2 | Upcoming |
| 06 | Full Car Assembly | Build Bay 1 | Jun 8 | Upcoming |
| 07 | Shakedown Run | Private Test Circuit | Jul 14 | Upcoming |
| 08 | Homologation Sign-Off | FIA Technical Dept. | Aug 1 | Upcoming |

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `schedule-page` | Page wrapper | Confirms page loaded |
| `schedule-title` | Page title | Text: "Development Timeline" |
| `schedule-nav` | Nav bar | Contains back and team links |
| `back-home-link` | Back link | Href: `/` |
| `nav-team-link` | Team link | Href: `/team` |
| `race-{n}` | Milestone row | Zero-indexed (0–7) |
| `race-round-{n}` | Phase number | Padded: "01"–"08" |
| `race-name-{n}` | Milestone name | e.g. "Concept Design Review" |
| `race-date-{n}` | Date | e.g. "Jan 15" |
| `race-status-{n}` | Status badge | "Completed" or "Upcoming" |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 5.1 | Page renders | Navigate to `/schedule`. | `schedule-page` is visible. |
| 5.2 | Title | Check `schedule-title`. | Text is "Development Timeline". |
| 5.3 | 8 milestones | Check row elements. | `race-0` through `race-7` are present. |
| 5.4 | Milestone names | Check first and last. | `race-name-0`: "Concept Design Review". `race-name-7`: "Homologation Sign-Off". |
| 5.5 | Status values | Check status badges. | `race-status-0`: "Completed". `race-status-3`: "Upcoming". |
| 5.6 | Navigation | Check links. | `back-home-link` → `/`. `nav-team-link` → `/team`. |

---

### 6. Engineering Team Page

**URL:** `/team`  
**Page container:** `data-testid="team-page"`

#### Team Data (6 members)

| Index | Name | Role | Number | Bio (contains) |
|-------|------|------|--------|-----------------|
| 0 | Marcus Webb | Lead Driver | #07 | "Three-time champion" |
| 1 | Sofia Chen | Test Driver | #22 | "Development driver" |
| 2 | James Thornton | Technical Director | — | "Former aerodynamicist" |
| 3 | Dr. Aisha Patel | Chief Aerodynamicist | — | "computational fluid dynamics" |
| 4 | Luca Moretti | Head of Powertrain | — | "hybrid power unit" |
| 5 | Yuki Tanaka | Head of Vehicle Dynamics | — | "suspension kinematics" |

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `team-page` | Page wrapper | Confirms page loaded |
| `team-title` | Page title | Text: "Engineering Team" |
| `team-nav` | Nav bar | Contains back and schedule links |
| `back-home-link` | Back link | Href: `/` |
| `nav-schedule-link` | Schedule link | Href: `/schedule` |
| `team-member-{n}` | Member card | Zero-indexed (0–5) |
| `member-name-{n}` | Member name | e.g. "Marcus Webb" |
| `member-role-{n}` | Member role | e.g. "Lead Driver" |
| `member-number-{n}` | Driver number | Only exists for indices 0 (`#07`) and 1 (`#22`). Does NOT exist for indices 2–5. |
| `member-bio-{n}` | Member bio | Full bio text |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 6.1 | Page renders | Navigate to `/team`. | `team-page` is visible. |
| 6.2 | Title | Check `team-title`. | Text is "Engineering Team". |
| 6.3 | 6 members | Check card elements. | `team-member-0` through `team-member-5` present. |
| 6.4 | Member names | Check names. | `member-name-0`: "Marcus Webb". `member-name-1`: "Sofia Chen". |
| 6.5 | Member roles | Check roles. | `member-role-0`: "Lead Driver". `member-role-2`: "Technical Director". |
| 6.6 | Driver numbers | Check number badges. | `member-number-0`: "#07". `member-number-1`: "#22". `member-number-2` should NOT exist. |
| 6.7 | Bios | Check bio content. | `member-bio-0` contains "Three-time champion". |
| 6.8 | Navigation | Check links. | `back-home-link` → `/`. `nav-schedule-link` → `/schedule`. |

---

### 7. Footer

**URL:** `/` (bottom of page)  
**Container:** `data-testid="footer"`

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 7.1 | Footer renders | Scroll to bottom of `/`. | `footer` is visible. Contains copyright line: **"© All rights reserved."** |

---

### 8. Routing & 404

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 8.1 | Home | Navigate to `/`. | `hero-section` is visible. |
| 8.2 | Login | Navigate to `/login`. | `login-page` is visible. |
| 8.3 | Form | Navigate to `/form`. | `automation-form-page` is visible. |
| 8.4 | Schedule | Navigate to `/schedule`. | `schedule-page` is visible. |
| 8.5 | Team | Navigate to `/team`. | `team-page` is visible. |
| 8.6 | 404 | Navigate to `/nonexistent`. | 404 content renders. |

---

## Quick Selector Reference

All `data-testid` values across the app, grouped by page:

### `/login`
`login-page`, `login-form`, `username-input`, `password-input`, `login-btn`, `login-error`, `skip-login-btn`

### `/form`
`automation-form-page`, `automation-form`, `back-home-btn`, `first-name-input`, `last-name-input`, `email-input`, `phone-input`, `address-input`, `city-input`, `state-input`, `zip-input`, `submit-form-btn`, `clear-form-btn`, `form-success`, `submitted-firstName`, `submitted-lastName`, `submitted-email`, `submitted-phone`, `submitted-address`, `submitted-city`, `submitted-state`, `submitted-zipCode`, `reset-form-btn`

### `/` (Home)
`hero-section`, `hero-subtitle`, `nav-bar`, `nav-form-link`, `nav-login-btn`, `logged-in-user`, `logout-btn`, `start-engine-btn`, `pit-stop-btn`, `interactive-section`, `counter-card`, `counter-value`, `increment-btn`, `decrement-btn`, `reset-counter-btn`, `toggle-card`, `drs-toggle`, `drs-status`, `toast-btn`, `toast-notification`, `list-card`, `add-item-input`, `add-item-btn`, `list-item-{n}`, `remove-item-{n}`, `item-count`, `hover-card`, `telemetry-1`, `telemetry-2`, `telemetry-3`, `hover-info`, `open-modal-btn`, `modal-overlay`, `modal-content`, `close-modal-btn`, `table-section`, `standings-table`, `table-filter`, `table-count`, `sort-pos`, `sort-points`, `table-row-{n}`, `driver-name-{n}`, `status-{n}`, `footer`

### `/schedule`
`schedule-page`, `schedule-nav`, `schedule-title`, `back-home-link`, `nav-team-link`, `race-{n}`, `race-round-{n}`, `race-name-{n}`, `race-date-{n}`, `race-status-{n}`

### `/team`
`team-page`, `team-nav`, `team-title`, `back-home-link`, `nav-schedule-link`, `team-member-{n}`, `member-name-{n}`, `member-role-{n}`, `member-number-{n}`, `member-bio-{n}`

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
