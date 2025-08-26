"use client";

import Image from "next/image";

export default function GallerySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-semibold mb-12 text-center">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Image
          src="/gallery1.jpg"
          alt="Gallery 1"
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
        />
        <Image
          src="/gallery2.jpg"
          alt="Gallery 2"
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
        />
        <Image
          src="/gallery3.jpg"
          alt="Gallery 3"
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
        />
        <Image
          src="/gallery4.jpg"
          alt="Gallery 4"
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
        />
      </div>
    </section>
  );
}
