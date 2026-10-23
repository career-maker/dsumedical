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
        image: "journey-hospital.jpg",
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
      { t: "text", id: "central-lab", title: "Central Laboratory", tone: "cream", body: ["The hospital’s large, well-equipped central laboratory is NABL accredited and provides round-the-clock evaluation and diagnosis across clinical biochemistry, pathology and microbiology."], image: "dept-pathology.jpg", alt: "Central laboratory", flip: true, actions: [{ label: "Explore Central Laboratory", href: "/hospital/central-laboratory", variant: "soft" }] },
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
        t: "prose",
        items: [
        { p: "Team Central diagnostics strives to vector clinical decision making by offering round the clock, timely and reliable diagnostic services of highest quality. CDSIMER Central Laboratory is an NABL accredited laboratory. Central diagnostics is organized into three sub tracks- Clinical biochemistry, pathology and microbiology which by themselves diversify into divisions like clinical pathology, hematology, histopathology, bacteriology, virology, serology , immunology and molecular biology. Central diagnostics caters to each of these subdivisions by providing leading edge technology and futuristic diagnostic services. We also embrace a culture of centralization and consolidation of specialized laboratory services which will provide evaluation and diagnosis in timely and efficient fashion. In addition to providing quality diagnostic services, the faculty members contribute significantly to ongoing academic activities in the institute and conduct outstanding research which form an essential part of CDSIMER research base." },
        { h: "Vision" },
        { p: "To make the central diagnostics as an archetypal diagnostic and reference laboratory delivering quality reports adopting futuristic technology for better diagnosis." },
        { h: "Mission" },
        { p: "Team central diagnostics CDSIMER makes every effort to ensure excellence in the practice of ethical patient centered and evidence based laboratory medicine." },
        {
          ul: [
            "Adopting and maintaining state of the art technology as part of the core services.",
            "Assuring rapid turnaround time and user satisfaction.",
            "Application of improved laboratory technology and services through applied research and continual improvement.",
            "Dedicated to meet the ever changing needs of our users through competent & committed staff .",
          ],
        },
        { h: "Values" },
        { h: "Integrity" },
        { p: "Being credible is our capstone .All our processes, decisions and actions are driven by integrity. We strictly comply with national and international standards and also with governing laws and regulations." },
        { h: "Efficiency and effectiveness" },
        { p: "Our success depends on optimizing efficiency and scaling up effectiveness .We meet challenges by creating an environment of continuous performance improvement." },
        { h: "Accountability" },
        { p: "We are accountable to ourselves against the highest standards of integrity and fiscal responsibility." },
        { h: "Collaboration" },
        { p: "We believe in limitless possibilities of collaborative energy and achieve it by putting collective goals ahead of personal interest. We support and encourage open communication and meaningful cooperation among colleagues, respecting individual differences and valuing diversity." },
        { h: "Facilities Scope of services" },
        { p: "The central diagnostics of CDSIMER is located in the second floor of the hospital block and is spread over a palacial area of 10000 sq feet with centralized AC , fully automated and is easily accessible to clinicians and patients." },
        { p: "We provide 24 hours functional laboratory services in the field of haematology, clinical chemistry, clinical pathology, microbiology, cytology and histopathology." },
        { p: "State of the art equipment – on par with cutting edge technology capable of delivering high quality results with an excellent throughput." },
        { h: "Consultation" },
        { p: "Pathologists, biochemists and microbiologists are available for consultation round the clock." },
        { h: "Technical staff" },
        { p: "A team of highly competent technical staff are available for specimen collection and processing." },
        ],
      },
    ],
  },
];
