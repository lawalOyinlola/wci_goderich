import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { GALLERY_IMAGES } from "@/lib/constants";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

export default function Gallery() {
  // Convert readonly array to mutable for proper type inference
  const galleryImages: GalleryImage[] = [...GALLERY_IMAGES];
  const count = galleryImages.length;
  const moreThanSeven = count > 7;
  const isOdd = count % 2 === 1;
  const mid = Math.floor(count / 2);
  const topImages: GalleryImage[] = moreThanSeven
    ? isOdd
      ? galleryImages.slice(0, mid + 1)
      : galleryImages.slice(0, mid)
    : galleryImages;
  const bottomImages: GalleryImage[] = moreThanSeven
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
                    <h3 className="text-white text-lg font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
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
                        <h3 className="text-white text-lg font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
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
