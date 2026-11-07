import type { Block, PageDef } from "./types";
import { ongoingRows, publications, studentRows } from "./research-data";

// One template for every research page: the same hero, then a single content section.
const researchPage = (slug: string, title: string, lead: string, blocks: Block[]): PageDef => ({
  slug: `research/${slug}`,
  title,
  eyebrow: "Research",
  lead,
  hero: "banner-research.jpg",
  heroAlt: "Researcher handling a sample in a laboratory",
  blocks,
});

const pubCols = ["Department", "Faculty", "Title", "Journal", "Issue · Volume · Pages", "Type"];

export const research: PageDef[] = [
  {
    slug: "research",
    title: "Research",
    eyebrow: "Research",
    lead: "Publications, ongoing projects, student research and institutional research governance.",
    hero: "banner-research.jpg",
    heroAlt: "Researcher handling a sample in a laboratory",
    blocks: [
      { t: "stats", title: "Research at a glance", items: [{ value: String(publications.length), label: "Faculty publications listed" }, { value: String(ongoingRows.length), label: "Research projects in progress" }, { value: String(studentRows.length), label: "Projects involving students" }] },
      {
        t: "cards",
        title: "Explore research at CDSIMER",
        tone: "cream",
        cols: 3,
        more: "Open",
        items: [
          { title: "Staff Publications", text: "Research publications by CDSIMER faculty after joining the institution.", href: "/research/staff-publications", image: "research-publications.jpg" },
          { title: "Published Articles", text: "Articles published by faculty, by department.", href: "/research/published-articles", image: "research-conferences.jpg" },
          { title: "Ongoing Research Activities", text: "Research projects in progress.", href: "/research/ongoing-research-activities", image: "research-projects.jpg" },
          { title: "Student Research Activities", text: "Research projects involving students.", href: "/research/student-research-activities", image: "research-clinical.jpg" },
          { title: "Ethics Committee", text: "The Institutional Ethics Committee and its members.", href: "/research/ethics-committee", image: "research-grants.jpg" },
          { title: "Central Research and Innovation Wing", text: "Vision, values and mission of the wing.", href: "/research/central-research-and-innovation-wing", image: "research-labs.jpg" },
        ],
      },
      { t: "cta", title: "Collaborate with us", text: "Interested in a research partnership?", actions: [{ label: "Contact Us", href: "/contact" }, { label: "Ph.D Programme", href: "/programs/ph-d", variant: "soft" }] },
    ],
  },
  researchPage("staff-publications", "Staff Publications", "Research publications and ongoing research activities by CDSIMER faculty, after joining the institution.", [
    { t: "table", title: "Research publications after joining CDSIMER", cols: pubCols, rows: publications },
  ]),
  researchPage("published-articles", "Published Articles", "Research publications and ongoing research activities by CDSIMER faculty, after joining the institution.", [
    { t: "table", title: "Published articles", cols: pubCols, rows: publications },
  ]),
  researchPage("ongoing-research-activities", "Ongoing Research Activities", "Research projects in progress at CDSIMER.", [
    { t: "table", title: "Research projects in progress", cols: ["Sl. No", "Principal investigator", "Department", "Title"], rows: ongoingRows },
  ]),
  researchPage("student-research-activities", "Student Research Activities", "Research projects involving students at CDSIMER.", [
    { t: "table", title: "Research projects involving students", cols: ["Sl. No", "Title", "Student", "Faculty"], rows: studentRows },
  ]),
  researchPage("ethics-committee", "Ethics Committee", "An Institutional Ethics Committee has been constituted at CDSIMER and includes the following members.", [
    {
      t: "table",
      title: "Institutional Ethics Committee",
      cols: ["Role", "Member"],
        rows: [
          ["Chairperson", "Shri. M N Vidyashankar, Former Additional Chief Secretary (Retd.), Govt of Karnataka"],
          ["Member Secretary", "Dr. Anand Meundi, Professor, Department of Community Medicine, CDSIMER"],
          ["Basic Medical Scientist", "Dr. Meena Nandimath, Professor, Dept. of Pharmacology, Rajarajeshwari Medical College & Hospital"],
          ["Legal Expert", "Shri. Arvind Moorchung, Senior Legal Consultant"],
          ["Clinical Member", "Dr. Madhu S, Professor, Dept. of Anaesthesiology, CDSIMER"],
          ["Clinical Member", "Dr. Manju Prakash, Professor & HOD, Dept. of Forensic Medicine, CDSIMER"],
          ["Clinical Member", "Dr. Naveen M., Professor, Dept. of General Medicine, CDSIMER"],
          ["Clinical Member", "Dr. Aishwarya M, Associate Professor, Dept. of ENT, CDSIMER"],
          ["Clinical Member", "Dr. Mahesh Eswarappa, Senior Professor, Dept. of Nephrology, M S Ramaiah Medical College & Hospital"],
          ["Social Scientist / Ethicist", "Smt. Ashika Shetty, Consultant Project Coordinator, Kanasina Shale"],
          ["Lay Person", "Smt. Roopa J Rao, Retd. Bank Manager, SBI"],
          ["Appellate Authority", "Dr. Prashanth Kumar M., Principal and Dean, CDSIMER"],
        ],
    },
  ]),
  researchPage("central-research-and-innovation-wing", "Central Research and Innovation Wing", "Research is the catalyst of evidence based medicine.", [
    {
      t: "prose",
      title: "Central Research and Innovation Wing",
      image: "research-wing.jpg",
      alt: "Researcher at work in a laboratory",
      items: [
        { p: "Research is the catalyst of evidence based medicine. The evolution of medicine is itself based on research which has resulted in a paradigm shift of healthcare practices through ages. Futuristic and applied research contributes in making doctors and students better scientists which are the core attributes helping to translate knowledge from bench to bedside. Research and innovation are driven by curiosity, necessity and passion. Keeping these attributes in mind, Central Research and Innovation wing at CDSIMER strives to rekindle and light up the scientific spirit in each of its members, thus advancing knowledge through cutting edge scientific methods. We ensure teaching, research and innovation are all intertwined in delivering better patient care. Central research and innovation wing is a destination for ambitious scholars and aims at becoming a world leader in next generation research." },
        { h: "Vision" },
        { p: "To be the leading research and innovation centre recognised globally providing value driven, application based and quality research data helping CDSIMER to care and contribute for the society in a better way." },
        { h: "Values" },
        { p: "Honesty, Dedication, Accountability, Social responsibility, Ethics, Teamwork, Passion." },
        { h: "Mission" },
        {
          ul: [
            "Provide well equipped, state of the art research facilities to its users",
            "Integrate technology and healthcare to drive innovation and develop new technology applicable to healthcare",
            "Align excellence in research and innovation with CDSIMERs other missions",
            "Ensure continual training of researchers in basic, clinical and applied research",
            "Maintain quality and relevance of research",
          ],
        },
      ],
    },
  ]),
];
