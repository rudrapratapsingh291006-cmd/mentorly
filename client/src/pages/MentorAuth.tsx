import { ArrowLeft, ArrowRight, Award, Briefcase, Camera, Check, Compass, Globe, LockKeyhole, Mail, Sparkles, User, Video, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Mentor, getStoredMentors, saveMentors } from "@/lib/appStore";
import { toast } from "sonner";

export default function MentorAuth() {
  const [, setLocation] = useLocation();
  const [isRegister, setIsRegister] = useState(true);

  // Form states for mentor registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [location, setLocationField] = useState("San Francisco · Remote");
  const [domain, setDomain] = useState<Mentor["domain"]>("AI & SaaS");
  const [stageHelp, setStageHelp] = useState("Career Guidance & Technical Roadmaps");
  const [focus, setFocus] = useState("Practical problem solving & real-world scaling");
  const [expertise, setExpertise] = useState("Tech Stack, Career Growth, System Design");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");

  const handleRegisterMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const newMentor: Mentor = {
      id: `mentor-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Experienced Industry Specialist",
      affiliation: affiliation.trim() || "Independent Mentor",
      location: location.trim(),
      domain,
      stageHelp,
      focus,
      rating: "5.0",
      sessions: 0,
      image: imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      color: "#1d2520",
      tag: "Newly Verified Mentor",
      expertise: expertise.split(",").map((s) => s.trim()).filter(Boolean),
      status: "active",
    };

    const currentMentors = getStoredMentors();
    const updated = [newMentor, ...currentMentors];
    saveMentors(updated);

    toast.success(`Welcome aboard, ${name}! Your mentor profile is now active on the public directory.`);
    setLocation("/mentors");
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back! Logged in as Mentor.");
    setLocation("/dashboard/mentor");
  };

  return (
    <div className="grid min-h-screen bg-[#0b0c0c] lg:grid-cols-[.9fr_1.1fr]">
      {/* Visual branding banner */}
      <section className="relative hidden overflow-hidden bg-[#181d1a] p-12 text-[#f9f6ef] lg:block">
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full border border-white/10" />

        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white">
            c
          </span>
          <span className="text-lg font-semibold tracking-[-.04em]">
            CrestConnect<span className="text-[#ef765e]">.</span>
          </span>
        </Link>

        <div className="relative flex h-[calc(100vh-130px)] flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#74aa77]/30 bg-[#74aa77]/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#74aa77] w-fit">
            <Sparkles className="h-3.5 w-3.5" /> Dedicated Mentor Gateway
          </div>
          <h1 className="mt-5 max-w-lg font-display text-5xl leading-[.92] tracking-[-.05em] text-white">
            Share your expertise.<br />
            <span className="text-[#ef765e]">Guide people to real solutions.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#c5cec3]">
            Create your mentor profile to be showcased on our public directory. People facing hurdles can book your available slots for 1-on-1 video calls or live text chats.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#a6aba6]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ef765e]/20 text-[#ef765e]">✓</span>
              <span>Appear immediately on the live Mentor Directory</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#a6aba6]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ef765e]/20 text-[#ef765e]">✓</span>
              <span>Host live video sessions with real webcams and in-call notes</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#a6aba6]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ef765e]/20 text-[#ef765e]">✓</span>
              <span>Direct text messaging with instant meeting link generators</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between text-xs text-white/50">
          <span>Mentor Onboarding</span>
          <span>CrestConnect Platform</span>
        </div>
      </section>

      {/* Main Form Box */}
      <section className="relative flex items-center justify-center p-6 sm:p-12 overflow-y-auto max-h-screen">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-[#a6aba6] hover:text-white lg:left-12 lg:top-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="w-full max-w-lg py-12">
          {/* Header */}
          <div className="mb-6">
            <div className="flex gap-2 p-1 bg-[#151717] rounded-xl border border-[#303333] w-fit mb-4">
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                  isRegister ? "bg-[#ef765e] text-white shadow" : "text-[#8d9690] hover:text-white"
                }`}
              >
                Register as New Mentor
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition ${
                  !isRegister ? "bg-[#ef765e] text-white shadow" : "text-[#8d9690] hover:text-white"
                }`}
              >
                Existing Mentor Sign In
              </button>
            </div>

            <h2 className="font-display text-3xl font-bold text-white">
              {isRegister ? "Create Mentor Profile" : "Mentor Sign In"}
            </h2>
            <p className="mt-1 text-xs text-[#8d9690]">
              {isRegister
                ? "Your details will immediately show on the website so seekers can book with you."
                : "Sign in to access your sessions, incoming founder messages, and call schedule."}
            </p>
          </div>

          {isRegister ? (
            <form onSubmit={handleRegisterMentor} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#a6aba6]">Your Full Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Aryan Mehta"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mentor@example.com"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Designation / Job Role *</label>
                  <input
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Tech Architect / Career Coach"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Organization / Affiliation</label>
                  <input
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="e.g. Ex-Google / Independent Consultant"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Primary Domain *</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as Mentor["domain"])}
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  >
                    <option value="AI & SaaS">AI & SaaS</option>
                    <option value="FinTech">FinTech & Finance</option>
                    <option value="HealthTech">HealthTech & Wellness</option>
                    <option value="ClimateTech">ClimateTech & Sustainability</option>
                    <option value="General">Career, Life & General Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#a6aba6]">Location / Timezone</label>
                  <input
                    value={location}
                    onChange={(e) => setLocationField(e.target.value)}
                    placeholder="e.g. New York · EST or Remote"
                    className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6]">What can you help with most? *</label>
                <input
                  required
                  value={stageHelp}
                  onChange={(e) => setStageHelp(e.target.value)}
                  placeholder="e.g. Breaking into tech, resume teardowns, code reviews, startup fundraising"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6]">Key Skills / Expertise Tags (comma separated)</label>
                <input
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="e.g. System Design, Career Transition, Python, Leadership"
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#a6aba6]">Profile Photo URL (optional)</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1 h-10 w-full rounded-xl border border-[#303333] bg-[#151717] px-3 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef765e] py-3 text-sm font-bold text-white shadow-lg shadow-[#ef765e]/30 transition hover:bg-[#e9654c]"
              >
                Publish Profile & Join Mentor Directory <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleQuickLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#a6aba6]">Email</label>
                <input
                  type="email"
                  defaultValue="mentor@example.com"
                  className="mt-1 h-11 w-full rounded-xl border border-[#303333] bg-[#151717] px-4 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#a6aba6]">Password</label>
                <input
                  type="password"
                  defaultValue="password"
                  className="mt-1 h-11 w-full rounded-xl border border-[#303333] bg-[#151717] px-4 text-sm text-white outline-none focus:border-[#ef765e]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef765e] py-3 text-sm font-bold text-white shadow-lg shadow-[#ef765e]/30 transition hover:bg-[#e9654c]"
              >
                Sign In to Mentor Workspace <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-[#262a28] pt-6 text-center text-xs text-[#8d9690]">
            Looking for guidance instead?{" "}
            <Link href="/mentors" className="font-bold text-[#ef765e] hover:underline">
              Browse Mentors & Book a Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
