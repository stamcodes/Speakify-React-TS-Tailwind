// src/features/onboarding/Step4_PricingAndTravel.tsx
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  AlertCircle,
  X,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import type { StepProps, PricingTier } from "./onboardingTypes";
import dataJson from "../../data/Data.json";

interface ToastItem {
  id: string;
  message: string;
}

function Step4_PricingAndTravel({
  data,
  updateData,
  onNext,
  onBack,
}: StepProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<{ [id: string]: number }>({});

  const showToast = (message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    timersRef.current[id] = window.setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    if (timersRef.current[id]) {
      window.clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const regionOptions: string[] = dataJson.availableRegions || [
    "UK",
    "EU",
    "US",
  ];
  const currencyOptions: string[] = dataJson.availableCurrencies || [
    "£",
    "€",
    "$",
  ];

  const pricingTiers: PricingTier[] =
    data.pricingTiers && data.pricingTiers.length > 0
      ? data.pricingTiers
      : [
          {
            id: "1",
            region: "UK",
            currency: "£",
            fee: "7500",
            travelIncluded: true,
          },
          {
            id: "2",
            region: "EU",
            currency: "€",
            fee: "8000",
            travelIncluded: false,
          },
          {
            id: "3",
            region: "US",
            currency: "$",
            fee: "9500",
            travelIncluded: false,
          },
        ];

  const [activeDropdown, setActiveDropdown] = useState<{
    id: string;
    type: "region" | "currency";
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      Object.values(timersRef.current).forEach(window.clearTimeout);
    };
  }, []);

  const handleUpdateTier = (id: string, updates: Partial<PricingTier>) => {
    const updated = pricingTiers.map((tier: PricingTier) =>
      tier.id === id ? { ...tier, ...updates } : tier,
    );
    updateData({ pricingTiers: updated });
  };

  const handleAddRegion = () => {
    const newTier: PricingTier = {
      id: crypto.randomUUID(),
      region: regionOptions[0] || "Global",
      currency: currencyOptions[2] || "$",
      fee: "",
      travelIncluded: false,
    };
    updateData({ pricingTiers: [...pricingTiers, newTier] });
  };

  const handleRemoveRegion = (id: string) => {
    if (pricingTiers.length === 1) {
      showToast("You must maintain at least one baseline fee region.");
      return;
    }
    updateData({
      pricingTiers: pricingTiers.filter((tier: PricingTier) => tier.id !== id),
    });
    if (activeDropdown?.id === id) setActiveDropdown(null);
  };

  const handleContinue = () => {
    const emptyTiers = pricingTiers.filter(
      (tier: PricingTier) => !tier.fee.trim(),
    );

    if (emptyTiers.length > 0) {
      emptyTiers.forEach((tier) => {
        const message = `Price range for region ${tier.region} empty`;
        const isAlreadyVisible = toasts.some((t) => t.message === message);
        if (!isAlreadyVisible) {
          showToast(message);
        }
      });
      return;
    }
    onNext();
  };

  return (
    <div className="relative">
      {/* 🍞 GLOSSY STACKING MULTI-TOAST CONTAINER */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl shadow-lg border border-white/40 bg-white/60 backdrop-blur-md animate-dropdown-slide select-none transform transition-all duration-300"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle size={17} className="text-heading shrink-0" />
              <p className="text-xs font-bold tracking-tight text-heading">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-heading/50 hover:text-heading p-0.5 rounded transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={4} />

        <div className="max-w-2xl mx-auto px-6 py-8" ref={dropdownRef}>
          <div className="grid grid-cols-[120px_90px_110px_1fr_auto] gap-4 px-2 mb-2 text-sm font-medium text-stone-600/80">
            <div>Region</div>
            <div>Currency</div>
            <div>Fee</div>
            <div>Travel</div>
            <div className="w-[32px]"></div>
          </div>

          <div className="space-y-3 mb-5">
            {pricingTiers.map((tier: PricingTier) => (
              <div
                key={tier.id}
                className="grid grid-cols-[120px_90px_110px_1fr_auto] gap-4 items-center"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown?.id === tier.id &&
                          activeDropdown.type === "region"
                          ? null
                          : { id: tier.id, type: "region" },
                      )
                    }
                    className="w-full flex items-center justify-between pl-4 pr-3 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs cursor-pointer border border-transparent select-none focus:outline-none"
                  >
                    <span>{tier.region}</span>
                    <ChevronDown
                      size={14}
                      className={`text-stone-500 transition-transform duration-200 ${activeDropdown?.id === tier.id && activeDropdown.type === "region" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown?.id === tier.id &&
                    activeDropdown.type === "region" && (
                      <div className="absolute left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg z-30 max-h-48 overflow-y-auto custom-scrollbar animate-dropdown-slide origin-top">
                        {regionOptions.map((opt: string) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              handleUpdateTier(tier.id, { region: opt });
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer select-none border-b last:border-0 border-stone-100 ${tier.region === opt ? "bg-stone-50 font-semibold text-heading" : "text-stone-600 hover:bg-stone-50"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown?.id === tier.id &&
                          activeDropdown.type === "currency"
                          ? null
                          : { id: tier.id, type: "currency" },
                      )
                    }
                    className="w-full flex items-center justify-between pl-4 pr-3 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs cursor-pointer border border-transparent select-none focus:outline-none"
                  >
                    <span>{tier.currency}</span>
                    <ChevronDown
                      size={14}
                      className={`text-stone-500 transition-transform duration-200 ${activeDropdown?.id === tier.id && activeDropdown.type === "currency" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeDropdown?.id === tier.id &&
                    activeDropdown.type === "currency" && (
                      <div className="absolute left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg z-30 animate-dropdown-slide origin-top">
                        {currencyOptions.map((opt: string) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              handleUpdateTier(tier.id, { currency: opt });
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer select-none border-b last:border-0 border-stone-100 ${tier.currency === opt ? "bg-stone-50 font-semibold text-heading" : "text-stone-600 hover:bg-stone-50"}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                </div>

                <div>
                  <input
                    type="text"
                    value={tier.fee}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      handleUpdateTier(tier.id, { fee: val });
                    }}
                    placeholder="7500"
                    className="w-full px-4 py-3 bg-white border border-transparent text-sm font-medium text-heading rounded-xl shadow-2xs placeholder:text-stone-300 focus:outline-none focus:border-stone-900/10"
                  />
                </div>

                <div className="flex items-center gap-2.5 pl-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateTier(tier.id, {
                        travelIncluded: !tier.travelIncluded,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${tier.travelIncluded ? "bg-[#6c5196]" : "bg-stone-300/60"}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${tier.travelIncluded ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                  <span className="text-sm font-medium text-heading select-none">
                    Included
                  </span>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRegion(tier.id)}
                    disabled={pricingTiers.length === 1}
                    className={`p-2 rounded-lg transition-colors border border-transparent ${pricingTiers.length === 1 ? "text-stone-300 cursor-not-allowed" : "text-stone-400 hover:text-red-500 hover:bg-stone-900/5 cursor-pointer"}`}
                    title="Delete tier"
                  >
                    <Trash2
                      size={15}
                      className={
                        pricingTiers.length > 1 ? "text-red-500/80" : ""
                      }
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <button
              type="button"
              onClick={handleAddRegion}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent border border-stone-900/15 text-stone-700 hover:text-heading hover:border-stone-900/30 text-xs font-medium rounded-full shadow-2xs hover:bg-stone-900/5 transition-all cursor-pointer select-none"
            >
              <Plus size={13} className="stroke-[2.5]" />
              Add region
            </button>
          </div>

          <div className="flex justify-between border-t border-stone-900/10 pt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-heading bg-white/60 hover:bg-white/80 transition-colors cursor-pointer border border-stone-900/5"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-heading bg-white hover:bg-white/80 border border-stone-900/10 shadow-2xs transition-colors cursor-pointer"
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4_PricingAndTravel;
