export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
  /** Render the children as a full-width mega menu of groups (Departments). */
  mega?: boolean;
  /** Inside a mega menu: lay this group out in two columns. */
  twoCol?: boolean;
};

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

// External systems (spreadsheet section 3.19).
export const external = {
  erp: "https://ums.mydsi.org/",
  aebas: "https://cdsimerhar.nmcindia.ac.in/",
  hostel: "https://myposhtell.com/",
  dsu: "https://www.dsu.edu.in/",
};

// Menu structure recovered from the beta site (https://dsumedical.intersmarthosting.in/).
export const topLeft: NavLink[] = [
  { label: "Information under MSR Clause", href: "/msr-clause" },
];

export const topRight: NavLink[] = [
  { label: "NMC", href: "/university/nmc" },
  { label: "Career", href: "/career" },
  { label: "Examination", href: "/examination" },
  { label: "Contact us", href: "/contact",
    children: [
      { label: "Key Contact us", href: "/contact/key-contacts" },
      { label: "Postal Address", href: "/contact/postal-address" },
      { label: "Maps & Directions", href: "/contact/maps-and-directions" },
    ],
  },
  { label: "Library", href: "/library" },
  { label: "Gallery", href: "/gallery" },
  { label: "AEBAS Dashboard", href: external.aebas },
  { label: "Hostel", href: external.hostel },
];

export const navLeft: NavLink[] = [
  { label: "University", href: "/university",
    children: [
      { label: "About", href: "/university/about",
        children: [
          { label: "Vision & Mission", href: "/university/about#vision" },
          { label: "Founding Legends", href: "/university/about#founders" },
          { label: "Leaderships", href: "/university/about#leadership" },
          { label: "Administration", href: "/university/about#administration" },
        ],
      },
      { label: "About DSU", href: external.dsu },
      { label: "DSU Act", href: "https://cdsimer.edu.in/images/pdf/DSUAct.pdf" },
      { label: "GoK Notification", href: "/docs/government-notification.pdf" },
      { label: "Policies", href: "/university/policies",
        children: [
          { label: "PwBD Committee", href: "/university/policies/pwbd-committee" },
          { label: "Anti-Ragging Policy", href: "/university/policies/anti-ragging" },
          { label: "Prevention of Sexual Harassment", href: "/university/policies/prevention-of-sexual-harassment" },
          { label: "Grievance Redressal Committee", href: "/university/policies/grievance-redressal" },
        ],
      },
      { label: "NMC", href: "/university/nmc" },
      { label: "Vision and Mission", href: "/docs/naac-new_vision__mission.pdf" },
      { label: "Code of Conduct", href: "/docs/code_of_conduct.pdf" },
      { label: "Anti-Ragging Committee", href: "/university/anti-ragging-committee" },
      { label: "Awards", href: "/university/awards" },
    ],
  },
  { label: "Programmes", href: "/programs",
    children: [
      { label: "MBBS", href: "/programs/mbbs" },
      { label: "Post Graduation", href: "/programs/post-graduation" },
      { label: "Ph.D", href: "/programs/ph-d" },
    ],
  },
  { label: "Academics", href: "/academics",
    children: [
      { label: "Academics Year", href: "/academics#academic-year" },
      { label: "AETCOM Module", href: "/docs/aetcom_book_.pdf" },
      { label: "Holiday List", href: "/docs/notification_-_holidays_list_-2025_dt_25112024.pdf" },
      { label: "Student Feedback on Curriculum", href: "/academics#student-feedback-on-curriculum" },
    ],
  },
  { label: "Departments", href: "/department", mega: true,
    children: [
      { label: "Pre-Clinical", href: "/department",
        children: [
          { label: "Anatomy", href: "/department/anatomy" },
          { label: "Biochemistry", href: "/department/biochemistry" },
          { label: "Physiology", href: "/department/physiology" },
        ],
      },
      { label: "Others", href: "/department",
        children: [
          { label: "Medical Education Unit", href: "/department/medical-education-unit" },
          { label: "Library", href: "/library" },
          { label: "Skill Lab", href: "/department/skill-lab" },
        ],
      },
      { label: "Para-Clinical", href: "/department",
        children: [
          { label: "Pathology", href: "/department/pathology" },
          { label: "Pharmacology", href: "/department/pharmacology" },
          { label: "Microbiology", href: "/department/microbiology" },
          { label: "Community Medicine", href: "/department/community-medicine" },
          { label: "Forensic Medicine", href: "/department/forensic-medicine-and-toxicology" },
        ],
      },
      { label: "Clinical", href: "/department", twoCol: true,
        children: [
          { label: "Anaesthesiology", href: "/department/anaesthesiology" },
          { label: "Critical Care", href: "/department/critical-care" },
          { label: "Dermatology", href: "/department/dermatology" },
          { label: "Dentistry", href: "/department/dentistry" },
          { label: "Emergency Medicine", href: "/department/emergency-medicine" },
          { label: "ENT", href: "/department/otorhinolaryngology-ent" },
          { label: "General Medicine", href: "/department/general-medicine" },
          { label: "General Surgery", href: "/department/general-surgery" },
          { label: "Obstetrics and Gynecology", href: "/department/obstetrics-and-gynaecology" },
          { label: "Ophthalmology", href: "/department/ophthalmology" },
          { label: "Orthopaedics", href: "/department/orthopaedics" },
          { label: "Pediatrics", href: "/department/paediatrics" },
          { label: "Psychiatry", href: "/department/psychiatry" },
          { label: "Radiology", href: "/department/radiodiagnosis" },
          { label: "Respiratory Medicine", href: "/department/respiratory-medicine" },
          { label: "Transfusion Medicine", href: "/department/transfusion-medicine" },
        ],
      },
      { label: "Super Speciality", href: "/department", twoCol: true,
        children: [
          { label: "Neurology", href: "/department/neurology" },
          { label: "Paediatric Surgery", href: "/department/paediatric-surgery" },
          { label: "Nephrology", href: "/department/nephrology" },
          { label: "Urology", href: "/department/urology" },
          { label: "Plastic Surgery", href: "/department/plastic-surgery" },
          { label: "Oncology", href: "/department/oncology" },
          { label: "Surgical Oncology", href: "/department/surgical-oncology" },
          { label: "Cardiology", href: "/department/cardiology" },
          { label: "Cardiothoracic and Vascular Surgery", href: "/department/cardiothoracic-and-vascular-surgery" },
          { label: "Neurosurgery", href: "/department/neurosurgery" },
          { label: "Surgical Gastroenterology", href: "/department/surgical-gastroenterology" },
          { label: "Endocrinology", href: "/department/endocrinology" },
          { label: "Cardiac Anaesthesiology", href: "/department/cardiac-anaesthesiology" },
        ],
      },
    ],
  },
];

export const navRight: NavLink[] = [
  { label: "Hospital", href: "/hospital",
    children: [
      { label: "About Hospital", href: "/hospital" },
      { label: "Vision & Mission", href: "/hospital#vision" },
      { label: "Statutory Requirements", href: "/hospital#statutory" },
    ],
  },
  { label: "Research", href: "/research",
    children: [
      { label: "Staff Publications", href: "/research/staff-publications" },
      { label: "Published Articles", href: "/research/published-articles" },
      { label: "Ongoing Research Activities", href: "/research/ongoing-research-activities" },
      { label: "Student Research Activities", href: "/research/student-research-activities" },
      { label: "Ethics Committee", href: "/research/ethics-committee" },
      { label: "Central Research and Innovation Wing", href: "/research/central-research-and-innovation-wing" },
    ],
  },
];

/** Dropdown under the Admissions button. */
export const admissionsMenu: NavLink[] = [
  { label: "Stipend details for UG and PG students", href: "/admissions",
    children: [
      { label: "Stipend details for UG students", href: "/docs/stipend_for_ug_mbbs_03112025.pdf" },
      { label: "Stipend details for PG students", href: "/docs/stipend_for_pg_mbbs_03112025.pdf" },
    ],
  },
  { label: "Fees for UG and PG courses", href: "/admissions",
    children: [
      { label: "Fees for UG courses (MBBS 2025-26 batch)", href: "/docs/mbbs_2025-26_batch_fee_structure.pdf" },
      { label: "Fees for PG courses (2024)", href: "/docs/fee_structure_for_pg_admissions_2024.pdf" },
    ],
  },
  { label: "MBBS UG Admission Process", href: "/docs/admission_process_03102026.pdf" },
  { label: "Hostel Details for New Admission 2026-27", href: "https://cdsimer.edu.in/images/Hostel_Details_2026_27_24082026.pdf" },
  { label: "PG Admission Process", href: "/docs/pg_admission_process_document_18122025.pdf" },
  { label: "Admission Enquiry", href: "/admissions#enquiry" },
  { label: "Admission Criteria", href: "/admissions#criteria" },
  { label: "UG Student List", href: "/admissions",
    children: [
      { label: "Student List 2025-26", href: "https://cdsimer.edu.in/images/Admission/Student_list__2_025-26.pdf" },
      { label: "Student List 2024-25", href: "https://cdsimer.edu.in/images/Admission/List_of_Students_for_the_2024-2025.pdf" },
      { label: "Student List 2023-24", href: "/docs/list_of_mbbs_students_for_the_a_y_2023-24.pdf" },
      { label: "Student List 2022-23", href: "https://cdsimer.edu.in/images/Admission/Student_List_of_2022-23_Batch_for_Website.pdf" },
      { label: "Student List 2021-22", href: "https://cdsimer.edu.in/images/2022/pdf/List_of_Student_Details_of_2021-22_year.pdf" },
      { label: "Student List 2020-21", href: "https://cdsimer.edu.in/images/student_list/StudentsList2020Website.pdf" },
    ],
  },
  { label: "PG Student List", href: "/admissions",
    children: [
      { label: "Student List 2025-26", href: "/docs/5_a_pg_2025_1.pdf" },
      { label: "Student List 2024-25", href: "/docs/pg_student_list_2024-25.pdf" },
      { label: "Brochure", href: "/docs/admission-brochure.pdf" },
    ],
  },
];
