// Step1_Email.tsx
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Authfields from "../../components/Modules/Form/Authfields";
import TestimonialCard from "../../components/Modules/TestimonialCard";
import GradientBg from "../../components/UI/GradientBg";

function Step1_Email() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert("Proceeded to verification page");
  };

  return (
    <GradientBg>
      <Navbar role="auth" />

      <section className="flex h-[110vh] gap-6 pr-3 pb-10">
        {/* Left column */}
        <div className="flex-1 flex items-center justify-center px-12 pt-16">
          <Authfields
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
          />
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

export default Step1_Email;
