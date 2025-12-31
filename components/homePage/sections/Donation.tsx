import { WordRotate } from "@/components/ui/word-rotate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { DONATIONS } from "@/lib/constants";

export default function Donation() {
  return (
    <section
      className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544376664-80b17f09d399?w=1920&h=1080&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h2 className="font-outfit">
            <span className="text-2xl">Give towards the </span>
            <WordRotate
              words={DONATIONS}
              animationStyle="fade"
              className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-linear-to-br from-[#f59e0b] via-primary to-accent bg-clip-text text-transparent"
              duration={3000}
              pauseDuration={500}
              loop={true}
            />
          </h2>

          <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Help us build a place of worship that will serve our community for
            generations to come. Your generous contribution will help us create
            a space where faith, fellowship, and hope can flourish in our
            community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              size="lg"
              variant="destructive"
              href="/giving"
              text="Give Now"
            />
            <AnimatedButton
              variant="outline"
              size="lg"
              className="border-border/30 text-[#fdfcfb]"
              href="/about"
              text="Learn More"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 size-20 border-2 border-white/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-80 size-32 border border-white/20 rounded-full animate-pulse delay-[3000ms]"></div>
      <div className="absolute bottom-10 right-10 size-16 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 size-12 border-2 border-white/20 rounded-full animate-pulse delay-500"></div>
    </section>
  );
}
