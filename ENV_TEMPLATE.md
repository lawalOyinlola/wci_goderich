# Environment Variables Template

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/_/settings/api
# Use the new "Publishable" and "Secret" keys (recommended)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key

# Legacy key names are also supported (for backward compatibility)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration
# Option 1: Use CLOUDINARY_URL (recommended - single env variable)
# Format: cloudinary://api_key:api_secret@cloud_name
# Get this from: https://cloudinary.com/console → Dashboard (copy the "Cloudinary URL")
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Option 2: Use individual environment variables (alternative/fallback)
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Cloudinary Upload Presets (Optional - but recommended)
# Create presets in Cloudinary Dashboard → Settings → Upload presets
# If not set, code will fallback to manual transformation configuration
CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS=wci_goderich_birthdays
CLOUDINARY_UPLOAD_PRESET_TESTIMONIES=wci_goderich_testimonies
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

For detailed setup instructions, see `SETUP.md`.
