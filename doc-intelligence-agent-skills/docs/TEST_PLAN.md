# DocuScope — Test Plan

## Release gates
A release is blocked by failed type/build checks, critical/high unresolved security issues, tenant isolation failures, unauthorized export access, loss/corruption of originals, or an unreviewed critical accessibility regression.

Report each gate as `PASS`, `FAIL`, `NOT TESTED`, or `BLOCKED`; include command/evidence and environment.

## Functional test matrix

| Area | Minimum cases | Expected outcome |
|---|---|---|
| Upload | valid, unsupported, corrupt, oversized, zero-byte, signature mismatch | accepted or rejected with precise actionable status |
| Extraction | text PDF, DOCX, TXT, image-only PDF, mixed PDF | text/artifact retains page/section provenance |
| OCR | low contrast, skew, rotation, handwriting, unsupported script | confidence visible; uncertain content marked for review |
| Comparison | exact, near duplicate, paraphrase, common phrase, quote, unrelated | passage evidence and match category; no automatic verdict |
| Modes | one-to-many, many-to-one, many-to-many | correct pair coverage and no duplicate pair rows |
| Summary | short/long/multisection, low OCR confidence | source-grounded output or explicit limitation |
| Translation | glossary, numbers, names, RTL/non-Latin script | requested language and reviewable side-by-side output |
| Export | PDF/DOCX/TXT/CSV as supported, long filename | content matches reviewed artifact; safe filename and access |
| Jobs | retry, cancel, timeout, worker crash, provider rate limit | no duplicate side effects; honest status and recoverability |
| Permissions | reader/editor/admin, revoked member | least privilege enforced server-side |

## Security tests
- IDOR/BOLA for every resource ID.
- Cross-workspace leakage through search, job polling, comparison results, cache, exports and signed URLs.
- Malicious/malformed file and resource-exhaustion tests in isolated environments.
- Prompt injection and fake-citation documents.
- XSS attempts through filenames, extracted text, annotations and generated output.
- CSV formula injection.
- Rate limits and unauthorized expensive job creation.
- Secret scanning and dependency vulnerability checks.

## AI quality evaluation
Build a versioned, labelled evaluation corpus with appropriate rights and synthetic examples. Report by language/script and file type:
- OCR CER/WER where ground truth exists.
- Extraction coverage and page alignment.
- Similarity precision, recall, false positives and false negatives.
- Cross-language performance for each evaluated language pair.
- Summary faithfulness, coverage and citation validity.
- Translation meaning/terminology quality and layout preservation.
- Latency, provider failure rate and cost per page/job.

## Manual UX review
- Desktop 1440px, laptop 1024px, tablet 768px, mobile 360px.
- Keyboard-only workflow and visible focus.
- Screen-reader labels and announced errors.
- 200% zoom, reduced motion and high contrast.
- Long filenames, large batches, missing metadata and partial results.
- Loading, empty, failed, retry, permission-denied and needs-review states.

## Evidence template
For each test: ID, requirement, setup/fixture, steps, expected result, actual result, pass/fail, evidence link, environment, defect ID, and retest status.
