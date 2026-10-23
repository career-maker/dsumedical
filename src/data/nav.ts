import { doc } from "./pages/docs";

export type NavLink = { label: string; href: string; children?: NavLink[]; /** Dropdown renders as a wide multi-column panel. */ mega?: boolean };

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

// External systems (spreadsheet section 3.19).
export const external = {
  erp: "https://ums.mydsi.org/",
  aebas: "https://cdsimerhar.nmcindia.ac.in/",
  hostel: "https://myposhtell.com/",
  dsu: "https://www.dsu.edu.in/",
};

const L = (label: string, href: string, children?: NavLink[]): NavLink => ({ label, href, children });

// Menu structure and order follow the "CDSIMER Pages & Sections" sheet.
const university = L("University", "/university", [
  L("About", "/university/about", [
    L("Vision & Mission", "/university/about#vision"),
    L("Founding Legends", "/university/about#founders"),
    L("Leaderships", "/university/about#leadership"),
    L("Administration", "/university/about#administration"),
  ]),
  L("About DSU", external.dsu),
  L("DSU Act", doc.dsuAct),
  L("GoK Notification", doc.gokNotification),
  L("Policies", "/university/policies", [
    L("PwBD Committee", "/university/policies/pwbd-committee"),
    L("Anti-Ragging Policy", "/university/policies/anti-ragging"),
    L("Prevention of Sexual Harassment", "/university/policies/prevention-of-sexual-harassment"),
    L("Grievance Redressal Committee", "/university/policies/grievance-redressal"),
  ]),
  L("NMC", "/university/nmc"),
  L("Vision and Mission", doc.visionMission),
  L("Code of Conduct", doc.codeOfConduct),
  L("Anti-Ragging Committee", "/university/anti-ragging-committee"),
  L("Awards", "/university/awards"),
]);

const programmes = L("Programmes", "/programs", [
  L("MBBS", "/programs/mbbs"),
  L("Post Graduation", "/programs/post-graduation"),
  L("Ph.D", "/programs/ph-d"),
]);

const academics = L("Academics", "/academics", [
  L("Academics", "/academics", [
    L("Academics Year", "/academics#academic-year"),
    L("AETCOM Module", doc.aetcom),
    L("Holiday List", doc.holidays),
    L("Student Feedback on Curriculum", "/academics#student-feedback-on-curriculum"),
  ]),
]);

// Grouped and ordered as on the existing cdsimer.edu.in menu. Departments without a page here link to the listing.
const dept = (label: string, slug?: string) => L(label, slug ? `/department/${slug}` : "/department");
const departments: NavLink = { mega: true, ...L("Departments", "/department", [
  L("Pre-Clinical", "/department", [dept("Anatomy", "anatomy"), dept("Biochemistry", "biochemistry"), dept("Physiology", "physiology")]),
  L("Others", "/department", [dept("Medical Education Unit"), L("Library", "/library"), dept("Skill Lab")]),
  L("Para-Clinical", "/department", [
    dept("Pathology", "pathology"), dept("Pharmacology", "pharmacology"), dept("Microbiology", "microbiology"),
    dept("Community Medicine", "community-medicine"), dept("Forensic Medicine", "forensic-medicine-and-toxicology"),
  ]),
  L("Clinical", "/department", [
    dept("Anaesthesiology", "anaesthesiology"), dept("Critical Care"), dept("Dermatology"), dept("Dentistry"), dept("Emergency Medicine"),
    dept("ENT", "otorhinolaryngology-ent"), dept("General Medicine", "general-medicine"), dept("General Surgery", "general-surgery"),
    dept("Obstetrics and Gynecology", "obstetrics-and-gynaecology"), dept("Ophthalmology", "ophthalmology"), dept("Orthopaedics", "orthopaedics"),
    dept("Pediatrics", "paediatrics"), dept("Psychiatry"), dept("Radiology", "radiodiagnosis"), dept("Respiratory Medicine"), dept("Transfusion Medicine"),
  ]),
  L("Super Speciality", "/department", [
    dept("Neurology", "neurology"), dept("Paediatric Surgery"), dept("Nephrology", "nephrology"), dept("Urology"), dept("Plastic Surgery"),
    dept("Oncology"), dept("Surgical Oncology"), dept("Cardiology", "cardiology"), dept("Cardiothoracic and Vascular Surgery"),
    dept("Neurosurgery"), dept("Surgical Gastroenterology"), dept("Endocrinology"), dept("Cardiac Anesthesiology"),
  ]),
]) };

const hospital = L("Hospital", "/hospital", [
  L("About Hospital", "/hospital"),
  L("Vision & Mission", "/hospital#vision"),
  L("Statutory Requirements", "/hospital#statutory"),
]);

const research = L("Research", "/research", [
  L("Staff Publications", "/research/staff-publications"),
  L("Published Articles", "/research/published-articles"),
  L("Ongoing Research Activities", "/research/ongoing-research-activities"),
  L("Student Research Activities", "/research/student-research-activities"),
  L("Ethics Committee", "/research/ethics-committee"),
  L("Central Research and Innovation Wing", "/research/central-research-and-innovation-wing"),
]);

const admissions = L("Admissions", "/admissions", [
  L("Stipend details for UG and PG students", "/admissions#resources"),
  L("Fees for UG and PG courses", "/admissions#resources"),
  L("MBBS UG Admission Process", doc.ugAdmission),
  L("Hostel Details for New Admission 2026-27", doc.hostel),
  L("PG Admission Process", doc.pgAdmission),
  L("Admission Enquiry", "/admissions#enquiry"),
  L("Admission Criteria", "/admissions#criteria"),
  L("UG Student List", "/admissions#ug-student-lists", [
    L("Student List 2025-26", doc.ug2526),
    L("Student List 2024-25", doc.ug2425),
    L("Student List 2023-24", doc.ug2324),
    L("Student List 2022-23", doc.ug2223),
    L("Student List 2021-22", doc.ug2122),
  ]),
  L("PG Student List", "/admissions#pg-student-lists", [
    L("Student List 2025-26", doc.pg2526),
    L("Student List 2024-25", doc.pg2425),
    L("Brochure", doc.brochure),
  ]),
]);

const career = L("Career", "/career");
const examination = L("Examination", "/examination");
const contact = L("Contact us", "/contact", [
  L("Key Contact us", "/contact/key-contacts"),
  L("Postal Address", "/contact/postal-address"),
  L("Maps & Directions", "/contact/maps-and-directions"),
]);
const library = L("Library", "/library");
const gallery = L("Gallery", "/gallery");
const msr = L("Information under MSR Clause", "/msr-clause");
const erp = L("ERP Login", external.erp);
const aebas = L("AEBAS Dashboard", external.aebas);
const hostel = L("Hostel", external.hostel);

/** Mobile menu: every main menu in sheet order. */
export const mobileMenu: NavLink[] = [
  L("Home", "/"), university, programmes, academics, departments, hospital, research, admissions,
  career, examination, contact, library, gallery, msr, erp, aebas, hostel,
];

// Desktop bar: main row splits around the logo; the rest sit in the top strip, same relative order.
export const navLeft: NavLink[] = [university, programmes, academics, departments];
export const navRight: NavLink[] = [hospital, research];
export const navAdmissions = admissions;
export const topLeft: NavLink[] = [msr];
export const topRight: NavLink[] = [career, examination, contact, library, gallery, aebas, hostel];
export const topErp = erp;
