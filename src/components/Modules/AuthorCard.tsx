// components/Modules/AuthorCard.tsx

interface AuthorCardProps {
  category: string;
  description: string;
  speakerCount: number;
  authorImage: string;
  cardBg: string;
  pillIcon: string;
  imageMarginTop?: string;
}

function AuthorCard({
  category,
  description,
  speakerCount,
  authorImage,
  cardBg,
  pillIcon,
  imageMarginTop,
}: AuthorCardProps) {
  return (
    <div
      className="relative w-64 rounded-3xl flex flex-col"
      style={{
        backgroundColor: cardBg,
        minHeight: "300px",
        margin: 0,
        padding: 0,
        overflow: "visible",
      }}
    >
      {/* Image container */}
      <div className="absolute top-0 right-0 w-48 h-56 z-20 overflow-visible">
        <img
          src={authorImage}
          alt={category}
          className="w-full h-full object-cover object-top"
          style={{
            /* The MarginTop Logic: At -43px some of the authorCard images align perfectly with their parent container while others don't. Thus, we are using the -43px + a custom value with each authorCard picture to achieve the visual style same as the figma design.*/
            marginTop: imageMarginTop
              ? `calc(-43px + ${imageMarginTop})`
              : "-43px",
          }}
        />
      </div>

      {/* Pill — top left */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full z-30">
        <img src={pillIcon} alt="" className="w-3 h-3" />
        <span className="text-heading text-xs font-normal whitespace-nowrap">
          {speakerCount} Speakers
        </span>
      </div>

      {/* Text content — bottom */}
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <h3 className="text-heading text-base font-bold leading-tight mb-1">
          {category}
        </h3>
        <p className="text-grey text-xs font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AuthorCard;
