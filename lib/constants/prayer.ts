import type { PrayerPoint } from "@/lib/types/prayer";

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
  ...generalPrayerPoints,
  ...specialPrayerPoints,
];

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
