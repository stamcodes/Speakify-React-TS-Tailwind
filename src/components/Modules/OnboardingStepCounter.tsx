// OnboardingStepCounter.tsx

const STEPS = [
  {
    number: 1,
    title: "Personal details",
    description: "Your name, location and bio",
  },
  {
    number: 2,
    title: "Add Video",
    description: "Showcase your speaking style and expertise",
  },
  {
    number: 3,
    title: "Preferred Event Categories",
    description: "Types of events you're most interested in",
  },
  {
    number: 4,
    title: "Pricing & Travel Policy",
    description: "Transparent pricing builds trust",
  },
  {
    number: 5,
    title: "Additional information",
    description: "Languages, experience, etc",
  },
];

interface OnboardingStepCounterProps {
  activeStep: number;
}

function OnboardingStepCounter({ activeStep }: OnboardingStepCounterProps) {
  return (
    <div className="w-full px-12 py-6">
      <div className="flex w-full items-start justify-between mt-20 mb-10 relative">
        {STEPS.map((step, index) => (
          <div
            key={step.number}
            className="flex-1 flex flex-col items-center text-center relative"
          >
            {/* Number + Connecting Line Row */}
            <div className="w-full flex items-center justify-center mb-4 relative">
              {/* Number Container */}
              <span
                className={`font-sans text-2xl tracking-tight z-10 px-3 transition-colors duration-300 ${
                  step.number === activeStep
                    ? "text-heading font-medium"
                    : "text-grey/40"
                }`}
              >
                {String(step.number).padStart(2, "0")}
              </span>

              {/* Connecting Line: Starts from the right edge of this number, stops at the left edge of the next */}
              {index < STEPS.length - 1 && (
                <div
                  className="absolute top-[50%] left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-grey/20 z-0 pointer-events-none"
                  style={{ transform: "translateY(-50%)" }}
                />
              )}
            </div>

            {/* Text Content Group */}
            <div className="max-w-[180px] mx-auto">
              <h3
                className={`text-sm font-semibold mb-1 tracking-tight transition-colors duration-300 ${
                  step.number === activeStep ? "text-heading" : "text-grey/40"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-xs leading-relaxed transition-colors duration-300 ${
                  step.number === activeStep ? "text-grey" : "text-grey/40"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingStepCounter;
