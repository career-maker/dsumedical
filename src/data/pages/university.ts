import type { PageDef, Block } from "./types";
import { external } from "../nav";
import { doc } from "./docs";

const policyNav: Block = {
  t: "links",
  title: "Related policies",
  items: [
    { label: "PwBD Committee", href: "/university/policies/pwbd-committee" },
    { label: "Anti-Ragging Policy", href: "/university/policies/anti-ragging" },
    { label: "Anti-Ragging Committee", href: "/university/anti-ragging-committee" },
    { label: "Prevention of Sexual Harassment", href: "/university/policies/prevention-of-sexual-harassment" },
    { label: "Grievance Redressal Committee", href: "/university/policies/grievance-redressal" },
  ],
};

const concern: Block = {
  t: "cta",
  title: "Need to raise a concern?",
  text: "Reach the institution through the key contacts page. Every report is handled with confidentiality.",
  actions: [{ label: "Key Contacts", href: "/contact/key-contacts" }],
};

const policyPage = (slug: string, title: string, lead: string, blocks: Block[]): PageDef => ({
  slug: `university/policies/${slug}`,
  title,
  eyebrow: "University · Policies",
  lead,
  hero: "about.jpg",
  heroAlt: "CDSIMER campus",
  blocks: [...blocks, policyNav, concern],
});

export const university: PageDef[] = [
  {
    slug: "university",
    title: "University",
    eyebrow: "CDSIMER · Dayananda Sagar University",
    lead: "Institutional information, policies, regulatory disclosures and recognitions of CDSIMER.",
    hero: "about.jpg",
    heroAlt: "CDSIMER campus",
    blocks: [
      {
        t: "cards",
        title: "Explore the university",
        cols: 3,
        items: [
          { title: "About CDSIMER", text: "Vision, mission, legacy, accreditations and leadership.", href: "/university/about" },
          { title: "Policies", text: "PwBD, anti-ragging, POSH and grievance redressal.", href: "/university/policies" },
          { title: "NMC", text: "National Medical Commission disclosures and conduct documents.", href: "/university/nmc" },
          { title: "Awards", text: "Awards and recognitions earned by the institution.", href: "/university/awards" },
          { title: "Library", text: "Collections, services and learning spaces.", href: "/library" },
          { title: "Gallery", text: "Campus, hospital and academic life, module-wise.", href: "/gallery" },
        ],
      },
      { t: "links", title: "External systems", items: [{ label: "About DSU", href: external.dsu }, { label: "ERP Login", href: external.erp }, { label: "AEBAS Dashboard", href: external.aebas }, { label: "Hostel", href: external.hostel }] },
    ],
  },
  {
    slug: "university/about",
    title: "About CDSIMER",
    eyebrow: "University",
    lead: "Dr. Chandramma Dayananda Sagar Institute of Medical Education & Research, part of Dayananda Sagar University.",
    hero: "hero.jpg",
    heroAlt: "Smiling medical student holding textbooks on the CDSIMER campus",
    actions: [{ label: "Explore Programs", href: "/programs", variant: "primary" }, { label: "Apply Now", href: "/admissions", variant: "glass" }],
    blocks: [
      {
        t: "text",
        eyebrow: "Who we are",
        title: "About CDSIMER",
        body: [
          "The Sagar Group ventured into healthcare under the leadership of Dr. Chandramma D. Sagar in the 1960s with Chandra Nursing Home. Almost four decades later, her sons Dr. D. Hemachandra Sagar and Dr. D. Premachandra Sagar carried her vision forward, founding one of the first corporate, 250 bed, multi tertiary care hospitals in Bengaluru in 2002, followed by a 415 bed hospital in 2009.",
          "CDSIMER has been built to supplement India’s efforts in meeting the need for highly qualified human capital for the nation’s expanding healthcare activities. Medical education here builds on a strong global-standard curriculum aided by clinical experience and advances in biomedical science, with students gaining experience through compassionate community service and innovative research.",
          "CDSIMER is established under the aegis of Dayananda Sagar University (DSU), a member of the Dayananda Sagar Institutions family. Spread over 140 acres at Harohalli in greater Bengaluru, the campus offers comprehensive facilities for teaching, research and patient care, with a state-of-the-art 1350 bed hospital planned. The first phase of 300 beds opened to patients in the second half of 2019.",
          "Founded by Late Sri R. Dayananda Sagar in the early sixties, DSI has grown into an education powerhouse with five campuses across Karnataka serving over 22,000 students, under the Mahatma Gandhi Vidya Peetha Education Trust (MGVP) in Bengaluru.",
        ],
        image: "about.jpg",
        alt: "CDSIMER campus",
      },
      {
        t: "cards",
        id: "vision",
        title: "Vision & Mission",
        lead: "From the official Vision & Mission document.",
        tone: "cream",
        cols: 2,
        items: [
          { title: "Vision", tag: "Where we are headed", image: "why-girl.jpg", text: "To advance medical education and thus deliver the best care for all. To be a centre of excellence in education, research & training, innovation & entrepreneurship and to produce citizens with exceptional leadership qualities to serve national and global needs." },
          { title: "Mission", tag: "What we commit to", image: "hospital-ward.jpg", text: "To partner with patients, healthcare industries, governmental and non-governmental organisations including pharmaceuticals working for the promotion of healthcare in the country, and to lead speciality medical education and promote the role of a doctor in leadership, research, community healthcare and lifelong healthcare." },
        ],
      },
      {
        t: "text",
        title: "A holistic, multi-disciplinary institution",
        body: ["CDSIMER plans to become a holistic multi-disciplinary institution by partnering with all para-medical science subjects and drawing on science, technology and educational institutions to further healthcare practice, research and innovation."],
        bullets: [
          "New chapters from the STEM stream dovetailed into the medical curriculum",
          "Short programmes on medical equipment, intellectual property rights and health-sector administration",
          "Climate change, environmental pollution and their impact on human health",
          "Artificial intelligence in patient care and point-of-care investigation",
          "Occupational diseases, aviation and space technology related disorders",
          "Medical auditing, financial management, communication skills, genomics and DNA technology for healthcare professionals",
        ],
      },
      {
        t: "docs",
        title: "Official documents",
        tone: "cream",
        items: [
          { title: "DSU Act", type: "PDF", href: doc.dsuAct },
          { title: "Government of Karnataka Notification", type: "PDF", href: doc.gokNotification },
        ],
      },
      {
        t: "text",
        id: "founders",
        eyebrow: "Founding Legends",
        title: "Legacy of Late Smt. Dr. Chandramma Sagar",
        body: [
          "Dr. Chandramma D. Sagar was a nationally renowned obstetrician and gynaecologist who served as Honorary Surgeon to three former Presidents of India and three Governors of State. She won a Gold Medal from Mysore Medical College and went to the United Kingdom in the 1950s, becoming the first lady doctor from India to hold a triple FRCS: London, Edinburgh and Glasgow.",
          "Returning to India, she served as Dean of Vani Vilas Hospital in Bengaluru and, in 1963, founded Chandra Nursing Home, the building block of the Sagar healthcare division. CDSIMER is founded in her memory.",
        ],
        image: "founder-chandramma.png",
        fit: "art",
        alt: "Late Dr. Chandramma D. Sagar",
      },
      {
        t: "text",
        title: "Legacy of Late Sri. R. Dayananda Sagar",
        body: [
          "Late Sri R. Dayananda Sagar, founder of the Dayananda Sagar Institutions, was a graduate in Arts and Commerce from India and a Barrister-at-law from England: a visionary, an educationist and a leader who believed in transforming the world.",
          "He set up the Mahatma Gandhi Vidya Peetha Education Trust (MGVP), which has educated young citizens for over 60 years and built an alumni network of over 100,000 professionals, law makers and sports personalities working across the globe.",
        ],
        image: "founder-dayananda.png",
        fit: "art",
        alt: "Late Sri R. Dayananda Sagar",
        flip: true,
        tone: "cream",
      },
      {
        t: "steps",
        id: "journey",
        title: "Our Journey",
        items: [
          { label: "1960s", title: "Healthcare roots", text: "Dr. Chandramma D. Sagar founds Chandra Nursing Home in 1963, the start of the Sagar healthcare division." },
          { label: "2002", title: "250 bed hospital", text: "Sagar Hospitals opens as one of the first corporate multi tertiary care hospitals in Bengaluru." },
          { label: "2009", title: "415 bed hospital", text: "A second, 415 bedded multi tertiary care hospital follows." },
          { label: "2019", title: "CDSIMER hospital opens", text: "The first 300 beds of the campus hospital open to patients at Harohalli." },
          { label: "Today", title: "A 900+ bed teaching hospital", text: "An NABH accredited hospital supports CDSIMER, with a 1350 bed facility planned." },
        ],
      },
      {
        t: "cards",
        title: "Why CDSIMER?",
        tone: "cream",
        cols: 4,
        items: [
          { title: "Clinical exposure from day one", text: "Early patient contact across departments." },
          { title: "Experienced faculty", text: "Mentors from clinical and academic backgrounds." },
          { title: "Research culture", text: "A Central Research and Innovation Wing and an Institutional Ethics Committee." },
          { title: "Smart campus", text: "140 acres of integrated learning and living space." },
        ],
      },
      {
        t: "cards",
        title: "Accreditations & Recognitions",
        lead: "CDSIMER holds an A+ NAAC accreditation and is supported by an NABH and NABL accredited hospital.",
        cols: 4,
        items: [
          { title: "NAAC A+", text: "University accreditation." },
          { title: "NABH", text: "Accredited hospital." },
          { title: "NABL", text: "Accredited laboratory." },
          { title: "NMC", text: "Recognised medical college.", href: "/university/nmc" },
        ],
      },
      {
        t: "stats",
        title: "Key Highlights",
        tone: "cream",
        items: [
          { value: "150", label: "MBBS seats per year" },
          { value: "900+", label: "Teaching hospital beds" },
          { value: "140", label: "Acre smart campus" },
          { value: "A+", label: "NAAC accreditation" },
        ],
      },
      {
        t: "text",
        id: "leadership",
        eyebrow: "Leadership",
        title: "Dr. D. Hemachandra Sagar, Chancellor – DSU",
        body: [
          "Join me in taking the first steps as we start our journey with Dr. Chandramma Dayananda Sagar Institute of Medical Education and Research under Dayananda Sagar University, backed by the legacy of Dayananda Sagar Institutions.",
          "CDSIMER is committed to creating young professionals who are industry ready and sensitive to changing societal needs and technological advances. The CDSIMER ecosystem offers an environment of learning, innovation and research where young minds can come together and explore their chosen domains.",
          "Welcome to our medical college, and I wish all of you a great future.",
        ],
        image: "lead-hemachandra.jpg",
        fit: "portrait",
        alt: "Dr. D. Hemachandra Sagar, Chancellor",
      },
      {
        t: "text",
        title: "Dr. D. Premachandra Sagar, Pro Chancellor – DSU",
        body: [
          "Success is not an accident. It comes with hard work, perseverance, learning and sacrifice. Even the most focused individuals need an ideal environment to flourish: institutional leadership, an academic ambience, a responsive culture and easy access to knowledge and infrastructure.",
          "It is a great pleasure to lead this dream medical school with exceptionally talented faculty who are noted national experts in patient care, education of the next generation of physicians and research. We are focusing on diversity, faculty development and rapid growth of research programmes, and working to place ourselves among the top 20 medical schools in the country.",
        ],
        image: "lead-premachandra.jpg",
        fit: "portrait",
        alt: "Dr. D. Premachandra Sagar, Pro Chancellor",
        flip: true,
        tone: "cream",
      },
      {
        t: "profiles",
        id: "administration",
        title: "Administration",
        lead: "The management of CDSIMER.",
        items: [
          { name: "Dr. D. Hemachandra Sagar", role: "Chancellor", image: "lead-hemachandra.jpg" },
          { name: "Dr. D. Premachandra Sagar", role: "Pro Chancellor", image: "lead-premachandra.jpg" },
          { name: "Dr. Puttamadappa C", role: "Registrar", image: "admin-puttamadappa.jpg" },
          { name: "Dr. A C Ashok", role: "Principal and Dean", image: "admin-ashok.jpg" },
          { name: "Dr. Prashanth Kumar M", role: "Principal and Dean", image: "admin-prashanth.jpg" },
        ],
      },
      { t: "cta", title: "Be part of CDSIMER", text: "Explore our programmes or take the first step towards admission.", actions: [{ label: "Explore Programs", href: "/programs" }, { label: "Apply Now", href: "/admissions" }, { label: "Contact Us", href: "/contact", variant: "soft" }] },
    ],
  },
  {
    slug: "university/policies",
    title: "Policies",
    eyebrow: "University",
    lead: "Institutional policies and statutory committees that protect and support students, staff and patients.",
    hero: "about.jpg",
    heroAlt: "CDSIMER campus",
    blocks: [
      {
        t: "cards",
        title: "Policies & committees",
        cols: 3,
        items: [
          { title: "PwBD Committee", text: "Support and accessibility for persons with benchmark disabilities.", href: "/university/policies/pwbd-committee" },
          { title: "Anti-Ragging Policy", text: "Definition, punishable offences and the institution’s stance on ragging.", href: "/university/policies/anti-ragging" },
          { title: "Anti-Ragging Committee", text: "Helpline, undertaking and action against ragging.", href: "/university/anti-ragging-committee" },
          { title: "Prevention of Sexual Harassment", text: "A safe workplace under the 2013 Act.", href: "/university/policies/prevention-of-sexual-harassment" },
          { title: "Grievance Redressal Committee", text: "How grievances of students, parents and staff are handled.", href: "/university/policies/grievance-redressal" },
        ],
      },
    ],
  },
  policyPage("pwbd-committee", "PwBD Committee", "Persons with Benchmark Disabilities (PwBD) committee of CDSIMER.", [
    {
      t: "table",
      title: "Committee members",
      cols: ["Sl. No", "Name / Designation", "Position", "Phone", "Email"],
      rows: [
        ["1", "Dr. Kumar M N, Professor, Dept. of Orthopaedics", "Chairperson", "9342633667", "docmnkumar@gmail.com"],
        ["2", "Dr. Vinay Kumar V, Professor & HOD, Dept. of Anatomy", "Member", "7795767676", "drshettyvinay@gmail.com"],
        ["3", "Dr. Sunil L K, Associate Professor, Dept. of Orthopaedics", "Member", "9845473625", "sunilmurthylk@gmail.com"],
        ["4", "Dr. Sudeep N S, Associate Professor, Dept. of Ophthalmology", "Member", "7975077601", "megalsudeep@gmail.com"],
        ["5", "Dr. Pooja S, Associate Professor, Dept. of ENT", "Member", "9739011767", "drpooja.somnath@gmail.com"],
      ],
    },
  ]),
  policyPage("anti-ragging", "Anti-Ragging Policy", "Zero tolerance for ragging, in line with the Karnataka Education Act and NMC regulations.", [
    {
      t: "text",
      title: "What is ragging?",
      body: [
        "“Ragging means causing, inducing, compelling or forcing a student, whether by way of practical joke or otherwise, to do any act which detracts from human dignity or violates his person or exposes him to ridicule or to forbear from doing any lawful act, by intimidating, wrongfully restraining, wrongfully confining, or injuring him or by using criminal force to him or by holding out to him any threat of such intimidation, wrongful restraint, wrongful confinement, injury or the use of criminal force.” (Karnataka Education Act, 1983, Section 2(29))",
        "Ragging includes any conduct, by words spoken or written or by an act, that harasses, teases or treats with rudeness a fresher or junior student; rowdy or undisciplined activities likely to cause annoyance, hardship or psychological harm; or asking a student to do an act that causes shame or embarrassment and adversely affects their physique or psyche.",
        "It also covers any act by a senior that disrupts another student’s regular academic activity; exploiting a fresher to complete academic tasks; financial extortion or forced expenditure; physical or sexual abuse; abuse by spoken words, emails, posts or public insults; and any act that affects a student’s mental health and self-confidence.",
        "Ragging is a cognizable offence punishable under the Karnataka Education Act and various sections of the Indian Penal Code.",
      ],
    },
    {
      t: "text",
      title: "Punishable ingredients of ragging",
      body: ["The following are punishable:"],
      bullets: [
        "Abetment to ragging and criminal conspiracy to rag",
        "Unlawful assembly and rioting while ragging",
        "Public nuisance created during ragging",
        "Violation of decency and morals through ragging",
        "Injury to body, causing hurt or grievous hurt",
        "Wrongful restraint and wrongful confinement",
        "Use of criminal force, assault and sexual offences, including unnatural offences",
        "Extortion, criminal trespass and offences against property",
        "Criminal intimidation",
        "Attempts to commit any of the above offences against the victim(s)",
        "Physical or psychological humiliation",
        "All other offences following from the definition of ragging",
      ],
      tone: "cream",
    },
    {
      t: "text",
      title: "Hostel undertaking",
      body: ["A student seeking admission to a hostel forming part of the medical college, institution or university, or seeking to reside in any temporary premises not forming part of the institution (including a private commercially managed lodge or hostel), must submit an additional undertaking in the form of Annexure I (both parts) along with the application for hostel accommodation."],
      actions: [{ label: "Anti-Ragging Committee", href: "/university/anti-ragging-committee", variant: "soft" }],
    },
  ]),
  policyPage("prevention-of-sexual-harassment", "Prevention of Sexual Harassment", "A safe, respectful campus and workplace for everyone.", [
    {
      t: "text",
      title: "Anti-Sexual Harassment Policy",
      body: [
        "As enshrined in the Preamble to the Constitution of India, “equality of status and opportunity” must be secured for all citizens, and equality of every person under the law is guaranteed by Article 14. A safe workplace is a woman’s legal right. The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 protects against sexual harassment at the workplace and provides for the prevention and redressal of complaints.",
        "The protection against sexual harassment and the right to work with dignity are universally recognised human rights under international conventions such as the Convention on the Elimination of all Forms of Discrimination against Women, ratified by the Government of India on 25 June 1993.",
        "This is extremely relevant in a university that imparts higher education, where students, faculty, support and administrative staff are the stakeholders. Gender equity and sensitivity, including protection from sexual harassment, are encouraged in our university. Dayananda Sagar University strives to promote harmony and dignity among its girl students and women employees, to ensure their right to safety and to prevent abuse from sexual harassment.",
      ],
    },
  ]),
  policyPage("grievance-redressal", "Grievance Redressal Committee", "A fair and timely process to resolve grievances of students, parents and staff.", [
    {
      t: "text",
      title: "About the committee",
      body: [
        "CDSIMER is committed to providing a safe, fair and harmonious learning and work environment. The Grievance Redressal Cell is set up in accordance with the University Grants Commission regulations 2012 and Article XXV of the constitution, to handle day-to-day grievances of students, parents and staff members.",
        "The committee facilitates the resolution of grievances in a fair and impartial manner, involving the medical school, departments and offices dealing with the matter, and maintains the necessary confidentiality. Any stakeholder with a genuine grievance may approach the committee with their issue.",
      ],
    },
  ]),
  {
    slug: "university/anti-ragging-committee",
    title: "Anti-Ragging Committee",
    eyebrow: "University",
    lead: "There is no ragging at CDSIMER. The administration has taken several steps to curb ragging and indiscipline.",
    hero: "about.jpg",
    heroAlt: "CDSIMER campus",
    blocks: [
      {
        t: "text",
        title: "Committee and regulations",
        body: [
          "Ragging is a social evil that can have a psychological and physical effect on a student. In line with Section 26(1)(g) of the UGC Act, 1956 and the Medical Council of India (Prevention and Prohibition of Ragging in Medical Colleges/Institutions) Regulations, 2009, all regulations are followed strictly to root out ragging in all its forms.",
          "The college constitutes an Anti-Ragging Committee headed by the Principal & Dean as chairperson. All students and parents also sign an undertaking every year before the commencement of the academic year, as instructed by the National Medical Commission (NMC).",
        ],
        actions: [{ label: "Fill the online anti-ragging affidavit", href: "https://antiragging.in/affidavit_university_form.php", variant: "soft" }],
      },
      {
        t: "cta",
        title: "Report ragging: 1800-425-9911",
        text: "Toll-free number to report ragging. Email studentaffairs.cdsimer@dsu.edu.in.",
        actions: [{ label: "Call 1800 425 9911", href: "tel:18004259911" }, { label: "Email", href: "mailto:studentaffairs.cdsimer@dsu.edu.in", variant: "soft" }],
      },
      {
        t: "text",
        title: "What constitutes ragging",
        body: ["The following acts constitute ragging:"],
        bullets: [
          "Any conduct by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student",
          "Rowdy or undisciplined activities likely to cause annoyance, hardship, physical or psychological harm or fear in any fresher or other student",
          "Asking any student to do an act which causes a sense of shame, torment or embarrassment so as to adversely affect their physique or psyche",
          "Any act by a senior that prevents, disrupts or disturbs the regular academic activity of another student",
          "Exploiting the services of a fresher or other student to complete academic tasks assigned to an individual or group",
          "Financial extortion or forceful expenditure burden put on a fresher or other student",
          "Physical abuse, including sexual abuse, stripping, forcing obscene acts, or causing bodily harm or danger to health",
          "Abuse by spoken words, emails, posts or public insults, including deriving sadistic pleasure from the discomfiture of a student",
          "Any act that affects the mental health and self-confidence of a student",
        ],
        tone: "cream",
      },
      {
        t: "text",
        title: "Action against those who rag",
        body: ["For every single incident of ragging, a First Information Report (FIR) is filed without exception with the local police authorities. Depending on the nature and gravity of the offence, any one or a combination of the following may apply:"],
        bullets: [
          "Cancellation of admission",
          "Suspension from attending classes",
          "Debarring from appearing in any test, examination or other evaluation process",
          "Suspension or expulsion from the hostel",
          "Rustication from the institution",
          "Expulsion from the institution and consequent debarring from admission to any other institution",
          "Collective punishment, when those committing or abetting the crime are not identified",
        ],
      },
      {
        t: "docs",
        title: "Documents",
        tone: "cream",
        items: [
          { title: "Step-by-step guide to the online Anti-Ragging Undertaking", type: "PDF", href: doc.antiRaggingUndertaking },
          { title: "Details of members of the Anti-Ragging Committee", type: "PDF", href: doc.msrAntiRagging },
        ],
      },
      policyNav,
    ],
  },
  {
    slug: "university/nmc",
    title: "NMC",
    eyebrow: "University",
    lead: "National Medical Commission approvals, stipend details, conduct documents and mandatory information.",
    hero: "about.jpg",
    heroAlt: "CDSIMER campus",
    blocks: [
      {
        t: "docs",
        title: "NMC UG Approval",
        items: [
          { title: "Letter of Permission", type: "PDF", href: doc.nmcLop },
          { title: "First Renewal", type: "PDF", href: doc.nmcRenewal1 },
          { title: "Second Renewal", type: "PDF", href: doc.nmcRenewal2 },
          { title: "Third Renewal", type: "PDF", href: doc.nmcRenewal3 },
          { title: "Fourth Renewal", type: "PDF", href: doc.nmcRenewal4 },
          { title: "LOP 200 Admissions", type: "PDF", href: doc.nmcLop200 },
        ],
      },
      {
        t: "docs",
        title: "NMC PG Approval",
        tone: "cream",
        items: [
          { title: "Letter of permission for Pathology", type: "PDF", href: doc.nmcPgPathology },
          { title: "Letter of permission for Community Medicine", type: "PDF", href: doc.nmcPgCommunity },
          { title: "Letter of permission for Clinical Subjects", type: "PDF", href: doc.nmcPgClinical },
        ],
      },
      {
        t: "docs",
        title: "Stipend for UG & PG Students",
        items: [
          { title: "Stipend for UG students undergoing internship", type: "PDF", href: doc.nmcStipendUg },
          { title: "Stipend for PG students", type: "PDF", href: doc.nmcStipendPg },
        ],
      },
      {
        t: "docs",
        title: "Institute Pro-Forma",
        tone: "cream",
        items: [
          { title: "Institute Pro-Forma", type: "LINK", href: "https://drive.google.com/file/d/1cqjDmVQrAO0bPx7YwwQXBscPHo4ZmccM/view?usp=sharing" },
          { title: "Faculty List 2026", type: "PDF", href: doc.facultyList },
        ],
      },
      {
        t: "docs",
        title: "Vision, mission & code of conduct",
        items: [
          { title: "Vision and Mission", type: "PDF", href: doc.visionMission },
          { title: "Code of Conduct", type: "PDF", href: doc.codeOfConduct },
        ],
      },
      { t: "links", title: "Related", items: [{ label: "Anti-Ragging Committee", href: "/university/anti-ragging-committee" }, { label: "Information under MSR Clause", href: "/msr-clause" }] },
    ],
  },
  {
    slug: "university/awards",
    title: "Awards",
    eyebrow: "University",
    lead: "Awards and recognitions earned by CDSIMER faculty and residents.",
    hero: "life-hall.jpg",
    heroAlt: "Convocation hall",
    blocks: [
      {
        t: "table",
        title: "Awards & recognitions",
        cols: ["Recipient", "Award", "Event / awarding body", "Date"],
        rows: [
          ["Dr. Praveen G., Assistant Professor, General Surgery", "2nd place, best poster award: “Chronic abdominal pain: unveiling median arcuate ligament syndrome (MALS)”", "84th annual conference of the Association of Surgeons of India (ASICON 2024), Agra, Uttar Pradesh", "11–14 Dec 2024"],
          ["Dr. Asha Benakappa, Professor & Head, Paediatrics", "Vaidhyarathna Award for International Women’s Day", "Vanivilas Hospital, Bangalore Medical College, Bangalore", "11 Mar 2024"],
          ["Dr. Shiva Murthy N., Professor, Pharmacology", "Best paper award: “A cross sectional observation study on adverse drug reactions reported at a tertiary care centre”", "Karnataka Society of Medical Pharmacologists (KSMP) state level conference, Siddaganga Medical College and Research Institute, Tumakuru", "8 Dec 2023"],
          ["Dr. Asha Benakappa, Professor & Head, Paediatrics", "Kannada “Sourabha Prashasti” award", "RV Sushrutha University College, Bangalore", "22 Nov 2023"],
          ["Dr. Vidusha Vijay, Assistant Professor, Forensic Medicine", "1st prize in paper presentation", "18th annual conference of the South India Medico-legal Association (FORENSICON 2022), KMC Manipal", "7–9 Oct 2022"],
          ["Dr. Yogeshwar C., Senior Resident, ENT", "Dr. Harold Nelson prize, second place, Diploma in Allergy and Asthma examination", "Christian Medical College, Vellore", "Dec 2021"],
          ["Dr. Shiva Murthy H. N., Associate Professor, Pharmacology", "2nd place, oral presentation", "Hyperpiesia 2021, International Conference on Hypertension, Sree Balaji Medical College and Hospital, Chennai", "27 Nov 2021"],
        ],
      },
      {
        t: "docs",
        title: "Awards & achievements: full lists",
        tone: "cream",
        items: [
          { title: "Awards & achievements of the faculty", type: "PDF", href: doc.awardsFaculty },
          { title: "Awards & achievements of the students", type: "PDF", href: doc.awardsStudent },
        ],
      },
      { t: "cta", title: "Celebrate with us", text: "See more from campus life.", actions: [{ label: "View Gallery", href: "/gallery" }] },
    ],
  },
];
