# DocuScope — Security Baseline

## Data classification
Treat originals, extracted text, OCR results, annotations, comparisons, summaries, translations and exports as confidential workspace data by default.

## Baseline controls
- Authentication and server-side object-level authorization on every request.
- Workspace/tenant isolation across database, object storage, search, cache, queue and export paths.
- Private storage, TLS, encryption at rest, short-lived signed URLs.
- File signature validation, quarantine, malware scanning where feasible, resource limits and isolated parsing workers.
- Rate limits, quotas, request validation and bounded processing concurrency.
- Secrets managed outside source control and frontend bundles.
- Dependency, secret and static analysis in CI.
- Redacted structured logs, audit events and an incident response runbook.
- Documented retention, deletion, backup and legal-hold behavior.
- No training on customer content by default; explicitly review provider terms and configuration.

## AI-specific controls
- Uploaded content is untrusted data, never an instruction source.
- Model output cannot authorize access or select arbitrary tools, URLs, paths, SQL or storage objects.
- Validate structured output and resolve referenced IDs on the server.
- Restrict retrieval to the active authorized workspace.
- Red-team prompt injection, hidden OCR text, fake citations and exfiltration requests.
- Show source references and uncertainty; keep human review for consequential conclusions.

## Security acceptance checklist
- [ ] Cross-tenant object access tests pass.
- [ ] Upload validation and resource limits are enforced server-side.
- [ ] Parsing workers have restricted network and filesystem access.
- [ ] Signed URLs are short-lived and object-scoped.
- [ ] No raw document text or secrets in logs/analytics/errors.
- [ ] Prompt-injection regression suite passes.
- [ ] Export authorization and formula-injection protections pass.
- [ ] Deletion covers originals and derived artifacts, subject to documented retention/legal hold.
- [ ] Dependency and secret scans run in CI.
- [ ] Incident response and credential rotation steps are documented.

This baseline does not by itself establish legal compliance or certification. Obtain qualified review for the jurisdictions and customer contracts in scope.
