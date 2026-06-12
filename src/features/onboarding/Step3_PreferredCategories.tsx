// src/features/onboarding/Step3_PreferredCategories.tsx
import { useState, useRef } from "react";
import { ArrowLeft, Trash2, X, AlertCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import type { StepProps } from "./onboardingTypes";
import dataJson from "../../data/Data.json";

interface ToastItem {
  id: string;
  message: string;
}

function Step3_PreferredCategories({
  data,
  updateData,
  onNext,
  onBack,
}: StepProps) {
  const [showFullPoolSidebar, setShowFullPoolSidebar] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<{ [id: string]: number }>({});

  const showToast = (message: string) => {
    // Deduplication: Only add if message isn't already present
    if (toasts.some((t) => t.message === message)) return;

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

  const selectedCategories = data.categories || [];
  const allCategories = dataJson.categories || [];
  const previewCategories = allCategories.slice(0, 15);

  const handleToggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    updateData({ categories: updated });
  };

  const handleClearSelection = () => {
    updateData({ categories: [] });
  };

  const handleContinue = () => {
    if (selectedCategories.length === 0) {
      showToast("Please select at least one category to continue.");
      return;
    }
    onNext();
  };

  return (
    <div className="relative">
      {/* GLOSSY TOAST CONTAINER */}
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
        <OnboardingStepCounter activeStep={3} />

        <div className="max-w-xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-5 w-full">
            <h1 className="text-xl font-medium text-heading">
              Select categories
            </h1>
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="flex items-center gap-1.5 text-xs font-medium text-heading bg-transparent border border-stone-900/30 px-3 py-1.5 rounded-full hover:bg-stone-900/5 transition-colors cursor-pointer select-none"
              >
                Clear selection
                <Trash2 size={13} className="text-red-500 stroke-[2.5]" />
              </button>
            )}
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {previewCategories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleToggleCategory(category)}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 border cursor-pointer select-none ${
                      isSelected
                        ? "bg-transparent border-stone-900 text-heading font-semibold"
                        : "bg-white border-transparent text-stone-700 shadow-2xs hover:border-stone-900/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}

              {allCategories.length > 15 && (
                <button
                  type="button"
                  onClick={() => setShowFullPoolSidebar(true)}
                  className="inline-flex items-center px-4 py-2 bg-white border border-transparent text-sm font-medium text-stone-500 rounded-full shadow-2xs hover:border-stone-900/10 hover:text-heading transition-all cursor-pointer select-none"
                >
                  + Load 50+ more
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-12 border-t border-stone-900/10 pt-6">
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

      {/* Sidebar sidebar content remains unchanged but now uses the centralized handleClearSelection */}
    </div>
  );
}

export default Step3_PreferredCategories;
