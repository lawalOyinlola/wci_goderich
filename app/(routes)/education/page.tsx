import Hero from "./Hero";
import Mission from "./Mission";
import SierraSchools from "./SierraSchools";
import NigerianSchools from "./NigerianSchools";
import CtaSection from "@/components/CtaSection";
import { SCHOOLS } from "@/lib/constants";
import Wofbi from "./Wofbi";

export default function EducationPage() {
  const sierraLeoneSchools = [
    ...SCHOOLS.sierraLeone.primary,
    ...SCHOOLS.sierraLeone.secondary,
    ...SCHOOLS.sierraLeone.university,
  ];

  const nigeriaSchools = [
    ...SCHOOLS.nigeria.primary_secondary,
    ...SCHOOLS.nigeria.university,
  ];

  return (
    <>
      <Hero />
      <Mission />
      <SierraSchools schools={sierraLeoneSchools} />
      <NigerianSchools schools={nigeriaSchools} />
      <Wofbi />

      <CtaSection
        title="Join Our Church Community"
        description="Experience fellowship, worship, and spiritual growth with us"
        mainText="Join us for our weekly services, get involved in our ministries, share your testimony, or connect with others through prayer. Whether you're looking to serve, grow in faith, or simply connect with believers, there's a place for you here."
        buttons={[
          { text: "Join Our Services", href: "/services" },
          { text: "View Leadership", href: "/about#leadership" },
        ]}
      />
    </>
  );
}
