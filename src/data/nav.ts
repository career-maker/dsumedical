export type NavLink = { label: string; href: string; children?: NavLink[] };

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

// External systems (spreadsheet section 3.19).
export const external = {
  erp: "https://ums.mydsi.org/",
  aebas: "https://cdsimerhar.nmcindia.ac.in/",
  hostel: "https://myposhtell.com/",
  dsu: "https://www.dsu.edu.in/",
};

export const topLeft: NavLink[] = [
  { label: "Info under MSR Clause B.1.11", href: "/msr-clause" },
  { label: "NMC", href: "/university/nmc" },
];

export const topRight: NavLink[] = [
  { label: "Hostel", href: external.hostel },
  { label: "University Examination", href: "/examination" },
  { label: "Career", href: "/career" },
  { label: "AEBAS Dashboard", href: external.aebas },
];

export const navLeft: NavLink[] = [
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "MBBS", href: "/programs/mbbs" },
      { label: "Post Graduation", href: "/programs/post-graduation" },
      { label: "Ph.D", href: "/programs/ph-d" },
      { label: "Academics", href: "/academics" },
    ],
  },
  {
    label: "Hospital",
    href: "/hospital",
    children: [
      { label: "About Hospital", href: "/hospital" },
      { label: "Central Laboratory", href: "/hospital/central-laboratory" },
    ],
  },
  { label: "Department", href: "/department" },
  { label: "Research", href: "/research" },
];

export const navRight: NavLink[] = [
  {
    label: "University",
    href: "/university",
    children: [
      { label: "About CDSIMER", href: "/university/about" },
      { label: "Policies", href: "/university/policies" },
      { label: "NMC", href: "/university/nmc" },
      { label: "Awards", href: "/university/awards" },
      { label: "Library", href: "/library" },
      { label: "Gallery", href: "/gallery" },
      { label: "About DSU", href: external.dsu },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "Key Contacts", href: "/contact/key-contacts" },
      { label: "Postal Address", href: "/contact/postal-address" },
      { label: "Maps & Directions", href: "/contact/maps-and-directions" },
    ],
  },
];
