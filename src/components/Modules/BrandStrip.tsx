// components/Modules/BrandStrip.tsx
import Data from "../../data/Data.json";

function BrandStrip() {
  return (
    <div className="flex items-center justify-center gap-12 py-6">
      {Data.brands.map((brand) => (
        <img
          key={brand.id}
          src={brand.logo}
          alt={brand.name}
          className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
        />
      ))}
    </div>
  );
}

export default BrandStrip;
