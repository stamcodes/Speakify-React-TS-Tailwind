// AuthFields.tsx
import { useState } from "react";

type AuthMode = "login" | "signup";

interface AuthFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
}

function AuthFields({ email, setEmail, onSubmit }: AuthFieldsProps) {
  const [mode, setMode] = useState<AuthMode>("signup");

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl p-6">
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

      {/* Toggle */}
      <div className="flex bg-[#f4ece4] rounded-full p-1 mb-8">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 text-sm font-medium py-2 rounded-full transition-colors ${
            mode === "login" ? "bg-white text-heading shadow-sm" : "text-grey"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 text-sm font-medium py-2 rounded-full transition-colors ${
            mode === "signup" ? "bg-white text-heading shadow-sm" : "text-grey"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Heading + body — fades on mode change */}
      <div key={mode} className="fade-in">
        <h2 className="text-2xl font-bold text-heading mb-2">
          {mode === "signup" ? "Sign up" : "Log in"}
        </h2>
        <p className="text-sm text-grey mb-6">
          {mode === "signup"
            ? "Join Speakify to control your profile, pricing, and bookings."
            : "Welcome back. Log in to manage your bookings."}
        </p>

        {/* Email field */}
        <label className="block text-sm font-medium text-heading mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#f4ece4] rounded-lg px-4 py-3 text-sm placeholder:text-grey mb-4 outline-none focus:ring-2 focus:ring-heading/20"
        />

        {/* Primary action */}
        <button
          onClick={onSubmit}
          className="w-full bg-white text-black text-sm font-medium py-3 rounded-lg mb-4 hover:opacity-90 transition-opacity"
        >
          {mode === "signup" ? "Create an account" : "Log in"}
        </button>
      </div>

      {/* Google */}
      <button className="w-full flex items-center justify-center gap-2 border border-grey/20 bg-[#f4ece4] text-sm font-medium py-3 rounded-lg mb-3 hover:bg-white transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
          />
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
          />
          <path
            fill="#FBBC05"
            d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z"
          />
          <path
            fill="#EA4335"
            d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
          />
        </svg>
        Continue with Google
      </button>

      {/* LinkedIn */}
      <button className="w-full flex items-center justify-center gap-2 border border-grey/20 bg-[#f4ece4] text-sm font-medium py-3 rounded-lg mb-3 hover:bg-white transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.12 9.12H4.56V19.4h2.56V9.12zM5.84 8.04a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19.44 19.4h-2.55v-5.07c0-1.21-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.68v5.15H10.7V9.12h2.45v1.4h.03c.34-.65 1.18-1.34 2.43-1.34 2.6 0 3.83 1.71 3.83 3.94v6.28z"
          />
        </svg>
        Continue with LinkedIn
      </button>

      {/* Bottom link */}
      <p className="text-center text-sm text-grey mt-6">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-heading underline underline-offset-2"
            >
              Log in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-heading underline underline-offset-2"
            >
              Sign up
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default AuthFields;
