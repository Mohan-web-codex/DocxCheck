# DocuScope — Product and Processing Workflows

## A. Create workspace and upload
1. User creates or opens a workspace.
2. User selects files or drags them into the upload area.
3. UI shows file count, supported types, size limits and privacy/retention notice.
4. API checks membership and creates upload sessions.
5. Files upload to private quarantine.
6. Server validates signatures, size, checksum, format and scan result.
7. Accepted files appear in the library with a processing status.
8. User can continue working while jobs run.

UI states: idle, uploading, validating, queued, processing, partial, needs review, complete, failed, cancelled.

## B. OCR and handwriting
1. Detect text layer and page image availability.
2. Extract existing text where available.
3. OCR image-only pages; route handwriting to an engine that supports the detected script.
4. Save text, page mapping, confidence and bounding boxes when available.
5. If confidence is below the configured threshold, mark the relevant page/region for review.
6. User opens the page image and extracted text side by side.
7. User corrects uncertain text; save a new correction version and audit event.
8. Re-run indexing/comparison for the corrected artifact without altering the original.

## C. Comparison modes
Before starting, user chooses:
- **One-to-many:** one target document, multiple sources.
- **Many-to-one:** multiple targets, one source.
- **Many-to-many:** pairwise comparison within a selected set.

Then:
1. Validate access to every selected document.
2. Show selected counts, estimated workload and corpus scope.
3. Create an idempotent comparison job.
4. Retrieve candidate pairs using lexical/semantic indexes as configured.
5. Align matching spans and persist evidence.
6. Show results grouped by target/source, with filters and source navigation.
7. Reviewer labels matches and adds notes.
8. Export a report with methodology, corpus scope, limitations and reviewed findings.

## D. Summary
1. User selects document/version and summary type.
2. User selects output language and desired detail.
3. Pipeline checks extraction completeness and OCR confidence.
4. Summarize structure-aware chunks and synthesize the result.
5. Validate page/section references.
6. Display summary beside source; flag unsupported or unreferenced claims where possible.
7. User edits or exports the draft.

## E. Translation
1. User selects source and target language.
2. Optional glossary/terminology rules are applied.
3. Pipeline translates structure-aware segments while retaining source mapping.
4. UI shows original and translated text side by side.
5. User reviews terminology, names, dates, numbers and formatting.
6. Export translated artifact with a clear machine-translation label unless certification genuinely applies.

## F. Export and deletion
- Export jobs re-check permissions at creation and download time.
- Generated files use safe names and short-lived URLs.
- CSV/spreadsheet exports neutralize formula-like cells.
- Deletion explains which originals, OCR text, embeddings/indexes, generated artifacts and cached copies will be removed, plus any legal-hold exception.
- Audit the request and outcome without recording document contents.

## Failure and recovery
- Retry transient provider/queue errors with bounded backoff.
- Do not retry invalid files indefinitely.
- Preserve partial results and indicate what did not complete.
- Give a stable error code, user-safe explanation, and next action.
- Cancellation prevents later stages where possible and records what may already have been processed.
