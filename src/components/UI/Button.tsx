interface ButtonProps {
  label: string;
  icon?: string;
  variant?: "light" | "dark";
  onClick?: () => void;
}

function Button({ label, icon, variant = "light", onClick }: ButtonProps) {
  const styles =
    variant === "dark"
      ? "bg-heading text-white"
      : "bg-white text-heading shadow-md hover:shadow-lg";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 text-sm font-normal px-8 py-3 rounded-2xl transition-shadow cursor-pointer ${styles}`}
    >
      {label}
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
    </button>
  );
}

export default Button;
