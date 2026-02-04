import Hero from "./Hero";
import Sermons from "./Sermons";
import LiveStreamSection from "./LiveStreamSection";
import CtaSection from "@/components/CtaSection";

export default function MediaPage() {
  return (
    <>
      <Hero />
      <Sermons />
      <LiveStreamSection />
      <CtaSection
        title="Join Us in Person"
        description="Your presence makes all the difference. Join us in our services and experience the full power of worship and fellowship."
        mainText="Step into our sanctuary and be part of a community that worships and grows together. Come as you are and discover what God has for you."
        buttons={[
          { text: "Our Services", href: "/services" },
          { text: "Learn About Us", href: "/about" },
        ]}
      />
    </>
  );
}
