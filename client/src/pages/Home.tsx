import { ArrowUpRight, Award, Briefcase, Check, ChevronRight, Compass, Flame, Lightbulb, MessageSquare, Play, Rocket, Search, ShieldCheck, Sparkles, Star, TrendingUp, Users, Video } from "lucide-react";
import { Link } from "wouter";

const portraits = {
  jordan: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  samira: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  elena: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  marcus: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
};

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[#f9f6ef]">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ef765e] font-display text-xl text-white shadow-[0_0_16px_rgba(239,118,94,.4)]">
        c
      </span>
      <span className="text-lg font-semibold tracking-[-.04em]">
        CrestConnect<span className="text-[#ef765e]">.</span>
      </span>
    </Link>
  );
}

function Nav() {
  return (
    <header className="relative z-10 flex items-center justify-between py-5 text-[#f9f6ef]">
      <div className="flex items-center gap-3">
        <Wordmark />
      </div>
      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        <a href="#how-it-works" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          How it works
        </a>
        <Link href="/mentors" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          Find Mentors
        </Link>
        <Link href="/messages" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          Live Chat
        </Link>
        <a href="#categories" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          Fields & Domains
        </a>
        <Link href="/admin" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e] flex items-center gap-1">
          Admin Portal
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/admin"
          className="hidden rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-[#a6aba6] hover:text-white hover:border-white/40 lg:block"
        >
          Admin
        </Link>
        <Link
          href="/login/learner"
          className="hidden rounded-full px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:block"
        >
          Sign in
        </Link>
        <Link
          href="/mentors"
          className="rounded-full bg-[#ef765e] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(239,118,94,.25)] transition hover:-translate-y-0.5 hover:bg-[#e9654c]"
        >
          Get 1-on-1 Guidance <ArrowUpRight className="ml-1 inline h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#0b0c0c] text-[#f9f6ef]">
      {/* Hero Section */}
      <section className="paper-noise relative min-h-[780px] bg-[#151717] text-[#f9f6ef]">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#203a27] blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#ef765e]/20 blur-3xl" />
        
        <div className="container relative mx-auto max-w-7xl px-6">
          <Nav />
          <div className="grid items-center gap-16 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:pb-28 lg:pt-20">
            <div className="rise max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[.16em] text-[#cbd5c7]">
                <Sparkles className="h-3.5 w-3.5 text-[#ef765e]" /> Real Mentors for Real Life & Career Challenges
              </div>
              
              <h1 className="font-display text-[clamp(3.2rem,6.2vw,5.8rem)] leading-[.95] tracking-[-.06em] text-[#f9f6ef]">
                Everyday people solving<br />
                <span className="text-[#ef765e]">real-world problems.</span>
              </h1>
              
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#c5cec3]">
                CrestConnect is the mentorship startup bridging everyday individuals, aspiring creators, and learners with battle-tested mentors across tech, business, finance, career transitions, and life goals.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/mentors"
                  className="rounded-full bg-[#ef765e] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#e9654c] shadow-[0_10px_25px_rgba(239,118,94,.3)]"
                >
                  Find Your Mentor <ArrowUpRight className="ml-1 inline h-4 w-4" />
                </Link>
                <Link
                  href="/messages"
                  className="rounded-full border border-[#ef765e]/40 bg-[#ef765e]/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#ef765e]/20"
                >
                  <Users className="mr-2 inline h-4 w-4 text-[#ef765e]" /> Chat With Mentors
                </Link>
                <Link
                  href="/call/room-eir-office-hours"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold transition hover:bg-white/10"
                >
                  <Video className="mr-2 inline h-4 w-4 text-[#74aa77]" /> Try Video Call Room
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex items-center gap-6 text-sm text-[#c5cec3]">
                <div className="flex -space-x-2">
                  <img src={portraits.jordan} className="h-9 w-9 rounded-full border-2 border-[#151717] object-cover" />
                  <img src={portraits.samira} className="h-9 w-9 rounded-full border-2 border-[#151717] object-cover" />
                  <img src={portraits.elena} className="h-9 w-9 rounded-full border-2 border-[#151717] object-cover" />
                  <img src={portraits.marcus} className="h-9 w-9 rounded-full border-2 border-[#151717] object-cover" />
                </div>
                <span>
                  <b className="text-white">120+ Verified Mentors</b> guiding <b className="text-[#ef765e]">3,500+ individuals</b>
                </span>
              </div>
            </div>

            {/* Hero Card Graphic */}
            <div className="rise rise-delay-2 relative mx-auto w-full max-w-[500px]">
              <div className="absolute -left-4 top-10 z-20 hidden rounded-2xl border border-white/10 bg-[#151717]/95 p-4 text-[#f9f6ef] shadow-2xl backdrop-blur sm:block">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9aa49a]">
                  <span className="h-2 w-2 rounded-full bg-[#74aa77] animate-pulse" /> 1-on-1 Guidance Confirmed
                </div>
                <p className="mt-2 text-sm font-semibold">
                  Career Transition & Growth Session<br />
                  <span className="text-xs font-normal text-[#8d9690]">with Samira Chen · Tech Lead & Advisor</span>
                </p>
              </div>

              <div className="relative aspect-[.84] overflow-hidden rounded-[2rem] border border-white/10 bg-[#1d2520] p-3 shadow-2xl">
                <div className="h-full overflow-hidden rounded-[1.5rem] bg-[#161c18] relative">
                  <img
                    src={portraits.samira}
                    className="h-full w-full object-cover object-center filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-[#151717]/90 p-4 backdrop-blur-md">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-[#74aa77]">Top Rated Mentor</p>
                        <p className="mt-1 font-display text-2xl font-bold text-white">Samira Chen</p>
                        <p className="text-xs text-[#b1b5b0]">Tech & Leadership · 140+ People Guided</p>
                      </div>
                      <Link
                        href="/mentors"
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#ef765e] text-white shadow-lg transition hover:scale-105"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1d2520] px-4 py-3 text-[#d7ddd7] shadow-xl">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#151717]">
                  <Flame className="h-4 w-4 text-[#ef765e]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">98.4%</p>
                  <p className="text-[11px] text-[#8d9690]">Problem Resolution Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats Banner */}
      <section className="border-y border-[#262a28] bg-[#0e1010] py-8">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-white">3,500+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">People Guided</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-[#ef765e]">15+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Problem Domains</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-[#74aa77]">120+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Industry Mentors</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">4.9/5</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Mentee Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Everyday Problem Domains */}
      <section id="categories" className="container mx-auto max-w-7xl px-6 py-20 border-b border-[#262a28]">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">Get Help In Your Field</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white">
            Mentorship for real everyday challenges
          </h2>
          <p className="mt-3 text-sm text-[#a6aba6]">
            Whether you are stuck in your career, starting a side venture, tackling code bugs, or mastering personal finance — our mentors guide you step by step.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Career & Job Transitions",
              desc: "Resume teardowns, interview prep, switching domains, and promotion navigation.",
              icon: Briefcase,
              color: "#ef765e",
            },
            {
              title: "Tech, Coding & AI",
              desc: "System design reviews, debugging blockers, learning roadmap, and project guidance.",
              icon: Rocket,
              color: "#679bb8",
            },
            {
              title: "Finance & Side Ventures",
              desc: "Budgeting, early business models, freelance pricing, and monetization advice.",
              icon: TrendingUp,
              color: "#74aa77",
            },
            {
              title: "Mindset & Life Strategy",
              desc: "Goal setting, productivity systems, work-life balance, and overcoming burnout.",
              icon: Award,
              color: "#eab308",
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className="rounded-3xl border border-[#262a28] bg-[#151717] p-6 hover:border-[#ef765e]/40 transition group"
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b0c0c] border border-white/5"
                style={{ color: cat.color }}
              >
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#ef765e] transition">
                {cat.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8d9690]">{cat.desc}</p>
              <Link
                href="/mentors"
                className="mt-4 inline-flex items-center text-xs font-semibold text-white/80 hover:text-[#ef765e]"
              >
                Find mentors in this field →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">How CrestConnect Works</p>
            <h2 className="mt-4 max-w-md font-display text-4xl sm:text-5xl leading-[1] tracking-[-.05em]">
              Connect with people who have walked the path.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#a6aba6]">
              Stop struggling alone with internet advice. Connect 1-on-1 through live text or high-definition video calls with experts who give tailored solutions.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/mentors"
                className="inline-flex items-center gap-2 font-semibold text-sm text-[#ef765e] hover:underline"
              >
                Browse verified mentors <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#262a28] bg-[#1d2520] p-6">
              <span className="font-mono text-sm text-[#74aa77]">01</span>
              <Search className="mt-14 h-7 w-7 text-[#a4c2a4]" />
              <h3 className="mt-5 text-xl font-bold text-white">Find Your Match</h3>
              <p className="mt-2 text-sm leading-6 text-[#a9afaa]">
                Filter mentors by domain, real-world experience, and problem areas that fit your current hurdle.
              </p>
            </div>

            <div className="rounded-3xl border border-[#262a28] bg-[#2b2321] p-6">
              <span className="font-mono text-sm text-[#ef765e]">02</span>
              <MessageSquare className="mt-14 h-7 w-7 text-[#ff9a86]" />
              <h3 className="mt-5 text-xl font-bold text-white">Chat or Call</h3>
              <p className="mt-2 text-sm leading-6 text-[#b7a8a3]">
                Start an instant text conversation or book a dedicated live video session with screen and note sharing.
              </p>
            </div>

            <div className="rounded-3xl border border-[#262a28] bg-[#20272b] p-6">
              <span className="font-mono text-sm text-[#679bb8]">03</span>
              <Check className="mt-14 h-7 w-7 text-[#91bfdb]" />
              <h3 className="mt-5 text-xl font-bold text-white">Solve & Progress</h3>
              <p className="mt-2 text-sm leading-6 text-[#a6b6c0]">
                Leave with actionable takeaways, next steps, and continuous follow-up support to achieve your goal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everyday Success Story */}
      <section id="stories" className="border-y border-[#303333] bg-[#151717]">
        <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full border border-[#ef765e]/40" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#1c211f] p-4">
              <img
                src={portraits.jordan}
                className="aspect-[1.1] w-full rounded-[1.5rem] object-cover"
              />
              <span className="absolute bottom-8 left-8 rounded-full bg-[#151717]/90 px-4 py-2 text-xs font-bold text-white backdrop-blur border border-white/10">
                Jordan M. × Career Transitioned to Senior Engineer
              </span>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">
              Mentee Story
            </p>
            <blockquote className="mt-5 font-display text-3xl sm:text-4xl leading-[1.1] tracking-[-.04em] text-white">
              “I was completely stuck switching careers into tech with zero network. My CrestConnect mentor reviewed my portfolio, practiced mock technical interviews with me, and I landed my dream role within 6 weeks.”
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ef765e]/20 text-sm font-bold text-[#ef765e]">
                JM
              </div>
              <div>
                <p className="text-sm font-bold text-white">Jordan Miller</p>
                <p className="text-xs text-[#a6aba6]">
                  Software Engineer @ FinTech Scaleup
                </p>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/mentors"
                className="inline-flex items-center text-sm font-bold text-[#ff9a86] hover:underline"
              >
                Find a mentor for your goals <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#ef765e] text-white">
        <div className="container mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-white/80">
              Facing a hurdle today?
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl leading-none tracking-[-.05em]">
              The right mentor changes everything.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mentors"
              className="rounded-full bg-[#151717] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#0b0c0c]"
            >
              Find Mentors by Field <ArrowUpRight className="ml-1 inline h-4 w-4" />
            </Link>
            <Link
              href="/messages"
              className="rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#ef765e]"
            >
              Start Live Chat
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#a6aba6] sm:flex-row sm:items-center sm:justify-between">
        <Wordmark />
        <div className="flex flex-wrap gap-6 text-xs text-[#8d9690]">
          <span>Real-World Mentorship Platform</span>
          <Link href="/mentors" className="hover:text-white">Mentors</Link>
          <Link href="/messages" className="hover:text-white">Live Chat</Link>
          <Link href="/admin" className="hover:text-[#ef765e]">Admin Portal</Link>
          <span>© 2026 CrestConnect</span>
        </div>
      </footer>
    </div>
  );
}

