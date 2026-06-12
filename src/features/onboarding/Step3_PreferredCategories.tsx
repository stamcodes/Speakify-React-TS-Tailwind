// src/features/onboarding/Step3_PreferredCategories.tsx
import { useState } from "react";
import { ArrowLeft, Trash2, X } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import type { OnboardingData } from "../../features/onboarding/onboardingTypes";
import dataJson from "../../data/Data.json";

interface Step3Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function Step3_PreferredCategories({
  data,
  updateData,
  onNext,
  onBack,
}: Step3Props) {
  const [showFullPoolSidebar, setShowFullPoolSidebar] = useState(false);

  // Fallback safely if categories array isn't populated in state yet
  const selectedCategories = data.categories || [];

  // Parse total category assets out of your JSON database root array
  const allCategories = dataJson.categories || [];

  // Enforce a strict 15-item layout limitation for the main landing view
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
      alert("Please select at least one category before continuing.");
      return;
    }
    onNext();
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={3} />

        {/* Main Base Container */}
        <div className="max-w-xl mx-auto px-6 py-8">
          {/* Header Row: Title on left + Clear Selection button on right */}
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

          {/* Inline Preview Flex Wrap Container */}
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

              {/* Sidebar Trigger Pill: Renders right alongside preview blocks */}
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

          {/* Action Footer Navigation Controls */}
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

      {/* Slide Sidebar Backdrop and Panel (Matches Step 2 Mechanics) */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          showFullPoolSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Clickable Backdrop overlay overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setShowFullPoolSidebar(false)}
        />

        {/* Sidebar Container Body */}
        <div
          className={`relative w-full max-w-md h-full bg-[#f7f3ee] flex flex-col p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            showFullPoolSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Panel Actions Utility Header Row */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              {selectedCategories.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="flex items-center gap-1.5 text-xs font-medium text-heading bg-transparent border border-stone-900/30 px-3 py-1.5 rounded-full hover:bg-stone-900/5 transition-colors cursor-pointer select-none"
                >
                  Clear selection
                  <Trash2 size={13} className="text-red-500 stroke-[2.5]" />
                </button>
              ) : (
                <span className="text-sm font-semibold text-heading">
                  All Categories
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFullPoolSidebar(false)}
              className="text-grey/60 hover:text-heading transition-colors cursor-pointer p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Main Categorical Cluster Body */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar mb-6">
            <div className="flex flex-wrap gap-2 pt-1">
              {allCategories.map((category) => {
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
            </div>
          </div>

          {/* Sidebar Drawer Footer Pin */}
          <div className="flex justify-end pt-4 border-t border-stone-900/10 shrink-0">
            <button
              type="button"
              onClick={() => setShowFullPoolSidebar(false)}
              className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full shadow-md hover:bg-stone-800 transition-all cursor-pointer select-none"
            >
              Done selecting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3_PreferredCategories;
