import Navbar from "./components/layout/Navbar";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar placeholder */}
      <Navbar />

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
