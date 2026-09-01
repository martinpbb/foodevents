---
applyTo:
  - "src/**"
  - ".github/workflows/**"
  - ".env*"
---

# Security and environment instructions

Foodevents is currently a client-side application.

## Secrets

Never commit or expose:

- private API keys;
- passwords;
- access tokens;
- service credentials;
- private signing keys;
- secret webhook credentials.

Any value included in the browser bundle must be treated as public.

`VITE_*` environment variables are available to client-side code after build and must never contain true secrets.

## GitHub Actions and Environments

GitHub Actions and GitHub Environment secrets may be used for trusted CI or deployment operations.

A secret is no longer secret if its value is injected into generated frontend JavaScript, HTML, or another publicly deployed asset.

Do not expose a CI secret to the React application merely because it originates from a GitHub Environment.

## External services

Before integrating an external service, determine whether its credential is designed to be public or private.

If a service requires a private credential, client-side React code cannot safely hold it.

In that case, require one of:

- a trusted server-side component;
- a serverless function;
- a secure provider-hosted frontend integration designed for public clients.

Do not simulate security by obscuring a secret in frontend code.