# IEEE ESTU SB Backend & Admin Panel Architecture

## 1. Overview
- **Runtime**: Node.js 20 LTS with TypeScript
- **Framework**: Express 5
- **Database**: MongoDB (Atlas or self-hosted), accessed via Mongoose
- **Authentication**: JWT (access + refresh tokens), bcrypt password hashes
- **Integrations**: Google Tables API, Gmail API (via Google OAuth service account or delegated credentials)
- **Email Delivery**: Gmail API with reusable HTML email templates (IEEE color palette)
- **Task Queue**: In-process background jobs for Google/Gmail sync (BullMQ-ready abstraction if Redis introduced later)
- **Frontend Admin**: React client served by existing Vite app, gated behind `/admin-login` + `/admin` views, consuming backend REST APIs

## 2. High-Level Modules
```
server/
  src/
    app.ts               # Express app + middleware wiring
    server.ts            # Entrypoint, DB boot, graceful shutdown
    config/
      env.ts             # Env var parsing/validation
      database.ts        # Mongoose connection setup
    models/              # Mongoose schemas
    controllers/         # Request handlers
    routes/              # Route definitions
    services/            # Business logic + integrations
    middleware/          # Auth, rate limit, validation, error handling
    validators/          # Zod schemas + helpers
    utils/               # Shared helpers (slugify, logger, email renderer)
    jobs/                # Async workers for Google/Gmail sync
    templates/           # HTML email templates
    types/               # Shared TS types/interfaces
```

## 3. Data Model Summary
- **AdminUser**: `{ email, passwordHash, role: "super" | "editor", lastLoginAt }`
- **Event**: Metadata + `formFields[]` describing dynamic question set, `googleTableId`
- **EventApplication**: Applicant metadata, `answers[]`, status, references `Event`
- **BlogPost**: Title, slug, excerpt, body, heroImage, author, publishedAt, status
- **MembershipApplication**: Applicant profile, academic info, status, `googleRowId`
- **CommitteeSelection**: Links membership applicant to committee choices
- **SponsorshipLead**: Contact info, source, `calendarLinkSent` flag
- **ContactMessage**: Sender info, message, delivery status
- **NewsletterSubscriber**: Email, consent flags, verification token, `googleRowId`

Dynamic form questions use a consistent structure:
```
{
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox" | "radio" | "file";
  required: boolean;
  options?: string[];
  helperText?: string;
}
```

## 4. REST API Surface
- `POST /api/auth/login` – Admin email/password -> tokens
- `POST /api/auth/refresh` – Rotate tokens
- `GET /api/events` (public) – List events with lightweight metadata
- `GET /api/events/:slug` – Single event + form fields (public)
- `POST /api/events` – Create event (admin)
- `PATCH /api/events/:id` – Update event (admin)
- `DELETE /api/events/:id` – Delete event (admin)
- `POST /api/events/:id/forms` – Mutate form fields
- `POST /api/events/:slug/applications` – Submit event application (public, reCAPTCHA)
- `GET /api/event-applications` – Admin list with filters/export
- `POST /api/blog` / `PATCH /api/blog/:id` / `DELETE /api/blog/:id`
- `GET /api/blog` (public) – Feed for frontend blog section
- `POST /api/membership/apply` – Membership form submission
- `POST /api/membership/committee-selection` – Follow-up selection
- `POST /api/sponsorship/leads` – Collect sponsor interest; triggers email
- `POST /api/contact/messages` – Contact form, fan-out email delivery
- `POST /api/newsletter/subscribe` – Adds to list + optional Google Groups push
- `GET /api/dashboard/metrics` – Aggregate stats for admin overview

All admin routes sit under `/api/admin/*` with JWT guard and role-based authorization.

## 5. Integrations & Background Jobs
- **Google Tables**: `GoogleTablesService` wraps REST calls. On new event creation, auto-create table (or worksheet) and record `googleTableId`. Form submissions enqueue background jobs that append rows.
- **Gmail API**: `EmailService` builds HTML via templates and dispatches via Gmail `users.messages.send`.
- **Optional Google Groups**: `MailingListService` can add newsletter subscribers using the Admin SDK Directory API.
- **Queue Flow**: Public form submission persists to MongoDB synchronously, enqueues Google/Gmail sync job. Worker retries with exponential backoff and logs failures.

## 6. Security & Compliance
- Rate limiting via `express-rate-limit` on public form endpoints.
- Google reCAPTCHA v3 verification on form submissions (`recaptchaService.verify`).
- Input validation with Zod; sanitized before persistence.
- Helmet + CORS (restricted origins) + compression.
- Passwords hashed with bcrypt (12 rounds). Refresh tokens stored as hashed secrets to allow revocation.
- Audit fields: `createdAt`, `updatedAt`, `createdBy`, `updatedBy`.
- `.env` holds secrets (DB URI, JWT secret, Google credentials, email addresses).

## 7. Admin Panel UX (Frontend)
- `/admin-login`: Form that hits `POST /api/auth/login`.
- `/admin`: Protected area after JWT stored in `localStorage` (access) + `httpOnly` refresh cookie (via backend).
- Sections: Dashboard metrics, Events manager (CRUD + form builder), Submissions viewer, Blog manager with markdown editor, Membership & Sponsorship inboxes, Settings (API keys, email templates).
- Uses React Query + context for auth; reuses existing design system + Tailwind tokens.

## 8. Deployment & Ops
- Backend deployable to Render/Railway. Provide `Procfile`/Dockerfile.
- Frontend stays on Vercel/Netlify; env `VITE_API_BASE_URL` points to backend.
- Use `pm2` or platform process manager. Configure health check route `/health`.
- Logging via `pino` (JSON) with request correlation IDs.
- Future enhancements: swap to Postgres/Prisma, external queue (Redis/BullMQ), webhooks for Slack notifications.

