// Premium Navbar Component - Dakshin Capital
// Financial-grade navigation with smooth animations and professional design
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Building2,
  Building,
  Home,
  FileText,
  Settings,
  Sparkles,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Service items with icons
  const services = [
    {
      name: 'Construction & Builder Finance',
      path: '/services#construction',
      icon: Building2,
      description: 'Structured project funding',
    },
    {
      name: 'Corporate & SME Loans',
      path: '/services#corporate',
      icon: Building,
      description: 'Business expansion funding',
    },
    {
      name: 'Loan Against Property',
      path: '/services#lap',
      icon: Home,
      description: 'Secured property loans',
    },
    {
      name: 'Home & Property Purchase',
      path: '/services#home',
      icon: Home,
      description: 'Residential financing',
    },
    {
      name: 'Lease Rental Discounting',
      path: '/services#lrd',
      icon: FileText,
      description: 'Rental income funding',
    },
    {
      name: 'Machinery Loans',
      path: '/services#machinery',
      icon: Settings,
      description: 'Equipment financing',
    },
  ];

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // Calculate scroll progress
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_percent = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled_percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-light-primary via-light-accent to-light-secondary dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-xl shadow-lg border-b border-light-border/20 dark:border-dark-border/20'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-20' : 'h-24'
            }`}
          >
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group relative z-50">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <img
                  src="/assets/logo.png"
                  alt="Dakshin Capital Logo"
                  className={`rounded-full object-cover bg-white p-2 shadow-xl border-3 border-light-primary dark:border-dark-primary transition-all duration-500 ${
                    isScrolled ? 'h-16 w-16' : 'h-20 w-20'
                  } group-hover:border-light-accent dark:group-hover:border-dark-accent group-hover:shadow-2xl`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden h-20 w-20 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent items-center justify-center font-bold text-white text-3xl shadow-xl border-3 border-light-primary dark:border-dark-primary">
                  DC
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-light-primary/20 dark:bg-dark-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              <div className="flex flex-col">
                <motion.span
                  className={`font-heading font-bold text-light-text dark:text-dark-text leading-tight transition-all duration-500 ${
                    isScrolled ? 'text-xl' : 'text-2xl'
                  }`}
                  whileHover={{ x: 2 }}
                >
                  DAKSHIN
                </motion.span>
                <span
                  className={`font-semibold text-light-primary dark:text-dark-primary leading-tight transition-all duration-500 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  CAPITAL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                >
                  {link.hasDropdown ? (
                    <>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-light-primary dark:text-dark-primary bg-light-surface dark:bg-dark-surface'
                              : 'text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-surface dark:hover:bg-dark-surface'
                          }`
                        }
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                        />
                      </NavLink>

                      {/* Services Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-[600px] bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-xl shadow-2xl overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-2 p-4">
                              {services.map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                  <motion.a
                                    key={service.name}
                                    href={service.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-300 group"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                      <Icon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                        {service.name}
                                      </div>
                                      <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                                        {service.description}
                                      </div>
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                          isActive
                            ? 'text-light-primary dark:text-dark-primary'
                            : 'text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          <span
                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent transform origin-left transition-transform duration-300 ${
                              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <ThemeToggle />
              {/* CTA Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/contact"
                  className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-light-primary via-light-accent to-light-secondary dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary rounded-lg shadow-lg group hover:shadow-xl"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">Apply Now</span>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-light-background dark:bg-dark-background z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
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
                    <div className="flex flex-col">
                      <span className="text-lg font-heading font-bold text-light-text dark:text-dark-text">
                        Dakshin
                      </span>
                      <span className="text-sm font-semibold text-light-primary dark:text-dark-primary">
                        Capital
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                  >
                    <X className="w-6 h-6 text-light-text dark:text-dark-text" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface transition-colors font-medium"
                          >
                            {link.name}
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 mt-2 space-y-1">
                                  {services.map((service, idx) => {
                                    const Icon = service.icon;
                                    return (
                                      <motion.a
                                        key={service.name}
                                        href={service.path}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors text-sm"
                                      >
                                        <Icon className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                                        <span className="text-light-textSecondary dark:text-dark-textSecondary">
                                          {service.name}
                                        </span>
                                      </motion.a>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg font-medium transition-colors ${
                              isActive
                                ? 'text-light-primary dark:text-dark-primary bg-light-surface dark:bg-dark-surface'
                                : 'text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface'
                            }`
                          }
                        >
                          {link.name}
                        </NavLink>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-light-primary via-light-accent to-light-secondary dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-8 border-t border-light-border dark:border-dark-border"
                >
                  <a
                    href="tel:+918208790605"
                    className="flex items-center gap-3 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">+91 8208790605</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
