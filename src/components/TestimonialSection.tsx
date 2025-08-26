import React from "react";
import { FadeOverlay } from "@/components/ui/fade-overlay";

const testimonials = [
  {
    name: "Ben Bernard",
    role: "Instacart",
    quote:
      "Cursor is at least a 2x improvement over Copilot. It's amazing having an AI pair programmer, and is an incredible accelerator for me and my team.",
    avatar: "👨‍💻",
  },
  {
    name: "Kevin Whinnery",
    role: "OpenAI",
    quote:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do.",
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
      "I love writing code and Cursor is a necessity. Cursor is steps ahead of my brain, proposing multi-line edits so I type 'tab' more than anything else.",
    avatar: "⚡",
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-lora text-slate-900 mb-4">
            Loved by world-class developers
          </h2>
          <p className="text-xl font-open-sans text-slate-600 max-w-2xl mx-auto">
            Engineers all around the world reach for Cursor by choice.
            Experience the power of AI-assisted coding.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeOverlay
              key={index}
              variant="default"
              position="all"
              size="lg"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                {/* Avatar */}
                <div className="text-4xl mb-4">{testimonial.avatar}</div>

                {/* Quote */}
                <blockquote className="font-open-sans text-slate-700 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="font-lora">
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </FadeOverlay>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <FadeOverlay
            variant="subtle"
            position="top"
            size="md"
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <div>
              <h3 className="text-2xl font-bold font-lora mb-4">
                Ready to transform your coding experience?
              </h3>
              <p className="font-open-sans text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of developers who have already discovered the
                power of AI-assisted coding with Cursor.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold font-open-sans hover:bg-blue-50 transition-colors">
                Get Started Free
              </button>
            </div>
          </FadeOverlay>
        </div>
      </div>
    </section>
  );
}
