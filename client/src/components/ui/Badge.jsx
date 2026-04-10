// Badge Component - Status badges and labels
const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';

  const variants = {
    default:
      'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border',
    primary:
      'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/20',
    success:
      'bg-light-success/10 dark:bg-dark-success/10 text-light-success dark:text-dark-success border border-light-success/20 dark:border-dark-success/20',
    warning:
      'bg-light-warning/10 dark:bg-dark-warning/10 text-light-warning dark:text-dark-warning border border-light-warning/20 dark:border-dark-warning/20',
    error:
      'bg-light-error/10 dark:bg-dark-error/10 text-light-error dark:text-dark-error border border-light-error/20 dark:border-dark-error/20',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
