## 1. Audit and Baseline

- [x] 1.1 Review `docs/design-guidelines.md`, `styles/variables.wxss`, and current affected page styles to identify inconsistent colors, spacing, radii, shadows, typography, and safe-area handling.
- [x] 1.2 Capture the current visual structure of role entry, elder home, elder medication, elder reminder, caregiver overview, caregiver detail, binding, and add-medication pages for comparison.

## 2. Shared Style Foundations

- [x] 2.1 Normalize global page background, shared typography defaults, safe-area spacing, and reusable layout helpers without changing page routes or business logic.
- [x] 2.2 Polish shared components such as bottom navigation, medication cards, dose buttons, trend charts, and icon wrappers so they align with the documented token system.
- [x] 2.3 Replace practical one-off hardcoded style values with existing CSS variables or consistent local patterns where WeChat Mini Program styling supports them.

## 3. Elder-Facing Pages

- [x] 3.1 Refresh elder home medication, encouragement, all-done, pending, taken, and blood-pressure sections so the next important action is visually dominant.
- [x] 3.2 Improve elder medication, photo-add, blood-pressure record, success, and reminder flows for large readable text, strong primary actions, clear disabled states, and comfortable tap targets.
- [x] 3.3 Verify long medication names, dosage notes, status labels, and health values wrap or reflow without overlap on elder-facing screens.

## 4. Caregiver-Facing Pages

- [x] 4.1 Refresh caregiver overview cards and alerts so abnormal medication and blood-pressure states stand out from normal summaries.
- [x] 4.2 Refresh caregiver detail sections for consistent notification, progress, medication status, trend, and management card treatments.
- [x] 4.3 Refresh binding and add-medication forms so labels, inputs, helper text, required fields, and primary actions are consistently aligned and spaced.

## 5. Verification

- [x] 5.1 Run available project validation or smoke checks and confirm the style refresh introduces no new runtime dependencies.
- [x] 5.2 Manually verify affected pages for visual consistency, text readability, safe-area padding, tappable controls, and unchanged navigation/action behavior.
- [x] 5.3 Compare the implementation against `specs/page-visual-polish/spec.md` and mark any remaining gaps before completion.
