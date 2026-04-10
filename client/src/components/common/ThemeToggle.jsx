// Theme Toggle Component - Animated switch between light and dark mode
// Features smooth slide animation and icon transitions
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent 
                  focus:ring-offset-2 focus:ring-offset-light-background dark:focus:ring-offset-dark-background
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-900 to-blue-700'
                      : 'bg-gradient-to-r from-blue-400 to-blue-200'
                  } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Currently ${theme} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
    >
      {/* Sliding Toggle Circle */}
      <motion.div
        className={`absolute top-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center
                    ${isDark ? 'bg-slate-800' : 'bg-white'}`}
        animate={{
          x: isDark ? 36 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4 text-blue-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Icons (Optional decorative) */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun
          className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-60'} text-white`}
        />
        <Moon
          className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-60' : 'opacity-30'} text-white`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
