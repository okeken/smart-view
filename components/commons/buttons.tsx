interface ButtonProps {
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`p-1 px-3 border rounded-md disabled:opacity-75 disabled:cursor-not-allowed ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
