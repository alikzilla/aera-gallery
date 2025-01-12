interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`w-[200px] h-[50px] border border-black rounded-3xl transition-all duration-300 hover:bg-yellow-600 hover:text-white hover:border-yellow-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
