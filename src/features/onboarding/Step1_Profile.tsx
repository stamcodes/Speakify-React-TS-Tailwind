// src/features/onboarding/Step1_Profile.tsx
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";

interface Step1Props {
  onNext: () => void;
}

function Step1_Profile({ onNext }: Step1Props) {
  const handleContinue = () => {
    onNext();
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={1} />
        {/* Add the toggle Component first */}
        {/* form fields */}
        <button onClick={handleContinue}></button>
      </div>
    </div>
  );
}

export default Step1_Profile;
