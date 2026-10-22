import type { PageDef, Block } from "./types";
import { doc } from "./docs";

type Prog = {
  slug: string;
  name: string;
  full: string;
  lead: string;
  hero: string;
  heroAlt: string;
  overview: string[];
  highlights: string[];
  glance: { value: string; label: string }[];
  phases: { label?: string; title: string; text: string }[];
  clinical: string[];
  eligibility: string[];
  careers: string[];
  faq: { q: string; a: string }[];
  /** Programme-specific blocks (documents, intake tables) shown after the curriculum. */
  extra?: Block[];
};

const prog = (p: Prog): PageDef => {
  const blocks: Block[] = [
    { t: "text", eyebrow: "Overview", title: `${p.name} at CDSIMER`, body: p.overview, bullets: p.highlights, image: "life-students.jpg", alt: p.heroAlt },
    { t: "stats", title: `${p.name} at a Glance`, tone: "cream", items: p.glance },
    {
      t: "cards",
      title: `Why study ${p.name} at CDSIMER?`,
      cols: 4,
      items: [
        { title: "Teaching hospital", text: "A 900+ bed hospital with 1000+ daily patient footfall." },
        { title: "Experienced faculty", text: "Mentorship from clinicians, teachers and researchers." },
        { title: "Simulation labs", text: "Advanced simulation for safe, repeated skills practice." },
        { title: "Research culture", text: "Funded projects, publications and ethics oversight." },
      ],
    },
    { t: "steps", id: "curriculum", title: "Curriculum & phases", tone: "cream", items: p.phases },
    ...(p.extra ?? []),
    { t: "text", title: "Clinical experience", body: ["Learning is anchored in real patient care across the teaching hospital."], bullets: p.clinical, image: "hospital-ward.jpg", alt: "CDSIMER teaching hospital ward", flip: true },
    { t: "text", id: "eligibility", title: "Eligibility, entrance exam & admissions", body: ["Eligibility and entrance-exam rules follow current NMC and university regulations. Confirm the latest details with the admissions office."], bullets: p.eligibility, tone: "cream", actions: [{ label: "Admission process", href: "/admissions#process", variant: "soft" }] },
    { t: "cards", title: "Career opportunities", cols: 4, items: p.careers.map((c) => ({ title: c, text: "" })) },
    { t: "faq", title: "Frequently asked questions", items: p.faq },
    {
      t: "cta",
      title: `Ready to begin your ${p.name} journey?`,
      text: "Apply, enquire or download the brochure to take the next step.",
      actions: [
        { label: "Apply Now", href: "/admissions" },
        { label: "Enquire", href: "/enquiry", variant: "outline" },
        { label: "Download Brochure", href: "/brochure", variant: "soft" },
      ],
    },
  ];
  return {
    slug: `programs/${p.slug}`,
    title: p.full,
    eyebrow: "Programs",
    lead: p.lead,
    hero: p.hero,
    heroAlt: p.heroAlt,
    actions: [{ label: "Apply Now", href: "/admissions", variant: "primary" }, { label: "Download Brochure", href: "/brochure", variant: "glass" }],
    blocks,
  };
};

/** Phase pages that still live on the existing CDSIMER site. */
const ay = (slug: string) => `https://cdsimer.edu.in/${slug}`;

const common = {
  hero: "hero.jpg",
  heroAlt: "Smiling medical student holding textbooks on the CDSIMER campus",
};

export const academic: PageDef[] = [
  {
    slug: "programs",
    title: "Programs",
    eyebrow: "Academics",
    lead: "Undergraduate, postgraduate and doctoral programmes designed to prepare future healthcare leaders.",
    hero: "academics-bg.jpg",
    heroAlt: "Students walking across the campus",
    blocks: [
      {
        t: "cards",
        title: "Choose your programme",
        cols: 3,
        items: [
          { title: "MBBS", text: "Foundation to internship, with clinical exposure from day one.", href: "/programs/mbbs", tag: "Undergraduate", image: "life-students.jpg" },
          { title: "Post Graduation", text: "MD / MS and super-speciality training under senior faculty.", href: "/programs/post-graduation", tag: "Postgraduate", image: "hospital-ward.jpg" },
          { title: "Ph.D", text: "Doctoral research supported by labs, mentors and an ethics committee.", href: "/programs/ph-d", tag: "Research", image: "research-labs.jpg" },
        ],
      },
      { t: "links", title: "Also explore", items: [{ label: "Academics & calendar", href: "/academics" }, { label: "Departments", href: "/department" }, { label: "Admissions", href: "/admissions" }] },
      { t: "cta", title: "Not sure where to start?", text: "Talk to an admission counselor.", actions: [{ label: "Enquire Now", href: "/enquiry" }] },
    ],
  },
  prog({
    ...common,
    slug: "mbbs",
    name: "MBBS",
    full: "MBBS Programme",
    lead: "A rigorous undergraduate medical degree with early clinical exposure in a 900+ bed teaching hospital.",
    overview: ["The MBBS programme is offered under Dayananda Sagar University, Karnataka. It covers all pre-clinical, para-clinical and clinical disciplines through theory classes and clinical training, as mandated by the NMC guidelines."],
    highlights: ["150 MBBS seats per year", "4½ years plus 1 year of compulsory rotatory internship", "NMC recognised medical college", "Integrated 140-acre smart campus"],
    glance: [{ value: "150", label: "Students per year" }, { value: "4½ yrs + 1 yr internship", label: "Duration" }, { value: "NEET-UG", label: "Admission route" }, { value: "900+", label: "Teaching hospital beds" }],
    phases: [
      { label: "Phase I", title: "Pre-clinical", text: "Anatomy, physiology, biochemistry and the foundation course." },
      { label: "Phase II", title: "Para-clinical", text: "Pathology, pharmacology, microbiology, forensic medicine and community exposure." },
      { label: "Phase III – Part I", title: "Clinical I", text: "Community medicine, ophthalmology, ENT and clinical postings." },
      { label: "Phase III – Part II", title: "Clinical II", text: "Medicine, surgery, paediatrics, obstetrics & gynaecology and allied subjects." },
      { label: "Internship", title: "Compulsory rotating internship", text: "Supervised practice across departments." },
    ],
    clinical: ["Early patient contact and case-based learning", "Supervised ward, OPD and emergency postings", "Skills practice in simulation labs", "Community and rural outreach"],
    eligibility: ["Qualifying 10+2 with Physics, Chemistry, Biology/Biotechnology and English", "All admissions are based on the rank obtained in NEET-UG, conducted all-India by the National Testing Agency", "Seats are allotted by merit through counselling conducted by the Karnataka Examination Authority"],
    careers: ["Clinical practice", "Postgraduate specialisation", "Medical research", "Public health & administration"],
    extra: [
      {
        t: "docs",
        id: "curriculum-docs",
        title: "Curriculum (as per NMC norms) & programme outcomes",
        items: [
          { title: "UG Curriculum Volume I", type: "PDF", href: doc.curriculum1 },
          { title: "UG Curriculum Volume II", type: "PDF", href: doc.curriculum2 },
          { title: "UG Curriculum Volume III", type: "PDF", href: doc.curriculum3 },
          { title: "Programme outcomes", type: "PDF", href: doc.programOutcomes },
        ],
      },
    ],
    faq: [
      { q: "Is NEET mandatory for MBBS admission?", a: "Yes. Admission is through NEET-UG and the applicable counselling process." },
      { q: "How long is the MBBS course?", a: "4½ years plus one year of compulsory rotatory internship, as per NMC norms." },
      { q: "How many students are admitted each year?", a: "The intake is 150 students per year." },
      { q: "Is hostel accommodation available?", a: "Yes. See hostel details on the Admissions page." },
    ],
  }),
  prog({
    ...common,
    slug: "post-graduation",
    name: "Post Graduation",
    full: "Post Graduation Programme",
    lead: "MD / MS and super-speciality training with senior faculty, advanced facilities and a research culture.",
    hero: "hospital-ward.jpg",
    heroAlt: "CDSIMER teaching hospital ward",
    overview: ["The Post Graduate programme is offered under Dayananda Sagar University, Karnataka. Training deepens clinical expertise through supervised practice, academic seminars and research in a large teaching hospital."],
    highlights: ["13 MD / MS specialisations", "47 postgraduate seats", "3-year course", "Thesis and research support"],
    glance: [{ value: "MD / MS", label: "Degrees" }, { value: "3 yrs", label: "Duration" }, { value: "47", label: "Total PG seats" }, { value: "NEET-PG", label: "Admission route" }],
    phases: [
      { label: "Year 1", title: "Foundation", text: "Core subject training, ward duties and thesis protocol." },
      { label: "Year 2", title: "Advanced training", text: "Supervised procedures, seminars and data collection." },
      { label: "Year 3", title: "Consolidation", text: "Independent patient management, thesis submission and examination." },
    ],
    clinical: ["Residency in wards, OPD and emergency", "Procedure and case logs under supervision", "Journal clubs and case conferences", "Teaching undergraduate students"],
    eligibility: ["Prescribed minimum score in NEET-PG applicable for the academic year", "MBBS completed at an NMC recognised medical college", "One year of compulsory rotating internship completed on or before the prescribed date", "Seat allotment by merit through counselling conducted by the Karnataka Examination Authority"],
    careers: ["Consultant specialist", "Super-speciality training", "Academic faculty", "Clinical research"],
    extra: [
      {
        t: "table",
        id: "intake",
        title: "PG intake by specialisation",
        cols: ["Category", "Specialisation", "Seats"],
        rows: [
          ["Para-clinical", "MD – Pathology", "4"],
          ["Para-clinical", "MD – Community Medicine", "4"],
          ["Clinical", "MD – General Medicine", "4"],
          ["Clinical", "MS – General Surgery", "4"],
          ["Clinical", "MS – Obstetrics & Gynaecology", "4"],
          ["Clinical", "MS – Orthopaedics", "4"],
          ["Clinical", "MD – Paediatrics", "4"],
          ["Clinical", "MD – Radiodiagnosis", "4"],
          ["Clinical", "MD – Dermatology, Venereology & Leprosy", "3"],
          ["Clinical", "MS – Ophthalmology", "3"],
          ["Clinical", "MS – Otorhinolaryngology", "3"],
          ["Clinical", "MD – Anaesthesiology", "4"],
          ["Clinical", "MD – Psychiatry", "2"],
        ],
      },
    ],
    faq: [
      { q: "Which exam is required?", a: "NEET-PG, followed by counselling conducted by the Karnataka Examination Authority." },
      { q: "Are stipends paid?", a: "Yes. See the UG/PG stipend and fees document on the Admissions page." },
    ],
  }),
  prog({
    ...common,
    slug: "ph-d",
    name: "Ph.D",
    full: "Ph.D Programme",
    lead: "Doctoral research with expert guides, modern laboratories and institutional ethics oversight.",
    hero: "research-labs.jpg",
    heroAlt: "Researchers working in a laboratory",
    overview: ["The Ph.D programme is offered under Dayananda Sagar University, Karnataka, and supports original research in biomedical and clinical sciences under the university research framework."],
    highlights: ["3 to 5 years for MBBS, MD / MS candidates", "4 to 6 years for M.Sc candidates", "2 candidates per year, per research guide", "Central Research and Innovation Wing and Ethics Committee"],
    glance: [{ value: "3–5 yrs", label: "MBBS, MD / MS candidates" }, { value: "4–6 yrs", label: "M.Sc candidates" }, { value: "2", label: "Candidates per guide, per year" }, { value: "Entrance + interview", label: "Admission route" }],
    phases: [
      { label: "Stage 1", title: "Coursework", text: "Research methodology and subject-specific coursework." },
      { label: "Stage 2", title: "Proposal & ethics", text: "Synopsis approval and ethics clearance." },
      { label: "Stage 3", title: "Research & publication", text: "Data collection, analysis and publication." },
      { label: "Stage 4", title: "Thesis & viva", text: "Thesis submission, evaluation and defence." },
    ],
    clinical: ["Access to clinical data and patient cohorts (with ethics approval)", "Core laboratory facilities", "Collaboration with clinical departments"],
    eligibility: ["Relevant postgraduate degree", "Admission is based on an entrance examination and interview", "Application form, entrance test syllabus, how to apply and question paper pattern are published on the DSU research site"],
    careers: ["Academic faculty", "Scientist / researcher", "Clinical research leader", "Industry R&D"],
    extra: [
      {
        t: "docs",
        id: "phd-docs",
        title: "Ph.D regulations & admission",
        items: [
          { title: "Ph.D Ordinance", type: "PDF", href: doc.phdOrdinance },
          { title: "Ph.D admission, application & entrance test", type: "LINK", href: "https://www.dsu.edu.in/dsu-research/phd-admission" },
          { title: "Research guides", type: "LINK", href: "https://www.dsu.edu.in/dsu-research/guides" },
        ],
      },
    ],
    faq: [
      { q: "Who can apply?", a: "Candidates with a relevant postgraduate degree meeting DSU Ph.D regulations." },
      { q: "How long is the Ph.D?", a: "A minimum of 3 and a maximum of 5 years for MBBS, MD / MS candidates; a minimum of 4 and a maximum of 6 years for M.Sc candidates." },
    ],
  }),
  {
    slug: "academics",
    title: "Academics",
    eyebrow: "Academics",
    lead: "Academic year timetables, the AETCOM module, the holiday list and student feedback on the curriculum.",
    hero: "academics-bg.jpg",
    heroAlt: "Students walking across the campus",
    blocks: [
      {
        t: "table",
        id: "academic-year",
        title: "Academic Year",
        lead: "Open a phase to see its timetables, internal assessments and university exam notices on the existing CDSIMER site.",
        cols: ["Academic year", "Phase I", "Phase II", "Phase III / Part I", "Phase III Part II / IV"],
        rows: [
          ["2025–26", `[Phase I](${ay("2025-2026-phase1")})`, `[Phase II](${ay("2025-2026-phase2")})`, `[Phase III Part I](${ay("2025-2026-phase3-part1")})`, `[Phase III Part II](${ay("2025-2026-phase3-part2")})`],
          ["2024–25", `[Phase I](${ay("phase1-2024-2025")})`, `[Phase II](${ay("phase2-2024-2025")})`, `[Phase III](${ay("phase3-2024-2025")})`, `[Phase IV](${ay("phase4-2024-2025")})`],
          ["2023–24", `[Phase I](${ay("phase1-2023-2024")})`, `[Phase II](${ay("phase2-2023-2024")})`, `[Phase III Part I](${ay("phase3-2023-2024")})`, `[Phase III Part II](${ay("phase4-2023-2024")})`],
          ["2022–23", `[Phase I](${ay("phase1-2022-2023")})`, `[Phase II](${ay("phase2-2022-2023")})`, `[Phase III](${ay("phase3-2022-2023")})`, "—"],
          ["2021–22", `[Phase I](${ay("phase1-2021-2022")})`, `[Phase II](${ay("phase2-2021-2022")})`, "—", "—"],
          ["2020–21", `[Phase I](${ay("phase1-2020-2021")})`, "—", "—", "—"],
        ],
      },
      { t: "docs", title: "AETCOM Module", tone: "cream", lead: "Attitude, Ethics and Communication module.", items: [{ title: "AETCOM Module", type: "PDF", href: doc.aetcom }] },
      { t: "docs", title: "Holiday List", items: [{ title: "Holiday List 2025", type: "PDF", href: doc.holidays }] },
      {
        t: "docs",
        title: "Student Feedback on Curriculum",
        tone: "cream",
        items: [
          { title: "Phase I", type: "PDF", href: doc.feedback1 },
          { title: "Phase II", type: "PDF", href: doc.feedback2 },
          { title: "Phase III – Part I", type: "PDF", href: doc.feedback31 },
          { title: "Phase III – Part II", type: "PDF", href: doc.feedback32 },
        ],
      },
      { t: "links", title: "Related", items: [{ label: "Programs", href: "/programs" }, { label: "Examination", href: "/examination" }, { label: "Departments", href: "/department" }] },
    ],
  },
];
