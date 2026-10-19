import type { PageDef } from "./types";

export type Dept = { slug: string; name: string; tab: "pre" | "para" | "clinical" | "super"; image: string; blurb: string };

// Category mapping is a working assumption: confirm the full inventory with the client.
export const deptTabs = [
  { id: "pre", label: "Pre-Clinical" },
  { id: "para", label: "Para-Clinical" },
  { id: "clinical", label: "Clinical" },
  { id: "super", label: "Super Speciality" },
] as const;

// Distinct stock imagery so neighbouring cards never repeat; the four designed departments keep their own art.
const pool = ["research-labs", "research-clinical", "research-projects", "hospital-ward", "research-grants", "research-conferences", "journey-research", "journey-hospital", "life-hall"].map((n) => n + ".jpg");
let n = 0;
const d = (name: string, tab: Dept["tab"], image: string, blurb: string): Dept => ({
  slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  tab,
  image: image.startsWith("dept-") ? image : pool[n++ % pool.length],
  blurb,
});

export const depts: Dept[] = [
  d("Anatomy", "pre", "research-labs.jpg", "Structure of the human body through dissection, histology and embryology."),
  d("Physiology", "pre", "research-clinical.jpg", "Functions of the body systems, with experimental and clinical physiology."),
  d("Biochemistry", "pre", "research-labs.jpg", "Molecular basis of health and disease, with diagnostic correlations."),
  d("Pathology", "para", "dept-pathology.jpg", "Diagnostics, laboratory research and hands-on clinical training."),
  d("Pharmacology", "para", "dept-pharmacology.jpg", "Drug mechanisms, therapeutic effects and rational prescribing."),
  d("Microbiology", "para", "dept-microbiology.jpg", "Microorganisms, diagnosis and infection control."),
  d("Community Medicine", "para", "dept-community.jpg", "Preventive healthcare, rural outreach and community wellness."),
  d("Forensic Medicine & Toxicology", "para", "research-clinical.jpg", "Medico-legal practice and toxicology."),
  d("General Medicine", "clinical", "hospital-ward.jpg", "Adult medicine across OPD, IPD and critical care."),
  d("General Surgery", "clinical", "hospital-ward.jpg", "Surgical care and operative training."),
  d("Paediatrics", "clinical", "hospital-ward.jpg", "Care for newborns, children and adolescents."),
  d("Obstetrics & Gynaecology", "clinical", "hospital-ward.jpg", "Maternal and women’s health services."),
  d("Orthopaedics", "clinical", "hospital-ward.jpg", "Bone, joint and trauma care."),
  d("Ophthalmology", "clinical", "hospital-ward.jpg", "Eye care and vision services."),
  d("Otorhinolaryngology (ENT)", "clinical", "hospital-ward.jpg", "Ear, nose and throat care."),
  d("Anaesthesiology", "clinical", "hospital-ward.jpg", "Perioperative care, pain and critical care."),
  d("Radiodiagnosis", "clinical", "research-clinical.jpg", "Imaging and diagnostic radiology."),
  d("Cardiology", "super", "hospital-ward.jpg", "Heart and vascular care."),
  d("Neurology", "super", "hospital-ward.jpg", "Brain and nervous-system care."),
  d("Nephrology", "super", "hospital-ward.jpg", "Kidney care and dialysis."),
  d("Gastroenterology", "super", "hospital-ward.jpg", "Digestive and liver care."),
];

const deptPage = (x: Dept): PageDef => ({
  slug: `department/${x.slug}`,
  title: `Department of ${x.name}`,
  eyebrow: `Department · ${deptTabs.find((t) => t.id === x.tab)!.label}`,
  lead: x.blurb,
  hero: x.image,
  heroAlt: `${x.name} department`,
  actions: [{ label: "Enquire", href: "/enquiry", variant: "primary" }],
  blocks: [
    { t: "text", eyebrow: "About the department", title: `About ${x.name}`, body: [x.blurb, "The department contributes to undergraduate teaching, postgraduate training, patient care and research at CDSIMER."], image: x.image, alt: `${x.name} department` },
    {
      t: "cards",
      title: "Vision & Mission",
      tone: "cream",
      cols: 2,
      items: [
        { title: "Vision", text: "To be a centre of excellence in teaching, service and research. Final wording supplied by the department." },
        { title: "Mission", text: "To train competent, ethical professionals and advance knowledge. Final wording supplied by the department." },
      ],
    },
    { t: "stats", title: "Key highlights", items: [{ value: "—", label: "Faculty (to be updated)" }, { value: "—", label: "Seats (to be updated)" }, { value: "—", label: "Publications (to be updated)" }] },
    {
      t: "cards",
      title: "Expertise & specialities",
      cols: 3,
      items: [
        { title: "Clinical services", text: "Speciality services as confirmed by the department." },
        { title: "Diagnostics & procedures", text: "Key procedures and investigations." },
        { title: "Training", text: "Undergraduate and postgraduate teaching." },
      ],
    },
    { t: "cards", title: "Facilities, infrastructure & equipment", tone: "cream", cols: 3, items: [{ title: "Laboratories", text: "Teaching and diagnostic laboratories. Details to be supplied by the department." }, { title: "Equipment", text: "Major equipment available for teaching, diagnosis and research." }, { title: "Key facilities", text: "Wards, clinics and teaching spaces used by the department." }] },
    { t: "profiles", title: "HOD & Faculty", items: [{ name: "Head of Department", role: x.name }, { name: "Professor", role: x.name }, { name: "Associate Professor", role: x.name }] },
    { t: "cards", title: "Academics & research", cols: 4, items: [{ title: "Teaching", text: "Undergraduate and postgraduate teaching programmes run by the department." }, { title: "Clinical training", text: "Hands-on training in wards, clinics and laboratories." }, { title: "Research", text: "Ongoing projects and student research activities.", href: "/research" }, { title: "Publications", text: "Staff publications and published articles.", href: "/research" }] },
    { t: "gallery", title: "Gallery", groups: [{ label: "Department", images: [{ src: x.image, alt: `${x.name} department` }, { src: "hospital-ward.jpg", alt: "Hospital ward" }, { src: "research-labs.jpg", alt: "Laboratory" }] }] },
    { t: "links", title: "Related departments", items: depts.filter((o) => o.tab === x.tab && o.slug !== x.slug).slice(0, 4).map((o) => ({ label: o.name, href: `/department/${o.slug}` })) },
    { t: "form", title: `Enquire about ${x.name}`, lead: "Send your question and we will route it to the department.", kind: "contact" },
    { t: "cta", title: `Contact the Department of ${x.name}`, text: "Send us an enquiry and we will route it to the department.", actions: [{ label: "Enquire", href: "/enquiry" }, { label: "Contact", href: "/contact/key-contacts", variant: "soft" }] },
  ],
});

export const clinical: PageDef[] = [
  {
    slug: "department",
    title: "Departments",
    eyebrow: "Academics & Care",
    lead: "Explore pre-clinical, para-clinical, clinical and super-speciality departments.",
    hero: "dept-pathology.jpg",
    heroAlt: "Doctors in a pathology laboratory",
    blocks: [
      { t: "text", title: "Overview", body: ["Our departments combine teaching, patient care and research. Choose a category below to find the department you are looking for."] },
      { t: "departments" },
      { t: "cards", title: "Faculty & expertise", tone: "cream", cols: 3, items: [{ title: "Experienced faculty", text: "Teachers who are also practising clinicians and researchers." }, { title: "Super-speciality depth", text: "30+ super-speciality services." }, { title: "Research-led teaching", text: "Learning supported by ongoing research." }] },
      { t: "faq", title: "FAQ", items: [{ q: "How are departments grouped?", a: "Into pre-clinical, para-clinical, clinical and super-speciality." }, { q: "How do I contact a department?", a: "Open the department page and use the enquiry button." }] },
      { t: "cta", title: "Questions about a department?", text: "Our team is happy to help.", actions: [{ label: "Contact Us", href: "/contact" }] },
    ],
  },
  ...depts.map(deptPage),
  {
    slug: "hospital",
    title: "About Hospital",
    eyebrow: "Hospital",
    lead: "A 900+ bed teaching hospital delivering advanced, compassionate care.",
    hero: "journey-hospital.jpg",
    heroAlt: "CDSIMER teaching hospital building at dusk",
    actions: [{ label: "Book an Appointment", href: "/appointment", variant: "primary" }, { label: "Emergency: 1800 425 9900", href: "tel:18004259900", variant: "glass" }],
    blocks: [
      { t: "text", eyebrow: "Overview", title: "Teaching hospital of CDSIMER", body: ["The hospital supports patient care, medical education and research, with NABH and NABL accredited services."], bullets: ["NABH accredited hospital", "NABL accredited laboratory", "Clinical teaching for MBBS and PG students"], image: "hospital-ward.jpg", alt: "Hospital ward" },
      { t: "stats", title: "Hospital at a Glance", tone: "cream", lead: "Figures to be verified before publication.", items: [{ value: "900+", label: "Beds" }, { value: "100", label: "Bed ICU" }, { value: "14", label: "Operation theatres" }, { value: "24×7", label: "Emergency & diagnostics" }] },
      { t: "cards", title: "Vision, Mission, Quality Policy & Core Values", cols: 4, items: [{ title: "Vision", text: "As per official document." }, { title: "Mission", text: "As per official document." }, { title: "Quality Policy", text: "As per official document." }, { title: "Core Values", text: "As per official document." }] },
      { t: "docs", title: "Documents", items: [{ title: "Vision, Mission & Quality Policy", type: "PDF" }] },
      { t: "cards", title: "Patient care", tone: "cream", cols: 4, items: [{ title: "OPD", text: "Outpatient consultations across specialities." }, { title: "IPD", text: "Inpatient wards and care." }, { title: "Emergency", text: "Round-the-clock emergency medicine." }, { title: "Critical care", text: "ICU and critical-care services." }] },
      { t: "cards", title: "Medical specialities", cols: 3, items: [{ title: "Clinical departments", text: "Medicine, surgery, paediatrics and more.", href: "/department" }, { title: "Super specialities", text: "Cardiology, neurology, nephrology and more.", href: "/department" }, { title: "Diagnostics", text: "Laboratory and imaging services.", href: "/hospital/central-laboratory" }] },
      { t: "cards", title: "Advanced facilities & services", tone: "cream", cols: 4, items: [{ title: "Radiology", text: "" }, { title: "Diagnostics", text: "" }, { title: "Blood bank", text: "" }, { title: "Operation theatres", text: "" }, { title: "Dialysis", text: "" }, { title: "Pharmacy", text: "" }, { title: "Specialty clinics", text: "" }, { title: "ICU", text: "" }] },
      { t: "text", title: "Central Laboratory", body: ["A centralised, NABL accredited laboratory supporting diagnosis across the hospital."], image: "dept-pathology.jpg", alt: "Central laboratory", flip: true, actions: [{ label: "Visit Central Laboratory", href: "/hospital/central-laboratory", variant: "soft" }] },
      { t: "gallery", title: "Gallery", groups: [{ label: "Hospital", images: [{ src: "hospital-ward.jpg", alt: "Hospital ward" }, { src: "journey-hospital.jpg", alt: "Hospital building" }, { src: "dept-pathology.jpg", alt: "Pathology laboratory" }] }] },
      { t: "links", title: "Related", items: [{ label: "Statutory requirements", href: "/msr-clause" }] },
      { t: "cta", title: "Care when you need it", text: "Book an appointment or reach the emergency desk.", actions: [{ label: "Book an Appointment", href: "/appointment" }, { label: "Call 1800 425 9900", href: "tel:18004259900", variant: "soft" }] },
    ],
  },
  {
    slug: "hospital/central-laboratory",
    title: "Central Laboratory",
    eyebrow: "Hospital",
    lead: "NABL accredited diagnostics supporting every department.",
    hero: "dept-pathology.jpg",
    heroAlt: "Doctors in a pathology laboratory",
    blocks: [
      { t: "text", title: "About the laboratory", body: ["The Central Laboratory provides round-the-clock diagnostic services. Services and test menu to be supplied."], image: "dept-microbiology.jpg", alt: "Researcher using a microscope" },
      { t: "cards", title: "Services", tone: "cream", cols: 3, items: [{ title: "Clinical pathology", text: "" }, { title: "Haematology", text: "" }, { title: "Biochemistry & microbiology", text: "" }] },
      { t: "cta", title: "Back to the hospital", text: "Explore the rest of our services.", actions: [{ label: "About Hospital", href: "/hospital" }] },
    ],
  },
];
