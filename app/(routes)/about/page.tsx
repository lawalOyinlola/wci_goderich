import HeroSection from "./Hero";
import MissionVision from "./MissionVision";
import Pillars from "./Pillars";
import Ministries from "./Ministries";
import Leadership from "./Leadership";
import CtaSection from "@/components/CtaSection";

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
          { text: "Join a Service Unit", href: "/service-units" },
          { text: "Get in Touch", href: "/contact-us" },
        ]}
      />
    </>
  );
};

export default AboutUsPage;
