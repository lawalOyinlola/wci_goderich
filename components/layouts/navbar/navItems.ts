import type { NavItem } from "./type";

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Ministries",
    items: [
      {
        label: "Children's Ministry",
        description:
          "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
        href: "/ministries",
        ageRange: "Ages 3-12",
        activities: [
          "Sunday School",
          "Vacation Bible School",
          "Children's Choir",
          "Bible Games",
        ],
      },
      {
        label: "Teens Church",
        description:
          "Nurturing the faith of our youngest members through age-appropriate Bible stories, songs, and activities.",
        href: "/ministries",
        ageRange: "Ages 3-12",
        activities: [
          "Sunday School",
          "Vacation Bible School",
          "Children's Choir",
          "Bible Games",
        ],
      },
      {
        label: "Youth Alive",
        description:
          "Empowering teenagers to grow in their faith through relevant teachings, activities, and peer support.",
        href: "/ministries",
        ageRange: "Ages 13-18",
        activities: [
          "Youth Bible Study",
          "Fellowship Events",
          "Mentorship",
          "Outreach Programs",
        ],
      },
      {
        label: "Women's Ministry",
        description:
          "Supporting and encouraging women in their spiritual journey through fellowship, prayer, and Bible study.",
        href: "/ministries",
        activities: [
          "Women's Bible Study",
          "Prayer Groups",
          "Fellowship Events",
          "Outreach Programs",
        ],
      },
      {
        label: "Businessmen Fellowship",
        description:
          "Building strong men of God through accountability, mentorship, and spiritual development.",
        href: "/ministries",
        activities: [
          "Men's Bible Study",
          "Accountability Groups",
          "Leadership Training",
          "Community Service",
        ],
      },
      {
        label: "Pastors",
        href: "/pastors",
        description: "Meet our dedicated pastoral team and leadership.",
      },
    ],
  },
  {
    label: "Events & Activities",
    items: [
      {
        label: "Services",
        href: "/services",
        description: "Join our weekly services and worship with us.",
      },
      {
        label: "Service Units",
        href: "/service-units",
        description: "Find a unit to serve and grow your faith.",
      },
      {
        label: "Homecell",
        href: "/homecell",
        description:
          "Connect with a small group near you for fellowship and Bible study.",
      },
      {
        label: "WOFBI",
        href: "/wofbi",
        description:
          "Enroll in our Word of Faith Bible Institute for theological education.",
      },
      {
        label: "Location",
        href: "/location",
        description: "Find our church location and get directions.",
      },
      {
        label: "Events",
        href: "/events",
        description:
          "Discover upcoming events, conferences, and special programs.",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Media",
        href: "/media",
        description:
          "Watch recent sermons, live streams, and multimedia content.",
      },
      {
        label: "Library",
        href: "/library",
        description:
          "Access our digital library of books, teachings, and resources.",
      },
      {
        label: "Gallery",
        href: "/gallery",
        description:
          "View photos from our recent events, services, and community activities.",
      },
      {
        label: "Testimonies",
        href: "/testimonies",
        description:
          "Read and share testimonies of God's faithfulness in our lives.",
      },
      {
        label: "Prayer",
        href: "/prayer",
        description: "Submit prayer requests and join our prayer ministry.",
      },
      {
        label: "Education",
        href: "/education",
        description:
          "Explore our educational programs, Bible studies, and learning resources.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export { navItems };
