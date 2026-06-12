// src/features/onboarding/onboardingTypes.ts

export interface VideoItem {
  id: string;
  name: string;
  type: "link" | "upload";
  meta: string;
}

export interface PricingTier {
  id: string;
  region: string;
  currency: string;
  fee: string;
  travelIncluded: boolean;
}

export interface LanguageRow {
  id: string;
  language: string;
  proficiency: string;
}

export interface OnboardingData {
  accountType: "speaker" | "bureau";
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  title: string;
  bio: string;
  profilePicture: File | null;
  videoMethod: "upload" | "link";
  videos: VideoItem[];
  categories: string[];
  pricingTiers?: PricingTier[];
  languages?: LanguageRow[];
  yearsOfExperience?: string;
  speakingStyle?: string;
  speakerTypes?: string[];
  specialisedIndustries?: string[];
  eventsSpokenAt?: string;
  preferredAudienceSize?: string;
}

export const initialOnboardingData: OnboardingData = {
  accountType: "speaker",
  email: "",
  firstName: "",
  lastName: "",
  location: "",
  title: "",
  bio: "",
  profilePicture: null,
  videoMethod: "upload",
  videos: [],
  categories: [],

  // Default values retained for Step 4
  pricingTiers: [
    { id: "1", region: "UK", currency: "£", fee: "7500", travelIncluded: true },
    {
      id: "2",
      region: "EU",
      currency: "€",
      fee: "8000",
      travelIncluded: false,
    },
    {
      id: "3",
      region: "US",
      currency: "$",
      fee: "9500",
      travelIncluded: false,
    },
  ],

  // Default values retained for Step 5
  languages: [
    {
      id: "l1",
      language: "English",
      proficiency: "Full professional proficiency",
    },
    { id: "l2", language: "Spanish", proficiency: "Native proficiency" },
  ],
  yearsOfExperience: "10",
  speakingStyle: "Motivational",
  speakerTypes: ["Keynote Speaker", "Moderator"],
  specialisedIndustries: ["Finance", "E-commerce"],
  eventsSpokenAt: "200",
  preferredAudienceSize: "Up to 500",
};
