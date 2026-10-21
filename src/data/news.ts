import type { IconName } from "./iconMeta";

export const newsTabs: { id: string; label: string; icon: IconName }[] = [
  { id: "all", label: "All Updates", icon: "n-all" },
  { id: "academics", label: "Academics", icon: "n-acad" },
  { id: "hospital", label: "Hospital", icon: "n-hosp" },
  { id: "research", label: "Research", icon: "n-res" },
  { id: "events", label: "Events", icon: "n-events" },
];

export const news = [
  {
    photo: "news-1",
    alt: "Doctors and students seated in a conference audience",
    date: "30 MAY 2026",
    iso: "2026-05-30",
    title: "International Medical Conference 2026",
    text: "Join leading healthcare professionals, researchers, and students for a day of medical innovation, expert talks, and clinical discussions.",
    tag: "events",
  },
  {
    photo: "news-2",
    alt: "Researcher pipetting samples in a laboratory",
    date: "01 JUNE 2026",
    iso: "2026-06-01",
    title: "Breakthrough Research in Clinical Pharmacology",
    text: "Faculty and research scholars presented innovative findings in drug development, precision medicine, and therapeutic",
    tag: "research",
  },
  {
    photo: "news-3",
    alt: "Doctor with a stethoscope listening at a healthcare summit",
    date: "20 JULY 2026",
    iso: "2026-07-20",
    title: "DSU Students Excel at National Healthcare Summit",
    text: "Students from various medical disciplines showcased research projects, participated in expert panel discussions.",
    tag: "academics",
  },
];

export const studentLife = [
  { photo: "life-campus", alt: "CDSIMER campus buildings under a stormy sky", label: "" },
  { photo: "life-hostel", alt: "Hostel room with a double bed", label: "Hostel" },
  { photo: "life-library", alt: "Students in the library", label: "" },
  { photo: "life-students", alt: "Students chatting on campus steps", label: "" },
  { photo: "life-hall", alt: "Speaker at a seminar in the auditorium", label: "" },
  { photo: "life-group", alt: "Group photo of students and staff", label: "" },
  { photo: "life-sports", alt: "Students playing basketball", label: "" },
] as const;
