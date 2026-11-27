// Inner pages of events (the Read More button and the page /events/<id>). Key = the event id from events.ts.
// To give another event an inner page, add an entry here: heading, paragraphs, optional bullet items, photos (files under /images) and PDFs.
export type EventDetail = { heading: string; date?: string; paras: string[]; items?: string[]; images?: { src: string; alt: string }[]; pdfs?: { label: string; href: string }[] };

export const eventDetails: Record<string, EventDetail> = {
 "2022-11-09-a-soft-skill-training-program-was": {
  "heading": "Soft Skill Training Programme",
  "paras": [
   "A soft skill training programme was conducted for the teaching and non-teaching staff of CDSIMER on 9th November, 2022 by a professional trainer."
  ],
  "date": "9 Nov 2022",
  "items": [
   "Date: 9 November 2022",
   "Participants: teaching and non-teaching staff",
   "Trainer: a professional trainer"
  ]
 },
 "independence-day": {
  "heading": "Independence day",
  "paras": [
   "Independence day was celebrated on 15th August, 2022 at CDSIMER and the national flag was hoisted by Dr. Madan Gaekwad in the presence of Dr. A. C. Ashok and Brig (Dr.) S. Rajagopalan. Prizes were distributed to the winners of the Intra-university (DSU) sports events."
  ],
  "date": "15 Aug 2022",
  "images": [
   {
    "src": "events/independence-day/WhatsApp_Image_2022-08-16_at_63122_PM.jpeg",
    "alt": "Independence day: photo 1"
   },
   {
    "src": "events/independence-day/WhatsApp_Image_2022-08-16_at_63123_PM.jpeg",
    "alt": "Independence day: photo 2"
   },
   {
    "src": "events/independence-day/WhatsApp_Image_2022-08-16_at_63127_PM.jpeg",
    "alt": "Independence day: photo 3"
   },
   {
    "src": "events/independence-day/WhatsApp_Image_2022-08-16_at_63130_PM.jpeg",
    "alt": "Independence day: photo 4"
   },
   {
    "src": "events/independence-day/WhatsApp_Image_2022-08-16_at_63137_PM.jpeg",
    "alt": "Independence day: photo 5"
   }
  ]
 },
 "bone-and-joint-day": {
  "heading": "Bone and Joint day",
  "paras": [
   "The Department of Orthopedics observed The National Bone & Joint day on 04th August, 2022 at 2pm at F block Hospital Auditorium. Bone Mineral Density (BMD) camp was organised from 09.30AM to 01.00PM in the Orthopaedics OPD. A guest lecture was provided by Dr. Arvind Kasthuri, Professor- Community Health and Chief of Medical Services, St. John's Medical College.",
   "The first edition of a bi-annual Newsletter was released as part of the Bone and Joint day celebration. The main idea behind the newsletter is to report the works done in the Department of Orthopaedics and to provide a platform for the staff to express their academic & non-academic talents."
  ],
  "date": "4 Aug 2022",
  "images": [
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0008.jpg",
    "alt": "Bone and Joint day: photo 1"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0009.jpg",
    "alt": "Bone and Joint day: photo 2"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0010.jpg",
    "alt": "Bone and Joint day: photo 3"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0011.jpg",
    "alt": "Bone and Joint day: photo 4"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0012.jpg",
    "alt": "Bone and Joint day: photo 5"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0013.jpg",
    "alt": "Bone and Joint day: photo 6"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0014.jpg",
    "alt": "Bone and Joint day: photo 7"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0015.jpg",
    "alt": "Bone and Joint day: photo 8"
   },
   {
    "src": "events/bone-and-joint-day/IMG-20220809-WA0016.jpg",
    "alt": "Bone and Joint day: photo 9"
   },
   {
    "src": "events/bone-and-joint-day/1628488594791.jpg",
    "alt": "Bone and Joint day: photo 10"
   },
   {
    "src": "events/bone-and-joint-day/1628488594799.jpg",
    "alt": "Bone and Joint day: photo 11"
   },
   {
    "src": "events/bone-and-joint-day/1628488594811.jpg",
    "alt": "Bone and Joint day: photo 12"
   },
   {
    "src": "events/bone-and-joint-day/1628488594821.jpg",
    "alt": "Bone and Joint day: photo 13"
   }
  ],
  "pdfs": [
   {
    "label": "Read more (PDF)",
    "href": "/docs/events/3rd_Orthopedic_Department_Newsletter-New_2.pdf"
   },
   {
    "label": "Newsletter (PDF)",
    "href": "/docs/events/NL.pdf"
   }
  ]
 },
 "blood-donation-day": {
  "heading": "Blood donation day",
  "paras": [
   "World Blood Donors day was celebrated at Blood Centre CDSIMER on June 14th to thank donors and mark the need of raising awareness towards blood donation with encouragement for the same. Medical Director, Vice Principal along with HODs and representatives of all support departments gathered at blood centre to mark the day with a small function. On this day, 28 voluntary donors came forward to donate blood and were awarded certificates and a token of appreciation by the blood bank officers. Display boards with informative blood donation titbits, Eposters and taglines were arranged at the college lobby. A collage of the previous blood donors comprising doctors, technicians, students and non-teaching faculty was made as a gesture to thank them for giving the gift of life. An E-poster and a slogan competition was organized for the first year and second year MBBS students respectively on the theme ‘Motivation for voluntary blood donation’. The numerous entries showcased the creativity and ingenuity of our talented students. Prizes were awarded along with certificates for the winners.",
   "1st of October is celebrated as ‘National Voluntary Blood Donation Day’ in India every year to enforce the importance of blood donation in the life of an individual. It was first celebrated in1975 through the Indian Society of Blood Transfusion and Immunohaematology which was established in1971 under the leadership of Mrs. K. Swaroop Krishen and Dr. J.G. Jolly.",
   "We, the team Blood Centre CDSIMER dedicated this day to spread awareness about the need for voluntary blood donation and clear myths associated with blood donation. The special focus this year was on our young undergraduates of the first year MBBS who were encouraged to come forward to donate blood. Posters and media were used to motivate people to donate. Our management, administrators, Doctors, paramedical, nursing and support staff actively supported us.The donors were given certificates of appreciation by the Blood Transfusion Officer."
  ],
  "date": "14 Jun 2022",
  "images": [
   {
    "src": "events/blood-donation-day/PIC_2_WBDD.jpg",
    "alt": "Blood donation day: photo 1"
   },
   {
    "src": "events/blood-donation-day/PIC_3_WBDD.jpg",
    "alt": "Blood donation day: photo 2"
   },
   {
    "src": "events/blood-donation-day/PIC_4_WBDD.jpg",
    "alt": "Blood donation day: photo 3"
   },
   {
    "src": "events/blood-donation-day/pic_1_WBDD.jpg",
    "alt": "Blood donation day: photo 4"
   },
   {
    "src": "events/blood-donation-day/pic_5_WBDD.jpg",
    "alt": "Blood donation day: photo 5"
   },
   {
    "src": "events/blood-donation-day/BD1.jpg",
    "alt": "Blood donation day: photo 6"
   },
   {
    "src": "events/blood-donation-day/BD2.jpg",
    "alt": "Blood donation day: photo 7"
   },
   {
    "src": "events/blood-donation-day/InFrame_1633083264170.jpg",
    "alt": "Blood donation day: photo 8"
   }
  ]
 },
 "rbmet": {
  "heading": "RBMET",
  "paras": [
   "Medical Education Unit (MEU), CDSIMER under the aegis of St Johns Medical College, NMC Nodal Centre for Medical Education technologies, Bangalore organized a 3 day Revised Basic Course Workshop in medical education technology from 22-02-2022 and 24-02-2022 under the observer ship of Dr Farah F Fathima from St Johns Medical College. A total of 30 participants of different cadre participated in the workshop. The three days program started with the welcome address by Dean of CDSIMER, Dr. A. C. Ashok who stressed on the importance of training in medical education and current scenario of Medical Education .This was followed by an ice breaking session by Dr. Rajagopalan S., Medical Director, CDSIMER.",
   "A total of 22 sessions that included hands on training in framing competencies, deriving objectives for the selected competencies, choosing an innovative teaching learning and assessment method for the derived objectives and designing a lesson plan was planned and executed in these three days. The sessions were taken by twelve facilitators who were designated members of MEU under the guidance of Dr.Prashanth Kumar M., MEU Coordinator, CDSIMER and Dr Rajagopalan S., Medical Director, CDSIMER. It was very inspiring for the MEU members to witness the active participation by the participants. The role play by participants pertaining to AETCOM module was piquant. A rapporteur was appointed for each session and feedback was obtained from each participant at the end of the session each day. Many of the participants gave a satisfactory response .The program concluded with the vote of thanks proposed by the coordinator of MEU. The Dean, Observer from Nodal Centre and senior faculty members congratulated the entire team for conducting the program in an organized and productive manner.",
   "The first Revised Basic Medical Education Training ( RBMET) course was conducted by Medical Education Unit ( MEU) of CDSIMER under the aegis of St. Johns Medical College, Nodal Center for National Medical Commision (NMC) from 27th July, 2021 to 29th July, 2021."
  ],
  "date": "22 Feb 2022",
  "images": [
   {
    "src": "events/rbmet/IMG-20220228-WA0015.jpg",
    "alt": "RBMET: photo 1"
   },
   {
    "src": "events/rbmet/IMG_20220222_123558.jpg",
    "alt": "RBMET: photo 2"
   },
   {
    "src": "events/rbmet/IMG_20220222_142233.jpg",
    "alt": "RBMET: photo 3"
   },
   {
    "src": "events/rbmet/IMG_20220224_091326.jpg",
    "alt": "RBMET: photo 4"
   },
   {
    "src": "events/rbmet/IMG_20220224_130932.jpg",
    "alt": "RBMET: photo 5"
   },
   {
    "src": "events/rbmet/IMG_20220224_173417.jpg",
    "alt": "RBMET: photo 6"
   },
   {
    "src": "events/rbmet/IMG_20210728_133232.jpg",
    "alt": "RBMET: photo 7"
   },
   {
    "src": "events/rbmet/IMG_20210729_111455.jpg",
    "alt": "RBMET: photo 8"
   },
   {
    "src": "events/rbmet/IMG_20210729_132328.jpg",
    "alt": "RBMET: photo 9"
   },
   {
    "src": "events/rbmet/IMG_20210729_160057.jpg",
    "alt": "RBMET: photo 10"
   },
   {
    "src": "events/rbmet/IMG_20210729_160240_2.jpg",
    "alt": "RBMET: photo 11"
   },
   {
    "src": "events/rbmet/IMG_20210729_165601.jpg",
    "alt": "RBMET: photo 12"
   },
   {
    "src": "events/rbmet/IMG_20210729_171453.jpg",
    "alt": "RBMET: photo 13"
   }
  ]
 },
 "2022-02-17-the-department-of-biochemistry-organised-a": {
  "heading": "Event on 17 Feb 2022",
  "paras": [
   "The Department of Biochemistry organised a national Webinar on HPLC and LC MS/MS on 17-02-2022 at 11am. Speaker was Mr. Bhaumik H. Trivedi, Application Specialist-Clinical, Shimadzu, India."
  ],
  "date": "17 Feb 2022",
  "images": [
   {
    "src": "events/2022-02-17-the-department-of-biochemistry-organised-a/Screenshot_20220221-112049.jpg",
    "alt": "Event on 17 Feb 2022: photo 1"
   }
  ]
 },
 "world-cancer-day": {
  "heading": "World Cancer Day",
  "paras": [
   "World Cancer Day an initiative of the Union for International Cancer Control (UICC) was observed in Dr.Chandramma Dayananda Sagar Institute of Medical Education & Research on 04.02.2022 at Lecture Hall from 11.30 AM to 1.00PM. An academic awareness programme was organized for the faculty to spread awareness about this year World Cancer day theme: ‘Close the care gap’. A talk on Female genital tract cancer with focus on Cervical cancer was delivered by Dr. Anusha, Assistant Professor, Department of OBG followed by an overview about the Role of laboratory in the diagnosis of cancers. Principal & Dean Dr. Ashok A.C addressed concerns over the need to take active measures to screen the rural masses around the hospital boundaries and urged the faculty to proactively get involved in the same. Dr. Madan Gaekwad, Special Officer proposed to start research in direction of inventing simple kits to detect the early risk pathogens contributing to cancer like HPV kits. The programme ended with faculty taking a pledge to not only be aware but to spread the awareness and play an active role in our fight against cancer."
  ],
  "date": "9 Feb 2022",
  "images": [
   {
    "src": "events/world-cancer-day/audience_2.jpg",
    "alt": "World Cancer Day: photo 1"
   },
   {
    "src": "events/world-cancer-day/pic_1.jpg",
    "alt": "World Cancer Day: photo 2"
   },
   {
    "src": "events/world-cancer-day/pic_2.jpg",
    "alt": "World Cancer Day: photo 3"
   },
   {
    "src": "events/world-cancer-day/pic_3.jpg",
    "alt": "World Cancer Day: photo 4"
   },
   {
    "src": "events/world-cancer-day/pic_4.jpg",
    "alt": "World Cancer Day: photo 5"
   }
  ]
 },
 "2022-05-27-fresher-s-day-was-celebrated-on": {
  "heading": "Event on 27 May 2022",
  "paras": [
   "'FRESHER'S DAY' was celebrated on 27th May, 2022 to welcome the new batch of MBBS students. This was organised by the MBBS batch of 2020-21 along with the Cultural committee. The day included an ice-breaking session followed by a talent show to showcase the various talents of the students."
  ],
  "date": "27 May 2022",
  "images": [
   {
    "src": "events/2022-05-27-fresher-s-day-was-celebrated-on/IMG-20220603-WA0016.jpg",
    "alt": "Event on 27 May 2022: photo 1"
   },
   {
    "src": "events/2022-05-27-fresher-s-day-was-celebrated-on/IMG-20220603-WA0022.jpg",
    "alt": "Event on 27 May 2022: photo 2"
   },
   {
    "src": "events/2022-05-27-fresher-s-day-was-celebrated-on/IMG-20220603-WA0026.jpg",
    "alt": "Event on 27 May 2022: photo 3"
   },
   {
    "src": "events/2022-05-27-fresher-s-day-was-celebrated-on/IMG-20220603-WA0027.jpg",
    "alt": "Event on 27 May 2022: photo 4"
   }
  ]
 },
 "2022-our-first-year-mbbs-students-were": {
  "heading": "Event details",
  "paras": [
   "Our First year MBBS students were selected for the National level Seminar Competition, Cerebration, the 3rd Colloquim, 2021, organised by AIIMS Mangalagiri. They presented on Biomechanics, respiratory regulation and energy system in sprinting."
  ],
  "images": [
   {
    "src": "events/2022-our-first-year-mbbs-students-were/sa.jpg",
    "alt": "Event details: photo 1"
   }
  ]
 },
 "2025-05-09-dr-shivamurthy-n-professor-and-head": {
  "heading": "Event on 9 May 2025",
  "paras": [
   "Dr. Shivamurthy N., Professor and Head in the department of Pharmacology was awarded the MPS Pharma Yogi award for his contributions to the growth and development of the Medical Pharmacologists Society at MPSCON 2025, International conference held at AIIMS, Guwahati from the 7th-9th May, 2025."
  ],
  "date": "9 May 2025",
  "images": [
   {
    "src": "events/2025-05-09-dr-shivamurthy-n-professor-and-head/WhatsApp_Image_2025-06-11_at_093013.jpeg",
    "alt": "Event on 9 May 2025: photo 1"
   },
   {
    "src": "events/2025-05-09-dr-shivamurthy-n-professor-and-head/WhatsApp_Image_2025-06-11_at_093144_1.jpeg",
    "alt": "Event on 9 May 2025: photo 2"
   }
  ]
 },
 "2024-dr-shivamurthy-n-professor-of-pharmacology": {
  "heading": "Event details",
  "paras": [
   "Dr. Shivamurthy N., Professor of Pharmacology, CDSIMER, recieved INSC Excellence Award for his research publication, titled \"Methods to develop safer NSAIDS using SAR\"."
  ],
  "images": [
   {
    "src": "events/2024-dr-shivamurthy-n-professor-of-pharmacology/Screenshot_20231005-144840.png",
    "alt": "Event details: photo 1"
   }
  ]
 },
 "2021-11-20-dr-martin-lucas-a-professor-and": {
  "heading": "Event on 20 Nov 2021",
  "paras": [
   "Dr. Martin Lucas A., Professor and Head of the Department of Anatomy was invited as a resource person at the National Workshop on Museum and Plastination, Accelerate 2021 conducted on 19th and 20th November, 2021 at Dhanalakshmi Srinivasan Medical College and Hospital, Perambalur, Tamil Nadu."
  ],
  "date": "20 Nov 2021",
  "images": [
   {
    "src": "events/2021-11-20-dr-martin-lucas-a-professor-and/Screenshot_20211207-091224__01.jpg",
    "alt": "Event on 20 Nov 2021: photo 1"
   }
  ]
 },
 "2021-10-29-dr-prashanth-kumar-m-was-invited": {
  "heading": "Event on 29 Oct 2021",
  "paras": [
   "Dr. Prashanth Kumar M., was invited as a guest speaker at Adichunchanagiri Institute of Medical Sciences, for Dr. M. S. Rajagopal Memorial guest lecture and award ceremony on 29-10-2021. Topic: Role of Basal Ganglia in motor functions."
  ],
  "date": "29 Oct 2021",
  "images": [
   {
    "src": "events/2021-10-29-dr-prashanth-kumar-m-was-invited/FA_1.jpg",
    "alt": "Event on 29 Oct 2021: photo 1"
   },
   {
    "src": "events/2021-10-29-dr-prashanth-kumar-m-was-invited/InFrame_1633525851255_1.jpg",
    "alt": "Event on 29 Oct 2021: photo 2"
   },
   {
    "src": "events/2021-10-29-dr-prashanth-kumar-m-was-invited/Screenshot_20211102-104730_1.jpg",
    "alt": "Event on 29 Oct 2021: photo 3"
   }
  ]
 },
 "undated-2nd-mbbs-student-vishal-k-r": {
  "heading": "Event details",
  "paras": [
   "2nd MBBS, student Vishal K. R along with Dr. Shivamurthy, Associate Professor, Department of Pharmacology, published a research paper titled \"Paracetamol Self Overdosing Case Series study- Analysis of Demography, Clinical features and treatment methods\" in International Journal of Toxicological and Pharmacological Research."
  ],
  "images": [
   {
    "src": "events/undated-2nd-mbbs-student-vishal-k-r/IMG-20220809-WA0001.jpg",
    "alt": "Event details: photo 1"
   }
  ]
 },
 "2021-spandana-first-mbbs-student-bagged-first": {
  "heading": "Event details",
  "paras": [
   "Spandana, first MBBS student bagged first prize in singing/music competition, conducted as part of the Karnataka Rajyotsava celebrations in CDSIMER for students and staff."
  ],
  "images": [
   {
    "src": "events/2021-spandana-first-mbbs-student-bagged-first/sa.jpg",
    "alt": "Event details: photo 1"
   }
  ]
 },
 "2021-likitha-v-bagged-second-prize-in": {
  "heading": "Event details",
  "paras": [
   "Likitha V bagged second prize in painting/sketching competitions held as part of Karnataka Rajyotsava celebrations - 2021 in CDSIMER for students and staff."
  ],
  "images": [
   {
    "src": "events/2021-likitha-v-bagged-second-prize-in/sa2.jpg",
    "alt": "Event details: photo 1"
   }
  ]
 }
};
