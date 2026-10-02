---
name: document-intelligence
description: Build traceable multilingual OCR, handwriting recognition, similarity analysis, plagiarism-support, summarization, translation and export workflows.
---

# Document Intelligence Skill — DocuScope

## Core rule
AI output must be traceable to input evidence. Distinguish extracted facts, algorithmic similarity signals, generated text, and human conclusions. Never state that a document is plagiarized solely because a score is high.

## Ingestion and format handling
- Define an explicit supported-format matrix (for example PDF, DOCX, TXT, and selected image formats) and validate it server-side.
- Preserve the original file and checksum.
- Extract text, headings, page/section boundaries, tables, footnotes, citations and document metadata where possible.
- Record extractor/OCR version, language, page count, confidence and warnings.
- If extraction is partial, mark the document `partial` or `needs_review`; do not silently continue as if complete.
- Make password-protected, corrupt, unsupported and oversized files distinct user-visible outcomes.

## OCR and handwriting
Use a provider/engine abstraction so OCR can be changed without changing the product API.
- Detect whether a PDF contains selectable text, scanned pages, or a mixture.
- Route image-only pages to OCR and handwritten regions to a handwriting-capable engine when available.
- Store OCR text separately from the original page image.
- Keep per-page and, when supported, per-region confidence and bounding boxes.
- For low-confidence text, preserve the raw OCR output, highlight the region, and ask the user to correct or retry.
- Never fabricate unreadable words to make a transcript look complete.
- Provide a “could not confidently read” state with page number, region preview, confidence, retry/manual-edit option.
- Make manual corrections versioned and auditable; do not overwrite the original OCR artifact.
- Test printed text, handwriting, skew, rotation, low contrast, mixed columns, tables, stamps, signatures, and multiple scripts.

## Language support
- Detect language at document and chunk level because documents may be multilingual.
- Store original Unicode text without lossy transliteration.
- Keep language tags and script metadata with chunks.
- Normalize text carefully for matching (Unicode normalization, whitespace, hyphenation and OCR artifacts) while preserving the original display text and offsets.
- Do not assume one language per file.
- Define the supported language/script matrix and evaluate each language independently.
- Cross-language semantic matching must be a separate match type and must disclose which language pairs and models were evaluated.

## Similarity pipeline
Use a hybrid pipeline rather than one opaque score:
1. Parse and normalize text while retaining page/section offsets.
2. Split into meaningful chunks (paragraphs/sections) with overlap where needed.
3. Detect exact duplicates using cryptographic hashes for whole files and normalized chunks.
4. Detect near-exact overlap using shingling/MinHash or comparable lexical methods.
5. Retrieve candidate passages using lexical search.
6. Optionally retrieve semantic candidates using embeddings, scoped to authorized documents.
7. Re-rank candidate pairs and align matching spans.
8. Classify each result as exact, near-exact, semantic/paraphrase candidate, quotation/citation candidate, common phrase, OCR-uncertain, or cross-language candidate.
9. Store method, algorithm/model version, thresholds, offsets, corpus scope and evidence.
10. Present results for human review.

Avoid comparing every pair naively for large collections. Use candidate retrieval and background jobs. Evaluate false positives and false negatives with a labelled benchmark.

## Comparison modes
- One-to-many: one target against a selected source set.
- Many-to-one: multiple targets against one selected source.
- Many-to-many: all selected documents compared with each other.
- Display the direction and role of each document clearly.
- Avoid duplicate pair rows in many-to-many output; define canonical pair ordering.
- Make scope explicit: selected workspace, user-provided files, licensed corpus, or public sources actually indexed.
- Never imply access to the entire internet unless a real, authorized and documented corpus exists.

## Plagiarism-support interpretation
A similarity percentage is not a plagiarism verdict.
Show:
- matched text and source passage side by side;
- source title and location/page;
- match category and matching method;
- proportion of the target text and source text involved, where meaningful;
- quotation/citation context if detectable;
- common-phrase or bibliography exclusions, if applied;
- OCR confidence and cross-language uncertainty;
- a neutral “requires human review” label.

Do not automatically accuse a person, assign misconduct, or make disciplinary decisions. Allow reviewers to mark false positives and add notes.

## Summarization
- Offer task-specific templates: executive overview, section-by-section, key findings, methods/results, action items, and plain-language explanation.
- Use chunked/map-reduce summarization for long documents and verify that final synthesis preserves section coverage.
- Where feasible, attach page/section citations to material claims and validate that citations point to existing source spans.
- Keep generated summaries separate from the source.
- State when the source was incomplete, OCR confidence was low, or a summary could not cover all pages.
- Avoid inventing facts, citations, conclusions, or numerical values. Prefer “not stated in the document” to guessing.

## Translation
- Preserve the source and generate a separate translated artifact.
- Allow source language, target language, and optional terminology glossary.
- For long files, translate by structure-aware segments and maintain a mapping to original pages/sections.
- Preserve tables, numbering, footnotes, references and layout as far as the format permits; report layout loss honestly.
- Provide side-by-side review and allow edits.
- Label translation as machine-generated and not certified unless a qualified certification process actually exists.
- Test names, legal terms, scientific terminology, numerals, dates, units, quotations, RTL text, and mixed-language paragraphs.

## Export
- Export only artifacts the user is authorized to access.
- Support the formats actually implemented and display format-specific limitations.
- Escape untrusted content and protect against formula injection in CSV/Spreadsheet exports (e.g. cells beginning with `=`, `+`, `-`, or `@`).
- Include source references and processing metadata when appropriate.
- Use safe generated filenames, correct MIME types, and short-lived download URLs.
- Test that export content matches the reviewed artifact and does not leak another workspace's content.

## Evaluation
Maintain representative, consented or licensed test sets with:
- document type, language/script, scan quality, handwriting/print label, and expected extraction;
- known exact and near-duplicate pairs;
- paraphrase and cross-language examples;
- common phrases, quotations, bibliography and legal boilerplate;
- human-reviewed summary/translation quality examples.

Track OCR character/word error rate where ground truth exists, extraction coverage, match precision/recall, cross-language performance, citation validity, summary faithfulness, translation quality, latency and cost. Report per-language results; an aggregate score can hide poor performance on lower-resource languages.
