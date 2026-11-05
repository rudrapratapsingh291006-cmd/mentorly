import { ArrowLeft, ArrowUpRight, BarChart3, Building2, Calendar, Check, CheckCircle2, Clock, Download, Eye, Filter, Heart, MessageSquare, Plus, RefreshCw, Rocket, Search, Shield, ShieldCheck, Sparkles, Star, Trash2, Users, Video, X } from "lucide-react";
import { Link } from "wouter";
import { useMemo, useState, useEffect } from "react";
import {
  Booking,
  Mentor,
  MentorshipOffer,
  Startup,
  deleteBooking,
  getStoredBookings,
  getStoredMentors,
  getStoredOffers,
  getStoredStartups,
  saveMentors,
  saveStartups,
  updateBookingStatus,
} from "@/lib/appStore";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"overview" | "startups" | "mentors" | "bookings">("overview");

  const [startups, setStartups] = useState<Startup[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [offers, setOffers] = useState<MentorshipOffer[]>([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // New Mentor Modal
  const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
  const [newMentorName, setNewMentorName] = useState("");
  const [newMentorRole, setNewMentorRole] = useState("");
  const [newMentorAffiliation, setNewMentorAffiliation] = useState("");
  const [newMentorDomain, setNewMentorDomain] = useState<Mentor["domain"]>("Healthcare & Wellness");
  const [newMentorStage, setNewMentorStage] = useState("");
  const [newMentorFocus, setNewMentorFocus] = useState("");
  const [newMentorLocation, setNewMentorLocation] = useState("San Francisco · PST");
  const [newMentorImage, setNewMentorImage] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");

  const reloadData = () => {
    setStartups(getStoredStartups());
    setMentors(getStoredMentors());
    setBookings(getStoredBookings());
    setOffers(getStoredOffers());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Actions for Startups
  const handleApproveStartup = (id: string) => {
    const next = startups.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s));
    setStartups(next);
    saveStartups(next);
    toast.success("Startup pitch approved and published to Campus Showcase!");
  };

  const handleRejectStartup = (id: string) => {
    const next = startups.map((s) => (s.id === id ? { ...s, status: "rejected" as const } : s));
    setStartups(next);
    saveStartups(next);
    toast.error("Startup submission moved to rejected status.");
  };

  const handleDeleteStartup = (id: string) => {
    const next = startups.filter((s) => s.id !== id);
    setStartups(next);
    saveStartups(next);
    toast.success("Startup removed from directory.");
  };

  // Actions for Mentors
  const handleToggleMentorStatus = (id: string) => {
    const next = mentors.map((m) => {
      if (m.id === id) {
        const newStatus = m.status === "active" ? ("paused" as const) : ("active" as const);
        return { ...m, status: newStatus };
      }
      return m;
    });
    setMentors(next);
    saveMentors(next);
    toast.success("Mentor status updated!");
  };

  const handleDeleteMentor = (id: string) => {
    const next = mentors.filter((m) => m.id !== id);
    setMentors(next);
    saveMentors(next);
    toast.success("Mentor deleted.");
  };

  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorName || !newMentorRole) {
      toast.error("Please fill required mentor fields");
      return;
    }
    const newEntry: Mentor = {
      id: `mentor-${Date.now()}`,
      name: newMentorName,
      role: newMentorRole,
      affiliation: newMentorAffiliation || "Campus EIR Alumni",
      domain: newMentorDomain,
      stageHelp: newMentorStage || "Seed Pitching & Pilot Review",
      focus: newMentorFocus || "Venture Scaling & Growth",
      location: newMentorLocation,
      image: newMentorImage,
      rating: "5.00",
      sessions: 0,
      color: "#1d2520",
      tag: "Venture EIR",
      expertise: ["Venture Strategy", "Pitch Strategy", "Product"],
      status: "active",
    };
    const next = [newEntry, ...mentors];
    setMentors(next);
    saveMentors(next);
    setIsAddMentorOpen(false);
    setNewMentorName("");
    setNewMentorRole("");
    setNewMentorAffiliation("");
    toast.success(`Mentor ${newEntry.name} added to roster!`);
  };

  // Actions for Bookings
  const handleCancelBooking = (id: string) => {
    updateBookingStatus(id, "cancelled");
    setBookings(getStoredBookings());
    toast.info("Session status marked as cancelled.");
  };

  const handleCompleteBooking = (id: string) => {
    updateBookingStatus(id, "completed");
    setBookings(getStoredBookings());
    toast.success("Session marked as completed.");
  };

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
    setBookings(getStoredBookings());
    toast.success("Booking entry removed.");
  };

  const totalVentures = startups.length;
  const pendingVentures = startups.filter((s) => s.status === "pending").length;
  const activeMentors = mentors.filter((m) => m.status !== "paused").length;
  const confirmedOfficeHours = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="min-h-screen bg-[#0b0c0c] text-[#f9f6ef]">
      {/* Top Navbar */}
      <header className="border-b border-[#262a28] bg-[#151717] sticky top-0 z-40">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white">
                c
              </span>
              <span className="text-lg font-semibold tracking-[-.04em]">
                CrestConnect<span className="text-[#ef765e]">.</span>
              </span>
            </Link>
            <span className="rounded-full border border-[#ef765e]/40 bg-[#ef765e]/15 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#ef765e]">
              Platform Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/startups"
              className="hidden rounded-full border border-[#303333] px-3.5 py-1.5 text-xs text-[#a6aba6] hover:text-white sm:block"
            >
              Live Showcase
            </Link>
            <Link
              href="/mentors"
              className="hidden rounded-full border border-[#303333] px-3.5 py-1.5 text-xs text-[#a6aba6] hover:text-white sm:block"
            >
              Mentor Directory
            </Link>
            <Link
              href="/dashboard/learner"
              className="rounded-full bg-[#ef765e] px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-[#e9654c]"
            >
              Exit to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="container mx-auto max-w-7xl px-6 py-10">
        {/* Header Title */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ef765e]">
              <Shield className="h-4 w-4" /> Platform Operations Management
            </div>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Venture Operations & Roster Oversight
            </h1>
            <p className="mt-1 text-sm text-[#8d9690]">
              Review student pitch submissions, manage alumni mentors, and monitor booked office hour slots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reloadData}
              className="flex items-center gap-2 rounded-xl border border-[#303333] bg-[#151717] px-4 py-2 text-xs font-semibold text-[#a6aba6] hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={() => setIsAddMentorOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#ef765e] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#e9654c]"
            >
              <Plus className="h-3.5 w-3.5" /> Add Mentor
            </button>
          </div>
        </div>

        {/* High-level KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-[#8d9690]">Student Ventures</span>
              <Rocket className="h-4 w-4 text-[#ef765e]" />
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">{totalVentures}</div>
            <div className="mt-1 text-xs text-[#74aa77]">
              {pendingVentures > 0 ? `${pendingVentures} awaiting review` : "All reviews up-to-date"}
            </div>
          </div>

          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-[#8d9690]">Alumni Mentors</span>
              <Users className="h-4 w-4 text-[#74aa77]" />
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">{activeMentors}</div>
            <div className="mt-1 text-xs text-[#8d9690]">Available across 5 venture domains</div>
          </div>

          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-[#8d9690]">Office Hours Booked</span>
              <Calendar className="h-4 w-4 text-[#ef765e]" />
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">{confirmedOfficeHours}</div>
            <div className="mt-1 text-xs text-[#ef765e]">{bookings.length} total history sessions</div>
          </div>

          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-[#8d9690]">Mentorship Invites</span>
              <MessageSquare className="h-4 w-4 text-[#679bb8]" />
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">{offers.length}</div>
            <div className="mt-1 text-xs text-[#679bb8]">Direct alumni outreach requests</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex border-b border-[#262a28] gap-4">
          {[
            { key: "overview", label: "Dashboard Overview" },
            { key: "startups", label: `Campus Ventures (${startups.length})` },
            { key: "mentors", label: `Mentors Directory (${mentors.length})` },
            { key: "bookings", label: `Office Hours (${bookings.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 text-sm font-semibold transition border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-[#ef765e] text-white"
                  : "border-transparent text-[#8d9690] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="mt-8 space-y-8">
            {/* Quick Actions & Recent Pending Submissions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <h3 className="font-display text-lg font-bold text-white">Pending Venture Pitches</h3>
                  <button
                    onClick={() => setActiveTab("startups")}
                    className="text-xs text-[#ef765e] hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {startups.filter((s) => s.status === "pending").length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#8d9690]">
                      <CheckCircle2 className="mx-auto h-8 w-8 text-[#74aa77] mb-2" />
                      No submissions waiting for review. New student submissions appear here.
                    </div>
                  ) : (
                    startups
                      .filter((s) => s.status === "pending")
                      .map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between rounded-2xl border border-[#262a28] bg-[#0b0c0c] p-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{s.name}</span>
                              <span className="rounded bg-[#ef765e]/20 px-2 py-0.5 text-[10px] text-[#ef765e]">
                                {s.category}
                              </span>
                            </div>
                            <p className="text-xs text-[#8d9690] mt-1">{s.tagline}</p>
                            <p className="text-[11px] text-[#6a726d] mt-0.5">By {s.founders}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApproveStartup(s.id)}
                              className="rounded-lg bg-[#74aa77] px-3 py-1 text-xs font-bold text-black hover:bg-[#609963]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectStartup(s.id)}
                              className="rounded-lg border border-[#303333] px-3 py-1 text-xs text-[#a6aba6] hover:bg-white/5"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <h3 className="font-display text-lg font-bold text-white">Upcoming Office Hour Sessions</h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-[#ef765e] hover:underline"
                  >
                    View All ({bookings.length}) →
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between rounded-2xl border border-[#262a28] bg-[#0b0c0c] p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{b.mentorName}</span>
                          <span className="text-xs text-[#ef765e]">↔ {b.founderName}</span>
                        </div>
                        <p className="text-xs text-[#8d9690] mt-1">{b.slot}</p>
                        <p className="text-[11px] text-[#6a726d]">Topic: {b.topic}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                          b.status === "confirmed"
                            ? "bg-[#74aa77]/15 text-[#74aa77]"
                            : b.status === "completed"
                            ? "bg-white/10 text-[#a6aba6]"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Program Milestones & Platform Health */}
            <div className="rounded-3xl border border-[#262a28] bg-[#151717] p-6">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Campus Venture Cohort Health (Batch 2026)
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#0b0c0c] p-4 border border-[#262a28]">
                  <p className="text-xs text-[#8d9690]">Total Seed Capital Tracked</p>
                  <p className="font-display text-2xl font-bold text-[#ef765e] mt-1">$3.2 Million</p>
                  <p className="text-[11px] text-[#6a726d] mt-1">Across 14 campus alumni rounds</p>
                </div>
                <div className="rounded-2xl bg-[#0b0c0c] p-4 border border-[#262a28]">
                  <p className="text-xs text-[#8d9690]">Average Mentor Rating</p>
                  <p className="font-display text-2xl font-bold text-[#74aa77] mt-1">4.96 / 5.0</p>
                  <p className="text-[11px] text-[#6a726d] mt-1">Based on 736 feedback surveys</p>
                </div>
                <div className="rounded-2xl bg-[#0b0c0c] p-4 border border-[#262a28]">
                  <p className="text-xs text-[#8d9690]">Student Founder Response Rate</p>
                  <p className="font-display text-2xl font-bold text-white mt-1">94% in &lt;24 hrs</p>
                  <p className="text-[11px] text-[#6a726d] mt-1">Active turnaround on mentorship advice</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Startups Management */}
        {activeTab === "startups" && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d9690]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search venture by name, domain, or founder..."
                  className="h-10 w-full rounded-xl border border-[#303333] bg-[#151717] pl-10 pr-4 text-xs text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                />
              </div>

              <div className="flex gap-2">
                {["all", "approved", "pending", "rejected"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition ${
                      statusFilter === st
                        ? "bg-[#ef765e] text-white"
                        : "border border-[#303333] bg-[#151717] text-[#8d9690] hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#262a28] bg-[#151717]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#262a28] bg-[#0b0c0c] text-[#8d9690] uppercase font-mono">
                    <tr>
                      <th className="px-6 py-4">Startup</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Stage</th>
                      <th className="px-6 py-4">Founders</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262a28]">
                    {startups
                      .filter((s) => {
                        const matchQ =
                          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.founders.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchS = statusFilter === "all" || (s.status ?? "approved") === statusFilter;
                        return matchQ && matchS;
                      })
                      .map((s) => (
                        <tr key={s.id} className="hover:bg-[#1a1e1c]">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white text-sm">{s.name}</div>
                            <div className="text-[11px] text-[#8d9690] max-w-xs truncate">{s.tagline}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded bg-[#1c211f] border border-[#262a28] px-2 py-0.5 text-[10px] text-[#cbd5c7]">
                              {s.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#a6aba6]">{s.stage}</td>
                          <td className="px-6 py-4 text-[#a6aba6]">{s.founders}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
                                (s.status ?? "approved") === "approved"
                                  ? "bg-[#74aa77]/15 text-[#74aa77]"
                                  : s.status === "pending"
                                  ? "bg-amber-500/15 text-amber-400"
                                  : "bg-red-500/15 text-red-400"
                              }`}
                            >
                              {s.status ?? "approved"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {s.status !== "approved" && (
                              <button
                                onClick={() => handleApproveStartup(s.id)}
                                className="rounded px-2.5 py-1 text-[11px] font-bold bg-[#74aa77] text-black hover:bg-[#609963]"
                              >
                                Approve
                              </button>
                            )}
                            {s.status === "approved" && (
                              <button
                                onClick={() => handleRejectStartup(s.id)}
                                className="rounded px-2 py-1 text-[11px] border border-[#303333] text-[#8d9690] hover:text-white"
                              >
                                Pause
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteStartup(s.id)}
                              className="rounded p-1 text-[#8d9690] hover:text-red-400"
                              title="Delete startup"
                            >
                              <Trash2 className="h-3.5 w-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mentors Management */}
        {activeTab === "mentors" && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#8d9690]">
                Active Alumni Founders & EIRs listed on the CrestConnect Mentor Directory.
              </p>
              <button
                onClick={() => setIsAddMentorOpen(true)}
                className="flex items-center gap-2 rounded-full bg-[#ef765e] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#e9654c]"
              >
                <Plus className="h-4 w-4" /> Add Mentor Profile
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.map((m) => (
                <div
                  key={m.id}
                  className="rounded-3xl border border-[#262a28] bg-[#151717] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-14 w-14 rounded-2xl object-cover border border-[#303333]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-white text-base truncate">{m.name}</h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] uppercase font-mono ${
                              m.status === "paused"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-[#74aa77]/20 text-[#74aa77]"
                            }`}
                          >
                            {m.status ?? "active"}
                          </span>
                        </div>
                        <p className="text-xs text-[#ef765e] truncate">{m.affiliation}</p>
                        <p className="text-[11px] text-[#8d9690] truncate">{m.role}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#a6aba6]">
                      <p className="font-semibold text-white">{m.stageHelp}</p>
                      <p className="text-[11px] text-[#8d9690] mt-0.5">{m.focus}</p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {m.expertise.map((exp) => (
                        <span key={exp} className="rounded bg-[#1c211f] px-2 py-0.5 text-[10px] text-[#8d9690]">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#262a28] flex items-center justify-between">
                    <span className="text-[11px] text-[#8d9690]">Rating: ⭐ {m.rating}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleMentorStatus(m.id)}
                        className="rounded-lg border border-[#303333] px-2.5 py-1 text-[11px] text-[#a6aba6] hover:text-white"
                      >
                        {m.status === "paused" ? "Activate" : "Pause"}
                      </button>
                      <button
                        onClick={() => handleDeleteMentor(m.id)}
                        className="rounded-lg p-1 text-[#8d9690] hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Bookings Management */}
        {activeTab === "bookings" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-[#262a28] bg-[#151717] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#262a28] bg-[#0b0c0c] text-[#8d9690] uppercase font-mono">
                    <tr>
                      <th className="px-6 py-4">Mentor</th>
                      <th className="px-6 py-4">Founder / Venture</th>
                      <th className="px-6 py-4">Scheduled Slot</th>
                      <th className="px-6 py-4">Discussion Topic</th>
                      <th className="px-6 py-4">Room Link</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262a28]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#1a1e1c]">
                        <td className="px-6 py-4 font-bold text-white">{b.mentorName}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{b.founderName}</div>
                          <div className="text-[11px] text-[#ef765e]">{b.startupName}</div>
                        </td>
                        <td className="px-6 py-4 text-[#cbd5c7]">{b.slot}</td>
                        <td className="px-6 py-4 text-[#8d9690] max-w-xs truncate">{b.topic}</td>
                        <td className="px-6 py-4">
                          {b.meetingLink.startsWith("/") ? (
                            <Link
                              href={b.meetingLink}
                              className="inline-flex items-center gap-1 text-[#ef765e] hover:underline"
                            >
                              <Video className="h-3.5 w-3.5" /> Open Room
                            </Link>
                          ) : (
                            <a
                              href={b.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[#ef765e] hover:underline"
                            >
                              <Video className="h-3.5 w-3.5" /> Open Room
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
                              b.status === "confirmed"
                                ? "bg-[#74aa77]/15 text-[#74aa77]"
                                : b.status === "completed"
                                ? "bg-white/10 text-[#a6aba6]"
                                : "bg-red-500/15 text-red-400"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {b.status === "confirmed" && (
                            <>
                              <button
                                onClick={() => handleCompleteBooking(b.id)}
                                className="rounded px-2 py-1 text-[11px] bg-[#74aa77] text-black font-semibold hover:bg-[#609963]"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleCancelBooking(b.id)}
                                className="rounded px-2 py-1 text-[11px] border border-[#303333] text-[#8d9690] hover:text-white"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="rounded p-1 text-[#8d9690] hover:text-red-400"
                            title="Delete booking"
                          >
                            <Trash2 className="h-3.5 w-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Mentor Modal */}
      {isAddMentorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#303333] bg-[#151717] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ef765e]">
                  Mentor Network Roster
                </span>
                <h3 className="font-display text-xl font-bold text-white">Add New Alumni Mentor</h3>
              </div>
              <button
                onClick={() => setIsAddMentorOpen(false)}
                className="rounded-full p-2 text-[#8d9690] hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMentor} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#a6aba6]">Full Name</label>
                <input
                  required
                  value={newMentorName}
                  onChange={(e) => setNewMentorName(e.target.value)}
                  placeholder="e.g. Priya Sundaram"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6]">Current Title & Company</label>
                <input
                  required
                  value={newMentorRole}
                  onChange={(e) => setNewMentorRole(e.target.value)}
                  placeholder="e.g. Partner @ Nexus Venture Partners / Ex-Founder"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Domain Expertise</label>
                  <select
                    value={newMentorDomain}
                    onChange={(e) => setNewMentorDomain(e.target.value as any)}
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  >
                    <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Career & Tech">Career & Tech</option>
                    <option value="Finance & Legal">Finance & Legal</option>
                    <option value="Life & Mindset">Life & Mindset</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#a6aba6]">College Affiliation</label>
                  <input
                    value={newMentorAffiliation}
                    onChange={(e) => setNewMentorAffiliation(e.target.value)}
                    placeholder="e.g. Alumni '17 · EIR"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6]">Stage Mentorship Focus</label>
                <input
                  value={newMentorStage}
                  onChange={(e) => setNewMentorStage(e.target.value)}
                  placeholder="e.g. Seed Fundraising & Customer Acquisition"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6] mb-1">
                  Profile Photo (Upload from device or paste URL)
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-[#303333] bg-[#0b0c0c] p-2.5">
                  <img
                    src={newMentorImage}
                    alt="Preview"
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#ef765e]"
                  />
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 rounded-lg bg-[#ef765e] px-3 py-1.5 text-xs font-bold text-white cursor-pointer hover:bg-[#e9654c] transition shadow">
                      <Camera className="h-3.5 w-3.5" /> Choose Image from Device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            setNewMentorImage(reader.result as string);
                            toast.success("Photo loaded from this device!");
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-[#8d9690]">
                      PNG, JPG, WEBP from your computer or phone.
                    </p>
                  </div>
                </div>
                <input
                  value={newMentorImage.startsWith("data:") ? "[Local Device Image Attached]" : newMentorImage}
                  onChange={(e) => setNewMentorImage(e.target.value)}
                  placeholder="Or paste https:// image URL"
                  className="mt-2 h-9 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-xs text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#262a28]">
                <button
                  type="button"
                  onClick={() => setIsAddMentorOpen(false)}
                  className="rounded-full border border-[#303333] px-4 py-2 text-sm text-[#a6aba6] hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#ef765e] px-6 py-2 text-sm font-bold text-white hover:bg-[#e9654c]"
                >
                  Save Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
