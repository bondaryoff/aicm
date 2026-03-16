import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Lock, CreditCard, Check, Shield, Zap,
  ChevronDown, Eye, EyeOff
} from "lucide-react";
import { Logo } from "./Logo";
import { SERIF, CTA_ORANGE, PLANS } from "./shared";

/* ───── INPUT COMPONENT ───── */
function Input({
  label, placeholder, value, onChange, type = "text", error, maxLength, icon,
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; error?: string;
  maxLength?: number; icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-[13px] text-white/50">{label}</label>
      <div
        className={`flex items-center gap-2 bg-white/[0.04] border rounded-lg px-3.5 py-2.5 transition-colors ${
          error ? "border-red-500/50" : focused ? "border-white/20" : "border-white/[0.08]"
        }`}
      >
        {icon && <span className="text-white/25">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/20 outline-none"
        />
      </div>
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
}

/* ───── CARD INPUT ───── */
function CardInput({
  value, onChange, error,
}: {
  value: string; onChange: (v: string) => void; error?: string;
}) {
  const format = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <Input
      label="Card number"
      placeholder="1234 5678 9012 3456"
      value={format(value)}
      onChange={(v) => onChange(v.replace(/\s/g, ""))}
      error={error}
      maxLength={19}
      icon={<CreditCard className="w-4 h-4" />}
    />
  );
}

/* ───── SELECT ───── */
function Select({
  label, value, onChange, options,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] text-white/50">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-[14px] text-white appearance-none outline-none focus:border-white/20 transition-colors"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#1a1a1b] text-white">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
      </div>
    </div>
  );
}

/* ───── STEPS INDICATOR ───── */
function Steps({ current }: { current: number }) {
  const steps = ["Details", "Payment", "Confirm"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors ${
              i < current
                ? "bg-green-500/20 text-green-400"
                : i === current
                ? "text-white"
                : "bg-white/[0.04] text-white/25"
            }`}
            style={i === current ? { backgroundColor: CTA_ORANGE } : {}}
          >
            {i < current ? <Check className="w-3 h-3" /> : i + 1}
          </div>
          <span className={`text-[12px] ${i === current ? "text-white/80" : "text-white/30"}`}>
            {s}
          </span>
          {i < steps.length - 1 && <div className="w-6 h-px bg-white/10" />}
        </div>
      ))}
    </div>
  );
}

/* ───── MAIN CHECKOUT ───── */
export function CheckoutPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1];

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [showCvc, setShowCvc] = useState(false);
  const [country, setCountry] = useState("US");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedTerms, setAgreedTerms] = useState(false);

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  const validateStep0 = () => {
    const errs: Record<string, string> = {};
    if (!email.includes("@")) errs.email = "Enter a valid email address";
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (cardNumber.replace(/\D/g, "").length < 16) errs.card = "Enter a valid card number";
    if (expiry.replace(/\D/g, "").length < 4) errs.expiry = "Enter MM/YY";
    if (cvc.length < 3) errs.cvc = "Enter CVC";
    if (!zip.trim()) errs.zip = "Enter ZIP/postal code";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateStep0()) setStep(1);
    else if (step === 1 && validateStep1()) setStep(2);
  };

  const handlePay = () => {
    if (!agreedTerms) {
      setErrors({ terms: "Please agree to terms" });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      // Save purchase to localStorage
      const purchase = {
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        email,
        firstName,
        lastName,
        date: new Date().toISOString(),
        orderId: "ACM-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
        status: "active",
      };
      localStorage.setItem("acm_purchase", JSON.stringify(purchase));
      navigate("/thank-you");
    }, 2500);
  };

  const countries = [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "NL", label: "Netherlands" },
    { value: "UA", label: "Ukraine" },
    { value: "PL", label: "Poland" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: "#0F0F10",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <Logo className="w-[24px] h-[17px]" />
            <span className="text-[14px] text-white/60">AI Client Machine</span>
          </Link>
          <div className="flex items-center gap-1.5 text-[12px] text-white/30">
            <Lock className="w-3 h-3" />
            Secure checkout
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to plans
        </Link>

        <div className="grid md:grid-cols-[1fr,380px] gap-10 md:gap-16">
          {/* LEFT — FORM */}
          <div>
            <h1
              className="text-[28px] md:text-[36px] text-white tracking-[-0.03em] mb-2"
              style={{ fontFamily: SERIF }}
            >
              Checkout
            </h1>
            <p className="text-[14px] text-white/40 mb-8">
              Complete your purchase to get instant access.
            </p>

            <Steps current={step} />

            <AnimatePresence mode="wait">
              {/* STEP 0: Contact details */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <h3 className="text-[16px] text-white/90 mb-4">Contact information</h3>
                  <Input
                    label="Email address"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="First name"
                      placeholder="John"
                      value={firstName}
                      onChange={setFirstName}
                      error={errors.firstName}
                    />
                    <Input
                      label="Last name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={setLastName}
                      error={errors.lastName}
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg text-[14px] text-white transition-colors mt-4 flex items-center justify-center gap-2"
                    style={{ backgroundColor: CTA_ORANGE }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
                  >
                    Continue to payment
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </motion.div>
              )}

              {/* STEP 1: Payment */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] text-white/90">Payment details</h3>
                    <button
                      onClick={() => { setStep(0); setErrors({}); }}
                      className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
                    >
                      Edit details
                    </button>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg px-4 py-3 flex items-center justify-between">
                    <span className="text-[13px] text-white/60">{email}</span>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  </div>

                  <CardInput value={cardNumber} onChange={setCardNumber} error={errors.card} />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[13px] text-white/50">Expiry</label>
                      <input
                        placeholder="MM / YY"
                        value={formatExpiry(expiry)}
                        onChange={(e) => setExpiry(e.target.value.replace(/\D/g, ""))}
                        maxLength={7}
                        className={`w-full bg-white/[0.04] border rounded-lg px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/20 outline-none transition-colors ${
                          errors.expiry ? "border-red-500/50" : "border-white/[0.08] focus:border-white/20"
                        }`}
                      />
                      {errors.expiry && <p className="text-[12px] text-red-400">{errors.expiry}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] text-white/50">CVC</label>
                      <div className={`flex items-center bg-white/[0.04] border rounded-lg px-3.5 py-2.5 transition-colors ${
                        errors.cvc ? "border-red-500/50" : "border-white/[0.08] focus-within:border-white/20"
                      }`}>
                        <input
                          type={showCvc ? "text" : "password"}
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          maxLength={4}
                          className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/20 outline-none"
                        />
                        <button onClick={() => setShowCvc(!showCvc)} className="text-white/25 hover:text-white/50 transition-colors">
                          {showCvc ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {errors.cvc && <p className="text-[12px] text-red-400">{errors.cvc}</p>}
                    </div>
                  </div>

                  <Select label="Country" value={country} onChange={setCountry} options={countries} />

                  <Input
                    label="ZIP / Postal code"
                    placeholder="10001"
                    value={zip}
                    onChange={setZip}
                    error={errors.zip}
                  />

                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg text-[14px] text-white transition-colors mt-4 flex items-center justify-center gap-2"
                    style={{ backgroundColor: CTA_ORANGE }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
                  >
                    Review order
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Confirmation */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <h3 className="text-[16px] text-white/90">Review & confirm</h3>

                  <div className="space-y-2">
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[13px] text-white/40">Contact</p>
                        <p className="text-[14px] text-white/80">{firstName} {lastName}</p>
                        <p className="text-[13px] text-white/40">{email}</p>
                      </div>
                      <button onClick={() => setStep(0)} className="text-[12px] hover:text-white/70 transition-colors" style={{ color: CTA_ORANGE }}>
                        Edit
                      </button>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-[13px] text-white/40">Payment</p>
                        <p className="text-[14px] text-white/80 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-white/30" />
                          •••• {cardNumber.slice(-4)}
                        </p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-[12px] hover:text-white/70 transition-colors" style={{ color: CTA_ORANGE }}>
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => setAgreedTerms(!agreedTerms)}
                      className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        agreedTerms ? "border-transparent" : errors.terms ? "border-red-500/50" : "border-white/20"
                      }`}
                      style={agreedTerms ? { backgroundColor: CTA_ORANGE } : {}}
                    >
                      {agreedTerms && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="text-[13px] text-white/50 leading-[1.5]">
                      I agree to the{" "}
                      <span className="text-white/70 underline underline-offset-2">Terms of Service</span> and{" "}
                      <span className="text-white/70 underline underline-offset-2">Privacy Policy</span>.
                      I understand this is a one-time payment with lifetime access.
                    </span>
                  </label>
                  {errors.terms && <p className="text-[12px] text-red-400">{errors.terms}</p>}

                  <button
                    onClick={handlePay}
                    disabled={processing}
                    className="w-full py-3.5 rounded-lg text-[15px] text-white transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ backgroundColor: processing ? "#9CA3AF" : CTA_ORANGE }}
                    onMouseEnter={(e) => { if (!processing) e.currentTarget.style.backgroundColor = "#e65e00"; }}
                    onMouseLeave={(e) => { if (!processing) e.currentTarget.style.backgroundColor = CTA_ORANGE; }}
                  >
                    {processing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processing payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Pay {plan.priceLabel}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="flex items-center gap-1 text-[11px] text-white/25">
                      <Shield className="w-3 h-3" />
                      SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-white/25">
                      <Lock className="w-3 h-3" />
                      Secure Payment
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="md:sticky md:top-8 self-start">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
              <h3 className="text-[14px] text-white/50 mb-5">Order summary</h3>

              <div className="flex items-start justify-between mb-5">
                <div>
                  <h4 className="text-[17px] text-white flex items-center gap-2">
                    {plan.name}
                    {plan.popular && (
                      <span
                        className="text-[10px] text-white px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: CTA_ORANGE }}
                      >
                        Popular
                      </span>
                    )}
                  </h4>
                  <p className="text-[13px] text-white/40 mt-0.5">{plan.desc}</p>
                </div>
                <span className="text-[22px] text-white tracking-[-0.03em]">{plan.priceLabel}</span>
              </div>

              <div className="h-px bg-white/[0.07] my-4" />

              <ul className="space-y-2.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-white/50">
                    <Check className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="h-px bg-white/[0.07] my-4" />

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-white/40">Subtotal</span>
                  <span className="text-white/70">{plan.priceLabel}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-white/40">Tax</span>
                  <span className="text-white/70">$0.00</span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Total</span>
                  <span className="text-[20px] text-white tracking-[-0.02em]">{plan.priceLabel}</span>
                </div>
              </div>

              <div className="mt-5 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-white/25" />
                <span className="text-[12px] text-white/40">Instant access after payment</span>
              </div>

              {/* Change plan */}
              <div className="mt-4 text-center">
                <Link to="/" className="text-[12px] text-white/25 hover:text-white/50 underline underline-offset-2 transition-colors">
                  Change plan
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex items-center justify-center gap-4">
              {["Visa", "Mastercard", "Amex"].map((card) => (
                <span key={card} className="text-[10px] text-white/15 bg-white/[0.03] border border-white/[0.06] rounded px-2 py-1">
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}