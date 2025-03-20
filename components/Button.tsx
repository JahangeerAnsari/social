import { IconType } from "react-icons";

interface ButtonProps {
  secondary?: boolean;
  fullWidth?: boolean;
  label: string;
  large?: boolean;
  outline?: boolean;
  disabled?: boolean;
  onClick: () => void;
}
const Button = ({
  secondary,
  fullWidth,
  label,
  large,
  disabled,
  outline,
  onClick,
}: ButtonProps) => {
  return (
    <button
     disabled={disabled}
     onClick={onClick}
      className={`disabled:opacity-70
     disabled:cursor-not-allowed
     rounded-full
     font-semibold
     hover:opacity-80
     transition
     border-2
     ${fullWidth ? "w-full" : "w-fit"}
     ${secondary ? "bg-white" : "bg-sky-500"}
     ${secondary ? "text-black" : "text-white"}
     ${secondary ? "border-black" : "border-sky-500"}
     ${large ? "text-xl" : "text-md"}
     ${large ? "px-5" : "px-4"}
     ${large ? "py-3" : "py2"}
     ${outline ? "bg-transparent" : ""}
     ${outline ? "border-white" : ""}
     ${outline ? "text-white" : ""}
    
    `}
    >
      {label}
    </button>
  );
};

export default Button;
