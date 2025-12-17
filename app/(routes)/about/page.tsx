import HeroSection from "./Hero";
import MissionVision from "./MissionVision";
import Pillars from "./Pillars";
import Leadership from "./Leadership";
import CtaSection from "@/components/CtaSection";
import Ministries from "./Ministries";

const AboutUsPage = () => {
  return (
    <>
      <HeroSection />
      <MissionVision />
      <Pillars />
      <Ministries />
      <Leadership />
      <CtaSection
        title="Join Us in Our Mission"
        description="Be part of a community that's making a difference in Sierra Leone and beyond."
        mainText="We invite you to connect with us. Explore our service times or reach out directly to learn how you can become part of our vibrant community."
        buttons={[
          { text: "Our Services", href: "/services" },
          { text: "Get in Touch", href: "/contact" },
        ]}
      />

      {/* <CtaSection
        title="Join Us in Our Mission"
        description="Be part of a community that's making a difference in Sierra Leone and beyond."
        mainText="We invite you to connect with us. Explore our service times or reach out directly to learn how you can become part of our vibrant community."
        buttons={[
          { text: "Our Services", href: "/services" },
          { text: "Get in Touch", href: "/contact" },
        ]}
        className="bg-accent max-w-full text-background bg-gradient-to-br from-[#f59e0b] via-primary to-accent"
        containerClassName="bg-muted/30"
      /> */}
    </>
  );
};

export default AboutUsPage;
