import SectionHeader from "@/components/SectionHeader";
import CtaContainer from "./CtaContainer";
import { cn } from "@/lib/utils";

interface CtaButton {
  text: string;
  href: string;
}

interface CtaSectionProps {
  title: string;
  description: string;
  mainText: string;
  buttons: CtaButton[];
  className?: string;
  containerClassName?: string;
}

export default function CtaSection({
  title,
  description,
  mainText,
  buttons,
  className,
  containerClassName,
}: CtaSectionProps) {
  return (
    <div className={cn("max-w-4xl mx-auto px-4 py-20 text-center", className)}>
      <SectionHeader title={title} description={description} />

      <CtaContainer
        description={mainText}
        containerClassName={containerClassName}
        buttons={buttons}
      />
    </div>
  );
}
