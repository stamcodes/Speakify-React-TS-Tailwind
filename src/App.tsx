import Navbar from "./components/layout/Navbar";
import "./index.css";
import Data from "./data/Data.json";

function App() {
  // Mock data to test logged-in profile layouts (Rows 2, 3, and 4)
  console.log("🚀 Data.json Check — Speakers:", Data.speakers);

  return (
    <div className="min-h-screen">
      {/* 
        TEST ANY VARIANT HERE BY PASSING PROPS:
        Row 1: <Navbar role="guest" />
        Row 2: <Navbar role="attendee" user={mockUser} />
        Row 3: <Navbar role="speaker" user={{ name: "Yemi Adeyemi", avatarUrl: mockUser.avatarUrl }} />
        Row 4: <Navbar role="organizer" user={mockUser} />
        Row 5: <Navbar role="minimal" />
      */}
      <Navbar role="guest" />

      {/* Hero Section */}
      <section className="flex h-[90vh] px-12 pt-10 gap-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center w-[55%] gap-6">
          {/* Trust badge */}
          <span className="w-fit bg-indigo-100 text-indigo-700 text-sm px-4 py-1 rounded-full">
            Trusted by event teams at leading UK companies
          </span>

          {/* Headline */}
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Book speakers you <br /> can trust
          </h1>

          {/* Subheading */}
          <p className="text-gray-500 text-base max-w-sm">
            Verified reviews, clear pricing, and a simple booking flow.
            Shortlist in minutes and confirm with confidence
          </p>

          {/* Search bar placeholder
           <SearchBar /> */}
        </div>

        {/* Right Column — image panel */}
        <div className="relative w-[45%] rounded-l-3xl overflow-hidden">
          <img
            src="/hero-speaker.jpg"
            alt="Speaker on stage"
            className="w-full h-full object-cover"
          />

          {/* Floating speaker card placeholder
          <SpeakerCard /> */}
        </div>
      </section>
    </div>
  );
}

export default App;
