

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-medium transition-all duration-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "text-white bg-peach hover:bg-peach/90 focus:ring-peach",
    secondary: "text-white bg-teal hover:bg-teal/90 focus:ring-teal",
    outline: "text-charcoal bg-transparent border border-charcoal hover:bg-charcoal hover:text-white focus:ring-charcoal"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
