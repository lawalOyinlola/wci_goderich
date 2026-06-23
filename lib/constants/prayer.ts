import type {
  PrayerPoint,
  PrayerSession,
  MidnightPrayerGroups,
} from "@/lib/types/prayer";
import { SERVICES } from "./services";

// 90 Minutes With Jesus — Midnight Intercessory Prayer Guidelines.
// These are published weekly; update the intercessions, personalSupplication
// and `date` for each group whenever a new guideline is issued.
export const MIDNIGHT_PRAYER_WEEK_LABEL =
  "90 Minutes With Jesus — Midnight Intercessory Prayer Guidelines, June 22nd – 27th, 2026";

// Midnight Prayer Groups Data - Object with groupNumber as key
// Each group is assigned to a specific day of the week (Group 1 = Monday, Group 2 = Tuesday, etc.)
export const MIDNIGHT_PRAYER_GROUPS: MidnightPrayerGroups = {
  1: {
    name: "Prayer Group 1",
    description:
      "A weekly prayer program divided into rotating groups; each group is assigned a specific day of the week to pray. Group 1 meets on Mondays.",
    day: "Monday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 32,
    date: "2026-06-22",
    intercessions: [
      {
        prayer:
          "Father, thank You for drafting unprecedented multitudes into our Service(s) last Sunday, and for healing every sickness and disease by the power of Your word.",
        scripture:
          "Psalm 118:23 - This is the Lord's doing; it is marvellous in our eyes.",
      },
      {
        prayer:
          "Father, we decree the release of legions of Angels into our harvest field to uproot every satanic installation manipulating people from coming to this church this coming Sunday.",
        scripture:
          "Psalm 103:20 - Bless the Lord, ye his angels, that excel in strength, that do his commandments, hearkening unto the voice of his word.",
      },
      {
        prayer:
          "Father, let Your Word continue to provoke signs, wonders and diverse miracles in our services, resulting in the invasion of multitudes into this church all through this Midst of the Year Season of Glory and beyond.",
        scripture:
          "Acts 9:34-35 - And Peter said unto him, Aeneas, Jesus Christ maketh thee whole: arise, and make thy bed. And he arose immediately. And all that dwelt at Lydda and Saron saw him, and turned to the Lord.",
      },
      {
        prayer:
          "Father, crush all everlasting mountains and perpetual hills that may be hindering the lives and destinies of our new converts.",
        scripture:
          "Habakkuk 3:6 - He stood, and measured the earth: he beheld, and drove asunder the nations; and the everlasting mountains were scattered, the perpetual hills did bow: his ways are everlasting.",
      },
      {
        prayer:
          "Father, let the Holy Ghost take over our harvest field all through this week, granting supernatural audience with our contacts.",
        scripture:
          "Acts 16:14 - And a certain woman named Lydia, a seller of purple, of the city of Thyatira, which worshipped God, heard us: whose heart the Lord opened, that she attended unto the things which were spoken of Paul.",
      },
    ],
    personalSupplication: {
      prayer:
        "Father, let Your favour surround me as a shield; cause me to be preferred, accepted, and celebrated wherever I go all through this prophetic season and beyond, in Jesus' name.",
      scripture: "Luke 2:52",
    },
  },
  2: {
    name: "Prayer Group 2",
    description:
      "Part of the rotating midnight prayer program where each group intercedes on its assigned weekday. Group 2 meets on Tuesdays.",
    day: "Tuesday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Sister Mary Smith",
    contactEmail: "dawn@wcigoderich.org",
    maxMembers: 30,
    currentMembers: 18,
    date: "2026-06-23",
    intercessions: [
      {
        prayer:
          "Father, we destroy every blindfolding power of the enemy targeted at preventing multitudes from getting saved and established in this church this week.",
        scripture:
          "2 Corinthians 4:4 - In whom the god of this world hath blinded the minds of them which believe not, lest the light of the glorious gospel of Christ, who is the image of God, should shine unto them.",
      },
      {
        prayer:
          "Father, let every local assembly in this Commission be minimum double their current attendance before this Midst of the Year Season of Glory concludes.",
        scripture:
          "Acts 6:7 - And the word of God increased; and the number of the disciples multiplied in Jerusalem greatly; and a great company of the priests were obedient to the faith.",
      },
      {
        prayer:
          "Father, make every service all through this season an encounter with Your prophetic Word, leading to the explosive growth of this church.",
        scripture:
          "Acts 13:44 - And the next sabbath day came almost the whole city together to hear the word of God.",
      },
      {
        prayer:
          "Father, let the Gentiles continue to come to the light of every Winner and kings to the brightness of our rising in this Midst of the Year Season of Glory and beyond.",
        scripture:
          "Isaiah 60:3 - And the Gentiles shall come to thy light, and kings to the brightness of thy rising.",
      },
      {
        prayer:
          "Father, let there be an outbreak of revelation in our Midweek Communion service tonight, resulting in diverse turnaround testimonies.",
        scripture:
          "Isaiah 58:8 - Then shall thy light break forth as the morning, and thine health shall spring forth speedily: and thy righteousness shall go before thee; the glory of the Lord shall be thy rearward.",
      },
    ],
    personalSupplication: {
      prayer:
        "Father, restore every lost opportunity, relationship, blessing, and breakthrough that I have missed, and let the remaining part of this year be greater than my beginning.",
      scripture: "Job 42:10",
    },
  },
  3: {
    name: "Prayer Group 3",
    description:
      "Part of the rotating midnight prayer program where each group intercedes on its assigned weekday. Group 3 meets on Wednesdays.",
    day: "Wednesday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 28,
    date: "2026-06-24",
    intercessions: [
      {
        prayer:
          "Father, let the seal of the Holy Ghost protect all our new converts from all satanic attacks so that they can be established in this Church for life.",
        scripture:
          "Ephesians 1:13 - In whom ye also trusted, after that ye heard the word of truth, the gospel of your salvation: in whom also after that ye believed, ye were sealed with that holy Spirit of promise.",
      },
      {
        prayer:
          "Father, let Kingdom advancement engagement remain every Winner's delight all through Operation Take Your Territory for Christ and beyond, leading to diverse open rewards within this Season of Glory.",
        scripture:
          "Matthew 6:33 - But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      },
      {
        prayer:
          "Father, let every one of our services in this church be a repeat of Pentecost all through this Midst of the Year Season and beyond.",
        scripture:
          "Acts 2:1,41 - And when the day of Pentecost was fully come, they were all with one accord in one place. Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls.",
      },
      {
        prayer:
          "Father, let every Cell in this church be empowered to replicate minimum once before this Midst of the Year Season of Glory concludes.",
        scripture:
          "Exodus 1:7 - And the children of Israel were fruitful, and increased abundantly, and multiplied, and waxed exceeding mighty; and the land was filled with them.",
      },
      {
        prayer:
          "Father, this week, grant supernatural utterance to every soul-winner on the go-for-Christ as we intensify our outreaches, leading to massive salvation of souls.",
        scripture:
          "Acts 2:37,41 - Now when they heard this, they were pricked in their heart, and said...Men and brethren, what shall we do? Then they that gladly received his word were baptized: and the same day there were added unto them about three thousand souls.",
      },
    ],
    personalSupplication: {
      prayer:
        "Father, restore every area of financial loss and release supernatural abundance upon the works of my hands.",
      scripture: "Zechariah 9:12",
    },
  },
  4: {
    name: "Prayer Group 4",
    description:
      "Part of the rotating midnight prayer program where each group intercedes on its assigned weekday. Group 4 meets on Thursdays.",
    day: "Thursday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 25,
    date: "2026-06-25",
    intercessions: [
      {
        prayer:
          "Father, scatter every confederacy and gang up of hell against the continuous growth of this church, thereby retaining this church as a city without walls.",
        scripture:
          "Psalm 68:1-2 - Let God arise, let his enemies be scattered: let them also that hate him flee before him. As smoke is driven away, so drive them away: as wax melteth before the fire, so let the wicked perish at the presence of God.",
      },
      {
        prayer:
          "Father, let the revival fire burn hotter than ever in all our churches, resulting in the record-breaking invasion of multitudes into our services all through this month and beyond.",
        scripture:
          "Leviticus 6:12-13 - And the fire upon the altar shall be burning in it; it shall not be put out: and the priest shall burn wood on it every morning... The fire shall ever be burning upon the altar; it shall never go out.",
      },
      {
        prayer:
          "Father, by the power of Your Word, let there be waves of ear-tingling testimonies in all our services, thereby bringing many others to Christ and this Church.",
        scripture:
          "Zechariah 8:23 - Thus saith the Lord of hosts; In those days it shall come to pass, that ten men shall take hold out of all languages of the nations, even shall take hold of the skirt of him that is a Jew, saying, We will go with you: for we have heard that God is with you.",
      },
      {
        prayer:
          "Father, open the heart of our new converts and new members to actively participate in Cell meetings, thereby enjoying the blessings of fellowship.",
        scripture:
          "Hebrews 10:25 - Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.",
      },
      {
        prayer:
          "Father, fire up the passion for soul-winning in every Winner towards the realization of our minimum one abiding soul before this Midst of the Year Season of Glory concludes.",
        scripture:
          "1 Corinthians 3:8 - Now he that planteth and he that watereth are one: and every man shall receive his own reward according to his own labour.",
      },
    ],
    personalSupplication: {
      prayer:
        "Father, let Your healing power flow through my body, restoring my health, strength, and vitality completely.",
      scripture: "Jeremiah 30:17",
    },
  },
  5: {
    name: "Prayer Group 5",
    description:
      "Part of the rotating midnight prayer program where each group intercedes on its assigned weekday. Group 5 meets on Fridays.",
    day: "Friday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 30,
    date: "2026-06-26",
    intercessions: [
      {
        prayer:
          "Father, terminate every barrier standing in the way of the ingathering of great multitudes into our Service(s) this coming Sunday.",
        scripture:
          "Psalm 24:7 - Lift up your heads, O ye gates; and be ye lift up, ye everlasting doors; and the King of glory shall come in.",
      },
      {
        prayer:
          "Father, let the attendance of this church be minimum double her current attendance before this Midst of the Year Season of Glory concludes.",
        scripture:
          "Zechariah 9:12 - Turn you to the strong hold, ye prisoners of hope: even to day do I declare that I will render double unto thee.",
      },
      {
        prayer:
          "Father, give all our new converts a testimony of 'once I was blind, now I can see', so that they can abide in this church for life.",
        scripture:
          "John 9:25 - He answered and said, Whether he be a sinner or no, I know not: one thing I know, that, whereas I was blind, now I see.",
      },
      {
        prayer:
          "Father, grant every Winner on-the-go for Christ today, a Word in season that will compel minimum one brand-new soul to Christ and this church this coming Sunday.",
        scripture:
          "Isaiah 50:4 - The Lord God hath given me the tongue of the learned, that I should know how to speak a word in season to him that is weary: he wakeneth morning by morning, he wakeneth mine ear to hear as the learned.",
      },
      {
        prayer:
          "Father, let the Holy Ghost come down as a 'Mighty, Rushing Wind', drafting unprecedented multitudes into this Church this coming Sunday.",
        scripture:
          "Numbers 11:31 - And there went forth a wind from the Lord, and brought quails from the sea, and let them fall by the camp...round about the camp, and as it were two cubits high upon the face of the earth.",
      },
    ],
    personalSupplication: {
      prayer:
        "Father, by Your favour, open doors that no man can shut and move me from stagnation into supernatural advancement.",
      scripture: "Revelation 3:8",
    },
  },
  6: {
    name: "Prayer Group 6",
    description:
      "Part of the rotating midnight prayer program where each group intercedes on its assigned weekday. Group 6 meets on Saturdays.",
    day: "Saturday",
    time: "12:00 AM",
    location: "Online (WhatsApp Group)",
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 22,
    date: "2026-06-27",
    intercessions: [
      {
        prayer:
          "Father, we decree the rescue of every captive of hell unto salvation as we invade our harvest fields today, and let it manifest in our Service(s) this Sunday.",
        scripture:
          "Acts 13:48 - And when the Gentiles heard this, they were glad, and glorified the word of the Lord: and as many as were ordained to eternal life believed.",
      },
      {
        prayer:
          "Father, today, let the ears of every unsaved soul across our harvest field hear the compelling sound of the Holy Spirit and be drafted to this Church this Sunday.",
        scripture:
          "Isaiah 5:26 - And he will lift up an ensign to the nations from far, and will hiss unto them from the end of the earth: and, behold, they shall come with speed swiftly.",
      },
      {
        prayer:
          "Father, release Your legions of reaper-angels to wait upon all our new converts and invitees of the week, ensuring their presence in this church this Sunday.",
        scripture:
          "Matthew 26:53 - Thinkest thou that I cannot now pray to my Father, and he shall presently give me more than twelve legions of angels?",
      },
      {
        prayer:
          "Father, we decree perfect weather conditions and hitch-free movement of worshippers in and out of this church this Sunday.",
        scripture:
          "Philippians 2:10 - That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth.",
      },
      {
        prayer:
          "Father, draft record-breaking multitudes into our Service(s) this Sunday, and settle marital destiny by the revelation of Your word.",
        scripture:
          "Psalm 68:6 - God setteth the solitary in families: he bringeth out those which are bound with chains: but the rebellious dwell in a dry land.",
      },
    ],
    personalSupplication: {
      prayer:
        "O Lord, restore all that the enemy has stolen and grant me double honour, joy, and testimony in place of every shame and delay.",
      scripture: "Isaiah 61:7",
    },
  },
};

// Derive the displayed Midnight Prayer Points from MIDNIGHT_PRAYER_GROUPS so
// the join-group cards and the points display always stay in sync.
const midnightPrayerPoints: PrayerPoint[] = Object.entries(
  MIDNIGHT_PRAYER_GROUPS,
).map(([groupNumber, group]) => ({
  id: `midnight-${groupNumber}`,
  title: `${group.name} – ${group.day}`,
  description: MIDNIGHT_PRAYER_WEEK_LABEL,
  category: "midnight",
  groupNumber: Number(groupNumber),
  points: [],
  intercessions: group.intercessions,
  personalSupplication: group.personalSupplication,
  date: group.date,
}));


// General Prayer Points
const generalPrayerPoints: PrayerPoint[] = [
  // Personal Growth
  {
    id: "general-personal-growth-1",
    title: "Personal Growth - Spiritual Development",
    description: "Prayer points for personal spiritual growth and development.",
    category: "general",
    subcategory: "personal-growth",
    points: [
      "Pray for deeper intimacy with God",
      "Intercede for spiritual discipline and consistency",
      "Pray for the fruit of the Spirit to manifest in your life",
      "Ask for wisdom and understanding of God's word",
      "Pray for sensitivity to the Holy Spirit",
      "Intercede for personal transformation and renewal",
    ],
    scripture:
      "2 Peter 3:18 - But grow in the grace and knowledge of our Lord and Savior Jesus Christ...",
  },
  {
    id: "general-personal-growth-2",
    title: "Personal Growth - Character Development",
    description: "Prayer points for developing godly character and integrity.",
    category: "general",
    subcategory: "personal-growth",
    points: [
      "Pray for integrity and honesty in all areas of life",
      "Intercede for humility and servanthood",
      "Pray for patience and perseverance",
      "Ask for God's grace to overcome weaknesses",
      "Pray for Christlike character to be formed",
      "Intercede for strength to stand firm in trials",
    ],
    scripture:
      "Galatians 5:22-23 - But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control...",
  },
  // Family & Relationships
  {
    id: "general-family-relationships-1",
    title: "Family & Relationships - Family Unity",
    description: "Prayer points for family unity, love, and harmony.",
    category: "general",
    subcategory: "family-relationships",
    points: [
      "Pray for unity and love in the family",
      "Intercede for communication and understanding",
      "Pray for forgiveness and reconciliation",
      "Ask for God's peace to rule in the home",
      "Pray for protection over family relationships",
      "Intercede for godly values to be established",
    ],
    scripture:
      "Psalm 133:1 - How good and pleasant it is when God's people live together in unity!",
  },
  {
    id: "general-family-relationships-2",
    title: "Family & Relationships - Parenting",
    description: "Prayer points for parents and children.",
    category: "general",
    subcategory: "family-relationships",
    points: [
      "Pray for wisdom in parenting",
      "Intercede for children's protection and guidance",
      "Pray for godly relationships with children",
      "Ask for patience and understanding",
      "Pray for children to grow in the Lord",
      "Intercede for their education and future",
    ],
    scripture:
      "Proverbs 22:6 - Train up a child in the way he should go, and when he is old he will not depart from it.",
  },
  {
    id: "general-family-relationships-3",
    title: "Family & Relationships - Marriage",
    description: "Prayer points for marriage and marital relationships.",
    category: "general",
    subcategory: "family-relationships",
    points: [
      "Pray for unity and oneness in marriage",
      "Intercede for communication and understanding",
      "Pray for love and respect to grow",
      "Ask for God's grace in difficult times",
      "Pray for protection over the marriage",
      "Intercede for godly example to others",
    ],
    scripture:
      "Ephesians 5:33 - However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.",
  },
  // Church & Community
  {
    id: "general-church-community-1",
    title: "Church & Community - Church Growth",
    description: "Prayer points for the growth and expansion of the church.",
    category: "general",
    subcategory: "church-community",
    points: [
      "Pray for the church's growth and expansion",
      "Intercede for souls to be saved",
      "Pray for new members to be integrated",
      "Ask for God's favor upon the church",
      "Pray for the church's vision to be fulfilled",
      "Intercede for resources and provision",
    ],
    scripture:
      "Acts 2:47 - And the Lord added to their number daily those who were being saved.",
  },
  {
    id: "general-church-community-2",
    title: "Church & Community - Leadership",
    description: "Prayer points for church leadership and pastors.",
    category: "general",
    subcategory: "church-community",
    points: [
      "Pray for the pastor and leadership team",
      "Intercede for wisdom and guidance",
      "Pray for protection and strength",
      "Ask for God's anointing upon them",
      "Pray for their families and personal lives",
      "Intercede for unity among leaders",
    ],
    scripture:
      "1 Timothy 2:1-2 - I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people—for kings and all those in authority...",
  },
  {
    id: "general-church-community-3",
    title: "Church & Community - Community Outreach",
    description: "Prayer points for community service and outreach.",
    category: "general",
    subcategory: "church-community",
    points: [
      "Pray for opportunities to serve the community",
      "Intercede for effective outreach programs",
      "Pray for open doors in the community",
      "Ask for God's love to be demonstrated",
      "Pray for transformation in the community",
      "Intercede for partnerships and connections",
    ],
    scripture:
      "Matthew 5:16 - In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
  },
  // Global Concerns
  {
    id: "general-global-concerns-1",
    title: "Global Concerns - World Peace",
    description: "Prayer points for peace and stability in the world.",
    category: "general",
    subcategory: "global-concerns",
    points: [
      "Pray for peace in conflict-affected regions",
      "Intercede for refugees and displaced persons",
      "Pray for world leaders and governments",
      "Ask for God's intervention in world affairs",
      "Pray for reconciliation between nations",
      "Intercede for protection of innocent lives",
    ],
    scripture:
      "Isaiah 2:4 - He will judge between the nations and will settle disputes for many peoples. They will beat their swords into plowshares...",
  },
  {
    id: "general-global-concerns-2",
    title: "Global Concerns - Missions",
    description: "Prayer points for global missions and evangelism.",
    category: "general",
    subcategory: "global-concerns",
    points: [
      "Pray for missionaries around the world",
      "Intercede for their safety and effectiveness",
      "Pray for open doors in unreached areas",
      "Ask for provision and support for missions",
      "Pray for souls to be saved globally",
      "Intercede for the end-time harvest",
    ],
    scripture:
      "Matthew 28:19-20 - Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit...",
  },
  {
    id: "general-global-concerns-3",
    title: "Global Concerns - Persecuted Church",
    description: "Prayer points for the persecuted church worldwide.",
    category: "general",
    subcategory: "global-concerns",
    points: [
      "Pray for persecuted believers around the world",
      "Intercede for their strength and courage",
      "Pray for their protection and provision",
      "Ask for God's comfort and encouragement",
      "Pray for their persecutors to come to know Christ",
      "Intercede for religious freedom globally",
    ],
    scripture:
      "Hebrews 13:3 - Continue to remember those in prison as if you were together with them in prison, and those who are mistreated as if you yourselves were suffering.",
  },
];

// Special Prayer Points
const specialPrayerPoints: PrayerPoint[] = [
  {
    id: "special-1",
    title: "Special Prayer Points - New Year",
    description: "Prayer points for the new year and new beginnings.",
    category: "special",
    points: [
      "Pray for a year of divine acceleration and progress",
      "Ask God to fulfill all His promises in your life",
      "Intercede for new opportunities and open doors",
      "Pray for divine connections and relationships",
      "Ask for strength and grace to accomplish goals",
      "Pray for protection and preservation throughout the year",
      "Intercede for your family and loved ones",
      "Pray for the church's vision and mandate",
    ],
    scripture:
      "Isaiah 43:19 - See, I am doing a new thing! Now it springs up...",
    date: "2025-01-01",
  },
];

// Export all prayer points
export const PRAYER_POINTS: PrayerPoint[] = [
  ...midnightPrayerPoints,
  ...generalPrayerPoints,
  ...specialPrayerPoints,
];

// Prayer-specific descriptions for services (overrides for prayer context)
const PRAYER_SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Sunday Worship":
    "Join us for corporate worship with times of united prayer and intercession.",
  "90 Min with Jesus":
    "A focused time of prayer and the Word; intercede for personal and church needs.",
  "Communion Service":
    "Prayerful preparation and thanksgiving around the Lord's table.",
  "Covenant Hour of Prayer":
    "Daily intercession for the church, community, and personal growth.",
  "Spiritual Week of Emphasis":
    "Three days set apart for prayer, fasting, and focused intercession.",
  "Satellite Fellowship":
    "Home fellowships gather for prayer, the Word, and community care.",
};

// Convert SERVICES to PrayerSession format with prayer-specific descriptions
function adaptServicesToPrayerSessions(): PrayerSession[] {
  return SERVICES.map((service) => {
    const allTimes =
      "additionalSchedule" in service && service.additionalSchedule
        ? [...service.times, ...service.additionalSchedule.times]
        : [...service.times];

    // Handle Covenant Hour of Prayer: combine the weekday and Saturday schedules
    // into a single session that shows both day/time columns.
    if (
      service.title === "Covenant Hour of Prayer" &&
      "additionalSchedule" in service &&
      service.additionalSchedule
    ) {
      return {
        id: `service-${service.id}`,
        name: service.title,
        description:
          PRAYER_SERVICE_DESCRIPTIONS[service.title] ?? service.description,
        day: `${service.day} & ${service.additionalSchedule.day}`,
        times: allTimes,
        schedules: [
          { day: service.day, times: [...service.times] },
          {
            day: service.additionalSchedule.day,
            times: [...service.additionalSchedule.times],
          },
        ],
        location: "Church Auditorium",
        type: "prayer" as const,
      };
    }

    return {
      id: `service-${service.id}`,
      name: service.title,
      description:
        PRAYER_SERVICE_DESCRIPTIONS[service.title] ?? service.description,
      day: service.day,
      times: allTimes,
      location: "Church Auditorium",
      type: "service" as const,
    };
  }).flat();
}

// Unique prayer sessions NOT found in SERVICES
export const UNIQUE_PRAYER_SESSIONS: PrayerSession[] = [
  {
    id: "midnight-warriors",
    name: "Midnight Prayer Warriors",
    description:
      "Join our weekly Midnight Prayer Warriors program, where members are organized into rotating groups. Each group is assigned a specific day of the week to pray, so you'll participate just once a week on your chosen day. Feel free to join any group that fits your schedule. Each session lasts for one hour, from 12:00 AM to 1:00 AM.",
    day: "Mondays to Fridays",
    times: ["12:00 AM to 01:00 AM"],
    location: "Online (WhatsApp)",
    type: "group",
    isSpecial: true,
  },
];

// Combined list: unique prayer sessions + adapted services
export const PRAYER_SESSIONS: PrayerSession[] = adaptServicesToPrayerSessions();

export const PRAYER_INSPIRATIONS = [
  {
    icon: "LightningIcon",
    title: "Prayer Changes Things",
    description:
      "Prayer is not asking for what you think you want, but asking to be changed in ways you can't imagine. It's the key that unlocks God's power in your life.",
    verse:
      "James 5:16 - The prayer of a righteous person is powerful and effective.",
  },
  {
    icon: "UsersFourIcon",
    title: "Prayer Connects Us",
    description:
      "When we pray together, we create a powerful bond of unity and faith. Corporate prayer amplifies our individual prayers and brings us closer to God and each other.",
    verse:
      "Matthew 18:20 - For where two or three gather in my name, there am I with them.",
  },
  {
    icon: "WavesIcon",
    title: "Prayer Brings Clarity",
    description:
      "In the quiet moments of prayer, God speaks to our hearts, provides direction, and reveals His will for our lives. Prayer is our direct line to heaven.",
    verse:
      "Jeremiah 33:3 - Call to me and I will answer you and tell you great and unsearchable things you do not know.",
  },
] as const;

export const PRAYER_CATEGORIES = [
  { value: "healing", label: "Healing" },
  { value: "provision", label: "Provision" },
  { value: "protection", label: "Protection" },
  { value: "guidance", label: "Guidance" },
  { value: "family", label: "Family" },
  { value: "career", label: "Career" },
  { value: "ministry", label: "Ministry" },
  { value: "salvation", label: "Salvation" },
  { value: "breakthrough", label: "Breakthrough" },
  { value: "other", label: "Other" },
] as const;
