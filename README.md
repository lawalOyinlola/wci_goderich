# WCI Goderich Church Website

A modern, responsive website for WCI Goderich built with Next.js, featuring dynamic content sections, interactive components, and a beautiful user interface.

![WCI Goderich](public/lfc_logo.png)

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Yup validation
- **Maps**: React Leaflet
- **Animations**: Motion (Framer Motion)
- **Icons**: Phosphor Icons & Lucide React
- **Theme**: Dark/Light mode support with next-themes
- **Package Manager**: pnpm

## ✨ Features

- 🎠 **Hero Carousel** - Dynamic image carousel with auto-scroll
- 🎯 **Features Section** - Highlight key church features
- 👋 **Welcome Section** - Church introduction and mission
- ⛪ **Church Services** - Service times and information
- 📅 **Upcoming Events** - Event calendar and listings
- 📖 **Sermons** - Sermon archive and audio/video content
- 💝 **Donations** - Online giving integration
- 📸 **Gallery** - Photo gallery with carousel
- 🎂 **Birthdays** - Member birthday celebrations
- 💬 **Testimonies** - Member testimonials
- 📍 **Church Location** - Interactive map with location details
- 🌓 **Theme Support** - Dark and light mode
- 📱 **Responsive Design** - Mobile-first, fully responsive

## 📋 Prerequisites

- Node.js 18+
- pnpm 10.0.0+

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
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── form/              # Form components
│   ├── homePage/          # Home page sections
│   │   └── sections/      # Individual page sections
│   ├── layouts/           # Layout components
│   │   ├── footer/        # Footer components
│   │   └── navbar/        # Navigation components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and constants
├── public/                # Static assets
│   └── images/            # Image files
└── package.json           # Dependencies and scripts
```

## 🎨 Key Components

- **NavBar** - Responsive navigation with mobile menu
- **Footer** - Multi-column footer with links, newsletter, and social media
- **HeroCarousel** - Auto-scrolling image carousel
- **ChurchLocationMap** - Interactive map using Leaflet
- **AvatarCropUploader** - Image upload and cropping functionality
- **Form Components** - Reusable form fields with validation

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

To add more domains, update `next.config.ts`.

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

- **CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS** - Cloudinary upload preset for birthday images
- **CLOUDINARY_UPLOAD_PRESET_TESTIMONIES** - Cloudinary upload preset for testimony images

See `.env.example` for detailed descriptions and where to obtain these values.

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ by YERO for WCI Goderich
