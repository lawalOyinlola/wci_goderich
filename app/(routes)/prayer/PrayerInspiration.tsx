import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { QuotesIcon, HeartIcon, LightbulbIcon } from "@phosphor-icons/react";

const inspirations = [
  {
    icon: QuotesIcon,
    title: "Prayer Changes Things",
    description:
      "Prayer is not asking for what you think you want, but asking to be changed in ways you can't imagine. It's the key that unlocks God's power in your life.",
    verse:
      "James 5:16 - The prayer of a righteous person is powerful and effective.",
  },
  {
    icon: HeartIcon,
    title: "Prayer Connects Us",
    description:
      "When we pray together, we create a powerful bond of unity and faith. Corporate prayer amplifies our individual prayers and brings us closer to God and each other.",
    verse:
      "Matthew 18:20 - For where two or three gather in my name, there am I with them.",
  },
  {
    icon: LightbulbIcon,
    title: "Prayer Brings Clarity",
    description:
      "In the quiet moments of prayer, God speaks to our hearts, provides direction, and reveals His will for our lives. Prayer is our direct line to heaven.",
    verse:
      "Jeremiah 33:3 - Call to me and I will answer you and tell you great and unsearchable things you do not know.",
  },
];

export default function PrayerInspiration() {
  return (
    <section className="py-16 bg-background">
      <div className="small-container">
        <SectionHeader
          title="The Power of Prayer"
          subtitle="Prayer Inspiration"
          description="Discover the transformative power of prayer and how it can change your life, your circumstances, and your relationship with God."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inspirations.map((inspiration, index) => {
            const Icon = inspiration.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                    <Icon
                      size={24}
                      weight="duotone"
                      className="text-primary shrink-0"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {inspiration.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {inspiration.description}
                    </p>
                    <p className="text-sm italic text-primary font-medium">
                      {inspiration.verse}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
