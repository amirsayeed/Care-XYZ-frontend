# Care.xyz Frontend

Web application for **Care.xyz**, a platform for booking babysitting, elderly care, and sick-person care at home. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and HeroUI. It connects to a separate Express API.

**Live site:** https://care-xyz-frontend-one.vercel.app
**Backend API:** https://care-xyz-backend-psi.vercel.app
**Backend Repo:** https://github.com/amirsayeed/Care-XYZ-Backend

---

## Features

- Responsive homepage with a banner, feature highlights, service cards, and testimonials
- Service detail pages with pricing and included features
- Email and password sign-in and registration
- Google sign-in with a server-side OAuth flow
- Protected booking and "My bookings" pages
- Booking form with cascading location selects and a live cost summary
- Booking details page showing status, cost, location, and invoice status
- Cancel pending bookings through a confirmation dialog
- Account menu with name, email, and logout
- Responsive navbar with a mobile menu
- Page metadata and Open Graph tags for the homepage and service pages
- Custom 404 page

---

## Tech Stack

| Area           | Technology                                    |
| -------------- | --------------------------------------------- |
| Framework      | Next.js 16 (App Router)                       |
| Language       | TypeScript                                    |
| Styling        | Tailwind CSS v4                               |
| UI components  | HeroUI v3 (`@heroui/react`, `@heroui/styles`) |
| Validation     | Zod (installed, used for form-level rules)    |
| Authentication | JWT in an HTTP-only cookie, Google OAuth 2.0  |
| Images         | `next/image` with remote host allowlist       |
| Deployment     | Vercel                                        |

---

## Project Structure

```
care-xyz-frontend/
├── app/
│   ├── layout.tsx                    # Root layout, header, footer, metadata
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Tailwind and HeroUI styles
│   ├── not-found.tsx                 # 404 page
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── service/[serviceId]/page.tsx  # Service details (public)
│   ├── booking/[serviceId]/page.tsx  # Booking form (protected)
│   ├── my-bookings/
│   │   ├── page.tsx                  # Bookings list (protected)
│   │   └── [bookingId]/page.tsx      # Booking details (protected)
│   └── api/auth/google/
│       ├── route.ts                  # Starts Google sign-in
│       └── callback/route.ts         # Completes Google sign-in
├── components/
│   ├── auth/                         # Auth forms, auth shell, Google button
│   ├── booking/                      # Booking form
│   ├── bookings/                     # Booking card, status badge
│   ├── home/                         # Hero, hero actions, features, services, testimonials
│   ├── layout/                       # Site nav, header, footer, account menu
│   ├── services/                     # Service card
│   └── ui/                           # Shared form field, location select
├── lib/
│   ├── actions/
│   │   ├── auth.ts                   # Login, register, logout Server Actions
│   │   └── bookings.ts               # Create and cancel booking Server Actions
│   ├── api.ts                        # Typed client for the Express API
│   ├── constants.ts                  # Session cookie name
│   ├── current-user.ts               # Fetches the signed-in user
│   ├── google-oauth.ts               # OAuth helpers
│   ├── nav.ts                        # Navigation links
│   ├── session.ts                    # Cookie read, write, and clear helpers
│   └── site.ts                       # Site-wide constants
├── types/
│   └── api.ts                        # Types matching the API responses
├── proxy.ts                          # Route protection for private pages
├── next.config.ts                    # Image host allowlist
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20.9 or later (required by Next.js 16)
- The Care.xyz backend running locally, or its live URL
- A Google OAuth client, if you want Google sign-in

### Installation

```bash
git clone https://github.com/amirsayeed/Care-XYZ-frontend.git
cd care-xyz-frontend
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```dotenv
# Backend API. Server-side only, never sent to the browser.
API_URL=http://localhost:5000

# This site's public URL. Used for Google redirects and metadata.
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (server-side only)
GOOGLE_CLIENT_ID=<your-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

| Variable               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `API_URL`              | Base URL of the Express API. Read only on the server.             |
| `NEXT_PUBLIC_APP_URL`  | Public URL of this site. Must match the production URL on Vercel. |
| `GOOGLE_CLIENT_ID`     | OAuth client ID. Must match the backend's `GOOGLE_CLIENT_ID`.     |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret. Keep it private.                             |

> **Never commit `.env.local`.** `.gitignore` must include `.env*.local`.

> **Restart after changes.** Next.js reads environment variables and `next.config.ts` only at startup. `NEXT_PUBLIC_` values are built into the app, so redeploy after changing them on Vercel.

### Google OAuth Setup

1. In Google Cloud Console, create an OAuth client of type **Web application**.
2. Under **Authorized redirect URIs**, add both:
   ```
   http://localhost:3000/api/auth/google/callback
   https://<your-domain>/api/auth/google/callback
   ```
3. If the consent screen is in **Testing** mode, add your account under **Test users**.

### Running Locally

```bash
npm run dev
```

Open http://localhost:3000. Start the backend on port 5000 first, or the pages that load data will show errors.

### Build

```bash
npm run build
npm start
```

---

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Run the production build     |
| `npm run lint`  | Run ESLint                   |

---

## Architecture

### Data flow

The browser never calls the Express API directly. Every request goes through the Next.js server:

```
Browser  →  Next.js (Server Components, Server Actions, Route Handlers)  →  Express API  →  MongoDB
```

- **Reads** happen in Server Components through `apiFetch` in `lib/api.ts`.
- **Writes** happen in Server Actions in `lib/actions/`, which forward the request to the API.
- The API base URL and JWT stay on the server.

### Authentication

- Sign-in stores the backend's JWT in an **HTTP-only, SameSite=Lax cookie** named `care_session`, with a 7-day lifetime. JavaScript can't read it.
- `proxy.ts` checks that the cookie exists before `/booking` and `/my-bookings` render. It doesn't verify the token. The API verifies the token on every protected request, so an expired or forged token gets a 401.
- Logging out clears the cookie through the `logoutAction` Server Action.

### Google sign-in

1. `GET /api/auth/google` creates a random `state` value, stores it in a short-lived cookie, and redirects to Google.
2. Google redirects back to `GET /api/auth/google/callback` with a code.
3. The callback checks the `state` value against the cookie. This blocks forged callbacks.
4. The server exchanges the code for an ID token, using the client secret.
5. The server sends the ID token to the API at `POST /api/auth/google`. The API verifies it and returns a JWT.
6. The JWT is stored in the same cookie as email sign-in, and the user goes to the page they came from.

### Route protection

| Route                                    | Protection                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `/booking/*`, `/my-bookings/*`           | `proxy.ts` redirects to `/login?next=…` when no cookie is present. The API also checks the token. |
| `/service/*`, `/`, `/login`, `/register` | Public                                                                                            |

The `next` parameter is limited to relative paths, so it can't redirect users to another site.

### Rendering strategy

| Technique                              | Where it's used                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Server Components** (default)        | Homepage sections, service and booking pages, bookings list and details, header and footer account links |
| **Client Components** (`"use client"`) | Login and register forms, booking form and location selects, booking card, navbar, account menu          |
| **Static prerendering**                | Homepage shell, login, register, and 404 pages                                                           |
| **Request-time rendering**             | Pages that read the session cookie or dynamic route params                                               |
| **Streaming with `Suspense`**          | Each data section loads in its own boundary, so the page shell appears first                             |
| **Incremental caching**                | Services, locations, and testimonials use `revalidate` (one day). They change rarely.                    |
| **Live data**                          | Bookings use `cache: "no-store"`, since they are per-user and change often                               |
| **Parallel fetching**                  | The booking page loads the service and location tree with `Promise.all`                                  |
| **Server Actions**                     | Login, register, logout, create booking, cancel booking                                                  |
| **Route Handlers**                     | Google sign-in start and callback                                                                        |
| **Metadata API**                       | Static metadata on the root layout and homepage, and `generateMetadata` on service pages                 |
| **`notFound()`**                       | Unknown or malformed service and booking IDs                                                             |
| **`next/image`**                       | Service images, testimonial avatars, and the hero banner                                                 |

### Caching

`lib/api.ts` exports `CATALOG_REVALIDATE` (one day, in seconds). Catalog requests pass it as `revalidate`, and the API client then caches the response. To see catalog changes immediately during development, set it to a small value such as `10`.

---

## Pages

| Route                      | Access    | Description                                                     |
| -------------------------- | --------- | --------------------------------------------------------------- |
| `/`                        | Public    | Banner, features, services, testimonials                        |
| `/service/[serviceId]`     | Public    | Service details, features, price, and booking button            |
| `/login`                   | Public    | Email and Google sign-in. Accepts `?next=` and `?error=google`. |
| `/register`                | Public    | Account creation. Accepts `?next=`.                             |
| `/booking/[serviceId]`     | Signed in | Duration, location, address, and live total                     |
| `/my-bookings`             | Signed in | All bookings with status, cost, and cancel action               |
| `/my-bookings/[bookingId]` | Signed in | Full booking details                                            |
| `*`                        | Public    | Not found page                                                  |

---

## Forms and Validation

- Inputs use HeroUI `TextField`, `Label`, `Input`, and `Description`.
- `required`, `minLength`, and `pattern` attributes give immediate browser feedback.
- The API validates every request again with Zod, so the frontend rules are a convenience, not a security boundary.
- Server errors from the API appear in the red message box above the submit button.
- The register form enforces: 2+ character name, 10+ character contact, 13 to 17 digit NID, and a password with 6+ characters including one uppercase and one lowercase letter.

### Location selects

The division, district, city, and area fields are dependent selects. Each level filters the next, and changing a parent clears the children. The selects are built on HeroUI `Select` with a shared `LocationSelect` component.

---

## Images

Remote image hosts must be listed in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "randomuser.me" },
    { protocol: "https", hostname: "i.ibb.co.com" },
  ],
},
```

Add a host here before using an image from it. Restart the dev server after changing this file.

The hero banner image URL is set in `lib/site.ts` as `HERO_IMAGE_URL`.

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo. The Next.js preset is detected automatically.
3. Add these variables under **Settings → Environment Variables**:

   | Key                    | Value                                |
   | ---------------------- | ------------------------------------ |
   | `API_URL`              | Backend URL, with no trailing slash  |
   | `NEXT_PUBLIC_APP_URL`  | Frontend URL, with no trailing slash |
   | `GOOGLE_CLIENT_ID`     | OAuth client ID                      |
   | `GOOGLE_CLIENT_SECRET` | OAuth client secret                  |

4. Deploy. After changing any variable, redeploy with **Use existing Build Cache** turned off.
5. Add the production callback to Google Cloud:
   ```
   https://<your-domain>/api/auth/google/callback
   ```

---

## Troubleshooting

| Problem                                       | Likely cause                                                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Pages show "fetch failed"                     | Backend isn't running, or `API_URL` is wrong                                                                     |
| Google sign-in redirects to localhost         | `NEXT_PUBLIC_APP_URL` on Vercel is still `localhost`. Fix it and redeploy.                                       |
| `redirect_uri_mismatch` from Google           | The callback URL isn't listed under Authorized redirect URIs, or it differs by protocol, port, or trailing slash |
| Images don't load                             | The image host is missing from `remotePatterns` in `next.config.ts`                                              |
| Changes to env variables have no effect       | Restart `npm run dev`, or redeploy on Vercel                                                                     |
| Stale service prices                          | Catalog data is cached for a day. Lower `CATALOG_REVALIDATE` during testing.                                     |
| Booking page redirects to login after sign-in | The cookie wasn't set. Check that `NEXT_PUBLIC_APP_URL` is correct and cookies are not blocked.                  |

---
