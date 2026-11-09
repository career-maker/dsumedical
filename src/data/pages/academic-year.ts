// Academic-year timetables, internal assessments and university exam notices, from the existing CDSIMER site.
// Generated from the live pages; PDFs are hosted in /public/docs.
export type PhaseDoc = { title: string; href: string };
export type PhaseGroup = { title: string; items: PhaseDoc[]; subs?: { title: string; items: PhaseDoc[] }[] };
export type PhaseCell = { label: string; groups: PhaseGroup[] };
export type AcademicYear = { cols: string[]; rows: { year: string; cells: (PhaseCell | null)[] }[] };

export const academicYear: AcademicYear = {
  "cols": [
    "Phase I",
    "Phase II",
    "Phase III / Part I",
    "Phase III Part II / IV"
  ],
  "rows": [
    {
      "year": "2025–26",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/third_internal_assessment_timetable_for_phase_i_mbbs-2.pdf"
                },
                {
                  "title": "Community Medicine Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/req-attachment_1_10660_0337313.pdf"
                },
                {
                  "title": "Second Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/req-attachment_1_9169_3659443.pdf"
                },
                {
                  "title": "First Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/first_internal_assessment_timetable_for_phase_i_mbbs.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase II",
          "groups": [
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment Timetable for Phase II MBBS",
                  "href": "/docs/third_internal_assessment_timetable_for_phase_ii_mbbs.pdf"
                },
                {
                  "title": "Revised Internal Assessment Timetable for Phase II MBBS April 2026",
                  "href": "/docs/revised_ia_timetable_for_phase_ii_mbbs_april_2026.pdf"
                },
                {
                  "title": "Second Internal Assessment Timetable for Phase II MBBS",
                  "href": "/docs/2nd_ia_timetable_for_phaseii_mbbs.pdf"
                },
                {
                  "title": "First Internal Assessment Timetable for Phase II MBBS",
                  "href": "/docs/first_internal_assessment_timetable_for_phase_ii_mbbs_1.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III Part I",
          "groups": [
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment Timetable for Phase III Part I MBBS",
                  "href": "/docs/third_internal_assessment_timetable_for_phase_iii_part_i_mbbs-2.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase III Part I MBBS March 2026",
                  "href": "/docs/req-attachment_1_7788.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase III Part I MBBS – December 2025",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_part_i_mbbs__december_2025.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III Part II",
          "groups": [
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Internal Assessment Time Table for Phase III Part II MBBS - June 2026",
                  "href": "/docs/req-attachment_1_10668_0246237.pdf"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "2024–25",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Circular & Application for Photocopy for Phase I MBBS University Supplementary Theory Examination - Nov 2025.",
                  "href": "/docs/circular__application_for_photocopy_for_phase_i_mbbs_university_supplementary_theory_examination_-_nov_2025.pdf"
                },
                {
                  "title": "Revised time table for Phase I MBBS University Supplementary Practical Examination November 2025.",
                  "href": "/docs/revised_timetable_for_phase_i_university_supplementary_practical_examination.pdf"
                },
                {
                  "title": "Circular for Phase I MBBS University Supplementary Practical Examination November 2025.",
                  "href": "/docs/circular_for_phase_i_mbbs_university_supplementary__practical_examination_november_2025.pdf"
                },
                {
                  "title": "Circular for Phase I MBBS University Supplementary Examination November 2025",
                  "href": "/docs/circular_for_phase_i_mbbs_university_supplementary_examination__n_ovember_2025.pdf"
                },
                {
                  "title": "Timetable for Phase I MBBS Theory & Practical University Supplementary Examinations November 2025",
                  "href": "/docs/time_table_for_phase_i_mbbs_theory__practical_university_supplementary_examinations_november_2025.pdf"
                },
                {
                  "title": "Timetable of Phase I MBBS University Regular Theory Examinations September 2025",
                  "href": "/docs/timetable_of_phase_i_mbbs_university_regular_theory_examinations_september_2025.pdf"
                },
                {
                  "title": "Timetable of Phase I MBBS University Regular Practical Examinations September 2025",
                  "href": "/docs/timetable_of_phase_i_mbbs__university_regular_practical_examinations_september_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Remedial Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/remedial_internal_assessment_time_table_for_phase_i_mbbs_for_the_academic_year_2024-25.pdf"
                },
                {
                  "title": "Third Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/third_internal_assessment_timetable_for_phase_i_mbbs.pdf"
                },
                {
                  "title": "Community Medicine Internal Assessment for Phase I MBBS",
                  "href": "/docs/community_medicine_internal_assessment_for_phase_i_mbbs.pdf"
                },
                {
                  "title": "Second Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/second_internal_assessment_timetable_for_phase_i_mbbs.pdf"
                },
                {
                  "title": "First Internal Assessment Timetable for Phase I MBBS",
                  "href": "/docs/phase_i_mbbs_first_internal_assessment_time_table.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase II",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Circular & Application for Photocopy for Phase II MBBS University Supplementary Theory Examination - Nov 2025.",
                  "href": "/docs/circular__application_for_photocopy_for_phase_ii_mbbs_university_supplementary_theory_examination_-_nov_2025.pdf"
                },
                {
                  "title": "Circular for Phase II MBBS University Supplementary Practical Examination November 2025",
                  "href": "/docs/circular_for_phase__ii_mbbs_university_supplementary_practical_examination_november_2025.pdf"
                },
                {
                  "title": "Circular for Phase II MBBS University Supplementary Examination November 2025",
                  "href": "/docs/circular_for_phase__ii_mbbs_university_supplementary_examination_november_2025.pdf"
                },
                {
                  "title": "Timetable for Phase II MBBS Theory & Practical University Supplementary Examinations November 2025",
                  "href": "/docs/time_table_for_phase_ii_mbbs_theory__practical_university_supplementary_examinations_november_2025.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy for Phase II MBBS University Regular & Repeater Theory Examination - Aug/Sep 2025",
                  "href": "/docs/circular__application_for_photocopy_for_phase_ii_mbbs_university_regular__repeater_theory_examination_aug_2025.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Repeater Practical Examinations Aug-Sep 2025",
                  "href": "/docs/timetable_of_phase_ii_mbbs__university_repeater_practical_examinations_aug-sep_2025.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Regular Practical Examinations Aug-Sep 2025",
                  "href": "/docs/timetable_of_phase_ii_mbbs__university_regular_practical_examinations_aug-sep_2025.pdf"
                },
                {
                  "title": "Circular & Application for Phase II MBBS University Repeater Examination Aug-Sept 2025",
                  "href": "/docs/circular__application_for_phase_ii_mbbs_university_repeater_examination_aug-sept_2025.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Regular & Repeater Theory Examinations August - September 2025",
                  "href": "/docs/timetable_of_phase_ii_mbbs_university_regular__repeater_theory_examinations_august_-_september_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Remedial internal Assessment Time Table for Phase II MBBS for the Academic Year 2024-25",
                  "href": "/docs/remedial_internal_assessment_time_table_for_phase_ii_mbbs_for_the_academic_year_2024-25.pdf"
                },
                {
                  "title": "Third Internal Assessment for Phase II MBBS",
                  "href": "/docs/third_internal_assessment_for_phase_ii_mbbs.pdf"
                },
                {
                  "title": "Second Internal Assessment Timetable for Phase II MBBS",
                  "href": "/docs/second_internal_assessment_timetable_for_phase_ii_mbbs.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase II MBBS March 2025",
                  "href": "/docs/internal_assessment_time_table_for_phase_ii_mbbs_-_march_2025.pdf"
                },
                {
                  "title": "First Internal Assessment for Phase II MBBS",
                  "href": "/docs/cir_exam_phase_ii_mbbs_first_internal_assessment.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Timetable of Phase III Part I MBBS University Supplementary Examination January 2026",
                  "href": "/docs/phase-iii_part-i_mbbs_university_supplementary_examination_jan_2026.pdf"
                },
                {
                  "title": "Fee Circular for Phase III Part-I MBBS University Supplementary Examination January 2026",
                  "href": "/docs/circular.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy for Phase III Part-I MBBS University Regular/Repeater Theory Examination - Dec 2025",
                  "href": "/docs/circularapplication.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Repeater Practical Examination December 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs__university_repeater_practical_examination_december_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Regular Practical Examination December 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs__university_regular_practical_examinations_december_2025.pdf"
                },
                {
                  "title": "Circular for Phase III Part I MBBS University Repeater Examination November 2025.",
                  "href": "/docs/circular_for_phase__iii_part_i_mbbs_university__r_epeater_examination_november_2025_1.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Regular & Repeater Theory Examination Nov-Dec 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs_university_regular__repeater_theory_examination_nov-dec_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment Timetable for Phase III Part I MBBS",
                  "href": "/docs/third_internal_assessment_timetable_for_phase_iii_part_i_mbbs.pdf"
                },
                {
                  "title": "Paediatrics Internal Assessment Timetable for Phase III Part I MBBS",
                  "href": "/docs/_paediatrics__internal_assessment_timetable_for_phase_iii_part_i_mbbs_1.pdf"
                },
                {
                  "title": "ENT & Ophthalmology Internal Assessment Timetable for Phase III Part I MBBS August 2025",
                  "href": "/docs/ent__ophthalmology_internal_assessment_timetable_for_phase_iii_part_i_mbbs_august_2025.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase III Part I MBBS August 2025",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_part_i_mbbs__august_2025.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase III Part I MBBS May 2025",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_part_i_mbbs_may_2025.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase IV",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Time Table for Phase III Part II MBBS Theory & Practical University Supplementary Examinations June 2026",
                  "href": "/docs/req-attachment_1_10982_4747463.pdf"
                },
                {
                  "title": "Circular for Phase III Part II MBBS University Supplementary Examination June 2026",
                  "href": "/docs/req-attachment_1_10983_5407843_2.pdf"
                },
                {
                  "title": "Time Table for Phase III Part II MBBS University Supplementary Practical Examination June 2026.",
                  "href": "/docs/req-attachment_1_10984_0547893.pdf"
                },
                {
                  "title": "Timetable of Phase III Part II MBBS University Regular & Repeater Practical Examination April 2026",
                  "href": "/docs/req-attachment_1_10085_3501073.pdf"
                },
                {
                  "title": "Timetable of Phase III Part II MBBS University Regular & Repeater Practical Examination April 2026",
                  "href": "/docs/timetable_phaseiii_partii_mbbs_university_regular_repeater_practical_april_2026.pdf"
                },
                {
                  "title": "Timetable of Phase III Part II MBBS University Regular & Repeater Theory Examination Mar-Apr 2026",
                  "href": "/docs/timetable_of_phase_iii_part_ii_mbbs_university_regular__repeater_theory_examination_mar-april_2026.pdf"
                },
                {
                  "title": "Circular for Phase III Part II MBBS University Repeater Examination March/April 2026.",
                  "href": "/docs/circular_2.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Internal Assessment Timetable for Phase III Part II MBBS - July 2025",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_part__ii_mbbs__-___july_2025.pdf"
                },
                {
                  "title": "Final Internal Assessment Time Table for Phase III Part II MBBS",
                  "href": "/docs/final_internal_assessment_time_table_for_phase_iii_part_ii_mbbs.pdf"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "2023–24",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Timetable of Phase I MBBS Practical University Supplementary Examinations October 2024",
                  "href": "/docs/timetable_of_phase_i_mbbs_practical_university_supplementary_examinations_october_2024.pdf"
                },
                {
                  "title": "Fee Circular for Phase I MBBS University Supplementary Examination – October 2024.",
                  "href": "/docs/supple_fee_circular.pdf"
                },
                {
                  "title": "Application for Phase I MBBS University Supplementary Examination – October 2024.",
                  "href": "/docs/application_for_supplementary_examination_october_2024.pdf"
                },
                {
                  "title": "Photocopy Circular for Phase I MBBS University Regular Examination – August 2024",
                  "href": "/docs/photocopy_circular.pdf"
                },
                {
                  "title": "Timetable of Phase I MBBS (Theory & Practical) University Supplementary Examinations October 2024",
                  "href": "/docs/phase_i_university_supplementary_theory_and_practical_examintaions_-_oct_2024.pdf"
                },
                {
                  "title": "Time Table for University Regular & Repeater Practical Examination August 2024",
                  "href": "/docs/cir_2024_exam_0026_time_table_for_university_practical_examination.pdf"
                },
                {
                  "title": "Circular for Repeater University Examination August 2024",
                  "href": "/docs/circular__for_repeaters_university_examination_aug_2024.pdf"
                },
                {
                  "title": "Application for Repeater University Examination August 2024",
                  "href": "/docs/appliaction_for_repeaters_university_examination_aug_2024.pdf"
                },
                {
                  "title": "Phase I MBBS University Theory & Practical Examination Time Table",
                  "href": "/docs/time_table_for_phase_i_mbbs_theory__practical_examinations_august_2024.pdf"
                }
              ]
            },
            {
              "title": "Timetable",
              "items": [
                {
                  "title": "Foundation Course Timetable for 2023-24 Batch",
                  "href": "/docs/foundation_course_time_table_revised.pdf"
                },
                {
                  "title": "Master Timetable for Phase I MBBS",
                  "href": "/docs/master_timetable_of_phase-i_mbbs_2023-24_batch.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment for Phase I MBBS",
                  "href": "/docs/third_internal_assessment_for_phase_i_mbbs.pdf"
                },
                {
                  "title": "Second Internal Assessment for Phase I MBBS",
                  "href": "/docs/second_internal_assessment_for_phase_-i_mbbs_ay_2023-2024_1.pdf"
                },
                {
                  "title": "First Internal Assessment for Phase I MBBS",
                  "href": "/docs/cir_exam_0030_first_ia_time_table_phase_i.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase II",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Timetable of Phase II MBBS University Supplementary Practical Examinations March 2025",
                  "href": "/docs/timetable_of_phase_ii_mbbs__practical_university_supplementary_examinations__march_2025.pdf"
                },
                {
                  "title": "Fee Circular & Application for Phase II University Supplementary Examination - Feb-March 2025",
                  "href": "/docs/30012025.pdf"
                },
                {
                  "title": "Time Table for Phase II MBBS Theory & Practical University Supplementary Examinations Feb-Mar 2025",
                  "href": "/docs/time_table_for_phase_ii_mbbs_theory__practical_university_supplementary_examintions_feb-mar_2025_1.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy for Phase II MBBS University Regular Theory Examination - Dec 2024 -Jan 2025.",
                  "href": "/docs/circular__application_for_photocopy_for_phase_ii_mbbs_university_regular_theory_examination_-_dec_2024_-jan_2025.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Regular & Repeater Examinations (Practical) Jan 2025",
                  "href": "/docs/cir_2024_exam_0040_time_table_for_university_practical_examination.pdf"
                },
                {
                  "title": "Circular for Repeater University Examination Dec 24 - Jan 25",
                  "href": "/docs/circular_for_repeater_university_examination_dec_24_-_jan_25.pdf"
                },
                {
                  "title": "Application for Repeater University Examination Dec 24 - Jan 25",
                  "href": "/docs/appliaction_for_repeaters_university_examination_dec_24_-_jan_25.pdf"
                },
                {
                  "title": "Time Table for Phase II MBBS Theory & Practical Examinations Dec 2024 - Jan 2025",
                  "href": "/docs/time_table_for_phase_ii_mbbs_theory__practical_examinations_dec_2024_-_jan_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Second Remedial internal Assessment Time Table for the Academic Year 2023-24",
                  "href": "/docs/second_remedial_internal_assessment_time_table_for_the_academic_year_2023-24_phase_ii_1.pdf"
                },
                {
                  "title": "Remedial internal Assessment Time Table for the Academic Year 2023-24",
                  "href": "/docs/remedial_internal_assessment_time_table_for_the_academic_year_2023-24.pdf"
                },
                {
                  "title": "Revised Phase II MBBS third Internal Assessment Time Table",
                  "href": "/docs/cir_exam_2024_0033_revised_third_ia_time_table_for_phase_ii_mbbs.pdf"
                },
                {
                  "title": "Phase II MBBS third Internal Assessment Time Table",
                  "href": "/docs/phase_ii_mbbs_third_internal_assessment_time_table.pdf"
                },
                {
                  "title": "Phase II MBBS Internal Assessment Time Table",
                  "href": "/docs/phase_ii_internal_assessment_time_table.pdf"
                },
                {
                  "title": "Phase II MBBS Clinical Subjects Internal Assessment Time Table",
                  "href": "/docs/0021_phase_ii_iclinical_posting_ia_timetable_1.pdf"
                },
                {
                  "title": "First Internal Assessment Timetable for Phase II MBBS 2022-23",
                  "href": "/docs/cir_aca_0011_phase_ii_first_ia_time_table.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III Part I",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Timetable of Phase III Part I MBBS University Supplementary Practical Examinations March 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs__university_supplementary_practical_examinations__march_2025.pdf"
                },
                {
                  "title": "Fee Circular & Application for Phase III Part I University Supplementary Examination - Feb-March 2025",
                  "href": "/docs/30012025.pdf"
                },
                {
                  "title": "Time Table for Phase III Part I MBBS Theory & Practical University Supplementary Examinations Mar 2025",
                  "href": "/docs/time_table_for_phase_iii_part_i_mbbs_theory__practical_university_supplementary_examintions_mar_2025.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy for Phase III Part I MBBS University Regular Theory Examination - Jan 2025",
                  "href": "/docs/circular__application_for_photocopy_for_phase_iii_part_i_mbbs_university_regular_theory_examination_jan_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Regular Examinations (Practical) Jan 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs__university_regular_examinations_practical_jan_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Repeaters Examinations (Practical) Jan 2025",
                  "href": "/docs/timetable_of_phase_iii_part_i_mbbs__university_repeaters_examinations_practical_jan_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part I MBBS University Regular & Repeater Theory Examination Jan 2025",
                  "href": "/docs/phase_iii__part_i_university_examination_time_table_january_2025.pdf"
                },
                {
                  "title": "Circular for Repeater University Examination January 2025",
                  "href": "/docs/circular_for_repeater_university_examination_jan_2025.pdf"
                },
                {
                  "title": "Application for Repeater University Examination January 2025",
                  "href": "/docs/appliaction_for_repeaters_university_examination_jan_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Second Remedial internal Assessment Time Table for the Academic Year 2023-24",
                  "href": "/docs/second_remedial_internal_assessment_time_table_for_the_academic_year_2023-24.pdf"
                },
                {
                  "title": "Remedial internal Assessment Time Table for the Academic Year 2023-24",
                  "href": "/docs/time_table_for_remedial_internal_assessment.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Phase III MBBS December 2024",
                  "href": "/docs/0034_phase_iii_part_i_ia_timetable.pdf"
                },
                {
                  "title": "Pediatrics Internal Assessment Timetable for Phase III MBBS for the A.Y 2023-24",
                  "href": "/docs/pediatrics_internal_assessment_for_phase_iii_mbbs.pdf"
                },
                {
                  "title": "Internal Assessment TimeTable for Phase III MBBS - September 2024",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_mbbs_-_september_2024.pdf"
                },
                {
                  "title": "Internal Assessment TimeTable for Phase III MBBS - June 2024",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_mbbs_-_june_2024.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III Part II",
          "groups": [
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Timetable of Phase III Part II MBBS University Supplementary Practical Examinations June 2025",
                  "href": "/docs/timetable_of_phase_iii_part_ii_mbbs_university_supplementary_practical_examinations_june_2025.pdf"
                },
                {
                  "title": "Circular & Application for Phase III Part II MBBS University Supplementary Examination May-June 2025",
                  "href": "/docs/circular__application_for_phase_iii_part_ii_mbbs_university_supplementary_examination__may-june-2025.pdf"
                },
                {
                  "title": "Time Table for Phase III Part II MBBS Theory & Practical University Supplementary Examinations May-June 2025",
                  "href": "/docs/time_table_for_phase_iii_part_ii_mbbs_theory__practical_supplementary_examination_may-june_2025.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy for Phase III Part II MBBS University Regular Theory Examination - April 2025",
                  "href": "/docs/circular__application_for_photocopy_for_phase_iii_part_ii_mbbs_university_regular_theory_examination_april_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part II MBBS University Regular Practical Examinations April 2025",
                  "href": "/docs/timetable_of_phase_iii_part_ii_mbbs__university_regular_practical_examinations_april_2025.pdf"
                },
                {
                  "title": "Timetable of Phase III Part II MBBS University Regular Theory Examination April 2025",
                  "href": "/docs/timetable_of_phase_iii_part_ii_mbbs_university_regular_theory_examination_april_2025.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Remedial internal Assessment Time Table for Phase III Part II MBBS for the Academic Year 2023-24",
                  "href": "/docs/remedial_internal_assessment_time_table_for_phase_iii_part_ii_mbbs_for_the_academic_year_2023-24.pdf"
                },
                {
                  "title": "Internal Assessment TimeTable for Phase III Part II MBBS - February 2025",
                  "href": "/docs/internal_assessment_timetable_for_phase_iii_part_ii_mbbs_-_february_2025.pdf"
                },
                {
                  "title": "Internal Assessment TimeTable for Phase IV MBBS - September2024",
                  "href": "/docs/internal_assessment_timetable_for_phase_iv_mbbs_-_september_2024.pdf"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "year": "2022–23",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "Academic Calendar",
              "items": [
                {
                  "title": "Academic Calendar 2022 - 2023",
                  "href": "/docs/academic_calendar_2022-23_for_mbbs_dt_30012023_organized.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment of Phase I MBBS for the Academic year 2022-23",
                  "href": "/docs/0020_phase_i_3rd_ia_time_table.pdf"
                },
                {
                  "title": "Second Internal Assessment for Phase I MBBS",
                  "href": "/docs/cir_2023_0017_second_internal_assessment.pdf"
                },
                {
                  "title": "First Internal Assessment for Phase I MBBS",
                  "href": "/docs/cir_exam_0011_first_internal_assesmnet.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Photocopy Circular for Phase I MBBS University Supplementary Examination – Jan/Feb - 2024",
                  "href": "/docs/photocopy_circular_for_phase_i_mbbs_theory_supplementary_examination-_janauary_2024.pdf"
                },
                {
                  "title": "Application for Photocopy for Phase I MBBS University Supplementary Examination – Jan/Feb - 2024",
                  "href": "/docs/photocopy_application_for_phase_i_mbbs_theory_supplementary_examination-_jan_feb_2024.pdf"
                },
                {
                  "title": "Timetable of Phase I MBBS University Supplementary Examinations (Practical) January-February 2024",
                  "href": "/docs/cir_2024_exam_0004_university_supplementary_examinationspractical_jan-feb_2024.pdf"
                },
                {
                  "title": "Fee Circular for Phase I MBBS University Supplementary Examination – Jan 2024.",
                  "href": "/docs/fee_circular_of_phase-i_mbbs_supplmentary_examination_jan_2024.pdf"
                },
                {
                  "title": "Application for Phase I MBBS University Supplementary Examination – Jan 2024.",
                  "href": "/docs/application_for_supplementary_examination_january_2024.pdf"
                },
                {
                  "title": "Timetable of Phase I MBBS Theory & Practical Supplementary Examinations January-February 2024",
                  "href": "/docs/timetable_of_phase-i_mbbs_university_supplementary_examination_jan_2024.pdf"
                },
                {
                  "title": "Photocopy Circular for Phase I Regular & Repeater University Examination Nov/Dec 2023 for the A.Y 2022-23.",
                  "href": "/docs/phase_i_mbbs_regular__repeaters_university_examinations_nov_dec_2023_photocopy_circular.pdf"
                },
                {
                  "title": "Photocopy Application for Phase I Regular & Repeater University Examination Nov/Dec 2023 for the A.Y 2022-23.",
                  "href": "/docs/phase_i_mbbs_regular__repeaters_university_examinations_nov_dec_2023_application.pdf"
                },
                {
                  "title": "Pass criteria: NMC Corrigendum DSU pass criteria are modified as per the corrigendum given below. These are not applicable retrospectively.",
                  "href": "/docs/corrigendum_nmc.pdf"
                },
                {
                  "title": "Circular - University Regular & Repeater Examinations(Practical) Dec - 2023 of Phase I MBBS for the Academic year 2023 - 23",
                  "href": "/docs/cir_2023_exam_0027-university_regular_practical_examination.pdf"
                },
                {
                  "title": "Time Table for Phase I MBBS Theory & Practical Examinations Nov-Dec 2023",
                  "href": "/docs/phase_i_mbbs_tt.pdf"
                },
                {
                  "title": "Circular & Application for Repeater University Examination Nov/Dec 2023",
                  "href": "/docs/supplemntary_circluar__application.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase II",
          "groups": [
            {
              "title": "Academic Calendar",
              "items": [
                {
                  "title": "Academic Calendar 2022 - 2023",
                  "href": "/docs/academic_calendar_2022-23_for_mbbs_dt_30012023_organized.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third Internal Assessment for Phase II MBBS Academic Year 2022-2023",
                  "href": "/docs/cir_exam_0031_third_ia_time_table_for_phase_ii_mbbs_1.pdf"
                },
                {
                  "title": "Second Internal Assessment for Phase II MBBS Academic Year 2022-2023",
                  "href": "/docs/phase_ii_2nd_ia_timetable_with_portions.pdf"
                },
                {
                  "title": "First Internal Assessment for Phase II MBBS Academic Year 2022-2023",
                  "href": "/docs/0016_phase_ii_first_ia_timetable_2.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Photocopy Circular for Phase II & III MBBS University Supplementary Examination – April-May 2024.",
                  "href": "/docs/photocopy.pdf"
                },
                {
                  "title": "Application for Photocopy for Phase II & III MBBS University Supplementary Examination – April-May 2024.",
                  "href": "/docs/application.pdf"
                },
                {
                  "title": "Application for Phase II & Phase III MBBS University Supplementary Examination – April 2024.",
                  "href": "/docs/2_.pdf"
                },
                {
                  "title": "Fee Circular for Phase II & Phase III MBBS University Supplementary Examination – April 2024.",
                  "href": "/docs/1_.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS (Theory & Practical) University Supplementary Examinations April 2024",
                  "href": "/docs/timetable_of_phase_ii_mbbs_theory__practical_university_supplementary_examinations_april_-2024.pdf"
                },
                {
                  "title": "Application for Photocopy for Phase II MBBS University Regular Examination – Feb - 2024",
                  "href": "/docs/2.pdf"
                },
                {
                  "title": "Photocopy Circular for Phase II MBBS University Regular Examination – Feb - 2024.",
                  "href": "/docs/1_2.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Regular Examinations (Practical) March 2024",
                  "href": "/docs/phase_-_ii_mbbs_university_regular__repeater_examinatonpractical.pdf"
                },
                {
                  "title": "Fee Circular for Phase II MBBS University Repeater Examination – Feb/March - 2024.",
                  "href": "/docs/fee_circular_of_phase-ii_mbbs_university_repeater_examination_feb-march_2024.pdf"
                },
                {
                  "title": "Application for Phase II MBBS University Repeater Examination – Feb/March - 2024.",
                  "href": "/docs/application_for_phase_ii_repeater_examination_feb-march_2024.pdf"
                },
                {
                  "title": "Timetable of Phase II MBBS University Regular & Repeater Theory Examination Feb-March 2024",
                  "href": "/docs/timetable_of_phase-ii_mbbs_university_regular__repeater_examination_feb-march_2024.pdf"
                },
                {
                  "title": "Pass criteria: NMC Corrigendum DSU pass criteria are modified as per the corrigendum given below. These are not applicable retrospectively.",
                  "href": "/docs/corrigendum_nmc.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase III",
          "groups": [
            {
              "title": "Academic Calendar",
              "items": [
                {
                  "title": "Academic Calendar 2022 - 2023",
                  "href": "/docs/academic_calendar_2022-23_for_mbbs_dt_30012023_organized.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Circular - Third Internal Assessment of Phase III (Part - 1) MBBS for A.Y 2022-23",
                  "href": "/docs/cir_exam_0028_third_ia_time_table.pdf"
                },
                {
                  "title": "Circular - 1st Internal Assessment of Phase III MBBS for the Academic year 2022-23",
                  "href": "/docs/cir_exam_0015_1st_ia_phase_iii.pdf"
                },
                {
                  "title": "Second Internal Assessment for Phase III (Part I) MBBS Academic year 2022-23",
                  "href": "/docs/phase_iii_2nd_ia_timetable_revised.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Photocopy Circular for Phase II & III MBBS University Supplementary Examination – April-May 2024.",
                  "href": "/docs/photocopy.pdf"
                },
                {
                  "title": "Application for Photocopy for Phase II & III MBBS University Supplementary Examination – April-May 2024.",
                  "href": "/docs/application.pdf"
                },
                {
                  "title": "Application for Phase II & Phase III MBBS University Supplementary Examination – April 2024.",
                  "href": "/docs/2_.pdf"
                },
                {
                  "title": "Fee Circular for Phase II & Phase III MBBS University Supplementary Examination – April 2024.",
                  "href": "/docs/1_.pdf"
                },
                {
                  "title": "Timetable of Phase III MBBS (Theory & Practical) University Supplementary Examinations April 2024",
                  "href": "/docs/timetable_of_phase_iii_mbbs_theory__practical_university_supplementary_examinations_april_2024.pdf"
                },
                {
                  "title": "Application for Photocopy for Phase III MBBS University Regular Examination – Feb - 2024",
                  "href": "/docs/application_for_photocopy_for_phase_iii_mbbs_university_regular_examination__feb_-_2024.pdf"
                },
                {
                  "title": "Photocopy Circular for Phase III MBBS University Regular Examination – Feb - 2024",
                  "href": "/docs/photocopy_circular_for_phase_iii_mbbs_university_regular_examination__feb_-_2024.pdf"
                },
                {
                  "title": "Timetable of Phase III MBBS University Regular Examinations (Practical) February 2024",
                  "href": "/docs/timetable_of_phase_iii_mbbs_university_regular_examinations_practical_february_2024.pdf"
                },
                {
                  "title": "Pass criteria: NMC Corrigendum DSU pass criteria are modified as per the corrigendum given below. These are not applicable retrospectively.",
                  "href": "/docs/corrigendum_nmc.pdf"
                },
                {
                  "title": "Time table for Phase III MBBS Theory & Practical examinations Feb 2024",
                  "href": "/docs/phase_iii_part_i_mbbs_university_examination_time_table.pdf"
                }
              ]
            }
          ]
        },
        null
      ]
    },
    {
      "year": "2021–22",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "Academic Calendar",
              "items": [
                {
                  "title": "Academic Calendar 2021 - 2022",
                  "href": "/docs/academic_calendar_of_2021-22_academic_year_.pdf"
                }
              ]
            },
            {
              "title": "Foundation Course",
              "items": [
                {
                  "title": "Foundation Course for FIRST MBBS 2021 - 2022 Batch",
                  "href": "/docs/foundation_course_1-compressed.pdf"
                }
              ]
            },
            {
              "title": "Timetable",
              "items": [
                {
                  "title": "Timetable for FIRST MBBS 2021-22 Batch",
                  "href": "/docs/annual_tt_compressed.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Timetable for Third Internal Assessment",
                  "href": "/docs/cir_aca_070_third_internal_assessment_phase_i.pdf"
                },
                {
                  "title": "Timetable for 2nd Internal Assessment",
                  "href": "/docs/phase_i_second_internal_time_table.pdf"
                },
                {
                  "title": "Timetable for 1st Internal Assessment",
                  "href": "/docs/first_internal_assessment.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "University Practical Examinations - 2023",
                  "href": "/docs/university_practical_examinations_-_2023_for_phase_i_mbbs.pdf"
                },
                {
                  "title": "Timetable for Phase 1 MBBS Theory and Practical Examinations Feb- Mar 2023",
                  "href": "/docs/timetable_for_phase_1_mbbs.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy of Supplementary Theory Examination April 2023",
                  "href": "/docs/circular__application_for_photocopy_of_supplementary_theory_examination_april_2023.pdf"
                },
                {
                  "title": "Phase I MBBS Supplementary Practical Time table",
                  "href": "/docs/phase_i_supplementary_practical_timetable.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy of Phase I MBBS Theory Examination Feb-Mar 2023",
                  "href": "/docs/circular__application.pdf"
                },
                {
                  "title": "Phase-I MBBS Supplementary Examinations April 2023 Circular and Application",
                  "href": "/docs/phase-i_and_phase-ii_mbbs_supplementary_examinations_april_2023_circular_and_application.pdf"
                },
                {
                  "title": "Timetable for Phase-I MBBS Supplementary Theory and Practical Examinations April 2023",
                  "href": "/docs/timetable_for_phase-i_and_phase-ii_mbbs_supplementary_theory_and_practical_examinations_april_2023.pdf"
                },
                {
                  "title": "Timetable for Phase I MBBS Theory and Practical Examinations Feb - Mar 2023",
                  "href": "/docs/university_theory_examination_timetable_for_phase_-_i_mbbs_feb_2023.pdf"
                },
                {
                  "title": "University Practical Exam for Phase I MBBS Academic Year 2021-22",
                  "href": "/docs/university_practical_examination_timetable_for_phase_-_i_mbbs__2023.pdf"
                },
                {
                  "title": "Notification - Amendement of Examinations Regualtions",
                  "href": "/docs/notification_-_amendement_of_examinations_regualtions_dt_01092022.pdf"
                }
              ]
            }
          ]
        },
        {
          "label": "Phase II",
          "groups": [
            {
              "title": "Academic Calendar",
              "items": [
                {
                  "title": "Academic Calendar 2021 - 2022",
                  "href": "/docs/academic_calendar_of_2021-22_academic_year_.pdf"
                }
              ]
            },
            {
              "title": "Timetable",
              "items": [
                {
                  "title": "Professional II MBBS Time Table",
                  "href": "/docs/2-revised_-_master_phase_2_time_table_.pdf"
                }
              ]
            },
            {
              "title": "Circulars",
              "items": [
                {
                  "title": "Orientation program schedule for Second MBBS Students",
                  "href": "/docs/orientation_program-min.pdf"
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Timetable for Third Internal Assessment",
                  "href": "/docs/0061_third_ia_timetable.pdf"
                },
                {
                  "title": "Internal Assessment Timetable for Clinical Theory Subjects.",
                  "href": "/docs/clinical_theory_time_table.pdf"
                },
                {
                  "title": "Timetable for 2nd Internal Assessment",
                  "href": "/docs/ii_ia_timetable.pdf"
                },
                {
                  "title": "Timetable for 1st Internal Assessment",
                  "href": "/docs/1st_ia_time_table.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "Application for Photocopy",
                  "href": "/docs/photocopy_application_format_1.pdf"
                },
                {
                  "title": "Photo Copy of MBBS Theory Examinations Jan - 2023",
                  "href": "/docs/photocopy_circular_mbbs.pdf"
                },
                {
                  "title": "1st Year MBBS Supplementary exam Circular",
                  "href": "/docs/1st_year_mbbs_supplementary_exam_circular_feb_2023.pdf"
                },
                {
                  "title": "Application for Supplementary Examinations",
                  "href": "/docs/application_for_supplementary_.pdf"
                },
                {
                  "title": "Notification - Amendement of Examinations Regualtions",
                  "href": "/docs/notification_-_amendement_of_examinations_regualtions_dt_01092022.pdf"
                },
                {
                  "title": "University Practical Examinations - 2023 for Phase II MBBS",
                  "href": "/docs/cir_0004_phase-ii_mbbs_university_practial_examination_timetable.pdf"
                },
                {
                  "title": "University Theory and Practical Examinations Timetable for Phase 2 MBBS Jan - Feb 2023",
                  "href": "/docs/timetable_for_phase_2_mbbs.pdf"
                },
                {
                  "title": "Circular & Application for Photocopy of Supplementary Theory Examination April 2023",
                  "href": "/docs/circular__application_for_photocopy_of_supplementary_theory_examination_april_2023.pdf"
                },
                {
                  "title": "Phase II MBBS Supplementary Practical Time table",
                  "href": "/docs/phase_ii_supplementary_practical_timetable.pdf"
                },
                {
                  "title": "Phase-II MBBS Supplementary Examinations April 2023 Circular and Application",
                  "href": "/docs/phase-i_and_phase-ii_mbbs_supplementary_examinations_april_2023_circular_and_application.pdf"
                },
                {
                  "title": "Timetable for Phase-II MBBS Supplementary Theory and Practical Examinations April 2023",
                  "href": "/docs/timetable_for_phase-i_and_phase-ii_mbbs_supplementary_theory_and_practical_examinations_april_2023.pdf"
                },
                {
                  "title": "Application for Photocopy",
                  "href": "/docs/photocopy_application_format_1.pdf"
                },
                {
                  "title": "Photo Copy of MBBS Theory Examinations Jan - 2023",
                  "href": "/docs/photocopy_circular_mbbs.pdf"
                },
                {
                  "title": "Notification - Amendement of Examinations Regualtions",
                  "href": "/docs/notification_-_amendement_of_examinations_regualtions_dt_01092022.pdf"
                },
                {
                  "title": "University Practical Examinations - 2023 for Phase II MBBS",
                  "href": "/docs/cir_0004_phase-ii_mbbs_university_practial_examination_timetable.pdf"
                },
                {
                  "title": "University Theory and Practical Examinations Timetable for Phase 2 MBBS Jan - Feb 2023",
                  "href": "/docs/timetable_for_phase_2_mbbs.pdf"
                }
              ]
            },
            {
              "title": "Field Visits",
              "items": [
                {
                  "title": "Community medicine Clinical posting Teaching Roster 2020 Batch phase 2",
                  "href": "/docs/camerascan_06-may-2022_1500_.pdf"
                }
              ]
            }
          ]
        },
        null,
        null
      ]
    },
    {
      "year": "2020–21",
      "cells": [
        {
          "label": "Phase I",
          "groups": [
            {
              "title": "Timetable",
              "items": [],
              "subs": [
                {
                  "title": "December 2021",
                  "items": [
                    {
                      "title": "01/12/2021 to 31/12/2021",
                      "href": "/docs/timetable_0112_3112.pdf"
                    }
                  ]
                },
                {
                  "title": "November 2021",
                  "items": [
                    {
                      "title": "01/11/2021 to 30/11/2021",
                      "href": "/docs/timetable_0111_3011-compressed.pdf"
                    }
                  ]
                },
                {
                  "title": "October 2021",
                  "items": [
                    {
                      "title": "23/10/2021 & 30/10/2021",
                      "href": "/docs/timetable_2310_3010_compressed.pdf"
                    },
                    {
                      "title": "01/10/2021 to 31/10/2021",
                      "href": "/docs/timetable_0110_3110_2.pdf"
                    }
                  ]
                },
                {
                  "title": "September 2021",
                  "items": [
                    {
                      "title": "01/09/2021 to 30/09/2021",
                      "href": "/docs/timetable_0109_3109_2.pdf"
                    }
                  ]
                },
                {
                  "title": "August 2021",
                  "items": [
                    {
                      "title": "02/08/2021 to 31/08/2021",
                      "href": "/docs/timetable_0208_3108-.pdf"
                    },
                    {
                      "title": "26/07/2021 to 31/07/2021",
                      "href": "/docs/timetable_2607_3107-.pdf"
                    },
                    {
                      "title": "19/07/2021 to 24/07/2021",
                      "href": "/docs/timetable_1907_2407-170721_.pdf"
                    },
                    {
                      "title": "12/07/2021 to 17/07/2021",
                      "href": "/docs/timetable_1207_1707_compressed_1.pdf"
                    },
                    {
                      "title": "06/07/2021 to 10/07/2021",
                      "href": "/docs/timetable_0607_1007_compressed_1.pdf"
                    },
                    {
                      "title": "28/06/2021 to 03/07/2021",
                      "href": "/docs/timetable_2806_0307-min.pdf"
                    },
                    {
                      "title": "21/06/2021 to 26/06/2021",
                      "href": "/docs/timetable_2106_2606-min.pdf"
                    },
                    {
                      "title": "14/06/2021 to 19/06/2021",
                      "href": "/docs/timetable_1406_1906-compressed.pdf"
                    },
                    {
                      "title": "07/06/2021 to 12/06/2021",
                      "href": "/docs/timetable_0706_1206.pdf"
                    },
                    {
                      "title": "31/05/2021 to 05/06/2021",
                      "href": "/docs/timetable_3105_0506_1.pdf"
                    },
                    {
                      "title": "24/05/2021 to 29/05/2021",
                      "href": "/docs/timetable_2405_2905_1.pdf"
                    },
                    {
                      "title": "10/05/2021 to 15/05/2021",
                      "href": "/docs/timetable_1005_1505.pdf"
                    },
                    {
                      "title": "03/05/2021 to 08/05/2021",
                      "href": "/docs/timetable_0305_0805_1.pdf"
                    },
                    {
                      "title": "April 2021",
                      "href": "/docs/april2021_timetablefinal_3.pdf"
                    },
                    {
                      "title": "March 2021",
                      "href": "/docs/march_timetable.pdf"
                    },
                    {
                      "title": "February 2021",
                      "href": "/docs/february_timetable.pdf"
                    }
                  ]
                }
              ]
            },
            {
              "title": "Internal Assessment",
              "items": [
                {
                  "title": "Third internal Assessment",
                  "href": "/docs/third_internal_assessment_compressed.pdf"
                },
                {
                  "title": "Second Internal Assessment Schedule",
                  "href": "/docs/second_internal_assessment_.pdf"
                },
                {
                  "title": "First Internal Assessment Schedule",
                  "href": "/docs/internal_assessment_-_190721-.pdf"
                }
              ]
            },
            {
              "title": "University Exam",
              "items": [
                {
                  "title": "I MBBS supplementary practical examination Time Table",
                  "href": "/docs/supplementary_practical_examination.pdf"
                },
                {
                  "title": "Application for Supplementary Examinations",
                  "href": "/docs/application_for_supplementary.pdf"
                },
                {
                  "title": "Circular for I Year MBBS Supplementary Examinations March 2022",
                  "href": "/docs/mbbs_supli_20220210.pdf"
                },
                {
                  "title": "Time Table for I Year MBBS Supplementary Theory & Practical Examinations March 2022",
                  "href": "/docs/mbbs_march_20220210.pdf"
                },
                {
                  "title": "Revaluation/Photocopy of MBBS Theory Examinations January 2022",
                  "href": "/docs/20220208193840.pdf"
                },
                {
                  "title": "Revaluation application form",
                  "href": "/docs/re_val_application_form.pdf"
                },
                {
                  "title": "Time Table for I Year MBBS Practical Examinations January 2022",
                  "href": "/docs/practical_time_table_1st_mbbs_examination.pdf"
                },
                {
                  "title": "Time Table for I Year MBBS Theory Examinations January 2022",
                  "href": "/docs/mbbs_time_table-min.pdf"
                }
              ]
            }
          ]
        },
        null,
        null,
        null
      ]
    }
  ]
};
