import { cn } from "@/lib/utils";

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
      <main
        className={cn(
          "overflow-hidden relative min-h-screen",
          backgroundImage && `bg-[url(${backgroundImage})] bg-cover bg-center`,
          className
        )}
      >
        <div className="bg-background/50 absolute inset-y-0 h-[200%] w-full md:w-1/2 rounded-r-full backdrop-blur-[2px]" />
        <div className="bg-background/50 absolute inset-y-0 w-full lg:w-4/7 rounded-r-full backdrop-blur-[2px]" />
        <section>
          <div className="pb-24 pt-12">
            <div className="relative small-container flex flex-col lg:flex-center">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
