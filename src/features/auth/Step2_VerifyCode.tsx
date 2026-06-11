// Step2_VerifyCode.tsx
import Navbar from "../../components/layout/Navbar";
import VerifyFields from "../../components/Modules/Form/Verifyfields"; // Notice the capital F
import TestimonialCard from "../../components/Modules/TestimonialCard";
import GradientBg from "../../components/UI/GradientBg";

function Step2_VerifyCode() {
  const handleVerified = () => {
    alert("Successfully verified");
    // Move to onboarding here
  };

  const handleBack = () => {
    alert("Navigating back to Step 1");
    // Go back to step 1 here
  };

  return (
    <GradientBg>
      <Navbar role="auth" />

      <section className="flex h-[110vh] gap-6 pr-3 pb-10">
        {/* Left column */}
        <div className="flex-1 flex items-center justify-center px-12 pt-16">
          {/* Only passing exactly what the component demands */}
          <VerifyFields onBack={handleBack} onVerified={handleVerified} />
        </div>

        {/* Right column */}
        <div className="relative flex-1 rounded-3xl overflow-hidden mt-3">
          <img
            src="/images/hero-img-home.png"
            alt="Speaker on stage"
            className="w-full h-full object-cover"
          />
          <TestimonialCard />
        </div>
      </section>
    </GradientBg>
  );
}

export default Step2_VerifyCode;
