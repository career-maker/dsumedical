import type { PageDef, Block } from "./types";

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
    overview: ["The MBBS programme builds a strong foundation in medical sciences and takes students into the wards early, shaping safe, compassionate doctors."],
    highlights: ["150+ MBBS seats", "Clinical exposure from day one", "NMC recognised medical college", "Integrated smart campus"],
    glance: [{ value: "150+", label: "MBBS Seats" }, { value: "4.5 yrs + internship", label: "Duration (as per NMC)" }, { value: "NEET-UG", label: "Admission route" }, { value: "900+", label: "Teaching hospital beds" }],
    phases: [
      { label: "Phase I", title: "Pre-clinical", text: "Anatomy, physiology, biochemistry and the foundation course." },
      { label: "Phase II", title: "Para-clinical", text: "Pathology, pharmacology, microbiology, forensic medicine and community exposure." },
      { label: "Phase III – Part I", title: "Clinical I", text: "Community medicine, ophthalmology, ENT and clinical postings." },
      { label: "Phase III – Part II", title: "Clinical II", text: "Medicine, surgery, paediatrics, obstetrics & gynaecology and allied subjects." },
      { label: "Internship", title: "Compulsory rotating internship", text: "Supervised practice across departments." },
    ],
    clinical: ["Early patient contact and case-based learning", "Supervised ward, OPD and emergency postings", "Skills practice in simulation labs", "Community and rural outreach"],
    eligibility: ["Qualifying 10+2 with Physics, Chemistry, Biology/Biotechnology and English", "Valid NEET-UG score", "Counselling and seat allotment as per government and university norms"],
    careers: ["Clinical practice", "Postgraduate specialisation", "Medical research", "Public health & administration"],
    faq: [
      { q: "Is NEET mandatory for MBBS admission?", a: "Yes. Admission is through NEET-UG and the applicable counselling process." },
      { q: "How long is the MBBS course?", a: "The course follows NMC norms: 4.5 years of academics followed by one year of internship." },
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
    overview: ["Postgraduate training deepens clinical expertise through supervised practice, academic seminars and research in a large teaching hospital."],
    highlights: ["Broad speciality choice", "High patient volume", "Thesis and research support", "Experienced guides"],
    glance: [{ value: "MD / MS", label: "Degrees" }, { value: "3 yrs", label: "Typical duration" }, { value: "NEET-PG", label: "Admission route" }, { value: "30+", label: "Super specialities" }],
    phases: [
      { label: "Year 1", title: "Foundation", text: "Core subject training, ward duties and thesis protocol." },
      { label: "Year 2", title: "Advanced training", text: "Supervised procedures, seminars and data collection." },
      { label: "Year 3", title: "Consolidation", text: "Independent patient management, thesis submission and examination." },
    ],
    clinical: ["Residency in wards, OPD and emergency", "Procedure and case logs under supervision", "Journal clubs and case conferences", "Teaching undergraduate students"],
    eligibility: ["MBBS with permanent registration", "Valid NEET-PG score", "Counselling and seat allotment as per norms"],
    careers: ["Consultant specialist", "Super-speciality training", "Academic faculty", "Clinical research"],
    faq: [
      { q: "Which exam is required?", a: "NEET-PG, followed by the applicable counselling." },
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
    overview: ["The Ph.D programme supports original research in biomedical and clinical sciences under the Dayananda Sagar University research framework."],
    highlights: ["Experienced research guides", "Central Research and Innovation Wing", "Ethics Committee oversight", "Publication support"],
    glance: [{ value: "Full / part time", label: "Modes" }, { value: "Per DSU rules", label: "Duration" }, { value: "Entrance + interview", label: "Admission route" }, { value: "200+", label: "Research publications" }],
    phases: [
      { label: "Stage 1", title: "Coursework", text: "Research methodology and subject-specific coursework." },
      { label: "Stage 2", title: "Proposal & ethics", text: "Synopsis approval and ethics clearance." },
      { label: "Stage 3", title: "Research & publication", text: "Data collection, analysis and publication." },
      { label: "Stage 4", title: "Thesis & viva", text: "Thesis submission, evaluation and defence." },
    ],
    clinical: ["Access to clinical data and patient cohorts (with ethics approval)", "Core laboratory facilities", "Collaboration with clinical departments"],
    eligibility: ["Relevant postgraduate degree", "University entrance test or equivalent qualification", "Interview and research proposal"],
    careers: ["Academic faculty", "Scientist / researcher", "Clinical research leader", "Industry R&D"],
    faq: [
      { q: "Who can apply?", a: "Candidates with a relevant postgraduate degree meeting DSU Ph.D regulations." },
      { q: "Is part-time Ph.D available?", a: "Subject to university regulations. Contact the research office." },
    ],
  }),
  {
    slug: "academics",
    title: "Academics",
    eyebrow: "Academics",
    lead: "Academic calendar, curriculum modules and student-feedback resources.",
    hero: "academics-bg.jpg",
    heroAlt: "Students walking across the campus",
    blocks: [
      { t: "docs", id: "academic-year", title: "Academic Year", lead: "Calendars and schedules for the current academic year.", items: [{ title: "Academic calendar", type: "PDF", note: "Current year" }] },
      { t: "docs", title: "AETCOM Module", tone: "cream", lead: "Attitude, Ethics and Communication module.", items: [{ title: "AETCOM Module", type: "PDF" }] },
      { t: "docs", title: "Holiday List", lead: "Confirm that the listed year is current.", items: [{ title: "Holiday List 2025", type: "PDF", note: "May be superseded" }] },
      {
        t: "docs",
        title: "Student Feedback on Curriculum",
        tone: "cream",
        items: [
          { title: "Phase I", type: "PDF" },
          { title: "Phase II", type: "PDF" },
          { title: "Phase III – Part I", type: "PDF" },
          { title: "Phase III – Part II", type: "PDF", note: "Link to be verified" },
        ],
      },
      { t: "links", title: "Related", items: [{ label: "Programs", href: "/programs" }, { label: "Examination", href: "/examination" }, { label: "Departments", href: "/department" }] },
    ],
  },
];
