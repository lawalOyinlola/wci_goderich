import React from "react";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Ben Bernard",
    role: "Instacart",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "👨‍💻",
  },
  {
    name: "Kevin Whinnery",
    role: "OpenAI",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🚀",
  },
  {
    name: "Sawyer Hood",
    role: "Figma",
    quote: "Cursor is hands down my biggest workflow improvement in years",
    avatar: "🎨",
  },
  {
    name: "Andrew Milich",
    role: "Notion",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "⚡",
  },
  {
    name: "Morgan McGuire",
    role: "Weights & Biases",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🔬",
  },
  {
    name: "Alex MacCaw",
    role: "Reflect",
    quote:
      "Cursor is the best product I've used in a while - it's an AI enabled editor. I just asked it to write a README for a project I've been working on - analyzed the code-base and worked first time. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "📝",
  },
  {
    name: "Johannes Schickling",
    role: "Prisma",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "⚙️",
  },
  {
    name: "Wes Bos",
    role: "Internet",
    quote:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
  {
    name: "Wes Bos",
    role: "Internet",
    quote:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
];

export function CursorStyleTestimonials() {
  return (
    <section className="py-20 bg-border dark:bg-primary-foreground">
      <div className="container px-4">
        {/* Header */}

        <SectionHeader
          title="Wonders of God in the Community"
          subtitle="Testimonies"
          // subtitleClassName="text-black"
        />

        {/* Testimonials Grid - Masonry Layout with Different Fade Effects */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 fade-out-all-sides">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`break-inside-avoid mb-6 bg-card text-card-foreground backdrop-blur-sm rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-card/40 group`}
            >
              {/* Quote */}
              <blockquote className="font-open-sans mb-4 leading-relaxed text-sm line-clamp-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action with Combined Fade Effect */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden fade-out-rectangular">
            <h3 className="text-2xl font-bold font-open-sans mb-4">
              Ready to transform your coding experience?
            </h3>
            <p className="font-open-sans text-blue-100 mb-6">
              Join thousands of developers who have already discovered the power
              of AI-assisted coding with Cursor.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold font-open-sans hover:bg-blue-50 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>

        {/* Demo Section - Show Different Fade Effects */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold font-open-sans text-center mb-8">
            Different Fade Effect Combinations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* All Sides Fade */}
            <div className="fade-out-all-sides bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">All Sides Fade</h4>
              <p className="text-sm text-gray-300">
                Content fades out on all sides using multiple gradients
                combined.
              </p>
            </div>

            {/* Corners Fade */}
            <div className="fade-out-corners bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Corners Fade</h4>
              <p className="text-sm text-gray-300">
                Diagonal fade effect from corners to center.
              </p>
            </div>

            {/* Multi-directional Fade */}
            <div className="fade-out-multi bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Multi-directional</h4>
              <p className="text-sm text-gray-300">
                Fade from all four directions simultaneously.
              </p>
            </div>

            {/* Rectangular Fade */}
            <div className="fade-out-rectangular bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Rectangular Fade</h4>
              <p className="text-sm text-gray-300">
                More structured fade than radial, rectangular shape.
              </p>
            </div>

            {/* Custom Fade */}
            <div className="fade-out-custom bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Custom Fade</h4>
              <p className="text-sm text-gray-300">
                Soft fade with 5% to 95% visibility range.
              </p>
            </div>

            {/* Enhanced Radial */}
            <div className="fade-out-all bg-gray-800 p-6 rounded-xl">
              <h4 className="font-semibold mb-2">Enhanced Radial</h4>
              <p className="text-sm text-gray-300">
                Improved radial fade with multiple opacity steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
