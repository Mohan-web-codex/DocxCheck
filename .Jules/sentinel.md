## 2023-10-01 - Prevented Insecure JWT Secret Fallback
**Vulnerability:** A hardcoded `fallback_secret_key` was used to sign JWTs if `JWT_SECRET` was not defined in the environment. This is a critical security vulnerability as it uses a known, easily guessable secret for authentication tokens, potentially leading to authentication bypass.
**Learning:** The application fell back to a hardcoded string instead of securely failing when the required `JWT_SECRET` was absent, exposing it to trivial exploitation if misconfigured.
**Prevention:** Ensure required secrets (like JWT secrets) fail closed by throwing an error or exiting the process on startup if they are missing. Avoid adding hardcoded default secrets for production-critical cryptographic functions.
