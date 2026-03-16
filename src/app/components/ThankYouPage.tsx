import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  CheckCircle, Download, Mail, ArrowRight, Copy, Check, ExternalLink
} from "lucide-react";
import { Logo } from "./Logo";
import { SERIF, CTA_ORANGE, PLANS } from "./shared";

interface Purchase {
  planId: string;
  planName: string;
  price: number;
  email: string;
  firstName: string;
  lastName: string;
  date: string;
  orderId: string;
  status: string;
}

export function ThankYouPage() {
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("acm_purchase");
    if (data) {
      setPurchase(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!purchase) return null;

  const plan = PLANS.find((p) => p.id === purchase.planId) || PLANS[1];

  const copyOrderId = () => {
    navigator.clipboard.writeText(purchase.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(purchase.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <Logo className="w-[24px] h-[17px]" />
            <span className="text-[14px] text-white/60">AI Client Machine</span>
          </Link>
          <Link
            to="/account"
            className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
          >
            My Account
          </Link>
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-6 py-16 md:py-24">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${CTA_ORANGE}20` }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: CTA_ORANGE }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <h1
            className="text-[32px] md:text-[42px] text-white tracking-[-0.03em] mb-3"
            style={{ fontFamily: SERIF }}
          >
            Thank you, {purchase.firstName}!
          </h1>
          <p className="text-[15px] text-white/50 mb-2">
            Your payment has been processed successfully.
          </p>
          <p className="text-[14px] text-white/30">
            A confirmation email has been sent to <span className="text-white/60">{purchase.email}</span>
          </p>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 mb-6"
        >
          <h3 className="text-[14px] text-white/50 mb-4">Order details</h3>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/40">Order ID</span>
              <button onClick={copyOrderId} className="flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white/90 transition-colors">
                {purchase.orderId}
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/40">Plan</span>
              <span className="text-[13px] text-white/80 flex items-center gap-2">
                {purchase.planName}
                {plan.popular && (
                  <span className="text-[9px] text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: CTA_ORANGE }}>
                    Pro
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/40">Amount</span>
              <span className="text-[13px] text-white/80">${purchase.price}.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/40">Date</span>
              <span className="text-[13px] text-white/60">{formattedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white/40">Status</span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Completed
              </span>
            </div>
          </div>
        </motion.div>

        {/* What you got */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 mb-6"
        >
          <h3 className="text-[14px] text-white/50 mb-4">What's included in {plan.name}</h3>
          <ul className="space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/60">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: CTA_ORANGE }} />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="space-y-3 mb-10"
        >
          <h3 className="text-[14px] text-white/50 mb-3">Next steps</h3>

          {[
            { icon: Mail, title: "Check your email", desc: "Download link sent to your inbox" },
            { icon: Download, title: "Download materials", desc: "Get all files and start the system" },
            { icon: ArrowRight, title: "Follow step 1", desc: "Open the guide and begin immediately" },
          ].map((item, i) => (
            <div key={item.title} className="flex items-start gap-3.5 bg-white/[0.03] border border-white/[0.07] rounded-lg px-4 py-3.5 hover:bg-white/[0.05] transition-colors">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${CTA_ORANGE}15` }}
              >
                <item.icon className="w-4 h-4" style={{ color: CTA_ORANGE }} />
              </div>
              <div>
                <p className="text-[14px] text-white/80">{item.title}</p>
                <p className="text-[12px] text-white/35">{item.desc}</p>
              </div>
              <span className="ml-auto text-[11px] text-white/15 mt-1.5">Step {i + 1}</span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/account"
            className="flex-1 py-3 rounded-lg text-[14px] text-white transition-colors flex items-center justify-center gap-2"
            style={{ backgroundColor: CTA_ORANGE }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
          >
            Go to My Account
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/"
            className="flex-1 py-3 rounded-lg text-[14px] text-white/60 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
