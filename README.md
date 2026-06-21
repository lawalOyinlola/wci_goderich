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

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Yup validation
- **Maps**: Leaflet (vanilla, lazy-loaded)
- **Animations**: Motion (Framer Motion)
- **Icons**: Phosphor Icons & Lucide React
- **Theme**: Dark/Light mode support with next-themes
- **Package Manager**: pnpm

## ✨ Key Features

### 🏠 Homepage Sections

- 🎠 **Hero Carousel** - Dynamic image carousel with auto-scroll showcasing church highlights
- 🎯 **Features Section** - Highlight key church features and values
- 👋 **Welcome Section** - Church introduction, mission, and vision
- ⛪ **Church Services** - Service times, schedules, and worship information
- 📅 **Upcoming Events** - Event calendar with detailed listings and special programs
- 📖 **Sermons** - Sermon archive with audio/video content access
- 💝 **Donations** - Secure online giving and tithe integration
- 📸 **Gallery** - Photo gallery with carousel showcasing church events and activities
- 🎂 **Birthdays** - Member birthday celebrations and recognition
- 💬 **Testimonies** - Share and read testimonies of God's faithfulness
- 📍 **Church Location** - Interactive Leaflet map with a church marker, one-tap "Get Directions", and a "View My Location" geolocation pin

### 📄 Dedicated Pages

- **About** - Church history, mission, vision, leadership team, and core pillars
- **Ministries** - Comprehensive pages for:
  - Children's Ministry (Ages 3-12)
  - Teens Church
  - Youth Alive (Ages 13-18)
  - Businessmen Fellowship
  - Pastors & Leadership
- **Education** - Educational programs, WOFBI enrollment, Nigerian and Sierra Leone schools
- **Prayer** - Prayer request submission, prayer sessions, answered prayers, and prayer points
- **Testimonies** - Browse and share testimonies with filtering and categorization
- **Gallery** - Full photo gallery with event-based organization
- **Contact** - Contact forms, FAQs, and church information
- **Resources**:
  - Media Library - Sermons, live streams, and multimedia content
  - Book Library - Digital library of books and teachings
  - Service Units - Information about volunteer opportunities
  - Satellite Fellowship (WSF) - Small group locations and information
  - Events - Upcoming events and special programs
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
│   └── (routes)/                 # Route groups
│       ├── about/                # About page and sections
│       ├── contact-us/           # Contact page with forms and FAQs
│       ├── education/            # Education programs and schools
│       ├── events/               # Events page
│       ├── gallery/              # Photo gallery with loading states
│       ├── library/              # Digital library
│       ├── location/             # Church location
│       ├── media/                # Media library
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
│   │   ├── BirthdaysWrapper.tsx  # Birthdays with Supabase
│   │   └── TestimoniesWrapper.tsx # Testimonies with Supabase
│   ├── layouts/                  # Layout components
│   │   ├── footer/               # Footer components
│   │   └── navbar/               # Navigation components and menu items
│   └── ui/                       # Reusable UI components (Radix UI based)
├── lib/                          # Utilities, constants, and config
│   ├── constants/                # Content constants + site/SEO config (site.ts)
│   ├── data/                     # Server-side data fetchers (Supabase)
│   ├── types/                    # TypeScript type definitions
│   ├── seo.ts                    # Metadata helpers and JSON-LD builders
│   ├── utils.ts                  # Shared helpers (cn, getDirectionsUrl, etc.)
│   └── utils/                    # Domain utilities (cloudinary, email, etc.)
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
- **UpcomingEvents** - Event listings with dates and details
- **Sermons** - Sermon archive with media player integration
- **Donation** - Online giving interface
- **Gallery** - Photo gallery with lazy loading and carousel
- **BirthdaysWrapper** - Member birthday celebrations with Supabase integration
- **TestimoniesWrapper** - Testimonies display with filtering
- **ChurchLocationMap** - Interactive Leaflet map with a church marker, "Get Directions" links, and a live "View My Location" geolocation pin

### Form & Input Components

- **AvatarCropUploader** - Image upload and cropping functionality for user avatars
- **Form Components** - Reusable form fields with React Hook Form and Yup validation
- **PrayerRequestForm** - Prayer request submission with validation
- **ShareTestimonyForm** - Testimony submission form with image upload
- **ContactForm** - Contact form with email integration

### UI Components

- **Reusable UI Components** - Built with Radix UI primitives for accessibility
- **Loading Skeletons** - Suspense boundaries with skeleton loaders for better UX
- **Error Boundaries** - Graceful error handling for async components

## 🌐 Deployment

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import your project on Vercel
3. Vercel will automatically detect Next.js and configure the build settings

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 Configuration

### Image Domains

The project is configured to allow images from:

- picsum.photos
- images.unsplash.com
- images.pexels.com
- via.placeholder.com
- placehold.co
- res.cloudinary.com (for Cloudinary image hosting)

To add more domains, update `next.config.ts`.

### Performance Optimizations

The application includes several performance optimizations:

- **Image Optimization**: Next.js Image serving AVIF/WebP with responsive `sizes` and `preload` for above-the-fold heroes; Cloudinary transforms resize gallery thumbnails on the fly
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Server Components**: Strategic use of Server Components for better performance
- **Suspense Boundaries**: Loading states with Suspense for better perceived performance
- **Compression**: Gzip/Brotli compression enabled
- **Minification**: Automatic minification in production builds (SWC)
- **Console Removal**: Console statements removed in production
- **Source Maps**: Disabled in production for smaller bundle sizes

### SEO & Metadata

SEO is driven from a single source of truth in `lib/constants/site.ts`, with helpers in `lib/seo.ts`:

- **Per-page metadata** — titles, descriptions, and canonical URLs for every route
- **Open Graph & Twitter cards** — rich link previews for social sharing
- **Structured data** — `Organization` and `WebSite` JSON-LD injected in the root layout
- **`sitemap.xml`, `robots.txt`, and a web manifest** — generated from the same config
- **Base URL** — set `NEXT_PUBLIC_SITE_URL` to your production domain (validated, with a sensible fallback)

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

#### Optional Variables

- **NEXT_PUBLIC_SITE_URL** - Production base URL for SEO/metadata (defaults to `https://wcigoderich.org`)
- **CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS** - Cloudinary upload preset for birthday images
- **CLOUDINARY_UPLOAD_PRESET_TESTIMONIES** - Cloudinary upload preset for testimony images

See `.env.example` for detailed descriptions and where to obtain these values.

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Backend Services

The application integrates with the following services:

- **Supabase** - Database and backend services for:
  - Member birthdays storage and retrieval
  - Testimonies storage, filtering, and management
  - User authentication (if implemented)
- **Cloudinary** - Image hosting and optimization for:
  - Birthday member photos
  - Testimony images
  - User-uploaded content
- **Email Services** - For contact forms and notifications (configured via environment variables)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 👨‍💻 Developer

**Lawal Oyinlola (LAWAL)** — [lawaloyinlola.com](https://lawaloyinlola.com)

- GitHub: [@lawalOyinlola](https://github.com/lawalOyinlola)
- LinkedIn: [lawaloyinlola](https://www.linkedin.com/in/lawaloyinlola)
- X: [@honeyzrich](https://x.com/honeyzrich)

Built with ❤️ by LAWAL for WCI Goderich

## 📄 License

This project is private and proprietary.
