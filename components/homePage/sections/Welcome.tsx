import Image from "next/image";
import CaretButton from "@/components/ui/caret-button";
import { CHURCH_INFO } from "@/lib/constants";

export default function Welcome() {
  const { ABOUT_US } = CHURCH_INFO;

  return (
    <section className="bg-muted-foreground/10">
      <div className="container max-w-500 pl-0 flex flex-col md:flex-row items-stretch gap-10">
        <div className="md:w-1/2 relative h-[400px] md:h-auto">
          <Image
            src="/images/church.png"
            alt="WCI Goderich Church Welcome"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <article className="md:w-1/2 py-20 flex flex-col gap-6 items-start px-4">
          <h2 className="uppercase text-sm text-foreground/90 font-light tracking-[0.4em]">
            Welcome to WCI Goderich
          </h2>

          <h1>Connect, Grow and Serve with us</h1>

          <div className="text-muted-foreground leading-7 max-lg:line-clamp-7">
            {ABOUT_US.map((about, index) => (
              <div key={index}>
                <p>{about}</p>
                {index !== ABOUT_US.length - 1 && <br />}
              </div>
            ))}
          </div>

          <CaretButton href="/about" text="Read More" aria-label="Find out more about our church" />
        </article>
      </div>
    </section>
  );
}
