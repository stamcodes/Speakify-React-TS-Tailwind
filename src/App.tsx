// App.tsx
import SearchBar from "./components/UI/SearchBar";
import Navbar from "./components/layout/Navbar";
import SpeakerCard from "./components/Modules/SpeakerCard";
import BrandStrip from "./components/Modules/BrandStrip";
import Button from "./components/UI/Button";
import AuthorCard from "./components/Modules/AuthorCard";
import FAQItem from "./components/Modules/FAQItem";
import GradientBg from "./components/UI/GradientBg";
import Footer from "./components/layout/Footer";
import GuestActions from "./components/UI/GuestActions";
import Data from "./data/Data.json";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen relative">
      <Navbar role="guest" end={<GuestActions />} />

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
        {/* Right Column TODO : Convert to Component to be used across other screens
        Use SpeakerCard with distinct values....  */}
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
        {/*Brand logo + AuthorCard section  */}
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
                  imageMarginTop="-1px"
                />
                <AuthorCard
                  category="Strategy & Analysis"
                  description="Turn data into decisions that move the business forward"
                  speakerCount={231}
                  authorImage="/images/authorCardhero2.png"
                  cardBg="#f0eced"
                  pillIcon="/icons/authorCard-Icon2.svg"
                  imageMarginTop="-3px"
                />
                <AuthorCard
                  category="Sales & Revenue Growth"
                  description="Drive pipeline, close deals, and scale what works"
                  speakerCount={453}
                  authorImage="/images/authorCardhero3test.png"
                  cardBg="#eeeded"
                  pillIcon="/icons/authorCard-Icon3.svg"
                  imageMarginTop="-14px"
                />
                <AuthorCard
                  category="AI Integration & Transformation"
                  description="Navigate the shift and lead your organisation through it"
                  speakerCount={234}
                  authorImage="/images/authorCardhero4.png"
                  cardBg="#e7ede8"
                  pillIcon="/icons/authorCard-Icon4.svg"
                  imageMarginTop="-9px"
                />
              </div>
            </div>

            <div className="flex justify-center mt-20">
              <Button label="Browse all categories" />
            </div>
          </div>
        </section>
      </div>

      {/* 3 steps to Book Speaker */}
      <section className="px-16 py-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-heading max-w-xs mb-4">
            Just 3 steps to book your perfect speaker
          </h2>
          <p className="text-grey text-sm max-w-xs leading-relaxed">
            A fast, transparent, AI-assisted booking flow —<br />
            from brief to e-sign in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="flex flex-col gap-3">
            <span className="text-5xl font-bold text-grey opacity-30">01</span>
            <h3 className="text-base font-bold text-heading">Create a brief</h3>
            <p className="text-grey text-sm leading-relaxed">
              Type in plain English or upload your PDF/
              <br />
              email - our AI structures your brief instantly.
            </p>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col gap-3 px-8 border-x border-grey/20">
            <span className="text-5xl font-bold text-grey opacity-30">02</span>
            <h3 className="text-base font-bold text-heading">
              Review & Shortlist
            </h3>
            <p className="text-grey text-sm leading-relaxed">
              See Top 5 AI matches, compare side-by-side, and share your
              shortlist for quick approval.
            </p>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-5xl font-bold text-grey opacity-30">
                03
              </span>
              <h3 className="text-base font-bold text-heading">
                Book & confirm
              </h3>
              <p className="text-grey text-sm leading-relaxed">
                One-click e-sign with transparent fees. Pay by card/invoice now,
                or PO for 60-90 day events.
              </p>
            </div>
            <div className="w-[60%] mt-5">
              <Button
                label="Find speakers now"
                icon="/icons/speakifyLogoDark.svg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Book a Speaker Section */}
      <section className="px-16 py-20 flex items-center justify-center">
        <div className="relative w-full flex items-center">
          {/* Left image — overflows out of the capsule */}
          <div className="absolute left-[112px] -top-[50px] z-10 w-72 h-96 ">
            <img
              src="/images/BookSpeaker.png"
              alt="Speaker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* White capsule */}
          <div className="ml-50 w-[70%] bg-white rounded-[150px] flex items-center justify-end px-24 py-25">
            <div className="flex flex-col gap-4 max-w-sm">
              <h2 className="text-3xl font-bold text-heading">
                Are you a speaker?
              </h2>
              <p className="text-grey text-sm leading-relaxed">
                Join Speakify to control your profile, pricing, and bookings.
              </p>
              <div>
                <Button label="Join now" variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-64 py-20 mt-15">
        <h2 className="text-4xl font-bold text-heading text-center mb-12">
          All your questions answered
        </h2>
        <div className="flex flex-col">
          {Data.faq.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      {/* Gradient BG section with CTA */}
      <section>
        <GradientBg>
          <h2 className="text-3xl font-bold text-heading text-center max-w-xs leading-snug">
            The best speakers are waiting for you
          </h2>
          <Button
            label="Book speaker now"
            icon="/icons/speakifyLogoDark.svg"
            variant="light"
          />
        </GradientBg>
      </section>

      <Footer
        tagline="Find your perfect speaker in 3 simple steps using AI-assisted matching"
        navLinks={[
          { label: "Find Speakers", href: "#" },
          { label: "Explore Events", href: "#" },
          { label: "Join as a Speaker", href: "#" },
        ]}
        legalLinks={[
          { label: "Terms of Use", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ]}
      />
    </div>
  );
}

export default App;
