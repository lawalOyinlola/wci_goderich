export const MINISTRIES = {
  title: "Ministries & Fellowship",
  subtitle: "Congregation",
  description:
    "Our church offers diverse branches of fellowship designed to meet the spiritual needs of every member. From our Children's Ministry nurturing young hearts with age-appropriate teachings, to Teens Church guiding adolescents through their formative years, Youth Alive empowering young adults in their faith journey, and Businessmen Fellowship building strong men of God through accountability and mentorship. Each fellowship provides a unique space for connection, growth, and service within our church community.",
  ministries: [
    {
      id: "1",
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
      id: "2",
      title: "Teens Church",
      description:
        "Empowering teenagers to grow in their faith through relevant teachings, dynamic worship, and peer fellowship.",
      href: "/ministries",
      ageRange: "Ages 13-18",
      activities: [
        "Youth Group",
        "Youth Bible Study",
        "Mentorship Program",
        "Youth Retreats",
        "Worship Nights",
      ],
    },
    {
      id: "3",
      title: "Youth Alive",
      description:
        "Empowering young adults to walk in victory through practical Word-based teachings, mentorship, and impactful service.",
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
      id: "4",
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
      id: "5",
      title: "Pastors",
      href: "/pastors",
      description: "Meet our dedicated pastoral team and leadership.",
    },
  ],
} as const;

export const MINISTRY_DETAILS = {
  children: {
    id: 1,
    title: "Children's Ministry",
    subtitle: "Little Hearts, Big Faith",
    tagline: "Where Faith Meets Fun!",
    description:
      "A vibrant and joyful ministry dedicated to nurturing young hearts with age-appropriate Bible teachings, creative activities, and lots of fun! We believe in making God's Word come alive for children through stories, songs, games, and interactive learning.",
    mission:
      "To raise godly children who know, love, and serve Jesus Christ with joyful hearts.",
    vision:
      "To create a safe, fun, and engaging environment where children can discover God's love and grow in their faith.",
    ageRange: "Ages 1-12",
    schedule: {
      sunday: "9:00 AM - 12:00 PM (Concurrent with main service)",
      specialEvents: "First Saturday of every month",
    },
    programs: [
      {
        id: "1",
        name: "Sunday School",
        description:
          "Interactive Bible lessons with stories, crafts, and activities designed for different age groups.",
        ageGroup: "Ages 3-12",
        time: "Sundays 9:00 AM",
      },
      {
        id: "2",
        name: "Children's Choir",
        description:
          "Kids learn to worship God through music, songs, and joyful praise.",
        ageGroup: "Ages 5-12",
        time: "Saturdays 2:00 PM",
      },
      {
        id: "3",
        name: "Vacation Bible School",
        description:
          "An exciting week-long program during school holidays with games, crafts, Bible stories, and lots of fun!",
        ageGroup: "Ages 3-12",
        time: "School Holidays",
      },
      {
        id: "4",
        name: "Bible Games & Activities",
        description:
          "Learning through play! Interactive games that teach biblical principles in a fun way.",
        ageGroup: "Ages 3-12",
        time: "Sundays & Special Events",
      },
      {
        id: "5",
        name: "Children's Camp",
        description:
          "Annual camp experience with outdoor activities, Bible studies, and lasting friendships.",
        ageGroup: "Ages 6-12",
        time: "Summer Break",
      },
    ],
    activities: [
      "Bible Story Time",
      "Arts & Crafts",
      "Music & Worship",
      "Memory Verse Games",
      "Puppet Shows",
      "Drama & Skits",
      "Prayer Time",
      "Snack & Fellowship",
    ],
    values: [
      "Love God",
      "Love Others",
      "Be Kind",
      "Tell the Truth",
      "Be Thankful",
      "Pray Always",
    ],
    leaders: [
      {
        name: "Sister Lisa Anderson",
        role: "Children's Ministry Director",
        bio: "Passionate about making God's Word accessible and fun for children.",
      },
    ],
    contact: {
      email: "children@wcigoderich.org",
      phone: "+232 88 123 456",
    },
    colors: {
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      accent: "#FFE66D",
    },
  },
  teens: {
    id: 2,
    title: "Teens Church",
    subtitle: "Faith for the Future",
    tagline: "Real Faith. Real Life. Real Impact.",
    description:
      "A dynamic ministry designed specifically for teenagers navigating the challenges of adolescence. We provide relevant Bible teachings, authentic worship, and a supportive community where teens can grow in their faith and discover their purpose.",
    mission:
      "To empower teenagers to live out their faith boldly and make a positive impact in their generation.",
    vision:
      "To raise a generation of teens who are passionate about God, grounded in His Word, and committed to making a difference.",
    ageRange: "Ages 13-18",
    schedule: {
      sunday: "9:00 AM - 12:00 PM (Concurrent with main service)",
      midweek: "Wednesdays 6:00 PM - 7:30 PM",
      specialEvents: "Last Friday of every month",
    },
    programs: [
      {
        id: "1",
        name: "Teens Sunday Service",
        description:
          "Dynamic worship and relevant Bible teachings tailored for teenagers.",
        ageGroup: "Ages 13-18",
        time: "Sundays 9:00 AM",
      },
      {
        id: "2",
        name: "Teens Connect",
        description:
          "Midweek fellowship with Bible study, discussions, and peer support.",
        ageGroup: "Ages 13-18",
        time: "Wednesdays 6:00 PM",
      },
      {
        id: "3",
        name: "Teens Impact",
        description: "Outreach and community service projects led by teens.",
        ageGroup: "Ages 13-18",
        time: "Monthly",
      },
      {
        id: "4",
        name: "Teens Camp",
        description:
          "Annual camp with worship, teaching, fun activities, and spiritual growth.",
        ageGroup: "Ages 13-18",
        time: "Summer Break",
      },
      {
        id: "5",
        name: "Teens Leadership Academy",
        description:
          "Leadership development program for teens who want to serve and lead.",
        ageGroup: "Ages 15-18",
        time: "Quarterly",
      },
    ],
    activities: [
      "Dynamic Worship",
      "Bible Study & Discussion",
      "Peer Mentorship",
      "Community Service",
      "Games & Fun Activities",
      "Prayer & Intercession",
      "Talent Shows",
      "Outreach Programs",
    ],
    topics: [
      "Identity in Christ",
      "Relationships & Dating",
      "Peer Pressure",
      "Faith & Science",
      "Purpose & Calling",
      "Dealing with Challenges",
      "Making Right Choices",
      "Sharing Your Faith",
    ],
    leaders: [
      {
        name: "Pastor Youth Leader",
        role: "Teens Pastor",
        bio: "Dedicated to helping teens navigate life with faith and purpose.",
      },
    ],
    contact: {
      email: "teens@wcigoderich.org",
      phone: "+232 88 123 456",
    },
    colors: {
      primary: "#667EEA",
      secondary: "#764BA2",
      accent: "#F093FB",
    },
  },
  youth: {
    id: 3,
    title: "Youth Alive",
    subtitle: "Empowered to Impact",
    tagline: "Raising Champions for Christ",
    description:
      "A vibrant fellowship for young adults committed to walking in victory and making a difference. Through practical Word-based teachings, mentorship, and impactful service, we equip young people to excel in every area of life.",
    mission:
      "To empower young adults to walk in victory, fulfill their God-given purpose, and impact their generation for Christ.",
    vision:
      "To raise a generation of young leaders who are spiritually strong, professionally excellent, and committed to kingdom advancement.",
    ageRange: "Ages 18-60",
    schedule: {
      sunday: "11:00 AM Service",
      midweek: "Thursdays 7:00 PM - 9:00 PM",
      prayer: "Fridays 6:00 AM",
      specialEvents: "First Saturday of every month",
    },
    programs: [
      {
        id: "1",
        name: "Youth Alive Service",
        description:
          "Powerful worship and practical Word-based teachings for young adults.",
        ageGroup: "Ages 18-60",
        time: "Sundays 11:00 AM",
      },
      {
        id: "2",
        name: "Youth Bible Study",
        description:
          "In-depth Bible study and discussion groups for spiritual growth.",
        ageGroup: "Ages 18-60",
        time: "Thursdays 7:00 PM",
      },
      {
        id: "3",
        name: "Mentorship Program",
        description:
          "One-on-one and group mentorship for personal and professional development.",
        ageGroup: "Ages 18-60",
        time: "Flexible Schedule",
      },
      {
        id: "4",
        name: "Youth Impact Projects",
        description:
          "Community outreach and service projects to make a positive impact.",
        ageGroup: "Ages 18-60",
        time: "Monthly",
      },
      {
        id: "5",
        name: "Youth Conference",
        description:
          "Annual conference with powerful speakers, worship, and networking.",
        ageGroup: "Ages 18-60",
        time: "Annually",
      },
    ],
    activities: [
      "Dynamic Worship",
      "Bible Study",
      "Mentorship",
      "Networking Events",
      "Career Development",
      "Prayer & Intercession",
      "Community Service",
      "Social Events",
    ],
    focusAreas: [
      "Spiritual Growth",
      "Career Excellence",
      "Financial Wisdom",
      "Relationships",
      "Leadership Development",
      "Kingdom Impact",
      "Personal Development",
      "Service & Ministry",
    ],
    leaders: [
      {
        name: "Pastor Youth Coordinator",
        role: "Youth Alive Director",
        bio: "Passionate about raising young leaders who excel in life and ministry.",
      },
    ],
    contact: {
      email: "youth@wcigoderich.org",
      phone: "+232 88 123 456",
    },
    colors: {
      primary: "#F093FB",
      secondary: "#4FACFE",
      accent: "#43E97B",
    },
  },
  businessmen: {
    id: 4,
    title: "Businessmen Fellowship",
    subtitle: "Building Strong Men of God",
    tagline: "Excellence in Business, Excellence in Faith",
    description:
      "A powerful fellowship for men committed to building strong businesses while maintaining strong faith. Through accountability, mentorship, and spiritual development, we equip men to excel professionally and serve God faithfully.",
    mission:
      "To build strong men of God who excel in business, lead with integrity, and impact their communities for Christ.",
    vision:
      "To raise a generation of business leaders who combine professional excellence with unwavering faith and godly character.",
    ageRange: "Ages 18 and above",
    schedule: {
      sunday: "Main Service",
      fellowship: "First Saturday of every month, 4:00 PM - 6:00 PM",
      prayer: "Tuesdays 6:00 AM",
      specialEvents: "Quarterly Business Seminars",
    },
    programs: [
      {
        id: "1",
        name: "Monthly Fellowship",
        description:
          "Monthly gathering for prayer, Bible study, and business discussions.",
        ageGroup: "Ages 18+",
        time: "First Saturday, 4:00 PM",
      },
      {
        id: "2",
        name: "Men's Bible Study",
        description:
          "In-depth Bible study focused on biblical principles for business and life.",
        ageGroup: "Ages 18+",
        time: "Tuesdays 6:00 AM",
      },
      {
        id: "3",
        name: "Accountability Groups",
        description:
          "Small groups for mutual support, accountability, and encouragement.",
        ageGroup: "Ages 18+",
        time: "Weekly",
      },
      {
        id: "4",
        name: "Business Seminars",
        description:
          "Quarterly seminars on business excellence, leadership, and financial wisdom.",
        ageGroup: "Ages 18+",
        time: "Quarterly",
      },
      {
        id: "5",
        name: "Leadership Training",
        description:
          "Training programs to develop leadership skills for business and ministry.",
        ageGroup: "Ages 18+",
        time: "Bi-annually",
      },
    ],
    activities: [
      "Bible Study",
      "Prayer & Intercession",
      "Business Networking",
      "Mentorship",
      "Accountability Groups",
      "Community Service",
      "Leadership Training",
      "Business Seminars",
    ],
    principles: [
      "Integrity in Business",
      "Excellence in Service",
      "Faithful Stewardship",
      "Godly Leadership",
      "Kingdom Impact",
      "Accountability",
      "Mentorship",
      "Community Service",
    ],
    leaders: [
      {
        name: "Brother James Wilson",
        role: "Businessmen Fellowship Leader",
        bio: "Committed to building men who excel in business and faith.",
      },
    ],
    contact: {
      email: "businessmen@wcigoderich.org",
      phone: "+232 88 123 456",
    },
    colors: {
      primary: "#2C3E50",
      secondary: "#34495E",
      accent: "#E74C3C",
    },
  },
} as const;
