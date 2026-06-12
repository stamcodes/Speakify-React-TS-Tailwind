// src/components/UI/Toggle.tsx

interface ToggleProps<T extends string> {
  leftLabel: string;
  leftValue: T;
  rightLabel: string;
  rightValue: T;
  value: T;
  onChange: (value: T) => void;
  className?: string; // Optional extra margin/layout styling
}

function Toggle<T extends string>({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  value,
  onChange,
  className = "",
}: ToggleProps<T>) {
  return (
    <div className={`flex bg-[#f4ece4] rounded-full p-1 ${className}`}>
      <button
        type="button" // Prevents accidental form submissions
        onClick={() => onChange(leftValue)}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition-all duration-200 cursor-pointer ${
          value === leftValue
            ? "bg-white text-heading shadow-sm"
            : "text-grey hover:text-heading"
        }`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(rightValue)}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition-all duration-200 cursor-pointer ${
          value === rightValue
            ? "bg-white text-heading shadow-sm"
            : "text-grey hover:text-heading"
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}

export default Toggle;
