// src/features/auth/Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Authfields from "../components/Modules/Form/Authfields";
import VerifyFields from "../components/Modules/Form/Verifyfields";
import TestimonialCard from "../components/Modules/TestimonialCard";
import GradientBg from "../components/UI/GradientBg";

type Step = "auth" | "verify";

function Auth() {
  const [step, setStep] = useState<Step>("auth");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setStep("verify");
  };

  const handleVerified = () => {
    navigate("/onboarding");
  };

  return (
    <GradientBg>
      <Navbar role="auth" />

      <section className="flex h-[110vh] gap-6 pr-3 pb-10 animate-fade-slide-up">
        {/* Left column */}
        <div className="flex-1 flex items-center justify-center px-12 pt-16">
          {step === "auth" ? (
            <Authfields
              email={email}
              setEmail={setEmail}
              onSubmit={handleSubmit}
            />
          ) : (
            <VerifyFields
              onBack={() => setStep("auth")}
              onVerified={handleVerified}
            />
          )}
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

export default Auth;
