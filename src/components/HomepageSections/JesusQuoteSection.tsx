"use client";

export default function JesusQuoteSection() {
  return (
    <section
      className="relative bg-cover bg-center py-32 text-white bg-primary-300 -mt-12 -z-1"
      // style={{ backgroundImage: "url('/church-bg.jpg')" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-8">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4 italic">
            Jesus Christ Said:
          </h2>
          <p className="text-xl italic text-accent mb-2">
            &quot;16 For God so loved the world, that he gave his only begotten
            Son, that whosoever believeth in him should not perish, but have
            everlasting life.&quot;
          </p>
          <p className="italic font-semibold">
            Bible: <span className="font-bold">John 3:16 KJV</span>
          </p>
        </div>
      </div>
    </section>
  );
}
