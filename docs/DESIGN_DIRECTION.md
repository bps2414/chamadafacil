# Design Direction: ChamadaFácil

## Mandatory Visual Reference

Before implementing or changing any UI, open `VISUAL_REFERENCE.md` and the relevant image in `docs/visual-reference/screens/`.

Use those images as the reference for layout, density, spacing, hierarchy, colors, and the clean support-tool tone. Generated image text is not a source of truth for exact copy or product scope; `PRD.md` and `SPEC.md` remain authoritative for behavior, routes, and requirements.

## Visual Style

ChamadaFácil should feel like a calm, trustworthy support tool for small businesses in Brazil. The interface should look professional without pretending to be a large enterprise platform.

The product should communicate:

- Organization.
- Clarity.
- Practical support.
- Reliability.
- Beginner-friendly implementation with polished execution.

Avoid:

- Generic SaaS dashboard card overload.
- Oversized marketing hero sections.
- Decorative gradients as the main visual identity.
- Fake enterprise complexity.
- Visual clutter that makes the support workflow harder to understand.

## Layout Principles

- Build mobile-first and expand to desktop.
- Keep public pages focused on one action per screen.
- Keep admin screens dense enough for work, but not cramped.
- Use full-width sections and constrained content areas instead of nested cards.
- Use cards only for repeated items such as tickets.
- On desktop, the admin dashboard may use a table/list hybrid.
- On mobile, the admin dashboard should use stacked ticket rows or compact cards.

## Color Direction

Recommended palette direction:

- Background: warm white or very light neutral.
- Text: dark neutral for high readability.
- Primary action: trustworthy blue.
- Success/resolved: green.
- Waiting/attention: amber.
- Urgent/error: red.
- Borders: subtle neutral gray.

Status and urgency colors must remain readable and accessible. Do not rely on color alone; include text labels.

## Typography Direction

- Use a clean sans-serif font such as Geist, Inter, or system UI.
- Keep headings clear and modest in admin surfaces.
- Use larger type only on the public home page where it supports hierarchy.
- Avoid negative letter spacing.
- Do not scale font size directly with viewport width.

## Mobile-First Rules

- Every primary action must be reachable on narrow screens.
- Forms should be single-column on mobile.
- Buttons and controls should have comfortable touch targets.
- Ticket cards must not rely on horizontal scrolling.
- Admin filters should stack cleanly on mobile.
- Long ticket subjects should wrap instead of overflowing.
- Status and urgency badges should remain legible at small sizes.

## Accessibility Rules

- Use semantic headings in order.
- Every input must have a visible label.
- Error messages must explain what needs to be fixed.
- Focus states must be visible.
- Buttons must show disabled/loading states.
- Color contrast must be sufficient for text, badges, and buttons.
- Interactive elements should support keyboard navigation.
- Do not hide essential information behind hover-only interactions.

## Dashboard UI Direction

The admin dashboard should feel like a practical work surface, not a decorative analytics dashboard.

Include:

- Clear filter controls for status and urgency.
- Recent tickets first.
- Ticket number, subject, status, urgency, requester, and updated date.
- Obvious navigation to ticket detail.
- Empty states that explain what happened.

Avoid:

- Large KPI blocks in the MVP.
- Charts in the MVP.
- Sidebars with unused navigation.
- Complex role or organization switchers.
- Decorative cards that do not help the admin act.
