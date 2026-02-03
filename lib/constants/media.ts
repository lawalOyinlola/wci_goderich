/**
 * Static media content for the church
 * DOMI Radio: https://www.domimedia.org/
 * Faith Tabernacle Media/Streams: https://media.faithtabernacle.org.ng/
 */

export const DOMI_RADIO_URL = "https://www.domimedia.org/";
export const FAITH_TABERNACLE_MEDIA_URL =
  "https://media.faithtabernacle.org.ng/";

export const LIVE_STREAM_SOURCES = [
  {
    id: "domi-radio",
    title: "DOMI Radio",
    description:
      "Tune in to DOMI Radio for inspirational Christian programming, music, and teaching from Living Faith Church Worldwide.",
    url: DOMI_RADIO_URL,
    icon: "RadioIcon",
    ctaText: "Listen to DOMI Radio",
  },
  {
    id: "faith-tabernacle-stream",
    title: "Faith Tabernacle Live Stream",
    description:
      "Watch live services, VOD, and stream events directly from Living Faith Church Headquarters. Multiple quality options and language streams available.",
    url: FAITH_TABERNACLE_MEDIA_URL,
    icon: "VideoCameraIcon",
    ctaText: "Watch Live Stream",
  },
] as const;

export const SERMONS = [
  {
    id: 1,
    title: "Engaging the Wonders of Prayer and Fasting part 2",
    service: "Special Annointing Service",
    date: "JANUARY 12, 2025",
    pastor: "Abel Enun Ukweni",
    image: "https://picsum.photos/800/600?random=3",
    videoUrl: "https://youtu.be/1nl1xzYXId4?si=WmFgOeNOHNdFTciQ",
  },
  {
    id: 2,
    title: "Engaging the Wonders of Prayer and Fasting part 3",
    service: "Prophetic Service",
    date: "JANUARY 19, 2025",
    pastor: "Abel Enun Ukweni",
    image: "https://picsum.photos/800/600?random=2",
    videoUrl: "https://youtu.be/7KVa4W2F9zk?si=Ka4sGQMIhX0AmA3f",
  },
  {
    id: 3,
    title: "Engaging the Wonders of Prayer and Fasting part 4",
    service: "Mantle Service",
    date: "JANUARY 26, 2025",
    pastor: "Abel Enun Ukweni",
    image: "https://picsum.photos/800/600?random=3",
    videoUrl: "https://youtu.be/0capsJZuPds?si=NAUyYg_4fcQI_lM3",
  },
  {
    id: 4,
    title: "Access to my Inheritance Demand Sanctification for Delivery",
    service: "Communinion Service",
    date: "FEBRUARY 02, 2025",
    pastor: "Abel Enun Ukweni",
    image: "https://picsum.photos/800/600?random=1",
    videoUrl: "https://youtu.be/RjdbeiV70rE?si=1km_WJu-asXcuT_r",
  },
] as const;

export const FEATURED_SERMONS = [...SERMONS]
  .slice()
  .sort((a, b) => {
    return b.id - a.id;
  })
  .slice(0, 3);
