import { ArrowUpRight, Award, Briefcase, Check, ChevronRight, Compass, Flame, Lightbulb, Play, Rocket, ShieldCheck, Sparkles, Star, TrendingUp, Users, Video } from "lucide-react";
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
        <Link href="/startups" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          Campus Startups
        </Link>
        <a href="#stories" className="opacity-75 transition hover:opacity-100 hover:text-[#ef765e]">
          Founder Stories
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
          href="/login/learner"
          className="rounded-full bg-[#ef765e] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(239,118,94,.25)] transition hover:-translate-y-0.5 hover:bg-[#e9654c]"
        >
          Get Started <ArrowUpRight className="ml-1 inline h-4 w-4" />
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
                <Sparkles className="h-3.5 w-3.5 text-[#ef765e]" /> Campus Entrepreneurship & Incubation Hub
              </div>
              
              <h1 className="font-display text-[clamp(3.4rem,6.8vw,6.4rem)] leading-[.93] tracking-[-.065em] text-[#f9f6ef]">
                From dorm room<br />
                <span className="text-[#ef765e]">to seed funding.</span>
              </h1>
              
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#c5cec3]">
                CrestConnect bridges collegiate student innovators with experienced alumni founders, VC scouts, and angel investors to turn classroom concepts into scalable ventures.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/mentors"
                  className="rounded-full bg-[#ef765e] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#e9654c] shadow-[0_10px_25px_rgba(239,118,94,.3)]"
                >
                  Find Startup Mentor <ArrowUpRight className="ml-1 inline h-4 w-4" />
                </Link>
                <Link
                  href="/startups"
                  className="rounded-full border border-[#ef765e]/40 bg-[#ef765e]/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#ef765e]/20"
                >
                  <Rocket className="mr-2 inline h-4 w-4 text-[#ef765e]" /> Explore Campus Startups
                </Link>
                <Link
                  href="/login/mentor"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold transition hover:bg-white/10"
                >
                  Join as Alumni Mentor
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
                  <b className="text-white">120+ Alumni Mentors</b> guiding <b className="text-[#ef765e]">48 campus startups</b>
                </span>
              </div>
            </div>

            {/* Hero Card Graphic */}
            <div className="rise rise-delay-2 relative mx-auto w-full max-w-[500px]">
              <div className="absolute -left-4 top-10 z-20 hidden rounded-2xl border border-white/10 bg-[#151717]/95 p-4 text-[#f9f6ef] shadow-2xl backdrop-blur sm:block">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9aa49a]">
                  <span className="h-2 w-2 rounded-full bg-[#74aa77] animate-pulse" /> Mentorship Match Confirmed
                </div>
                <p className="mt-2 text-sm font-semibold">
                  Mock Pitch with Marcus Cole<br />
                  <span className="text-xs font-normal text-[#8d9690]">Partner @ Horizon Ventures</span>
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
                        <p className="text-xs font-mono uppercase tracking-widest text-[#74aa77]">Featured Alumni Mentor</p>
                        <p className="mt-1 font-display text-2xl font-bold text-white">Samira Chen</p>
                        <p className="text-xs text-[#b1b5b0]">Alumni Class of &apos;19 · Founder @ CloudSync (Exit &apos;24)</p>
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
                  <p className="text-sm font-bold text-white">$3.2M+</p>
                  <p className="text-[11px] text-[#8d9690]">Campus grant & seed raised</p>
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
              <div className="font-display text-3xl font-bold text-white">48+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Student Startups Active</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-[#ef765e]">$3.2M</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Total Seed Capital</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-[#74aa77]">120+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">Alumni & VC Mentors</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">1,400+</div>
              <div className="text-xs text-[#8d9690] mt-1 font-mono uppercase">1-on-1 Pitch Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">The CrestConnect Acceleration Path</p>
            <h2 className="mt-4 max-w-md font-display text-4xl sm:text-5xl leading-[1] tracking-[-.05em]">
              Turn your project into a viable venture.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#a6aba6]">
              Whether it is a hackathon prototype, capstone thesis, or weekend experiment, our structured 3-phase journey gives you feedback from people who have built real companies.
            </p>
            <div className="mt-8">
              <Link
                href="/startups"
                className="inline-flex items-center gap-2 font-semibold text-sm text-[#ef765e] hover:underline"
              >
                View active campus startups <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#262a28] bg-[#1d2520] p-6">
              <span className="font-mono text-sm text-[#74aa77]">01</span>
              <Lightbulb className="mt-14 h-7 w-7 text-[#a4c2a4]" />
              <h3 className="mt-5 text-xl font-bold text-white">Validate & Pitch</h3>
              <p className="mt-2 text-sm leading-6 text-[#a9afaa]">
                Submit your problem statement, customer interviews, and pitch deck for rapid review by experienced mentors.
              </p>
            </div>

            <div className="rounded-3xl border border-[#262a28] bg-[#2b2321] p-6">
              <span className="font-mono text-sm text-[#ef765e]">02</span>
              <Users className="mt-14 h-7 w-7 text-[#ff9a86]" />
              <h3 className="mt-5 text-xl font-bold text-white">Alumni Office Hours</h3>
              <p className="mt-2 text-sm leading-6 text-[#b7a8a3]">
                Schedule 1-on-1 sessions with founders who graduated from your college and now lead funded tech startups.
              </p>
            </div>

            <div className="rounded-3xl border border-[#262a28] bg-[#20272b] p-6">
              <span className="font-mono text-sm text-[#679bb8]">03</span>
              <Rocket className="mt-14 h-7 w-7 text-[#91bfdb]" />
              <h3 className="mt-5 text-xl font-bold text-white">Demo Day & Grants</h3>
              <p className="mt-2 text-sm leading-6 text-[#a6b6c0]">
                Pitch live to angel syndicates, institutional venture funds, and unlock college micro-grants up to $25k.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Case Study */}
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
                Jordan (B.Tech &apos;24) × Seed Round Closed
              </span>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-[#ef765e]">
              Student Founder Spotlight
            </p>
            <blockquote className="mt-5 font-display text-3xl sm:text-4xl leading-[1.1] tracking-[-.04em] text-white">
              “CrestConnect connected us with an alumni VP at Stripe who tore apart our pricing model, rebuilt our deck, and introduced us to our lead angel investor.”
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ef765e]/20 text-sm font-bold text-[#ef765e]">
                JM
              </div>
              <div>
                <p className="text-sm font-bold text-white">Jordan Miller</p>
                <p className="text-xs text-[#a6aba6]">
                  Founder & CEO @ OrbitPay · Raised $650k Pre-Seed
                </p>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/startups"
                className="inline-flex items-center text-sm font-bold text-[#ff9a86] hover:underline"
              >
                Browse student startup pitches <ChevronRight className="ml-1 h-4 w-4" />
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
              Ready to pitch?
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl sm:text-5xl leading-none tracking-[-.05em]">
              Every great campus startup started with one conversation.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mentors"
              className="rounded-full bg-[#151717] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#0b0c0c]"
            >
              Book Mentor Office Hours <ArrowUpRight className="ml-1 inline h-4 w-4" />
            </Link>
            <Link
              href="/startups"
              className="rounded-full border-2 border-white px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#ef765e]"
            >
              Showcase Your Venture
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#a6aba6] sm:flex-row sm:items-center sm:justify-between">
        <Wordmark />
        <div className="flex flex-wrap gap-6 text-xs text-[#8d9690]">
          <span>Startup & Venture Mentorship Platform</span>
          <Link href="/mentors" className="hover:text-white">Mentors</Link>
          <Link href="/startups" className="hover:text-white">Showcase</Link>
          <Link href="/admin" className="hover:text-[#ef765e]">Admin Portal</Link>
          <Link href="/login/learner" className="hover:text-white">Student Portal</Link>
          <span>© 2026 CrestConnect</span>
        </div>
      </footer>
    </div>
  );
}

