// Admin Header - Top header for admin panel
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import ThemeToggle from '../../common/ThemeToggle';

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-light-background dark:bg-dark-background border-b border-light-border dark:border-dark-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
          >
            <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />
          </button>
          <h1 className="text-xl font-heading font-semibold text-light-text dark:text-dark-text">
            Admin Dashboard
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors">
            <Bell className="w-6 h-6 text-light-text dark:text-dark-text" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-light-surface dark:bg-dark-surface">
            <div className="w-8 h-8 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-light-text dark:text-dark-text">
                {user?.displayName || 'Admin'}
              </div>
              <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
