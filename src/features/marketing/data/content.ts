import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  GraduationCap,
  Heart,
  Home,
  Mic,
  MessageSquareText,
  Presentation,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react"

/**
 * Placeholder page content. Bracketed values are for the client to fill in;
 * in phase 6 this content becomes editable from Admin → Settings.
 */

export type FaqItem = { question: string; answer: string }
export type Tone = "coral" | "saffron" | "navy" | "white" | "cream"
export type FeatureItem = { icon: LucideIcon; title: string; description: string; tone: Tone }

export const homeFaqs: FaqItem[] = [
  {
    question: "Who are these classes for?",
    answer:
      "Anyone aged 16 and above who understands basic English but feels stuck when it is time to speak. Our students are college students, job seekers, working professionals and homemakers. If you can read this page, you are ready to join.",
  },
  {
    question: "Can I attend a trial class first?",
    answer:
      "Yes. Your first class is a free demo. Sit in with a running batch, meet the trainer, and decide only after that. There is no fee and no obligation to join.",
  },
  {
    question: "What are the fees and how do I pay?",
    answer:
      "The fee is ₹3,000 per month, paid at the start of each month. The full course runs for 3 months. There is no registration fee, and study material is included. We accept UPI, card and cash.",
  },
  {
    question: "What happens if I miss a class?",
    answer:
      "Let us know in advance and you can attend the same lesson in another batch that week. Every class also ends with a short practice task, so you can catch up on what you missed.",
  },
  {
    question: "Where are the classes held?",
    answer:
      "All classes run in person at our classroom. You will find the full address, landmark and map on the Contact page, and we share directions on WhatsApp once you enquire.",
  },
]

export const courseFaqs: FaqItem[] = [
  {
    question: "Which batch should I choose?",
    answer:
      "Pick the timing you can attend every week without fail. Morning suits students, Evening suits working professionals, and Weekend suits anyone with a busy weekday. Not sure about your level? We do a 5-minute speaking check when you call.",
  },
  {
    question: "Do I need any prior English knowledge?",
    answer:
      "You should be able to read simple English and understand basic sentences. You do not need to speak well yet. That is what the course is for.",
  },
  {
    question: "Will I get study material?",
    answer:
      "Yes. You get a printed workbook on day one, plus weekly worksheets and speaking tasks. Everything is included in the course fee.",
  },
]

export const contactFaqs: FaqItem[] = [
  {
    question: "Can I visit before joining?",
    answer:
      "Yes, and we recommend it. Come in during opening hours to see the classroom, or book a free demo class and sit in with a running batch before you decide.",
  },
  {
    question: "Is parking available nearby?",
    answer:
      "Two-wheeler parking is available in the building. For cars, there is paid parking on FC Road. Deccan Gymkhana bus stop and Deccan metro station are a short walk away.",
  },
  {
    question: "What should I bring to the first class?",
    answer:
      "Just a notebook, a pen and a photo ID for registration. Your printed workbook is handed to you in class, and the first month's fee can be paid by UPI, card or cash.",
  },
]

export const benefits: FeatureItem[] = [
  { icon: Mic, tone: "coral", title: "Speak from day one", description: "Practise conversations out loud with real people, not just tap through an app." },
  { icon: MessageSquareText, tone: "saffron", title: "Corrected in the moment", description: "Your teacher hears your pronunciation and grammar and helps you fix it right away." },
  { icon: CalendarCheck, tone: "navy", title: "A routine that sticks", description: "Fixed days and timings turn learning English into a weekly habit." },
  { icon: Users, tone: "white", title: "Learn with peers", description: "A small group gives you practice partners and makes it easier to stop hesitating." },
]

export type AudienceItem = FeatureItem & {
  /** Situations this learner practises in class. */
  practise: string[]
  /** Batch that usually suits this learner. */
  batch: string
}

export const audiences: AudienceItem[] = [
  {
    icon: GraduationCap,
    tone: "coral",
    title: "Students & freshers",
    description: "Speak up in class, hold your own in group discussions and walk into campus interviews prepared.",
    practise: ["Group discussions", "Self-introduction & interviews", "Class presentations"],
    batch: "Morning Batch",
  },
  {
    icon: Briefcase,
    tone: "saffron",
    title: "Working professionals",
    description: "Talk to clients, managers and your team without translating every sentence in your head first.",
    practise: ["Meetings & status updates", "Client and team calls", "Small talk at work"],
    batch: "Evening Batch",
  },
  {
    icon: Home,
    tone: "navy",
    title: "Everyday learners",
    description: "Homemakers and anyone who wants to handle the bank, a school meeting or a trip abroad in English, calmly.",
    practise: ["Shopping & travel", "School and bank visits", "Phone conversations"],
    batch: "Weekend Batch",
  },
]

export const modules = [
  { title: "[MODULE 1]", description: "e.g. Everyday conversation basics", tone: "coral" },
  { title: "[MODULE 2]", description: "e.g. Grammar you actually use when speaking", tone: "saffron" },
  { title: "[MODULE 3]", description: "e.g. Vocabulary and pronunciation practice", tone: "navy" },
  { title: "[MODULE 4]", description: "e.g. Speaking with confidence in real situations", tone: "white" },
] as const satisfies readonly { title: string; description: string; tone: Tone }[]

export const classSteps = [
  {
    title: "Warm-up talk",
    time: "15 min",
    description: "Everyone speaks in the first few minutes: a quick question, a story from your day, a short pair chat.",
    tone: "cream",
  },
  {
    title: "One new skill",
    time: "20 min",
    description: "A single language point, explained simply with examples you will actually use that week.",
    tone: "saffron",
  },
  {
    title: "Speak and get feedback",
    time: "55 min",
    description: "Role-plays, pair work and group discussions, with the trainer correcting pronunciation and grammar as you go.",
    tone: "navy",
  },
] as const satisfies readonly { title: string; time: string; description: string; tone: Tone }[]

export const values: FeatureItem[] = [
  { icon: Heart, tone: "coral", title: "Patience with beginners", description: "No question is too basic. You will never be laughed at for a mistake in this classroom." },
  { icon: Mic, tone: "saffron", title: "More speaking, less lecturing", description: "Most of every class is you talking, not the trainer. That is how confidence is built." },
  { icon: Target, tone: "navy", title: "Progress you can feel", description: "A short speaking check every month, so you can hear for yourself how far you have come." },
]

export const teacherCredentials = [
  { title: "CELTA certified", description: "Cambridge English teaching qualification" },
  { title: "9+ years of teaching", description: "Classroom batches and corporate communication training" },
  { title: "Spoken English & interviews", description: "Fluency, pronunciation and interview preparation" },
]

export const feeIncludes = [
  "36 classroom sessions over 12 weeks",
  "Printed study material and worksheets",
  "Completion certificate",
  "A free demo class before you pay",
]

export const feeFacts = [
  { label: "Monthly fee", value: "₹3,000", note: "paid at the start of each month" },
  { label: "Course length", value: "3 months", note: "12 weeks, 36 classes" },
]

export const nextSteps = [
  { title: "We get in touch", description: "We call you back within 2 hours during opening hours." },
  { title: "Find your batch", description: "A quick 5-minute speaking check, then we suggest the level and timing that suit you." },
  { title: "Start speaking", description: "Attend your free demo class, then join the next batch." },
]

export type GalleryItem = {
  label: string
  caption: string
  icon: LucideIcon
  tone: "navy" | "saffron" | "coral" | "cream"
  image: string
  className: string
}

export const galleryItems: GalleryItem[] = [
  // Designed tiles stand in until real classroom photos are added (set `image` to a /public path).
  { label: "Main classroom", caption: "Seats 12, set up for conversation", icon: Users, tone: "navy", image: "", className: "sm:row-span-2" },
  { label: "Group discussions", caption: "Evening Batch", icon: MessageSquareText, tone: "saffron", image: "", className: "" },
  { label: "Mock interviews", caption: "Students & freshers", icon: Briefcase, tone: "coral", image: "", className: "" },
  { label: "Presentation day", caption: "End of every month", icon: Presentation, tone: "cream", image: "", className: "sm:col-span-2" },
]

export const marqueeWords = ["Speak", "Listen", "Read", "Write", "Practise", "Repeat"]

export const courseIcon = BookOpen
