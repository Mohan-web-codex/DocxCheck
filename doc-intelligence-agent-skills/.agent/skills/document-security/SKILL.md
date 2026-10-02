---
name: document-security
description: Threat-model and secure the document workspace, APIs, file-processing pipeline, AI features, exports and multi-tenant data.
---

# Document Security Skill — DocuScope

## Security objective
Documents may contain confidential legal material, unpublished research, personal data, contracts, and privileged communications. Default to least privilege, private storage, minimal retention, and verifiable auditability.

Use current authoritative versions of OWASP ASVS, OWASP Top 10, OWASP API Security Top 10, OWASP LLM guidance, NIST guidance, and applicable privacy/legal requirements. Verify current versions and exact control identifiers before claiming compliance. This skill is an engineering checklist, not a certification.

## Threat model before implementation
For each feature, identify:
- assets: originals, extracted text, annotations, model prompts/outputs, credentials, audit records;
- actors: anonymous attacker, authenticated malicious user, compromised account, malicious collaborator, compromised provider, poisoned document;
- trust boundaries: browser/API, API/queue, worker/storage, worker/model provider, workspace/tenant boundaries;
- attack paths, likelihood/impact, mitigations, residual risk and tests.

Consider STRIDE categories: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege.

## Identity and authorization
- Require authentication for all non-public endpoints.
- Authorize every document, job, comparison, export, annotation and signed URL against workspace membership and role.
- Deny by default. Never trust a client-supplied workspace ID or document ID.
- Prevent IDOR/BOLA by checking object ownership on every read and write.
- Use least-privilege roles (owner/admin/editor/reviewer/reader) and verify role transitions server-side.
- Require MFA/SSO options for enterprise deployments where feasible.
- Use short-lived sessions and signed URLs; never expose bucket/object keys as authorization.
- Add rate limits and abuse controls to login, upload, export and expensive AI endpoints.

## File and parser security
- Allowlist supported formats; verify MIME type and file signature, not extension alone.
- Enforce upload size, page count, decompressed size, nesting depth, processing time, image dimensions and archive expansion limits.
- Store uploads in private quarantine; scan before processing when feasible.
- Run parsers/OCR in isolated workers with restricted filesystem/network access and resource limits.
- Defend against ZIP bombs, malformed PDFs, XML external entities, parser exploits, polyglot files and decompression bombs.
- Do not execute macros, scripts, embedded files, JavaScript, or external links from uploaded documents.
- Disable outbound network access from parsers unless explicitly required.
- Use generated storage keys; sanitize display filenames and never use them as filesystem paths.
- Render extracted text as escaped text. Sanitize any allowed rich-text format with a maintained allowlist sanitizer.

## Multi-tenant data protection
- Every database query and object-storage operation must be scoped to an authorized workspace.
- Add integration tests for cross-tenant reads, writes, job polling, exports, search, signed URLs and cache keys.
- Consider PostgreSQL row-level security as defense in depth; set tenant context safely per transaction.
- Encrypt traffic in transit and storage at rest. Manage encryption keys outside the database and source tree.
- Never place document content, access tokens, signed URLs, passwords or secrets in logs, analytics, crash reports or URLs.
- Use synthetic/redacted data in development and test fixtures.
- Define deletion semantics for originals, derived text, embeddings, generated outputs, caches, backups and provider retention.
- Make provider data-use/retention terms explicit. Do not send confidential content to a third-party model without an approved policy and user/workspace authorization.

## AI and prompt-injection defenses
Treat every uploaded document, extracted passage, web source, OCR result, and retrieved chunk as untrusted data—not as instructions.
- Separate system instructions from document content structurally and with clear delimiters.
- Never allow document text to alter tool permissions, system prompts, authorization decisions, or export destinations.
- The model must not choose arbitrary URLs, filesystem paths, SQL, shell commands, or storage keys.
- Keep tool access allowlisted and least-privileged; require explicit user approval for consequential actions.
- Validate model output against a strict schema and verify all referenced document/chunk IDs server-side.
- Use retrieval allowlists and workspace-scoped search.
- Add adversarial tests with documents containing instructions such as “ignore previous instructions,” data-exfiltration requests, fake citations, and hidden text.
- Do not treat model-generated summaries or similarity explanations as trusted facts without source references and review.

## SSRF, injection and API security
- Do not fetch URLs embedded in documents by default. If URL fetching is a feature, use an allowlist, block private/link-local/loopback IP ranges, re-check redirects and DNS resolution, and set strict timeouts/size limits.
- Use parameterized SQL and safe ORM APIs.
- Validate all inputs with typed schemas and size limits.
- Protect browser sessions with appropriate SameSite, Secure and HttpOnly cookie settings; implement CSRF protections when cookie-authenticated state-changing requests are used.
- Configure restrictive CORS, CSP, frame protections, content-type protections and secure headers.
- Avoid leaking stack traces, database errors, internal prompts, provider responses or secrets to clients.
- Use dependency lockfiles and automated vulnerability scanning.

## Secrets and supply chain
- Keep secrets in environment/secret managers, never in committed files or frontend bundles.
- Use separate credentials and least privilege per environment.
- Rotate exposed secrets and document the procedure.
- Pin dependencies where practical; review critical updates and transitive dependencies.
- Generate an SBOM for release builds when feasible.
- Protect CI permissions, pin third-party actions, and never expose deployment secrets to untrusted pull requests.

## Audit and incident response
Log security-relevant events: login/session changes, membership and role changes, document upload/download/delete, comparison/export creation, policy changes, and administrative access.
- Record actor, workspace, action, target, timestamp, request/job ID and outcome.
- Keep audit logs append-only or tamper-evident where feasible.
- Do not log raw document content.
- Define alerting, containment, credential rotation, evidence preservation, user notification and recovery procedures.
- Make retention and legal-hold behavior explicit; deletion must not silently defeat an active legal hold.

## Required security review output
For every review, produce:
1. scope and assumptions;
2. assets and trust boundaries;
3. findings with severity (Critical/High/Medium/Low/Informational), evidence, impact, and exploit preconditions;
4. concrete remediation and regression test;
5. residual risk and owner;
6. controls not tested.

Do not claim “secure,” “compliant,” or “penetration-tested” without evidence. Flag uncertain items for human verification.
