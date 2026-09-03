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

/** Set to true once real sermon data with proper images replaces the placeholders. */
export const SERMONS_ENABLED = false;

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

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

const CLOUDINARY_VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

/**
 * Build the two delivery URLs for a Cloudinary video.
 *
 * `hls` is an adaptive bitrate manifest: Cloudinary's `sp_auto` streaming
 * profile serves 480p/540p/720p renditions and the player switches between
 * them as the viewer's bandwidth changes, so a phone on mobile data never
 * downloads the full-size file. `mp4` is the progressive fallback for the
 * rare browser that cannot play HLS (`q_auto` still picks a sane bitrate).
 */
export function getCloudinaryVideoUrls(publicId: string) {
  return {
    hls: `${CLOUDINARY_VIDEO_BASE}/sp_auto/${publicId}.m3u8`,
    mp4: `${CLOUDINARY_VIDEO_BASE}/q_auto,f_auto/${publicId}.mp4`,
  };
}

/**
 * Poster frame pulled straight from the video, so a thumbnail can never drift
 * out of sync with the clip it represents. `so_` picks the second to grab.
 */
export function getCloudinaryVideoPoster(
  publicId: string,
  { second = 0, width = 1280 }: { second?: number; width?: number } = {},
) {
  return `${CLOUDINARY_VIDEO_BASE}/so_${second},w_${width},c_fill,q_auto,f_auto/${publicId}.jpg`;
}

export interface ChurchVideo {
  id: string;
  title: string;
  description: string;
  /** Portrait clips are filmed on a phone and need a 9:16 frame, not 16:9. */
  orientation: "landscape" | "portrait";
  hls: string;
  mp4: string;
  poster: string;
}

function buildVideo(
  publicId: string,
  meta: Omit<ChurchVideo, "hls" | "mp4" | "poster" | "id"> & {
    id: string;
    posterSecond?: number;
  },
): ChurchVideo {
  const { posterSecond = 0, ...rest } = meta;
  return {
    ...rest,
    ...getCloudinaryVideoUrls(publicId),
    poster: getCloudinaryVideoPoster(publicId, { second: posterSecond }),
  };
}

/** Church videos, newest first. Played through the shared video modal. */
export const CHURCH_VIDEOS: ChurchVideo[] = [
  buildVideo("v1788454422/First_Test_b3kxqc", {
    id: "welcome",
    title: "Welcome to Winners Chapel Goderich",
    description:
      "A look inside our communion service with the sharing of his flesh and blood.",
    orientation: "landscape",
    posterSecond: 2,
  }),
  buildVideo("VIDEO-2026-05-21-17-45-54_gdehe5", {
    id: "service-moment",
    title: "Moments from Our Service",
    description:
      "A glimpse of thanksgiving and praises at Winners Chapel Goderich.",
    orientation: "portrait",
    posterSecond: 2,
  }),
];

/** Intro video played from the About page hero. */
export const ABOUT_VIDEO = CHURCH_VIDEOS[0];
