const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
}) => {
  const baseClasses = "flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600",
  };
  
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-2.5 px-5 text-lg",
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;