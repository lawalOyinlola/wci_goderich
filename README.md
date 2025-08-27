# WCI Goderich - Church Website

A modern, responsive church website built with Next.js for WCI Goderich, featuring beautiful design, event management, and spiritual content.

![WCI Goderich](public/lfc_logo.png)

## 🚀 Features

- **Modern Design**: Clean, professional church website design
- **Responsive Layout**: Mobile-first approach for all devices
- **Event Management**: Upcoming events with beautiful cards
- **Media Library**: Sermons, Bible studies, and spiritual content
- **Service Information**: Church services, times, and locations
- **Prayer Requests**: Online prayer request submission
- **Service Units**: Ministry opportunities and volunteer signup
- **Contact & Location**: Church address and contact information
- **Gallery**: Photo gallery of church events and activities

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui primitives
- **Forms**: react-hook-form + yup validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (routes)/          # Route groups
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── events/        # Events page
│   │   ├── gallery/       # Gallery page
│   │   ├── media/         # Media library
│   │   ├── prayer/        # Prayer requests
│   │   ├── services/      # Church services
│   │   └── ...            # Other pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/             # React components
│   ├── ui/                # UI primitives
│   ├── HomepageSections/  # Homepage components
│   └── ...                # Other components
└── lib/                    # Utilities and helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lawalOyinlola/wci_goderich.git
   cd wci_goderich
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 🎨 Customization

### Theme Colors

Update theme tokens in `src/app/globals.css` to match your church's brand colors.

### Content

- Update church information in respective page components
- Replace placeholder images with actual church photos
- Modify service times and event details

### Styling

- Customize Tailwind classes for layout adjustments
- Modify component styles in the `src/components/ui` directory

## 📱 Pages Overview

- **Home**: Welcome section, hero carousel, latest news
- **About**: Church history, mission, and vision
- **Services**: Church service times and schedules
- **Events**: Upcoming church events and activities
- **Media**: Sermons, Bible studies, and spiritual content
- **Gallery**: Photo gallery of church events
- **Contact**: Contact information and location
- **Prayer**: Online prayer request submission
- **Service Units**: Ministry opportunities and volunteer signup

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Custom domain can be configured in Vercel dashboard

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

For support and questions about the website:

- Email: info@wcigoderich.org
- Church: WCI Goderich Auditorium, Main Street, Goderich, Western Area, Sierra Leone

---

**Built with ❤️ for WCI Goderich**
