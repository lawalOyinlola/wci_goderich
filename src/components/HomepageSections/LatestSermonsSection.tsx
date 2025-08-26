"use client";

import Image from "next/image";

export default function LatestSermonsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Latest Sermons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
          <Image
            src="/sermon1.jpg"
            alt="Sermon 1"
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Faith and Hope</h3>
            <p className="text-gray-700 mb-4">
              A powerful sermon on faith and hope in challenging times.
            </p>
            <a href="#" className="text-accent font-semibold hover:underline">
              Watch Now
            </a>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
          <Image
            src="/sermon2.jpg"
            alt="Sermon 2"
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Love and Compassion</h3>
            <p className="text-gray-700 mb-4">
              Exploring the importance of love and compassion in our lives.
            </p>
            <a href="#" className="text-accent font-semibold hover:underline">
              Watch Now
            </a>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
          <Image
            src="/sermon3.jpg"
            alt="Sermon 3"
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              Prayer and Meditation
            </h3>
            <p className="text-gray-700 mb-4">
              Guidance on prayer and meditation for spiritual growth.
            </p>
            <a href="#" className="text-accent font-semibold hover:underline">
              Watch Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
