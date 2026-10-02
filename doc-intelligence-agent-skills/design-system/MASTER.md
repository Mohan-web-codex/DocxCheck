# DocuScope Design System — Master

## Design intent
A dependable document workspace with editorial typography, precise data presentation, and restrained visual personality. The product should feel like a professional research instrument, not a marketing landing page.

## Initial tokens
Treat these as a starting point; validate contrast before shipping.

```css
:root {
  --color-canvas: #F6F7F9;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #EEF1F5;
  --color-border: #D9DEE7;
  --color-text: #172033;
  --color-text-muted: #5E687A;
  --color-primary: #3547A5;
  --color-primary-hover: #293A91;
  --color-primary-soft: #E9ECFF;
  --color-success: #16794B;
  --color-warning: #946200;
  --color-danger: #B42318;
  --color-info: #176B87;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

## Typography
- UI: use a highly legible sans-serif such as Inter or the existing project font.
- Document text: prioritize readability and appropriate line length; preserve original typography only in document previews when needed.
- Use tabular numerals for scores, page counts, file sizes, durations and dates.
- Keep headings concise and use a predictable type scale.
- Do not use all-caps for long labels.

## Layout
- 8px base spacing rhythm with 4px adjustments where necessary.
- App shell: left navigation, top workspace bar, central work area, contextual inspector.
- Use a split-pane comparison layout with clear source/target headers and synchronized passage navigation when helpful.
- Use tables for sortable collections; use cards only when the content is naturally self-contained.
- Set explicit minimum widths and overflow behavior for comparison panes.

## Components
- Buttons: primary for one main action per view; secondary for supporting actions; destructive actions clearly separated.
- Inputs: persistent labels, helper text and actionable validation.
- Status: icon + text + optional color. Never color-only.
- Match highlights: distinct styles for exact, near-exact, semantic candidate, citation/quotation candidate, and OCR-uncertain text; include a legend and accessible text labels.
- Progress: show named stages and actual counts; do not fabricate percentage.
- Tables: sorting/filtering states, empty state, loading skeleton, pagination and keyboard support.
- Dialogs: concise title, consequence statement, explicit cancel and confirm actions, focus management.
- Toasts: short and non-sensitive; never include raw document content.

## Document comparison colors
Use color plus labels/patterns. Proposed mapping:
- Exact overlap: blue
- Near-exact overlap: violet
- Semantic candidate: teal
- Citation/quotation candidate: neutral slate
- OCR uncertainty: amber
- Error/security issue: red

Check contrast and do not use this mapping as the only indication of category.

## Density and responsive behavior
- Desktop: allow dense metadata but keep reading surfaces calm.
- Tablet: collapse navigation and reduce inspector width.
- Mobile: single-pane tasks, comparison tabs, sticky primary action only when it does not cover content.
- Support long translations, long file names, large page numbers and mixed scripts without clipping.

## Motion
- Short transitions for drawers, tabs and selection.
- Respect reduced motion.
- No parallax or decorative scroll animation in document-reading surfaces.
- Avoid layout shifts when asynchronous results arrive.

## Accessibility
Target WCAG 2.2 AA. Verify text contrast, focus visibility, keyboard order, semantics, accessible names, zoom, reflow, error announcements and non-color status communication.
