import { Suspense } from "react";
import Hero from "./Hero";
import GalleryContent from "./GalleryContent";
import GallerySkeleton from "./GallerySkeleton";
import CtaSection from "@/components/CtaSection";

interface GalleryPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    orientation?: string;
    month?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category;
  const orientation = params.orientation;
  const month = params.month ? parseInt(params.month, 10) : undefined;

  return (
    <>
      <Hero />
      <Suspense fallback={<GallerySkeleton />}>
        <GalleryContent
          initialPage={page}
          initialCategory={category}
          initialOrientation={orientation}
          initialMonth={month}
        />
      </Suspense>

      <CtaSection
        title="Capture Our Moments"
        description="Have photos from church events or services? We'd love to see them!"
        mainText="Share your captured moments with our community and help us build a beautiful collection of memories together."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "View All Events", href: "/about" },
        ]}
      />
    </>
  );
}
