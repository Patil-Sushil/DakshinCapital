// Button Component - Fully themed button with multiple variants
// Variants: primary (navy), secondary (blue), gold (amber CTA), outline, ghost
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-light-primary dark:bg-dark-primary text-white hover:bg-light-hover dark:hover:bg-dark-hover focus:ring-light-accent dark:focus:ring-dark-accent shadow-light-md dark:shadow-dark-md hover:shadow-light-lg dark:hover:shadow-dark-lg active:scale-95',

    secondary:
      'bg-light-secondary dark:bg-dark-secondary text-white hover:opacity-90 focus:ring-light-secondary dark:focus:ring-dark-secondary shadow-light-md dark:shadow-dark-md hover:shadow-light-lg dark:hover:shadow-dark-lg active:scale-95',

    gold: 'bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-textInverted hover:opacity-90 focus:ring-light-accent dark:focus:ring-dark-accent shadow-light-md dark:shadow-dark-md hover:shadow-glow-gold active:scale-95 font-bold',

    outline:
      'border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white focus:ring-light-primary dark:focus:ring-dark-primary active:scale-95',

    ghost:
      'text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-surface focus:ring-light-primary dark:focus:ring-dark-primary',

    danger:
      'bg-light-error dark:bg-dark-error text-white hover:opacity-90 focus:ring-light-error dark:focus:ring-dark-error shadow-light-md dark:shadow-dark-md hover:shadow-light-lg dark:hover:shadow-dark-lg active:scale-95',

    success:
      'bg-light-success dark:bg-dark-success text-white hover:opacity-90 focus:ring-light-success dark:focus:ring-dark-success shadow-light-md dark:shadow-dark-md hover:shadow-light-lg dark:hover:shadow-dark-lg active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon className="w-5 h-5 ml-2" />}
    </motion.button>
  );
};

export default Button;
