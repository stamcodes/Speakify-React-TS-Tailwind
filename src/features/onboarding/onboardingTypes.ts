// src/features/onboarding/onboardingTypes.ts

export interface VideoItem {
  id: string;
  name: string;
  type: "link" | "upload";
  meta: string;
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
};
