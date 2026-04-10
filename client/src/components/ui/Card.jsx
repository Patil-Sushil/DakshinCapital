// Card Component - Themed reusable card container with hover effects
// Light: white bg with blue shadow | Dark: slate-800 bg with blue glow
import { motion } from 'framer-motion';

const Card = ({
  children,
  shadow = true,
  hover = false,
  padding = true,
  glass = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = glass
    ? 'bg-white/5 backdrop-blur-md border border-white/10'
    : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border';

  const shadowStyles = shadow ? 'shadow-light-md dark:shadow-dark-md' : '';

  const hoverStyles = hover
    ? 'hover:shadow-light-lg dark:hover:shadow-dark-lg hover:-translate-y-1 cursor-pointer'
    : '';

  const paddingStyles = padding === true ? 'p-6' : padding === false ? '' : padding;

  return (
    <motion.div
      className={`rounded-xl transition-all duration-300 ${baseStyles} ${shadowStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
