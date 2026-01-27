import SectionHeader from "@/components/SectionHeader";
import CardDecorator from "@/components/ui/card-decorator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PRAYER_INSPIRATIONS } from "@/lib/constants";
import { IconComponent, ValidIconName } from "@/components/IconComponent";

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
          {PRAYER_INSPIRATIONS.map((inspiration) => (
            <Card
              key={inspiration.title}
              className="group border-0 shadow-none bg-background"
            >
              <CardHeader>
                <CardDecorator>
                  <IconComponent iconName={inspiration.icon as ValidIconName} size={32} weight="duotone" className="text-foreground" aria-hidden />
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

