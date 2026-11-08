import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Reveal } from "@/components/motion";
import { GivingCauses } from "@/components/homePage/GivingCauses";
import { GivingAccountCard } from "@/components/homePage/GivingAccountCard";
import { DONATIONS } from "@/lib/constants";

export default function Donation() {
  return (
    <section className="bg-muted/60 dark:bg-muted/30">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
        <Reveal>
          <GivingCauses causes={DONATIONS} />

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Every offering keeps this house open and growing. Your gift builds
            our church home, cares for members in need, brings worshippers to
            service and keeps our sound and media equipment running.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <AnimatedButton
              size="lg"
              variant="destructive"
              href="/giving"
              text="Give Now"
            />
            <Link
              href="/giving#giving"
              className="group inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-border decoration-2 underline-offset-[6px] transition-colors duration-200 hover:decoration-primary"
            >
              Other ways to give
              <ArrowRightIcon
                aria-hidden="true"
                weight="bold"
                className="size-4 text-primary transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          <GivingAccountCard />
        </Reveal>
      </div>
    </section>
  );
}
