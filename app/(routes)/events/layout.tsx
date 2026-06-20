import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("events");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
