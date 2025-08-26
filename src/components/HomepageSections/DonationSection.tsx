"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DonationSection() {
  return (
    <section className="max-w-4xl mx-auto bg-secondary-800 p-16 rounded-lg shadow-lg text-center text-white">
      <h2 className="text-4xl font-bold mb-4">
        Give towards the <span className="text-accent">Building Project</span>
      </h2>
      <p className="text-gray-400 mb-8">
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics
      </p>
      <Button variant="secondary" size="lg" asChild>
        <Link href="https://www.paypal.com/donate/?hosted_button_id=22480427">
          Give now!
        </Link>
      </Button>
    </section>
  );
}
