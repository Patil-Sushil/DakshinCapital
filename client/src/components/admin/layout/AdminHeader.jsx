// Admin Header - Professional header with breadcrumbs and user info
import { Menu, Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';

const AdminHeader = ({ onMenuClick }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Get page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('enquiries')) return 'Enquiries';
    if (path.includes('projects')) return 'Projects';
    if (path.includes('gallery')) return 'Gallery';
    if (path.includes('settings')) return 'Settings';
    return 'Admin Panel';
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl border-b border-light-border dark:border-dark-border shadow-sm"
    >
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16 md:h-20">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-light-text dark:text-dark-text">
              {getPageTitle()}
            </h1>
            <p className="text-xs md:text-sm text-light-textSecondary dark:text-dark-textSecondary hidden sm:block">
              Welcome back, manage your business
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6 text-light-text dark:text-dark-text" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-light-text dark:text-dark-text">Admin</div>
              <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                {user?.email || 'admin@dakshin.com'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
