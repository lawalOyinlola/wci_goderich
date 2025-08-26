"use client";

// import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EducationPage() {
  const wofbiPrograms = [
    {
      title: "Foundation School",
      duration: "6 Months",
      level: "Beginner",
      description:
        "Basic biblical principles and Christian fundamentals for new believers",
      subjects: [
        "Bible Basics",
        "Christian Living",
        "Prayer",
        "Worship",
        "Evangelism",
      ],
      schedule: "Saturdays: 9:00 AM - 12:00 PM",
      fee: "Free",
    },
    {
      title: "Leadership School",
      duration: "12 Months",
      level: "Intermediate",
      description: "Advanced training for church leaders and ministry workers",
      subjects: [
        "Church Administration",
        "Ministry Management",
        "Leadership Skills",
        "Biblical Counseling",
        "Preaching",
      ],
      schedule: "Weekdays: 6:00 PM - 8:00 PM",
      fee: "Minimal Registration",
    },
    {
      title: "Advanced Ministry",
      duration: "18 Months",
      level: "Advanced",
      description:
        "Specialized training for pastors and senior ministry leaders",
      subjects: [
        "Theology",
        "Church History",
        "Biblical Languages",
        "Advanced Preaching",
        "Church Planting",
      ],
      schedule: "Flexible (Online + In-person)",
      fee: "Scholarship Available",
    },
  ];

  const bibleStudyPrograms = [
    {
      title: "New Believers Class",
      duration: "4 Weeks",
      description: "Perfect for those who are new to the Christian faith",
      topics: ["Salvation", "Baptism", "Holy Spirit", "Church Membership"],
      instructor: "Pastor Jerry Simon",
      nextStart: "January 15, 2025",
    },
    {
      title: "Bible Study Groups",
      duration: "Ongoing",
      description: "Small group Bible studies for deeper understanding",
      topics: [
        "Book Studies",
        "Character Studies",
        "Topical Studies",
        "Life Application",
      ],
      instructor: "Various Leaders",
      nextStart: "Every Saturday",
    },
    {
      title: "Youth Bible Study",
      duration: "School Year",
      description: "Age-appropriate Bible teaching for teenagers",
      topics: [
        "Peer Pressure",
        "Relationships",
        "Faith & Science",
        "Christian Values",
      ],
      instructor: "Youth Ministry Team",
      nextStart: "September 2025",
    },
  ];

  const resources = [
    {
      title: "Digital Library",
      description:
        "Access to thousands of Christian books, sermons, and study materials",
      icon: "📚",
      access: "Free for Members",
    },
    {
      title: "Online Courses",
      description: "Self-paced online courses on various biblical topics",
      icon: "💻",
      access: "Free for Members",
    },
    {
      title: "Study Guides",
      description: "Comprehensive study guides for personal and group study",
      icon: "📖",
      access: "Free Download",
    },
    {
      title: "Audio Resources",
      description: "Sermons, teachings, and Bible study podcasts",
      icon: "🎧",
      access: "Free Streaming",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Education & Training
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Growing in knowledge and understanding of God&apos;s Word
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Why Christian Education Matters
          </h2>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            At WCI Goderich, we believe that education is a vital part of
            spiritual growth. Through structured learning programs, Bible
            studies, and resources, we equip believers to understand God&apos;s
            Word, grow in faith, and serve effectively in ministry.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            <strong>2 Timothy 2:15</strong> - &quot;Study to show thyself
            approved unto God, a workman that needeth not to be ashamed, rightly
            dividing the word of truth.&quot;
          </p>
        </div>
      </section>

      {/* WOFBI Programs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              WOFBI Programs
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Winners&apos; Chapel Faith Bible Institute - Comprehensive
              biblical education and training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wofbiPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {program.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {program.level}
                      </span>
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-4 text-center">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Subjects:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, i) => (
                        <span
                          key={i}
                          className="bg-muted px-2 py-1 rounded text-xs text-foreground/70"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-foreground/70">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                        ⏰
                      </span>
                      {program.schedule}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs mr-2">
                        💰
                      </span>
                      {program.fee}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bible Study Programs */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Bible Study Programs
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Various Bible study opportunities for different age groups and
              spiritual levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bibleStudyPrograms.map((program, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {program.title}
                  </h3>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {program.duration}
                  </span>
                </div>

                <p className="text-foreground/70 mb-4 text-center">
                  {program.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Topics:
                  </h4>
                  <div className="space-y-1">
                    {program.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-foreground/70"
                      >
                        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                      👨‍🏫
                    </span>
                    {program.instructor}
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs mr-2">
                      📅
                    </span>
                    Next: {program.nextStart}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Join Program
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Educational Resources
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Access to a wealth of learning materials and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {resource.title}
                </h3>
                <p className="text-foreground/70 mb-4">
                  {resource.description}
                </p>
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  {resource.access}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Your Learning Path
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              A structured approach to spiritual education and growth
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Foundation School
                </h3>
                <p className="text-foreground/70">
                  Start with basic biblical principles and Christian
                  fundamentals. Perfect for new believers or those wanting to
                  strengthen their foundation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Leadership School
                </h3>
                <p className="text-foreground/70">
                  Develop leadership skills and ministry management abilities.
                  Learn to serve effectively in various church ministries and
                  roles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Advanced Ministry
                </h3>
                <p className="text-foreground/70">
                  Specialized training for pastors and senior ministry leaders.
                  Deep theological study and practical ministry application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Take the first step in your spiritual education journey today
          </p>

          <div className="bg-card rounded-lg p-8">
            <p className="text-foreground/80 mb-6">
              Whether you&apos;re a new believer or a seasoned Christian, our
              educational programs will help you grow in knowledge and
              understanding of God&apos;s Word.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Apply Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/wofbi"> Learn More</Link>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                Need Help Choosing?
              </h4>
              <p className="text-sm text-foreground/70">
                Our education team can help you find the right program based on
                your current level and spiritual goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Invest in Your Spiritual Growth
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Education is an investment that pays eternal dividends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/wofbi">View Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
