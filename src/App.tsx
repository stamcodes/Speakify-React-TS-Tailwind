// App.tsx
import { Link } from "react-router-dom";
import SearchBar from "./components/UI/SearchBar";
import Navbar from "./components/layout/Navbar";
import SpeakerCard from "./components/Modules/SpeakerCard";
import BrandStrip from "./components/Modules/BrandStrip";
import Button from "./components/UI/Button";
import AuthorCard from "./components/Modules/AuthorCard";
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

      {/* Hero Section */}
      <section className="flex h-[110vh] gap-6 pr-3 pb-10">
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

      {/* Brands + Categories Section */}
      <div className="relative w-full">
        <div
          className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />

        <section
          className="w-full px-12 pt-10 pb-16 flex flex-col items-center gap-10"
          style={{
            borderRadius: "80% 80% 0 0 / 300px 300px 0 0",
            background:
              "linear-gradient(to bottom, #f6f1e4 0%, #ffffff 8%, #f6f1e4 100%)",
          }}
        >
          <div className="w-full px-4 py-16 flex flex-col items-center gap-10">
            <h2 className="text-heading text-2xl text-center">
              Trusted by the world's leading teams
            </h2>
            <BrandStrip />
          </div>

          <div className="py-16">
            <h2 className="text-heading text-4xl font-bold text-center">
              Choose from thousands of qualified speakers
            </h2>

            <div className="flex gap-6 w-full justify-center mt-35 relative">
              {/* Add a container with right/top offset */}
              <div className="relative flex gap-6">
                <AuthorCard
                  category="Brand Strategy & Marketing"
                  description="Define your market position and make it stick"
                  speakerCount={110}
                  authorImage="/images/authorCardhero1.png"
                  cardBg="#f4eee6"
                  pillIcon="/icons/authorCard-Icon1.svg"
                />
                <AuthorCard
                  category="Strategy & Analysis"
                  description="Turn data into decisions that move the business forward"
                  speakerCount={231}
                  authorImage="/images/authorCardhero2.png"
                  cardBg="#f0eced"
                  pillIcon="/icons/authorCard-Icon2.svg"
                />
                <AuthorCard
                  category="Sales & Revenue Growth"
                  description="Drive pipeline, close deals, and scale what works"
                  speakerCount={453}
                  authorImage="/images/authorCardhero3test.png"
                  cardBg="#eeeded"
                  pillIcon="/icons/authorCard-Icon3.svg"
                />
                <AuthorCard
                  category="AI Integration & Transformation"
                  description="Navigate the shift and lead your organisation through it"
                  speakerCount={234}
                  authorImage="/images/authorCardhero4.png"
                  cardBg="#e7ede8"
                  pillIcon="/icons/authorCard-Icon4.svg"
                />
              </div>
            </div>

            <div className="flex justify-center mt-20">
              <Button label="Browse all categories" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
