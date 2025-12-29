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
