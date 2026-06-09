// App.tsx
import { Link } from "react-router-dom";
import SearchBar from "./components/UI/SearchBar";
import Navbar from "./components/layout/Navbar";
import SpeakerCard from "./components/Modules/SpeakerCard";
import "./index.css";

const GuestActions = (
  <>
    <Link
      to="#joinAsSpeaker"
      className="text-sm font-normal text-white underline underline-offset-2"
    >
      Join as a Speaker
    </Link>
    <Link
      to="#login"
      className="text-sm font-normal bg-white text-heading px-5 py-2 rounded-lg hover:opacity-90 transition-opacity ml-4"
    >
      Log In
    </Link>
  </>
);

function App() {
  return (
    <div className="min-h-screen relative">
      <Navbar role="guest" end={GuestActions} />

      <section className="flex h-[110vh] gap-6 pr-3 pb-3">
        <div className="flex flex-col justify-center w-[52%] gap-6 pl-12 pt-16">
          <span className="w-fit bg-indigo-100 text-indigo-700 text-sm font-normal px-4 py-1 rounded-full">
            Trusted by event teams at leading UK companies
          </span>
          <h1 className="text-5xl font-bold text-heading leading-tight">
            Book speakers you <br /> can trust
          </h1>
          <p className="text-grey text-sm font-normal max-w-sm leading-relaxed">
            Verified reviews, clear pricing, and a simple booking flow.
            Shortlist in minutes and confirm with confidence
          </p>
          <SearchBar />
        </div>

        <div className="relative flex-1 rounded-3xl overflow-hidden mt-3">
          <img
            src="images/hero-img-home.png"
            alt="Speaker on stage"
            className="w-full h-full object-cover"
          />
          <SpeakerCard />
        </div>
      </section>
    </div>
  );
}

export default App;
