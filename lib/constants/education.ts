export const SCHOOLS = {
  sierraLeone: {
    primary: [
      {
        id: "1",
        name: "Winners Chapel International Primary School",
        location: "Goderich, Freetown",
        type: "primary" as const,
        description:
          "A Christian primary school providing quality education with biblical values.",
        established: "2015",
      },
      {
        id: "2",
        name: "Living Faith Primary School",
        location: "Freetown",
        type: "primary" as const,
        description:
          "Dedicated to nurturing young minds with excellence in academics and character.",
      },
    ],
    secondary: [
      {
        id: "3",
        name: "Winners Chapel International Secondary School",
        location: "Goderich, Freetown",
        type: "secondary" as const,
        description:
          "Secondary education focused on academic excellence and spiritual development.",
        established: "2016",
      },
      {
        id: "4",
        name: "Living Faith Secondary School",
        location: "Freetown",
        type: "secondary" as const,
        description:
          "Preparing students for higher education and life with Christian values.",
      },
    ],
    university: [],
  },
  nigeria: {
    primary: [
      {
        id: "5",
        name: "Covenant University Staff School",
        location: "Ota, Ogun State",
        type: "primary" as const,
        description:
          "Primary education arm of Covenant University, providing foundational education.",
        website: "https://covenantuniversity.edu.ng",
      },
      {
        id: "6",
        name: "Living Faith Primary School",
        location: "Canaanland, Ota",
        type: "primary" as const,
        description:
          "Primary school within the Canaanland campus, nurturing young believers.",
      },
      {
        id: "7",
        name: "Faith Academy Primary School",
        location: "Canaanland, Ota",
        type: "primary" as const,
        description:
          "Excellence-driven primary education with strong Christian foundation.",
      },
    ],
    secondary: [
      {
        id: "8",
        name: "Faith Academy",
        location: "Canaanland, Ota, Ogun State",
        type: "secondary" as const,
        description:
          "Premier Christian secondary school known for academic excellence and character development.",
        website: "https://faithacademy.org.ng",
        established: "1999",
      },
      {
        id: "9",
        name: "Kingdom Heritage Model School",
        location: "Canaanland, Ota",
        type: "secondary" as const,
        description:
          "Secondary education focused on producing well-rounded individuals.",
      },
      {
        id: "10",
        name: "Living Faith Secondary School",
        location: "Canaanland, Ota",
        type: "secondary" as const,
        description:
          "Comprehensive secondary education with emphasis on academic and spiritual growth.",
      },
    ],
    university: [
      {
        id: "11",
        name: "Covenant University",
        location: "Ota, Ogun State",
        type: "university" as const,
        description:
          "A world-class university committed to raising a new generation of leaders. Ranked among the top universities in Nigeria and Africa.",
        website: "https://covenantuniversity.edu.ng",
        established: "2002",
      },
      {
        id: "12",
        name: "Landmark University",
        location: "Omu-Aran, Kwara State",
        type: "university" as const,
        description:
          "A private Christian university focused on agricultural innovation and sustainable development.",
        website: "https://lmu.edu.ng",
        established: "2011",
      },
      {
        id: "13",
        name: "Crown University",
        location: "Canaanland, Ota",
        type: "university" as const,
        description:
          "A specialized university offering programs in theology and Christian education.",
      },
    ],
  },
} as const;

export const WOFBI = {
  title: "Winners' Chapel Faith Bible Institute",
  subtitle: "Bible Training",
  description:
    "WOFBI is committed to raising a new generation of leaders through comprehensive biblical education and training. Our programs are designed to equip believers with sound doctrine, practical ministry skills, and a deep understanding of God's Word.",
  mission:
    "To raise a new generation of leaders through the teaching of the Word of Faith, empowering believers to fulfill their God-given destiny.",
  vision:
    "To be a leading Bible institute that produces well-equipped ministers and leaders who will impact their generation for Christ.",
  programs: [
    {
      id: "1",
      title: "Foundation School",
      duration: "6 Months",
      level: "Beginner" as const,
      description:
        "Basic biblical principles and Christian fundamentals for new believers. This foundational course is designed to establish new converts in the faith and provide them with essential Christian knowledge.",
      subjects: [
        "Bible Basics",
        "Christian Living",
        "Prayer",
        "Worship",
        "Evangelism",
        "The New Birth",
        "Faith Fundamentals",
        "Christian Character",
      ],
      schedule: "Saturdays: 9:00 AM - 12:00 PM",
      fee: "Free",
      curriculum: [
        "Understanding Salvation",
        "The Power of Prayer",
        "Living by Faith",
        "Christian Discipleship",
        "The Holy Spirit",
        "Christian Service",
      ],
      requirements: [
        "New believer or interested in Christian fundamentals",
        "Commitment to attend all sessions",
        "Desire to grow in faith",
      ],
      benefits: [
        "Strong foundation in Christian faith",
        "Understanding of basic biblical principles",
        "Confidence in sharing your faith",
        "Connection with other believers",
      ],
      featured: true,
    },
    {
      id: "2",
      title: "Leadership School",
      duration: "12 Months",
      level: "Intermediate" as const,
      description:
        "Advanced training for church leaders and ministry workers. This program equips individuals with practical leadership skills and ministry management abilities.",
      subjects: [
        "Church Administration",
        "Ministry Management",
        "Leadership Skills",
        "Biblical Counseling",
        "Preaching",
        "Discipleship",
        "Team Building",
        "Conflict Resolution",
      ],
      schedule: "Weekdays: 6:00 PM - 8:00 PM",
      fee: "Minimal Registration",
      curriculum: [
        "Principles of Christian Leadership",
        "Church Administration and Management",
        "Effective Ministry Strategies",
        "Biblical Counseling Techniques",
        "Preaching and Teaching Methods",
        "Developing Ministry Teams",
      ],
      requirements: [
        "Completion of Foundation School or equivalent",
        "Active involvement in church ministry",
        "Recommendation from church leadership",
        "Commitment to full program duration",
      ],
      benefits: [
        "Enhanced leadership capabilities",
        "Practical ministry skills",
        "Networking with other leaders",
        "Certification upon completion",
      ],
      featured: true,
    },
    {
      id: "3",
      title: "Advanced Ministry",
      duration: "18 Months",
      level: "Advanced" as const,
      description:
        "Specialized training for pastors and senior ministry leaders. This advanced program provides in-depth theological study and practical ministry application.",
      subjects: [
        "Theology",
        "Church History",
        "Biblical Languages",
        "Advanced Preaching",
        "Church Planting",
        "Pastoral Care",
        "Biblical Hermeneutics",
        "Ministry Ethics",
      ],
      schedule: "Flexible (Online + In-person)",
      fee: "Scholarship Available",
      curriculum: [
        "Systematic Theology",
        "Church History and Movements",
        "Biblical Exegesis and Interpretation",
        "Advanced Homiletics",
        "Church Planting Strategies",
        "Pastoral Leadership",
        "Ministry Administration",
        "Theological Research Methods",
      ],
      requirements: [
        "Completion of Leadership School or equivalent theological training",
        "Active pastoral or senior ministry role",
        "Minimum 3 years ministry experience",
        "Pastoral recommendation",
        "Commitment to academic excellence",
      ],
      benefits: [
        "Advanced theological knowledge",
        "Pastoral certification",
        "Access to mentorship programs",
        "Scholarship opportunities",
        "Networking with senior ministers",
      ],
      featured: true,
    },
  ],
  admissionInfo: {
    title: "Admission Information",
    description:
      "WOFBI welcomes all believers who are committed to growing in their faith and serving in ministry. Our programs are designed to accommodate different schedules and learning styles.",
    process: [
      "Submit application form",
      "Attend orientation session",
      "Complete registration",
      "Begin classes",
    ],
    contact: {
      email: "wofbi@wcigoderich.org",
      phone: "+232 88 123 456",
      officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
    },
  },
  testimonies: [
    {
      name: "Pastor John Doe",
      program: "Advanced Ministry",
      testimony:
        "WOFBI transformed my ministry. The comprehensive training and practical approach helped me become a more effective leader.",
    },
    {
      name: "Sister Mary Smith",
      program: "Foundation School",
      testimony:
        "Foundation School gave me a solid understanding of the Christian faith. I now feel confident sharing my faith with others.",
    },
    {
      name: "Brother David Johnson",
      program: "Leadership School",
      testimony:
        "The Leadership School equipped me with practical skills that I use daily in my ministry. Highly recommended!",
    },
  ],
} as const;
