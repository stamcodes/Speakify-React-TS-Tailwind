// src/features/onboarding/Step6_Review.tsx
import Navbar from "../../components/layout/Navbar";
// Notice: No step counter component needed here since step 5 was our final numbered track element from your step config.

interface Step6Props {
  onComplete: () => void;
  onBack: () => void;
}

function Step6_Review({ onComplete, onBack }: Step6Props) {
  const handleSubmit = () => {
    alert("Onboarding complete! Redirecting to application...");
    onComplete();
  };

  return (
    <div>
      <Navbar role="auth" />

      <div className="w-full px-12 py-12 text-center mt-10">
        <h2 className="text-2xl font-bold text-heading mb-2">
          Review your information
        </h2>
        <p className="text-sm text-grey mb-8">
          Please double-check your entries before submitting your profile.
        </p>

        {/* Render a read-only data summary breakdown here */}
      </div>

      <div className="flex justify-between px-12 mt-6">
        <button onClick={onBack} className="text-sm font-medium text-grey">
          Back to edit
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-green-700 transition-colors"
        >
          Submit Profile
        </button>
      </div>
    </div>
  );
}

export default Step6_Review;
