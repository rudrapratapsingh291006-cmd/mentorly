import { ArrowLeft, ArrowUpRight, Calendar, Check, CheckCircle2, Clock, Filter, Heart, MessageSquare, Search, SlidersHorizontal, Sparkles, Star, Users, Video, X } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Mentor, addBooking, generateUpcomingSlots, getSavedMentors, getStoredMentors, toggleSaveMentor } from "@/lib/appStore";
import { toast } from "sonner";

export default function Directory() {
  const [mentorList, setMentorList] = useState<Mentor[]>([]);
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("All Domains");
  const [saved, setSaved] = useState<string[]>([]);
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  
  // Real dynamic slots computed relative to today's date
  const availableSlots = useMemo(() => generateUpcomingSlots(), []);
  const [bookingSlot, setBookingSlot] = useState(availableSlots[0] || "");
  const [bookingTopic, setBookingTopic] = useState("Pitch Deck & Business Model Review");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setMentorList(getStoredMentors().filter((m) => m.status !== "paused"));
    setSaved(getSavedMentors());
  }, []);

  const handleToggleSave = (name: string) => {
    const next = toggleSaveMentor(name);
    setSaved(next);
    if (next.includes(name)) {
      toast.success(`Saved ${name} to your shortlisted mentors!`);
    } else {
      toast.info(`Removed ${name} from shortlisted mentors.`);
    }
  };

  const handleConfirmBooking = () => {
    if (!bookingMentor) return;
    addBooking({
      mentorName: bookingMentor.name,
      mentorRole: bookingMentor.role,
      founderName: "Rohan Varma",
      startupName: "DormPay",
      slot: bookingSlot,
      topic: bookingTopic,
      notes: bookingNotes || "Campus pitch review & office hours guidance",
      status: "confirmed",
    });
    setBookingSuccess(true);
    toast.success(`Office hours with ${bookingMentor.name} booked successfully!`);
  };

  const domains = ["All Domains", "AI & SaaS", "FinTech", "HealthTech", "ClimateTech", "General"];

  const filtered = useMemo(() => {
    return mentorList.filter((m) => {
      const matchQuery =
        `${m.name} ${m.role} ${m.focus} ${m.stageHelp} ${m.affiliation}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchDomain =
        activeDomain === "All Domains" || m.domain === activeDomain;
      return matchQuery && matchDomain;
    });
  }, [mentorList, query, activeDomain]);

  return (
    <div className="min-h-screen bg-[#0b0c0c] text-[#f9f6ef]">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between py-5 border-b border-[#262a28]">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white">
              c
            </span>
            <span className="text-lg font-semibold tracking-[-.04em]">
              CrestConnect<span className="text-[#ef765e]">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/startups" className="hidden text-sm font-medium text-[#a6aba6] hover:text-white sm:block">
              Campus Startups
            </Link>
            <Link href="/admin" className="hidden text-sm font-medium text-[#ef765e] hover:underline sm:block">
              Admin Portal
            </Link>
            <Link
              href="/login/mentor"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:block"
            >
              Become an Alumni Mentor
            </Link>
            <Link
              href="/login/learner"
              className="rounded-full bg-[#ef765e] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#e9654c]"
            >
              Founder Sign In
            </Link>
          </div>
        </header>

        {/* Directory Hero */}
        <div className="py-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#8d9690] hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
              </Link>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">
                Venture Mentorship Directory
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-6xl leading-[.95] tracking-[-.06em]">
                Meet founders who have<br />
                <span className="text-[#ef765e]">built what you want to build.</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#a6aba6]">
              1-on-1 office hours with alumni startup founders, early-stage investors, and technical architects ready to review your college venture.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-[#262a28] bg-[#151717] p-3 shadow-lg md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8d9690]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by topic, e.g. “Cap tables”, “YC application”, “Pricing”, “Clinical trials”"
                className="h-12 w-full rounded-xl bg-[#0b0c0c] pl-12 pr-4 text-sm outline-none placeholder:text-[#8d9690] focus:ring-2 focus:ring-[#ef765e]/30"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#8d9690] hidden lg:block">FILTER:</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {domains.map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setActiveDomain(dom)}
                    className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                      activeDomain === dom
                        ? "bg-[#ef765e] text-white"
                        : "border border-[#303333] bg-[#0b0c0c] text-[#a6aba6] hover:text-white"
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid gap-6 pb-24 lg:grid-cols-3">
          {filtered.map((mentor) => (
            <article
              key={mentor.name}
              className="group flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[#262a28] bg-[#151717] transition hover:-translate-y-1 hover:border-[#ef765e]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,.5)]"
            >
              <div>
                {/* Header Image & Tags */}
                <div className="relative p-3" style={{ backgroundColor: mentor.color }}>
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="aspect-[1.2] w-full rounded-[1.2rem] object-cover object-center"
                  />
                  <span className="absolute left-6 top-6 rounded-full bg-black/75 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#ef765e] backdrop-blur border border-white/10">
                    {mentor.tag}
                  </span>
                  <button
                    onClick={() => handleToggleSave(mentor.name)}
                    className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full bg-black/75 text-white backdrop-blur hover:bg-black"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        saved.includes(mentor.name)
                          ? "fill-[#ef765e] text-[#ef765e]"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#ef765e] transition">
                        {mentor.name}
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-[#ef765e]">
                        {mentor.affiliation}
                      </p>
                      <p className="mt-1 text-xs text-[#a6aba6]">
                        {mentor.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-[#0b0c0c] px-2 py-1 text-xs font-bold text-white">
                      <Star className="h-3.5 w-3.5 fill-[#ef765e] text-[#ef765e]" />
                      {mentor.rating}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#262a28] bg-[#0b0c0c] p-3 text-xs leading-relaxed text-[#c5cec3]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8d9690] block mb-1">
                      Helps Founders With:
                    </span>
                    <b className="text-white">{mentor.stageHelp}</b>
                    <p className="text-[#a6aba6] mt-1">{mentor.focus}</p>
                  </div>

                  {/* Expertise tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {mentor.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="rounded-md bg-[#1c211f] px-2 py-0.5 text-[10px] font-medium text-[#8d9690]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between text-xs text-[#8d9690] mb-4 border-t border-[#262a28] pt-3">
                  <span>{mentor.location}</span>
                  <span>{mentor.sessions} reviews</span>
                </div>
                <button
                  onClick={() => {
                    setBookingMentor(mentor);
                    setBookingSuccess(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ef765e] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#e9654c]"
                >
                  <Calendar className="h-3.5 w-3.5" /> Book Office Hours
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 rounded-3xl border border-dashed border-[#444848] p-16 text-center">
              <Sparkles className="mx-auto h-7 w-7 text-[#ef765e]" />
              <h3 className="mt-4 font-display text-2xl text-white">No mentor matches this filter</h3>
              <p className="mt-2 text-sm text-[#a6aba6]">
                Try selecting "All Domains" or search for broader keywords like &quot;pitch&quot;, &quot;GTM&quot;, or &quot;seed&quot;.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#303333] bg-[#151717] p-6 shadow-2xl">
            {bookingSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-[#74aa77]" />
                <h3 className="mt-4 font-display text-2xl font-bold text-white">Office Hours Confirmed!</h3>
                <p className="mt-2 text-sm text-[#c5cec3]">
                  Your 1-on-1 session with <b>{bookingMentor.name}</b> has been booked for <b>{bookingSlot}</b>.
                </p>
                <div className="mt-4 rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#8d9690]">
                  A calendar invite with the encrypted video room link has been added to your Founder Dashboard.
                </div>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/dashboard/learner"
                    className="rounded-full bg-[#ef765e] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#e9654c]"
                  >
                    Go to Founder Dashboard
                  </Link>
                  <button
                    onClick={() => setBookingMentor(null)}
                    className="rounded-full border border-[#303333] px-5 py-2.5 text-sm text-[#a6aba6] hover:bg-white/5"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={bookingMentor.image}
                      alt={bookingMentor.name}
                      className="h-12 w-12 rounded-full object-cover border border-[#ef765e]/30"
                    />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#ef765e]">
                        Book 1-on-1 Office Hours
                      </span>
                      <h3 className="font-display text-lg font-bold text-white">{bookingMentor.name}</h3>
                      <p className="text-xs text-[#8d9690]">{bookingMentor.affiliation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingMentor(null)}
                    className="rounded-full p-2 text-[#8d9690] hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#a6aba6]">Select Available Slot</label>
                      <span className="text-[10px] font-mono text-[#74aa77] bg-[#74aa77]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#74aa77] animate-pulse" />
                        Live Available
                      </span>
                    </div>
                    <select
                      value={bookingSlot}
                      onChange={(e) => setBookingSlot(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    >
                      {availableSlots.map((s) => (
                        <option key={s} value={s}>
                          {s} (45 min)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">Primary Discussion Topic</label>
                    <select
                      value={bookingTopic}
                      onChange={(e) => setBookingTopic(e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                    >
                      <option value="Pitch Deck & Business Model Review">Pitch Deck & Business Model Review</option>
                      <option value="Term Sheet & Valuation Advice">Term Sheet & Valuation Advice</option>
                      <option value="Technical Architecture & Tech Stack">Technical Architecture & Tech Stack</option>
                      <option value="Customer Discovery & First 100 Users">Customer Discovery & First 100 Users</option>
                      <option value="Grant & Seed Funding Prep">Grant & Seed Funding Prep</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">
                      What is your venture name and key question?
                    </label>
                    <textarea
                      rows={3}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="e.g. 'We are building DormPay. We have 45 pilot users and need advice on how to structure our seed grant application.'"
                      className="mt-1.5 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] p-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#8d9690]">
                    <Video className="h-4 w-4 text-[#ef765e]" />
                    <span>Free 45-min mentorship session sponsored by CrestConnect.</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setBookingMentor(null)}
                    className="rounded-full border border-[#303333] px-4 py-2 text-sm text-[#a6aba6] hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="rounded-full bg-[#ef765e] px-6 py-2 text-sm font-bold text-white hover:bg-[#e9654c]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

