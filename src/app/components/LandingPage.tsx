import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown, ArrowRight, Check, Zap, Users,
  BookOpen, FileText, LayoutTemplate, Briefcase,
  Menu, X, Star, ArrowUpRight, Database, MessageSquare,
  Play, Search, Shield, Layers, TrendingUp
} from "lucide-react";
import { Logo } from "./Logo";
import { SERIF, CTA_ORANGE, PLANS, FadeIn } from "./shared";

/* ───────── UTILS ───────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
function scrollToPricing() {
  scrollTo("pricing");
}

/* ───────── CTA BUTTON ───────── */
function CTAButton({ text = "Get Instant Access", className = "" }: { text?: string; className?: string }) {
  return (
    <button
      onClick={scrollToPricing}
      className={`inline-flex items-center gap-2.5 text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer font-medium ${className}`}
      style={{ backgroundColor: CTA_ORANGE, color: "#fff" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

/* ───────── TRUST LINE ───────── */
function TrustLine() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
      {[
        { icon: Check, text: "Beginner friendly" },
        { icon: Check, text: "Step-by-step system" },
        { icon: Check, text: "Templates included" },
      ].map((item) => (
        <span key={item.text} className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
          <item.icon className="w-3 h-3 text-[#9CA3AF]" />
          {item.text}
        </span>
      ))}
    </div>
  );
}

function InstantAccessNote() {
  return (
    <p className="mt-3 text-[12px] text-[#9CA3AF]/60 flex items-center justify-center gap-1.5">
      <Zap className="w-3 h-3" />
      Instant access after payment · One-time payment · Lifetime access
    </p>
  );
}

/* ───────── HEADER ───────── */
const NAV_ITEMS = [
  { label: "How It Works", id: "how-it-works" },
  { label: "What You Get", id: "what-you-get" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F10]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-[56px]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 hover:opacity-70 transition-opacity"
        >
          <Logo className="w-[28px] h-[20px]" />
          <span className="text-[14px] text-white/70 tracking-[-0.01em]">AI Client Machine</span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[14px] text-white/40 hover:text-white/80 transition-colors px-3 py-1.5 rounded-md hover:bg-white/[0.04]"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={scrollToPricing}
            className="ml-3 px-4 py-1.5 rounded-full text-[14px] text-white font-medium transition-colors"
            style={{ backgroundColor: CTA_ORANGE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
          >
            Get Access
          </button>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/60 p-1.5">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/[0.06] px-6 py-4 space-y-1 overflow-hidden bg-[#0F0F10]"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); setMenuOpen(false); }}
                className="block w-full text-left text-[15px] text-white/40 hover:text-white/80 transition-colors px-2 py-2.5 rounded-md hover:bg-white/[0.04]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { scrollToPricing(); setMenuOpen(false); }}
              className="w-full text-white transition-colors px-5 py-3 rounded-full text-[15px] mt-3 font-medium"
              style={{ backgroundColor: CTA_ORANGE }}
            >
              Get Instant Access
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ───────── HERO ───────── */
function HeroSection() {
  return (
    <section className="pt-[130px] pb-16 px-6">
      <div className="max-w-[720px] mx-auto text-center">
        <FadeIn>
          <div className="flex justify-center mb-8">
            <Logo className="w-[56px] h-[39px] opacity-60" />
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-1.5 mb-6">
            <Zap className="w-3 h-3" style={{ color: CTA_ORANGE }} />
            <span className="text-[11px] text-white/50 tracking-[0.06em] uppercase">AI-Powered Client Acquisition</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1
            className="text-[40px] md:text-[54px] lg:text-[62px] leading-[1.08] tracking-[-0.04em] text-white mb-5"
            style={{ fontFamily: SERIF }}
          >
            Get Clients Using AI-Powered Outreach Systems
          </h1>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="text-[16px] md:text-[17px] text-[#9CA3AF] leading-[1.65] max-w-[540px] mx-auto mb-8">
            A simple step-by-step system that shows you how to find businesses, send outreach using proven scripts, and turn replies into paying clients.
            <br />
            <span className="text-white/50 text-[14px]">No agency experience required. No complicated strategies.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <div className="flex flex-col items-start sm:items-center gap-2.5 mb-10 sm:max-w-[400px] mx-auto">
            {[
              "Find businesses that actually need clients",
              "Use proven outreach scripts that get replies",
              "Turn conversations into paying clients",
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: CTA_ORANGE + "22" }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: CTA_ORANGE }} />
                </div>
                <span className="text-[14px] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <CTAButton />
          <InstantAccessNote />
        </FadeIn>

        <FadeIn delay={0.25}>
          <TrustLine />
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── DIVIDER ───────── */
function Divider() {
  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="h-px bg-white/[0.06]" />
    </div>
  );
}

/* ───────── QUICK BENEFITS STRIP ───────── */
function QuickBenefitsSection() {
  const items = [
    { icon: Layers, label: "Simple System", desc: "A clear structured process — no chaos." },
    { icon: FileText, label: "Copy-Paste Templates", desc: "Ready scripts, prompts and workflows." },
    { icon: Users, label: "Beginner Friendly", desc: "No marketing or agency background needed." },
    { icon: Zap, label: "Instant Access", desc: "Start immediately after purchase." },
  ];

  return (
    <section className="px-6 py-10">
      <div className="max-w-[960px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.05}>
              <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 h-full">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: CTA_ORANGE + "18" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                </div>
                <div>
                  <div className="text-[13px] text-white/80 font-medium mb-0.5">{item.label}</div>
                  <div className="text-[12px] text-[#9CA3AF] leading-[1.5]">{item.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── HOW IT WORKS ───────── */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Find Businesses",
      desc: "Use the filtering method to identify high-potential businesses likely to need client acquisition help.",
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Send Outreach",
      desc: "Use copy-paste scripts and AI-assisted messaging to contact businesses and start real conversations.",
    },
    {
      num: "03",
      icon: Users,
      title: "Turn Replies Into Clients",
      desc: "Follow the workflow to handle responses, follow up professionally, and convert interest into paying deals.",
    },
  ];

  return (
    <section id="how-it-works" className="px-6 py-20 md:py-24">
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Process</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              How The System Works
            </h2>
            <p className="text-[#9CA3AF] text-[14px]">Three simple steps. No complexity. No guesswork.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.06}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:bg-white/[0.06] transition-colors h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: CTA_ORANGE + "18" }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                  </div>
                  <span className="text-[11px] text-white/20 tracking-[0.1em] uppercase">Step {s.num}</span>
                </div>
                <h3 className="text-[17px] text-white/90 mb-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[13px] text-[#9CA3AF] leading-[1.55]">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <p className="text-center mt-8 text-white/15 text-[12px] tracking-[0.06em] uppercase">
            That's it. Simple.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── WHAT YOU GET ───────── */
function WhatYouGetSection() {
  const items = [
    {
      icon: Play,
      text: "Step-by-step video training",
      desc: "Complete video training explaining the system from zero to first clients.",
    },
    {
      icon: Search,
      text: "AI lead generation system",
      desc: "Use AI tools to identify businesses with real client acquisition opportunities.",
    },
    {
      icon: MessageSquare,
      text: "Outreach script library",
      desc: "Proven cold DM and email scripts designed to start conversations with businesses.",
    },
    {
      icon: LayoutTemplate,
      text: "Copy-paste templates",
      desc: "Ready-to-use templates for every step of the outreach and follow-up workflow.",
    },
    {
      icon: Database,
      text: "Notion CRM system",
      desc: "Simple lead tracking and workflow system to manage all your outreach professionally.",
    },
    {
      icon: Briefcase,
      text: "Client acquisition frameworks",
      desc: "Structured methods to approach businesses and convert conversations into clients.",
    },
  ];

  return (
    <section id="what-you-get" className="px-6 py-20 md:py-24">
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">What's Inside</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              What You Get Inside
            </h2>
            <p className="text-[#9CA3AF] text-[14px] max-w-[400px] mx-auto">
              Everything structured so you can simply copy the system and start.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <FadeIn key={item.text} delay={i * 0.04}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:bg-white/[0.06] transition-colors h-full">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3.5"
                  style={{ backgroundColor: CTA_ORANGE + "18" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                </div>
                <h4 className="text-[14px] text-white/80 mb-1 font-medium">{item.text}</h4>
                <p className="text-[13px] text-[#9CA3AF] leading-[1.5]">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Niche selection guide included", "Future updates", "Lifetime access"].map((bonus) => (
              <span key={bonus} className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF]/60">
                <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
                {bonus}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── PRODUCT PREVIEW ───────── */
function ProductPreviewSection() {
  const previews = [
    {
      icon: Search,
      title: "Lead Research Dashboard",
      lines: ["Business filter method", "Niche scoring system", "AI-assisted sourcing"],
    },
    {
      icon: MessageSquare,
      title: "Outreach Script Pack",
      lines: ["20+ proven scripts", "Cold DM templates", "Follow-up sequences"],
    },
    {
      icon: Database,
      title: "Notion Client CRM",
      lines: ["Lead tracking board", "Conversation log", "Status pipeline"],
    },
    {
      icon: LayoutTemplate,
      title: "AI Prompt Templates",
      lines: ["Lead identification prompts", "Outreach generators", "Reply handlers"],
    },
    {
      icon: Play,
      title: "Video Training Library",
      lines: ["Step-by-step walkthroughs", "System setup guide", "Live examples"],
    },
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Inside The System</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              A Look Inside
            </h2>
            <p className="text-[#9CA3AF] text-[14px]">
              This is a real system — not just theory. Here's what you're getting access to.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {previews.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden hover:bg-white/[0.05] transition-colors h-full">
                {/* Mockup header bar */}
                <div className="bg-white/[0.04] border-b border-white/[0.06] px-4 py-2.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="ml-2 text-[11px] text-white/20 tracking-[0.04em]">{p.title}</span>
                </div>
                <div className="p-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: CTA_ORANGE + "18" }}
                  >
                    <p.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                  </div>
                  <h4 className="text-[14px] text-white/80 font-medium mb-3">{p.title}</h4>
                  <ul className="space-y-1.5">
                    {p.lines.map((line) => (
                      <li key={line} className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
                        <Check className="w-3 h-3 text-white/20 shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
          {/* Spacer card with CTA */}
          <FadeIn delay={0.28}>
            <div
              className="rounded-xl border p-5 flex flex-col items-start justify-between h-full"
              style={{ borderColor: CTA_ORANGE + "30", backgroundColor: CTA_ORANGE + "08" }}
            >
              <div>
                <p className="text-[12px] tracking-[0.06em] uppercase mb-2" style={{ color: CTA_ORANGE }}>
                  Everything included
                </p>
                <p className="text-[14px] text-white/70 leading-[1.6]">
                  All of this is available immediately after purchase. One-time payment, lifetime access.
                </p>
              </div>
              <button
                onClick={scrollToPricing}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: CTA_ORANGE }}
              >
                See pricing
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────── REALITY CHECK ───────── */
function RealityCheckSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-8 md:p-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Reality Check</p>
            <h2
              className="text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-white mb-6"
              style={{ fontFamily: SERIF }}
            >
              Why Most People Never Get Clients
            </h2>
            <div className="space-y-3.5 text-[#9CA3AF] text-[15px] leading-[1.65]">
              <p>
                Most people jump between YouTube videos, random guides, and AI tools — without a clear process. They try dozens of strategies, spend months learning, and still never actually contact a business.
              </p>
              <p>
                The problem isn't motivation. It's that there's no structured system to follow.
              </p>
              <p>
                AI Client Machine solves this by giving you a{" "}
                <span className="text-white">simple, step-by-step client acquisition workflow</span>. You don't need to invent anything. You don't need to figure it out from scratch.
              </p>
              <p className="text-white/70">Just follow the steps.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── WHAT MAKES IT DIFFERENT ───────── */
function WhatMakesDifferentSection() {
  const cards = [
    {
      icon: Layers,
      title: "Structured System Instead Of Chaos",
      desc: "Most people try random outreach methods with no clear process. AI Client Machine gives you a repeatable workflow designed for client acquisition.",
    },
    {
      icon: Search,
      title: "AI-Assisted Lead Generation",
      desc: "Instead of manually searching for leads, you use AI tools to speed up the process and identify the right businesses faster.",
    },
    {
      icon: MessageSquare,
      title: "Copy-Paste Scripts",
      desc: "No need to invent messages or wonder what to say. Use outreach scripts designed specifically to start conversations with businesses.",
    },
    {
      icon: Database,
      title: "Client Workflow Included",
      desc: "Track leads, manage conversations and handle follow-ups inside a simple system — not scattered across notes and spreadsheets.",
    },
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Why This</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              What Makes AI Client Machine Different
            </h2>
            <p className="text-[#9CA3AF] text-[14px] max-w-[440px] mx-auto">
              Not another generic course. A structured operating system for client acquisition.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.06}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:bg-white/[0.06] transition-colors h-full">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: CTA_ORANGE + "18" }}
                >
                  <card.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                </div>
                <h3 className="text-[16px] text-white/85 mb-2 tracking-[-0.01em]">{card.title}</h3>
                <p className="text-[13px] text-[#9CA3AF] leading-[1.6]">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── VALUE STACK ───────── */
function ValueStackSection() {
  const items = [
    { label: "Complete Client Acquisition Training", value: "$397" },
    { label: "AI Lead Generation Framework", value: "$297" },
    { label: "Outreach Script Library (20+ scripts)", value: "$197" },
    { label: "Copy-Paste Template Pack", value: "$147" },
    { label: "Notion Client CRM System", value: "$247" },
    { label: "Niche Selection Guide", value: "$97" },
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 md:p-10">
            <div className="text-center mb-8">
              <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Total Value</p>
              <h2
                className="text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-white"
                style={{ fontFamily: SERIF }}
              >
                Everything Included Inside AI Client Machine
              </h2>
            </div>

            <ul className="space-y-3 mb-8">
              {items.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: CTA_ORANGE }} />
                    <span className="text-[14px] text-[#9CA3AF]">{item.label}</span>
                  </div>
                  <span className="text-[13px] text-white/30 shrink-0 line-through">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/[0.07] pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#9CA3AF]">Total real value</span>
                <span className="text-[16px] text-white/40 line-through">$1,382</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-white font-medium">Pro Plan — your price today</span>
                <span className="text-[22px] text-white font-medium tracking-[-0.02em]">$300</span>
              </div>
              <p className="mt-2 text-[12px] text-[#9CA3AF]/50">One-time payment · Lifetime access · Instant delivery</p>
            </div>

            <button
              onClick={scrollToPricing}
              className="w-full mt-6 py-3 rounded-full text-[14px] text-white font-medium transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: CTA_ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
            >
              Get Instant Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── WHO IS IT FOR ───────── */
function WhoIsForSection() {
  const isFor = [
    "Beginners who want a simple way to start online",
    "Freelancers who need a structured client acquisition system",
    "Agency owners looking for better outreach processes",
    "Anyone who wants to use AI tools to find business opportunities",
  ];

  const isNotFor = [
    "People looking for overnight money",
    "People unwilling to do any outreach",
    "People expecting clients without taking action",
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">For Who</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white"
              style={{ fontFamily: SERIF }}
            >
              Who This System Is For
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          <FadeIn delay={0.05}>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 h-full">
              <p className="text-[12px] text-white/40 tracking-[0.06em] uppercase mb-5">This is for</p>
              <ul className="space-y-3.5">
                {isFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: CTA_ORANGE + "22" }}
                    >
                      <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
                    </div>
                    <span className="text-[14px] text-white/70 leading-[1.55]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 h-full">
              <p className="text-[12px] text-white/25 tracking-[0.06em] uppercase mb-5">This is NOT for</p>
              <ul className="space-y-3.5">
                {isNotFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/[0.05]">
                      <span className="text-[10px] text-white/30">✕</span>
                    </div>
                    <span className="text-[14px] text-[#9CA3AF]/60 leading-[1.55]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ───────── PRICING ───────── */
function PricingSection() {
  const navigate = useNavigate();

  const bestFor = ["Best for getting started", "Best value · Most popular", "Best for serious operators"];

  return (
    <section id="pricing" className="px-6 py-20 md:py-24">
      <div className="max-w-[1060px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Choose Your Plan</p>
            <h2
              className="text-[40px] md:text-[52px] leading-[1.08] tracking-[-0.04em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              Pricing
            </h2>
            <p className="text-[#9CA3AF] text-[15px] max-w-[420px] mx-auto">
              One-time payment. Lifetime access. Start immediately after purchase.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-3">
          {PLANS.map((plan, idx) => (
            <FadeIn key={plan.name} delay={idx * 0.05}>
              <div
                className={`rounded-2xl p-6 md:p-7 flex flex-col h-full border transition-colors ${
                  plan.popular
                    ? "border-orange-500/30 bg-white/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
                style={plan.popular ? { boxShadow: `0 0 0 1px ${CTA_ORANGE}22` } : {}}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-[17px] text-white">{plan.name}</h3>
                    {plan.popular && (
                      <span
                        className="text-[10px] text-white px-2 py-0.5 rounded-full tracking-[0.03em] font-medium"
                        style={{ backgroundColor: CTA_ORANGE }}
                      >
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9CA3AF]/60 tracking-[0.04em] uppercase mb-1">
                    {bestFor[idx]}
                  </p>
                  <p className="text-[13px] text-[#9CA3AF] leading-[1.5]">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-[36px] md:text-[40px] text-white tracking-[-0.04em]">
                    {plan.priceLabel}
                  </span>
                  <span className="text-[13px] text-[#9CA3AF]">/{plan.priceSub}</span>
                </div>

                <button
                  onClick={() => navigate(`/checkout/${plan.id}`)}
                  className="w-full py-3 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 mb-2"
                  style={{
                    backgroundColor: plan.popular ? CTA_ORANGE : "rgba(255,255,255,0.06)",
                    color: plan.popular ? "#fff" : "rgba(255,255,255,0.7)",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    if (plan.popular) e.currentTarget.style.backgroundColor = "#e65e00";
                    else e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) e.currentTarget.style.backgroundColor = CTA_ORANGE;
                    else e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {plan.btnText}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[11px] text-[#9CA3AF]/40 text-center mb-6 flex items-center justify-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  Instant access · Lifetime included
                </p>

                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#9CA3AF]">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: plan.popular ? CTA_ORANGE : "rgba(255,255,255,0.25)" }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { icon: Shield, text: "Secure checkout" },
              { icon: Zap, text: "Instant delivery" },
              { icon: TrendingUp, text: "Lifetime access" },
            ].map((item) => (
              <span key={item.text} className="inline-flex items-center gap-2 text-[13px] text-[#9CA3AF]/60">
                <item.icon className="w-3.5 h-3.5" />
                {item.text}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
function FAQSection() {
  const faqs = [
    {
      q: "Do I need experience to use this system?",
      a: "No. The system is designed for beginners. Everything is explained step by step so you can follow along regardless of your background.",
    },
    {
      q: "Do I need marketing or agency knowledge?",
      a: "No. You don't need any marketing knowledge or agency experience. The system gives you the exact process, scripts, and templates to follow.",
    },
    {
      q: "Is this a course or just templates?",
      a: "It's a complete system — including step-by-step video training, outreach scripts, copy-paste templates, a Notion CRM, and client acquisition frameworks. Not just a PDF.",
    },
    {
      q: "How fast do I get access?",
      a: "Immediately after payment. You'll receive access details and can start within minutes.",
    },
    {
      q: "Do I need paid tools to use this system?",
      a: "Some tools used in the system are free. There are optional paid tools that can speed things up, but you can start without them.",
    },
    {
      q: "Is this only for agencies?",
      a: "No. Freelancers and complete beginners can use this system. It's designed to work whether you're starting from zero or already doing some client work.",
    },
    {
      q: "Do I need to be good at sales?",
      a: "No. The scripts and frameworks handle the messaging for you. You follow the system — no sales background needed.",
    },
    {
      q: "What's the difference between Starter and Pro?",
      a: "Starter gives you the training and the method. Pro includes everything in Starter plus the outreach scripts, AI templates, Notion CRM, and client acquisition frameworks — the full working system.",
    },
  ];

  return (
    <section id="faq" className="px-6 py-20 md:py-24">
      <div className="max-w-[640px] mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">FAQ</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white"
              style={{ fontFamily: SERIF }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </FadeIn>

        <div className="border border-white/[0.08] rounded-xl overflow-hidden">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.02}>
              <FAQItem q={faq.q} a={faq.a} isLast={i === faqs.length - 1} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={!isLast ? "border-b border-white/[0.08]" : ""}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-[14px] text-white/80 pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 md:px-6 pb-4 text-[14px] text-[#9CA3AF] leading-[1.6]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────── FINAL CTA ───────── */
function FinalCTASection() {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Get Started</p>
          <h2
            className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-4"
            style={{ fontFamily: SERIF }}
          >
            Start Building Your Client Acquisition System Today
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-[1.6] mb-2 max-w-[460px] mx-auto">
            Stop guessing what works. Follow a structured process designed to help you identify businesses, start conversations, and turn replies into clients.
          </p>
          <p className="text-white/25 text-[13px] tracking-[0.04em] uppercase mb-10">
            One-time payment · Lifetime access
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-6">
            <button
              onClick={() => navigate("/checkout/starter")}
              className="w-full sm:w-auto bg-white/[0.06] text-white/60 hover:bg-white/[0.1] border border-white/[0.08] px-7 py-2.5 rounded-full text-[14px] transition-colors"
            >
              Starter — $50
            </button>
            <button
              onClick={() => navigate("/checkout/pro")}
              className="w-full sm:w-auto px-7 py-2.5 rounded-full text-[14px] text-white font-medium transition-colors flex items-center justify-center gap-1.5"
              style={{ backgroundColor: CTA_ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
            >
              Pro — $300 (Best Value)
              <Star className="w-3 h-3 fill-white" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {["Beginner friendly", "Step-by-step system", "Templates included"].map((text) => (
              <span key={text} className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF]/60">
                <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
                {text}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── STICKY CTA (MOBILE ONLY) ───────── */
function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0F0F10]/90 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3">
      <button
        onClick={scrollToPricing}
        className="w-full py-3 rounded-full text-[14px] text-white font-medium flex items-center justify-center gap-2 transition-all"
        style={{ backgroundColor: CTA_ORANGE }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
      >
        Get Instant Access — from $50
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="px-6 pb-20 md:pb-10 pt-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="h-px bg-white/[0.06] mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Logo className="w-[22px] h-[15px] opacity-25" />
            <span className="text-[13px] text-[#9CA3AF]/50">AI Client Machine</span>
          </div>
          <p className="text-[12px] text-[#9CA3AF]/30">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ───────── LANDING PAGE ───────── */
export function LandingPage() {
  return (
    <div
      className="min-h-screen text-white selection:bg-white/10"
      style={{
        backgroundColor: "#0F0F10",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <Header />
      <HeroSection />
      <Divider />
      <QuickBenefitsSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <WhatYouGetSection />
      <Divider />
      <ProductPreviewSection />
      <Divider />
      <RealityCheckSection />
      <Divider />
      <WhatMakesDifferentSection />
      <Divider />
      <ValueStackSection />
      <Divider />
      <WhoIsForSection />
      <Divider />
      <PricingSection />
      <Divider />
      <FAQSection />
      <Divider />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
    </div>
  );
}
