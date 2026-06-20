import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

interface HeroTemplateProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function HeroTemplate({
  title,
  description,
  backgroundImage,
  children,
  className,
}: HeroTemplateProps) {
  return (
    <>
      <section
        id="hero"
        className={cn(
          "overflow-hidden relative min-h-screen transform-gpu backface-hidden",
          className
        )}
      >
        {/* Decorative hero background. Rendered via next/image so it's served as
            a responsive, modern-format (AVIF/WebP) asset instead of a raw CSS
            background. Placed first so the positioned overlays/content paint above it. */}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            fill
            preload
            quality={60}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        )}
        <div className="bg-background/55 absolute inset-y-0 h-[200%] w-full md:w-1/2 rounded-r-full" />
        <div className="bg-background/55 absolute inset-y-0 w-full lg:w-4/7 rounded-r-full" />
        <section>
          <div className="pb-24 pt-12">
            <div className="relative small-container flex flex-col lg:flex-center">
              <Reveal
                variant="fade-up"
                className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left"
              >
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl text-shadow-md">
                  {title}
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  {description}
                </p>

                {children && (
                  <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                    {children}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
