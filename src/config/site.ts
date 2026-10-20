/**
 * Fallback site content.
 * Bracketed values are placeholders — in phase 6 these move to the database
 * (Admin → Settings) so the client can edit them without touching code.
 */
export const siteConfig = {
  name: "Confident English",
  /** Short mark used in the logo badge. */
  monogram: "CE",
  shortDescription:
    "Small-group spoken English classes in Shivajinagar, Pune. Learn by speaking, in a real classroom, with a trainer who corrects you as you go.",
  tagline: "Speak English with confidence, face to face.",
  teacherName: "Neha Kapoor",
  teacher: {
    role: "Lead Trainer & Founder",
    credential: "CELTA certified",
    credentialBody: "Cambridge English",
    intro:
      "Neha has spent nine years helping students, homemakers and working professionals get past the fear of speaking English. Before starting the institute, Neha trained customer-support teams in corporate offices. Classes are practical and patient: short explanations, lots of speaking, and honest feedback on every attempt.",
    quote: "Nobody learns to speak by staying quiet. My job is to make the classroom the safest place to make mistakes.",
    stats: [
      { value: "9+", label: "Years teaching" },
      { value: "1,200+", label: "Students trained" },
      { value: "4.9", label: "Average rating" },
    ],
  },
  city: "Shivajinagar, Pune",
  contact: {
    // Dummy contact details. Replace with the client's real ones before launch.
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "hello@confidentenglish.in",
    address: "2nd Floor, Shanti Plaza, FC Road, Shivajinagar, Pune 411005",
    addressShort: "Shanti Plaza, FC Road",
    landmark: "Opposite Fergusson College main gate",
    hours: "Mon – Sat · 8:00 AM – 8:00 PM",
    responseTime: "Usually replies within 2 hours",
    mapUrl: "",
  },
  course: {
    name: "Confident English Programme",
    description:
      "A 12-week classroom course for students and working professionals who understand English but hesitate to speak it. Every class is built around speaking: role-plays, group discussions and real-life situations, with personal feedback from the trainer.",
    level: "Beginner to Intermediate",
    duration: "12 weeks",
    totalClasses: "36 classes in total",
    classesPerWeek: "3 classes / week",
    classLength: "90 minutes each",
    classSize: "12",
    location: "In-person classroom",
    fee: "₹8,500",
    feeNote: "Pay in full, or in 2 instalments",
    feeIncludes: ["Study material", "Completion certificate"],
    outcomes: [
      "Hold a 10-minute conversation without switching to Hindi",
      "Speak in interviews, meetings and presentations",
      "Fix common grammar and pronunciation mistakes",
    ],
  },
  introVideo: {
    url: "",
    length: "[VIDEO LENGTH]",
  },
  social: [
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
    { label: "Facebook", href: "" },
  ],
} as const

export type SiteConfig = typeof siteConfig
