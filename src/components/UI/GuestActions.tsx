import { Link } from "react-router-dom";
function GuestActions() {
  return (
    <>
      {/* TODO : Add the onboarding screen link once complete*/}
      <Link
        to="#joinAsSpeaker"
        className="text-sm font-normal text-white underline underline-offset-2"
      >
        Join as a Speaker
      </Link>
      {/* TODO : Add the proper link of the screen later*/}
      <Link
        to="#login"
        className="text-sm font-normal bg-white text-heading px-5 py-2 rounded-lg hover:opacity-90 transition-opacity ml-4"
      >
        Log In
      </Link>
    </>
  );
}

export default GuestActions;
