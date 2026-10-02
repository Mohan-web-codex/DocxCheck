---
name: document-testing
description: Create a layered, evidence-based testing strategy for the DocuScope frontend, APIs, processing jobs, AI outputs, security and exports.
---

# Testing Skill — DocuScope

## Rules
- Test user-visible behavior and security boundaries, not only implementation details.
- Never mark a test passed unless it was executed and its result observed.
- Use synthetic or explicitly approved fixtures; do not place confidential client documents in test systems.
- Make tests deterministic where possible. For model-based features, separate deterministic contract tests from evaluation tests.
- Every bug fix must include a regression test where practical.

## Test layers
1. **Static**: formatter, linter, type checker, dependency audit, secret scan.
2. **Unit**: normalization, chunking, score calculations, state transitions, permission policy, filename handling.
3. **Component**: upload forms, comparison selection, passage inspector, OCR correction, translation controls, status/error states.
4. **API integration**: authentication, authorization, validation, pagination, idempotency, queue behavior.
5. **Worker integration**: parsers, OCR adapters, retries, cancellation, timeouts, artifact persistence.
6. **End-to-end**: upload → processing → compare → inspect match → summarize/translate → export.
7. **Security**: cross-tenant access, IDOR/BOLA, prompt injection, malicious files, rate limits, signed URL expiry, log redaction.
8. **AI evaluation**: OCR quality, similarity precision/recall, summary faithfulness, translation quality, citation validity.
9. **Performance/resilience**: large files, many-file batches, queue backlog, worker crash, provider timeout, database outage.
10. **Accessibility/i18n**: keyboard flow, focus, screen reader names, contrast, zoom, long translations, RTL and non-Latin scripts.

## Required test scenarios
### Upload and parsing
- supported valid file;
- extension/MIME/signature mismatch;
- zero-byte, corrupt, password-protected and oversized file;
- malformed PDF and archive bomb fixture in an isolated test environment;
- duplicate upload and interrupted upload;
- mixed text/scanned PDF;
- document with tables, footnotes, headers and multi-column layout.

### OCR and handwriting
- high-confidence printed text;
- low-quality scan, skew, rotation and low contrast;
- handwriting supported by the selected engine;
- unsupported script or engine failure;
- low-confidence region produces `needs_review`, not fabricated text;
- manual correction is versioned and original remains unchanged.

### Similarity
- exact duplicate;
- near duplicate with punctuation/spacing changes;
- paraphrase candidate;
- common phrase false positive;
- bibliography/quotation case;
- unrelated documents;
- one-to-many, many-to-one, many-to-many;
- multilingual and cross-language pairs;
- OCR noise;
- empty or extremely short documents;
- source outside the selected corpus must not appear.

### AI generation
- prompt-injection content in uploaded text does not change permissions or tool access;
- long document uses all required chunks or discloses incomplete coverage;
- generated citations resolve to real page/chunk IDs;
- provider timeout and rate limit yield retryable, safe errors;
- output language matches requested language or is flagged;
- no confidential content appears in logs or another workspace.

### Security and tenancy
- user A cannot read user B's document, artifact, job, matches, annotations, or export;
- changing object IDs never bypasses authorization;
- signed URL expires and cannot be reused beyond intended scope;
- deleted document cannot be fetched through cache or old API route;
- role downgrade takes effect immediately;
- unauthorized export and job cancellation are rejected;
- audit log records security-relevant action without raw content.

### UI and accessibility
- keyboard-only complete workflow;
- focus trap and restoration for dialogs;
- errors announced to assistive technology;
- 200% zoom and small viewport;
- long filenames and long translated strings;
- loading, empty, partial, failure, retry and permission-denied states;
- reduced-motion preference;
- no horizontal overflow in core flows.

## AI evaluation discipline
- Keep a versioned, labelled evaluation set separate from training/prompt examples.
- Report metrics by language, script, file type and scan quality.
- For similarity, track precision/recall and false-positive examples; do not optimize only for a high score.
- For summaries, review factual faithfulness, coverage and citation correctness.
- For translation, review terminology, meaning preservation, numerals, names and formatting.
- Use human review for high-impact quality judgments.
- Record model, prompt/template, OCR engine, algorithm and dataset versions with results.

## CI and release gates
A release candidate should not pass if:
- type checks, lint, unit or integration tests fail;
- a critical/high security issue remains without an approved exception;
- tenant isolation tests fail;
- exports leak unauthorized content;
- critical accessibility regressions exist;
- the build is not reproducible from the documented lockfile;
- AI quality has not been measured for the advertised languages.

Separate **automated pass**, **manual pass**, **not tested**, and **blocked**. Do not treat missing hardware/provider credentials as a pass.
