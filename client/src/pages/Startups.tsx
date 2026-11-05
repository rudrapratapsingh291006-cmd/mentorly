import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Filter, Flame, Heart, Lightbulb, MessageSquare, Plus, Rocket, Search, Share2, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Startup, addMentorshipOffer, getStoredStartups, saveStartups } from "@/lib/appStore";
import { toast } from "sonner";

export default function Startups() {
  const [startupsList, setStartupsList] = useState<Startup[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string[]>([]);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [connectModalStartup, setConnectModalStartup] = useState<Startup | null>(null);
  const [connectSuccess, setConnectSuccess] = useState(false);

  // Form states for submitting a startup
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newCategory, setNewCategory] = useState<Startup["category"]>("AI & SaaS");
  const [newFounders, setNewFounders] = useState("");
  const [newPitchDeckUrl, setNewPitchDeckUrl] = useState("");
  const [newSubmitted, setNewSubmitted] = useState(false);

  // Form states for offering mentorship
  const [mentorOfferRole, setMentorOfferRole] = useState("");
  const [mentorOfferSupport, setMentorOfferSupport] = useState("");

  const categories = ["All", "AI & SaaS", "FinTech", "HealthTech", "ClimateTech", "EdTech", "Hardware"];

  useEffect(() => {
    // Only show approved ventures in public showcase
    const all = getStoredStartups();
    setStartupsList(all.filter((s) => (s.status ?? "approved") === "approved"));
    try {
      const storedVoted = localStorage.getItem("crestconnect_voted");
      if (storedVoted) setVoted(JSON.parse(storedVoted));
      const storedVotes = localStorage.getItem("crestconnect_upvotes");
      if (storedVotes) setUpvotes(JSON.parse(storedVotes));
    } catch {}
  }, []);

  const handleUpvote = (id: string, base: number) => {
    let nextVoted: string[];
    let nextCount: number;
    if (voted.includes(id)) {
      nextVoted = voted.filter((x) => x !== id);
      nextCount = (upvotes[id] ?? base) - 1;
      toast.info("Upvote removed");
    } else {
      nextVoted = [...voted, id];
      nextCount = (upvotes[id] ?? base) + 1;
      toast.success("Voted for this student venture!");
    }
    const nextVotes = { ...upvotes, [id]: nextCount };
    setVoted(nextVoted);
    setUpvotes(nextVotes);
    try {
      localStorage.setItem("crestconnect_voted", JSON.stringify(nextVoted));
      localStorage.setItem("crestconnect_upvotes", JSON.stringify(nextVotes));
    } catch {}
  };

  const handleSendMentorshipOffer = () => {
    if (!connectModalStartup) return;
    addMentorshipOffer({
      startupId: connectModalStartup.id,
      startupName: connectModalStartup.name,
      mentorRole: mentorOfferRole || "Alumni Mentor / Angel",
      supportDetails: mentorOfferSupport || "Offered 1-on-1 venture office hours and deck review",
    });
    setConnectSuccess(true);
    toast.success(`Mentorship invitation sent to founders of ${connectModalStartup.name}!`);
  };

  const handleSubmitVenture = () => {
    if (!newTitle.trim()) {
      toast.error("Please enter a venture name");
      return;
    }
    const all = getStoredStartups();
    const newEntry: Startup = {
      id: `startup-${Date.now()}`,
      name: newTitle.trim(),
      tagline: newTagline.trim() || "Student innovation project",
      stage: "Prototype / MVP",
      category: newCategory,
      founders: newFounders.trim() || "Student Innovators",
      collegeCohort: "Class of 2026 · Incubation Wing",
      pitchSummary: newTagline.trim() || "Campus innovation venture ready for mentor feedback.",
      lookingFor: ["Seed Angel", "Alumni Mentor", "Pilot Customers"],
      metrics: { label: "Campus Cohort", value: "2026" },
      badgeColor: "#1d2520",
      upvotes: 1,
      pitchDeckUrl: newPitchDeckUrl,
      status: "approved", // Published immediately so user can see it right away!
    };
    const next = [newEntry, ...all];
    saveStartups(next);
    setStartupsList(next.filter((s) => (s.status ?? "approved") === "approved"));
    setNewSubmitted(true);
    toast.success(`"${newTitle}" added to campus showcase!`);
  };

  const filtered = useMemo(() => {
    return startupsList.filter((item) => {
      const matchQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.tagline.toLowerCase().includes(query.toLowerCase()) ||
        item.pitchSummary.toLowerCase().includes(query.toLowerCase()) ||
        item.founders.toLowerCase().includes(query.toLowerCase());
      const matchCat = selectedCat === "All" || item.category === selectedCat;
      return matchQuery && matchCat;
    });
  }, [startupsList, query, selectedCat]);

  return (
    <div className="min-h-screen bg-[#0b0c0c] text-[#f9f6ef]">
      {/* Top Navbar */}
      <header className="border-b border-[#262a28] bg-[#0b0c0c]/80 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white">c</span>
            <span className="text-lg font-semibold tracking-[-.04em]">
              CrestConnect<span className="text-[#ef765e]">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/mentors" className="hidden text-sm font-medium text-[#a6aba6] hover:text-white sm:block">
              Mentor Directory
            </Link>
            <Link href="/admin" className="hidden text-sm font-medium text-[#ef765e] hover:underline sm:block">
              Admin Portal
            </Link>
            <Link href="/dashboard/learner" className="hidden text-sm font-medium text-[#a6aba6] hover:text-white sm:block">
              Founder Dashboard
            </Link>
            <button
              onClick={() => setSubmitModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-[#ef765e] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e9654c]"
            >
              <Plus className="h-4 w-4" /> Submit Pitch
            </button>
          </div>
        </div>
      </header>

      {/* Main Header */}
      <div className="container mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8d9690] hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#a4c2a4] mb-3">
              <Rocket className="h-3.5 w-3.5 text-[#ef765e]" /> Campus Venture Showcase
            </div>
            <h1 className="font-display text-4xl sm:text-6xl tracking-[-.05em] leading-[1.05]">
              Student Ventures.<br />
              <span className="text-[#ef765e]">Built right here on campus.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#a6aba6]">
            Explore high-potential student startups coming out of college innovation labs, hackathons, and incubation batches. Connect directly as an alumni mentor, co-founder, or angel.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-[#262a28] bg-[#151717] p-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d9690]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by venture name, technology, or founder..."
              className="h-11 w-full rounded-xl bg-[#0b0c0c] pl-11 pr-4 text-sm text-[#f9f6ef] placeholder:text-[#6a726d] outline-none focus:ring-2 focus:ring-[#ef765e]/30"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  selectedCat === cat
                    ? "bg-[#ef765e] text-white"
                    : "border border-[#303333] bg-[#0b0c0c] text-[#a6aba6] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-4">
            <div className="text-2xl font-bold font-display text-white">48+</div>
            <div className="mt-1 text-xs text-[#8d9690]">Incubated Ventures</div>
          </div>
          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-4">
            <div className="text-2xl font-bold font-display text-[#ef765e]">$3.2M</div>
            <div className="mt-1 text-xs text-[#8d9690]">Total Seed Capital Raised</div>
          </div>
          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-4">
            <div className="text-2xl font-bold font-display text-white">120+</div>
            <div className="mt-1 text-xs text-[#8d9690]">Alumni Venture Mentors</div>
          </div>
          <div className="rounded-2xl border border-[#262a28] bg-[#151717] p-4">
            <div className="text-2xl font-bold font-display text-[#74aa77]">92%</div>
            <div className="mt-1 text-xs text-[#8d9690]">Prototype-to-Pilot Ratio</div>
          </div>
        </div>

        {/* Startup Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24">
          {filtered.map((item) => {
            const currentVotes = upvotes[item.id] ?? item.upvotes;
            const isVoted = voted.includes(item.id);

            return (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-3xl border border-[#262a28] bg-[#151717] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#ef765e]/40 shadow-[0_12px_32px_rgba(0,0,0,.3)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#ef765e]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#ef765e]">
                          {item.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-[#9aa49a]">
                          {item.stage}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#ef765e] transition">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleUpvote(item.id, item.upvotes)}
                      className={`flex flex-col items-center rounded-xl border px-3 py-2 text-xs font-bold transition ${
                        isVoted
                          ? "border-[#ef765e] bg-[#ef765e]/15 text-[#ef765e]"
                          : "border-[#303333] bg-[#0b0c0c] text-[#a6aba6] hover:border-white/30"
                      }`}
                    >
                      <Flame className={`h-4 w-4 ${isVoted ? "fill-[#ef765e]" : ""}`} />
                      <span className="mt-0.5 font-mono">{currentVotes}</span>
                    </button>
                  </div>

                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#c5cec3]">
                    {item.tagline}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-[#8d9690] border-t border-[#262a28] pt-3">
                    {item.pitchSummary}
                  </p>

                  {/* Looking For Badges */}
                  <div className="mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6a726d]">
                      Seeking:
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {item.lookingFor.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[#2e3331] bg-[#1c211f] px-2 py-0.5 text-[11px] text-[#cbd5c7]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#262a28] pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[10px] uppercase text-[#6a726d]">Founding Team</p>
                      <p className="font-medium text-[#f9f6ef]">{item.founders}</p>
                      <p className="text-[10px] text-[#8d9690]">{item.collegeCohort}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-[#6a726d]">{item.metrics.label}</p>
                      <p className="font-mono text-sm font-bold text-[#74aa77]">{item.metrics.value}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setConnectModalStartup(item);
                        setConnectSuccess(false);
                      }}
                      className="flex-1 rounded-full bg-[#ef765e] py-2.5 text-center text-xs font-bold text-white transition hover:bg-[#e9654c]"
                    >
                      Offer Mentorship
                    </button>
                    <Link
                      href="/mentors"
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#303333] bg-[#0b0c0c] text-[#a6aba6] hover:text-white transition"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Connect / Offer Mentorship Modal */}
      {connectModalStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#303333] bg-[#151717] p-6 shadow-2xl">
            {connectSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#74aa77]" />
                <h3 className="mt-4 font-display text-2xl text-white">Connection Request Sent!</h3>
                <p className="mt-2 text-sm text-[#a6aba6]">
                  We notified <b>{connectModalStartup.founders}</b> from <b>{connectModalStartup.name}</b>. They will receive your mentorship note and pitch advice via CrestConnect.
                </p>
                <button
                  onClick={() => setConnectModalStartup(null)}
                  className="mt-6 rounded-full bg-[#ef765e] px-6 py-2.5 text-sm font-bold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ef765e]">
                      Offer Mentorship / Feedback
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">{connectModalStartup.name}</h3>
                  </div>
                  <button
                    onClick={() => setConnectModalStartup(null)}
                    className="rounded-full p-2 text-[#8d9690] hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">Your Role / Background</label>
                    <input
                      value={mentorOfferRole}
                      onChange={(e) => setMentorOfferRole(e.target.value)}
                      placeholder="e.g. Senior Product Manager @ Stripe / Tech Alumni '22"
                      className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">How can you support this venture?</label>
                    <textarea
                      rows={3}
                      value={mentorOfferSupport}
                      onChange={(e) => setMentorOfferSupport(e.target.value)}
                      placeholder="e.g. 'I can review your financial model, introduce you to two healthcare pilot partners, or conduct a mock demo day pitch.'"
                      className="mt-1.5 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] p-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>
                  <div className="rounded-xl bg-[#0b0c0c] p-3 text-xs text-[#8d9690]">
                    Campus founders typically respond within 24 hours. Your message will appear directly in their CrestConnect Founder Dashboard.
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setConnectModalStartup(null)}
                    className="rounded-full border border-[#303333] px-4 py-2 text-sm text-[#a6aba6] hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMentorshipOffer}
                    className="rounded-full bg-[#ef765e] px-6 py-2 text-sm font-bold text-white hover:bg-[#e9654c]"
                  >
                    Send Invitation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submit Pitch Modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#303333] bg-[#151717] p-6 shadow-2xl">
            {newSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#74aa77]" />
                <h3 className="mt-4 font-display text-2xl text-white">Startup Submitted to Showcase!</h3>
                <p className="mt-2 text-sm text-[#a6aba6]">
                  Your startup <b>{newTitle || "New Venture"}</b> has been published to the CrestConnect showcase. Mentors and investors can now discover and review your pitch.
                </p>
                <button
                  onClick={() => {
                    setSubmitModalOpen(false);
                    setNewSubmitted(false);
                    setNewTitle("");
                    setNewTagline("");
                    setNewFounders("");
                    setNewPitchDeckUrl("");
                  }}
                  className="mt-6 rounded-full bg-[#ef765e] px-6 py-2.5 text-sm font-bold text-white"
                >
                  View in Showcase
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-[#262a28] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ef765e]">
                      Submit Your Startup
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">Campus Pitch Deck Submission</h3>
                  </div>
                  <button
                    onClick={() => setSubmitModalOpen(false)}
                    className="rounded-full p-2 text-[#8d9690] hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">Startup / Project Name</label>
                    <input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. NextWave Solar"
                      className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">One-line Tagline</label>
                    <input
                      value={newTagline}
                      onChange={(e) => setNewTagline(e.target.value)}
                      placeholder="e.g. Perovskite solar cells tailored for rooftop microgrids"
                      className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#a6aba6]">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                      >
                        {categories.filter((c) => c !== "All").map((c) => (
                          <option key={c} value={c} className="bg-[#151717]">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a6aba6]">Founders / Cohort</label>
                      <input
                        value={newFounders}
                        onChange={(e) => setNewFounders(e.target.value)}
                        placeholder="e.g. Anish & Ritu (Class of '26)"
                        className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a6aba6]">Pitch Deck Link (Google Drive / Canva / Notion)</label>
                    <input
                      value={newPitchDeckUrl}
                      onChange={(e) => setNewPitchDeckUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/..."
                      className="mt-1.5 h-10 w-full rounded-xl border border-[#303333] bg-[#0b0c0c] px-3 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setSubmitModalOpen(false)}
                    className="rounded-full border border-[#303333] px-4 py-2 text-sm text-[#a6aba6] hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitVenture}
                    className="rounded-full bg-[#ef765e] px-6 py-2 text-sm font-bold text-white hover:bg-[#e9654c]"
                  >
                    Submit Venture
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#262a28] bg-[#0b0c0c] py-8 text-center text-xs text-[#8d9690]">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ef765e] font-display text-xs text-white">c</span>
            <span className="font-semibold text-white">CrestConnect Entrepreneurship Lab</span>
          </div>
          <div>Empowering the next generation of college founders & innovators. © 2026 CrestConnect</div>
        </div>
      </footer>
    </div>
  );
}
