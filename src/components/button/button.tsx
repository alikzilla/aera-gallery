interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`px-4 h-[50px] border border-black rounded-3xl transition-all duration-300 active:translate-y-px ${className} ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
          : "hover:bg-yellow-600 hover:text-white hover:border-yellow-600"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
