import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  GraduationCap,
  Heart,
  Home,
  Mic,
  MessageSquareText,
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
      "The full 12-week course is ₹8,500. You can pay it at once, or in two instalments: half when you join and half after six weeks. We accept UPI, card and cash.",
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
  { question: "Which batch should I choose?", answer: "[ANSWER — how to pick a batch by level and timing.]" },
  { question: "Do I need any prior English knowledge?", answer: "[ANSWER — the starting level you accept.]" },
  { question: "Will I get study material?", answer: "[ANSWER — books, worksheets or notes provided.]" },
]

export const contactFaqs: FaqItem[] = [
  { question: "Can I visit before joining?", answer: "[ANSWER — visiting or trial class policy.]" },
  { question: "Is parking available nearby?", answer: "[ANSWER — parking or public transport.]" },
  { question: "What should I bring to the first class?", answer: "[ANSWER — notebook, documents, fees.]" },
]

export const benefits: FeatureItem[] = [
  { icon: Mic, tone: "coral", title: "Speak from day one", description: "Practise conversations out loud with real people, not just tap through an app." },
  { icon: MessageSquareText, tone: "saffron", title: "Corrected in the moment", description: "Your teacher hears your pronunciation and grammar and helps you fix it right away." },
  { icon: CalendarCheck, tone: "navy", title: "A routine that sticks", description: "Fixed days and timings turn learning English into a weekly habit." },
  { icon: Users, tone: "white", title: "Learn with peers", description: "A small group gives you practice partners and makes it easier to stop hesitating." },
]

export const audiences: FeatureItem[] = [
  { icon: GraduationCap, tone: "coral", title: "[AUDIENCE 1]", description: "e.g. Students preparing for college or exams" },
  { icon: Briefcase, tone: "saffron", title: "[AUDIENCE 2]", description: "e.g. Working professionals who want to speak at work" },
  { icon: Home, tone: "navy", title: "[AUDIENCE 3]", description: "e.g. Anyone who wants confidence in everyday English" },
]

export const modules = [
  { title: "[MODULE 1]", description: "e.g. Everyday conversation basics", tone: "coral" },
  { title: "[MODULE 2]", description: "e.g. Grammar you actually use when speaking", tone: "saffron" },
  { title: "[MODULE 3]", description: "e.g. Vocabulary and pronunciation practice", tone: "navy" },
  { title: "[MODULE 4]", description: "e.g. Speaking with confidence in real situations", tone: "white" },
] as const satisfies readonly { title: string; description: string; tone: Tone }[]

export const classSteps = [
  { title: "[STEP 1]", description: "e.g. Warm-up conversation to get everyone talking", tone: "cream" },
  { title: "[STEP 2]", description: "e.g. A new language point, explained simply", tone: "saffron" },
  { title: "[STEP 3]", description: "e.g. Pair and group speaking practice with feedback", tone: "navy" },
] as const satisfies readonly { title: string; description: string; tone: Tone }[]

export const values: FeatureItem[] = [
  { icon: Heart, tone: "coral", title: "[VALUE 1]", description: "e.g. Patience with every beginner" },
  { icon: Mic, tone: "saffron", title: "[VALUE 2]", description: "e.g. More speaking, less lecturing" },
  { icon: Target, tone: "navy", title: "[VALUE 3]", description: "e.g. Clear progress you can feel" },
]

export const teacherCredentials = [
  { title: "[QUALIFICATION]", description: "e.g. Degree or certification" },
  { title: "[TEACHING EXPERIENCE]", description: "e.g. Years and type of teaching" },
  { title: "[SPECIALISATION]", description: "e.g. Spoken English, interview preparation" },
]

export const feeIncludes = ["[WHAT'S INCLUDED — item 1]", "[WHAT'S INCLUDED — item 2]", "[WHAT'S INCLUDED — item 3]"]

export const nextSteps = [
  { title: "We get in touch", description: "We call you back [RESPONSE TIME — e.g. within one working day]." },
  { title: "Find your batch", description: "We help you choose a level and timing that suits you." },
  { title: "Start speaking", description: "Join your batch from [START DATE] and attend your first class." },
]

export const galleryItems = [
  { label: "CLASSROOM PHOTO 1", caption: "[CAPTION]", className: "sm:row-span-2" },
  { label: "CLASSROOM PHOTO 2", caption: "[CAPTION]", className: "" },
  { label: "CLASSROOM PHOTO 3", caption: "[CAPTION]", className: "" },
  { label: "CLASSROOM PHOTO 4", caption: "[CAPTION]", className: "sm:col-span-2" },
]

export const marqueeWords = ["Speak", "Listen", "Read", "Write", "Practise", "Repeat"]

export const courseIcon = BookOpen
