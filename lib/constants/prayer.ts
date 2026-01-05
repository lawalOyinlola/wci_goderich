import type {
  PrayerGroup,
  PrayerPoint,
  PrayerSession,
  MidnightPrayerGroups,
} from "@/lib/types/prayer";

export const PRAYER_GROUPS: PrayerGroup[] = [
  {
    id: "midnight-1",
    name: "Midnight Prayer Warriors",
    description:
      "A dedicated group that meets weekly at midnight for intensive intercessory prayer. We pray for the church, community, and breakthrough in various areas of life.",
    day: "Fridays",
    time: "12:00 AM",
    location: "Church Auditorium",
    isSpecial: true,
    contactPerson: "Pastor John Doe",
    contactEmail: "prayer@wcigoderich.org",
    contactPhone: "+232 88 123 456",
    maxMembers: 50,
    currentMembers: 32,
  },
  {
    id: "midnight-2",
    name: "Dawn Intercessors",
    description:
      "Early morning prayer group meeting at midnight to usher in the new day with prayer and worship.",
    day: "Tuesdays",
    time: "12:00 AM",
    location: "Online (Zoom)",
    isSpecial: true,
    contactPerson: "Sister Mary Smith",
    contactEmail: "dawn@wcigoderich.org",
    maxMembers: 30,
    currentMembers: 18,
  },
  {
    id: "weekly-1",
    name: "Women's Prayer Circle",
    description:
      "A weekly prayer gathering for women to intercede for families, children, and the community.",
    day: "Wednesdays",
    time: "10:00 AM",
    location: "Church Fellowship Hall",
    contactPerson: "Sister Jane Doe",
    contactEmail: "women@wcigoderich.org",
    maxMembers: 40,
    currentMembers: 25,
  },
  {
    id: "weekly-2",
    name: "Men's Prayer Fellowship",
    description:
      "Men gathering weekly to pray for strength, wisdom, and breakthrough in their lives and families.",
    day: "Thursdays",
    time: "07:00 PM",
    location: "Church Auditorium",
    contactPerson: "Brother James Wilson",
    contactEmail: "men@wcigoderich.org",
    maxMembers: 35,
    currentMembers: 20,
  },
  {
    id: "weekly-3",
    name: "Youth Prayer Force",
    description:
      "Young adults and youth coming together to pray for their generation, education, and future.",
    day: "Saturdays",
    time: "04:00 PM",
    location: "Youth Hall",
    contactPerson: "Pastor Youth Leader",
    contactEmail: "youth@wcigoderich.org",
    maxMembers: 60,
    currentMembers: 45,
  },
];

// Helper function to convert midnight prayer groups object to PrayerPoint[]
// Creates one card per group with all intercessions and personal thanksgiving
const convertMidnightGroupsToPrayerPoints = (
  groups: MidnightPrayerGroups
): PrayerPoint[] => {
  const prayerPoints: PrayerPoint[] = [];

  Object.entries(groups).forEach(([groupNumberStr, group]) => {
    const groupNumber = parseInt(groupNumberStr, 10);

    // Create one card per group with all intercessions and personal thanksgiving
    prayerPoints.push({
      id: `midnight-group-${groupNumber}`,
      title: `Midnight Prayer Group ${groupNumber}`,
      description: `Complete prayer guide for Midnight Prayer Group ${groupNumber} with all intercessions and personal thanksgiving`,
      category: "midnight",
      groupNumber,
      intercessions: group.intercessions,
      personalThanksgiving: group.personalThanksgiving,
      points: [], // Not used for midnight groups, we use intercessions and personalThanksgiving instead
      date: new Date().toISOString().split("T")[0],
    });
  });

  return prayerPoints;
};

// Midnight Prayer Groups Data - Object with groupNumber as key
const MIDNIGHT_PRAYER_GROUPS: MidnightPrayerGroups = {
  1: {
    intercessions: [
      {
        prayer:
          "Pray for divine breakthrough in every area of stagnation. Ask God to break every chain of limitation and bondage. Intercede for open doors and opportunities in career and business. Pray for financial breakthrough and divine provision.",
        scripture:
          "Isaiah 45:2-3 - I will go before you and make the crooked places straight...",
      },
      {
        prayer:
          "Pray for healing and restoration in families. Intercede for broken relationships to be mended. Ask for God's peace and unity in homes. Pray for protection over family members.",
        scripture:
          "Psalm 133:1 - How good and pleasant it is when God's people live together in unity!",
      },
      {
        prayer:
          "Pray for the church's growth and expansion. Intercede for souls to be saved and lives transformed. Pray for the pastor and leadership team. Ask for God's favor and blessing on the church.",
        scripture:
          "Acts 2:47 - And the Lord added to their number daily those who were being saved.",
      },
      {
        prayer:
          "Pray for the nation and its leaders. Intercede for peace and stability in the country. Pray for wisdom and guidance for those in authority. Ask for God's intervention in national affairs.",
        scripture:
          "1 Timothy 2:1-2 - I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people—for kings and all those in authority...",
      },
      {
        prayer:
          "Pray for divine protection over the church and its members. Intercede for protection during travels and journeys. Pray for protection over our children and youth. Ask for God's shield over our health and wellbeing.",
        scripture:
          "Psalm 91:1-2 - He who dwells in the secret place of the Most High...",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for His faithfulness and provision. Express gratitude for answered prayers. Thank God for His protection and guidance. Praise God for His love and mercy.",
      scripture:
        "Psalm 100:4 - Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
    },
  },
  2: {
    intercessions: [
      {
        prayer:
          "Pray for wisdom and direction in decision making. Intercede for clarity and understanding. Pray for divine guidance in all endeavors. Ask for God's will to be revealed.",
        scripture: "Proverbs 3:5-6 - Trust in the Lord with all your heart...",
      },
      {
        prayer:
          "Pray for breakthrough in business and career. Intercede for divine connections and partnerships. Pray for favor in the marketplace. Ask for opportunities for advancement.",
        scripture:
          "Proverbs 16:3 - Commit to the Lord whatever you do, and he will establish your plans.",
      },
      {
        prayer:
          "Pray for revival in the church. Intercede for spiritual awakening. Pray for the move of the Holy Spirit. Ask for God's presence to be manifested.",
        scripture:
          "Habakkuk 3:2 - Lord, I have heard of your fame; I stand in awe of your deeds, Lord. Repeat them in our day...",
      },
      {
        prayer:
          "Pray for the youth and young adults. Intercede for their education and future. Pray for godly relationships and marriages. Ask for protection from negative influences.",
        scripture:
          "1 Timothy 4:12 - Don't let anyone look down on you because you are young, but set an example for the believers...",
      },
      {
        prayer:
          "Pray for the sick and suffering. Intercede for healing and restoration. Pray for comfort and strength. Ask for God's healing power to manifest.",
        scripture:
          "James 5:15 - And the prayer offered in faith will make the sick person well...",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for His guidance and direction. Express gratitude for His provision. Thank God for answered prayers. Praise God for His goodness.",
      scripture:
        "Psalm 107:1 - Give thanks to the Lord, for he is good; his love endures forever.",
    },
  },
  3: {
    intercessions: [
      {
        prayer:
          "Pray for marriages and families. Intercede for unity and love. Pray for godly relationships. Ask for God's grace in relationships.",
        scripture:
          "Ephesians 5:33 - However, each one of you also must love his wife as he loves himself, and the wife must respect her husband.",
      },
      {
        prayer:
          "Pray for children and their future. Intercede for their protection and guidance. Pray for their education and career. Ask for God's favor upon them.",
        scripture:
          "Proverbs 22:6 - Train up a child in the way he should go, and when he is old he will not depart from it.",
      },
      {
        prayer:
          "Pray for the community and neighborhood. Intercede for peace and safety. Pray for opportunities to serve. Ask for God's light to shine in the community.",
        scripture:
          "Matthew 5:16 - In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
      },
      {
        prayer:
          "Pray for missionaries and evangelists. Intercede for their safety and effectiveness. Pray for souls to be saved through their ministry. Ask for provision and support for their work.",
        scripture:
          "Romans 10:15 - And how can anyone preach unless they are sent? As it is written: 'How beautiful are the feet of those who bring good news!'",
      },
      {
        prayer:
          "Pray for the elderly and widows. Intercede for their comfort and provision. Pray for their health and wellbeing. Ask for God's care and protection.",
        scripture:
          "James 1:27 - Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress...",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for His love and care. Express gratitude for family and relationships. Thank God for His protection. Praise God for His faithfulness.",
      scripture:
        "Psalm 127:1 - Unless the Lord builds the house, the builders labor in vain. Unless the Lord watches over the city, the guards stand watch in vain.",
    },
  },
  4: {
    intercessions: [
      {
        prayer:
          "Pray for students and educators. Intercede for academic excellence. Pray for wisdom and understanding. Ask for God's favor in education.",
        scripture:
          "Proverbs 2:6 - For the Lord gives wisdom; from his mouth come knowledge and understanding.",
      },
      {
        prayer:
          "Pray for the media and entertainment industry. Intercede for godly content and influence. Pray for transformation in these sectors. Ask for God's light to shine through media.",
        scripture:
          "Philippians 4:8 - Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
      },
      {
        prayer:
          "Pray for the economy and businesses. Intercede for financial stability. Pray for job opportunities. Ask for God's provision in times of need.",
        scripture:
          "Philippians 4:19 - And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      },
      {
        prayer:
          "Pray for the healthcare system. Intercede for doctors, nurses, and healthcare workers. Pray for healing and medical breakthroughs. Ask for God's wisdom in healthcare.",
        scripture:
          "Jeremiah 30:17 - But I will restore you to health and heal your wounds, declares the Lord...",
      },
      {
        prayer:
          "Pray for the justice system. Intercede for fairness and righteousness. Pray for judges and lawyers. Ask for God's justice to prevail.",
        scripture:
          "Micah 6:8 - He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for education and opportunities. Express gratitude for His provision. Thank God for His wisdom. Praise God for His justice and righteousness.",
      scripture:
        "Psalm 111:10 - The fear of the Lord is the beginning of wisdom; all who follow his precepts have good understanding.",
    },
  },
  5: {
    intercessions: [
      {
        prayer:
          "Pray for global peace and stability. Intercede for nations in conflict. Pray for refugees and displaced persons. Ask for God's intervention in world affairs.",
        scripture:
          "Isaiah 2:4 - He will judge between the nations and will settle disputes for many peoples. They will beat their swords into plowshares...",
      },
      {
        prayer:
          "Pray for the environment and creation. Intercede for stewardship of resources. Pray for solutions to environmental challenges. Ask for God's wisdom in caring for creation.",
        scripture:
          "Genesis 1:28 - God blessed them and said to them, 'Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground.'",
      },
      {
        prayer:
          "Pray for technology and innovation. Intercede for ethical use of technology. Pray for positive impact of technology. Ask for God's guidance in technological advancement.",
        scripture:
          "1 Corinthians 10:31 - So whether you eat or drink or whatever you do, do it all for the glory of God.",
      },
      {
        prayer:
          "Pray for arts and culture. Intercede for godly expression through arts. Pray for transformation in culture. Ask for God's beauty to be reflected in arts.",
        scripture:
          "Philippians 4:8 - Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
      },
      {
        prayer:
          "Pray for the next generation. Intercede for children and youth worldwide. Pray for their protection and guidance. Ask for God's hand upon the future.",
        scripture:
          "Joel 2:28 - And afterward, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions.",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for His creation. Express gratitude for global opportunities. Thank God for His wisdom. Praise God for His sovereignty.",
      scripture:
        "Psalm 24:1 - The earth is the Lord's, and everything in it, the world, and all who live in it.",
    },
  },
  6: {
    intercessions: [
      {
        prayer:
          "Pray for the end-time harvest. Intercede for souls to be saved. Pray for revival across the nations. Ask for God's kingdom to come.",
        scripture:
          "Matthew 9:37-38 - Then he said to his disciples, 'The harvest is plentiful but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.'",
      },
      {
        prayer:
          "Pray for the persecuted church. Intercede for strength and courage. Pray for their protection and provision. Ask for God's comfort and encouragement.",
        scripture:
          "Hebrews 13:3 - Continue to remember those in prison as if you were together with them in prison, and those who are mistreated as if you yourselves were suffering.",
      },
      {
        prayer:
          "Pray for unity in the body of Christ. Intercede for reconciliation and restoration. Pray for love and understanding among believers. Ask for God's Spirit of unity.",
        scripture:
          "Ephesians 4:3 - Make every effort to keep the unity of the Spirit through the bond of peace.",
      },
      {
        prayer:
          "Pray for spiritual gifts and ministries. Intercede for the operation of the Holy Spirit. Pray for the manifestation of God's power. Ask for God's anointing upon His people.",
        scripture:
          "1 Corinthians 12:7 - Now to each one the manifestation of the Spirit is given for the common good.",
      },
      {
        prayer:
          "Pray for the return of Christ. Intercede for readiness and preparation. Pray for the bride to be ready. Ask for God's will to be fulfilled.",
        scripture:
          "Revelation 22:20 - He who testifies to these things says, 'Yes, I am coming soon.' Amen. Come, Lord Jesus.",
      },
    ],
    personalThanksgiving: {
      prayer:
        "Thank God for salvation and redemption. Express gratitude for the church. Thank God for His promises. Praise God for the hope of His return.",
      scripture:
        "1 Thessalonians 5:18 - Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    },
  },
};

// Generate all midnight prayer points from the structured data
const midnightPrayerPoints: PrayerPoint[] = convertMidnightGroupsToPrayerPoints(
  MIDNIGHT_PRAYER_GROUPS
);

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

export const PRAYER_SESSIONS: PrayerSession[] = [
  {
    id: "covenant-hour",
    name: "Covenant Hour of Prayer",
    description:
      "Daily prayer sessions to intercede for the church, community, and personal spiritual growth.",
    day: "Weekdays",
    times: ["06:00 AM"],
    location: "Church Auditorium",
    type: "prayer",
  },
  {
    id: "saturday-prayer",
    name: "Saturday Prayer",
    description: "Weekly Saturday morning prayer session.",
    day: "Saturday",
    times: ["07:00 AM"],
    location: "Church Auditorium",
    type: "prayer",
  },
  {
    id: "midnight-warriors",
    name: "Midnight Prayer Warriors",
    description:
      "Weekly midnight prayer session for intensive intercessory prayer.",
    day: "Fridays",
    times: ["12:00 AM"],
    location: "Church Auditorium",
    type: "group",
    isSpecial: true,
  },
  {
    id: "dawn-intercessors",
    name: "Dawn Intercessors",
    description: "Early morning prayer group meeting at midnight.",
    day: "Tuesdays",
    times: ["12:00 AM"],
    location: "Online (Zoom)",
    type: "group",
    isSpecial: true,
  },
  {
    id: "women-prayer",
    name: "Women's Prayer Circle",
    description: "Weekly prayer gathering for women.",
    day: "Wednesdays",
    times: ["10:00 AM"],
    location: "Church Fellowship Hall",
    type: "group",
  },
  {
    id: "men-prayer",
    name: "Men's Prayer Fellowship",
    description: "Men gathering weekly to pray for strength and breakthrough.",
    day: "Thursdays",
    times: ["07:00 PM"],
    location: "Church Auditorium",
    type: "group",
  },
  {
    id: "youth-prayer",
    name: "Youth Prayer Force",
    description: "Young adults and youth coming together to pray.",
    day: "Saturdays",
    times: ["04:00 PM"],
    location: "Youth Hall",
    type: "group",
  },
];

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
