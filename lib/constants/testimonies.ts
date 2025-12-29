import type { Testimony } from "@/lib/types/testimonies";

export const TESTIMONIES = {
  title: "Stories of Faith and Transformation",
  subtitle: "Testimonies",
  description:
    "Discover the powerful testimonies of our members as they share how God has transformed their lives.",
  testimonies: [
    {
      id: "1",
      name: "Mary Johnson",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
      testimony:
        "God has been so faithful in my life. Through the ministry of WCI Goderich, I have experienced healing, breakthrough, and divine favor. The Word of Faith has transformed my family and brought us closer to God. I am forever grateful for this church family and the impact it has made in our lives. The prayers, teachings, and fellowship have been a source of strength and encouragement.",
      category: "Healing & Breakthrough",
      date: "2024-12-15",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "2",
      name: "Grace Kamara",
      role: "Prayer Warrior",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
      testimony:
        "The power of prayer I have experienced in this church is beyond words. God has answered countless prayers and shown His faithfulness in miraculous ways.",
      category: "Prayer & Miracles",
      date: "2024-10-10",
      type: "video" as const,
      videoUrl: "https://www.youtube.com/watch?v=example1",
      featured: true,
      verified: true,
    },
    {
      id: "3",
      name: "Esther Bangura",
      role: "Children's Ministry",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
      testimony:
        "Serving in the children's ministry has been a blessing beyond measure. I have seen God work in the lives of our children and their families. The church's commitment to raising godly children gives me hope for the future. Through this ministry, I have grown in my own faith and learned to trust God for greater things.",
      category: "Ministry",
      date: "2024-08-18",
      type: "audio" as const,
      audioUrl: "https://example.com/audio/testimony5.mp3",
      featured: false,
      verified: true,
    },
    {
      id: "4",
      name: "Fatmata Sesay",
      role: "Women's Ministry",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&q=80",
      testimony:
        "The women's ministry has been a source of strength and encouragement for me. Through the fellowship and teachings, I have grown in faith and learned to trust God for all my needs. The church has provided a safe space for women to grow and serve God together.",
      category: "Women's Ministry",
      date: "2024-04-22",
      type: "audio" as const,
      audioUrl: "https://example.com/audio/testimony9.mp3",
      featured: false,
      verified: false,
    },
    {
      id: "5",
      name: "Sarah Conteh",
      role: "Worship Leader",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
      testimony:
        "Leading worship in this church has been an incredible experience. I have seen God move powerfully during our worship services, touching hearts and transforming lives. The church's commitment to excellence in worship has helped me grow as a worshipper and leader. God has used this ministry to bless many people.",
      category: "Worship",
      date: "2024-06-12",
      type: "video" as const,
      videoUrl: "https://www.youtube.com/watch?v=example2",
      featured: false,
      verified: true,
    },
    {
      id: "6",
      name: "Samuel Ade",
      role: "Youth Leader",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
      testimony:
        "WCI Goderich has been a place of transformation for me. The youth ministry has helped me grow in faith and discover my purpose. Through the teachings and mentorship, I have learned to walk in faith and see God's hand in every area of my life. The church has become my second family, and I am blessed to be part of this community.",
      category: "Transformation",
      date: "2024-11-20",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "7",
      name: "Daniel Mensah",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
      testimony:
        "The Word of Faith teachings have revolutionized my business and personal life. I have learned to apply biblical principles in all my endeavors, and God has blessed the work of my hands. The church's emphasis on faith and excellence has helped me achieve success beyond my expectations. I am grateful for the spiritual foundation this church has provided.",
      category: "Business & Prosperity",
      date: "2024-09-25",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "8",
      name: "Michael Thompson",
      role: "Church Elder",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
      testimony:
        "Being part of WCI Goderich leadership has been a journey of faith and growth. I have witnessed God's hand in building this church and transforming lives. The vision of our pastor and the commitment of our members inspire me daily. This church is truly a place where miracles happen and lives are changed for the better.",
      category: "Leadership",
      date: "2024-07-30",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "9",
      name: "James Koroma",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&q=80",
      testimony:
        "The Word of Faith has changed my perspective on life completely. I have learned to see challenges as opportunities for God to show His power. Through the teachings and prayers of this church, I have experienced breakthrough in my health, finances, and relationships. I am forever grateful for WCI Goderich.",
      category: "Breakthrough",
      date: "2024-05-05",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "10",
      name: "John Bangura",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&q=80",
      testimony:
        "WCI Goderich has been a place of healing and restoration for my family. Through the prayers and support of the church, we have overcome challenges and seen God's faithfulness. The church family has been there for us in good times and difficult times, showing us the love of Christ.",
      category: "Healing & Restoration",
      date: "2024-03-15",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "11",
      name: "Aminata Kamara",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=100&h=100&fit=crop&q=80",
      testimony:
        "The teachings on faith and prosperity have transformed my life completely. I have learned to apply God's Word in practical ways and have seen amazing results. The church's emphasis on excellence and integrity has helped me in my career and personal life. I am blessed to be part of this family.",
      category: "Faith & Prosperity",
      date: "2024-02-08",
      type: "written" as const,
      featured: true,
      verified: true,
    },
    {
      id: "12",
      name: "David Kargbo",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
      testimony:
        "God delivered me from a life-threatening illness through the prayers of this church. The doctors had given up, but God showed His power and I am here today to testify. The support and love I received from this church family was overwhelming.",
      category: "Healing & Miracles",
      date: "2024-01-20",
      type: "video" as const,
      videoUrl: "https://www.youtube.com/watch?v=example3",
      featured: true,
      verified: true,
    },
    {
      id: "13",
      name: "Patricia Williams",
      role: "Church Member",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
      testimony:
        "Through the Word of Faith, I learned to trust God with my finances. I was struggling financially, but after applying the principles taught here, God opened doors I never imagined. Today, I can support others and give back to the kingdom.",
      category: "Financial Breakthrough",
      date: "2023-12-10",
      type: "audio" as const,
      audioUrl: "https://example.com/audio/testimony13.mp3",
      featured: false,
      verified: true,
    },
  ] satisfies Testimony[],
};
