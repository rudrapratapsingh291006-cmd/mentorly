export function generateUpcomingSlots(baseDate = new Date()): string[] {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slots: string[] = [];
  const times = ["10:00 AM", "02:30 PM", "04:00 PM", "11:15 AM", "05:30 PM"];

  // Generate slots for upcoming 5 days (skipping weekends if desired or providing realistic availability)
  let dayOffset = 1;
  let timeIndex = 0;

  while (slots.length < 5) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + dayOffset);

    // Prefer weekdays for office hours
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const dayName = days[d.getDay()];
      const monthName = months[d.getMonth()];
      const dateNum = String(d.getDate()).padStart(2, "0");
      const timeStr = times[timeIndex % times.length];
      slots.push(`${dayName}, ${monthName} ${dateNum} · ${timeStr}`);
      timeIndex++;
    }
    dayOffset++;
  }

  return slots;
}

export interface Mentor {
  id: string;
  name: string;
  email?: string;
  password?: string;
  role: string;
  affiliation: string;
  location: string;
  domain: "Healthcare & Wellness" | "Sports & Fitness" | "Career & Tech" | "Finance & Legal" | "Life & Mindset";
  stageHelp: string;
  focus: string;
  rating: string;
  sessions: number;
  image: string;
  color: string;
  tag: string;
  expertise: string[];
  status?: "active" | "pending" | "paused";
}

export interface Booking {
  id: string;
  mentorName: string;
  mentorRole: string;
  founderName: string;
  startupName: string;
  slot: string;
  topic: string;
  notes: string;
  createdAt: string;
  status: "confirmed" | "completed" | "cancelled";
  meetingLink: string;
  mode?: "video" | "chat";
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  stage: "Idea Validation" | "Prototype / MVP" | "Early Traction" | "Pre-Seed Funded";
  category: "AI & SaaS" | "FinTech" | "HealthTech" | "ClimateTech" | "EdTech" | "Hardware";
  founders: string;
  collegeCohort: string;
  pitchSummary: string;
  lookingFor: string[];
  metrics: { label: string; value: string };
  badgeColor: string;
  upvotes: number;
  pitchDeckUrl?: string;
  status: "approved" | "pending" | "rejected";
}

export interface MentorshipOffer {
  id: string;
  startupId: string;
  startupName: string;
  mentorRole: string;
  supportDetails: string;
  createdAt: string;
  status: "sent" | "reviewed";
}

const DEFAULT_MENTORS: Mentor[] = [
  {
    id: "mentor-elena",
    name: "Dr. Elena Rossi",
    role: "Clinical Specialist & Health Consultant",
    affiliation: "Consultant @ MedScale Health & Preventive Care",
    location: "Boston · EST",
    domain: "Healthcare & Wellness",
    stageHelp: "Preventive health, nutrition planning, chronic fatigue & diagnostic interpretation",
    focus: "Holistic Health, Preventive Medicine & Sleep Optimization",
    rating: "4.99",
    sessions: 215,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    color: "#1d2b23",
    tag: "Doctor & Health Consultant",
    expertise: ["General Wellness", "Lab Diagnostics", "Stress Management", "Nutrition"],
    status: "active",
  },
  {
    id: "mentor-marcus",
    name: "Marcus Vance",
    role: "Elite Sports Performance Coach & Kinesiologist",
    affiliation: "High Performance Athletics & Strength Conditioning",
    location: "New York · EST",
    domain: "Sports & Fitness",
    stageHelp: "Custom hypertrophy / fat loss regimens, injury recovery, endurance pacing",
    focus: "Athletic Conditioning, Injury Rehabilitation & Strength Training",
    rating: "4.98",
    sessions: 180,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    color: "#2b2321",
    tag: "Strength & Sports Coach",
    expertise: ["Biomechanics", "Endurance Training", "Post-Injury Rehab", "Body Recomp"],
    status: "active",
  },
  {
    id: "mentor-samira",
    name: "Samira Chen",
    role: "Senior Engineering Manager & Career Consultant",
    affiliation: "Ex-Google / Tech Leadership Advisor",
    location: "San Francisco · PST",
    domain: "Career & Tech",
    stageHelp: "Career transition roadmaps, resume teardowns, software architecture, technical interviews",
    focus: "Career Growth, System Design & Promotion Navigation",
    rating: "4.98",
    sessions: 194,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    color: "#1d2520",
    tag: "Tech & Career Advisor",
    expertise: ["Career Transition", "System Design", "Leadership", "Salary Negotiation"],
    status: "active",
  },
  {
    id: "mentor-jordan",
    name: "Jordan Alvarez",
    role: "Chartered Financial Planner & Tax Strategist",
    affiliation: "Personal Wealth Advisory & Business Tax Solutions",
    location: "Austin · CST",
    domain: "Finance & Legal",
    stageHelp: "Personal budgeting, debt clearance, side-income tax planning, investment portfolios",
    focus: "Financial Literacy, Tax Efficiency & Wealth Building",
    rating: "4.96",
    sessions: 142,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    color: "#20272b",
    tag: "Financial Consultant",
    expertise: ["Budgeting & Debt", "Tax Optimization", "Retirement Prep", "Freelance Finances"],
    status: "active",
  },
  {
    id: "mentor-maya",
    name: "Maya Lin",
    role: "Mindset & Life Strategy Coach",
    affiliation: "Certified Behavioral Coach & Mindfulness Consultant",
    location: "Chicago · CST",
    domain: "Life & Mindset",
    stageHelp: "Work-life balance, beating burnout, habit formation, high-stakes decision making",
    focus: "Productivity Habits, Mental Clarity & Life Transitions",
    rating: "4.95",
    sessions: 168,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    color: "#281f2b",
    tag: "Mindset Consultant",
    expertise: ["Burnout Recovery", "Habit Architecture", "Emotional Resilience", "Time Management"],
    status: "active",
  },
];

const DEFAULT_STARTUPS: Startup[] = [
  {
    id: "lumina-ai",
    name: "Lumina Intelligence",
    tagline: "Autonomous diagnostic assist tool for understaffed rural clinics",
    stage: "Prototype / MVP",
    category: "HealthTech",
    founders: "Aarav Sharma & Priya Nair (Final Year B.Tech)",
    collegeCohort: "Class of 2026 · Batch 4 Ventures",
    pitchSummary: "Combining lightweight vision models on edge tablets to screen retinal scans offline with 94.2% diagnostic accuracy.",
    lookingFor: ["Clinical Validation Mentors", "Angel Investors", "Hardware Engineer"],
    metrics: { label: "Pilot Clinics", value: "8 Active" },
    badgeColor: "#1d2b23",
    upvotes: 84,
    status: "approved",
  },
  {
    id: "campus-pay",
    name: "DormPay",
    tagline: "Split-ledger & micro-rewards ecosystem tailored for university campuses",
    stage: "Early Traction",
    category: "FinTech",
    founders: "Rohan Varma & Kevin Patel (Sophomore CS)",
    collegeCohort: "Class of 2027 · Campus Seed Grantee",
    pitchSummary: "Zero-fee peer micropayments built on campus ID cards and UPI, powering 45+ cafeteria stalls and laundromats.",
    lookingFor: ["FinTech Compliance Advisor", "Growth Marketer", "Pre-Seed VC"],
    metrics: { label: "Monthly Volume", value: "$42,000" },
    badgeColor: "#2b2321",
    upvotes: 112,
    status: "approved",
  },
  {
    id: "synapse-flow",
    name: "EcoMesh",
    tagline: "Smart IoT mesh network reducing university campus HVAC consumption",
    stage: "Pre-Seed Funded",
    category: "ClimateTech",
    founders: "Tanvi Deshmukh (PhD Candidate) & Team",
    collegeCohort: "Alumni Venture Cohort '25",
    pitchSummary: "Predictive micro-climate scheduling algorithms reducing energy waste in lecture halls by 31.4% annually.",
    lookingFor: ["Institutional Enterprise Sales Mentor", "Series Seed Leads"],
    metrics: { label: "Energy Cut", value: "-31.4%" },
    badgeColor: "#20272b",
    upvotes: 95,
    status: "approved",
  },
  {
    id: "dev-sprint",
    name: "PromptDesk",
    tagline: "AI agent orchestrator that automates grading and feedback for programming labs",
    stage: "Prototype / MVP",
    category: "EdTech",
    founders: "Devika Sen (Junior IT)",
    collegeCohort: "Class of 2027 · Hackathon Grand Prize",
    pitchSummary: "Generates semantic error breakdowns and tailored hints without hallucinating solutions, adopted by 3 university departments.",
    lookingFor: ["EdTech GTM Strategist", "Technical Co-founder"],
    metrics: { label: "Submissions Graded", value: "14.8k+" },
    badgeColor: "#241f2b",
    upvotes: 68,
    status: "approved",
  },
  {
    id: "agri-vision",
    name: "KisanDrone",
    tagline: "Ultra-low-cost multispectral UAVs for smallholder soil health analysis",
    stage: "Idea Validation",
    category: "Hardware",
    founders: "Vikram Reddy & Ananya Joshi (Mechanical Eng.)",
    collegeCohort: "Class of 2026 · Innovation Lab Grant",
    pitchSummary: "Designing 3D-printed modular drones that reduce aerial survey costs by 70% compared to commercial DJI equipment.",
    lookingFor: ["Robotics Mentor", "Agriculture Department Partners", "Seed Angel"],
    metrics: { label: "Cost Reduction", value: "70%" },
    badgeColor: "#2b261e",
    upvotes: 51,
    status: "approved",
  },
  {
    id: "hyper-route",
    name: "HyperRoute",
    tagline: "Predictive freight optimization for decentralized intracity courier fleets",
    stage: "Early Traction",
    category: "AI & SaaS",
    founders: "Siddharth Jain (Senior Data Science)",
    collegeCohort: "Class of 2026 · Venture Wing",
    pitchSummary: "Real-time dispatch dynamic routing reducing last-mile deadhead miles by 24% for local delivery partnerships.",
    lookingFor: ["Supply Chain Veteran", "Seed Round Angels"],
    metrics: { label: "Active Couriers", value: "180+" },
    badgeColor: "#1d2520",
    upvotes: 77,
    status: "approved",
  },
];

function getDefaultBookings(): Booking[] {
  const dynamicSlots = generateUpcomingSlots();
  return [
    {
      id: "booking-1",
      mentorName: "Marcus Vance",
      mentorRole: "Principal @ Horizon Ventures & Angel Syndicate",
      founderName: "Rohan Varma",
      startupName: "DormPay",
      slot: dynamicSlots[0] || "Tomorrow · 10:00 AM",
      topic: "Seed Cap Table Modeling & Venture Pitch Deck",
      notes: "Review our 45 pilot campus merchant agreement and investor cap table split.",
      createdAt: new Date().toISOString().split("T")[0],
      status: "confirmed",
      meetingLink: "/call/room-mv-office-hours?topic=Seed%20Cap%20Table%20Modeling%20%26%20Venture%20Pitch%20Deck",
    },
    {
      id: "booking-2",
      mentorName: "Samira Chen",
      mentorRole: "Founder & Former CEO @ CloudSync",
      founderName: "Rohan Varma",
      startupName: "DormPay",
      slot: dynamicSlots[1] || "Friday · 04:00 PM",
      topic: "Customer Discovery & First 100 Users",
      notes: "B2B sales strategy for collegiate dining vendors.",
      createdAt: new Date().toISOString().split("T")[0],
      status: "confirmed",
      meetingLink: "/call/room-sc-office-hours?topic=Customer%20Discovery%20%26%20First%20100%20Users",
    },
  ];
}

const DEFAULT_OFFERS: MentorshipOffer[] = [
  {
    id: "offer-1",
    startupId: "campus-pay",
    startupName: "DormPay",
    mentorRole: "Former VP Fintech @ Square",
    supportDetails: "Can help review payment rails compliance and sponsor 2 pilot cafeterias.",
    createdAt: "2026-09-25",
    status: "sent",
  },
];

const STORAGE_KEYS = {
  MENTORS: "crestconnect_mentors",
  STARTUPS: "crestconnect_startups",
  BOOKINGS: "crestconnect_bookings",
  OFFERS: "crestconnect_offers",
  SAVED_MENTORS: "crestconnect_saved_mentors",
  UPVOTES: "crestconnect_upvotes",
  VOTED: "crestconnect_voted",
  LOGGED_IN_MENTOR: "crestconnect_logged_in_mentor",
};

export function getLoggedInMentor(): Mentor | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGGED_IN_MENTOR);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setLoggedInMentor(mentor: Mentor | null): void {
  try {
    if (mentor) {
      localStorage.setItem(STORAGE_KEYS.LOGGED_IN_MENTOR, JSON.stringify(mentor));
    } else {
      localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_MENTOR);
    }
  } catch (e) {
    console.error(e);
  }
}

export function deleteMentorAccount(mentorId: string): void {
  const mentors = getStoredMentors();
  const next = mentors.filter((m) => m.id !== mentorId);
  saveMentors(next);
  setLoggedInMentor(null);
}

export function getStoredMentors(): Mentor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENTORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(DEFAULT_MENTORS));
      return DEFAULT_MENTORS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MENTORS;
  }
}

export function saveMentors(mentors: Mentor[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(mentors));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredStartups(): Startup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STARTUPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(DEFAULT_STARTUPS));
      return DEFAULT_STARTUPS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STARTUPS;
  }
}

export function saveStartups(startups: Startup[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STARTUPS, JSON.stringify(startups));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      const def = getDefaultBookings();
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw);
  } catch {
    return getDefaultBookings();
  }
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt" | "meetingLink">): Booking {
  const current = getStoredBookings();
  const id = `booking-${Date.now()}`;
  const roomCode = Math.random().toString(36).substring(2, 8);
  const isChat = booking.mode === "chat";
  const meetingLink = isChat
    ? `/messages?topic=${encodeURIComponent(booking.topic)}`
    : `/call/room-${roomCode}?topic=${encodeURIComponent(booking.topic)}`;

  const newBooking: Booking = {
    ...booking,
    id,
    createdAt: new Date().toISOString().split("T")[0],
    meetingLink,
  };
  const updated = [newBooking, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking["status"]): void {
  const current = getStoredBookings();
  const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function deleteBooking(id: string): void {
  const current = getStoredBookings();
  const updated = current.filter((b) => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredOffers(): MentorshipOffer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(DEFAULT_OFFERS));
      return DEFAULT_OFFERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_OFFERS;
  }
}

export function addMentorshipOffer(offer: Omit<MentorshipOffer, "id" | "createdAt" | "status">): MentorshipOffer {
  const current = getStoredOffers();
  const newOffer: MentorshipOffer = {
    ...offer,
    id: `offer-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
    status: "sent",
  };
  const updated = [newOffer, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return newOffer;
}

export function getSavedMentors(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_MENTORS);
    return raw ? JSON.parse(raw) : ["Samira Chen"];
  } catch {
    return [];
  }
}

export function toggleSaveMentor(name: string): string[] {
  const current = getSavedMentors();
  const next = current.includes(name) ? current.filter((n) => n !== name) : [...current, name];
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_MENTORS, JSON.stringify(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}
