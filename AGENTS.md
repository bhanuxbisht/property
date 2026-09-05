# RajHomes — Agent Handoff Document

> **Last updated:** 2026-09-05  
> **Purpose:** Onboard any AI agent or developer on what we're building, what's done, and what's next.

---

## Project Summary

A **modern, minimalist real estate website** for an independent property consultant in **Murlipura, Sikar Road, Vidhyadhar Nagar, Jhotwara** and surrounding areas of **Jaipur, Rajasthan**.

**Primary business goal:** Generate **phone calls** and **WhatsApp inquiries** from local buyers, sellers, and renters.

**Secondary goal:** Rank for hundreds of hyper-local SEO queries via programmatic landing pages (e.g. `flats-for-sale-in-murlipura`).

---

## Design Reference

The landing page hero must match the **Homevera-style reference** (provided by client):

| Element | Spec |
|---------|------|
| **Layout** | Dark outer frame → large rounded hero container → full-bleed photo |
| **Navbar** | Glassmorphic pill bar: logo left, Buy/Sell/Rent centered, peach Sign up right |
| **Headline** | `"Live Peacefully"` — large light sans-serif, semi-transparent over photo |
| **Search** | Pill tabs (Buy active = white pill) + white search bar + terracotta Search button |
| **Colors** | Terracotta `#E57347`, Peach `#F3D5C0`, Charcoal `#3D3A36`, Outer bg `#0C0B0A` |
| **Typography** | **Inter** — clean geometric sans-serif throughout |
| **Motion** | Subtle only: fade-in, gentle hero parallax (Framer Motion) |
| **Hero image** | Local WebP at `/public/hero.webp` for LCP + SEO |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Font | Inter (Google Fonts) |
| Database | PostgreSQL via Supabase/Neon *(not yet wired)* |
| Image hosting | Local `/public` + Cloudinary/Supabase Storage *(future)* |
| 360° viewer | Pannellum.js *(future, property detail pages)* |
| Admin auth | Email/password or magic link *(future)* |
| Hosting | Vercel (ISR/SSG) |

---

## Site Structure

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Done (hero + sections) | Landing page — **needs pixel-perfect polish** |
| `/buy` | 🟡 Placeholder | Filterable listing grid — not built |
| `/sell` | 🟡 Placeholder | Valuation lead form — not built |
| `/rent` | 🟡 Placeholder | Rental listings — not built |
| `/about` | 🟡 Placeholder | Agent bio, RERA, trust signals |
| `/contact` | 🟡 Placeholder | Form + Google Business embed |
| `/property/[id]` | ❌ Not started | Gallery, 360°, map, schema markup |
| `/admin` | ❌ Not started | CRUD listings, image upload, 360° upload |
| `/[programmatic-seo]` | ❌ Not started | Locality × type × transaction matrix |

---

## Progress Checklist

### ✅ Completed
- [x] Next.js project scaffold (TypeScript, Tailwind, ESLint)
- [x] Framer Motion + Lucide icons installed
- [x] Site config (`src/lib/site-config.ts`) — phone, WhatsApp, areas, RERA
- [x] Hero section with glass navbar, tabbed search, parallax
- [x] Featured listings, Areas We Serve, Testimonials sections
- [x] Sticky mobile Call + WhatsApp bar
- [x] Footer with contact info
- [x] SEO metadata in root layout
- [x] Hero image as aesthetic Indian luxury villa in Jaipur WebP (`/public/hero.webp`)
- [x] Landing page UI/UX matched to reference (typography, "Lives Peacefully", glassmorphic pill navbar, pill tabs, glowing search CTA, warm ambient framing)
- [x] Placeholder pages for Buy, Sell, Rent, About, Contact

### 🔄 In Progress / Needs Work
- [ ] Update real phone/WhatsApp/RERA in `site-config.ts`

### ❌ Not Started (Full Spec)
- [ ] PostgreSQL schema (listings, localities, images)
- [ ] Admin panel `/admin` — listing CRUD, drag-drop images, 360° upload (Pannellum)
- [ ] Matterport embed field (optional per listing)
- [ ] Mark as Sold/Rented toggle
- [ ] Programmatic SEO pages (ISR/SSG from locality matrix)
- [ ] Schema.org: RealEstateListing, LocalBusiness, BreadcrumbList, FAQPage
- [ ] Auto XML sitemap
- [ ] Internal linking between locality pages
- [ ] Property detail page with Google Map embed
- [ ] Lead forms (Resend/Formspree + WhatsApp notification)
- [ ] Google reviews/rating integration

---

## Key Files

```
src/
├── app/
│   ├── layout.tsx          # Inter font, SEO metadata
│   ├── page.tsx            # Home — assembles all sections
│   ├── globals.css         # Design tokens, glass effects, color palette
│   ├── buy|sell|rent|about|contact/page.tsx  # Placeholders
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx      # Hero + parallax + color grade
│   │   ├── PropertySearch.tsx   # Tabs + search bar
│   │   ├── FeaturedListings.tsx
│   │   ├── AreasWeServe.tsx
│   │   └── Testimonials.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx           # Footer + MobileCTA + TrustBanner
└── lib/
    └── site-config.ts      # ⭐ Edit business details here

public/
└── hero.webp               # Hero background (replace with client image)
```

---

## Design Tokens (CSS Variables)

```css
--outer-bg: #0C0B0A;
--charcoal: #3D3A36;
--charcoal-muted: rgba(61, 58, 54, 0.65);
--terracotta: #E57347;
--terracotta-dark: #D4623A;
--peach: #F3D5C0;
--peach-hover: #EBC9B0;
--glass-nav: rgba(255, 255, 255, 0.20);
--glass-blur: 12px;
```

---

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build (SSG)
npm run lint     # ESLint
```

---

## Hero Image Note

Current hero uses a **placeholder WebP** downloaded from Unsplash (`public/hero.webp`).  
**Client may provide a custom golden-hour Jaipur/property photo** — drop it in as `public/hero.webp` (recommended: 1920×1080 or 2400×1350, WebP, <300KB).

---

## Next Recommended Task

1. Finalize landing page to **pixel-match reference** (current priority)
2. Wire Supabase/Neon + listing schema
3. Build `/admin` panel
4. Programmatic SEO page generator

---

## Business Details (Placeholder — Update Before Launch)

| Field | Value |
|-------|-------|
| Brand | RajHomes |
| Phone | +919876543210 |
| WhatsApp | 919876543210 |
| Email | contact@rajhomes.in |
| RERA | RAJ/P/2024/001234 |
| Areas | Murlipura, Sikar Road, Vidhyadhar Nagar, Jhotwara |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
