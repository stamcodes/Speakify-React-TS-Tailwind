// src/features/onboarding/Step1_Profile.tsx
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import Toggle from "../../components/UI/Toggle";
import type { OnboardingData } from "../onboarding/onboardingTypes";

interface Step1Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
}

type AccountType = "speaker" | "bureau";

type FieldName =
  | "email"
  | "firstName"
  | "lastName"
  | "location"
  | "title"
  | "bio";

type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HAS_NUMBER_REGEX = /\d/;
const BIO_MIN_LENGTH = 30;
const BIO_MAX_LENGTH = 500;

function Step1_Profile({ data, updateData, onNext }: Step1Props) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ profilePicture: file });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      updateData({ profilePicture: file });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // Returns the error message for a single field, or null if valid
  const validateField = (field: FieldName, value: string): string | null => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Please enter your email";
        if (!EMAIL_REGEX.test(value.trim()))
          return "Please enter a valid email";
        return null;

      case "firstName":
        if (!value.trim()) return "Please enter your first name";
        if (HAS_NUMBER_REGEX.test(value))
          return "Please enter your real name without the use of NUMBERS";
        return null;

      case "lastName":
        if (!value.trim()) return "Please enter your last name";
        if (HAS_NUMBER_REGEX.test(value))
          return "Please enter your real name without the use of NUMBERS";
        return null;

      case "location":
        if (!value.trim()) return "Please enter your location";
        if (HAS_NUMBER_REGEX.test(value))
          return "Please enter a valid location without the use of NUMBERS";
        return null;

      case "title":
        if (!value.trim()) return "Please enter your title";
        if (HAS_NUMBER_REGEX.test(value))
          return "Please enter a valid title without the use of NUMBERS";
        return null;

      case "bio":
        if (!value.trim()) return "Please enter a short bio";
        if (value.trim().length < BIO_MIN_LENGTH)
          return `Please enter at least ${BIO_MIN_LENGTH} characters in bio`;
        return null;

      default:
        return null;
    }
  };

  // Runs on blur — sets or clears the error for that field
  const handleBlur = (field: FieldName, value: string) => {
    const message = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  // Clears a field's error as soon as the user starts typing again
  const clearFieldError = (field: FieldName) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (field: FieldName) =>
    `w-full px-4 py-3 rounded-xl bg-white text-sm text-heading placeholder:text-grey/60 focus:outline-none focus:ring-2 transition-colors ${
      fieldErrors[field]
        ? "border border-red-500 focus:ring-red-200"
        : "border border-transparent focus:ring-grey/20"
    }`;

  const handleContinue = () => {
    if (data.accountType === "bureau") {
      return; // notice is already visible below the toggle
    }

    const fields: { name: FieldName; value: string }[] = [
      { name: "email", value: data.email },
      { name: "firstName", value: data.firstName },
      { name: "lastName", value: data.lastName },
      { name: "location", value: data.location },
      { name: "title", value: data.title },
      { name: "bio", value: data.bio },
    ];

    const newErrors: FieldErrors = {};
    fields.forEach(({ name, value }) => {
      const message = validateField(name, value);
      if (message) newErrors[name] = message;
    });

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onNext();
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={1} />

        <div className="max-w-xl mx-auto px-6 py-8">
          <div className="bg-transparent">
            {/* Account type toggle */}
            <Toggle<AccountType>
              leftLabel="I'm a Speaker"
              leftValue="speaker"
              rightLabel="We're a Speaker Bureau"
              rightValue="bureau"
              value={data.accountType}
              onChange={(value) => updateData({ accountType: value })}
              className="mb-6"
            />

            {data.accountType === "bureau" && (
              <p className="text-2xl md:text-3xl font-semibold text-heading text-center py-20">
                Sorry, we are not accepting bureau applications currently.
              </p>
            )}

            {data.accountType === "speaker" && (
              <>
                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-heading mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => {
                      updateData({ email: e.target.value });
                      clearFieldError("email");
                    }}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass("email")}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* First Name / Last Name */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={data.firstName}
                      onChange={(e) => {
                        updateData({ firstName: e.target.value });
                        clearFieldError("firstName");
                      }}
                      onBlur={(e) => handleBlur("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      className={inputClass("firstName")}
                    />
                    {fieldErrors.firstName && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={data.lastName}
                      onChange={(e) => {
                        updateData({ lastName: e.target.value });
                        clearFieldError("lastName");
                      }}
                      onBlur={(e) => handleBlur("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      className={inputClass("lastName")}
                    />
                    {fieldErrors.lastName && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-heading mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => {
                      updateData({ location: e.target.value });
                      clearFieldError("location");
                    }}
                    onBlur={(e) => handleBlur("location", e.target.value)}
                    placeholder="Enter your location"
                    className={inputClass("location")}
                  />
                  {fieldErrors.location && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {fieldErrors.location}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-heading mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => {
                      updateData({ title: e.target.value });
                      clearFieldError("title");
                    }}
                    onBlur={(e) => handleBlur("title", e.target.value)}
                    placeholder="Enter your title"
                    className={inputClass("title")}
                  />
                  {fieldErrors.title && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {fieldErrors.title}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-heading mb-2">
                    Bio *
                  </label>
                  <div className="relative">
                    <textarea
                      value={data.bio}
                      onChange={(e) => {
                        if (e.target.value.length <= BIO_MAX_LENGTH) {
                          updateData({ bio: e.target.value });
                          clearFieldError("bio");
                        }
                      }}
                      onBlur={(e) => handleBlur("bio", e.target.value)}
                      placeholder="A short introduction — who you are and what you speak about"
                      rows={5}
                      className={`${inputClass("bio")} resize-none`}
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-grey/60">
                      {data.bio.length}/{BIO_MAX_LENGTH}
                    </span>
                  </div>
                  {fieldErrors.bio && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {fieldErrors.bio}
                    </p>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-heading mb-2">
                    Profile Picture *
                  </label>
                  <label
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex flex-col items-center justify-center gap-3 w-full py-10 border border-dashed border-grey/30 rounded-2xl bg-white/40 cursor-pointer hover:bg-white/60 transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <ImageIcon size={18} className="text-heading" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-heading">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-grey/60 mt-1">
                        {data.profilePicture
                          ? data.profilePicture.name
                          : "PNG or JPG (max. 5 MB)"}
                      </p>
                    </div>
                  </label>
                </div>
              </>
            )}
            {/* Actions */}
            {data.accountType === "speaker" && (
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl text-sm font-medium text-heading bg-white hover:bg-white/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="px-6 py-3 rounded-xl text-sm font-medium text-heading bg-white hover:bg-white/80 transition-colors cursor-pointer"
                >
                  Next step
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1_Profile;
