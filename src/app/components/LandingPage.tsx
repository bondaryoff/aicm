import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown, ArrowRight, Check, Zap, Users,
  BookOpen, FileText, LayoutTemplate, Briefcase,
  Menu, X, Star, ArrowUpRight, Database, MessageSquare,
  Play, Search, Shield, Layers, TrendingUp, XCircle
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
function CTAButton({
  text = "Start Getting Clients",
  className = "",
  onClick,
}: {
  text?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick ?? scrollToPricing}
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

/* ───────── TRUST STRIP ───────── */
function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
      {[
        "Instant access",
        "Lifetime access",
        "Beginner friendly",
        "One-time payment",
      ].map((text) => (
        <span key={text} className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF]/60">
          <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
          {text}
        </span>
      ))}
    </div>
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
              Start Getting Clients
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
            className="text-[40px] md:text-[54px] lg:text-[62px] leading-[1.08] tracking-[-0.04em] text-white mb-3"
            style={{ fontFamily: SERIF }}
          >
            Get Your First Clients Using AI Outreach
          </h1>
        </FadeIn>

        <FadeIn delay={0.11}>
          <p className="text-[14px] md:text-[15px] text-[#9CA3AF]/60 mb-5 tracking-[0.01em]">
            Without guesswork, complicated funnels, or agency experience
          </p>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="text-[15px] md:text-[16px] text-[#9CA3AF] leading-[1.7] max-w-[520px] mx-auto mb-8">
            This step-by-step system shows you exactly how to find businesses that need help, send proven messages, handle replies, and close your first paying clients using AI.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="flex flex-col items-start sm:items-center gap-2.5 mb-10 sm:max-w-[420px] mx-auto">
            {[
              "Find real businesses that are already likely to buy",
              "Send outreach using copy-paste scripts for DMs and email",
              "Use AI to speed up lead research and save hours",
              "Turn replies into real paying clients",
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

        <FadeIn delay={0.22}>
          <CTAButton />
          <TrustStrip />
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
    { icon: Layers, label: "Simple System", desc: "A clear repeatable process — no chaos." },
    { icon: FileText, label: "Copy-Paste Scripts", desc: "Ready outreach messages for DMs and email." },
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

/* ───────── PAIN SECTION ───────── */
function PainSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-8 md:p-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">The Real Problem</p>
            <h2
              className="text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-white mb-6"
              style={{ fontFamily: SERIF }}
            >
              Why Most People Never Get Clients
            </h2>
            <div className="space-y-4 text-[#9CA3AF] text-[15px] leading-[1.7]">
              <p>
                Most beginners don't fail because they lack motivation.
                <br />
                <span className="text-white">They fail because they have no system.</span>
              </p>
              <p>They jump between YouTube videos, random AI tools, and random strategies. They try everything — and still never build a real outreach workflow.</p>
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-white/[0.06]">
                {["No process.", "No structure.", "No repeatable system."].map((t) => (
                  <span key={t} className="text-[14px] text-white/40">{t}</span>
                ))}
              </div>
              <p>
                They overthink, overlearn, and never actually start contacting businesses.
              </p>
              <p className="text-white font-medium">AI Client Machine fixes this.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-[13px] text-[#9CA3AF]/60 mb-4">You get a clear process to:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Find better leads",
                  "Send smarter outreach",
                  "Handle replies properly",
                  "Move conversations toward payment",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: CTA_ORANGE }} />
                    <span className="text-[13px] text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
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
      desc: "Use AI-assisted research to identify businesses that actually need help — not random cold leads.",
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Send Outreach",
      desc: "Use copy-paste scripts for DM and email outreach. Never wonder what to say first.",
    },
    {
      num: "03",
      icon: Users,
      title: "Convert Replies",
      desc: "Follow a simple workflow to handle interest, follow up properly, and close deals.",
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

        <div className="grid md:grid-cols-3 gap-3 mb-10">
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
          <div className="flex justify-center">
            <CTAButton text="Get Instant Access" />
          </div>
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
      desc: "Learn the exact workflow from first lead to first client. No theory overload — just the parts that help you move.",
    },
    {
      icon: Search,
      text: "AI lead research system",
      desc: "Find better businesses faster using AI-assisted filtering and lead sourcing. Stop messaging random companies.",
    },
    {
      icon: MessageSquare,
      text: "Outreach script library",
      desc: "Use 20+ ready-to-send DM and email templates. Never guess what to say first or how to start a conversation.",
    },
    {
      icon: ArrowRight,
      text: "Follow-up frameworks",
      desc: "Know exactly what to say after someone replies. Handle objections, continue conversations, and move leads toward a deal.",
    },
    {
      icon: Database,
      text: "Notion client CRM",
      desc: "Track every lead and stay organized. No more lost conversations or messy follow-ups scattered across notes.",
    },
    {
      icon: Layers,
      text: "AI prompt library",
      desc: "Ready-made prompts that help you find leads, write messages, respond faster, and save hours every week.",
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
            <p className="text-[#9CA3AF] text-[14px] max-w-[440px] mx-auto">
              Not just content — a working system with scripts, workflows, and tools you can start using today.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {items.map((item, i) => (
            <FadeIn key={item.text} delay={i * 0.04}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:bg-white/[0.06] transition-colors h-full">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3.5"
                  style={{ backgroundColor: CTA_ORANGE + "18" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                </div>
                <h4 className="text-[14px] text-white/80 mb-1.5 font-medium">{item.text}</h4>
                <p className="text-[13px] text-[#9CA3AF] leading-[1.55]">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center">
            <CTAButton text="Start Getting Clients" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
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

/* ───────── NOT A COURSE ───────── */
function NotACourseSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">What You're Actually Buying</p>
          <h2
            className="text-[28px] md:text-[38px] leading-[1.12] tracking-[-0.03em] text-white mb-6"
            style={{ fontFamily: SERIF }}
          >
            You're not buying another course.
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-[1.6] mb-8 max-w-[480px] mx-auto">
            Courses give you information. This gives you a system — the exact process, scripts, and tools to start getting results faster.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-left max-w-[540px] mx-auto">
            {[
              { label: "A clear process to follow", desc: "No guesswork on what to do next." },
              { label: "Scripts so you know what to say", desc: "Copy-paste messages for every step." },
              { label: "Faster execution", desc: "AI tools cut your research time in half." },
              { label: "A real shot at your first client", desc: "Or your next one — whatever the goal is." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: CTA_ORANGE + "22" }}
                >
                  <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
                </div>
                <div>
                  <div className="text-[13px] text-white/80 font-medium mb-0.5">{item.label}</div>
                  <div className="text-[12px] text-[#9CA3AF]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── BEFORE / AFTER ───────── */
function BeforeAfterSection() {
  const before = [
    "Random outreach with no clear target",
    "No scripts — no idea what to say",
    "No follow-up system",
    "Lost leads, scattered notes",
    "Weeks of learning, still not started",
  ];

  const after = [
    "Clear lead research process with AI",
    "20+ proven outreach scripts ready to send",
    "Follow-up frameworks for every scenario",
    "Notion CRM tracking every conversation",
    "Send your first outreach on day one",
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">The Difference</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white"
              style={{ fontFamily: SERIF }}
            >
              Before and After
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          <FadeIn delay={0.05}>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-4 h-4 text-white/20" />
                <p className="text-[12px] text-white/25 tracking-[0.06em] uppercase font-medium">Before</p>
              </div>
              <ul className="space-y-3">
                {before.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0 mt-2" />
                    <span className="text-[13px] text-[#9CA3AF]/50 leading-[1.5]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6"
              style={{ borderColor: CTA_ORANGE + "20" }}>
              <div className="flex items-center gap-2 mb-5">
                <Check className="w-4 h-4" style={{ color: CTA_ORANGE }} />
                <p className="text-[12px] tracking-[0.06em] uppercase font-medium" style={{ color: CTA_ORANGE }}>After</p>
              </div>
              <ul className="space-y-3">
                {after.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: CTA_ORANGE }} />
                    <span className="text-[13px] text-white/70 leading-[1.5]">{item}</span>
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
      icon: Layers,
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

/* ───────── WHAT MAKES IT DIFFERENT ───────── */
function WhatMakesDifferentSection() {
  const cards = [
    {
      icon: Layers,
      title: "Structured System Instead Of Chaos",
      desc: "Instead of random outreach methods, you follow a clear repeatable workflow designed for consistent client acquisition.",
    },
    {
      icon: Search,
      title: "AI-Assisted Lead Generation",
      desc: "Use AI to speed up research and find better leads faster — stop manually searching through random directories.",
    },
    {
      icon: MessageSquare,
      title: "Copy-Paste Scripts",
      desc: "Never wonder what to say again. Use outreach messages designed specifically to start real business conversations.",
    },
    {
      icon: Database,
      title: "Client Workflow System",
      desc: "Track leads, follow up properly and move conversations toward clients — all inside one simple system.",
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
    { label: "Follow-Up Framework Pack", value: "$147" },
    { label: "Notion Client CRM System", value: "$247" },
    { label: "AI Prompt Library", value: "$97" },
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
                Everything Included In AI Client Machine
              </h2>
            </div>

            <ul className="space-y-3 mb-8">
              {items.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: CTA_ORANGE }} />
                    <span className="text-[14px] text-[#9CA3AF]">{item.label}</span>
                  </div>
                  <span className="text-[13px] text-white/25 shrink-0 line-through">{item.value}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/[0.07] pt-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#9CA3AF]">Total real value</span>
                <span className="text-[16px] text-white/30 line-through">$1,382</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] text-white font-medium">Pro Plan — your price today</span>
                <span className="text-[24px] text-white font-medium tracking-[-0.02em]">$300</span>
              </div>
              <p className="text-[12px] text-[#9CA3AF]/50">
                One client can cover the full cost of this product. Everything after that is upside.
              </p>
            </div>

            <button
              onClick={scrollToPricing}
              className="w-full py-3 rounded-full text-[14px] text-white font-medium transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: CTA_ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
            >
              Start Getting Clients
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── AFTER PURCHASE ───────── */
function AfterPurchaseSection() {
  const steps = [
    { num: "1", text: "Get instant access to everything" },
    { num: "2", text: "Watch the setup training (30–60 min)" },
    { num: "3", text: "Choose your niche using the selection guide" },
    { num: "4", text: "Find businesses using the AI research system" },
    { num: "5", text: "Send your first outreach using the copy-paste scripts" },
    { num: "6", text: "Handle replies with the follow-up frameworks" },
    { num: "7", text: "Move conversations toward your first paying client" },
  ];

  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[640px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">After Purchase</p>
            <h2
              className="text-[28px] md:text-[36px] leading-[1.12] tracking-[-0.03em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              What Happens After You Buy
            </h2>
            <p className="text-[#9CA3AF] text-[14px]">
              Designed to be implemented immediately — not studied for months.
            </p>
          </div>

          <div className="space-y-2.5">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.04}>
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-medium text-white"
                    style={{ backgroundColor: CTA_ORANGE + "30", color: CTA_ORANGE }}
                  >
                    {step.num}
                  </div>
                  <span className="text-[14px] text-white/70">{step.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── WHO IS IT FOR ───────── */
function WhoIsForSection() {
  const isFor = [
    "Beginners who want a simple way to start getting clients online",
    "Freelancers who need a structured client acquisition system",
    "Agency builders looking for better outreach processes",
    "Service sellers who want to use AI to find business opportunities",
    "Anyone tired of watching videos but still having no clear process",
  ];

  const isNotFor = [
    "People expecting overnight money without doing outreach",
    "People unwilling to message businesses consistently",
    "People looking for done-for-you client delivery",
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
              <p className="text-[12px] text-white/40 tracking-[0.06em] uppercase mb-5">This is for you if</p>
              <ul className="space-y-3.5">
                {isFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: CTA_ORANGE + "22" }}
                    >
                      <Check className="w-3 h-3" style={{ color: CTA_ORANGE }} />
                    </div>
                    <span className="text-[13px] text-white/70 leading-[1.55]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 h-full">
              <p className="text-[12px] text-white/25 tracking-[0.06em] uppercase mb-5">This is NOT for you if</p>
              <ul className="space-y-3.5">
                {isNotFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/[0.05]">
                      <span className="text-[10px] text-white/30">✕</span>
                    </div>
                    <span className="text-[13px] text-[#9CA3AF]/50 leading-[1.55]">{item}</span>
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

        <div className="grid md:grid-cols-3 gap-3 mb-8">
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
                  <p className="text-[11px] text-[#9CA3AF]/60 tracking-[0.04em] uppercase mb-1.5">
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
          <p className="text-center text-[13px] text-[#9CA3AF]/50 mb-6">
            One client can cover the full cost of this product. Everything after that is upside.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: "Secure checkout" },
              { icon: Zap, text: "Instant delivery" },
              { icon: TrendingUp, text: "Lifetime access" },
            ].map((item) => (
              <span key={item.text} className="inline-flex items-center gap-2 text-[13px] text-[#9CA3AF]/50">
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

/* ───────── RISK REDUCTION ───────── */
function RiskReductionSection() {
  return (
    <section className="px-6 py-12">
      <FadeIn>
        <div className="max-w-[640px] mx-auto">
          <div
            className="rounded-xl border p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ borderColor: CTA_ORANGE + "25", backgroundColor: CTA_ORANGE + "06" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: CTA_ORANGE + "20" }}
            >
              <Shield className="w-5 h-5" style={{ color: CTA_ORANGE }} />
            </div>
            <div>
              <h3 className="text-[15px] text-white font-medium mb-1.5">Zero Risk</h3>
              <p className="text-[13px] text-[#9CA3AF] leading-[1.6]">
                One-time payment means no recurring fees. Instant access means you can start today. Lifetime access means you keep everything forever — including all future updates.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── FAQ ───────── */
function FAQSection() {
  const faqs = [
    {
      q: "Do I need experience to use this?",
      a: "No. The system is designed for beginners. Everything is explained step by step so you can follow along regardless of your background.",
    },
    {
      q: "Do I need marketing or agency knowledge?",
      a: "No. You don't need any marketing knowledge or agency experience. The system gives you the exact process, scripts, and templates to follow.",
    },
    {
      q: "Is this a course or just templates?",
      a: "It's a complete system — including step-by-step video training, outreach scripts, copy-paste templates, a Notion CRM, follow-up frameworks, and an AI prompt library. Not just a PDF.",
    },
    {
      q: "Is this only theory?",
      a: "No. You get real scripts, workflows, CRM templates, AI prompts, and step-by-step training — tools you can actually use, not just concepts to read about.",
    },
    {
      q: "What kind of businesses can I use this for?",
      a: "Any service-based niche where businesses need client acquisition help. The niche selection guide inside helps you identify the best targets for your outreach.",
    },
    {
      q: "Do I need paid ads or a big budget?",
      a: "No. This system is built around outreach and AI-assisted research — not paid advertising. You don't need a budget to get started.",
    },
    {
      q: "What if I'm not confident in sales?",
      a: "That's exactly why the scripts, reply handlers, and follow-up frameworks are included. You don't need to \"sell\" — you follow a process that handles the conversation for you.",
    },
    {
      q: "How fast do I get access?",
      a: "Immediately after payment. You'll receive access details and can start within minutes.",
    },
    {
      q: "What's the difference between Starter and Pro?",
      a: "Starter gives you the training and the core method. Pro includes everything in Starter plus the outreach scripts, AI templates, Notion CRM, and follow-up frameworks — the full working system.",
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
            className="text-[30px] md:text-[42px] leading-[1.1] tracking-[-0.03em] text-white mb-4"
            style={{ fontFamily: SERIF }}
          >
            Stop guessing. Start building a real client acquisition system.
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-[1.7] mb-2 max-w-[460px] mx-auto">
            AI Client Machine gives you the exact structure, scripts, workflows, and tools to start finding leads, sending outreach, and turning replies into paying clients.
          </p>
          <p className="text-white/25 text-[13px] tracking-[0.04em] uppercase mb-10">
            One-time payment · Lifetime access · Start today
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
      <PainSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <WhatYouGetSection />
      <Divider />
      <NotACourseSection />
      <Divider />
      <BeforeAfterSection />
      <Divider />
      <ProductPreviewSection />
      <Divider />
      <WhatMakesDifferentSection />
      <Divider />
      <ValueStackSection />
      <Divider />
      <AfterPurchaseSection />
      <Divider />
      <WhoIsForSection />
      <Divider />
      <PricingSection />
      <Divider />
      <RiskReductionSection />
      <Divider />
      <FAQSection />
      <Divider />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
    </div>
  );
}
