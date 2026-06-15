export const BOOKING_SERVICES = [
    {
        id: "consultation",
        name: "Course Consultation",
        duration: "30 min",
        description: "Discuss programs and find the right learning path for your goals.",
    },
    {
        id: "campus-tour",
        name: "Virtual Campus Tour",
        duration: "45 min",
        description: "Explore our platform, faculty, and student experience with a guide.",
    },
    {
        id: "admissions",
        name: "Admissions Interview",
        duration: "60 min",
        description: "Formal admissions session with our enrollment team.",
    },
    {
        id: "tutoring",
        name: "One-on-One Tutoring",
        duration: "60 min",
        description: "Personalized session with an expert instructor in your subject area.",
    },
] as const;

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
export const DEFAULT_ADMIN_EMAIL = "admin@stwedy.com";
