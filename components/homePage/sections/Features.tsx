import { FEATURES } from "@/lib/constants";
import { IconComponent } from "@/components/IconComponent";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Separator } from "@/components/ui/separator";

export default function Features() {
  return (
    <section className="bg-card text-card-foreground">
      <div className="relative small-container py-16">
        <div className="grid min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-8 relative">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group lg:col-span-2 flex flex-col h-full"
            >
              <div className="mb-4 w-fit">
                <IconComponent iconName={feature.icon} />
              </div>
              <h4 className="uppercase mb-2">{feature.title}</h4>
              <p className="mb-2 text-accent leading-7">{feature.subtitle}</p>

              <Separator className="mb-4 w-10! bg-accent group-hover:w-6/7! transition-all duration-300" />

              <p className="text-muted-foreground mb-2 leading-7 grow">
                {feature.description}
              </p>
              <blockquote className="border-l-2 pl-2 text-sm italic mt-auto">
                {feature.bible}
              </blockquote>
            </div>
          ))}

          <div className="text-center bg-primary text-primary-foreground lg:px-8 p-4 lg:-mt-30 lg:pt-20 sm:py-10 sm:col-span-3 flex flex-col items-center justify-center gap-4">
            <h3>THE MANDATE</h3>

            <blockquote className="sm:border-l-2 border-secondary/30 sm:pl-2 text-lg mt-6 italic leading-7">
              &quot;Now the hour has come to liberate the world from all
              oppressions of the devil through the preaching of the word of
              faith, and I am sending you to undertake this task.&quot;
            </blockquote>

            <AnimatedButton
              size="lg"
              variant="outline"
              className="border-2 text-center min-w-[160px] mt-4"
              text="Partake this mission"
              href="https://faithtabernacle.org.ng/mandate/"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
