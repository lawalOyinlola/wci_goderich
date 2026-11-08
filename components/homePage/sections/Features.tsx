import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { IconComponent } from "@/components/IconComponent";
import {
  Reveal,
  ScrollRevealText,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import { FEATURES, CHURCH_INFO } from "@/lib/constants";

const MANDATE_URL = "https://faithtabernacle.org.ng/mandate/";

export default function Features() {
  const { MANDATE_TASK, DENOMINATION } = CHURCH_INFO;

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-24 md:py-32 lg:grid-cols-12 lg:items-start lg:gap-20">
        {/* Pinned on wide screens while the three pillars scroll past. */}
        <Reveal className="lg:sticky lg:top-32 lg:col-span-7">
          <h2 className="text-base font-semibold text-primary">The Mandate</h2>

          <blockquote className="mt-6">
            <p className="font-lora text-3xl leading-[1.25] tracking-tight text-foreground sm:text-4xl sm:leading-[1.2]">
              <ScrollRevealText text={`\u201C${MANDATE_TASK}\u201D`} />
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">
              The commission of {DENOMINATION}
            </footer>
          </blockquote>

          <a
            href={MANDATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-border decoration-2 underline-offset-[6px] transition-colors duration-200 hover:decoration-primary"
          >
            Partake in this mission
            <ArrowUpRightIcon
              aria-hidden="true"
              weight="bold"
              className="size-4 text-primary transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        <Stagger as="ul" className="lg:col-span-5 lg:pt-12 lg:pb-24">
          {FEATURES.map((feature) => (
            <StaggerItem
              as="li"
              key={feature.title}
              className="flex gap-5 border-b border-border py-7 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <IconComponent iconName={feature.icon} size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-primary">
                  {feature.subtitle}
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <p className="mt-3 text-sm italic text-muted-foreground">
                  {feature.bible}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
