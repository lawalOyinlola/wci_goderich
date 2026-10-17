# WCI Goderich Church Website

A comprehensive, modern web platform for WCI (Winners Chapel International) Goderich, designed to connect the church community, share resources, and facilitate engagement. Built with Next.js 16, this full-featured website serves as the digital hub for church members and visitors, offering everything from service information and event calendars to prayer requests, testimonies, and educational resources.

![WCI Goderich](public/lfc_logo.png)

## 📖 About This Application

The WCI Goderich Church Website is a complete digital solution for church management and community engagement. It provides:

- **Community Connection**: Members can share testimonies, celebrate birthdays, submit prayer requests, and stay connected with church activities
- **Resource Access**: Digital library, media content, sermon archives, and educational materials
- **Ministry Information**: Detailed pages for various ministries including Children's Ministry, Teens Church, Youth Alive, Businessmen Fellowship, and more
- **Event Management**: Upcoming events calendar, service schedules, and special programs
- **Interactive Features**: Photo galleries, interactive maps, contact forms, and online giving integration
- **Educational Programs**: Information about WOFBI (Word of Faith Bible Institute), educational institutions, and learning resources

The application is built with performance and accessibility in mind, featuring optimized images, server-side rendering, and a responsive design that works seamlessly across all devices.

## 🚧 Feature Status

A few features are fully built but intentionally switched off until real content replaces the placeholder data:

- **Homepage Upcoming Events & Sermons** - `UpcomingEvents` and `FeaturedSermons` exist as components but are commented out in `app/page.tsx`; their data in `lib/constants` is template content
- **Testimonies browsing** - both the homepage testimonies teaser (`TestimoniesWrapper`) and the dedicated `/testimonies` filtering/listing view (`TestimoniesContentWrapper`) are commented out. Submitting a new testimony via `/testimonies` still works
- **`/events`** and **`/library`** currently render a "Coming Soon" placeholder (`components/ComingSoon.tsx`) rather than real content
- **Sermons on `/media`** are gated behind `SERMONS_ENABLED` in `lib/constants/media.ts` (currently `false`)

Turn one on by uncommenting the relevant import/JSX and replacing the sample data with real records.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Yup validation
- **Database**: Supabase (Postgres) for birthdays, testimonies, prayer requests, and contact messages
- **Media**: Cloudinary for image and video hosting, with adaptive bitrate (HLS) video streaming via hls.js
- **Maps**: Leaflet (vanilla, lazy-loaded)
- **Animations**: Motion (Framer Motion) & GSAP
- **Icons**: Phosphor Icons & Lucide React
- **Theme**: Dark/Light mode support with next-themes
- **Package Manager**: pnpm

## ✨ Key Features

### 🏠 Homepage Sections

- 🎠 **Hero Carousel** - Dynamic image carousel with auto-scroll showcasing church highlights
- 🎯 **Features Section** - Highlight key church features and values
- 👋 **Welcome Section** - Church introduction, mission, and vision
- ⛪ **Church Services** - Service times, schedules, and worship information
- 📅 **Upcoming Events** - Event calendar with detailed listings and special programs _(built, currently disabled, see [Feature Status](#-feature-status))_
- 📖 **Sermons** - Sermon archive with audio/video content access _(built, currently disabled, see [Feature Status](#-feature-status))_
- 💝 **Donations** - Secure online giving and tithe integration
- 📸 **Gallery** - Photo gallery preview carousel showcasing church events and activities
- 🎂 **Birthdays** - Member birthday celebrations and recognition, with sample fallback data when no birthdays are on file
- 💬 **Testimonies** - Share and read testimonies of God's faithfulness _(browsing built, currently disabled, see [Feature Status](#-feature-status))_
- 📍 **Church Location** - Interactive Leaflet map with a church marker, one-tap "Get Directions", and a "View My Location" geolocation pin

### 📄 Dedicated Pages

- **About** - Church history, mission & vision, the 12 Pillars of our Commission (accordion with a tooltip-guided expand/collapse), a ministries overview, and the leadership team
- **Services** - Sunday service flow, what to expect as a first-time guest, and service times
- **Ministries** - Comprehensive pages for Children's Ministry (Ages 3-12), Teens Church, Youth Alive (Ages 13-18), and Businessmen Fellowship
- **Education** - Educational programs, WOFBI enrollment (with a 40th-anniversary hero), Nigerian and Sierra Leone schools
- **Prayer** - Prayer request submission, answered prayers, and prayer points
- **Testimonies** - Share a testimony (browsing/filtering is built but currently disabled, see [Feature Status](#-feature-status))
- **Gallery** - Full photo gallery with infinite scroll, a randomized (per-visit) image order that stays consistent across pages, and event-based organization
- **Giving** - Ways to give, giving details, and Living Faith Worldwide giving information
- **Contact** - Contact forms, FAQs, and church information
- **Resources**:
  - Media Library - Church videos streamed via Cloudinary HLS with a next/previous playlist modal, plus live streams (sermon archive built but currently disabled, see [Feature Status](#-feature-status))
  - Book Library - _"Coming Soon" placeholder, not yet built out_
  - Service Units - Information about volunteer opportunities
  - Satellite Fellowship (WSF) - Small group locations and information
  - Events - _"Coming Soon" placeholder, not yet built out_
  - Location - Church location and directions

### 🎨 User Experience

- 🌓 **Theme Support** - Dark and light mode with system preference detection
- 📱 **Responsive Design** - Mobile-first, fully responsive across all devices
- ⚡ **Performance Optimized** - Fast load times, optimized images, and efficient rendering
- ♿ **Accessible** - WCAG AA color contrast, semantic heading order, a single `<main>` landmark per page, and 44px touch targets
- 🔍 **SEO Optimized** - Per-page metadata, Open Graph & Twitter cards, JSON-LD structured data, `sitemap.xml`, `robots.txt`, and a web manifest
- 🎭 **Smooth Animations** - Engaging animations using Motion (Framer Motion) and GSAP

## 📋 Prerequisites

- Node.js 20.9+
- pnpm 11+

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wci_goderich
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📜 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## 📁 Project Structure

```
wci_goderich/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Root layout with metadata, JSON-LD, and providers
│   ├── page.tsx                  # Home page with all sections
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── sitemap.ts                # Generated sitemap.xml
│   ├── robots.ts                 # Generated robots.txt
│   ├── manifest.ts               # Generated web app manifest
│   ├── api/                      # Route handlers: birthdays, contact, gallery,
│   │                             # prayer, testimonies, upload, map-tiles proxy
│   └── (routes)/                 # Route groups
│       ├── about/                # About page and sections
│       ├── contact-us/           # Contact page with forms and FAQs
│       ├── education/            # Education programs and schools
│       ├── events/               # Events page (Coming Soon placeholder)
│       ├── gallery/              # Photo gallery with loading states
│       ├── giving/               # Giving / online donations
│       ├── library/              # Digital library (Coming Soon placeholder)
│       ├── location/             # Church location
│       ├── media/                # Media library (church videos, sermons, live streams)
│       ├── ministries/           # Ministry pages (children, teens, youth, businessmen)
│       ├── prayer/               # Prayer requests and sessions
│       ├── service-units/        # Service units information
│       ├── services/             # Church services
│       ├── testimonies/          # Testimonies with forms and filtering
│       ├── wofbi/                # WOFBI enrollment and information
│       └── wsf/                  # Satellite Fellowship
├── components/                    # React components
│   ├── form/                     # Form components and inputs
│   ├── homePage/                 # Home page sections
│   │   ├── sections/             # Individual homepage sections
│   │   ├── BirthdaysWrapper.tsx  # Birthdays with Supabase (+ sample fallback)
│   │   └── TestimoniesWrapper.tsx # Testimonies with Supabase (not currently rendered)
│   ├── layouts/                  # Layout components
│   │   ├── footer/               # Footer components
│   │   └── navbar/               # Navigation components and menu items
│   ├── motion/                   # Reveal, Stagger, Parallax, AnimatedText helpers
│   └── ui/                       # Reusable UI components (Radix UI based)
├── lib/                          # Utilities, constants, and config
│   ├── constants/                # Content constants + site/SEO config (site.ts)
│   ├── data/                     # Server-side data fetchers (Cloudinary gallery, Supabase birthdays/testimonies)
│   ├── types/                    # TypeScript type definitions
│   ├── supabase/                 # Supabase client/server instances
│   ├── hooks/                    # Shared React hooks (e.g. useSmoothScroll)
│   ├── cloudinary.ts             # Server-side Cloudinary SDK config and upload/list helpers
│   ├── seo.ts                    # Metadata helpers and JSON-LD builders
│   ├── utils.ts                  # Shared helpers (cn, getDirectionsUrl, etc.)
│   └── utils/                    # Domain utilities (cloudinary URLs, email, shuffle, rate-limit, etc.)
├── public/                       # Static assets
│   └── images/                   # Image files and assets
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS + Tailwind CSS 4 setup
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 Key Components

### Layout Components

- **NavBar** - Responsive navigation with dropdown menus, mobile hamburger menu, and smooth scrolling
- **Footer** - Multi-column footer with organized links, social media integration, and developer attribution

### Homepage Components

- **HeroCarousel** - Auto-scrolling image carousel with fade transitions
- **Features** - Highlighted church features and values
- **Welcome** - Church introduction and mission statement
- **ChurchServices** - Service times and worship information
- **UpcomingEvents** - Event listings with dates and details _(built, not currently rendered)_
- **FeaturedSermons** - Sermon archive with media player integration _(built, not currently rendered)_
- **Donation** - Online giving interface
- **Gallery** - Photo gallery preview with lazy loading and carousel
- **BirthdaysWrapper** - Member birthday celebrations with Supabase integration (falls back to sample data when empty)
- **TestimoniesWrapper** - Testimonies display with filtering _(built, not currently rendered)_
- **ChurchLocationMap** - Interactive Leaflet map with a church marker, "Get Directions" links, and a live "View My Location" geolocation pin

### Form & Input Components

- **AvatarCropUploader** - Image upload and cropping functionality for user avatars
- **Form Components** - Reusable form fields with React Hook Form and Yup validation
- **PrayerRequestForm** - Prayer request submission with validation
- **ShareTestimonyForm** - Testimony submission form with image upload
- **ContactForm** - Contact form with email integration

### UI Components

- **Reusable UI Components** - Built with Radix UI primitives for accessibility
- **VideoDialog / VideoModal** - Adaptive HLS video player (hls.js, with a progressive mp4 fallback) supporting a next/previous playlist queue, arrow-key navigation, and auto-advance
- **Loading Skeletons** - Suspense boundaries with skeleton loaders for better UX
- **Error Boundaries** - Graceful error handling for async components

## 🌐 Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import your project on Vercel
3. Vercel will automatically detect Next.js and configure the build settings

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 Configuration

### Image & Video Sources

`remotePatterns` in `next.config.ts` controls which hosts `next/image` may optimize. Video files (`.m3u8`/`.mp4`) play through a `<video>` element via hls.js and aren't affected by this list. Only their Cloudinary-generated poster images are.

- **res.cloudinary.com** - the primary source for all dynamic content: gallery photos, video poster frames, and every user-uploaded image (birthday photos, testimony images)
- **images.unsplash.com** - still referenced in three places: the About page's leadership team photos, and the `SAMPLE_BIRTHDAYS` / `SAMPLE_TESTIMONIES` fallback data shown only when the corresponding Supabase table is empty
- **picsum.photos** - only used by the sermon placeholder data in `lib/constants/media.ts`; sermons are currently disabled (see [Feature Status](#-feature-status)), so nothing actually loads from here right now
- **images.pexels.com**, **via.placeholder.com**, **placehold.co** - allowed but not referenced anywhere in the codebase; safe to remove if you don't plan to use them

To add more domains, update `remotePatterns` in `next.config.ts`.

### Performance Optimizations

The application includes several performance optimizations:

- **Image Optimization**: Next.js Image serving AVIF/WebP with responsive `sizes` and `preload` for above-the-fold heroes; Cloudinary transforms resize gallery thumbnails on the fly
- **Adaptive Video Streaming**: Church videos serve as Cloudinary-generated HLS renditions (480p-720p) via hls.js instead of one fixed-quality file, so playback quality adapts to the viewer's bandwidth
- **Cached Gallery Data**: The Cloudinary gallery fetch is cached with Next.js `use cache` (Cache Components) so infinite scroll doesn't re-fetch the full image list on every page
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Server Components**: Strategic use of Server Components for better performance
- **Suspense Boundaries**: Loading states with Suspense for better perceived performance
- **Compression**: Gzip/Brotli compression enabled
- **Minification**: Automatic minification in production builds (SWC)
- **Console Removal**: Console statements removed in production
- **Source Maps**: Disabled in production for smaller bundle sizes

### SEO & Metadata

SEO is driven from a single source of truth in `lib/constants/site.ts`, with helpers in `lib/seo.ts`:

- **Per-page metadata** - titles, descriptions, and canonical URLs for every route
- **Open Graph & Twitter cards** - rich link previews for social sharing
- **Structured data** - `Organization` and `WebSite` JSON-LD injected in the root layout
- **`sitemap.xml`, `robots.txt`, and a web manifest** - generated from the same config
- **Base URL** - set `NEXT_PUBLIC_SITE_URL` to your production domain (validated, with a sensible fallback)

### Environment Variables

The project requires several environment variables to function properly. Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

#### Required Variables

- **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
- **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY** - Supabase publishable key (or use legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **SUPABASE_SECRET_KEY** - Supabase secret key for server-side operations (or use legacy `SUPABASE_SERVICE_ROLE_KEY`)
- **CLOUDINARY_URL** - Cloudinary configuration URL (or use individual `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- **NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME** - Public cloud name (the `cloud_name` portion of `CLOUDINARY_URL`) used client-side to build gallery image and video delivery URLs
- **NEXT_PUBLIC_TURNSTILE_SITE_KEY** / **TURNSTILE_SECRET_KEY** - [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) keys for the bot check on every form. In production, submissions are refused until the secret is set. In development you can leave both unset to skip the check, or use Cloudflare's always-pass test keys listed in `.env.example`

#### Optional Variables

- **NEXT_PUBLIC_SITE_URL** - Production base URL for SEO/metadata (defaults to `https://wcigoderich.org`)
- **CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS** - Cloudinary upload preset for birthday images
- **CLOUDINARY_UPLOAD_PRESET_TESTIMONIES** - Cloudinary upload preset for testimony images
- **RESEND_API_KEY** / **RESEND_FROM_EMAIL** - Sends contact-form emails via [Resend](https://resend.com) (tried first)
- **SMTP_HOST** / **SMTP_PORT** / **SMTP_USER** / **SMTP_PASS** / **SMTP_FROM_EMAIL** - Sends contact-form emails via SMTP instead (fallback if Resend isn't configured)
- **ADMIN_API_KEY** - Unlocks the admin routes (editing, approving or deleting testimonies and prayer requests), sent as the `x-admin-api-key` header. Without it those routes refuse every request
If neither email option is configured, the contact form still saves each message to the `contact_messages` table and shows the sender a success message, but nobody gets an email. In development the message is also logged to the console, so you can see what would have been sent. In production nothing is logged, so check the table or configure Resend or SMTP before launch.

See `.env.example` for detailed descriptions and where to obtain these values.

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Backend Services

The application integrates with the following services:

- **Supabase** - Postgres database for:
  - Member birthdays storage and retrieval
  - Testimonies storage, filtering, and management
  - Prayer requests
  - Contact form messages

  No user authentication is implemented. Every one of these is an anonymous public submission. All reads and writes go through the API routes using the secret key; the publishable key can only read approved birthdays and testimonies.

- **Cloudinary** - Image and video hosting and optimization for:
  - Birthday member photos
  - Testimony images
  - User-uploaded content
  - Gallery photos (fetched live, cached with `use cache`)
  - Church videos, delivered as adaptive HLS streams
- **Email** - Contact form notifications via [Resend](https://resend.com) (tried first) or SMTP/nodemailer (fallback). If neither is configured, messages are only saved to Supabase (see [Environment Variables](#environment-variables))

### Database setup and moderation

For a new project, run `supabase/schema.sql` in the Supabase SQL editor. For an existing project, run each file in `supabase/migrations/` that you haven't run yet, before deploying the code that goes with it.

Submissions arrive unapproved and stay off the site until you set `verified` to `true` on the row in the Supabase table editor.

A birthday that's already on file can't be overwritten from the website. When someone resubmits a name and date, the new photo goes into `pending_image` and the current photo stays up. To accept it, run `SELECT approve_birthday_replacement('<row id>');` in the SQL editor. To reject it, clear `pending_image` and `pending_submitted_at`. Either way the old photo is left in Cloudinary for you to delete.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 👨‍💻 Developer

**Lawal Oyinlola (LAWAL)**: [lawaloyinlola.com](https://lawaloyinlola.com)

- GitHub: [@lawalOyinlola](https://github.com/lawalOyinlola)
- LinkedIn: [lawaloyinlola](https://www.linkedin.com/in/lawaloyinlola)
- X: [@honeyzrich](https://x.com/honeyzrich)

Built with ❤️ by LAWAL for WCI Goderich

## 📄 License

This project is private and proprietary.
