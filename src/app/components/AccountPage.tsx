import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User, CreditCard, Download, Settings, LogOut, Check,
  ChevronRight, Shield, Mail, Calendar, Copy, Package,
  ArrowUpRight, AlertTriangle, X, RefreshCw
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

type Tab = "overview" | "downloads" | "billing" | "settings";

export function AccountPage() {
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("acm_purchase");
    if (data) setPurchase(JSON.parse(data));
    else navigate("/");
  }, [navigate]);

  if (!purchase) return null;

  const plan = PLANS.find((p) => p.id === purchase.planId) || PLANS[1];
  const planIndex = PLANS.findIndex((p) => p.id === purchase.planId);
  const availableUpgrades = PLANS.filter((_, i) => i > planIndex);

  const formattedDate = new Date(purchase.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const copyOrderId = () => {
    navigator.clipboard.writeText(purchase.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancel = () => {
    const updated = { ...purchase, status: "cancelled" };
    localStorage.setItem("acm_purchase", JSON.stringify(updated));
    setPurchase(updated);
    setShowCancelModal(false);
  };

  const handleReactivate = () => {
    const updated = { ...purchase, status: "active" };
    localStorage.setItem("acm_purchase", JSON.stringify(updated));
    setPurchase(updated);
  };

  const handleUpgrade = (newPlanId: string) => {
    const newPlan = PLANS.find((p) => p.id === newPlanId);
    if (!newPlan) return;
    const updated = {
      ...purchase,
      planId: newPlan.id,
      planName: newPlan.name,
      price: newPlan.price,
      status: "active",
    };
    localStorage.setItem("acm_purchase", JSON.stringify(updated));
    setPurchase(updated);
    setShowUpgradeModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("acm_purchase");
    navigate("/");
  };

  const TABS: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "overview", label: "Overview", icon: Package },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const downloads = [
    { name: `${plan.name} — Main Training`, size: "245 MB", type: "Video Course" },
    { name: "AI Client Scripts Pack", size: "2.4 MB", type: "PDF + Docs" },
    { name: "Outreach Templates", size: "1.1 MB", type: "Notion + Docs" },
    ...(planIndex >= 1 ? [
      { name: "Advanced Frameworks", size: "18 MB", type: "PDF" },
      { name: "Notion CRM Template", size: "340 KB", type: "Notion" },
    ] : []),
    ...(planIndex >= 2 ? [
      { name: "Scaling Masterclass", size: "520 MB", type: "Video" },
      { name: "Premium Templates Pack", size: "8.2 MB", type: "Bundle" },
    ] : []),
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
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[11px] text-white/60">
                {purchase.firstName[0]}{purchase.lastName[0]}
              </div>
              <span className="text-[13px] text-white/50">{purchase.firstName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-[12px] text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1
            className="text-[28px] md:text-[36px] text-white tracking-[-0.03em] mb-1"
            style={{ fontFamily: SERIF }}
          >
            My Account
          </h1>
          <p className="text-[14px] text-white/40">Manage your subscription and downloads.</p>
        </div>

        <div className="grid lg:grid-cols-[220px,1fr] gap-8">
          {/* Sidebar */}
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? "bg-white/[0.06] text-white/90"
                    : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {/* ─── OVERVIEW ─── */}
              {tab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Plan card */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[18px] text-white">{plan.name} Plan</h3>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full ${
                              purchase.status === "active"
                                ? "text-green-400 bg-green-500/10"
                                : "text-red-400 bg-red-500/10"
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              purchase.status === "active" ? "bg-green-400" : "bg-red-400"
                            }`} />
                            {purchase.status === "active" ? "Active" : "Cancelled"}
                          </span>
                        </div>
                        <p className="text-[13px] text-white/40">{plan.desc}</p>
                      </div>
                      <span className="text-[24px] text-white tracking-[-0.03em]">{plan.priceLabel}</span>
                    </div>

                    <div className="h-px bg-white/[0.06] my-4" />

                    <ul className="grid sm:grid-cols-2 gap-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[13px] text-white/50">
                          <Check className="w-3 h-3 shrink-0" style={{ color: CTA_ORANGE }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {availableUpgrades.length > 0 && purchase.status === "active" && (
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="mt-5 text-[13px] flex items-center gap-1.5 transition-colors hover:opacity-80"
                        style={{ color: CTA_ORANGE }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Upgrade plan
                      </button>
                    )}

                    {purchase.status === "cancelled" && (
                      <button
                        onClick={handleReactivate}
                        className="mt-5 text-[13px] flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reactivate subscription
                      </button>
                    )}
                  </div>

                  {/* Quick info */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Calendar, label: "Purchased", value: formattedDate },
                      { icon: Mail, label: "Email", value: purchase.email },
                      { icon: Shield, label: "Access", value: "Lifetime" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <item.icon className="w-3.5 h-3.5 text-white/25" />
                          <span className="text-[11px] text-white/30 uppercase tracking-[0.06em]">{item.label}</span>
                        </div>
                        <p className="text-[13px] text-white/70 truncate">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order ID */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-white/30 uppercase tracking-[0.06em]">Order ID</span>
                      <p className="text-[14px] text-white/70 mt-0.5">{purchase.orderId}</p>
                    </div>
                    <button
                      onClick={copyOrderId}
                      className="text-white/25 hover:text-white/50 transition-colors p-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── DOWNLOADS ─── */}
              {tab === "downloads" && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <h3 className="text-[16px] text-white/80 mb-4">Your downloads</h3>
                  {purchase.status === "cancelled" ? (
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6 text-center">
                      <AlertTriangle className="w-8 h-8 text-red-400/50 mx-auto mb-3" />
                      <p className="text-[14px] text-red-400/70 mb-1">Access suspended</p>
                      <p className="text-[13px] text-white/30">Reactivate your subscription to access downloads.</p>
                      <button
                        onClick={handleReactivate}
                        className="mt-4 text-[13px] text-green-400 hover:text-green-300 transition-colors flex items-center gap-1.5 mx-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reactivate
                      </button>
                    </div>
                  ) : (
                    downloads.map((d) => (
                      <div key={d.name} className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors group">
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                            <Download className="w-4 h-4 text-white/30" />
                          </div>
                          <div>
                            <p className="text-[14px] text-white/80">{d.name}</p>
                            <p className="text-[12px] text-white/30">{d.type} · {d.size}</p>
                          </div>
                        </div>
                        <button
                          className="text-[13px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {/* ─── BILLING ─── */}
              {tab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <h3 className="text-[16px] text-white/80 mb-4">Billing history</h3>

                  {/* Invoice */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-6 text-[11px] text-white/25 uppercase tracking-[0.06em]">
                      <span className="flex-1">Description</span>
                      <span className="w-24 text-right">Amount</span>
                      <span className="w-24 text-right">Date</span>
                      <span className="w-20 text-right">Status</span>
                    </div>
                    <div className="px-5 py-4 flex items-center gap-6">
                      <div className="flex-1">
                        <p className="text-[14px] text-white/70">AI Client Machine — {plan.name}</p>
                        <p className="text-[12px] text-white/30">Order {purchase.orderId}</p>
                      </div>
                      <span className="w-24 text-right text-[14px] text-white/70">${purchase.price}.00</span>
                      <span className="w-24 text-right text-[13px] text-white/40">{formattedDate}</span>
                      <span className="w-20 text-right">
                        <span className="text-[11px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Paid</span>
                      </span>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5">
                    <h4 className="text-[13px] text-white/40 mb-3">Payment method</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded bg-white/[0.06] flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white/30" />
                        </div>
                        <div>
                          <p className="text-[14px] text-white/70">•••• •••• •••• 4242</p>
                          <p className="text-[12px] text-white/30">Expires 12/28</p>
                        </div>
                      </div>
                      <button className="text-[12px] text-white/30 hover:text-white/60 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── SETTINGS ─── */}
              {tab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <h3 className="text-[16px] text-white/80 mb-4">Account settings</h3>

                  {/* Profile */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 space-y-4">
                    <h4 className="text-[13px] text-white/40">Profile</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] text-white/30 block mb-1">First name</label>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[14px] text-white/60">
                          {purchase.firstName}
                        </div>
                      </div>
                      <div>
                        <label className="text-[12px] text-white/30 block mb-1">Last name</label>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[14px] text-white/60">
                          {purchase.lastName}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] text-white/30 block mb-1">Email</label>
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[14px] text-white/60">
                        {purchase.email}
                      </div>
                    </div>
                    <button className="text-[13px] text-white/30 hover:text-white/60 transition-colors">
                      Edit profile
                    </button>
                  </div>

                  {/* Danger zone */}
                  <div className="bg-red-500/[0.03] border border-red-500/10 rounded-xl p-5">
                    <h4 className="text-[13px] text-red-400/60 mb-3">Danger zone</h4>
                    {purchase.status === "active" ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[14px] text-white/60">Cancel subscription</p>
                          <p className="text-[12px] text-white/25">You will lose access to all downloads.</p>
                        </div>
                        <button
                          onClick={() => setShowCancelModal(true)}
                          className="text-[13px] text-red-400/70 hover:text-red-400 border border-red-500/20 hover:border-red-500/40 px-4 py-1.5 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[14px] text-white/60">Subscription cancelled</p>
                          <p className="text-[12px] text-white/25">Reactivate to restore access.</p>
                        </div>
                        <button
                          onClick={handleReactivate}
                          className="text-[13px] text-green-400 hover:text-green-300 border border-green-500/20 hover:border-green-500/40 px-4 py-1.5 rounded-lg transition-colors"
                        >
                          Reactivate
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── CANCEL MODAL ─── */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1b] border border-white/[0.08] rounded-xl p-6 max-w-[400px] w-full"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] text-white">Cancel subscription?</h3>
                <button onClick={() => setShowCancelModal(false)} className="text-white/30 hover:text-white/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[14px] text-white/50 mb-2">
                Are you sure you want to cancel your <span className="text-white/80">{plan.name}</span> plan?
              </p>
              <p className="text-[13px] text-white/30 mb-6">
                You'll lose access to all materials and downloads. You can reactivate anytime.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2.5 rounded-lg text-[14px] text-white/60 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                >
                  Keep plan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-lg text-[14px] text-white bg-red-500/80 hover:bg-red-500 transition-colors"
                >
                  Yes, cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── UPGRADE MODAL ─── */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1b] border border-white/[0.08] rounded-xl p-6 max-w-[480px] w-full"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] text-white">Upgrade your plan</h3>
                <button onClick={() => setShowUpgradeModal(false)} className="text-white/30 hover:text-white/60 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[13px] text-white/40 mb-5">
                You currently have the <span className="text-white/70">{plan.name}</span> plan. Upgrade to unlock more features.
              </p>

              <div className="space-y-3">
                {availableUpgrades.map((up) => {
                  const diff = up.price - plan.price;
                  return (
                    <div key={up.id} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[15px] text-white flex items-center gap-2">
                            {up.name}
                            {up.popular && (
                              <span className="text-[9px] text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: CTA_ORANGE }}>
                                Popular
                              </span>
                            )}
                          </h4>
                          <p className="text-[12px] text-white/35 mt-0.5">{up.desc}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[18px] text-white">{up.priceLabel}</span>
                          <p className="text-[11px] text-white/25">+${diff} upgrade</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpgrade(up.id)}
                        className="w-full py-2 rounded-lg text-[13px] text-white transition-colors flex items-center justify-center gap-1.5"
                        style={{ backgroundColor: CTA_ORANGE }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e65e00")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CTA_ORANGE)}
                      >
                        Upgrade to {up.name}
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
