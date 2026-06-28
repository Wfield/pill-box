## ADDED Requirements

### Requirement: Shared visual system alignment
The miniapp SHALL use the existing project design tokens and documented visual guidelines as the baseline for page backgrounds, card surfaces, typography, spacing, radii, borders, shadows, and semantic colors.

#### Scenario: Pages use consistent visual foundations
- **WHEN** a user opens any role entry, elder, caregiver, medication, reminder, binding, or blood-pressure page
- **THEN** the page MUST present backgrounds, cards, text hierarchy, and controls that are visually consistent with the project token system and design guidelines

#### Scenario: Semantic colors remain distinguishable
- **WHEN** the UI presents primary actions, successful states, missed medication, abnormal health readings, warnings, and secondary information
- **THEN** the UI MUST use clearly distinguishable semantic treatments instead of relying on the same accent color for every state

### Requirement: Elder-facing readability and touch comfort
Elder-facing pages SHALL prioritize large readable text, clear current-task hierarchy, comfortable touch targets, and unambiguous medication or blood-pressure status feedback.

#### Scenario: Elder home emphasizes the next important action
- **WHEN** an elder opens the home page with missed medication, an upcoming medication, encouragement, taken medication, or all-done content
- **THEN** the most urgent medication state MUST be visually prominent and secondary content MUST remain readable without competing with the primary task

#### Scenario: Elder controls are comfortable to tap
- **WHEN** an elder interacts with key controls such as take-medication, reminder, blood-pressure record, camera, save, and bottom navigation actions
- **THEN** each key control MUST have a large visible target, clear pressed or disabled state, and sufficient spacing from neighboring controls

#### Scenario: Elder text does not become cramped
- **WHEN** medication names, dosage notes, status labels, blood-pressure values, or record details are longer than the common mock data
- **THEN** the layout MUST wrap, truncate, or reflow text without overlap or unreadably compressed content

### Requirement: Caregiver-facing scanability
Caregiver-facing pages SHALL make abnormal states, family member summaries, medication progress, blood-pressure values, and management actions easy to compare at a glance.

#### Scenario: Caregiver overview highlights exceptions
- **WHEN** a caregiver opens the overview page and at least one elder has missed medication, an alert, abnormal blood pressure, or low medication progress
- **THEN** exception states MUST stand out from normal summaries through status color, iconography, spacing, and card hierarchy

#### Scenario: Caregiver detail groups related content
- **WHEN** a caregiver opens an elder detail page
- **THEN** notifications, medication progress, medication status, blood-pressure trends, and management actions MUST be grouped with consistent card and section treatments

#### Scenario: Caregiver forms remain orderly
- **WHEN** a caregiver uses binding or add-medication forms
- **THEN** labels, inputs, helper text, required fields, and primary actions MUST maintain consistent spacing, alignment, and visual feedback

### Requirement: Navigation and fixed action safe areas
The miniapp SHALL preserve safe-area aware spacing for bottom navigation, fixed action bars, and full-screen flows so content and controls remain visible on devices with different screen insets.

#### Scenario: Bottom navigation does not cover content
- **WHEN** a page uses the shared bottom navigation or fixed bottom action area
- **THEN** scrollable content MUST include enough bottom padding for the navigation or action area and the device safe area

#### Scenario: Full-screen flows preserve clear exits
- **WHEN** a user opens reminder, camera, success, or similar full-screen flows
- **THEN** the primary action, secondary action, and exit affordance MUST remain visible, legible, and visually consistent with the rest of the miniapp

### Requirement: Non-functional style refresh
The style optimization SHALL preserve existing user flows, route structure, mock data usage, component events, and business behavior.

#### Scenario: Visual polish does not change behavior
- **WHEN** the style refresh is implemented
- **THEN** existing navigation, medication actions, blood-pressure record actions, binding actions, add-medication actions, and component events MUST continue to work as before

#### Scenario: No new runtime dependencies are required
- **WHEN** the style refresh is implemented
- **THEN** the project MUST NOT require new runtime packages or external services solely for the visual update
