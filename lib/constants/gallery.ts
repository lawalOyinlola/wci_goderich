/**
 * Gallery folder path in Cloudinary
 */
export const GALLERY_FOLDER = "WCI_Goderich/gallery";

/**
 * Default pagination limit for gallery images
 */
export const DEFAULT_GALLERY_LIMIT = 15;

/**
 * Maximum number of images to fetch from Cloudinary in a single request
 */
export const MAX_GALLERY_RESULTS = 200;

/**
 * Limit for home page gallery preview
 */
export const HOME_GALLERY_LIMIT = 30;

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
if (!CLOUDINARY_CLOUD_NAME) {
  throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
}

export const CLOUDINARY_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto`;

export const SAMPLE_IMAGES = [
  {
    src: `${CLOUDINARY_URL}/technical_camera_afn7xb.webp`,
    alt: "Technical Camera",
    title: "A camera recording a video during service",
  },
  {
    src: `${CLOUDINARY_URL}/walking_in_mother_with_child_mpwwcs.webp`,
    alt: "Sunday Service",
    title: "A mother and child coming in for service",
  },
  {
    src: `${CLOUDINARY_URL}/pst_pratt_rx8wbg.webp`,
    alt: "Pastors",
    title: "Amiable Pastor Pratt during service",
  },
  {
    src: `${CLOUDINARY_URL}/open_bible_xy3r0a.webp`,
    alt: "Open Bible",
    title: "Opening the Bible for the sermon",
  },
  {
    src: `${CLOUDINARY_URL}/pst_abel_in_spirit_full_grwoii.jpg`,
    alt: "Pastors",
    title: "Pastor Abel in spirit",
  },
  {
    src: `${CLOUDINARY_URL}/people_exiting_church_BW_x6bl0p.webp`,
    alt: "Church Community Leaving",
    title: "Our awesome members after a wholesome encounter with the Lord",
  },
  {
    src: `${CLOUDINARY_URL}/pst_lungay_hymn_gohcqw.webp`,
    alt: "Hymns",
    title: "Singing of Hymns",
  },
  {
    src: `${CLOUDINARY_URL}/member_praying_mefgsj.webp`,
    alt: "Members Praying",
    title: "Vibrant Youth worshipping the Lord",
  },
  {
    src: `${CLOUDINARY_URL}/congregation_sitting_goietu.webp`,
    alt: "Congregation",
    title: "Congregation fellowshipping in the church",
  },
  {
    src: `${CLOUDINARY_URL}/chorister_lady_singing2_b6hx3h.webp`,
    alt: "Choir",
    title: "Chorister singing praises to the Lord",
  },
  {
    src: `${CLOUDINARY_URL}/man_in_spirit1_psgy5n.webp`,
    alt: "Praises",
    title: "Giving praises to God",
  },
  {
    src: `${CLOUDINARY_URL}/man_operating_camera_zfvhao.webp`,
    alt: "Technical Unit Operator",
    title: "Elegant technical unit operator in the service of the Lord",
  },
  {
    src: `${CLOUDINARY_URL}/hand_on_forehead_man_igw81r.webp`,
    alt: "Man in Spirit",
    title: "A man in spirit during service",
  },
  {
    src: `${CLOUDINARY_URL}/pastors_stand_dgs55a.webp`,
    alt: "Pastors",
    title: "Our Amazing pastors at the pastoral stand",
  },
  {
    src: `${CLOUDINARY_URL}/chorister_playing_drum_mjlrws.webp`,
    alt: "Choir",
    title: "Chorister playing the drum during service",
  },
  {
    src: `${CLOUDINARY_URL}/pst_sylvanus_kbgisy.webp`,
    alt: "Pastors",
    title: "Pastor Sylvanus during service",
  },
  {
    src: `${CLOUDINARY_URL}/father_and_child_jbbzk3.webp`,
    alt: "Sunday Service",
    title: "A father and child during service",
  },
  {
    src: `${CLOUDINARY_URL}/pst_mrs_ukweni_rtttn7.webp`,
    alt: "Pastors",
    title: "Pastor Ukweni during service",
  },
  {
    src: `${CLOUDINARY_URL}/2_elders_in_church_female_uzcs4r.webp`,
    alt: "Sunday Service",
    title: "Lifting hands in praise to the Lord",
  },
  {
    src: `${CLOUDINARY_URL}/congregation_lady_axkigs.webp`,
    alt: "Congregation",
    title: "In the presence of the Lord",
  },
] as const;
