import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import SectionHeader from "@/components/SectionHeader";
import { BorderBeam } from "../magicui/border-beam";

const testimonies = [
  {
    id: 1,
    name: "Mary Johnson",
    role: "Church Member",
    testimony:
      "God has been so faithful in my life. Through the ministry of WCI Goderich, I have experienced healing, breakthrough, and divine favor. The Word of Faith has transformed my family and brought us closer to God. I am forever grateful for this church family and the impact it has made in our lives. The prayers, teachings, and fellowship have been a source of strength and encouragement.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Samuel Ade",
    role: "Youth Leader",
    testimony:
      "WCI Goderich has been a place of transformation for me. The youth ministry has helped me grow in faith and discover my purpose. Through the teachings and mentorship, I have learned to walk in faith and see God's hand in every area of my life. The church has become my second family, and I am blessed to be part of this community.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Grace Kamara",
    role: "Prayer Warrior",
    testimony:
      "The power of prayer I have experienced in this church is beyond words. God has answered countless prayers and shown His faithfulness in miraculous ways.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Daniel Mensah",
    role: "Business Owner",
    testimony:
      "The Word of Faith teachings have revolutionized my business and personal life. I have learned to apply biblical principles in all my endeavors, and God has blessed the work of my hands. The church's emphasis on faith and excellence has helped me achieve success beyond my expectations. I am grateful for the spiritual foundation this church has provided.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Esther Bangura",
    role: "Children's Ministry",
    testimony:
      "Serving in the children's ministry has been a blessing beyond measure. I have seen God work in the lives of our children and their families. The church's commitment to raising godly children gives me hope for the future. Through this ministry, I have grown in my own faith and learned to trust God for greater things.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Michael Thompson",
    role: "Church Elder",
    testimony:
      "Being part of WCI Goderich leadership has been a journey of faith and growth. I have witnessed God's hand in building this church and transforming lives. The vision of our pastor and the commitment of our members inspire me daily. This church is truly a place where miracles happen and lives are changed for the better.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Sarah Conteh",
    role: "Worship Leader",
    testimony:
      "Leading worship in this church has been an incredible experience. I have seen God move powerfully during our worship services, touching hearts and transforming lives. The church's commitment to excellence in worship has helped me grow as a worshipper and leader. God has used this ministry to bless many people.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 8,
    name: "James Koroma",
    role: "Church Member",
    testimony:
      "The Word of Faith has changed my perspective on life completely. I have learned to see challenges as opportunities for God to show His power. Through the teachings and prayers of this church, I have experienced breakthrough in my health, finances, and relationships. I am forever grateful for WCI Goderich.",
    avatar:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Fatmata Sesay",
    role: "Women's Ministry",
    testimony:
      "The women's ministry has been a source of strength and encouragement for me. Through the fellowship and teachings, I have grown in faith and learned to trust God for all my needs. The church has provided a safe space for women to grow and serve God together.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 10,
    name: "John Bangura",
    role: "Church Member",
    testimony:
      "WCI Goderich has been a place of healing and restoration for my family. Through the prayers and support of the church, we have overcome challenges and seen God's faithfulness. The church family has been there for us in good times and difficult times, showing us the love of Christ.",
    avatar:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Aminata Kamara",
    role: "Church Member",
    testimony:
      "The teachings on faith and prosperity have transformed my life completely. I have learned to apply God's Word in practical ways and have seen amazing results. The church's emphasis on excellence and integrity has helped me in my career and personal life. I am blessed to be part of this family.",
    avatar:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=100&h=100&fit=crop&q=80",
  },
];

export default function TestimoniesSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-500 w-full mx-auto">
        <div className="px-4">
          <SectionHeader
            title="Wonders of God in the Community"
            subtitle="Testimonies"
            description="Hear from our church family about how God has worked in their lives"
          />
        </div>

        <div>
          <Carousel
            plugins={[
              AutoScroll({
                speed: 1,
                startDelay: 500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: false,
              }),
            ]}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full fade-out-sides"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <CarouselContent>
              {testimonies.map((testifier, index) => (
                <CarouselItem
                  key={index}
                  className="group basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-5/12 xl:basis-1/3 2xl:basis-2/7 py-3"
                >
                  <div
                    key={index}
                    className="relative group flex flex-col justify-between bg-card dark:bg-background gap-4 aspect-[4/3] backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm overflow-hidden"
                    onMouseEnter={() => {
                      setHoveredItemId(testifier.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                    onTouchStart={() => {
                      setHoveredItemId(testifier.id);
                    }}
                    onTouchEnd={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                    onTouchCancel={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                  >
                    {hoveredItemId === testifier.id && (
                      <BorderBeam
                        size={200}
                        colorFrom="var(--accent)"
                        className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                      />

                      // <BorderTrail
                      //   className="bg-linear-to-l from-secondary-foreground via-chart-4 to-chart-5"
                      //   size={260}
                      // />
                    )}

                    <ScrollArea className="grow">
                      <blockquote className="mb-4 leading-relaxed text-sm duration-300 transition-all">
                        &quot;{testifier.testimony}&quot;
                      </blockquote>
                    </ScrollArea>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={testifier.avatar}
                          alt={testifier.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-great-vibes font-semibold text-sm tracking-wider">
                          {testifier.name}
                        </p>
                        <div className="text-xs text-gray-400">
                          {testifier.role}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-t from-accent/10 via-card/40 to-transparent p-4 transition-all duration-600 ${
                        hoveredItemId === testifier.id
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <Button variant="link">Scroll down to read more</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div
              className={`transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white hover:scale-110 transition-all duration-200" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white hover:scale-110 transition-all duration-200" />
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-16 mx-4">
          <div className="text-primary-foreground bg-gradient-to-br from-accent via-[#f97316] to-[#f59e0b] rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold font-lora mb-4">
              Share Your Testimony
            </h3>
            <p className="mb-6">
              Has God worked in your life? We&apos;d love to hear your story and
              share it with our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="hover:border-accent"
                asChild
              >
                <Link href="/testimonies">View Testimonies</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-background! hover:bg-accent!"
                asChild
              >
                <Link href="/testimonies">Share Your Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
