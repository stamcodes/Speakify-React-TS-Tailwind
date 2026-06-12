// src/features/onboarding/Step5_infoAdditional.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, ChevronDown, X, Zap } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import type { KeyboardEvent } from "react";
import type { OnboardingData, LanguageRow } from "./onboardingTypes";
import dataJson from "../../data/Data.json";

interface Step5Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function Step5_infoAdditional({
  data,
  updateData,
  onNext,
  onBack,
}: Step5Props) {
  const navigate = useNavigate();

  // Load baseline arrays from local configuration data registries
  const [regionLanguages] = useState<string[]>(
    dataJson.availableLanguages || ["English", "Spanish", "French", "German"],
  );
  const [proficiencies] = useState<string[]>(
    dataJson.availableProficiencies || [
      "Full professional proficiency",
      "Native proficiency",
    ],
  );
  const [styleOptions] = useState<string[]>(
    dataJson.availableSpeakerStyles || ["Motivational"],
  );
  const [audienceOptions] = useState<string[]>(
    dataJson.availableAudienceSizes || ["Up to 500"],
  );

  // Dynamic lists capable of being extended via typing custom entries
  const [typeOptions, setTypeOptions] = useState<string[]>(
    dataJson.availableSpeakerTypes || ["Keynote Speaker", "Moderator"],
  );
  const [industryOptions, setIndustryOptions] = useState<string[]>(
    dataJson.availableIndustries || ["Finance", "E-commerce"],
  );

  // Search/Input state strings
  const [typeInput, setTypeInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");

  // Safely extract active values from central schema state
  const languages: LanguageRow[] =
    data.languages && data.languages.length > 0
      ? data.languages
      : [
          {
            id: "l1",
            language: "English",
            proficiency: "Full professional proficiency",
          },
          { id: "l2", language: "Spanish", proficiency: "Native proficiency" },
        ];

  const yearsOfExperience = data.yearsOfExperience || "10";
  const speakingStyle = data.speakingStyle || "Motivational";
  const speakerTypes = data.speakerTypes || ["Keynote Speaker", "Moderator"];
  const specialisedIndustries = data.specialisedIndustries || [
    "Finance",
    "E-commerce",
  ];
  const eventsSpokenAt = data.eventsSpokenAt || "200";
  const preferredAudienceSize = data.preferredAudienceSize || "Up to 500";

  const [activeMenu, setActiveMenu] = useState<{
    id: string;
    field: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References to handle container-click focus redirects
  const typeInputRef = useRef<HTMLInputElement | null>(null);
  const industryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleUpdateLanguage = (id: string, updates: Partial<LanguageRow>) => {
    const updated = languages.map((row) =>
      row.id === id ? { ...row, ...updates } : row,
    );
    updateData({ languages: updated });
  };

  const handleAddLanguageRow = () => {
    const newRow: LanguageRow = {
      id: crypto.randomUUID(),
      language: regionLanguages[0] || "English",
      proficiency: proficiencies[0] || "Native proficiency",
    };
    updateData({ languages: [...languages, newRow] });
  };

  const handleRemoveLanguageRow = (id: string) => {
    if (languages.length === 1) return;
    updateData({ languages: languages.filter((row) => row.id !== id) });
    if (activeMenu?.id === id) setActiveMenu(null);
  };

  const handleToggleMultiSelect = (
    item: string,
    currentList: string[],
    dataKey: "speakerTypes" | "specialisedIndustries",
  ) => {
    const updated = currentList.includes(item)
      ? currentList.filter((x) => x !== item)
      : [...currentList, item];
    updateData({ [dataKey]: updated });
  };

  // Handles dynamic expansion of categories inside state array lists upon hitting Enter
  const handleCustomInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    optionsList: string[],
    setOptionsList: React.Dispatch<React.SetStateAction<string[]>>,
    currentSelection: string[],
    dataKey: "speakerTypes" | "specialisedIndustries",
  ) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newItem = inputValue.trim();

      if (
        !optionsList.some((opt) => opt.toLowerCase() === newItem.toLowerCase())
      ) {
        setOptionsList((prev) => [...prev, newItem]);
      }

      if (
        !currentSelection.some(
          (selected) => selected.toLowerCase() === newItem.toLowerCase(),
        )
      ) {
        updateData({ [dataKey]: [...currentSelection, newItem] });
      }

      setInputValue("");
    }
  };

  // Redirect users back to the authentication screen layout
  const handleFinishProfile = () => {
    navigate("/authentication"); // Verified target path setup
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={5} />

        <div
          className="max-w-xl mx-auto px-6 py-8 select-none"
          ref={containerRef}
        >
          {/* Languages Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-stone-700 mb-3">
              Languages *
            </label>
            <div className="space-y-3">
              {languages.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu?.id === row.id &&
                            activeMenu.field === "lang"
                            ? null
                            : { id: row.id, field: "lang" },
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs border border-transparent focus:outline-none"
                    >
                      <span>{row.language}</span>
                      <ChevronDown
                        size={14}
                        className={`text-stone-500 transition-transform ${activeMenu?.id === row.id && activeMenu.field === "lang" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMenu?.id === row.id &&
                      activeMenu.field === "lang" && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto custom-scrollbar animate-dropdown-slide origin-top">
                          {regionLanguages.map((l) => (
                            <button
                              key={l}
                              type="button"
                              onClick={() => {
                                handleUpdateLanguage(row.id, { language: l });
                                setActiveMenu(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 ${row.language === l ? "bg-stone-50 font-semibold" : ""}`}
                            >
                              {l}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu?.id === row.id &&
                            activeMenu.field === "prof"
                            ? null
                            : { id: row.id, field: "prof" },
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs border border-transparent focus:outline-none"
                    >
                      <span className="truncate">{row.proficiency}</span>
                      <ChevronDown
                        size={14}
                        className={`text-stone-500 transition-transform ${activeMenu?.id === row.id && activeMenu.field === "prof" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeMenu?.id === row.id &&
                      activeMenu.field === "prof" && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto custom-scrollbar animate-dropdown-slide origin-top">
                          {proficiencies.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                handleUpdateLanguage(row.id, {
                                  proficiency: p,
                                });
                                setActiveMenu(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 ${row.proficiency === p ? "bg-stone-50 font-semibold" : ""}`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  <button
                    type="button"
                    disabled={languages.length === 1}
                    onClick={() => handleRemoveLanguageRow(row.id)}
                    className={`p-2 rounded-lg transition-colors ${languages.length === 1 ? "text-stone-300 cursor-not-allowed" : "text-stone-400 hover:text-red-500 hover:bg-stone-900/5 cursor-pointer"}`}
                  >
                    <Trash2
                      size={15}
                      className={languages.length > 1 ? "text-red-500/80" : ""}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={handleAddLanguageRow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-stone-900/15 text-stone-700 hover:text-heading hover:border-stone-900/30 text-xs font-medium rounded-full shadow-2xs hover:bg-stone-900/5 transition-all cursor-pointer"
              >
                <Plus size={12} className="stroke-[2.5]" />
                Add language
              </button>
            </div>
          </div>

          <h2 className="text-base font-semibold text-heading mb-4 mt-8">
            Your speaker career
          </h2>

          {/* Experience + Style */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
                Years of experience *
              </label>
              <input
                type="text"
                value={yearsOfExperience}
                onChange={(e) =>
                  updateData({
                    yearsOfExperience: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                className="w-full px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
                Your speaking style *
              </label>
              <button
                type="button"
                onClick={() =>
                  setActiveMenu(
                    activeMenu?.field === "style"
                      ? null
                      : { id: "global", field: "style" },
                  )
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs focus:outline-none"
              >
                <span>{speakingStyle}</span>
                <ChevronDown
                  size={14}
                  className={`text-stone-500 transition-transform ${activeMenu?.field === "style" ? "rotate-180" : ""}`}
                />
              </button>
              {activeMenu?.field === "style" && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 animate-dropdown-slide origin-top">
                  {styleOptions.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateData({ speakingStyle: st });
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 ${speakingStyle === st ? "bg-stone-50 font-semibold" : ""}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Speaker Types */}
          <div className="mb-5 relative">
            <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
              What type of speaker are you? *
            </label>
            <div
              onClick={() => {
                setActiveMenu({ id: "global", field: "types" });
                typeInputRef.current?.focus();
              }}
              className="w-full flex items-center justify-between min-h-[46px] p-2 bg-white rounded-xl shadow-2xs cursor-pointer border border-transparent"
            >
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {speakerTypes.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-transparent border border-stone-200 text-xs font-medium text-stone-700 rounded-md"
                  >
                    {t}
                    <X
                      size={11}
                      className="text-stone-400 hover:text-stone-600 cursor-pointer animate-fade-in"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMultiSelect(
                          t,
                          speakerTypes,
                          "speakerTypes",
                        );
                      }}
                    />
                  </span>
                ))}
                <input
                  ref={typeInputRef}
                  type="text"
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value)}
                  onKeyDown={(e) =>
                    handleCustomInputKeyDown(
                      e,
                      typeInput,
                      setTypeInput,
                      typeOptions,
                      setTypeOptions,
                      speakerTypes,
                      "speakerTypes",
                    )
                  }
                  onFocus={() =>
                    setActiveMenu({ id: "global", field: "types" })
                  }
                  className="inline-block min-w-[60px] flex-1 bg-transparent text-sm font-medium text-heading focus:outline-none p-0.5"
                />
              </div>
              <ChevronDown
                size={14}
                className={`text-stone-500 shrink-0 ml-2 transition-transform ${activeMenu?.field === "types" ? "rotate-180" : ""}`}
              />
            </div>

            {activeMenu?.field === "types" && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 animate-dropdown-slide origin-top max-h-44 overflow-y-auto custom-scrollbar">
                {typeOptions
                  .filter((opt) =>
                    opt.toLowerCase().includes(typeInput.toLowerCase()),
                  )
                  .map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMultiSelect(
                          opt,
                          speakerTypes,
                          "speakerTypes",
                        );
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${speakerTypes.includes(opt) ? "bg-stone-50/70 font-semibold text-heading" : "text-stone-600"}`}
                    >
                      {opt} {speakerTypes.includes(opt) && "✓"}
                    </button>
                  ))}
              </div>
            )}
            <span className="block text-[11px] text-stone-400 mt-1.5 pl-0.5">
              You can select more than one option
            </span>
          </div>

          {/* Specialised Industries */}
          <div className="mb-5 relative">
            <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
              Which industries do you specialise in?
            </label>
            <div
              onClick={() => {
                setActiveMenu({ id: "global", field: "industries" });
                industryInputRef.current?.focus();
              }}
              className="w-full flex items-center justify-between min-h-[46px] p-2 bg-white rounded-xl shadow-2xs cursor-pointer border border-transparent"
            >
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {specialisedIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-transparent border border-stone-200 text-xs font-medium text-stone-700 rounded-md"
                  >
                    {ind}
                    <X
                      size={11}
                      className="text-stone-400 hover:text-stone-600 cursor-pointer animate-fade-in"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMultiSelect(
                          ind,
                          specialisedIndustries,
                          "specialisedIndustries",
                        );
                      }}
                    />
                  </span>
                ))}
                <input
                  ref={industryInputRef}
                  type="text"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                  onKeyDown={(e) =>
                    handleCustomInputKeyDown(
                      e,
                      industryInput,
                      setIndustryInput,
                      industryOptions,
                      setIndustryOptions,
                      specialisedIndustries,
                      "specialisedIndustries",
                    )
                  }
                  onFocus={() =>
                    setActiveMenu({ id: "global", field: "industries" })
                  }
                  className="inline-block min-w-[60px] flex-1 bg-transparent text-sm font-medium text-heading focus:outline-none p-0.5"
                />
              </div>
              <ChevronDown
                size={14}
                className={`text-stone-500 shrink-0 ml-2 transition-transform ${activeMenu?.field === "industries" ? "rotate-180" : ""}`}
              />
            </div>

            {activeMenu?.field === "industries" && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 animate-dropdown-slide origin-top max-h-44 overflow-y-auto custom-scrollbar">
                {industryOptions
                  .filter((opt) =>
                    opt.toLowerCase().includes(industryInput.toLowerCase()),
                  )
                  .map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMultiSelect(
                          opt,
                          specialisedIndustries,
                          "specialisedIndustries",
                        );
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${specialisedIndustries.includes(opt) ? "bg-stone-50/70 font-semibold text-heading" : "text-stone-600"}`}
                    >
                      {opt} {specialisedIndustries.includes(opt) && "✓"}
                    </button>
                  ))}
              </div>
            )}
            <span className="block text-[11px] text-stone-400 mt-1.5 pl-0.5">
              You can select more than one option
            </span>
          </div>

          {/* Events Spoken At + Audience Size */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div>
              <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
                How many events have you spoken at?
              </label>
              <input
                type="text"
                value={eventsSpokenAt}
                onChange={(e) =>
                  updateData({
                    eventsSpokenAt: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                className="w-full px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-stone-600/90 mb-1.5">
                What's your preferred audience size?
              </label>
              <button
                type="button"
                onClick={() =>
                  setActiveMenu(
                    activeMenu?.field === "audSize"
                      ? null
                      : { id: "global", field: "audSize" },
                  )
                }
                className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs focus:outline-none"
              >
                <span>{preferredAudienceSize}</span>
                <ChevronDown
                  size={14}
                  className={`text-stone-500 transition-transform ${activeMenu?.field === "audSize" ? "rotate-180" : ""}`}
                />
              </button>
              {activeMenu?.field === "audSize" && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-30 animate-dropdown-slide origin-top">
                  {audienceOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        updateData({ preferredAudienceSize: size });
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 ${preferredAudienceSize === size ? "bg-stone-50 font-semibold" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer Navigation Control Blocks */}
          <div className="flex justify-between border-t border-stone-900/10 pt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-heading bg-white/60 hover:bg-white/80 transition-colors border border-stone-900/5 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleFinishProfile}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-heading hover:bg-stone-50 text-sm font-medium rounded-xl shadow-sm transition-all border border-stone-900/10 cursor-pointer"
            >
              Finish and create profile
              <Zap size={14} className="fill-heading stroke-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step5_infoAdditional;
