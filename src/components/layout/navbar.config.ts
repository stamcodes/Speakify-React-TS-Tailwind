// navbar.config.ts
export const NAV_LINKS = {
  guest: [
    { label: "Find Speakers", path: "#findSpeakers" },
    { label: "Explore Events", path: "#exploreEvents" },
  ],
  buyer: [
    { label: "Dashboard", path: "#dashboard" },
    { label: "Find Speakers", path: "#findSpeakers" },
    { label: "My Events", path: "#myEvents" },
    { label: "My Bookings", path: "#myBookings" },
  ],
  speaker: [
    { label: "Dashboard", path: "#dashboard" },
    { label: "Explore Events", path: "#exploreEvents" },
    { label: "My Events", path: "#myEvents" },
    { label: "My Applications", path: "#myApplications" },
  ],
  organizer: [
    { label: "Dashboard", path: "#dashboard" },
    { label: "My Speakers", path: "#mySpeakers" },
  ],
  auth: [],
};

export type Role = keyof typeof NAV_LINKS;
