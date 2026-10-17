import type { IconName } from "./iconMeta";

export const stats: { icon: IconName; value: string; label: string }[] = [
  { icon: "stat-mbbs", value: "150+", label: "MBBS Seats" },
  { icon: "stat-spec", value: "30+", label: "Super Specialities" },
  { icon: "stat-pub", value: "200+", label: "Research Publications" },
  { icon: "stat-beds", value: "900+", label: "Teaching Hospital Beds" },
  { icon: "stat-fac", value: "70+", label: "Faculties" },
  { icon: "stat-pat", value: "3L+", label: "Patients Treated" },
];

export const journeys = [
  {
    key: "student",
    theme: "light",
    icon: "j-student" as IconName,
    alt: "Smiling medical students seated in a laboratory",
    title: "Future Student",
    text: "Explore MBBS, MD/MS, Super Specialty, and Fellowship programs designed to prepare future healthcare leaders.",
    chips: ["MBBS Program", "Admissions", "Scholarships", "Campus Life"],
    cta: { label: "Explore Academics", href: "/programs" },
  },
  {
    key: "hospital",
    theme: "hot",
    icon: "j-hospital" as IconName,
    alt: "CDSIMER teaching hospital building at dusk",
    title: "Teaching Hospital",
    text: "Gain practical experience in a 900+ bed teaching hospital equipped with advanced diagnostic and specialty care.",
    chips: ["Departments", "Doctors", "Appointments", "Emergency Services"],
    cta: { label: "Visit Hospital", href: "/hospital" },
  },
  {
    key: "research",
    theme: "light",
    icon: "j-research" as IconName,
    alt: "Researchers working with microscopes in a laboratory",
    title: "Research & Innovation",
    text: "Drive innovation through research projects, publications, modern laboratories, and academic collaborations.",
    chips: ["Research Centers", "Publications", "Innovation Programs", "Collaborations"],
    cta: { label: "Explore Research", href: "/research" },
  },
] as const;

export const whyItems: { icon: IconName; lines: [string, string] }[] = [
  { icon: "why-clinical", lines: ["Clinical Exposure", "from Day One"] },
  { icon: "why-footfall", lines: ["1000+", "Daily Patient Footfall"] },
  { icon: "why-faculty", lines: ["Experienced", "Faculty"] },
  { icon: "why-sim", lines: ["Advanced", "Simulation Labs"] },
  { icon: "why-naac", lines: ["NAAC A+", "University"] },
  { icon: "why-nabh", lines: ["NABH & NABL", "Accredited Hospital"] },
  { icon: "why-campus", lines: ["140 Acres Integrated", "Smart Campus"] },
  { icon: "why-nmc", lines: ["NMC Recognized", "Medical College"] },
];

export const hospitalFacilities: { icon: IconName; label: string }[] = [
  { icon: "lw-hospital", label: "900+ Bed Teaching Hospital" },
  { icon: "lw-icu", label: "ICU & Critical Care" },
  { icon: "lw-emergency", label: "Emergency Medicine" },
  { icon: "lw-clinics", label: "Specialty Clinics" },
  { icon: "lw-diag", label: "Diagnostic Services" },
  { icon: "lw-nabh", label: "NABH Accredited" },
];

export const departmentTabs: { id: string; label: string; icon: IconName }[] = [
  { id: "pre", label: "Pre-Clinical", icon: "tab-pre" },
  { id: "para", label: "Para-Clinical", icon: "tab-para" },
  { id: "clinical", label: "Clinical", icon: "tab-clinical" },
  { id: "super", label: "Super Speciality", icon: "tab-super" },
  { id: "others", label: "Others", icon: "tab-others" },
];

export const departments: { tab: string; photo: string; icon: IconName; title: string; text: string; alt: string }[] = [
  {
    tab: "para",
    photo: "dept-pathology",
    icon: "d-path",
    title: "Pathology",
    text: "Explore the science of disease through advanced diagnostics, laboratory research, and hands-on clinical training.",
    alt: "Doctors in a pathology laboratory",
  },
  {
    tab: "para",
    photo: "dept-pharmacology",
    icon: "d-pharm",
    title: "Pharmacology",
    text: "Explore drug mechanisms, therapeutic effects, and rational prescribing through practical learning.",
    alt: "Gloved hands mixing medicines in glassware",
  },
  {
    tab: "para",
    photo: "dept-microbiology",
    icon: "d-micro",
    title: "Microbiology",
    text: "Explore microorganisms and their role in health, disease, diagnosis, and infection control through advanced laboratory training.",
    alt: "Researcher using a microscope",
  },
  {
    tab: "para",
    photo: "dept-community",
    icon: "d-comm",
    title: "Community Medicine",
    text: "Delivering preventive healthcare, rural outreach, and community wellness through compassionate medical services.",
    alt: "Hands sheltering a paper family and heart",
  },
];
