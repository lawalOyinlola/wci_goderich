import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { type Route } from "next";
import CtaContainer from "./CtaContainer";
// import { AnimatedButton } from "./ui/animated-button";

interface CtaButton {
  text: string;
  href: Route;
  className?: string;
}

interface CtaSectionProps {
  title: string;
  description: string;
  mainText: string;
  buttons: CtaButton[];
}

export default function CtaSection({
  title,
  description,
  mainText,
  buttons,
}: CtaSectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <SectionHeader title={title} description={description} />

      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 border border-slate-200 dark:border-slate-600">
        <p className="text-slate-700 dark:text-slate-300 mb-6">{mainText}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button) => (
            <Button
              key={button.href.toString()}
              variant="outline"
              size="lg"
              asChild
              className={
                button.className ||
                "border-slate-300 dark:border-slate-600 hover:bg-primary/10 hover:dark:border-primary/70 hover:border-primary/70 hover:text-primary transition-all duration-200"
              }
            >
              <Link href={button.href}>{button.text}</Link>
            </Button>
          ))}
        </div>
      </div>
      <CtaContainer description={mainText}>
        {buttons.map((button, index) => (
          <Button
            key={button.href.toString()}
            size="lg"
            variant={`${index !== 0 ? "secondary" : "outline"}`}
            className={`${index !== 0 ? "bg-background!" : ""} `}
            asChild
          >
            <Link href={button.href}>{button.text}</Link>
          </Button>
        ))}
      </CtaContainer>
      {/* <AnimatedButton
            key={button.href.toString()}
            size="lg"
            variant={`${index !== 0 ? "secondary" : "outline"}`}
            className={`${index !== 0 ? "bg-background!" : ""} `}
            href={button.href}
            text={button.text}
          /> */}
    </div>
  );
}
