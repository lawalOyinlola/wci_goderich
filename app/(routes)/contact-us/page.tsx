import { Spotlight } from "@/components/ui/spotlight";
import Faqs from "./Faqs";
import ContactForm from "./ContactForm";
import CtaSection from "@/components/CtaSection";

const ContactUsPage = () => {
  return (
    <>
      <section
        id="hero"
        className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-40"
      >
        <Spotlight
          className="-top-1/5 -left-1/7 md:-top-1/4 md:left-1/6"
          fill="#fdfcfb"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300">
            We&apos;d love to hear from you and help answer any questions you
            may have
          </p>
        </div>
      </section>
      <Faqs />
      <ContactForm />
      <CtaSection
        title="Visit Us This Sunday"
        description="Experience the power of God's Word in our community"
        mainText="We'd love to welcome you to our church family. Join us for our services and experience the transformative power of God's Word in fellowship with believers."
        buttons={[
          { text: "Our Services", href: "/services" },
          { text: "Learn More About Us", href: "/about" },
        ]}
      />
    </>
  );
};

export default ContactUsPage;
