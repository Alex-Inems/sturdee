import { SKILLS, skillBookingServiceName } from "@/lib/skills";

/** Booking options — each skill is a bookable 1:1 session. */
export const BOOKING_SERVICES = SKILLS.map((skill) => ({
    id: skill.id,
    name: skillBookingServiceName(skill),
    duration: "60 min",
    description: skill.blurb,
})) as readonly {
    id: string;
    name: string;
    duration: string;
    description: string;
}[];

export const TIME_SLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
];

/** Default admin email — gets admin role on first sign-up. Override in Supabase or SQL. */
export const DEFAULT_ADMIN_EMAIL = "admin@sturdee.online";
