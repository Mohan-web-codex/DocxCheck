---
name: document-architecture
description: Plan and implement maintainable architecture and backend workflows for secure, asynchronous document intelligence.
---

# Document Architecture Skill — DocuScope

## Mission
Build a modular system that can safely ingest large, sensitive documents and run OCR, language detection, similarity analysis, summarization, translation, and exports as traceable asynchronous jobs.

## Architecture principles
- Separate web/API concerns from CPU/GPU-heavy document processing.
- Treat uploaded files, extracted text, model output, and external source content as untrusted data.
- Preserve the original file as immutable evidence; derived text and outputs are versioned artifacts.
- Every job must be attributable to a user/workspace, have a state machine, and be retryable without duplicate side effects.
- Make model/provider choices replaceable behind interfaces.
- Prefer explicit interfaces and observable workflows over a premature microservice fleet.

## Suggested baseline stack
Use this as a proposal; inspect the repository before committing to it.
- Frontend: React + TypeScript + Vite, or the existing framework if already established.
- API: Python + FastAPI + Pydantic.
- Relational data: PostgreSQL.
- File storage: private S3-compatible object storage with encryption and short-lived signed URLs.
- Queue/workers: Redis-backed queue (e.g. RQ/Celery) or a managed queue; use separate worker processes.
- Search: PostgreSQL full-text/trigram for MVP; add a dedicated search engine only when measurements justify it.
- Text extraction/OCR: format-specific parsers plus an OCR provider/engine abstraction.
- Observability: structured logs, metrics, traces, and job-level correlation IDs with sensitive-data redaction.

Do not introduce every technology at once. For a student/MVP project, a modular monolith plus worker process is usually simpler to deploy and test than many independently deployed services.

## Logical modules
1. Identity and workspace membership.
2. Document registry and versioning.
3. Upload validation and quarantine.
4. Extraction and OCR.
5. Language detection and normalization.
6. Chunking and indexing.
7. Similarity and source attribution.
8. Summarization and translation.
9. Review annotations.
10. Export generation.
11. Audit and retention.
12. Provider adapters and usage/cost accounting.

## Data model (minimum viable)
- `users`: identity provider subject, display metadata, timestamps.
- `workspaces`: owner, name, policy settings.
- `workspace_members`: workspace, user, role, status.
- `documents`: workspace, uploader, display name, media type, byte size, SHA-256, storage key, lifecycle status, created timestamp.
- `document_versions`: document, version number, immutable object key, checksum, parent version.
- `processing_jobs`: workspace, requested by, type, status, progress stage, attempt count, idempotency key, error code, timestamps.
- `extracted_artifacts`: document version, extractor version, language, page count, text object key, OCR metadata, confidence summary.
- `chunks`: artifact, page/section, ordinal, text reference, token count, language, fingerprint.
- `comparison_runs`: workspace, mode, target IDs, source-set ID, algorithm/config version, corpus scope, status.
- `matches`: comparison run, left/right chunk, match type, score, offsets, evidence metadata.
- `generated_artifacts`: source document versions, task type, output language, model/provider/version, prompt/template version, output object key, review status.
- `annotations`: author, document/run, passage reference, label, note, timestamps.
- `audit_events`: actor, workspace, action, object type/id, timestamp, request/job ID, safe metadata.
- `retention_policies`: workspace, retention duration, legal hold flag, purge configuration.

Enforce tenant/workspace scoping in the data access layer and, where appropriate, PostgreSQL row-level security. Never rely on frontend filtering for authorization.

## Job state machine
Use explicit states such as:
`queued -> validating -> extracting -> OCR (optional) -> normalizing -> indexing -> analyzing/generating -> finalizing -> succeeded`
Terminal alternatives: `failed`, `cancelled`, `needs_review`.

Persist stage transitions. A retry must resume from a safe checkpoint or start a new attempt with idempotent outputs. Do not fake percentage progress; report actual stages and completed units.

## API shape (illustrative)
- `POST /v1/documents/uploads` — create upload session and metadata.
- `POST /v1/documents/{id}/complete-upload` — finalize and validate upload.
- `GET /v1/documents/{id}` — authorized metadata/status.
- `GET /v1/documents/{id}/content` — short-lived authorized download URL or streamed content.
- `POST /v1/jobs/ocr`
- `POST /v1/comparisons`
- `GET /v1/comparisons/{id}`
- `GET /v1/comparisons/{id}/matches`
- `POST /v1/jobs/summaries`
- `POST /v1/jobs/translations`
- `POST /v1/exports`
- `GET /v1/jobs/{id}` and `POST /v1/jobs/{id}/cancel`
- `GET /v1/audit-events`

Use pagination, request-size limits, typed schemas, consistent error envelopes, and idempotency keys for job creation. Do not return internal storage keys or provider credentials.

## Ingestion workflow
1. Authenticate and authorize the uploader for the workspace.
2. Create an upload session with size/type limits and a random object key.
3. Upload into a private quarantine location.
4. Verify checksum, actual file signature, size, and archive expansion limits.
5. Malware-scan where feasible; reject or quarantine suspicious files.
6. Move/mark the file as accepted only after validation.
7. Create a job and enqueue it transactionally using an outbox or equivalent reliable pattern.
8. Extract text and metadata in a sandboxed worker with CPU, memory, time, and page limits.
9. Persist artifacts with extractor version and provenance.
10. Surface success, partial extraction, or a precise review-needed state.

## Reliability and performance
- Apply per-user/workspace concurrency and storage quotas.
- Use bounded queues, worker timeouts, retries with backoff, and dead-letter handling.
- Deduplicate identical bytes using checksums only within a privacy-safe scope; do not reveal cross-tenant file existence.
- Avoid loading whole PDFs or corpora into API memory.
- Use streaming uploads/downloads and chunked processing.
- Keep database transactions short; do not hold them while calling models.
- Cache only when tenant isolation and deletion semantics are correct.
- Record model, prompt/template, OCR engine, algorithm and configuration versions for reproducibility.

## Architecture decision record
Before adding a major service or provider, write an ADR with: context, options, decision, consequences, security/privacy impact, cost, rollback path, and validation plan.
