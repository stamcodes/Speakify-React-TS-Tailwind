// src/pages/Onboarding.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Fixed Imports: Separated the values from the types
import { initialOnboardingData } from "../features/onboarding/onboardingTypes";
import type {
  OnboardingData,
  VideoItem,
} from "../features/onboarding/onboardingTypes";

// Layout & UI Wrappers
import GradientBg from "../components/UI/GradientBg";

// Step Component Pages
import Step1_Profile from "../features/onboarding/Step1_Profile";
import Step2_Topics from "../features/onboarding/Step2_AddVideo";
import Step3_Pricing from "../features/onboarding/Step3_PreferredCategories";
import Step4_Availability from "../features/onboarding/Step4_PricingAndTravel";
import Step5_Bio from "../features/onboarding/Step5_infoAdditional";

function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);
  const navigate = useNavigate();

  const goNext = () => setStep((prev) => Math.min(6, prev + 1));
  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <GradientBg>
      <div className="relative min-h-screen w-full">
        {/* Multi-Step Flow Router */}
        {(() => {
          switch (step) {
            case 1:
              return (
                <Step1_Profile
                  data={data}
                  updateData={updateData}
                  onNext={goNext}
                />
              );
            case 2:
              return (
                <Step2_Topics
                  data={data}
                  updateData={updateData}
                  onNext={goNext}
                  onBack={goBack}
                />
              );
            case 3:
              return <Step3_Pricing onNext={goNext} onBack={goBack} />;
            case 4:
              return <Step4_Availability onNext={goNext} onBack={goBack} />;
            case 5:
              return <Step5_Bio onNext={goNext} onBack={goBack} />;

            default:
              return (
                <Step1_Profile
                  data={data}
                  updateData={updateData}
                  onNext={goNext}
                />
              );
          }
        })()}
      </div>
    </GradientBg>
  );
}

export default Onboarding;
