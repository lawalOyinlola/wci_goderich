import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="bg-border">
      <div className="container py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <Image
            // src="/welcome-image.jpg"
            src="https://picsum.photos/400/400"
            alt="Welcome"
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-6 items-start px-4">
          <h2 className="uppercase text-sm text-gray-400 font-light tracking-[0.4em]">
            Welcome to WCI Goderich
          </h2>

          <h1>Connect, Grow and Serve with us</h1>

          <p className="text-muted-foreground leading-7 max-lg:line-clamp-7">
            Winners Chapel International, Goderich is a branch of the Living
            Faith Church Worldwide, founded under the leadership of Bishop Dr.
            David Oyedepo. Our mandate is to preach the Word of Faith and set
            people free from every oppression of the devil. We are committed to
            carrying out this vision across Goderich and Sierra Leone at large.
            <br />
            <br /> Since our official inauguration in 2013, God has blessed us
            with countless testimonies. We currently worship in a 1,500-seater
            auditorium, with a combined Children and Teens Church that seats up
            to 300. Here, the Word is taught with power, raising strong and
            victorious believers. We&apos;re glad you&apos;re here. Take time to
            explore this platform, and join us in any of our services,
            you&apos;ll encounter God in a life-changing way.
          </p>
          <Button
            variant="ghost"
            size="sm"
            // className="bg-chart-4 dark:bg-muted-foreground dark:hover:bg-background"
            asChild
          >
            <Link href="/about">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
