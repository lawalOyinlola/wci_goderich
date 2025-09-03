"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";

const blogs = [
  {
    title: "Why Lead Generation is Key for Business Growth",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    image: "/blog1.jpg",
    date: "04 June 2019",
    author: "Admin",
    comments: 3,
  },
  {
    title: "Why Lead Generation is Key for Business Growth",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    image: "/blog2.jpg",
    date: "04 June 2019",
    author: "Admin",
    comments: 3,
  },
  {
    title: "Why Lead Generation is Key for Business Growth",
    excerpt:
      "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    image: "/blog3.jpg",
    date: "04 June 2019",
    author: "Admin",
    comments: 3,
  },
];

export default function LatestBlogSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Read the Latest Blog"
          subtitle="Blog"
          description="Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia"
          titleClassName="text-primary-foreground"
          subtitleClassName="text-primary-foreground"
          descriptionClassName="text-primary-foreground"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
                  <div className="text-lg font-bold">
                    {blog.date.split(" ")[0]}
                  </div>
                  <div className="text-xs">
                    {blog.date.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>

                <div className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    className="w-max text-primary-foreground"
                  >
                    Read More →
                  </Button>
                  <div className="flex gap-2 items-end text-sm text-gray-400">
                    <span>{blog.author}</span>
                    <span>💬 {blog.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
