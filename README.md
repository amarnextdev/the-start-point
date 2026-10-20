# English Classes — Website & Admin

Marketing website and admin dashboard for an offline English classes institute.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · TanStack Query · Motion · MongoDB + Mongoose · Cloudinary · Resend

## Getting started

Requirements: **Node.js 20.9+** and npm.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open http://localhost:3000 for the website and http://localhost:3000/admin for the admin.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier (with Tailwind class sorting) |

## Folder structure

```
src/
├── app/                    # Routes only — thin files that compose features
│   ├── (site)/             # Public website: home, courses, about, contact
│   ├── admin/login/        # Staff sign-in
│   ├── admin/(panel)/      # Protected admin area (sidebar + top bar)
│   └── api/                # Route handlers used by TanStack Query (phase 3+)
├── components/
│   ├── ui/                 # shadcn/ui primitives (themed to the brand)
│   ├── layout/             # Header, footer, mobile nav, admin sidebar/top bar
│   ├── shared/             # Container, Section, SectionHeading, PageHero, StatusBadge…
│   ├── motion/             # Reveal, FloatingShape, CountUp
│   └── skeletons/          # Loading states for tables, cards, stats, forms
├── features/               # One folder per feature (components, hooks, api, service, schema)
├── models/                 # Mongoose models (phase 3)
├── lib/                    # utils, query client & keys, env validation, whatsapp…
├── providers/              # TanStack Query, tooltips, toasts
├── hooks/                  # Reusable client hooks
├── config/                 # Site content fallbacks and navigation
└── types/                  # Shared types and enums
```

### Conventions

- **Feature folders** keep everything for one feature together:
  `components/` (UI) · `hooks/` (TanStack Query) · `api.ts` (browser fetchers) ·
  `service.ts` (server-only DB logic) · `schema.ts` (Zod, shared by form + server) · `types.ts`.
- **Website pages** are Server Components that read data on the server (fast, SEO-friendly).
- **Admin screens** use TanStack Query for caching, background refetch and optimistic updates.
  All query keys come from `src/lib/query-keys.ts`.
- **Loading states**: every route has a `loading.tsx`, and every data component has a matching skeleton.
- File names are kebab-case; database code imports `server-only`.

## Design tokens

Defined in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#13203F` | Text, dark sections, secondary buttons |
| `cream` | `#F6F2EA` | Page background |
| `coral` | `#FF6A3D` | Primary CTA (navy text on top) |
| `saffron` | `#FFC145` | Highlights |
| `clay` | `#B93A12` | Accent text (eyebrows, "face to face.") |

Fonts: **Bricolage Grotesque** (headings) and **Figtree** (body), loaded with `next/font`.

## Placeholders

Bracketed values such as `[INSTITUTE NAME]` and `[PHONE NUMBER]` are placeholders in
`src/config/site.ts`. In phase 6 they move to the database so the owner can edit them
from **Admin → Settings**.

## Build phases

- [x] **1. Setup** — project config, theme, shadcn/ui, TanStack Query, layouts, skeletons
- [x] **2. Website UI** — all home sections, courses, about, contact (enquiry form validates; saving arrives in phase 3)
- [ ] **3. Database + enquiries** — MongoDB models, enquiry form, email alert
- [ ] **4. Auth + dashboard** — staff login (owner/staff roles), protected admin, live stats
- [ ] **5. Admin management** — enquiries, batches, students, fees, staff
- [ ] **6. Content + media** — editable site content, Cloudinary uploads
- [ ] **7. Polish + deploy** — SEO, sitemap, OG images, Vercel
