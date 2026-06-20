import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("service-units");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
