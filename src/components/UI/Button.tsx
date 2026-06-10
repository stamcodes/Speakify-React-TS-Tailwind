// components/UI/Button.tsx
// components/UI/Button.tsx
interface ButtonProps {
  label: string;
  icon?: string;
}

function Button({ label, icon }: ButtonProps) {
  return (
    <button className="flex items-center justify-center gap-2 text-sm font-normal bg-white text-heading px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      {label}
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
    </button>
  );
}

export default Button;
