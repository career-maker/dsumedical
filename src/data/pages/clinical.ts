import type { Block, PageDef, ProseItem } from "./types";
import { doc } from "./docs";
import { liveDepts } from "./dept-live";

export type Dept = { slug: string; name: string; tab: "pre" | "para" | "clinical" | "super" | "others"; image: string; blurb: string };

// Category mapping is a working assumption.
export const deptTabs = [
  { id: "pre", label: "Pre-Clinical" },
  { id: "para", label: "Para-Clinical" },
  { id: "clinical", label: "Clinical" },
  { id: "super", label: "Super Speciality" },
  { id: "others", label: "Others" },
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
  d("Surgical Gastroenterology", "super", "hospital-ward.jpg", "Digestive and liver care."),
  d("Critical Care", "clinical", "hospital-ward.jpg", "Intensive care for critically ill patients."),
  d("Dermatology", "clinical", "hospital-ward.jpg", "Skin, hair and nail care."),
  d("Dentistry", "clinical", "hospital-ward.jpg", "Dental and oral health care."),
  d("Emergency Medicine", "clinical", "hospital-ward.jpg", "Round-the-clock emergency and trauma care."),
  d("Psychiatry", "clinical", "hospital-ward.jpg", "Mental health care and services."),
  d("Respiratory Medicine", "clinical", "hospital-ward.jpg", "Chest and respiratory care."),
  d("Transfusion Medicine", "clinical", "hospital-ward.jpg", "Safe blood and blood products for patients."),
  d("Paediatric Surgery", "super", "hospital-ward.jpg", "Surgical care for infants and children."),
  d("Urology", "super", "hospital-ward.jpg", "Urinary tract and male reproductive care."),
  d("Plastic Surgery", "super", "hospital-ward.jpg", "Reconstructive and aesthetic surgery."),
  d("Oncology", "super", "hospital-ward.jpg", "Cancer care."),
  d("Surgical Oncology", "super", "hospital-ward.jpg", "Surgical care for cancer."),
  d("Cardiothoracic and Vascular Surgery", "super", "hospital-ward.jpg", "Heart, chest and vascular surgery."),
  d("Neurosurgery", "super", "hospital-ward.jpg", "Surgical care of the brain and spine."),
  d("Endocrinology", "super", "hospital-ward.jpg", "Hormone and metabolic care."),
  d("Cardiac Anaesthesiology", "super", "hospital-ward.jpg", "Anaesthesia for cardiac surgery."),
  d("Medical Education Unit", "others", "research-clinical.jpg", "Training the trainers in medical education."),
  d("Skill Lab", "others", "research-labs.jpg", "Simulation-based training in clinical procedures."),
];

const deptPage = (x: Dept): PageDef => ({
  slug: `department/${x.slug}`,
  title: `Department of ${x.name}`,
  eyebrow: `Department · ${deptTabs.find((t) => t.id === x.tab)!.label}`,
  lead: x.blurb,
  hero: x.image,
  heroAlt: `${x.name} department`,
  actions: [{ label: "Enquire", href: "/enquiry", variant: "primary" }],
  blocks: deptBlocks(x),
});

// Faculty listed by cadre: head/principal first, then Professor > Associate > Assistant > residents > tutor. Stable within a cadre.
const cadreRank = (role: string) => {
  const r = role.toLowerCase().replace(/\s+/g, " ");
  if (/^dean/.test(r)) return -1; // Dean & Principal leads the list
  if (/\b(hod|head)\b/.test(r) && !/coordinator/.test(r)) return 0; // head of department
  if (/additional prof/.test(r)) return 2;
  if (/associate prof/.test(r)) return 3;
  if (/assistant prof|sr\. consultant/.test(r)) return 4;
  if (/prof/.test(r)) return 1;
  if (/senior resident/.test(r)) return 5;
  if (/junior resident/.test(r)) return 6;
  if (/tutor/.test(r)) return 7;
  return 8;
};

const deptBlocks = (x: Dept): Block[] => {
  const v = liveDepts[x.slug];
  const vm = (v?.sections ?? []).filter((s) => /^(vision|mission)$/i.test(s.title));
  const rest = (v?.sections ?? []).filter((s) => !vm.includes(s));
  const sec = rest.flatMap((s): ProseItem[] => [{ h: s.title }, ...(s.paras ?? []).map((p) => ({ p })), ...(s.bullets ? [{ ul: s.bullets }] : [])]);
  return [
    { t: "text", eyebrow: "About the department", title: `About ${x.name}`, body: v?.about.length ? v.about : [x.blurb], image: v?.image ?? x.image, alt: `${x.name} department`, actions: v?.links?.map((l) => ({ label: l.label, href: l.href, variant: "outline" as const })) },
    ...(vm.length ? [{ t: "cards", title: "Vision & Mission", tone: "cream", cols: vm.length > 1 ? 2 : 3, items: vm.map((s) => ({ title: s.title, text: s.paras?.join(" "), bullets: s.bullets })) } as Block] : []),
    ...(sec.length ? [{ t: "prose", tone: vm.length ? undefined : "cream", items: sec } as Block] : []),
    ...(v?.videos ? [{ t: "cards", title: "Training videos", cols: 3, items: v.videos.map(([title, id]) => ({ title, text: "Watch on YouTube", href: `https://www.youtube.com/watch?v=${id}` })) } as Block] : []),
    ...(v?.gallery ? [{ t: "gallery", title: "Gallery", groups: [{ label: x.name, images: v.gallery.filter((i): i is string => !!i).map((src, n) => ({ src, alt: `${x.name}: photo ${n + 1}` })) }] } as Block] : []),
    ...(v?.people.length ? [{ t: "profiles", cols: 4, title: v.peopleTitle, items: [...v.people].sort((a, b) => cadreRank(a.role) - cadreRank(b.role)).map((p) => ({ name: p.name, role: p.role, text: p.text ?? undefined, image: p.image ?? undefined })) } as Block] : []),
    { t: "links", title: "Related departments", items: depts.filter((o) => o.tab === x.tab && o.slug !== x.slug).slice(0, 4).map((o) => ({ label: o.name, href: `/department/${o.slug}` })) },
    { t: "cta", title: `Contact the Department of ${x.name}`, text: "Send us an enquiry and we will route it to the department.", actions: [{ label: "Enquire", href: "/enquiry" }, { label: "Contact", href: "/contact/key-contacts", variant: "soft" }] },
  ];
};

export const clinical: PageDef[] = [
  {
    slug: "department",
    title: "Departments",
    eyebrow: "Academics & Care",
    lead: "Explore pre-clinical, para-clinical, clinical and super-speciality departments.",
    hero: "banner-department.jpg",
    heroAlt: "Researcher using a microscope in a laboratory",
    blocks: [
      { t: "text", center: true, title: "Overview", body: ["Our departments combine teaching, patient care and research. Choose a category below to find the department you are looking for."] },
      { t: "departments" },
      { t: "faq", title: "FAQ", image: "dept-faq.png", items: [{ q: "How are departments grouped?", a: "Into pre-clinical, para-clinical, clinical and super-speciality." }, { q: "How do I contact a department?", a: "Open the department page and use the enquiry button." }, { q: "Can students train across departments?", a: "Yes. Clinical postings rotate students through several departments in the teaching hospital." }, { q: "Do departments take part in research?", a: "Yes. Every department supports faculty and student research projects, publications and workshops." }, { q: "Where can I find faculty details for a department?", a: "Each department page lists its team, services and academic activities." }] },
      { t: "cta", title: "Questions about a department?", text: "Our team is happy to help.", actions: [{ label: "Contact Us", href: "/contact" }] },
    ],
  },
  ...depts.map(deptPage),
  {
    slug: "hospital",
    title: "About Hospital",
    eyebrow: "Hospital",
    lead: "A 900+ bed teaching hospital delivering advanced, compassionate care.",
    hero: "banner-hospital.jpg",
    heroAlt: "CDSIMER teaching hospital entrance",
    actions: [{ label: "Book an Appointment", href: "/appointment", variant: "primary" }, { label: "Hospital Enquiry: 080 2608 6500", href: "tel:08026086500", variant: "glass" }],
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
          { title: "Vision", tag: "Where we are headed", image: "hosp-vision.jpg", text: "To be the most sought after institution / hospital with world class healthcare system through integration of proven medical practices and cutting edge technology in creating centers of excellence, with an added focus on education, research and training." },
          { title: "Mission", tag: "What we do every day", image: "hosp-mission.jpg", text: "To provide compassionate, accessible, high quality healthcare services with evidence based protocols and a patient centric approach for the benefit of humanity." },
        ],
      },
      {
        t: "text",
        id: "quality-policy",
        eyebrow: "Our commitment",
        title: "Quality Policy",
        tone: "cream",
        body: ["CDSIMER is committed to strive continually to deliver excellence in healthcare. We are driven by the zeal to care with compassion through inculcating core values, impeccable ethics in building synergies, thereby exceeding the expectations of our patients and their families."],
        image: "hosp-quality.jpg",
        alt: "Laboratory professional at work",
        actions: [{ label: "Vision, Mission, Values & Quality Policy (PDF)", href: doc.hospitalMvv, variant: "soft" }],
      },
      {
        t: "cards",
        id: "core-values",
        title: "Core Values",
        cols: 3,
        colored: true,
        items: [
          { title: "Integrity", tag: "01", text: "Know and do what is right." },
          { title: "Patient centricity", tag: "02", text: "Putting the patient first." },
          { title: "Empathy", tag: "03", text: "The ability to understand another person’s feelings." },
        ],
      },
      { t: "cards", title: "Medical specialities", tone: "cream", cols: 3, items: [{ title: "Clinical departments", text: "Medicine, surgery, paediatrics and more.", href: "/department" }, { title: "Super specialities", text: "Cardiology, neurology, nephrology and more.", href: "/department" }, { title: "Diagnostics", text: "Laboratory and imaging services.", href: "/hospital/central-laboratory" }] },
      {
        t: "faq",
        id: "facilities",
        title: "Facilities & services",
        plain: true,
        open: true,
        image: "hosp-facilities.jpg",
        items: [
          { q: "Outpatient Department and Inpatient Department", a: "A spacious, well-ventilated Outpatient Department (OPD) catering to all specialities is located conveniently in the ground floor of the building. Separate examination rooms to maintain privacy of our patients is provisioned inside the OPD area. Laboratory, Radiology and Diagnostics services are available to all OPD patients, which include both routine and specialised investigations. There is an enquiry counter located in the OPD area itself and to facilitate our patients we do have a Public Relations Officer (PRO) available at the OPD to ensure all patient queries are addressed.\n\nTo provide comfort to our patients and their families visiting the OPD, there are adequate facilities created for seating, access to drinking water and wash rooms. The hospital is networked with Electronic Medical Records (EMR) system and uses Hospital Information System (HIS). The hospital aims to become completely digitized in the near future.\n\nIn-patient Department has an adequate number of beds in the wards, dedicated for adult male, adult female, pediatric patients in addition to the labour wards. Every dedicated ward is complimented with facilities like treatment room(s), patient preparation rooms. There are sufficient number of lifts, ramps, staircases, wheel chairs and trolley facilities available to cater to the diverse needs of our patients. A diet kitchen facility is also available that operates under the supervision of a qualified Clinical Diet Committee that tailor-makes and prescribes a diet for each patient, depending on their medical condition." },
          { q: "Accident and Emergency Services", a: "The hospital is equipped with a comprehensive emergency department that offers round the clock services and is staffed by trained medical and paramedical staff members. The gamut of services includes medical, surgical, orthopaedic, pediatric and trauma services with a backup of Intensive Care Unit (ICU). The Department is supported by an alert and well-trained team of patient evacuation service facility equipped with critical lifesaving equipments. The other support services include a 24*7 laboratory, radiology and diagnostics, and blood bank.\n\nThe department is equipped to handle a large number of patients at all times, which will also help in facilitating learning among medical students by getting involved with practical hands-on training for dealing with medical emergency situations among medical personnel." },
          { q: "Intensive Care Services", a: "The Department of Intensive Care meets the need of patients facing an immediate life-threatening health condition. The 100-bed Intensive Care Unit (ICU), which includes adult, pediatric, neonatal, surgical and isolation (ICU) wards is managed by a team of well-qualified medical and nursing staff to cater to all the critical care requirements of patients using advanced therapeutic monitoring and diagnostic technology. The Department is geared up to provide up to the minute expert care and services to the critically ill patients. A dialysis center has been established to complement the critical care services." },
          { q: "Anaesthesiology, Perioperative and Pain Medicine", a: "There are fourteen (14) well-equipped modern Operating Theatres (OTs) manned by qualified anaesthesiologists and theatre technicians catering to the needs of all basic surgical and super-specialities. All operating theatres are fitted with HEPA filters, with modern anaesthesia work stations and with motorized tables. All theatres are wired up for remote transmission for purposes of training and workshops. All facilities necessary for enabling minimal access surgical procedures have also been made available." },
          { q: "Blood Bank Facility", a: "The Department of Transfusion Medicine is committed to provide safe and high quality blood and blood products for catering to the blood requirements of patients. The round the clock fully functional department is fully equipped with component separation and storage. (Platelets, RBCs, Fresh frozen plasma and Cryoprecipitate) A state of the art apheresis unit is also a part of the blood center.\n\nQuality assurance is ascertained to ensure supply of safe blood units as per the hospital demands. We follow world class standards and acceptable procedures and use modern equipment for testing and screening of blood. Donor counselling, pre- transfusion testing, increasing active donor base, antibody screening and identification, compatibility testing and timely quality check of the reagents are a part of the workflow.\n\nThe blood center has successfully issued over multiple units of blood in-house over the past few months to patients scheduled for surgeries, accident victims, patients receiving treatment for leukemias, cancers and thalassemias. The blood center team is actively involved in mobilizing potential voluntary donor populations to cater to the blood demands of the hospital round the clock and also has been issuing units to nearby nursing homes and storage centres located in proximity when asked for. Saline washed RBCs are also prepared in house and issued when clinically indicated.\n\nPolicies for donor selection are formulated taking into account the latest regulatory guidelines, striving to maintain the balance between safety and sufficiency of the blood supply." },
          { q: "Radiology and Diagnostic Services", a: "The Department of Radiology and Diagnostics focuses on identifying a wide range of medical issues. The most common situations are identifying broken bones, diagnosing heart conditions, identifying the location of blood clots, diagnosing gastrointestinal conditions and many more. The purpose behind diagnostic imaging at the Department of Radiology and Diagnostics is to use non-invasive or minimally invasive techniques to identify and treat medical conditions.Currently, we are equipped with radio diagnostic equipment like X-Ray machines and ultrasonography and CT scan. We will shortly be adding to the biomedical infrastructure with MRI scanners." },
          { q: "Lab Medicine Services", a: "The hospital is complimented with a large, well-equipped central laboratory that is equipped to process almost all tests. Central laboratory is organized into three sub-tracks: Clinical Biochemistry, Pathology and Microbiology which in turn has eight sub-divisions such as clinical pathology, haematology, histopathology, bacteriology, virology, serology, immunology and molecular biology. Central laboratory also caters to each of these subdivisions by providing cutting- edge technology and adavanced diagnostic services. The department of Lab Medicine embraces a culture of centralization and consolidation of specialized laboratory services which aims to provide evaluation and diagnosis in a timely and efficient manner." },
        ],
      },
      { t: "text", id: "central-lab", title: "Central Laboratory", tone: "cream", body: ["The hospital’s large, well-equipped central laboratory is NABL accredited and provides round-the-clock evaluation and diagnosis across clinical biochemistry, pathology and microbiology."], image: "hosp-lab.jpg", alt: "Central laboratory", flip: true, actions: [{ label: "Explore Central Laboratory", href: "/hospital/central-laboratory", variant: "soft" }] },
      { t: "gallery", title: "Gallery", groups: [{ label: "Hospital", images: ["Computer-based teaching session","Anatomy teaching with a skeleton model","Anatomy museum models","Embryology teaching models","Faculty and students at the hospital entrance","Reading in the library","Clinical skills demonstration","Ward round discussion","Students with faculty"].map((alt, i) => ({ src: `hosp-gal-${i + 1}.jpg`, alt })) }] },
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
      { t: "cta", title: "Care when you need it", text: "Book an appointment or reach the emergency desk.", actions: [{ label: "Book an Appointment", href: "/appointment" }, { label: "Hospital Enquiry: 080 2608 6500", href: "tel:08026086500", variant: "soft" }] },
    ],
  },
  {
    slug: "hospital/central-laboratory",
    title: "Central Laboratory",
    eyebrow: "Hospital",
    lead: "NABL accredited diagnostics supporting every department.",
    hero: "banner-hospital.jpg",
    heroAlt: "CDSIMER teaching hospital entrance",
    blocks: [
      {
        t: "text",
        eyebrow: "Central diagnostics",
        title: "Timely, reliable diagnosis, around the clock",
        body: [
          "Team Central Diagnostics strives to steer clinical decision making by offering round-the-clock, timely and reliable diagnostic services of the highest quality. The CDSIMER Central Laboratory is NABL accredited.",
          "It is organised into three sub-tracks, clinical biochemistry, pathology and microbiology, which in turn branch into clinical pathology, haematology, histopathology, bacteriology, virology, serology, immunology and molecular biology.",
          "Specialised laboratory services are centralised and consolidated so that evaluation and diagnosis are efficient. The faculty also contribute significantly to the institute’s academic activities and research base.",
        ],
        image: "research-labs.jpg",
        alt: "Laboratory technologist examining a specimen under a microscope",
      },
      {
        t: "stats",
        colored: true,
        items: [
          { value: "24×7", label: "Laboratory services" },
          { value: "NABL", label: "Accredited laboratory" },
          { value: "10,000", label: "Sq ft, centrally air-conditioned" },
          { value: "3", label: "Sub-tracks: biochemistry, pathology, microbiology" },
        ],
      },
      {
        t: "cards",
        title: "Scope of services",
        lead: "Round-the-clock haematology, clinical chemistry, clinical pathology, microbiology, cytology and histopathology.",
        cols: 3,
        items: [
          { title: "Clinical biochemistry", text: "Clinical chemistry services available round the clock." },
          { title: "Pathology", bullets: ["Clinical pathology", "Haematology", "Cytology", "Histopathology"] },
          { title: "Microbiology", bullets: ["Bacteriology", "Virology", "Serology", "Immunology", "Molecular biology"] },
        ],
      },
      {
        t: "text",
        eyebrow: "Facilities",
        title: "A 10,000 sq ft, fully automated laboratory",
        body: [
          "The central diagnostics laboratory is on the second floor of the hospital block, spread over 10,000 sq ft with centralised air-conditioning, and is easily accessible to clinicians and patients.",
          "State-of-the-art equipment, on par with cutting-edge technology, delivers high-quality results with excellent throughput.",
        ],
        bullets: [
          "Pathologists, biochemists and microbiologists are available for consultation round the clock.",
          "A team of highly competent technical staff handles specimen collection and processing.",
        ],
        image: "dept-microbiology.jpg",
        alt: "Scientist at a microscope in a modern laboratory",
        flip: true,
        tone: "cream",
      },
      {
        t: "cards",
        title: "Vision & Mission",
        cols: 2,
        items: [
          { title: "Vision", text: "To make central diagnostics an archetypal diagnostic and reference laboratory, delivering quality reports by adopting futuristic technology for better diagnosis." },
          {
            title: "Mission",
            text: "Team Central Diagnostics makes every effort to ensure excellence in the practice of ethical, patient-centred and evidence-based laboratory medicine.",
            bullets: [
              "Adopting and maintaining state-of-the-art technology as part of the core services.",
              "Assuring rapid turnaround time and user satisfaction.",
              "Applying improved laboratory technology and services through applied research and continual improvement.",
              "Meeting the ever-changing needs of our users through a competent and committed staff.",
            ],
          },
        ],
      },
      {
        t: "cards",
        title: "Our values",
        tone: "cream",
        cols: 4,
        items: [
          { title: "Integrity", text: "Being credible is our capstone. All our processes, decisions and actions are driven by integrity, in line with national and international standards, laws and regulations." },
          { title: "Efficiency and effectiveness", text: "Our success depends on optimising efficiency and scaling up effectiveness. We meet challenges through continuous performance improvement." },
          { title: "Accountability", text: "We are accountable to ourselves against the highest standards of integrity and fiscal responsibility." },
          { title: "Collaboration", text: "We put collective goals ahead of personal interest, with open communication and cooperation among colleagues, respecting individual differences and valuing diversity." },
        ],
      },
      {
        t: "gallery",
        title: "Inside the laboratory",
        groups: [
          {
            label: "Laboratory",
            images: [
              { src: "hosp-lab.jpg", alt: "Central laboratory work area with microscopes and red-fronted benches" },
              { src: "dept-microbiology.jpg", alt: "Scientist examining a specimen under a microscope" },
              { src: "research-labs.jpg", alt: "Technologist at a microscope with sample tubes" },
              { src: "dept-pathology.jpg", alt: "Laboratory team in white coats" },
            ],
          },
        ],
      },
      { t: "cta", title: "Diagnostics you can rely on", text: "Book an appointment or reach the hospital for laboratory services.", actions: [{ label: "Book an Appointment", href: "/appointment" }, { label: "Hospital Enquiry: 080 2608 6500", href: "tel:08026086500", variant: "soft" }] },
    ],
  },
];
