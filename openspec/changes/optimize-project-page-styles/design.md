## Context

This WeChat miniapp serves two roles: elders who need direct, low-friction medication and blood-pressure workflows, and family caregivers who need compact monitoring and follow-up controls. The current implementation already defines shared design guidance in `docs/design-guidelines.md`, global tokens in `styles/variables.wxss`, and reusable components for icons, navigation, medication cards, dose actions, and trends.

The style refresh should improve page quality without changing routes, mock data, component APIs, or business logic. Most implementation work should remain in `.wxss` files, with WXML edits only where a page needs a small structural wrapper, state label, or class hook to support a clearer visual hierarchy.

## Goals / Non-Goals

**Goals:**
- Make all project pages feel like one product by aligning backgrounds, headers, cards, badges, spacing, shadows, and button treatments with existing tokens.
- Make elder-facing screens easier to read and tap by emphasizing current medication tasks, large status text, and high-contrast primary actions.
- Make caregiver-facing screens easier to scan by grouping abnormal status, medication completion, blood-pressure values, and management actions consistently.
- Preserve the existing warm, calm health-management visual direction while reducing overly large radii, inconsistent borders, and one-off visual styles.
- Keep implementation compatible with WeChat Mini Program styling constraints.

**Non-Goals:**
- No changes to medication, blood-pressure, binding, reminder, or navigation logic.
- No new backend APIs, storage models, permissions, or dependencies.
- No redesign into a marketing landing page or a new interaction model.
- No replacement of existing reusable components unless a small visual adjustment is enough.

## Decisions

1. Use existing tokens as the source of truth for visual polish.
   - Rationale: `styles/variables.wxss` and `docs/design-guidelines.md` already define the project palette, spacing, radii, shadows, and typography scale.
   - Alternative considered: introduce a new visual system. Rejected because it would increase inconsistency and make a style-only change larger than necessary.

2. Prioritize page-level WXSS normalization before component rewrites.
   - Rationale: The style inconsistencies are mostly in page containers, card treatments, header spacing, and state emphasis. Fixing these first gives broad visual improvement with low behavioral risk.
   - Alternative considered: rebuild shared components first. Rejected because component API changes are unnecessary for the requested visual optimization.

3. Treat elder and caregiver screens as different density modes.
   - Rationale: Elder pages need fewer competing elements, larger text, and larger touch targets. Caregiver pages can be denser, but abnormal states must be more visually prominent than normal summaries.
   - Alternative considered: apply one identical page pattern everywhere. Rejected because it would either make elder screens too dense or caregiver screens too sparse.

4. Keep status colors semantically stable.
   - Rationale: Existing guidance reserves orange for primary actions, rose/red for missed or abnormal states, green for success, and muted stone for secondary information. The style refresh should strengthen those mappings instead of creating new colors.
   - Alternative considered: use richer gradients for more visual polish. Rejected because gradients can dilute risk states and reduce scanability on small screens.

## Risks / Trade-offs

- [Risk] Visual changes can accidentally reduce readability for elder users. → Mitigation: keep key elder text at or above the existing guidance, retain high-contrast primary actions, and verify no important text becomes cramped.
- [Risk] Normalizing card styles could make abnormal alerts look too similar to normal content. → Mitigation: preserve stronger borders, icon color, and background tint for missed medication and abnormal blood-pressure states.
- [Risk] Page-specific WXSS updates may duplicate style rules. → Mitigation: reuse CSS variables and shared class patterns where supported, but avoid over-abstracting until repeated rules are stable.
- [Risk] WeChat layout differences around safe areas can hide bottom content. → Mitigation: preserve existing `env(safe-area-inset-bottom)` padding patterns for bottom navigation and fixed action bars.

## Migration Plan

1. Review the current pages and components against `docs/design-guidelines.md`.
2. Update global or shared style tokens only if an existing token is missing or incorrectly sized.
3. Polish role entry, elder pages, caregiver pages, and shared components in small groups.
4. Verify each affected page in the miniapp/devtools flow for layout, text wrapping, safe-area spacing, and tappable controls.
5. If a visual regression appears, roll back the affected page-level WXSS without changing data or route logic.
