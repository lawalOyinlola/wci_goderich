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
    ],
    secondary: [
      {
        id: "2",
        name: "Winners Chapel International Secondary School",
        location: "Goderich, Freetown",
        type: "secondary" as const,
        description:
          "Secondary education focused on academic excellence and spiritual development.",
        established: "2016",
      },
    ],
    university: [],
  },
  nigeria: {
    primary_secondary: [
      {
        id: "3",
        name: "Kingdom Heritage Model Schools (KHMS)",
        location: "various locations in Nigeria",
        type: "primary_secondary" as const,
        summary:
          "List of Kingdom Heritage Model Schools across Nigeria, offering a comprehensive education with a strong Christian foundation.",
        description:
          "Kingdom Heritage Model Schools (KHMS) is a network of schools across Nigeria, offering a comprehensive education with a strong Christian foundation. The schools are part of the Education Commission of the Living Faith Church Worldwide.",
        website: "https://www.eclfcww.org/KHMSLocations.html",
      },
      {
        id: "4",
        name: "Faith Academy Group of Schools",
        location: "various locations in Nigeria",
        type: "primary_secondary" as const,
        summary:
          "List of Faith Academy schools across Nigeria, offering a comprehensive education with a strong Christian foundation.",
        description:
          "The founding philosophy of the Education Commission is to produce God fearing spiritual giants that would ultimately emerge as world changers, trail blazers, pathfinders and record breakers in their respective fields of endeavours. The philosophy is based on the development of the individual into a sound and effective leader and the provision of equal access to educational opportunities at the primary, secondary and tertiary levels. The Goals of the Education Commission are to ensure that our School System produces total personalities who shall be Pathfinders and Trail Blazers in various fields of endeavours. The Restoration of human dignity through the raising of future leaders endued with creative capacity and entrepreneurial potentials. Our Goals Center on Academic achievement, Spirituality, Creativity, Enterprise, Exploits",
        website: "https://www.eclfcww.org/SchoolsNetwork.html",
      },
      {
        id: "5",
        name: "Landmark University Nursery, Primary & Secondary Schools",
        location: "Omu-Aran, Kwara State",
        type: "primary_secondary" as const,
        summary:
          "Foundational tier of Landmark University's educational ecosystem, offering nurturing early education rooted in Living Faith Church values.",
        description:
          "Landmark University Nursery & Primary School serves as the foundational tier of the university's educational ecosystem, offering a nurturing environment for young learners in Omu-Aran. Rooted in the Living Faith Church Worldwide's values, it provides a curriculum that blends academic excellence with spiritual growth, fostering early development in literacy, numeracy, and moral character. With modern classrooms, safe play areas, and dedicated teachers, the school ensures a holistic start for children, often those of staff, students' siblings, or local community members. Our commitment is to lay the right foundation. This enterprise not only extends Landmark's mission to raise godly leaders but also strengthens its community ties by offering quality education at the grassroots level. Through faith-based programs like devotionals and interactive learning, it instills core values such as integrity and diligence, preparing pupils for a seamless transition to secondary education—often at its sister institution. It's a vital seedbed where the university's vision of breaking new grounds begins with the youngest minds.",
        website: "https://lmu.edu.ng/enterprise/nursery-primary-school",
      },
    ],
    university: [
      {
        id: "6",
        name: "Covenant University",
        location: "Ota, Ogun State",
        type: "university" as const,
        summary:
          "Leading private Christian university in Africa, ranked best private university in Nigeria. Committed to raising a new generation of leaders and reinstating the black race's dignity through cutting-edge education across four colleges.",
        description: `Covenant University is a private Christian University, which has been operating with official status since 2002 in Ota, Ogun State, Nigeria. Covenant University is one of the leading universities in Africa found on Christian mission ethos. She drives a vision to raise a new generation of leaders and reinstate the black race's dignity. The University prioritizes cutting-edge learning to make "the Total Man". The university has four colleges which includes: The College of Business and Social Sciences; College of Leadership and Development Studies; College of Engineering, and the College of Science and Technology. Covenant University has had a rapid rise in nearly two decades of its existence. The webometric ranking named Covenant University the best Private University in Nigeria in its 2021 ranking and the second best university overall.`,
        website: "https://covenantuniversity.edu.ng",
        established: "2002",
      },
      {
        id: "7",
        name: "Landmark University",
        location: "Omu-Aran, Kwara State",
        type: "university" as const,
        summary:
          "Private Christian university established by Living Faith Church Worldwide, committed to raising leaders equipped to address humanity's food needs through agricultural innovation and sustainable development.",
        description:
          "Landmark University is a private University established by the Living Faith Church World Wide, committed to raising leaders who shall be equipped with skills and character to lead the world in meeting the needs of humanity FOOD. The focus is to assist the nation and indeed the continent of Africa in self -discovery so that she may recover her leading position in education and in civilization, as it was in the 20th century. The goal is to set the pace in making the Nigerian nation fully, competitively and profitably engage her comparative advantage in human and agricultural resource potentials and development.",
        website: "https://lmu.edu.ng",
        established: "2011",
      },
    ],
  },
} as const;
