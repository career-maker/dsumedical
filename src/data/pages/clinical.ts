import type { PageDef } from "./types";
import { doc } from "./docs";

export type Dept = { slug: string; name: string; tab: "pre" | "para" | "clinical" | "super"; image: string; blurb: string };

// Category mapping is a working assumption.
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
        { title: "Vision", text: "To be a centre of excellence in teaching, service and research. Sed ut perspiciatis unde omnis iste natus error sit voluptatem." },
        { title: "Mission", text: "To train competent, ethical professionals and advance knowledge. Sed ut perspiciatis unde omnis iste natus error sit voluptatem." },
      ],
    },
    { t: "stats", title: "Key highlights", items: [{ value: "25+", label: "Faculty members" }, { value: "20", label: "Postgraduate seats" }, { value: "120+", label: "Research publications" }] },
    {
      t: "cards",
      title: "Expertise & specialities",
      cols: 3,
      items: [
        { title: "Clinical services", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." },
        { title: "Diagnostics & procedures", text: "Key procedures and investigations." },
        { title: "Training", text: "Undergraduate and postgraduate teaching." },
      ],
    },
    { t: "cards", title: "Facilities, infrastructure & equipment", tone: "cream", cols: 3, items: [{ title: "Laboratories", text: "Teaching and diagnostic laboratories. Lorem ipsum dolor sit amet consectetur." }, { title: "Equipment", text: "Major equipment available for teaching, diagnosis and research." }, { title: "Key facilities", text: "Wards, clinics and teaching spaces used by the department." }] },
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
      {
        t: "text",
        eyebrow: "Overview",
        title: "Teaching hospital of CDSIMER",
        body: [
          "Dr. Chandramma Dayananda Sagar Institution for Medical Education and Research (CDSIMER) with an A+ NAAC accreditation is supported by a 900 bed tertiary care hospital, which is NABH and NABL accredited, which will be augmented to a 1350 bed facility in the next 2 years. The hospital is built to cater to about 200 surrounding villages in the area. The hospital aims to provide comprehensive care under one roof to all its patients from all walks of life. At this time, we are empanelled and are accepting all government medical schemes.",
          "The campus is built with a lot of value additions, namely, parking facilities for patients and their attendants, designated areas for patients and their attendants to spend time together while the patient is in the hospital. Cafeteria for faculty, staff, students, patients and attendants is located in the ground floor.",
        ],
        video: "10yxPMitlJs",
      },
      { t: "stats", title: "Hospital at a Glance", tone: "cream", items: [{ value: "900+", label: "Beds" }, { value: "100", label: "Bed ICU" }, { value: "14", label: "Operation theatres" }, { value: "24×7", label: "Emergency & diagnostics" }] },
      {
        t: "cards",
        id: "vision",
        title: "Vision & Mission",
        cols: 2,
        items: [
          { title: "Vision", tag: "Where we are headed", image: "hospital-arch.jpg", text: "To be the most sought after institution / hospital with world class healthcare system through integration of proven medical practices and cutting edge technology in creating centers of excellence, with an added focus on education, research and training." },
          { title: "Mission", tag: "What we do every day", image: "hospital-ward.jpg", text: "To provide compassionate, accessible, high quality healthcare services with evidence based protocols and a patient centric approach for the benefit of humanity." },
        ],
      },
      {
        t: "text",
        id: "quality-policy",
        eyebrow: "Our commitment",
        title: "Quality Policy",
        tone: "cream",
        body: ["CDSIMER is committed to strive continually to deliver excellence in healthcare. We are driven by the zeal to care with compassion through inculcating core values, impeccable ethics in building synergies, thereby exceeding the expectations of our patients and their families."],
        image: "research-clinical.jpg",
        alt: "Doctors and nurses reviewing a patient chart",
        actions: [{ label: "Vision, Mission, Values & Quality Policy (PDF)", href: doc.hospitalMvv, variant: "soft" }],
      },
      {
        t: "cards",
        id: "core-values",
        title: "Core Values",
        cols: 3,
        items: [
          { title: "Integrity", tag: "01", text: "Know and do what is right." },
          { title: "Patient centricity", tag: "02", text: "Putting the patient first." },
          { title: "Empathy", tag: "03", text: "The ability to understand another person’s feelings." },
        ],
      },
      {
        t: "cards",
        title: "Comprehensive patient care",
        tone: "cream",
        cols: 4,
        items: [
          { title: "Outpatient & inpatient", text: "A spacious, well-ventilated OPD on the ground floor with private examination rooms, an enquiry counter and a PRO. Wards for adult male, adult female and paediatric patients, plus labour wards, with a diet kitchen run under a Clinical Diet Committee." },
          { title: "Emergency", text: "A comprehensive emergency department with round-the-clock services across medical, surgical, orthopaedic, paediatric and trauma care, backed by ICU, a 24×7 laboratory, radiology and a blood bank." },
          { title: "Critical care", text: "A 100-bed ICU covering adult, paediatric, neonatal, surgical and isolation wards, with advanced monitoring and a dialysis centre." },
          { title: "Digital records", text: "The hospital is networked with an Electronic Medical Records (EMR) system and uses a Hospital Information System (HIS), and aims to become completely digitised." },
        ],
      },
      { t: "cards", title: "Medical specialities", cols: 3, items: [{ title: "Clinical departments", text: "Medicine, surgery, paediatrics and more.", href: "/department" }, { title: "Super specialities", text: "Cardiology, neurology, nephrology and more.", href: "/department" }, { title: "Diagnostics", text: "Laboratory and imaging services.", href: "/hospital/central-laboratory" }] },
      {
        t: "cards",
        title: "Advanced facilities & services",
        tone: "cream",
        cols: 3,
        items: [
          { title: "Operation theatres", text: "Fourteen modern theatres with HEPA filters, modern anaesthesia work stations and motorised tables, wired for remote transmission for training, with facilities for minimal access surgery." },
          { title: "Blood bank", text: "A round-the-clock Department of Transfusion Medicine with component separation and storage (platelets, RBCs, fresh frozen plasma, cryoprecipitate) and an apheresis unit." },
          { title: "Radiology & diagnostics", text: "X-ray, ultrasonography and CT scan, with MRI scanners to be added." },
          { title: "Dialysis", text: "A dialysis centre complements the critical care services." },
          { title: "Laboratory medicine", text: "A large central laboratory organised into clinical biochemistry, pathology and microbiology, processing almost all tests." },
          { title: "Patient amenities", text:"Seating, drinking water and wash rooms for patients and families, with lifts, ramps, wheelchairs and trolleys across the hospital." },
        ],
      },
      { t: "text", id: "central-lab", title: "Central Laboratory", body: ["The hospital’s large, well-equipped central laboratory is NABL accredited and provides round-the-clock evaluation and diagnosis across clinical biochemistry, pathology and microbiology."], image: "dept-pathology.jpg", alt: "Central laboratory", flip: true, actions: [{ label: "Explore Central Laboratory", href: "/hospital/central-laboratory", variant: "soft" }] },
      { t: "gallery", title: "Gallery", groups: [{ label: "Hospital", images: [{ src: "hospital-arch.jpg", alt: "CDSIMER hospital and campus" }, { src: "hospital-surgery.jpg", alt: "General Surgery department team" }, { src: "hospital-ward.jpg", alt: "Hospital ward" }, { src: "dept-pathology.jpg", alt: "Pathology laboratory" }] }] },
      {
        t: "docs",
        id: "statutory",
        title: "Statutory requirements: Biomedical Waste Management",
        tone: "cream",
        items: [
          { title: "BMW Annual Report 2024", type: "PDF", href: doc.bmw2024 },
          { title: "BMW Annual Report 2025", type: "PDF", href: doc.bmw2025 },
          { title: "BMW Annual Report 2026", type: "PDF", href: doc.bmw2026 },
          { title: "BMW generation 2026 report", type: "PDF", href: doc.bmwGeneration },
        ],
      },
      { t: "links", title: "Related", items: [{ label: "Information under MSR Clause", href: "/msr-clause" }] },
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
      {
        t: "text",
        title: "About the laboratory",
        body: [
          "Team Central Diagnostics strives to guide clinical decision making by offering round-the-clock, timely and reliable diagnostic services of the highest quality. The CDSIMER Central Laboratory is NABL accredited.",
          "It is organised into three sub-tracks, clinical biochemistry, pathology and microbiology, which diversify into clinical pathology, haematology, histopathology, bacteriology, virology, serology, immunology and molecular biology, each with leading-edge technology. The faculty also contribute to academic activities and conduct research that forms an essential part of the CDSIMER research base.",
        ],
        image: "dept-microbiology.jpg",
        alt: "Researcher using a microscope",
      },
      {
        t: "cards",
        title: "Vision, Mission & Values",
        tone: "cream",
        cols: 3,
        items: [
          { title: "Vision", text: "To make central diagnostics an archetypal diagnostic and reference laboratory, delivering quality reports by adopting futuristic technology for better diagnosis." },
          { title: "Mission", text: "Excellence in ethical, patient-centred and evidence-based laboratory medicine; state-of-the-art technology as part of core services; rapid turnaround and user satisfaction; continual improvement through applied research; and competent, committed staff." },
          { title: "Values", text: "Integrity, efficiency and effectiveness, accountability and collaboration. We comply with national and international standards and governing laws and regulations." },
        ],
      },
      {
        t: "text",
        title: "Facilities & scope of services",
        body: ["The central diagnostics unit is on the second floor of the hospital block, spread over 10,000 sq ft with centralised AC, fully automated and easily accessible to clinicians and patients."],
        bullets: [
          "24-hour laboratory services in haematology, clinical chemistry, clinical pathology, microbiology, cytology and histopathology",
          "State-of-the-art equipment capable of delivering high-quality results with excellent throughput",
          "Pathologists, biochemists and microbiologists available for consultation round the clock",
          "A team of highly competent technical staff for specimen collection and processing",
        ],
      },
      { t: "cta", title: "Back to the hospital", text: "Explore the rest of our services.", actions: [{ label: "About Hospital", href: "/hospital" }] },
    ],
  },
];
