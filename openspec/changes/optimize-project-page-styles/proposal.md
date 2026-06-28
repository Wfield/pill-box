## Why

The miniapp already has complete role flows for elders and family caregivers, but page styling is uneven across screens: spacing, card hierarchy, control density, and status emphasis vary by page. Optimizing the project page styles will make medication and blood-pressure workflows easier to scan, especially for elder users who need larger touch targets and clearer state feedback.

## What Changes

- Refresh page-level styling across the role entry, elder pages, child pages, and shared components to better follow the existing warm health-management design language.
- Standardize visual hierarchy for headers, cards, status badges, empty states, bottom navigation, and primary actions using the existing color, spacing, radius, shadow, and font tokens.
- Improve elder-facing readability with larger key information, clearer medication status contrast, and more comfortable touch targets.
- Improve child-facing scanability with stronger abnormal-state emphasis, cleaner card grouping, and denser but orderly summary layouts.
- Reduce one-off hardcoded visual decisions where practical by reusing shared tokens and existing component patterns.
- Preserve existing page routes, data shape, business logic, and interaction outcomes.

## Capabilities

### New Capabilities
- `page-visual-polish`: Covers requirements for consistent, accessible, role-aware page styling across the miniapp.

### Modified Capabilities

None.

## Impact

- Affected pages: `pages/index/index`, `pages/elderly/home`, `pages/elderly/meds`, `pages/elderly/photo-add`, `pages/elderly/reminder`, `pages/child/overview`, `pages/child/elder-detail`, `pages/child/bind-flow`, and `pages/child/add-med`.
- Affected shared assets: `app.wxss`, `styles/variables.wxss`, `styles/animations.wxss`, and reusable UI components under `components/` where visual consistency requires it.
- No API, storage, routing, or dependency changes are expected.
