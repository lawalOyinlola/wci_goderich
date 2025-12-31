import SectionHeader from "@/components/SectionHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

const inspirations = [
  {
    icon: "QuotesIcon",
    title: "Prayer Changes Things",
    description:
      "Prayer is not asking for what you think you want, but asking to be changed in ways you can't imagine. It's the key that unlocks God's power in your life.",
    verse:
      "James 5:16 - The prayer of a righteous person is powerful and effective.",
  },
  {
    icon: "HeartIcon",
    title: "Prayer Connects Us",
    description:
      "When we pray together, we create a powerful bond of unity and faith. Corporate prayer amplifies our individual prayers and brings us closer to God and each other.",
    verse:
      "Matthew 18:20 - For where two or three gather in my name, there am I with them.",
  },
  {
    icon: "LightbulbIcon",
    title: "Prayer Brings Clarity",
    description:
      "In the quiet moments of prayer, God speaks to our hearts, provides direction, and reveals His will for our lives. Prayer is our direct line to heaven.",
    verse:
      "Jeremiah 33:3 - Call to me and I will answer you and tell you great and unsearchable things you do not know.",
  },
];

export default function PrayerInspiration() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <SectionHeader
          title="The Power of Prayer"
          subtitle="Prayer Inspiration"
          description="Prayer is far more than a religious ritual or a spiritual practice—it is the very heartbeat of our relationship with God. Through prayer, we open ourselves to divine transformation, inviting God's wisdom, peace, and power into every aspect of our lives. Whether we come before Him with thanksgiving, petition, or simply to be still in His presence, prayer becomes the bridge that connects our finite human experience with His infinite grace and love. It is in these sacred moments of communion that we find strength for our journey, clarity for our decisions, and the comfort of knowing we are never alone. Prayer changes not only our circumstances but, more importantly, it changes us—molding our hearts, refining our character, and drawing us ever closer to the One who hears and answers according to His perfect will."
        />
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
          {inspirations.map((inspiration, index) => (
            <Card key={index} className="group border-0 shadow-none">
              <CardHeader>
                <CardDecorator>
                  <Zap className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="font-medium">{inspiration.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{inspiration.description}</p>
              </CardContent>
              <CardFooter>
                <blockquote className="text-sm italic text-primary">
                  {inspiration.verse}
                </blockquote>
              </CardFooter>
            </Card>
          ))}
        </div>
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
