// components/UI/Button.tsx
interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  return (
    <button className="text-sm font-normal bg-white text-heading px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      {label}
    </button>
  );
}

export default Button;
