import type { IconName } from "../iconMeta";

export const community = {
  intro:
    "Healthcare at CDSIMER extends beyond hospital walls through medical camps, health awareness programs, preventive screenings, and rural outreach initiatives that improve the well-being of surrounding communities.",
  items: [
    { icon: "c-heart", strong: "200+", inline: " Surrounding", rest: "Villages Served" },
    { icon: "c-camp", strong: "Free Medical Camps &", rest: "Health Screenings" },
    { icon: "c-women", strong: "Women's & Child", rest: "Health Programs" },
    { icon: "c-school", strong: "School & Industrial", rest: "Health Awareness Sessions" },
    { icon: "c-rural", strong: "Rural & Urban Community", rest: "Healthcare Initiatives" },
    { icon: "c-prev", strong: "Preventive Care &", rest: "Early Disease Detection" },
  ] as { icon: IconName; strong: string; inline?: string; rest: string }[],
  photos: [
    { photo: "home-community-1", alt: "Doctor taking a blood sample from a patient" },
    { photo: "home-community-2", alt: "Doctors and students attending patients at a community health camp" },
    { photo: "home-community-3", alt: "Doctors and students reviewing scans on a computer" },
    { photo: "home-community-4", alt: "Medical students and a doctor working together at a laptop" },
  ],
};
