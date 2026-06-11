// src/pages/Onboarding.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Layout & UI Wrappers
import GradientBg from "../components/UI/GradientBg";

// Step Component Pages
import Step1_Profile from "../features/onboarding/Step1_Profile";
import Step2_Topics from "../features/onboarding/Step2_Topics";
import Step3_Pricing from "../features/onboarding/Step3_Pricing";
import Step4_Availability from "../features/onboarding/Step4_Availability";
import Step5_Bio from "../features/onboarding/Step5_Bio";
import Step6_Review from "../features/onboarding/Step6_Review";

function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const goNext = () => setStep((prev) => Math.min(6, prev + 1));
  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <GradientBg>
      <div className="relative min-h-screen w-full">
        {/* 🛠️ TEMPORARY PROTOTYPE CONTROLLER */}
        <div className="fixed top-4 right-4 z-[9999] bg-stone-900 text-white p-4 rounded-xl shadow-2xl border border-stone-700 flex flex-col gap-2 text-xs font-mono">
          <div className="font-bold text-amber-400 border-b border-stone-700 pb-1 mb-1">
            ⚙️ DEV TEST CONTROLLER
          </div>
          <div>
            Current Internal Step:{" "}
            <span className="font-bold text-green-400">{step}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="bg-stone-700 hover:bg-stone-600 disabled:opacity-30 px-3 py-1.5 rounded font-bold transition-opacity"
            >
              &larr; Prev Step
            </button>
            <button
              onClick={goNext}
              disabled={step === 6}
              className="bg-stone-700 hover:bg-stone-600 disabled:opacity-30 px-3 py-1.5 rounded font-bold transition-opacity"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>

        {/* Multi-Step Flow Router */}
        {(() => {
          switch (step) {
            case 1:
              return <Step1_Profile onNext={goNext} />;
            case 2:
              return <Step2_Topics onNext={goNext} onBack={goBack} />;
            case 3:
              return <Step3_Pricing onNext={goNext} onBack={goBack} />;
            case 4:
              return <Step4_Availability onNext={goNext} onBack={goBack} />;
            case 5:
              return <Step5_Bio onNext={goNext} onBack={goBack} />;
            case 6:
              return <Step6_Review onComplete={handleFinish} onBack={goBack} />;
            default:
              return <Step1_Profile onNext={goNext} />;
          }
        })()}
      </div>
    </GradientBg>
  );
}

export default Onboarding;
