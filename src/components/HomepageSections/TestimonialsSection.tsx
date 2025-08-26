"use client";

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-semibold mb-12 text-center">Testimonials</h2>
      <div className="max-w-4xl mx-auto space-y-10">
        <blockquote className="text-center italic text-gray-700">
          “This church has been a blessing in my life. The community is loving
          and supportive.”
          <footer className="mt-4 font-semibold">- John Doe</footer>
        </blockquote>
        <blockquote className="text-center italic text-gray-700">
          “The sermons are inspiring and have helped me grow in my faith.”
          <footer className="mt-4 font-semibold">- Jane Smith</footer>
        </blockquote>
        <blockquote className="text-center italic text-gray-700">
          “I love the fellowship and the opportunities to serve others.”
          <footer className="mt-4 font-semibold">- Michael Johnson</footer>
        </blockquote>
      </div>
    </section>
  );
}
