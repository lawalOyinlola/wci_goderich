import { Spotlight } from "@/components/ui/spotlight";
import Faqs from "./Faqs";
import ContactForm from "./ContactForm";

const ContactUsPage = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-40">
        <Spotlight
          className="-top-1/5 -left-1/7 md:-top-1/4 md:left-1/6"
          fill="#fdfcfb"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
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
    </>
  );
};

export default ContactUsPage;
