
import SectionHeader from "@/components/SectionHeader";

export default function Mission() {
  return (
    <section id="mission">
      <div className="small-container max-w-4xl text-center">
        <SectionHeader
          title="Our Educational Mission"
          subtitle="Education"
          description="At Winners Chapel International, we believe that education is a vital tool for transformation. Our schools and educational institutions are dedicated to raising a new generation of leaders who excel academically while maintaining strong Christian values and character."
        />

        <div className="p-4 bg-muted dark:bg-background/40 rounded-lg">
          <div className="flex flex-col gap-2">
            <blockquote className="text-lg italic text-primary font-medium line-clamp-3">
              &quot;Train up a child in the way he should go: and when he is
              old, he will not depart from it.&quot;
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">
              - Proverbs 22:6
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
