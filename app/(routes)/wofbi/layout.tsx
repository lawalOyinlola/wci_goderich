import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("wofbi");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
