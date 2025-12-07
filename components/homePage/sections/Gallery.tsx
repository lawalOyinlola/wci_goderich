import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
    alt: "Church Interior",
    title: "Beautiful Church Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&q=80",
    alt: "Sunday Service",
    title: "Sunday Worship Service",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=800&fit=crop&q=80",
    alt: "Prayer and Worship",
    title: "Prayer and Worship",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&q=80",
    alt: "Church Community",
    title: "Church Community Fellowship",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=800&fit=crop&q=80",
    alt: "Church Choir",
    title: "Church Choir",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop&q=80",
    alt: "Church Event",
    title: "Special Church Event",
  },
  {
    src: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=800&fit=crop&q=80",
    alt: "Church Celebration",
    title: "Church Celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop&q=80",
    alt: "Church Fellowship",
    title: "Church Fellowship",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&q=80",
    alt: "Church Ministry",
    title: "Church Ministry",
  },
];

export default function Gallery() {
  const count = galleryImages.length;
  const moreThanSeven = count > 7;
  const isOdd = count % 2 === 1;
  const mid = Math.floor(count / 2);
  const topImages = moreThanSeven
    ? isOdd
      ? galleryImages.slice(0, mid + 1)
      : galleryImages.slice(0, mid)
    : galleryImages;
  const bottomImages = moreThanSeven
    ? isOdd
      ? galleryImages.slice(mid, count)
      : galleryImages.slice(mid, count)
    : [];

  return (
    <section className="py-20">
      <div className="max-w-500 w-full mx-auto">
        <div className="px-4">
          <SectionHeader
            title="Photo Collections"
            subtitle="Gallery"
            description="Pictures from documented events,special occasions and during service"
          />
        </div>

        <div className="relative">
          <div className={moreThanSeven ? "space-y-8" : ""}>
            <InfiniteSlider speed={100} speedOnHover={40} gap={16}>
              {topImages.map((image, index) => (
                <div
                  key={`row1-${index}`}
                  className="group relative w-64 md:w-80 aspect-square rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 group-hover:opacity-100 opacity-0 transition-all duration-600">
                    <h3 className="text-white text-lg font-lora font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
                      {image.title || image.alt}
                    </h3>
                  </div>
                </div>
              ))}
            </InfiniteSlider>

            {moreThanSeven && (
              <InfiniteSlider speed={100} speedOnHover={40} gap={16} reverse>
                {bottomImages
                  .slice()
                  .reverse()
                  .map((image, index) => (
                    <div
                      key={`row2-${index}`}
                      className="group relative w-64 md:w-80 aspect-square rounded-xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 256px, 320px"
                        className="object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 group-hover:opacity-100 opacity-0 transition-all duration-600">
                        <h3 className="text-white text-lg font-lora font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
                          {image.title || image.alt}
                        </h3>
                      </div>
                    </div>
                  ))}
              </InfiniteSlider>
            )}
          </div>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[80px] md:w-[200px]"
            direction="left"
            blurIntensity={0.7}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[80px] md:w-[200px]"
            direction="right"
            blurIntensity={0.7}
          />
        </div>
      </div>
    </section>
  );
}
