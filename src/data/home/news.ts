import type { IconName } from "../iconMeta";

export const newsTabs: { id: string; label: string; icon: IconName }[] = [
  { id: "all", label: "All Updates", icon: "n-all" },
  { id: "academics", label: "Academics", icon: "n-acad" },
  { id: "hospital", label: "Hospital", icon: "n-hosp" },
  { id: "research", label: "Research", icon: "n-res" },
  { id: "events", label: "Events", icon: "n-events" },
];

export type NewsItem = {
  slug: string;
  tag: "academics" | "hospital" | "research" | "events";
  title: string;
  /** Short summary for cards. */
  text: string;
  /** Display date; omitted when the source gives none. */
  date?: string;
  /** Sortable date; omitted when the source gives none. */
  iso?: string;
  /** File under /images used as the cover. */
  photo: string;
  alt: string;
  /** Full article paragraphs. */
  body: string[];
  highlights?: { title: string; items: string[] };
  facts?: { label: string; value: string }[];
  source?: { label: string; href: string };
};

const items: NewsItem[] = [
  {
    slug: "career-guidance-session-global-career-opportunities",
    tag: "events",
    title: "Career Guidance Session on Global Career Opportunities",
    text: "First-year B.Com and BBA students heard about global career pathways, professional certifications and what industry expects.",
    date: "07 OCTOBER 2026",
    iso: "2026-10-07",
    photo: "life-students.jpg",
    alt: "Students on the campus",
    body: [
      "The School of Commerce and Management Studies (UG), Dayananda Sagar University, organised a career guidance session on “Global Career Opportunities” for first-year B.Com and BBA students, in association with Imarticus Learning.",
      "The session was delivered by Mr. Maheshwar Narayanan, Assistant Vice President for Training & Placements at Imarticus Learning. He covered global career pathways, US-based accounting firms, investment banking, finance roles, professional certifications and industry expectations.",
      "The programme was inaugurated by Dr. Truptha Shankar, Professor & Dean, who highlighted the importance of industry exposure and career-oriented learning. It was coordinated by Dr. Ram Raj G, Assistant Professor, Department of Commerce.",
      "Students gained clarity about career opportunities, employability skills and future professional pathways.",
    ],
    facts: [
      { label: "Date", value: "7 October 2026" },
      { label: "Audience", value: "First-year B.Com and BBA students" },
      { label: "Partner", value: "Imarticus Learning" },
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/events-commerce-management" },
  },
  {
    slug: "nano-satellites-design-and-development-workshop",
    tag: "events",
    title: "Workshop on Design and Development of Nano Satellites",
    text: "A three-day workshop on satellite design, space environment and building a nano satellite, with a site visit to the Indian Deep Space Network.",
    date: "03–05 JULY 2019",
    iso: "2019-07-03",
    photo: "research-labs.jpg",
    alt: "Technologist examining a specimen under a microscope",
    body: [
      "Dayananda Sagar University’s School of Engineering held a three-day workshop on the design and development of nano satellites, open to students and faculty from engineering colleges, scientists from R&D labs and engineers from private industry.",
      "Resource persons included India’s leading satellite experts from the Indian Space Research Organisation (ISRO) and scientists and engineers from other organisations. Participants also made a site visit to the Indian Deep Space Network (Chandrayaan ground station), Byalalu, Bengaluru.",
    ],
    highlights: {
      title: "Course contents",
      items: [
        "Day 1: satellite communication, payload system, mechanical systems and system engineering.",
        "Day 2: space environment, electrical systems, attitude determination and control, mission and ground station.",
        "Day 3: building a nano satellite; reliability and quality assurance; assembly, integration and testing.",
      ],
    },
    facts: [
      { label: "Date", value: "3 to 5 July 2019" },
      { label: "Venue", value: "Dayananda Sagar University, School of Engineering, Kudlu Gate, Hosur Main Road, Bengaluru" },
    ],
    source: {
      label: "Read on dsu.edu.in",
      href: "https://www.dsu.edu.in/news-events/events-engineering/events-engineering-july-19/workshop-on-design-and-development-of-nano-satellites",
    },
  },
  {
    slug: "retail-analytics-and-mall-management-lecture",
    tag: "events",
    title: "Lecture on “Retail Analytics and Mall Management”",
    text: "Jonathan David Yach addressed MBA students in what turned out to be a master class on retail analytics.",
    date: "08 APRIL 2019",
    iso: "2019-04-08",
    photo: "news-1.jpg",
    alt: "Audience seated at a conference",
    body: [
      "Jonathan David Yach, an internationally known figure in mall and retail management, addressed MBA students on retail analytics and mall management. In Bengaluru he was closely associated with establishing Mantri Square Mall and the Royal Meenakshi Malls.",
      "He is Director, Retail at Virtuous Retail and an expert in mall management, facility management and retail analytics, and has managed properties in Asia and Africa.",
      "The talk was part of the university’s Distinguished Speaker Series, in which subject matter experts visit the campus to share ideas and best practices with students.",
    ],
    facts: [
      { label: "Date", value: "8 April 2019" },
      { label: "Venue", value: "Dayananda Sagar University, Innovation Campus, Hosur Road, Bengaluru" },
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/events-coe/events-coe-april19" },
  },
  {
    slug: "hertech-hackathon-wsquare-facebook",
    tag: "events",
    title: "Wsquare organised the ‘HerTech’ Hackathon in partnership with Facebook",
    text: "Two Computer Technology students won first prize among 88 teams at a 24-hour hackathon for women in technology.",
    date: "30 MARCH 2019",
    iso: "2019-03-30",
    photo: "dept-pathology.jpg",
    alt: "Students in white coats in a laboratory",
    body: [
      "The two-day hackathon by Wsquare, in partnership with Facebook, focused on women in technology in AI and robotics. Participants spent 24 hours coding, validating ideas and networking, then demonstrated their prototype to a panel of VCs, entrepreneurs and sponsors.",
      "Sixth-semester Computer Technology students Ms. Anjana Ranjan and Ms. Asmitha Ramesh won the competition among 88 teams shortlisted from all over India.",
    ],
    highlights: {
      title: "Highlights",
      items: [
        "Computer Technology students won the first prize.",
        "88 teams from across India took part in Bangalore.",
        "The winning team placed ahead of teams from Amazon, IBM, Samsung Electronics, Wipro Technologies, McAfee, WalmartLabs, Accenture and several leading engineering colleges.",
      ],
    },
    facts: [
      { label: "Date", value: "30 March 2019" },
      { label: "Venue", value: "ThoughtWorks, Koramangala, Bangalore" },
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/events-engineering/events-engineering-march-19/hertech-hackathon" },
  },
  {
    slug: "fisa-ball-and-international-food-festival-2019",
    tag: "events",
    title: "FISA Ball and International Food Festival, 2019",
    text: "Organised by the Federation of International Students Association, Bangalore, with students of more than 60 nationalities.",
    date: "30–31 MARCH 2019",
    iso: "2019-03-30",
    photo: "home-life-group.jpg",
    alt: "Group photo of students and staff",
    body: [
      "The FISA Ball and International Food Festival was organised by the Federation of International Students Association, Bangalore, on 30 and 31 March 2019 at the sports ground complex of Dayananda Sagar College of Engineering, Kumaraswamy Layout campus.",
      "With the motto “One world, one host”, FISA-B works across national and cultural boundaries. It is a platform for exchanging ideas and ways of life among students of more than 60 nationalities, and a community of active, visionary and innovative international students.",
    ],
    facts: [
      { label: "Date", value: "30 and 31 March 2019" },
      { label: "Venue", value: "Sports ground complex, Kumaraswamy Layout campus" },
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/open-events/open-events-march-19/fisa-ball-iff" },
  },
  {
    slug: "meet-up-with-bimalendra-nidhi",
    tag: "events",
    title: "Meet-up with Mr. Bimalendra Nidhi, former Deputy Prime Minister of Nepal",
    text: "A meeting to support international student exchange and widen admissions from Nepal.",
    date: "MARCH 2019",
    iso: "2019-03-01",
    photo: "home-life-hostel.jpg",
    alt: "Students entering through the campus access gate",
    body: [
      "The university was honoured to meet Mr. Bimalendra Nidhi, former Deputy Prime Minister and Minister of Home Affairs of Nepal, and Vice-President of the Nepali Congress, together with Mr. Pradeep, an industrialist of Bangalore. The admissions director Dr. Priya Kaushal and assistant admissions director Mr. Manoj represented the university.",
      "The meeting supported the university’s efforts towards international student exchange programmes, education collaborations between Nepal and India, and wider international admissions from Nepal.",
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/open-events/open-events-march-19" },
  },
  {
    slug: "icpc-india-regional-finals-kolkata",
    tag: "events",
    title: "DSU ranked among the top teams at the ICPC India Regional Finals, Kolkata",
    text: "Placed in the top 100 of 160 teams at the “Olympics of computer programming”.",
    date: "JANUARY 2019",
    iso: "2019-01-01",
    photo: "home-life-library.jpg",
    alt: "Students in the library",
    body: [
      "Dayananda Sagar University ranked well at the International Collegiate Programming Contest (ICPC) India Regional Finals at Kolkata. ICPC is the largest computer programming contest in the world, giving college students a chance to demonstrate and sharpen their problem-solving and computing skills.",
      "A total of 160 teams from all over India were shortlisted for the Kolkata onsite, one of the four sites of the India regional finals. DSU placed in the top 100 there.",
    ],
    highlights: {
      title: "Where the team placed",
      items: [
        "Ahead of the Indian Institute of Science.",
        "Ahead of IIT Gandhinagar, IIT Indore, IIT Jodhpur and IIT Guwahati.",
        "Ahead of IIIT Bhubaneswar, IIIT Naya Raipur and IIIT Surat.",
        "Ahead of SRM Institute of Science and Technology, PES University and Shiv Nadar University.",
      ],
    },
    facts: [{ label: "Venue", value: "Guru Nanak Institute of Technology, Panihati, Kolkata" }],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events/open-events/open-events-january-19/icpc" },
  },
  {
    slug: "breakthrough-research-in-clinical-pharmacology",
    tag: "research",
    title: "Breakthrough Research in Clinical Pharmacology",
    text: "Faculty and research scholars presented innovative findings in drug development, precision medicine, and therapeutic",
    date: "01 JUNE 2026",
    iso: "2026-06-01",
    photo: "news-2.jpg",
    alt: "Researcher pipetting samples in a laboratory",
    body: ["Faculty and research scholars presented innovative findings in drug development, precision medicine, and therapeutic approaches."],
  },
  {
    slug: "students-excel-at-national-healthcare-summit",
    tag: "academics",
    title: "DSU Students Excel at National Healthcare Summit",
    text: "Students from various medical disciplines showcased research projects, participated in expert panel discussions.",
    date: "20 JULY 2026",
    iso: "2026-07-20",
    photo: "news-3.jpg",
    alt: "Doctor with a stethoscope listening at a healthcare summit",
    body: ["Students from various medical disciplines showcased research projects and took part in expert panel discussions."],
  },
  {
    slug: "talent-search-2018",
    tag: "academics",
    title: "Dayananda Sagar University Talent Search 2018",
    text: "A three-day inter-school and inter-college workshop and competition on AI, cloud computing, blockchain and pneumatics.",
    date: "29 NOV – 01 DEC 2018",
    iso: "2018-11-29",
    photo: "home-life-campus.jpg",
    alt: "Students walking across the campus",
    body: [
      "Dayananda Sagar University runs a three-day “Talent Search”, an inter-school and inter-college workshop and competition, every year. The 2018 edition ran from 29 November to 1 December at the Innovation Campus, Kudlu Gate, Bangalore.",
      "The event encourages high school and pre-university students to learn cutting-edge technologies, including artificial intelligence, cloud computing, blockchain and pneumatics. The workshop had two days of theory and practical classes, followed by project and model making.",
      "Talented students were rewarded with Rs. 5 lakh in cash prizes and electronic goodies. Nearly 1,000 students from more than 40 schools took part. Chief guests were Dr. Sridhar G, founder and MD of Deeksha, and Mrs. Lalit Sridhar, co-founder of Deeksha.",
    ],
    facts: [
      { label: "Date", value: "29 November to 1 December 2018" },
      { label: "Venue", value: "Innovation Campus, Kudlu Gate, Bangalore" },
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events" },
  },
  {
    slug: "research-on-graphene-next-generation-semiconductors",
    tag: "research",
    title: "Research on Applications of Next Generation Semiconductors: Graphene",
    text: "A graphene research lab at the Department of Physics is exploring graphene-based sensors with SERB and ISRO grants.",
    photo: "research-labs.jpg",
    alt: "Technologist at a microscope with sample tubes",
    body: [
      "Graphene is the thinnest 2D material known, with extraordinary properties: it is about 200 times stronger than steel yet flexible, with excellent thermal and electrical conductivity and very high electron mobility at room temperature. It was first electrically isolated in 2004 at the University of Manchester, and its discoverers received the Nobel Prize in 2010.",
      "Dr. Baishali G of the Department of Physics, Dayananda Sagar University, has set up a research lab to explore graphene in designing sensors. She has received research grants from the Science and Engineering Research Board (SERB), Department of Science and Technology, and from the Indian Space Research Organisation (ISRO).",
      "Three research scholars are pursuing their PhDs in this area under her guidance, working in close collaboration with the Indian Institute of Science.",
    ],
    source: { label: "Read on dsu.edu.in", href: "https://www.dsu.edu.in/news-events" },
  },
  {
    slug: "dsu-ranks-no-4-among-new-universities-ksurf",
    tag: "academics",
    title: "DSU ranks No. 4 among new universities in the Karnataka State University Rating Framework (KSURF)",
    text: "Dayananda Sagar University is ranked fourth among new universities in Karnataka’s state rating framework.",
    photo: "academics-bg.jpg",
    alt: "University buildings at dusk",
    body: ["Dayananda Sagar University has been ranked No. 4 among new universities by the Karnataka State University Rating Framework (KSURF). The full document is available from the university’s website."],
    source: { label: "Open the KSURF document (PDF)", href: "https://www.dsu.edu.in/images/PDF/ksurf.pdf" },
  },
];

/** Newest first; items without a date go last. */
export const news: NewsItem[] = [...items].sort((a, b) => (b.iso ?? "").localeCompare(a.iso ?? ""));

export const newsBySlug = (slug: string) => news.find((n) => n.slug === slug);

/** Neighbours in list order: `prev` is the newer item, `next` the older one. */
export const newsNeighbours = (slug: string) => {
  const i = news.findIndex((n) => n.slug === slug);
  return { prev: i > 0 ? news[i - 1] : undefined, next: i >= 0 && i < news.length - 1 ? news[i + 1] : undefined };
};

export const tagLabel = (tag: NewsItem["tag"]) => newsTabs.find((t) => t.id === tag)?.label ?? tag;

export const studentLife = [
  { photo: "home-life-campus", alt: "Students walking across the CDSIMER campus", label: "Campus" },
  { photo: "home-life-hostel", alt: "Students entering through the campus access gate", label: "Campus Life" },
  { photo: "home-life-library", alt: "Students in the library", label: "Library" },
  { photo: "home-life-students", alt: "Student at the campus vending machines", label: "Amenities" },
  { photo: "home-life-hall", alt: "Students chatting on campus", label: "Students" },
  { photo: "home-life-group", alt: "Group photo of students and staff", label: "Students & Staff" },
  { photo: "home-life-sports", alt: "Students playing football", label: "Sports" },
] as const;
