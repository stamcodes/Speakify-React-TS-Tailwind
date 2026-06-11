// VerifyFields.tsx
import { useState } from "react";

interface VerifyFieldsProps {
  onBack: () => void;
  onVerified: () => void;
}

function VerifyFields({ onBack, onVerified }: VerifyFieldsProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    const isValid = /^\d{6}$/.test(code);

    if (!isValid) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    onVerified();
  };

  const handleResend = () => {
    setCode("");
    setError("");
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl p-6 fade-in">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .fade-in {
            animation: fadeIn 0.25s ease-in-out;
          }
        `}
      </style>

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-grey mb-8 hover:text-heading transition-colors"
      >
        <span>&larr;</span> Back
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-heading mb-2">
        Confirm your email
      </h2>
      <p className="text-sm text-grey mb-6">
        We just sent you a 6-digit confirmation code. Please enter it in the
        field below.
      </p>

      {/* Code field */}
      <label className="block text-sm font-medium text-heading mb-1">
        Confirmation code
      </label>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        placeholder="Enter 6-digit code here"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          if (error) setError("");
        }}
        className={`w-full bg-[#f4ece4] rounded-lg px-4 py-3 text-sm placeholder:text-grey mb-2 outline-none focus:ring-2 ${
          error ? "ring-2 ring-red-400" : "focus:ring-heading/20"
        }`}
      />
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {/* Confirm button */}
      <button
        onClick={handleVerify}
        className="w-full bg-white text-black text-sm font-semibold py-3 rounded-lg mb-6 mt-2 hover:opacity-90 transition-opacity"
      >
        Confirm email
      </button>

      {/* Resend */}
      <p className="text-center text-sm text-grey">
        Didn't receive the code?{" "}
        <button
          onClick={handleResend}
          className="text-heading underline underline-offset-2 font-medium"
        >
          Resend now
        </button>
      </p>
    </div>
  );
}

export default VerifyFields;
