import { ReactNode } from "react";
import { CHURCH_INFO } from "@/lib/constants";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";

export default function Features() {
  const { MISSION, VISION, MANDATE, ABOUT_US } = CHURCH_INFO;

  return (
    <section className="bg-background py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <SectionHeader
          title="Mission, Vision and Mandate"
          subtitle="About Us"
          description={ABOUT_US[0]}
        />
        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 bg-background py-0 *:py-6">
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">MISSION</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{MISSION}</p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">MANDATE</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{MANDATE}</p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">VISION</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{VISION}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
