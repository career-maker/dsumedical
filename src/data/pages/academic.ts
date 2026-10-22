import type { PageDef, Block } from "./types";
import { doc } from "./docs";
import { academicYear } from "./academic-year";

type Prog = {
  slug: string;
  name: string;
  full: string;
  lead: string;
  hero: string;
  heroAlt: string;
  overview: string[];
  glance: { value: string; label: string }[];
  phases: { label?: string; title: string; text: string }[];
  curriculumTitle?: string;
  /** Official curriculum PDFs, shown as cards after the phases. */
  curriculumDocs?: { title: string; href: string }[];
  outcomes: { title: string; text: string }[];
  outcomesDoc?: string;
  clinical: string[];
  eligibility: string[];
  /** Longer eligibility criteria, shown as an accordion after the summary. */
  eligibilityDetail?: { q: string; a: string }[];
  careers: string[];
  faq: { q: string; a: string }[];
  /** Programme-specific blocks (documents, intake tables) shown after the curriculum. */
  extra?: Block[];
};

const prog = (p: Prog): PageDef => {
  const blocks: Block[] = [
    {
      t: "text",
      eyebrow: "Overview",
      title: `${p.name} at CDSIMER`,
      body: p.overview,
      image: "life-students.jpg",
      alt: p.heroAlt,
      actions: [
        { label: "Apply Now", href: "/admissions", variant: "primary" },
        { label: "Download Brochure", href: doc.brochure, variant: "soft" },
      ],
    },
    { t: "stats", title: `${p.name} at a Glance`, tone: "cream", colored: true, items: p.glance },
    {
      t: "faq",
      title: `Why study ${p.name} at CDSIMER?`,
      plain: true,
      open: true,
      image: "why-faculty.jpg",
      items: [
        { q: "Teaching hospital", a: "A 900+ bed hospital with 1000+ daily patient footfall." },
        { q: "Experienced faculty", a: "Mentorship from clinicians, teachers and researchers." },
        { q: "Simulation labs", a: "Advanced simulation for safe, repeated skills practice." },
        { q: "Research culture", a: "Funded projects, publications and ethics oversight." },
      ],
    },
    {
      t: "carousel",
      id: "curriculum",
      title: p.curriculumTitle ?? "Curriculum as per NMC norms",
      tone: "cream",
      items: [...p.phases.map((x) => ({ tag: x.label, title: x.title, text: x.text })), ...(p.curriculumDocs ?? []).map((d) => ({ tag: "PDF", title: d.title, href: d.href }))],
    },
    {
      t: "carousel",
      id: "outcomes",
      title: "Programme outcomes",
      items: [
        ...p.outcomes.map((o, i) => ({ tag: String(i + 1).padStart(2, "0"), title: o.title, text: o.text })),
        ...(p.outcomesDoc ? [{ tag: "PDF", title: "Programme outcomes document", href: p.outcomesDoc }] : []),
      ],
    },
    ...(p.extra ?? []),
    { t: "text", title: "Clinical experience", body: ["Learning is anchored in real patient care across the teaching hospital."], bullets: p.clinical, image: "hospital-ward.jpg", alt: "CDSIMER teaching hospital ward", flip: true, tone: "cream" },
    { t: "text", id: "eligibility", title: "Eligibility, entrance exam & admissions", body: ["Eligibility and entrance-exam rules follow current NMC and university regulations. Confirm the latest details with the admissions office."], bullets: p.eligibility, actions: [{ label: "Admission process", href: "/admissions#process", variant: "soft" }] },
    ...(p.eligibilityDetail ? [{ t: "faq" as const, id: "eligibility-detail", title: "Eligibility criteria in detail", items: p.eligibilityDetail, image: "life-library.jpg" }] : []),
    { t: "cards", title: "Career opportunities", tone: p.eligibilityDetail ? undefined : "cream", cols: 4, items: p.careers.map((c) => ({ title: c, text: "" })) },
    { t: "faq", title: "Frequently asked questions", plain: !p.eligibilityDetail, items: p.faq },
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
    overview: [
      "The MBBS of four and a half years duration, is followed by one year of Compulsory Rotating Internship. The Medical Council of India (now National Medical Commission) has revised the curriculum from the academic year 2019-2020 onwards.",
      "The new curriculum “Competency Based Medical Education” focuses on the Indian Medical Graduate being competent enough to perform tasks of a primary care physician of first contact upon completion of training. The course begins with a short foundation course sensitizing students to basic principles of communication and ethics, health situation in India and role of doctors in community.",
    ],
    glance: [{ value: "150", label: "Students per year" }, { value: "5.5 Years", label: "Total Duration" }, { value: "NEET-UG", label: "Admission route" }, { value: "900+", label: "Teaching hospital beds" }],
    phases: [
      { label: "Phase I", title: "Pre-clinical", text: "Anatomy, physiology, biochemistry and the foundation course." },
      { label: "Phase II", title: "Para-clinical", text: "Pathology, pharmacology, microbiology, forensic medicine and community exposure." },
      { label: "Phase III – Part I", title: "Clinical I", text: "Community medicine, ophthalmology, ENT and clinical postings." },
      { label: "Phase III – Part II", title: "Clinical II", text: "Medicine, surgery, paediatrics, obstetrics & gynaecology and allied subjects." },
      { label: "Internship", title: "Compulsory rotating internship", text: "Supervised practice across departments." },
    ],
    clinical: ["Early patient contact and case-based learning", "Supervised ward, OPD and emergency postings", "Skills practice in simulation labs", "Community and rural outreach"],
    eligibility: [
      "Pass in 10+2 or equivalent with Physics, Chemistry, Biology / Biotechnology and English individually, from a recognised Board",
      "A minimum of 50% marks in Physics, Chemistry and Biology / Biotechnology taken together",
      "Qualifying boards: CBSE / ISC, recognised State Boards, GCE ‘A’ Levels or International Baccalaureate (IB)",
      "All admissions are based on the rank obtained in NEET-UG, conducted all-India by the National Testing Agency",
      "Seats are allotted by merit through centralised counselling conducted by the Karnataka Examination Authority (KEA)",
      "KEA (CET) code: M083",
    ],
    eligibilityDetail: [
      { q: "Who can apply: General / Foreign / NRI category", a: "CDSIMER admits candidates under the General or Foreign / NRI category on fulfilling the eligibility requirements. All admissions are on the basis of merit only. Foreign / NRI category seats are available for foreign nationals with NRI status or those sponsored by an individual holding NRI status. These seats are not equivalent to payment, management or reserved seats." },
      { q: "Indian (General category)", a: "CDSIMER admits Indian Nationals, Overseas Citizens of India (OCI) and Persons of Indian Origin (PIO) under the General category, subject to fulfilment of the eligibility criteria. All admissions to undergraduate programmes under this category are on a merit basis." },
      { q: "Foreign / NRI category admissions", a: "All Foreign / NRI / NRI-sponsored admissions to UG are on a first-come, first-served merit basis, subject to the candidate’s performance in the 10+2 of India or an equivalent examination, in addition to meeting the eligibility requirements set by the regulatory bodies. Candidates who confirm admission under this category by paying the full first-year programme fee cannot take admission under the General category." },
      { q: "Qualifications accepted", a: "Candidates should have obtained their qualifications from a recognised Board or University: the 10+2 of India from a recognised Central (CBSE / ISC) or State Board, GCE ‘A’ Levels, or the International Baccalaureate (IB). Candidates with foreign qualifications must submit an equivalency certificate from the Association of Indian Universities (AIU), New Delhi (www.aiu.ac.in)." },
      { q: "Indian Boards", a: "The certificate-issuing board must be established or recognised by an Act of the Central / State Government, a Gazette notification of the Central / State Government, or executive orders issued by the Central / State Government. The candidate must pass 10+2 or equivalent with Physics, Chemistry, Biology / Biotechnology and English individually, with a minimum of 50% marks calculated together in Physics, Chemistry and Biology / Biotechnology. Candidates are advised to check the NEET-UG brochure for the final eligibility criteria (www.nta.ac.in)." },
      { q: "International Boards: GCE ‘A’ Levels and British examining bodies", a: "Eligibility is based on qualifications recognised by the AIU. IGCSE / GCSE / GCE ‘O’ Levels (11 years of schooling) equate to the 10th grade, AS Level (12 years) to the 11th grade and GCE ‘A’ Levels (13 years) to the 12th grade of an Indian Board. Candidates should have minimum passes in Physics, Chemistry and Biology at GCE Advanced Level and English at AS Level, with an average of ‘D’ grade in Physics, Chemistry and Biology / Biotechnology, and should meet the subject-wise eligibility laid down by the statutory bodies. Check the minimum grade requirements for registration in your country." },
      { q: "International Baccalaureate (IB) Diploma", a: "Candidates should take three subjects at Higher Level (HL) and three at Standard Level (SL), securing a minimum of 3 points in each subject and an overall minimum of 24 points, with 12 points in HL and 12 points in SL, and should meet the subject-wise eligibility laid down by the statutory bodies." },
      { q: "International Baccalaureate (IB) Certificate", a: "Candidates should have taken a minimum of three subjects at HL and three at SL, securing a minimum of 3 points in each subject and an overall minimum of 24 points, and should meet the subject-wise eligibility laid down by the statutory bodies." },
      { q: "Admission process for General / Foreign / NRI category", a: "All admissions are based on the rank obtained in NEET-UG, conducted on an all-India basis. Seat allotment is by merit through centralised common counselling by the Karnataka Examination Authority (www.kea.kar.nic.in). The candidate must report to the allotted institution and complete all admission formalities within the stipulated timeline. Eligibility and the admission process are subject to change as per guidelines from the statutory bodies. It is the candidate’s responsibility to ensure they meet all eligibility requirements; if false information or documents from a non-recognised Board / University are found, or information is concealed, the admission will be cancelled without notice and the fee paid forfeited." },
    ],
    careers: ["Clinical practice", "Postgraduate specialisation", "Medical research", "Public health & administration"],
    curriculumDocs: [
      { title: "UG Curriculum Volume I", href: doc.curriculum1 },
      { title: "UG Curriculum Volume II", href: doc.curriculum2 },
      { title: "UG Curriculum Volume III", href: doc.curriculum3 },
    ],
    outcomes: [
      { title: "Clinician", text: "Understands and provides preventive, promotive, curative, palliative and holistic care with compassion." },
      { title: "Leader and member of the healthcare team", text: "Works effectively within the health system and can collect, analyse and communicate health data appropriately." },
      { title: "Communicator", text: "Communicates clearly and sensitively with patients, families, colleagues and the community." },
      { title: "Lifelong learner", text: "Committed to continuous improvement of knowledge and skills throughout professional life." },
      { title: "Professional", text: "Ethical, responsive and accountable to patients, the community and the profession." },
    ],
    outcomesDoc: doc.programOutcomes,
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
    glance: [{ value: "MD / MS", label: "Degrees" }, { value: "3 yrs", label: "Duration" }, { value: "47", label: "Total PG seats" }, { value: "NEET-PG", label: "Admission route" }],
    phases: [
      { label: "Year 1", title: "Foundation", text: "Core subject training, ward duties and thesis protocol." },
      { label: "Year 2", title: "Advanced training", text: "Supervised procedures, seminars and data collection." },
      { label: "Year 3", title: "Consolidation", text: "Independent patient management, thesis submission and examination." },
    ],
    clinical: ["Residency in wards, OPD and emergency", "Procedure and case logs under supervision", "Journal clubs and case conferences", "Teaching undergraduate students"],
    eligibility: ["Prescribed minimum score in NEET-PG applicable for the academic year", "MBBS completed at an NMC recognised medical college", "One year of compulsory rotating internship completed on or before the prescribed date", "Seat allotment by merit through counselling conducted by the Karnataka Examination Authority"],
    careers: ["Consultant specialist", "Super-speciality training", "Academic faculty", "Clinical research"],
    outcomes: [
      { title: "Clinical competence", text: "Diagnoses and manages patients independently in the chosen specialty and performs the procedures expected of a specialist." },
      { title: "Research and scholarship", text: "Plans, conducts and presents research, culminating in the thesis." },
      { title: "Teaching and communication", text: "Teaches undergraduates and junior colleagues and communicates effectively with patients, families and the care team." },
      { title: "Professionalism and ethics", text: "Practises with integrity, accountability and respect for patient rights." },
    ],
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
    curriculumTitle: "Programme structure",
    outcomes: [
      { title: "Original research", text: "Makes an original, well-designed contribution to biomedical or clinical knowledge." },
      { title: "Methodology and ethics", text: "Applies sound research methodology and works within institutional ethics oversight." },
      { title: "Publication and dissemination", text: "Publishes and presents findings to the scientific community." },
      { title: "Academic leadership", text: "Develops the independence to guide research teams and mentor junior researchers." },
    ],
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
        t: "phasegrid",
        id: "academic-year",
        title: "Academic Year",
        lead: "Select a phase to open its timetables, internal assessments and university exam notices.",
        data: academicYear,
      },
      { t: "docs", title: "AETCOM Module", tone: "cream", lead: "Attitude, Ethics and Communication module.", items: [{ title: "AETCOM Module", type: "PDF", href: doc.aetcom }] },
      { t: "docs", title: "Holiday List", items: [{ title: "Holiday List 2025", type: "PDF", href: doc.holidays }] },
      {
        t: "cards",
        id: "student-feedback-on-curriculum",
        title: "Student Feedback on Curriculum",
        lead: "Students share their views on teaching, assessment and learning resources at the end of each phase. The feedback is reviewed by the faculty to keep the MBBS curriculum effective and responsive.",
        tone: "cream",
        cols: 4,
        more: "View report",
        items: [
          { tag: "Phase I", title: "Pre-clinical", text: "Student feedback report for Phase I.", image: "life-students.jpg", href: doc.feedback1 },
          { tag: "Phase II", title: "Para-clinical", text: "Student feedback report for Phase II.", image: "life-library.jpg", href: doc.feedback2 },
          { tag: "Phase III – Part I", title: "Clinical I", text: "Student feedback report for Phase III, Part I.", image: "hospital-ward.jpg", href: doc.feedback31 },
          { tag: "Phase III – Part II", title: "Clinical II", text: "Student feedback report for Phase III, Part II.", image: "hospital-surgery.jpg", href: doc.feedback32 },
        ],
      },
      { t: "links", title: "Related", items: [{ label: "Programs", href: "/programs" }, { label: "Examination", href: "/examination" }, { label: "Departments", href: "/department" }] },
    ],
  },
];
