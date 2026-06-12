// src/features/onboarding/Step5_infoAdditional.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, ChevronDown, X } from "lucide-react";
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

type FieldName =
  | "languages"
  | "yearsOfExperience"
  | "speakingStyle"
  | "speakerTypes"
  | "specialisedIndustries"
  | "preferredAudienceSize";
type FieldErrors = Partial<Record<FieldName, string>>;

function Step5_infoAdditional({
  data,
  updateData,
  onNext,
  onBack,
}: Step5Props) {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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
  const [typeOptions, setTypeOptions] = useState<string[]>(
    dataJson.availableSpeakerTypes || ["Keynote Speaker", "Moderator"],
  );
  const [industryOptions, setIndustryOptions] = useState<string[]>(
    dataJson.availableIndustries || ["Finance", "E-commerce"],
  );

  const [typeInput, setTypeInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");

  const languages: LanguageRow[] = data.languages || [
    {
      id: "l1",
      language: "English",
      proficiency: "Full professional proficiency",
    },
  ];
  const yearsOfExperience = data.yearsOfExperience || "";
  const speakingStyle = data.speakingStyle || "";
  const speakerTypes = data.speakerTypes || [];
  const specialisedIndustries = data.specialisedIndustries || [];
  const eventsSpokenAt = data.eventsSpokenAt || "";
  const preferredAudienceSize = data.preferredAudienceSize || "";

  const [activeMenu, setActiveMenu] = useState<{
    id: string;
    field: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  const validateField = (field: FieldName): string | null => {
    switch (field) {
      case "languages":
        return languages.length === 0
          ? "Please add at least one language"
          : null;
      case "yearsOfExperience":
        return !yearsOfExperience.trim()
          ? "Please enter your years of experience"
          : null;
      case "speakingStyle":
        return !speakingStyle ? "Please select a speaking style" : null;
      case "speakerTypes":
        return speakerTypes.length === 0
          ? "Please select at least one speaker type"
          : null;
      case "specialisedIndustries":
        return specialisedIndustries.length === 0
          ? "Please select at least one industry"
          : null;
      case "preferredAudienceSize":
        return !preferredAudienceSize
          ? "Please select a preferred audience size"
          : null;
      default:
        return null;
    }
  };

  const handleBlur = (field: FieldName) => {
    const message = validateField(field);
    setFieldErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  const clearFieldError = (field: FieldName) => {
    if (fieldErrors[field])
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleUpdateLanguage = (id: string, updates: Partial<LanguageRow>) => {
    const updated = languages.map((row) =>
      row.id === id ? { ...row, ...updates } : row,
    );
    updateData({ languages: updated });
    clearFieldError("languages");
  };

  const handleAddLanguageRow = () => {
    const newRow: LanguageRow = {
      id: crypto.randomUUID(),
      language: regionLanguages[0],
      proficiency: proficiencies[0],
    };
    updateData({ languages: [...languages, newRow] });
  };

  const handleRemoveLanguageRow = (id: string) => {
    if (languages.length === 1) return;
    updateData({ languages: languages.filter((row) => row.id !== id) });
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
    clearFieldError(dataKey as FieldName);
  };

  const handleCustomInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    inputValue: string,
    setInputValue: any,
    optionsList: string[],
    setOptionsList: any,
    currentSelection: string[],
    dataKey: "speakerTypes" | "specialisedIndustries",
  ) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newItem = inputValue.trim();
      if (
        !optionsList.some((opt) => opt.toLowerCase() === newItem.toLowerCase())
      )
        setOptionsList((prev: any) => [...prev, newItem]);
      if (
        !currentSelection.some((s) => s.toLowerCase() === newItem.toLowerCase())
      )
        updateData({ [dataKey]: [...currentSelection, newItem] });
      setInputValue("");
      clearFieldError(dataKey as FieldName);
    }
  };

  const handleFinishProfile = () => {
    const fieldsToValidate: FieldName[] = [
      "languages",
      "yearsOfExperience",
      "speakingStyle",
      "speakerTypes",
      "specialisedIndustries",
      "preferredAudienceSize",
    ];
    const newErrors: FieldErrors = {};
    fieldsToValidate.forEach((field) => {
      const message = validateField(field);
      if (message) newErrors[field] = message;
    });
    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length === 0) navigate("/authentication");
  };

  // shared classes
  const dropdownPanelClass = (open: boolean) =>
    `absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto origin-top transition-all duration-200 ease-out ${
      open
        ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
        : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
    }`;

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={5} />
        <div
          className="max-w-xl mx-auto px-6 py-8 select-none"
          ref={containerRef}
        >
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
                      className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs outline-none focus:outline-none"
                    >
                      <span>{row.language}</span>
                      <ChevronDown
                        size={14}
                        className={`text-stone-500 transition-transform ${activeMenu?.id === row.id && activeMenu.field === "lang" ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={dropdownPanelClass(
                        activeMenu?.id === row.id &&
                          activeMenu.field === "lang",
                      )}
                    >
                      {regionLanguages.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => {
                            handleUpdateLanguage(row.id, { language: l });
                            setActiveMenu(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                        >
                          {l}
                        </button>
                      ))}
                    </div>
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
                      className="w-full flex items-center justify-between px-4 py-3 bg-white text-sm font-medium text-heading rounded-xl shadow-2xs outline-none focus:outline-none"
                    >
                      <span className="truncate">{row.proficiency}</span>
                      <ChevronDown
                        size={14}
                        className={`text-stone-500 transition-transform ${activeMenu?.id === row.id && activeMenu.field === "prof" ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={dropdownPanelClass(
                        activeMenu?.id === row.id &&
                          activeMenu.field === "prof",
                      )}
                    >
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
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={languages.length === 1}
                    onClick={() => handleRemoveLanguageRow(row.id)}
                    className="p-2 text-red-500 disabled:text-stone-300 outline-none focus:outline-none"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            {fieldErrors.languages && (
              <p className="mt-2 text-xs text-red-500">
                {fieldErrors.languages}
              </p>
            )}
            <button
              type="button"
              onClick={handleAddLanguageRow}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-900/15 text-xs font-medium rounded-full hover:bg-stone-900/5 outline-none focus:outline-none"
            >
              <Plus size={12} /> Add language
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                Years of experience *
              </label>
              <input
                type="text"
                value={yearsOfExperience}
                onChange={(e) => {
                  updateData({
                    yearsOfExperience: e.target.value.replace(/[^0-9]/g, ""),
                  });
                  clearFieldError("yearsOfExperience");
                }}
                onBlur={() => handleBlur("yearsOfExperience")}
                className={`w-full px-4 py-3 bg-white text-sm rounded-xl outline-none focus:outline-none ${fieldErrors.yearsOfExperience ? "ring-1 ring-red-500" : ""}`}
              />
              {fieldErrors.yearsOfExperience && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.yearsOfExperience}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
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
                className={`w-full flex items-center justify-between px-4 py-3 bg-white text-sm rounded-xl outline-none focus:outline-none ${fieldErrors.speakingStyle ? "ring-1 ring-red-500" : ""}`}
              >
                <span>{speakingStyle || "Select a speaking style"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${activeMenu?.field === "style" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={dropdownPanelClass(activeMenu?.field === "style")}
              >
                {styleOptions.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      updateData({ speakingStyle: st });
                      setActiveMenu(null);
                      clearFieldError("speakingStyle");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                  >
                    {st}
                  </button>
                ))}
              </div>
              {fieldErrors.speakingStyle && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.speakingStyle}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5 relative">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              What type of speaker are you? *
            </label>
            <div
              onClick={() => {
                setActiveMenu({ id: "global", field: "types" });
                typeInputRef.current?.focus();
              }}
              className={`w-full min-h-[46px] p-2 bg-white rounded-xl outline-none focus:outline-none ${fieldErrors.speakerTypes ? "ring-1 ring-red-500" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {speakerTypes.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 rounded-md text-xs"
                  >
                    {t}{" "}
                    <X
                      size={11}
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
                  className="flex-1 bg-transparent text-sm p-1 outline-none focus:outline-none"
                />
              </div>
            </div>
            <div className={dropdownPanelClass(activeMenu?.field === "types")}>
              {typeOptions
                .filter((opt) => !speakerTypes.includes(opt))
                .map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      handleToggleMultiSelect(
                        opt,
                        speakerTypes,
                        "speakerTypes",
                      );
                      typeInputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                  >
                    {opt}
                  </button>
                ))}
            </div>
            {fieldErrors.speakerTypes && (
              <p className="mt-1 text-xs text-red-500">
                {fieldErrors.speakerTypes}
              </p>
            )}
          </div>

          <div className="mb-5 relative">
            <label className="block text-xs font-medium text-stone-600 mb-1.5">
              Specialised industries *
            </label>
            <div
              onClick={() => {
                setActiveMenu({ id: "global", field: "industries" });
                industryInputRef.current?.focus();
              }}
              className={`w-full min-h-[46px] p-2 bg-white rounded-xl outline-none focus:outline-none ${fieldErrors.specialisedIndustries ? "ring-1 ring-red-500" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {specialisedIndustries.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-stone-100 rounded-md text-xs"
                  >
                    {t}{" "}
                    <X
                      size={11}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMultiSelect(
                          t,
                          specialisedIndustries,
                          "specialisedIndustries",
                        );
                      }}
                    />
                  </span>
                ))}
                <input
                  ref={industryInputRef}
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
                  className="flex-1 bg-transparent text-sm p-1 outline-none focus:outline-none"
                />
              </div>
            </div>
            <div
              className={dropdownPanelClass(activeMenu?.field === "industries")}
            >
              {industryOptions
                .filter((opt) => !specialisedIndustries.includes(opt))
                .map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      handleToggleMultiSelect(
                        opt,
                        specialisedIndustries,
                        "specialisedIndustries",
                      );
                      industryInputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                  >
                    {opt}
                  </button>
                ))}
            </div>
            {fieldErrors.specialisedIndustries && (
              <p className="mt-1 text-xs text-red-500">
                {fieldErrors.specialisedIndustries}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                How many events?
              </label>
              <input
                type="text"
                value={eventsSpokenAt}
                onChange={(e) =>
                  updateData({
                    eventsSpokenAt: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                placeholder="e.g. 200"
                className="w-full px-4 py-3 bg-white text-sm rounded-xl outline-none focus:outline-none"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-stone-600 mb-1.5">
                Preferred audience size *
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
                className={`w-full flex items-center justify-between px-4 py-3 bg-white text-sm rounded-xl outline-none focus:outline-none ${fieldErrors.preferredAudienceSize ? "ring-1 ring-red-500" : ""}`}
              >
                <span>{preferredAudienceSize || "Select audience size"}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${activeMenu?.field === "audSize" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={dropdownPanelClass(activeMenu?.field === "audSize")}
              >
                {audienceOptions.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      updateData({ preferredAudienceSize: a });
                      setActiveMenu(null);
                      clearFieldError("preferredAudienceSize");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 outline-none focus:outline-none"
                  >
                    {a}
                  </button>
                ))}
              </div>
              {fieldErrors.preferredAudienceSize && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.preferredAudienceSize}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white/60 outline-none focus:outline-none"
            >
              Back
            </button>
            <button
              onClick={handleFinishProfile}
              className="px-5 py-2.5 bg-white text-sm font-medium rounded-xl shadow-sm outline-none focus:outline-none"
            >
              Finish and create profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step5_infoAdditional;
