import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown, ArrowRight, Check, Zap, Target, Users,
  BookOpen, FileText, LayoutTemplate, Briefcase, TrendingUp,
  Menu, X, Star, ArrowUpRight, Copy
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
      className={`inline-flex items-center gap-2.5 text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer ${className}`}
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
        { icon: Check, text: "No experience needed" },
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
    <p className="mt-3 text-[12px] text-[#9CA3AF]/70 flex items-center justify-center gap-1.5">
      <Zap className="w-3 h-3" />
      Instant access after payment
    </p>
  );
}

/* ───────── HEADER ───────── */
const NAV_ITEMS = [
  { label: "System", id: "system" },
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
            className="ml-3 px-4 py-1.5 rounded-full text-[14px] text-white transition-colors"
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
              className="w-full text-white transition-colors px-5 py-3 rounded-full text-[15px] mt-3"
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
    <section className="pt-[130px] pb-20 px-6">
      <div className="max-w-[720px] mx-auto text-center">
        <FadeIn>
          <div className="flex justify-center mb-8">
            <Logo className="w-[56px] h-[39px] opacity-60" />
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1
            className="text-[42px] md:text-[56px] lg:text-[64px] leading-[1.08] tracking-[-0.04em] text-white mb-5"
            style={{ fontFamily: SERIF }}
          >
            AI Client Machine
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-[16px] md:text-[17px] text-[#9CA3AF] leading-[1.65] max-w-[520px] mx-auto mb-10">
            A simple system that shows how to use AI tools to find businesses,
            generate leads and turn them into paying clients.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="space-y-1 mb-10">
            <p className="text-[14px] text-[#9CA3AF]/70">You don't need experience.</p>
            <p className="text-[14px] text-[#9CA3AF]/70">You don't need marketing knowledge.</p>
            <p className="text-[14px] text-white/80">Just copy the system step by step.</p>
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
  return <div className="max-w-[1200px] mx-auto px-6"><div className="h-px bg-white/[0.06]" /></div>;
}

/* ───────── BLOCK 2: JUST COPY ───────── */
function JustCopySection() {
  return (
    <section id="system" className="px-6 py-20 md:py-24">
      <div className="max-w-[600px] mx-auto text-center">
        <FadeIn>
          <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">The Method</p>
          <h2
            className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-5"
            style={{ fontFamily: SERIF }}
          >
            Just Copy The System
          </h2>
          <div className="space-y-2.5 text-[#9CA3AF] text-[15px] leading-[1.6] mb-10">
            <p>AI Client Machine is designed to be extremely simple.</p>
            <p>You don't need to invent anything.</p>
            <p>You don't need complicated strategies.</p>
          </div>
        </FadeIn>

        <div className="space-y-2.5">
          {["Copy the process", "Use the same scripts", "Apply the same workflow"].map((t, i) => (
            <FadeIn key={t} delay={i * 0.05}>
              <div className="flex items-center gap-3.5 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3.5 hover:bg-white/[0.06] transition-colors text-left">
                <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Copy className="w-3 h-3 text-white/40" />
                </div>
                <span className="text-[14px] text-white/80">{t}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-8 text-[#9CA3AF] text-[14px]">Everything is already prepared.</p>
          <p className="mt-1 text-white/50 text-[13px] tracking-[0.04em] uppercase">Just follow the steps.</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── BLOCK 3: HOW IT WORKS ───────── */
function HowItWorksSection() {
  const steps = [
    { num: "01", icon: Target, title: "Find Businesses", desc: "Identify high-potential businesses using the proven method." },
    { num: "02", icon: FileText, title: "Use Scripts", desc: "Apply ready-to-use outreach scripts that convert." },
    { num: "03", icon: Users, title: "Get Clients", desc: "Turn conversations into paying clients systematically." },
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
                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center mb-4">
                  <s.icon className="w-4 h-4 text-white/40" />
                </div>
                <span className="text-[11px] text-white/15 tracking-[0.1em] uppercase">{s.num}</span>
                <h3 className="text-[17px] text-white/90 mt-1 mb-2 tracking-[-0.01em]">{s.title}</h3>
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

/* ───────── BLOCK 4: WHAT YOU GET ───────── */
function WhatYouGetSection() {
  const items = [
    { icon: BookOpen, text: "Step-by-step training", desc: "Complete video training from zero to client" },
    { icon: Zap, text: "AI client generation", desc: "Leverage AI tools for lead generation" },
    { icon: FileText, text: "Outreach scripts", desc: "Proven scripts that get responses" },
    { icon: LayoutTemplate, text: "Ready templates", desc: "Copy-paste templates for every step" },
    { icon: Briefcase, text: "Business frameworks", desc: "Structured frameworks for scaling" },
    { icon: TrendingUp, text: "Acquisition strategy", desc: "Complete client acquisition playbook" },
  ];

  return (
    <section id="what-you-get" className="px-6 py-20 md:py-24">
      <div className="max-w-[960px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">What's Inside</p>
            <h2
              className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white"
              style={{ fontFamily: SERIF }}
            >
              What You Get Inside
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <FadeIn key={item.text} delay={i * 0.04}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:bg-white/[0.06] transition-colors h-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center mb-3.5">
                  <item.icon className="w-4 h-4 text-white/40" />
                </div>
                <h4 className="text-[14px] text-white/80 mb-1">{item.text}</h4>
                <p className="text-[13px] text-[#9CA3AF] leading-[1.5]">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center mt-8 text-[#9CA3AF] text-[14px]">
            Everything is structured so you can simply <span className="text-white/70">copy the system</span>.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────── BLOCK 5: AUTHORITY ───────── */
function AuthoritySection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-8 md:p-12 text-center">
            <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Proven System</p>
            <h2
              className="text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-white mb-6"
              style={{ fontFamily: SERIF }}
            >
              A Proven Client Acquisition System
            </h2>
            <div className="space-y-3.5 text-[#9CA3AF] text-[15px] leading-[1.65] max-w-[500px] mx-auto">
              <p>Businesses constantly need new clients.</p>
              <p>AI Client Machine shows how to identify these businesses and approach them with structured systems.</p>
              <p>Instead of guessing what works, you follow a{" "}<span className="text-white">clear process</span> designed for client acquisition.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── BLOCK 6: SIMPLICITY ───────── */
function SimplicitySection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Simplicity</p>
          <h2
            className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-5"
            style={{ fontFamily: SERIF }}
          >
            Designed To Be Simple
          </h2>
          <div className="space-y-2.5 text-[#9CA3AF] text-[15px] leading-[1.6] mb-10">
            <p>Most online business models are complicated.</p>
            <p>AI Client Machine <span className="text-white">removes complexity</span>.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            {["Follow the steps", "Use the scripts", "Apply the templates"].map((text) => (
              <div key={text} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3">
                <ArrowRight className="w-3 h-3 text-white/25" />
                <span className="text-[13px] text-[#9CA3AF]">{text}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-white/30 text-[13px] tracking-[0.04em] uppercase">Just copy the system.</p>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── BLOCK 7: SOCIAL PROOF ───────── */
function SocialProofSection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[860px] mx-auto">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-[1fr,auto] gap-10 items-center">
              <div>
                <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Why This System</p>
                <h2
                  className="text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.02em] text-white mb-5"
                  style={{ fontFamily: SERIF }}
                >
                  Why People Choose This System
                </h2>
                <div className="space-y-3 text-[#9CA3AF] text-[15px] leading-[1.65]">
                  <p>This system focuses on one thing:{" "}<span className="text-white">getting clients</span>.</p>
                  <p>Instead of learning dozens of strategies, you follow a structured process designed to identify opportunities and approach businesses.</p>
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2.5">
                {[
                  { num: "1", label: "Focus" },
                  { num: "∞", label: "Clients" },
                  { num: "0", label: "Guesswork" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-3.5 text-center flex-1 md:min-w-[110px]">
                    <div className="text-[22px] text-white mb-0.5">{s.num}</div>
                    <div className="text-[10px] tracking-[0.08em] text-[#9CA3AF]/60 uppercase">{s.label}</div>
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

/* ───────── BLOCK 8: PRICING ───────── */
function PricingSection() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="px-6 py-20 md:py-24">
      <div className="max-w-[1060px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2
              className="text-[40px] md:text-[52px] leading-[1.08] tracking-[-0.04em] text-white mb-3"
              style={{ fontFamily: SERIF }}
            >
              Pricing
            </h2>
            <p className="text-[#9CA3AF] text-[15px] max-w-[420px] mx-auto">
              Choose the plan that fits your goals. One-time payment, lifetime access.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 border border-white/[0.08] rounded-2xl overflow-hidden">
          {PLANS.map((plan, idx) => (
            <FadeIn key={plan.name} delay={idx * 0.05}>
              <div
                className={`p-6 md:p-7 h-full flex flex-col ${
                  idx < PLANS.length - 1 ? "border-b md:border-b-0 md:border-r border-white/[0.08]" : ""
                } ${plan.popular ? "bg-white/[0.03]" : ""}`}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[17px] text-white">{plan.name}</h3>
                    {plan.popular && (
                      <span
                        className="text-[10px] text-white px-2 py-0.5 rounded-full tracking-[0.03em]"
                        style={{ backgroundColor: CTA_ORANGE }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#9CA3AF] leading-[1.5]">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-[36px] md:text-[40px] text-white tracking-[-0.04em]">{plan.priceLabel}</span>
                  <span className="text-[13px] text-[#9CA3AF]">/{plan.priceSub}</span>
                </div>

                <button
                  onClick={() => navigate(`/checkout/${plan.id}`)}
                  className="w-full py-2.5 rounded-full text-[14px] transition-all duration-200 flex items-center justify-center gap-1.5 mb-2"
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

                <p className="text-[11px] text-[#9CA3AF]/50 text-center mb-6 flex items-center justify-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  Instant access after payment
                </p>

                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-[#9CA3AF]">
                      <Check className="w-4 h-4 text-white/25 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── BLOCK 9: URGENCY ───────── */
function UrgencySection() {
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-[12px] text-[#9CA3AF]/60 tracking-[0.08em] uppercase mb-4">Don't Wait</p>
          <h2
            className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-5"
            style={{ fontFamily: SERIF }}
          >
            Why Most People Never Start
          </h2>
          <div className="space-y-3 text-[#9CA3AF] text-[15px] leading-[1.65] max-w-[480px] mx-auto mb-10">
            <p>Many people spend months trying to understand complicated business models.</p>
            <p>AI Client Machine <span className="text-white">removes that confusion</span>.</p>
            <p>Instead of researching endless strategies, you can{" "}<span className="text-white/80">start with a structured system today</span>.</p>
          </div>
          <CTAButton text="Start Getting Clients" />
          <InstantAccessNote />
          <TrustLine />
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── BLOCK 10: FAQ ───────── */
function FAQSection() {
  const faqs = [
    { q: "Do I need experience?", a: "No. The system is designed for beginners. Everything is explained step by step so you can follow along regardless of your background." },
    { q: "Is this complicated?", a: "No. You simply copy the process step by step. The system removes all complexity so you can focus on getting results." },
    { q: "What happens after payment?", a: "You instantly receive a download link by email. You'll get immediate access to all materials included in your plan." },
    { q: "Can I start today?", a: "Yes. You can start immediately after purchase. The system is designed for quick implementation." },
  ];

  return (
    <section id="faq" className="px-6 py-20 md:py-24">
      <div className="max-w-[640px] mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
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
            <FadeIn key={faq.q} delay={i * 0.03}>
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
        <ChevronDown className={`w-4 h-4 text-[#9CA3AF] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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

/* ───────── BLOCK 11: FINAL CTA ───────── */
function FinalCTASection() {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-20 md:py-24">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="text-[30px] md:text-[40px] leading-[1.12] tracking-[-0.03em] text-white mb-4"
            style={{ fontFamily: SERIF }}
          >
            Start Using The System Today
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-[1.6] mb-2">Stop trying to figure everything out alone.</p>
          <p className="text-white/30 text-[13px] tracking-[0.04em] uppercase mb-10">Just copy the system and start.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => navigate("/checkout/starter")}
              className="w-full sm:w-auto bg-white/[0.06] text-white/60 hover:bg-white/[0.1] border border-white/[0.08] px-7 py-2.5 rounded-full text-[14px] transition-colors"
            >
              Starter — $50
            </button>
            <button
              onClick={() => navigate("/checkout/pro")}
              className="w-full sm:w-auto px-7 py-2.5 rounded-full text-[14px] text-white transition-colors flex items-center justify-center gap-1.5"
              style={{ backgroundColor: CTA_ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
            >
              Pro — $300
              <Star className="w-3 h-3 fill-white" />
            </button>
            <button
              onClick={() => navigate("/checkout/elite")}
              className="w-full sm:w-auto bg-white/[0.06] text-white/60 hover:bg-white/[0.1] border border-white/[0.08] px-7 py-2.5 rounded-full text-[14px] transition-colors"
            >
              Elite — $999
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="px-6 py-10">
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
      <JustCopySection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <WhatYouGetSection />
      <Divider />
      <AuthoritySection />
      <Divider />
      <SimplicitySection />
      <Divider />
      <SocialProofSection />
      <Divider />
      <PricingSection />
      <Divider />
      <UrgencySection />
      <Divider />
      <FAQSection />
      <Divider />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
