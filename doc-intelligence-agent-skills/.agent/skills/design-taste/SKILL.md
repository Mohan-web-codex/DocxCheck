---
name: design-taste
description: Create distinctive, polished visual design for the DocuScope document-intelligence workspace without generic AI-generated UI patterns.
---

# Design Taste Skill — DocuScope

## Mission
Create a calm, credible, professional workspace for people comparing, reviewing, translating, and preserving important documents. The product should feel precise and dependable—not like a flashy AI demo.

## Before designing
1. Identify the user role and task: lawyer reviewing evidence, researcher comparing papers, editor translating a report, or administrator processing a document batch.
2. Identify the primary decision the screen supports and the next action.
3. Inspect existing components, tokens, routes, and screenshots before editing.
4. Read `design-system/MASTER.md`. Reuse its tokens unless there is a documented reason to change them.
5. State the page hierarchy and key states before writing UI code.

## Visual direction
- Use editorial clarity plus a dense, high-quality productivity-workspace layout.
- Prefer a neutral canvas, restrained indigo/blue actions, clear typography, thin borders, and purposeful whitespace.
- Make document content the visual hero; interface chrome should support reading and comparison.
- Use alignment, type scale, and spacing to establish hierarchy instead of gradients, glow, and oversized cards.
- Use one consistent icon family. Icons that communicate actions must have accessible labels.
- Use real interface states and realistic document snippets; never fill a serious document tool with fake testimonials, meaningless metrics, or decorative charts.

## Anti-patterns
Do not:
- build every section as a rounded floating card;
- use gradient text, excessive glassmorphism, neon glows, or decorative blobs as a substitute for hierarchy;
- add animation to every hover or page element;
- use emoji as core navigation icons;
- truncate critical legal/scientific text without a way to inspect it;
- use color alone to indicate similarity, risk, confidence, or status;
- invent a similarity score, citation, or source to make a mockup look complete;
- redesign unrelated screens while implementing one feature.

## Layout and density
- Use a stable application shell: navigation, workspace/project context, main work area, and contextual inspector.
- Prefer split-pane comparison for source/target review, with independently scrollable panes and synchronized passage navigation when useful.
- Keep the main task visible above the fold. Put advanced filters and secondary metadata in collapsible regions.
- Preserve reading width and line length. Tables should support column visibility, sorting, filtering, and keyboard navigation where appropriate.
- At narrow widths, convert split panes into tabs or a stacked comparison; do not merely shrink desktop columns.

## Motion
Motion should explain state changes, not decorate them.
- Use short, interruptible transitions for drawers, tabs, and progress indicators.
- Respect `prefers-reduced-motion`.
- Never animate a large document body or cause layout shifts while someone is reading.
- Avoid fake progress. Show real stage-based progress or an honest indeterminate state.

## Design review protocol
For each page, check:
- visual hierarchy and primary action;
- consistency with the master design system;
- realistic loading, empty, error, permission-denied, and success states;
- responsive behavior at 360px, 768px, 1024px, and 1440px;
- keyboard operation, visible focus, contrast, and screen-reader labels;
- long filenames, long languages, large numbers, missing metadata, and failed processing;
- no horizontal overflow, clipped dialogs, or hidden destructive actions.

## Required output when asked to design
Return:
1. user and task;
2. proposed layout and component hierarchy;
3. relevant states and responsive behavior;
4. tokens/components reused;
5. implementation plan;
6. acceptance checklist.

Do not claim a design is tested until the checks have actually been run.
