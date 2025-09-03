import React from "react";
import SectionHeader from "../SectionHeader";

const testimonies = [
  {
    name: "Sarah Johnson",
    role: "Church Member",
    quote:
      "I've been attending this church for over 10 years and it has truly transformed my life. The community here is so welcoming and supportive. Through the prayer meetings and Bible study groups, I've grown deeper in my faith than I ever thought possible. The pastors here genuinely care about each person's spiritual journey.",
    avatar: "🙏",
  },
  {
    name: "Michael Chen",
    role: "Youth Ministry Volunteer",
    quote:
      "Working with the youth ministry has been one of the most rewarding experiences of my life. Seeing young people discover their faith and grow in confidence is amazing. The church provides such a safe space for teenagers to ask questions and explore their spirituality. I'm grateful to be part of this ministry. Working with the youth ministry has been one of the most rewarding experiences of my life. Seeing young people discover their faith and grow in confidence is amazing. The church provides such a safe space for teenagers to ask questions and explore their spirituality. I'm grateful to be part of this ministry.  Working with the youth ministry has been one of the most rewarding experiences of my life. Seeing young people discover their faith and grow in confidence is amazing. The church provides such a safe space for teenagers to ask questions and explore their spirituality. I'm grateful to be part of this ministry.  ",
    avatar: "👨‍👧‍👦",
  },
  {
    name: "Grace Williams",
    role: "Prayer Team Leader",
    quote:
      "The prayer ministry here is powerful. We've seen countless miracles and answered prayers. What I love most is how the church teaches us to pray with faith and expectation. The community rallies around each other during difficult times, and God always shows up. This church truly believes in the power of prayer.",
    avatar: "✝️",
  },
  {
    name: "David Rodriguez",
    role: "Worship Team Member",
    quote:
      "Being part of the worship team has deepened my relationship with God in ways I never expected. The music ministry here is not just about singing songs - it's about creating an atmosphere where people can encounter God's presence. I've seen lives transformed during worship services.",
    avatar: "🎵",
  },
  {
    name: "Emily Thompson",
    role: "Bible Study Facilitator",
    quote:
      "The Bible study groups here are incredible. We don't just read scripture - we live it out together. The teaching is practical and relevant to everyday life. I've learned so much about God's word and how to apply it in my relationships, work, and daily decisions. This church makes the Bible come alive.",
    avatar: "📖",
  },
  {
    name: "James Wilson",
    role: "Outreach Coordinator",
    quote:
      "Our church's commitment to serving the community is what sets it apart. We don't just talk about love - we show it through action. Whether it's feeding the homeless, visiting nursing homes, or helping families in crisis, we're always looking for ways to be the hands and feet of Jesus in our city.",
    avatar: "🤝",
  },
  {
    name: "Lisa Park",
    role: "Children's Ministry Director",
    quote:
      "The children's ministry here is exceptional. We make learning about God fun and engaging for kids of all ages. What I love most is seeing children develop a genuine love for Jesus at such a young age. The church invests heavily in our children, knowing they are the future of our faith community.",
    avatar: "👶",
  },
  {
    name: "Robert Davis",
    role: "Elder",
    quote:
      "As an elder, I've had the privilege of seeing this church grow from a small congregation to the vibrant community it is today. The leadership here is committed to biblical principles and genuine care for people. We're not perfect, but we're authentic in our faith and our love for God and each other.",
    avatar: "👴",
  },
];

export function TestimoniesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <SectionHeader
          title="Wonders of God in the Community"
          subtitle="Testimonies"
          description="Hear from our church family about how God has worked in their lives"
        />

        {/* Auto-scrolling Testimonies Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of testimonies */}
            {testimonies.map((testimony, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 mx-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                {/* Quote */}
                <blockquote className="font-lora mb-4 leading-relaxed text-sm text-slate-700 dark:text-slate-300 line-clamp-6">
                  "{testimony.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimony.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">
                      {testimony.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {testimony.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {testimonies.map((testimony, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 mx-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                {/* Quote */}
                <blockquote className="font-lora mb-4 leading-relaxed text-sm text-slate-700 dark:text-slate-300 line-clamp-6">
                  "{testimony.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimony.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">
                      {testimony.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {testimony.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold font-lora mb-4 text-white">
              Share Your Testimony
            </h3>
            <p className="font-lora text-blue-100 mb-6">
              Has God worked in your life? We'd love to hear your story and
              share it with our community.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold font-lora hover:bg-blue-50 transition-colors">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
