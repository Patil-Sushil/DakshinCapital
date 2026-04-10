// Admin Sidebar - Professional navigation with collapse feature
import { NavLink, Link } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Mail,
  FolderOpen,
  Image,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import ThemeToggle from '../../common/ThemeToggle';
import { confirmLogout } from '../../../utils/confirm';
import { toastActions } from '../../../utils/toast.jsx';

const AdminSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) return;

    try {
      await logout();
      toastActions.logoutSuccess();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'Projects', path: '/admin/projects', icon: FolderOpen },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <img
                  src="/assets/logo.png"
                  alt="Dakshin Capital"
                  className="h-12 w-12 rounded-full object-cover bg-white p-1 shadow-lg border-2 border-light-primary dark:border-dark-primary"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden h-12 w-12 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent items-center justify-center font-bold text-white text-xl shadow-lg">
                  DC
                </div>
                <div>
                  <div className="text-lg font-heading font-bold text-light-text dark:text-dark-text">
                    Dakshin Capital
                  </div>
                  <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                    Admin Panel
                  </div>
                </div>
              </div>
            )}
            {isCollapsed && (
              <img
                src="/assets/logo.png"
                alt="DC"
                className="h-10 w-10 rounded-full object-cover bg-white p-1 shadow-lg border-2 border-light-primary dark:border-dark-primary mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-light-text dark:text-dark-text" />
            </button>
          </div>

          {/* Collapse Toggle - Desktop Only */}
          <div className="hidden lg:flex justify-end p-2 border-b border-light-border dark:border-dark-border">
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-light-text dark:text-dark-text" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-light-text dark:text-dark-text" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white shadow-lg'
                        : 'text-light-text dark:text-dark-text hover:bg-light-background dark:hover:bg-dark-background hover:shadow-md'
                    }`
                  }
                  title={isCollapsed ? item.name : ''}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'} ${isCollapsed ? '' : 'flex-shrink-0'}`}
                      />
                      {!isCollapsed && <span className="font-medium">{item.name}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* Homepage Link */}
            <Link
              to="/"
              target="_blank"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 group text-light-text dark:text-dark-text hover:bg-light-background dark:hover:bg-dark-background hover:shadow-md border-t border-light-border dark:border-dark-border mt-4 pt-4`}
              title={isCollapsed ? 'Visit Homepage' : ''}
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span className="font-medium">Visit Homepage</span>}
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
            {/* Theme Toggle */}
            {!isCollapsed ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm font-medium text-light-text dark:text-dark-text">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            ) : (
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg w-full text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group`}
              title={isCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
