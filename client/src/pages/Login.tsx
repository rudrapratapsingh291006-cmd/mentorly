import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Rocket, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [, params] = useRoute("/login/:role");
  const role = params?.role === "mentor" ? "mentor" : "learner";
  const [, setLocation] = useLocation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const isMentor = role === "mentor";

  const handleDemoSignIn = () => {
    toast.success(`Demo sign in successful as ${isMentor ? "Samira Chen" : "Rohan Varma"}!`);
    setLocation(`/dashboard/${role}`);
  };

  return (
    <div className="grid min-h-screen bg-[#0b0c0c] lg:grid-cols-[.88fr_1.12fr]">
      {/* Side visual branding */}
      <section
        className={`relative hidden overflow-hidden p-12 text-[#f9f6ef] lg:block ${
          isMentor ? "bg-[#181d1a]" : "bg-[#151717]"
        }`}
      >
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
          <p className="font-mono text-xs uppercase tracking-[.2em] text-white/60">
            {isMentor ? "Alumni & Investor Portal" : "Student Founder Workspace"}
          </p>
          <h1 className="mt-5 max-w-lg font-display text-5xl sm:text-6xl leading-[.92] tracking-[-.06em] text-white">
            {isMentor
              ? "Your venture experience can launch the next campus success."
              : "Every seed-funded venture began with one honest question."}
          </h1>

          <div className="mt-12 flex items-center gap-3 text-sm text-white/70">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
              <Sparkles className="h-4 w-4 text-[#ef765e]" />
            </div>
            <span>
              {isMentor
                ? "Join 120+ Alumni Founders & Angel Investors"
                : "Join 48+ student teams building high-impact startups"}
            </span>
          </div>
        </div>

        <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between text-xs text-white/50">
          <span>CrestConnect / {isMentor ? "For Alumni & Mentors" : "For Student Founders"}</span>
          <span>Startup Mentorship Platform</span>
        </div>
      </section>

      {/* Main Login Form */}
      <section className="relative flex items-center justify-center p-6 sm:p-12">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-[#a6aba6] hover:text-white lg:left-12 lg:top-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <div className="w-full max-w-md pt-8">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white">
                c
              </span>
              <span className="text-lg font-semibold tracking-[-.04em] text-white">
                CrestConnect<span className="text-[#ef765e]">.</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-3 inline-flex rounded-full bg-[#2b2321] px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#ff9a86] border border-[#ef765e]/30">
              {isMentor ? "Mentor Portal" : "Student Founder Portal"}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl leading-none tracking-[-.05em] text-white">
              {isMentor ? "Welcome back, Mentor." : "Welcome back, Founder."}
            </h2>
            <p className="mt-3 text-sm text-[#a6aba6]">
              {isMentor
                ? "Your upcoming office hours and student startup reviews."
                : "Access your pitch deck tracker, scheduled mentor reviews, and seed grants."}
            </p>
          </div>

          {/* Quick Demo Login Button for Instant College Presentation */}
          <div className="mb-6 rounded-2xl border border-[#ef765e]/40 bg-[#ef765e]/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#ef765e]">
                  Quick Demo Access
                </p>
                <p className="text-xs text-[#c5cec3] mt-0.5">
                  Instant sign in as {isMentor ? "Samira Chen (Mentor)" : "Rohan Varma (Student Founder)"}
                </p>
              </div>
              <button
                onClick={handleDemoSignIn}
                className="flex items-center gap-1.5 rounded-full bg-[#ef765e] px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#e9654c]"
              >
                <Rocket className="h-3.5 w-3.5" /> Instant Enter
              </button>
            </div>
          </div>

          {/* Regular Email & Password */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-[#a6aba6]">
              College Email or ID
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={isMentor ? "mentor@alumni.edu" : "founder@campus.edu"}
                className="mt-1.5 h-11 w-full rounded-xl border border-[#303333] bg-[#151717] px-4 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
              />
            </label>

            <label className="block text-xs font-semibold text-[#a6aba6]">
              Password
              <div className="relative mt-1.5">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-[#303333] bg-[#151717] px-4 pr-12 text-sm text-white placeholder:text-[#6a726d] outline-none focus:border-[#ef765e]"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d9690]"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#a6aba6]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#ef765e]" defaultChecked /> Remember me
            </label>
            <button className="text-[#ef765e] hover:underline">Forgot password?</button>
          </div>

          <button
            onClick={() => {
              toast.success(`Signed in as ${isMentor ? "Alumni Mentor" : "Student Founder"}!`);
              setLocation(`/dashboard/${role}`);
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef765e] px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e9654c]"
          >
            Sign in to Workspace <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-4 flex items-center justify-center">
            <Link
              href="/admin"
              className="text-xs text-[#8d9690] hover:text-[#ef765e] hover:underline"
            >
              Are you a Platform Admin? Access Admin Console →
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-[#a6aba6]">
            {isMentor ? "Looking to register as a student?" : "Are you an alumnus or investor?"}{" "}
            <Link
              href={`/login/${isMentor ? "learner" : "mentor"}`}
              className="font-bold text-[#ef765e] hover:underline"
            >
              Switch to {isMentor ? "Student Founder" : "Alumni Mentor"} Portal
            </Link>
          </p>

          <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-[#262a28] bg-[#151717] p-3.5 text-xs text-[#8d9690]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#74aa77]" />
            <span>
              All student pitch decks and intellectual property are protected under campus innovation non-disclosure guidelines.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

