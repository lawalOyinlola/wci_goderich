import Hero from "./Hero";
import GivingInfo from "./GivingInfo";
import GivingDetails from "./GivingDetails";
import LivingFaithWorldwide from "./LivingFaithWorldwide";
import CtaSection from "@/components/CtaSection";

export default function GivingPage() {
    return (
        <>
            <Hero />
            <GivingInfo />
            <GivingDetails />
            <LivingFaithWorldwide />
            <CtaSection
                title="Join Us in Making a Difference"
                description="Your giving transforms lives and advances God's kingdom. Every contribution helps us spread the Gospel, support our ministries, serve our community, and reach more lives with the love of Christ. Your faithful giving is an act of worship that makes a lasting impact."
                mainText="Thank you for your generous giving! We'd love to have you join us in person and become part of our church family."
                buttons={[
                    { text: "Join Our Services", href: "/services" },
                    { text: "Learn More About Us", href: "/about" },
                ]}
            />
        </>
    );
}
