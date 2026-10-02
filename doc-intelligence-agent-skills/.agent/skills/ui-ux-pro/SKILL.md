---
name: ui-ux-pro
description: Design and implement accessible, responsive, production-grade UX for a multilingual document analysis workspace.
---

# UI/UX Pro Skill — DocuScope

## Product context
DocuScope is a document workspace for lawyers, scientists, researchers, editors, and administrators. Users can upload one or many files; compare one-to-many, many-to-one, and many-to-many; inspect matching passages; run OCR on scanned or handwritten documents; summarize, translate, export, and manage workspaces.

Trust, readability, traceability, and user control are more important than visual novelty.

## First: understand before coding
- Inspect the current app structure, router, component library, design tokens, and existing tests.
- Do not replace the stack or introduce a second component system without a written reason.
- Identify the single user journey this change improves.
- For new screens, define: goal, primary action, secondary actions, data required, loading state, empty state, error state, permission state, and success state.
- For existing screens, audit before redesigning. Preserve working behavior.

## Information architecture
Suggested top-level areas:
- **Workspace**: recent projects, shared folders, activity and processing status.
- **Documents**: upload, metadata, version history, OCR status, tags, retention.
- **Compare**: source/target selection, comparison mode, filters, matched passages.
- **Review**: side-by-side passages, source provenance, confidence, reviewer notes.
- **Summarize**: summary type, length, language, citations/page references.
- **Translate**: source/target language, terminology glossary, side-by-side output.
- **Exports**: PDF/DOCX/TXT/CSV where appropriate, export history and access controls.
- **Settings**: members, roles, audit log, retention, language and accessibility preferences.

Treat these as proposed navigation, not a mandate to implement every area in the MVP.

## Comparison UX
Support three explicit modes:
1. One document against many candidate sources.
2. Many documents against one target document.
3. Many documents against many documents.

The selection UI must clearly label **target document(s)** and **comparison source set(s)**. Show counts before starting and warn when a job will be large or expensive. Let users exclude a document without losing the rest of the selection.

Results should include:
- an overall similarity indicator with the method and corpus scope;
- matched passages with source document, page/section, and match type;
- filters for exact, near-exact, paraphrase/semantic, and cross-language matches when supported;
- a passage-level explanation of why it matched;
- an explicit distinction between text overlap and a plagiarism conclusion;
- controls to mark a match as relevant, quoted, common phrase, false positive, or needs review.

Never show a single score without context or imply that similarity proves misconduct.

## Document viewer
- Preserve page number, page dimensions, reading order, and text selection when possible.
- For OCR-derived text, allow users to inspect the page image alongside extracted text.
- Highlight uncertain OCR spans; provide confidence and an editable correction flow.
- If handwriting cannot be reliably read, show a localized “Could not confidently read this section” state with page/region and retry/manual correction actions.
- Support rotation, zoom, page navigation, search, and accessible alternatives.
- Do not overwrite the original uploaded file with OCR-corrected content.

## Summaries and translations
- Let users choose output language and summary type (executive, detailed, section-wise, key findings, action items).
- Display source page/section references for claims whenever the pipeline can support them.
- Label generated output as AI-generated and make source text easy to inspect.
- For translation, show original and translated content side by side; support terminology/glossary rules.
- Explain that legal/scientific translations may require qualified human review. Never silently present generated text as certified translation.

## Forms and feedback
- Use labels that remain visible after input.
- Validate on blur or submit; explain how to fix the problem.
- Keep user input when an operation fails.
- Distinguish a file validation error from a processing error and a permission error.
- Confirm destructive actions such as delete, permanently purge, revoke access, and overwrite.
- Make long-running jobs cancellable when safe and explain whether cancellation stops compute immediately or only prevents later stages.

## Accessibility and internationalization
- Target WCAG 2.2 AA as the baseline.
- Support keyboard-only navigation, logical focus order, visible focus, semantic headings, and accessible dialogs.
- Do not encode status using color alone; combine icon/text/pattern.
- Test long translations, RTL layouts if supported, diacritics, CJK text, Indic scripts, and mixed-language documents.
- Avoid hard-coded English strings. Use message catalogs and locale-aware dates, numbers, and file sizes.
- Keep translated UI labels from breaking buttons and tables.

## Responsive behavior
- Desktop: three-zone workspace where useful (navigation, document canvas, inspector).
- Tablet: collapsible navigation and a two-pane review mode.
- Mobile: task-focused single pane; comparison panes become tabs, and bulk actions move into a clearly labeled menu.
- Do not hide core status or destructive-action warnings on smaller screens.

## Implementation rules
- Use existing primitives and tokens before creating new ones.
- Keep components focused; avoid a single giant page component.
- Represent UI states explicitly with typed states/unions where practical.
- Handle loading, error, empty, partial-success, and retry states.
- Keep document content safe: render untrusted text as text, never as raw HTML.
- Do not place secrets or raw sensitive document text in client logs, analytics, URLs, or error toasts.
- Add component tests for new interactive behavior and an accessibility check for major flows.

## Definition of done
A screen is not done until:
- all states are implemented;
- the primary flow works with realistic data;
- keyboard and screen-reader semantics are checked;
- responsive layouts are checked;
- no critical text is clipped;
- errors are actionable;
- tests and build pass;
- the change is limited to the requested scope.
