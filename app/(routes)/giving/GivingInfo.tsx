"use client";

import SectionHeader from "@/components/SectionHeader";
import CardDecorator from "@/components/ui/card-decorator";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { IconComponent, ValidIconName } from "@/components/IconComponent";

const infoCards: Array<{
  icon: ValidIconName;
  title: string;
  description: string;
}> = [
    {
      icon: "CreditCardIcon",
      title: "How to Give",
      description:
        "Giving is simple and secure. You can give through bank transfer using our account details below, or visit us during our services. We accept various forms of giving including tithes, offerings, and special donations for missions and projects.",
    },
    {
      icon: "TipJarIcon",
      title: "What & Where to Give",
      description:
        "You can give your tithes, offerings, and special donations. Whether you're supporting our local ministry, missions work, or specific projects, every contribution makes a difference. Give at our physical location during services or transfer directly to our bank account.",
    },
    {
      icon: "HandHeartIcon",
      title: "Why Give",
      description:
        "Giving is an act of worship and obedience to God. Your generous giving supports our mission to spread the Gospel, helps us serve our community, funds our various ministries, and enables us to reach more lives with the love of Christ. Every gift, no matter the size, is valuable and appreciated.",
    },
  ];


export default function GivingInfo() {
  return (
    <section id="giving">
      <div className="@container small-container">
        <SectionHeader
          title="About Giving"
          subtitle="Ways to Support"
          description="Learn more about how you can partner with us in advancing God's kingdom through your generous giving"
        />

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
          {infoCards.map((info, index) => (
            <Card
              key={index}
              className="group border-0 shadow-none bg-background"
            >
              <CardHeader>
                <CardDecorator>
                  <IconComponent iconName={info.icon} className="text-background"
                    size={32}
                    weight="duotone" />
                </CardDecorator>
                <h3 className="font-medium">{info.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
