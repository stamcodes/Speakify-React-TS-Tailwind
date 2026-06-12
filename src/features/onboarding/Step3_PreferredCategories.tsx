// src/features/onboarding/Step3_PreferredCategories.tsx
import { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback safely if categories array isn't populated in state yet
  const selectedCategories = data.categories || [];

  // Parse total category assets out of your JSON database root array
  const allCategories = dataJson.categories || [];

  // Enforce a strict 15-item layout limitation when collapsed
  const visibleCategories = isExpanded
    ? allCategories
    : allCategories.slice(0, 15);

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

        {/* Compact, centered layout matching your exact reference widths */}
        <div className="max-w-xl mx-auto px-6 py-8">
          {/* Header Row: Title on left + Clear Selection layout with RED icon on right */}
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

          {/* Tight flex-wrap collection container */}
          <div className="mb-8">
            <div
              className={`flex flex-wrap gap-2 transition-all duration-300 ${
                isExpanded
                  ? "max-h-[320px] overflow-y-auto pr-1 custom-scrollbar border border-stone-900/5 bg-white/10 rounded-2xl p-4 shadow-inner"
                  : ""
              }`}
            >
              {visibleCategories.map((category) => {
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

              {/* Collapsed view toggle: Appears as the 16th inline element */}
              {!isExpanded && allCategories.length > 15 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center px-4 py-2 bg-white border border-transparent text-sm font-medium text-stone-500 rounded-full shadow-2xs hover:border-stone-900/10 hover:text-heading transition-all cursor-pointer select-none"
                >
                  + Load 50+ more
                </button>
              )}

              {/* Expanded view toggle: Appears as a high-contrast inline option at the end */}
              {isExpanded && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center px-4 py-2 bg-black border border-transparent text-sm font-medium text-white rounded-full shadow-md hover:bg-stone-800 transition-all cursor-pointer select-none"
                >
                  Show less
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
    </div>
  );
}

export default Step3_PreferredCategories;
