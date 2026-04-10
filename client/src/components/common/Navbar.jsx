// Navbar Component - Main navigation with theme toggle
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
      subLinks: [
        { name: 'Construction & Builder Finance', path: '/services#construction' },
        { name: 'Corporate & SME Loans', path: '/services#corporate' },
        { name: 'Loan Against Property (LAP)', path: '/services#lap' },
        { name: 'Home & Property Purchase Loans', path: '/services#home' },
        { name: 'Lease Rental Discounting (LRD)', path: '/services#lrd' },
        { name: 'Machinery Loans', path: '/services#machinery' },
      ],
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/assets/logo.png"
              alt="Dakshin Capital Logo"
              className="h-20 w-20 rounded-full object-cover bg-white p-2 shadow-xl 
                         border-3 border-light-primary dark:border-dark-primary
                         transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl
                         group-hover:border-light-accent dark:group-hover:border-dark-accent"
              onError={(e) => {
                // Fallback to text logo if image not found
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div
              className="hidden h-20 w-20 rounded-full bg-gradient-to-br from-light-primary to-light-accent 
                            dark:from-dark-primary dark:to-dark-accent items-center justify-center 
                            font-bold text-white text-3xl shadow-xl border-3 border-light-primary 
                            dark:border-dark-primary group-hover:scale-110 transition-all duration-300"
            >
              DC
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-light-text dark:text-dark-text leading-tight">
                Dakshin
              </span>
              <span className="text-base font-semibold text-light-primary dark:text-dark-primary leading-tight">
                Capital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1
                        ${
                          isActive
                            ? 'text-light-primary dark:text-dark-primary bg-light-surface dark:bg-dark-surface'
                            : 'text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-surface dark:hover:bg-dark-surface'
                        }`
                      }
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </NavLink>
                    {/* Dropdown Menu */}
                    <div
                      className="absolute top-full left-0 mt-2 w-48 bg-light-background dark:bg-dark-background 
                                  border border-light-border dark:border-dark-border rounded-lg shadow-xl 
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                  transition-all duration-300 py-2"
                    >
                      {link.subLinks.map((subLink) => (
                        <a
                          key={subLink.name}
                          href={subLink.path}
                          className="block px-4 py-2 text-sm text-light-text dark:text-dark-text 
                                   hover:bg-light-surface dark:hover:bg-dark-surface 
                                   hover:text-light-primary dark:hover:text-dark-primary 
                                   transition-colors duration-200"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${
                        isActive
                          ? 'text-light-primary dark:text-dark-primary bg-light-surface dark:bg-dark-surface'
                          : 'text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-surface dark:hover:bg-dark-surface'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/contact" className="btn-primary">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-light-text dark:text-dark-text 
                       hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-light-background dark:bg-dark-background border-t 
                     border-light-border dark:border-dark-border"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg 
                                 text-light-text dark:text-dark-text hover:bg-light-surface 
                                 dark:hover:bg-dark-surface transition-colors"
                      >
                        <span className="font-medium">{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            servicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 mt-1"
                          >
                            {link.subLinks.map((subLink) => (
                              <a
                                key={subLink.name}
                                href={subLink.path}
                                className="block px-4 py-2 rounded-lg text-sm text-light-textSecondary 
                                         dark:text-dark-textSecondary hover:bg-light-surface 
                                         dark:hover:bg-dark-surface transition-colors"
                              >
                                {subLink.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
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
                </div>
              ))}
              <Link to="/contact" className="block w-full text-center btn-primary mt-4">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
