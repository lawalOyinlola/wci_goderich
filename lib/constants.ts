import { LeadershipRole } from "./types";

const CHURCH_INFO = {
  NAME: "WINNERS CHAPEL INT'L GODERICH",
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
  CORE_VALUES: [
    {
      title: "Faith",
      description:
        "Living by faith and not by sight, trusting in God's promises.",
    },
    {
      title: "Love",
      description: "Demonstrating God's love through compassion and service",
    },
    {
      title: "The Word",
      description: "Teaching and living by the truth of God's Word.",
    },
  ],
  MANDATE:
    "To liberate the world from all oppressions of the devil through the preaching of the word of faith",
  MANDATE_TASK:
    "Now the hour has come to liberate the world from all oppressions of the devil through the preaching of the word of faith, and I am sending you to undertake this task.",
  PILLARS_OF_FAITH: {
    title: "12 Pillars of our commission",
    subtitle: "Our guide",
    description: [
      'God commissioned the presiding Bishop of this commission with a Word of Faith ministry to our generation. Remember Paul said, "...if the trumpet give an uncertain sound, who shall prepare himself to the battle?" (1 Cor 14:8) As a Commission, we have experienced amazing testimonies ever since this commission was handed down - that is over thirty years now!',
      'The Holy Ghost further inspired the servant of God, Dr. David Oyedepo, to classify the Word of Faith He has committed into his hands into the specific areas of emphasis, in direct response to Isaiah 40:6, "The voice said, Cry. And he said, What shall I cry?"... He has named these 12 areas of emphasis as the 12 Pillars of our Commission. We have crossed Jordan into power, bearing the ark of liberation. Here are the 12 stones, after the order of Joshua 4:1-8, 20-24. Having stood firm upon these twelve stones! And they have resulted in breakthroughs - both for the ministry and all that are partakers with us, of the same grace.',
    ],
    pillars: [
      {
        id: 1,
        title: "FAITH",
        description:
          "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.",
        verses: ["1 John 5:4", "Ephesians 6:16"],
      },
      {
        id: 2,
        title: "THE WORD",
        description:
          "Who being the brightness of his glory, and the express image of his person, and upholding all things by the word of his power...",
        verses: ["John 1:1-12", "Hebrews 1:3"],
      },
      {
        id: 3,
        title: "THE SUPERNATURAL",
        description:
          "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
        verses: ["Psalm 82:5-7", "John 3:8"],
      },
      {
        id: 4,
        title: "PRAISE",
        description:
          "And when they began to sing and to praise, the Lord set ambushments against the children of Ammon, Moab, and mount Seir, which were come against Judah: and they were smitten.",
        verses: ["2 Chronicles 20:20-22", "Psalm 67:1-7", "Psalm 149:1-9"],
      },
      {
        id: 5,
        title: "THE HOLY SPIRIT",
        description:
          "And it shall come to pass in that day, that his burden shall be taken away from off thy shoulder, and his yoke from off thy neck, and the yoke shall be destroyed because of the anointing.",
        verses: ["Acts 1:1-8", "Isaiah 10:27"],
      },
      {
        id: 6,
        title: "PROSPERITY",
        description:
          "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth. Cry yet, saying, Thus saith the Lord of hosts; My cities through prosperity shall yet be spread abroad...",
        verses: ["3 John 2", "Psalm 35:27", "Zechariah 1:17"],
      },
      {
        id: 7,
        title: "VISION",
        description:
          "Where there is no vision, the people perish: but he that keepeth the law, happy is he.",
        verses: ["Proverbs 29:18", "Jeremiah 29:11"],
      },
      {
        id: 8,
        title: "PRAYER",
        description:
          "And this is the confidence that we have in him, that, if we ask anything according to his will, he heareth us.",
        verses: ["1 John 5:14"],
      },
      {
        id: 9,
        title: "HEALING",
        description:
          "That it might be fulfilled which was spoken by Esaias the prophet, saying, Himself took our infirmities, and bare our sicknesses.",
        verses: ["Isaiah 53:3-4", "Jeremiah 8:22", "Matthew 8:17"],
      },
      {
        id: 10,
        title: "WISDOM",
        description:
          "And wisdom and knowledge shall be the stability of thy times, and strength of salvation: the fear of the Lord is his treasure.",
        verses: ["Proverbs 24:3-4", "Isaiah 33:6"],
      },
      {
        id: 11,
        title: "CONSECRATION",
        description:
          "Nevertheless the foundation of God standeth sure, having this seal, the Lord knoweth them that are his. And let every one that nameth the name of Christ depart from iniquity.",
        verses: ["Hebrews 12:14", "2 Timothy 2:19"],
      },
      {
        id: 12,
        title: "SUCCESS",
        description:
          "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.",
        verses: ["Joshua 1:8-10"],
      },
    ],
  },
  FOUNDED: "2010",
  DENOMINATION: "Living Faith Church Worldwide",
  LOGO: "/lfc_logo.png",
  HERO_IMAGE: "/images/2025_theme.png",
  OFFICE_HOUR: "Monday - Friday: 8:00 AM - 5:00 PM",
  CONTACT: {
    phone: "+232 88 123 456",
    email: "info@wcigoderich.org",
    whatsapp: "+232 88 123 456",
    address: "Main Street, Goderich, Western Area, Sierra Leone",
    website: "wcigoderich.org",
    officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
  },
  CHURCH_LOCATION: {
    address: {
      street: "Main Street",
      city: "Goderich",
      region: "Western Area",
      province: "Freetown",
      country: "Sierra Leone",
      postalCode: "SL-001",
    },
    coordinates: {
      lat: 8.4606,
      lng: -13.2897,
    },
    parking:
      "Free parking available on church premises and surrounding streets",
    description:
      "Visit us at our church in Freetown, Sierra Leone. We're located in the heart of the community, easily accessible and welcoming to all.",
    directions: "Easily accessible by public transport",
    accessibility: [
      "Wheelchair accessible",
      "Hearing assistance available",
      "Large print materials available",
    ],
  },
  SOCIAL_LINKS: [
    {
      href: "#",
      ariaLabel: "X/Twitter",
      icon: "XLogoIcon",
    },
    {
      href: "#",
      ariaLabel: "LinkedIn",
      icon: "LinkedinLogoIcon",
    },
    {
      href: "#",
      ariaLabel: "Facebook",
      icon: "FacebookLogoIcon",
    },
    {
      href: "#",
      ariaLabel: "TikTok",
      icon: "TiktokLogoIcon",
    },
    {
      href: "#",
      ariaLabel: "YouTube",
      icon: "YoutubeLogoIcon",
    },
  ],
};

const MINISTRIES = {
  title: "Ministries & Fellowship",
  subtitle: "Congregation",
  description:
    "Our church offers diverse branches of fellowship designed to meet the spiritual needs of every member. From our Children's Ministry nurturing young hearts with age-appropriate teachings, to Teens Church guiding adolescents through their formative years, Youth Alive empowering young adults in their faith journey, and Businessmen Fellowship building strong men of God through accountability and mentorship. Each fellowship provides a unique space for connection, growth, and service within our church community.",
  ministries: [
    {
      id: 1,
      title: "Children's Ministry",
      description:
        "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
      href: "/ministries",
      ageRange: "Ages 1-12",
      activities: [
        "Sunday School",
        "Vacation Bible School",
        "Children's Choir",
        "Bible Games",
      ],
    },
    {
      id: 2,
      title: "Teens Church",
      description:
        "Empowering teenagers to grow in their faith through relevant teachings, dynamic worship, and peer fellowship.",
      href: "/ministries",
      ageRange: "Ages 13-18",
      activities: [
        "Sunday School",
        "Vacation Bible School",
        "Children's Choir",
        "Bible Games",
      ],
    },
    {
      id: 3,
      title: "Youth Alive",
      description:
        "Empowering young adults and adults to walk in victory through practical Word-based teachings, mentorship, and impactful service.",
      href: "/ministries",
      ageRange: "Ages 18-60",
      activities: [
        "Youth Bible Study",
        "Fellowship Events",
        "Mentorship",
        "Outreach Programs",
      ],
    },
    {
      id: 4,
      title: "Businessmen Fellowship",
      description:
        "Building strong men of God through accountability, mentorship, and spiritual development.",
      href: "/ministries",
      ageRange: "Ages 18 and above",
      activities: [
        "Men's Bible Study",
        "Accountability Groups",
        "Leadership Training",
        "Community Service",
      ],
    },
    // {
    //   id: 5,
    //   title: "Women's Ministry",
    //   description:
    //     "Supporting and encouraging women in their spiritual journey through fellowship, prayer, and Bible study.",
    //   href: "/ministries",
    //   activities: [
    //     "Women's Bible Study",
    //     "Prayer Groups",
    //     "Fellowship Events",
    //     "Outreach Programs",
    //   ],
    // },

    {
      id: 5,
      title: "Pastors",
      href: "/pastors",
      description: "Meet our dedicated pastoral team and leadership.",
    },
  ],
} as const;

const LEADERSHIP = {
  title: "Pastors and Directors",
  subtitle: "Leadership",
  description: "Meet our dedicated leaders serving the church and community.",
  PASTORS: [
    {
      id: 1,
      name: "Pastor Abel Ukweni",
      title: "Resident Pastor",
      role: LeadershipRole.RESIDENT_PASTOR,
      bio: "Pastor Abel Ukweni has been serving as Resident Pastor of WCI Goderich since 2015. With over 15 years of ministry experience, he is passionate about teaching God's Word and building strong believers. He holds a Master's degree in Theology and is known for his practical and inspiring messages.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=826&h=1239&fit=crop&q=80",
      email: "pastor.abel@wcigoderich.org",
      phone: "+232 88 123 456",
      education: [
        "Master of Theology - Living Faith Bible College",
        "Bachelor of Divinity - Sierra Leone Theological College",
        "Certificate in Pastoral Ministry - International Bible Institute",
      ],
      experience: [
        "Resident Pastor - WCI Goderich (2015-Present)",
        "Associate Pastor - WCI Freetown (2010-2015)",
        "Youth Pastor - WCI Bo (2008-2010)",
        "Ministry Intern - WCI Kenema (2006-2008)",
      ],
      specialties: [
        "Biblical Teaching",
        "Leadership Development",
        "Pastoral Care",
        "Church Growth",
        "Prayer Ministry",
      ],
      socialMedia: {
        facebook: "https://facebook.com/pastorabelukweni",
        twitter: "https://twitter.com/pastorabelukweni",
        instagram: "https://instagram.com/pastorabelukweni",
      },
      featured: true,
      ordinationDate: "2008",
      yearsInMinistry: 16,
    },
    {
      id: 2,
      name: "Pastor Lungay Sellu",
      title: "Associate Pastor",
      role: LeadershipRole.ASSOCIATE_PASTOR,
      bio: "Pastor Lungi Kamara serves as our Associate Pastor, focusing on women's ministry and family counseling. She brings a heart for nurturing and discipleship, having served in ministry for over 12 years.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=826&h=1239&fit=crop&q=80",
      email: "pastor.lungi@wcigoderich.org",
      phone: "+232 88 123 457",
      education: [
        "Master of Divinity - Sierra Leone Theological College",
        "Bachelor of Christian Education - Living Faith Bible College",
        "Certificate in Counseling - International Christian Counseling Institute",
      ],
      experience: [
        "Associate Pastor - WCI Goderich (2018-Present)",
        "Women's Ministry Director - WCI Freetown (2015-2018)",
        "Children's Pastor - WCI Bo (2012-2015)",
        "Ministry Coordinator - WCI Kenema (2010-2012)",
      ],
      specialties: [
        "Women's Ministry",
        "Family Counseling",
        "Children's Ministry",
        "Discipleship",
        "Pastoral Care",
      ],
      socialMedia: {
        facebook: "https://facebook.com/pastorlungikamara",
        instagram: "https://instagram.com/pastorlungikamara",
      },
      featured: true,
      ordinationDate: "2012",
      yearsInMinistry: 12,
    },
  ],
  LEADERS: [
    {
      id: 1,
      name: "Elder David Thompson",
      title: "Church Elder",
      role: LeadershipRole.ELDER,
      department: "Leadership",
      bio: "Elder David Thompson has been a faithful member of our church for over 20 years and serves as a spiritual leader and advisor to the pastoral team.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=826&h=1239&fit=crop&q=80",
      email: "elder.david@wcigoderich.org",
      responsibilities: [
        "Spiritual oversight",
        "Pastoral support",
        "Church discipline",
        "Leadership development",
      ],
      featured: true,
    },
    {
      id: 2,
      name: "Deacon Grace Williams",
      title: "Head Deacon",
      role: LeadershipRole.DEACON,
      department: "Service",
      bio: "Deacon Grace Williams leads our deacon board and oversees various service ministries within the church.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=826&h=1239&fit=crop&q=80",
      email: "deacon.grace@wcigoderich.org",
      responsibilities: [
        "Deacon board leadership",
        "Service coordination",
        "Member care",
        "Ministry support",
      ],
      featured: true,
    },
    {
      id: 3,
      name: "Sister Maria Rodriguez",
      title: "Worship Director",
      role: LeadershipRole.WORSHIP_DIRECTOR,
      department: "Worship",
      bio: "Sister Maria Rodriguez leads our worship ministry, bringing excellence and anointing to our praise and worship services.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=826&h=1239&fit=crop&q=80",
      email: "worship.maria@wcigoderich.org",
      responsibilities: [
        "Worship team leadership",
        "Music ministry coordination",
        "Worship service planning",
        "Musical training",
      ],
      featured: true,
    },
    {
      id: 4,
      name: "Brother James Wilson",
      title: "Men's Ministry Leader",
      role: LeadershipRole.MINISTRY_LEADER,
      department: "Ministry",
      bio: "Brother James Wilson leads our men's ministry, focusing on spiritual growth, accountability, and leadership development among men.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop&q=80",
      email: "mens.james@wcigoderich.org",
      responsibilities: [
        "Men's fellowship coordination",
        "Leadership development",
        "Mentorship programs",
        "Men's events planning",
      ],
      featured: false,
    },
    {
      id: 5,
      name: "Sister Lisa Anderson",
      title: "Children's Ministry Director",
      role: LeadershipRole.DIRECTOR,
      department: "Ministry",
      bio: "Sister Lisa Anderson leads our children's ministry, creating engaging and educational programs for children of all ages.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop&q=80",
      email: "children.lisa@wcigoderich.org",
      responsibilities: [
        "Children's ministry coordination",
        "Sunday school oversight",
        "Children's events planning",
        "Volunteer training",
      ],
      featured: true,
    },
  ],
  DIRECTORS: [
    {
      id: 3,
      name: "Pastor Michael Chen",
      title: "Chairman Board of Directors",
      role: LeadershipRole.CHAIRMAN,
      bio: "Pastor Michael Chen serves as Chairman of the Board of Directors, providing strategic leadership and governance oversight for WCI Goderich. With extensive experience in organizational leadership and church administration, he ensures the church operates with integrity, vision, and accountability while supporting the pastoral team in fulfilling the church's mission.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=826&h=1239&fit=crop&q=80",
      email: "pastor.michael@wcigoderich.org",
      phone: "+232 88 123 458",
      education: [
        "Master of Divinity - Sierra Leone Theological College",
        "Bachelor of Business Administration - University of Sierra Leone",
        "Certificate in Church Administration - International Bible Institute",
        "Diploma in Leadership and Governance - Christian Leadership Institute",
      ],
      experience: [
        "Chairman Board of Directors - WCI Goderich (2020-Present)",
        "Board Member - WCI Freetown (2018-2020)",
        "Church Administrator - WCI Bo (2016-2018)",
        "Leadership Team Member - WCI Kenema (2014-2016)",
      ],
      specialties: [
        "Strategic Planning",
        "Church Governance",
        "Organizational Leadership",
        "Financial Oversight",
        "Board Development",
      ],
      socialMedia: {
        facebook: "https://facebook.com/pastormichaelchen",
        instagram: "https://instagram.com/pastormichaelchen",
        tiktok: "https://tiktok.com/@pastormichaelchen",
      },
      featured: true,
      ordinationDate: "2014",
      yearsInMinistry: 10,
    },
  ],
};

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
    pastor: "Lungay Sellu",
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
  MINISTRIES,
  LEADERSHIP,
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
