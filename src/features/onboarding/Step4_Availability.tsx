// src/features/onboarding/Step4_Availability.tsx
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

function Step4_Availability({ onNext, onBack }: Step4Props) {
  const handleContinue = () => {
    onNext();
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={4} />

        {/* Availability/Calendar management fields go here */}

        <div className="flex justify-between px-12 mt-6">
          <button onClick={onBack} className="text-sm font-medium text-grey">
            Back
          </button>
          <button
            onClick={handleContinue}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step4_Availability;
