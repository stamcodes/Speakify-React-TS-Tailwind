// App.tsx
import { Link } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "./index.css";

const GuestActions = (
  <>
    <Link
      to="#joinAsSpeaker"
      className="text-sm underline underline-offset-2 text-white"
    >
      Join as a Speaker
    </Link>
    <Link
      to="#login"
      className="text-sm bg-white text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
    >
      Log In
    </Link>
  </>
);

// App.tsx
function App() {
  return (
    <div className="min-h-screen relative px-3 pb-3">
      {/* Navbar — absolute so it overlaps the image on the right */}
      <Navbar role="guest" end={GuestActions} />

      {/* Hero Section */}
      <section className="flex h-screen gap-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center w-[55%] gap-6 pl-12">
          <span className="w-fit bg-indigo-100 text-indigo-700 text-sm px-4 py-1 rounded-full">
            Trusted by event teams at leading UK companies
          </span>
          <h1 className="text-5xl leading-tight">
            Book speakers you <br /> can trust
          </h1>
          <p className="text-gray-500 text-base max-w-sm">
            Verified reviews, clear pricing, and a simple booking flow.
            Shortlist in minutes and confirm with confidence
          </p>

          {/* <SearchBar /> */}
        </div>

        {/* Right Column — full height, bleeds to edge */}
        <div className="relative flex-1 rounded-l-3xl overflow-hidden">
          <img
            src="images/hero-img-home.png"
            alt="Speaker on stage"
            className="w-full h-full object-cover"
          />
          {/* <SpeakerCard /> */}
        </div>
      </section>
    </div>
  );
}

export default App;
