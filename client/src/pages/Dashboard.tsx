import { ArrowUpRight, Award, Bell, CalendarDays, CheckCircle2, ChevronDown, Clock3, Compass, Download, ExternalLink, FileText, Flame, FolderGit2, Heart, Home, Inbox, LayoutGrid, Lightbulb, LogOut, MessageCircle, MessageSquare, Plus, Rocket, Search, Settings, Shield, Sparkles, Star, TrendingUp, Upload, Users, Video } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { Booking, getStoredBookings } from "@/lib/appStore";
import { toast } from "sonner";

const founderMilestones = [
  { id: 1, title: "Problem Discovery & Validation", done: true, tag: "100+ Surveys Completed" },
  { id: 2, title: "Interactive Prototype (Figma)", done: true, tag: "Tested on 35 Beta Users" },
  { id: 3, title: "Functional MVP Deployed", done: true, tag: "v1.0 Live & Accessible" },
  { id: 4, title: "Pitch Deck v2 (Mentor Review)", done: false, tag: "Due in 3 Days" },
  { id: 5, title: "Seed Micro-Grant Application ($10k)", done: false, tag: "Open for Cohort 5" },
];

function Sidebar({ mentor }: { mentor: boolean }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#262a28] bg-[#151717] px-5 py-6 lg:block">
      <Link href="/" className="flex items-center gap-2.5 px-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white shadow-md">
          c
        </span>
        <span className="text-lg font-semibold tracking-[-.04em] text-white">
          CrestConnect<span className="text-[#ef765e]">.</span>
        </span>
      </Link>

      <div className="mt-8 px-3">
        <span className="rounded-full border border-white/10 bg-[#0b0c0c] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#ef765e]">
          {mentor ? "Alumni EIR Workspace" : "Founder Hub · Cohort '26"}
        </span>
      </div>

      <div className="mt-8 space-y-1">
        {(mentor
          ? [
              [Home, "Venture Queue", "/dashboard/mentor"],
              [Compass, "Browse Mentors", "/mentors"],
              [Rocket, "Campus Startups", "/startups"],
              [MessageCircle, "Founder Messages", "/messages"],
              [Video, "Video Call Room", "/call/room-eir-office-hours"],
              [Shield, "Admin Console", "/admin"],
            ]
          : [
              [Home, "Founder Overview", "/dashboard/student"],
              [Compass, "Browse Mentors", "/mentors"],
              [Rocket, "Campus Startups", "/startups"],
              [MessageCircle, "Mentor Messages", "/messages"],
              [Video, "Video Call Room", "/call/room-eir-office-hours"],
              [Shield, "Admin Console", "/admin"],
            ]
        ).map(([Icon, label, path]: any, i) => (
          <Link
            key={label}
            href={path}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
              i === 0
                ? "bg-[#1c211f] text-white"
                : "text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {label.includes("Messages") && (
              <span className="ml-auto rounded-full bg-[#ef765e] px-2 py-0.5 text-[10px] text-white">
                4
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-12 border-t border-[#262a28] pt-6 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
        >
          <Settings className="h-4 w-4" /> Venture Settings
        </a>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#a6aba6] hover:bg-[#0b0c0c] hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Link>
      </div>

      <div className="mt-12 rounded-2xl border border-[#262a28] bg-[#0b0c0c] p-4 text-white">
        <Sparkles className="h-5 w-5 text-[#ef765e]" />
        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#ef765e]">
          Venture Demo Day 2026
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#8d9690]">
          Pitch in front of 30+ angel investors and syndicate leads. Applications close in 14 days.
        </p>
        <Link
          href="/startups"
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#ef765e]"
        >
          View Showcase →
        </Link>
      </div>
    </aside>
  );
}

export default function Dashboard() {
  const [, params] = useRoute("/dashboard/:role");
  const mentor = params?.role === "mentor";
  const [milestones, setMilestones] = useState(founderMilestones);
  const [pitchUploaded, setPitchUploaded] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getStoredBookings());
  }, []);

  const toggleMilestone = (id: number) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
    toast.success("Venture milestone status updated!");
  };

  const handleUploadDeck = () => {
    setPitchUploaded(!pitchUploaded);
    if (!pitchUploaded) {
      toast.success("Updated pitch deck (DormPay_Deck_v2.1.pdf) uploaded!");
    } else {
      toast.info("Reverted to previous deck version.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0c0c] text-[#f9f6ef]">
      <Sidebar mentor={mentor} />
      
      <main className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[#262a28] bg-[#0b0c0c]/90 px-6 py-4 backdrop-blur lg:px-10">
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white"
            >
              c
            </Link>
          </div>
          
          <div className="hidden text-xs font-mono uppercase tracking-wider text-[#8d9690] sm:block">
            {mentor ? "Alumni Venture Office Hours · Fall Session" : "Active Venture: DormPay (FinTech) · Cohort 5"}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-[#a6aba6] hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ef765e]" />
            </button>
            <div className="flex items-center gap-3 border-l border-[#262a28] pl-4">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e]/20 text-xs font-bold text-[#ef765e]">
                {mentor ? "SC" : "RV"}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-bold text-white">
                  {mentor ? "Samira Chen" : "Rohan Varma"}
                </p>
                <p className="text-[11px] text-[#8d9690]">
                  {mentor ? "Alumni EIR & Founder" : "Student Founder (CS '26)"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Body */}
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">
                {mentor ? "Alumni Mentor Hub" : "Founder Command Center"}
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-none tracking-[-.05em] text-white">
                {mentor
                  ? "Guiding the next wave of campus founders."
                  : "Let’s build momentum, Rohan."}
              </h1>
              <p className="mt-3 text-sm text-[#a6aba6]">
                {mentor
                  ? "Review pitches, provide feedback on student decks, and hold weekly office hours."
                  : "Track your startup milestones, prep for alumni pitch reviews, and secure seed grants."}
              </p>
            </div>

            <div className="flex gap-2">
              {mentor ? (
                <button className="flex items-center gap-2 rounded-full bg-[#ef765e] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e9654c]">
                  <Plus className="h-4 w-4" /> Add Office Hour Slot
                </button>
              ) : (
                <>
                  <Link
                    href="/mentors"
                    className="flex items-center gap-2 rounded-full bg-[#ef765e] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e9654c]"
                  >
                    <CalendarDays className="h-4 w-4" /> Book Office Hours
                  </Link>
                  <Link
                    href="/startups"
                    className="flex items-center gap-2 rounded-full border border-[#303333] bg-[#151717] px-4 py-3 text-xs font-bold text-white hover:bg-[#20272b]"
                  >
                    <Rocket className="h-4 w-4 text-[#ef765e]" /> View Pitch Board
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Metric Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {(mentor
              ? [
                  ["14", "Student Startups Mentored", Users, "#4a7a51"],
                  ["28 hrs", "Office Hours Logged", Clock3, "#ef765e"],
                  ["$480k", "Capital Raised by Mentees", Flame, "#74aa77"],
                ]
              : [
                  ["3", "Scheduled Pitch Reviews", CalendarDays, "#ef765e"],
                  ["$10,000", "Micro-Grant Eligibility", Award, "#74aa77"],
                  ["45", "Active Campus Beta Users", Users, "#679bb8"],
                ]
            ).map(([stat, label, Icon, color]: any) => (
              <div
                key={label}
                className="rounded-2xl border border-[#262a28] bg-[#151717] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-white">{stat}</span>
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0c0c] border border-white/5"
                    style={{ color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-[#a6aba6] font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* Section: Next Session & Milestone Progress */}
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
            {/* Upcoming Session */}
            <section className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
              <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    {mentor ? "Next Scheduled Office Hour" : "Your Next Mentor Office Hour"}
                  </h2>
                  <p className="text-xs text-[#8d9690] mt-0.5">
                    {mentor ? "Live pitch session with student founders" : "45-minute structured feedback session"}
                  </p>
                </div>
                <span className="rounded-full bg-[#ef765e]/15 px-3 py-1 font-mono text-[11px] font-semibold text-[#ef765e]">
                  Confirmed
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {bookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#303333] p-8 text-center text-xs text-[#8d9690]">
                    No office hour sessions scheduled yet. Book 1-on-1 time with an alumni mentor.
                  </div>
                ) : (
                  bookings.slice(0, 2).map((b) => (
                    <div key={b.id} className="rounded-2xl border border-[#262a28] bg-[#1c211f] p-5">
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#151717] text-center border border-white/10">
                            <span className="font-mono text-[10px] uppercase font-bold text-[#ef765e]">SLOT</span>
                            <span className="font-display text-xs font-bold leading-none text-white">45m</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#74aa77]">
                              {b.slot}
                            </p>
                            <h3 className="mt-1 text-base font-bold text-white">
                              {mentor ? `${b.founderName} (${b.startupName})` : b.mentorName}
                            </h3>
                            <p className="text-xs text-[#a6aba6]">
                              Topic: {b.topic}
                            </p>
                          </div>
                        </div>

                        {b.meetingLink.startsWith("/") ? (
                          <Link
                            href={b.meetingLink}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#ef765e] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#e9654c]"
                          >
                            <Video className="h-4 w-4" /> Launch Call Room
                          </Link>
                        ) : (
                          <a
                            href={b.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-full bg-[#ef765e] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#e9654c]"
                          >
                            <Video className="h-4 w-4" /> Launch Call Room
                          </a>
                        )}
                      </div>

                      <div className="mt-4 rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#8d9690] flex items-center justify-between">
                        <span>Prepared Note: <b>{b.notes || "Pitch review ready"}</b></span>
                        <span className="text-[#74aa77] font-semibold uppercase font-mono text-[10px]">{b.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Founder Note / Pitch Tips */}
            <aside className="rounded-3xl border border-[#262a28] bg-[#151717] p-6 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-white">
                    {mentor ? "Mentor Playbook" : "Pitch Clinic Advice"}
                  </h2>
                  <Sparkles className="h-5 w-5 text-[#ef765e]" />
                </div>
                <p className="mt-4 font-display text-xl leading-snug text-[#f9f6ef]">
                  “Investors in student startups invest in founders who listen, ship fast, and test assumptions within days.”
                </p>
                <div className="mt-4 h-px bg-white/10" />
                <p className="mt-4 text-xs leading-relaxed text-[#8d9690]">
                  Focus your 45-min mentor slot on your single biggest bottleneck (e.g. customer acquisition or technical feasibility).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#262a28]">
                <button
                  onClick={handleUploadDeck}
                  className="flex items-center gap-2 text-xs font-bold text-[#ef765e] hover:underline"
                >
                  <Upload className="h-3.5 w-3.5" />
                  {pitchUploaded ? "Deck Uploaded (v2.1)" : "Upload Updated Pitch Deck (.pdf)"}
                </button>
              </div>
            </aside>
          </div>

          {/* Section: Interactive Startup Milestones */}
          {!mentor && (
            <section className="mt-8 rounded-3xl border border-[#262a28] bg-[#151717] p-6">
              <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Campus Venture Milestones
                  </h2>
                  <p className="text-xs text-[#8d9690] mt-0.5">
                    Track your path from ideation to demo day qualification. Click to mark complete.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#74aa77]">
                  {milestones.filter((m) => m.done).length} / {milestones.length} Completed
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-sm cursor-pointer transition ${
                      m.done
                        ? "border-[#262a28] bg-[#161d18] text-[#cbd5c7]"
                        : "border-[#303333] bg-[#0b0c0c] text-white hover:border-[#ef765e]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid h-6 w-6 place-items-center rounded-full border transition ${
                          m.done
                            ? "border-[#74aa77] bg-[#74aa77] text-black"
                            : "border-[#555] bg-transparent"
                        }`}
                      >
                        {m.done && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <span className={m.done ? "line-through text-[#8d9690]" : "font-medium"}>
                        {m.title}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-[#8d9690] bg-[#151717] px-2.5 py-1 rounded-md">
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Recent Mentor Discussions */}
          <section className="mt-8 rounded-3xl border border-[#262a28] bg-[#151717] p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {mentor ? "Recent Student Feedback Notes" : "Your Mentor Notes & Action Items"}
                </h2>
                <p className="text-xs text-[#8d9690] mt-0.5">
                  Direct takeaway points recorded after office hour sessions.
                </p>
              </div>
              <Link href="/mentors" className="text-xs font-bold text-[#ef765e] hover:underline">
                Find More Mentors →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-4 rounded-2xl border border-[#262a28] bg-[#0b0c0c] p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1c211f] font-bold text-sm text-[#ef765e]">
                  SC
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-white">
                      Samira Chen · <span className="text-xs font-normal text-[#8d9690]">CloudSync Exit &apos;24</span>
                    </p>
                    <span className="text-xs text-[#6a726d]">Yesterday</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#a6aba6]">
                    &quot;Good progress on the campus payment pilot. Before raising pre-seed, get 3 college department heads to sign written letters of intent (LOI). Here is the template link.&quot;
                  </p>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] font-mono text-[#ef765e]">
                    <span className="cursor-pointer hover:underline">Download LOI Template (.docx)</span>
                    <span>·</span>
                    <Link href="/messages/mentor-1" className="cursor-pointer hover:underline">Reply to Samira</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

