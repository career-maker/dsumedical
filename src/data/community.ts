import type { IconName } from "./iconMeta";

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
    { photo: "community-1", alt: "Doctor checking an elderly patient's blood pressure" },
    { photo: "community-2", alt: "Villagers gathered at a health awareness camp" },
    { photo: "community-3", alt: "Patients waiting at a free medical camp" },
    { photo: "community-4", alt: "Doctor attending patients beside a mobile health bus" },
  ],
};
