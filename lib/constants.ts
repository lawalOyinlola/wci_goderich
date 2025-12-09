const CHURCH_INFO = {
  NAME: "WINNERS CHAPEL INT'L GODERICH",
  ADDRESS: "123 Main St, Goderich, ON N7A 1A1",
  PHONE: "519-555-1234",
  EMAIL: "info@wcigoderich.org",
  WEBSITE: "https://www.wcigoderich.org",
  TAGLINE:
    "Making a difference in our community through acts of service and love.",
  ABOUT_US: [
    "Winners Chapel International, Goderich is a branch of the Living Faith Church Worldwide, founded under the leadership of Bishop Dr. David Oyedepo. Our mandate is to preach the Word of Faith and set people free from every oppression of the devil. We are committed to carrying out this vision across Goderich and Sierra Leone at large.",
    "Since our official inauguration in 2013, God has blessed us with countless testimonies. We currently worship in a 1,500-seater auditorium, with a combined Children and Teens Church that seats up to 300. Here, the Word is taught with power, raising strong and victorious believers. We are glad you are here. Take time to explore this platform, and join us in any of our services, you will encounter God in a life-changing way.",
  ],
  MISSION:
    "To make a difference in our community through acts of service and love.",
  VISION:
    "To be a church that is known for its love and service to the community.",
  VALUES: ["Love", "Service", "Community"] as const,
};

const CHURCH_LOCATION = {
  name: "WCI Goderich - Living Faith Church Worldwide",
  address: "CPPG+CMJ, Freetown, Sierra Leone",
  city: "Freetown, Sierra Leone",
  coordinates: {
    lat: 8.4606,
    lng: -13.2897,
  },
  accessibility: "Easily accessible by public transport",
  description:
    "Visit us at our church in Freetown, Sierra Leone. We're located in the heart of the community, easily accessible and welcoming to all.",
} as const;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const FEATURES = [
  {
    icon: "ChurchIcon",
    title: "Worship",
    subtitle: "Honoring God in Spirit and Truth",
    description:
      "We gather to worship God with reverence and joy, acknowledging His holiness and grace in our lives.",
    bible: "John 4:24",
  },
  {
    icon: "UsersThreeIcon",
    title: "Connect",
    subtitle: "Building Community & Fellowship",
    description:
      "We foster meaningful relationships among believers to build spiritual growth and mutual support.",
    bible: "Hebrews 10:24-25",
  },
  {
    icon: "HeartIcon",
    title: "God's Love",
    subtitle: "Experiencing Grace and Mercy",
    description:
      "We embrace the unconditional love of God that transforms lives and brings hope to all.",
    bible: "Romans 5:8",
  },
] as const;

const SERVICES = [
  {
    id: 1,
    icon: "ChurchIcon",
    title: "Sunday Worship",
    description:
      "Experience powerful worship, inspiring messages, and spiritual fellowship every Sunday morning.",
    day: "Sunday",
    times: ["07:00AM", "09:00AM", "11:00AM"],
    accentColor: "text-accent",
  },
  {
    id: 2,
    icon: "ClockCountdownIcon",
    iconClassName: "rotate-270",
    title: "90 Min with Jesus",
    description: "Deepen your faith through our weekly Bible study groups.",
    day: "Mondays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 3,
    icon: "BreadIcon",
    title: "Communion Service",
    description:
      "Participate in the sacred communion service, remembering Christ's sacrifice and sharing in fellowship.",
    day: "Wednesdays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 4,
    icon: "HandsPrayingIcon",
    title: "Covenant Hour of Prayer",
    description:
      "Join our daily prayer sessions to intercede for the church, community, and personal spiritual growth.",
    day: "Weekdays",
    times: ["06:00AM"],
    additionalSchedule: {
      day: "Saturday",
      times: ["07:00AM"],
    },
    accentColor: "text-accent",
  },
  {
    id: 5,
    icon: "CrossIcon",
    title: "Spiritual Week of Emphasis",
    description:
      "Intensive spiritual focus with special teachings, prayer, and fasting during the first week of each month.",
    day: "Wednesdays - Fridays",
    times: ["06:00PM"],
    accentColor: "text-accent",
  },
  {
    id: 6,
    icon: "HouseLineIcon",
    title: "Home Cell",
    description:
      "Join intimate home-based fellowship groups for Bible study, prayer, and building close-knit community relationships.",
    day: "Saturdays",
    times: ["05:00PM"],
    accentColor: "text-accent",
  },
] as const;

const SERMONS = [
  {
    id: 1,
    title: "Let the Sunset Inspire You",
    date: "JULY 01, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    id: 2,
    title: "Developing Spiritual Mentality",
    date: "AUGUST 01, 2025",
    pastor: "Lungi xxx",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    title: "Let the Bible Motivate You",
    date: "AUGUST 29, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=3",
  },
] as const;

const UPCOMING_EVENTS = [
  {
    id: 1,
    title:
      "Sharing Our Faith & Gospel through Christ the teacher of all things",
    date: "2025-10-15",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Pastor Abel Ukweni",
    address: "WCI Goderich Church, Sierra Leone",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Empowering the Next Generation",
    date: "2025-10-25",
    startTime: "10:00am",
    by: "Youth Alive Fellowship",
    address: "WCI Goderich Church, Sierra Leone",
    image: "/images/events/youth-alive-event.jpg",
  },
  {
    id: 3,
    title: "BREAKING NEW GROUNDS",
    date: "2025-12-10",
    startTime: "8:30am",
    endTime: "11:30am",
    by: "Shiloh 2025",
    address: "Church Premises",
    image: "/images/shiloh-2025.jpg",
  },
] as const;

const DONATIONS = [
  "Building Project",
  "Church Beautification",
  "Worshippers Transportation",
  "Church Welfare",
  "Media/Tech Equipments",
];

const PAST_CELEBRATIONS = [
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    alt: "Joyful birthday celebration",
    name: "Mary Johnson",
    date: "2024-08-12",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    alt: "Birthday cake and candles",
    name: "Samuel Ade",
    date: "2024-07-03",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    alt: "Church thanksgiving celebration",
    name: "Grace K.",
    date: "2024-06-25",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80",
    alt: "Group birthday thanksgiving",
    name: "Daniel Mensah",
    date: "2024-05-18",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=400&fit=crop&q=80",
    alt: "Smiling celebrants",
    name: "Esther B.",
    date: "2024-04-09",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    alt: "Community celebration",
    name: "Michael T.",
    date: "2024-03-30",
  },
] as const;

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
    alt: "Church Interior",
    title: "Beautiful Church Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&q=80",
    alt: "Sunday Service",
    title: "Sunday Worship Service",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=800&fit=crop&q=80",
    alt: "Prayer and Worship",
    title: "Prayer and Worship",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&q=80",
    alt: "Church Community",
    title: "Church Community Fellowship",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=800&fit=crop&q=80",
    alt: "Church Choir",
    title: "Church Choir",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=800&fit=crop&q=80",
    alt: "Church Event",
    title: "Special Church Event",
  },
  {
    src: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=800&fit=crop&q=80",
    alt: "Church Celebration",
    title: "Church Celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop&q=80",
    alt: "Church Fellowship",
    title: "Church Fellowship",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&q=80",
    alt: "Church Ministry",
    title: "Church Ministry",
  },
] as const;

const TESTIMONIES = [
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
] as const;

export {
  CHURCH_INFO,
  CHURCH_LOCATION,
  FEATURES,
  SERVICES,
  SERMONS,
  UPCOMING_EVENTS,
  DONATIONS,
  MONTHS,
  PAST_CELEBRATIONS,
  GALLERY_IMAGES,
  TESTIMONIES,
};
