// components/Modules/SpeakerCard.tsx
import Data from "../../data/Data.json";

function SpeakerCard() {
  const speaker = Data.speakers[0];

  return (
    <div className="absolute bottom-24 left-[40%] -translate-x-1/2 flex items-end gap-0">
      {/* Card */}
      <div className="bg-white rounded-2xl px-5 py-4 shadow-lg w-64 mb-4">
        {/* Name + Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-heading text-sm font-semibold">
            {speaker.name}
          </span>
          <div className="flex items-center gap-1">
            {/* Star SVG — replace src */}
            <img src="/icons/star.svg" alt="star" className="w-3 h-3" />
            <span className="text-heading text-xs font-medium">
              {speaker.rating}
            </span>
          </div>
        </div>

        {/* Title */}
        <p className="text-grey text-xs font-normal mb-3">{speaker.title}</p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-grey text-xs">
            {/* Location pin SVG — replace src */}
            <img
              src="/icons/locationPin.svg"
              alt="location"
              className="w-3 h-3"
            />
            <span>{speaker.location}</span>
          </div>
          <span className="text-heading text-sm font-semibold">
            £{speaker.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Blob with arrow baked in */}
      <button
        onClick={() => {}}
        className="absolute -bottom-14 -right-16 hover:opacity-80 transition-opacity flex items-center justify-center w-28 h-28"
      >
        {/* Blob shape SVG — replace src */}
        <img
          src="/icons/hero-img-shape.svg"
          alt=""
          className="absolute inset-0 w-full h-full"
        />
        {/* Arrow SVG — replace src */}
        <img
          src="/icons/hero-shape-arrow.svg"
          alt="arrow"
          className="relative z-10 w-6 h-6"
        />
      </button>
    </div>
  );
}

export default SpeakerCard;
