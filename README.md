# WCI Goderich (Next.js)

Tech stack:

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- shadcn-style UI primitives (built-in)
- react-hook-form + yup

## Getting Started

1. Install deps (use pnpm):

```bash
pnpm install
```

2. Run the dev server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build && pnpm start
```

## Project Structure

- `src/app` - App Router pages
- `src/components/ui` - UI primitives (Button, Input, etc.)
- `src/lib/utils.ts` - Utilities (cn)
- `src/app/globals.css` - Tailwind + theme tokens

## Notes

- Update theme tokens in `globals.css` to tune the brand.
- Add more UI components mirroring shadcn patterns as needed.
