// Loader Component - Loading spinners and skeletons
import { motion } from 'framer-motion';

// Full Page Loader
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-light-background dark:bg-dark-background flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-light-border dark:border-dark-border 
                   border-t-light-primary dark:border-t-dark-primary rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="mt-4 text-light-textSecondary dark:text-dark-textSecondary">Loading...</p>
      </div>
    </div>
  );
};

// Inline Spinner
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <motion.div
      className={`${sizes[size]} border-light-border dark:border-dark-border 
                border-t-light-primary dark:border-t-dark-primary rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

// Skeleton Loader
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    button: 'h-10 w-24',
  };

  return <div className={`skeleton ${variants[variant]} ${className}`} />;
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="card space-y-4">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="text" className="w-4/6" />
      <div className="flex space-x-2 mt-4">
        <Skeleton variant="button" />
        <Skeleton variant="button" />
      </div>
    </div>
  );
};

export default PageLoader;
