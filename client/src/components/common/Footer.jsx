// Footer Component - Site footer with links and contact info
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const loanTypes = [
    { name: 'Construction & Builder Finance', path: '/services#construction' },
    { name: 'Corporate & SME Loans', path: '/services#corporate' },
    { name: 'Loan Against Property (LAP)', path: '/services#lap' },
    { name: 'Home & Property Purchase', path: '/services#home' },
    { name: 'Lease Rental Discounting', path: '/services#lrd' },
    { name: 'Machinery Loans', path: '/services#machinery' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'hover:text-blue-700' },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com',
      color: 'hover:text-pink-600',
    },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group">
              <div className="flex items-center space-x-3">
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
                  <span className="text-lg font-semibold text-light-primary dark:text-dark-primary leading-tight">
                    Capital
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              Your trusted partner for all financial needs. We provide quick, hassle-free loans with
              competitive interest rates and transparent processes.
            </p>
            <div className="flex items-center space-x-2">
              <div
                className="px-3 py-1 bg-light-background dark:bg-dark-background rounded-full 
                            border border-light-border dark:border-dark-border"
              >
                <span className="text-xs font-medium text-light-text dark:text-dark-text">
                  RBI Approved
                </span>
              </div>
              <div
                className="px-3 py-1 bg-light-background dark:bg-dark-background rounded-full 
                            border border-light-border dark:border-dark-border"
              >
                <span className="text-xs font-medium text-light-text dark:text-dark-text">
                  100% Secure
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text dark:text-dark-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                             hover:text-light-primary dark:hover:text-dark-primary transition-colors 
                             duration-200 inline-flex items-center group"
                  >
                    <span
                      className="w-0 group-hover:w-2 h-0.5 bg-light-primary dark:bg-dark-primary 
                                   transition-all duration-200 mr-0 group-hover:mr-2"
                    ></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text dark:text-dark-text mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {loanTypes.map((loan) => (
                <li key={loan.name}>
                  <a
                    href={loan.path}
                    className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                             hover:text-light-primary dark:hover:text-dark-primary transition-colors 
                             duration-200 inline-flex items-center group"
                  >
                    <span
                      className="w-0 group-hover:w-2 h-0.5 bg-light-primary dark:bg-dark-primary 
                                   transition-all duration-200 mr-0 group-hover:mr-2"
                    ></span>
                    {loan.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-light-text dark:text-dark-text mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  Shop No. 7, Second Floor, Govind Plaza, Opposite to Court, Vijaynagar, Sangli,
                  Maharashtra
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0" />
                <a
                  href="tel:+918208790605"
                  className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                           hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  +91 8208790605
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0" />
                <a
                  href="mailto:shreyasmalangave056@gmail.com"
                  className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                           hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  shreyasmalangave056@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918208790605"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-500 
                       hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                Connect with us:
              </span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full bg-light-background dark:bg-dark-background 
                               border border-light-border dark:border-dark-border flex items-center 
                               justify-center text-light-textSecondary dark:text-dark-textSecondary 
                               ${social.color} transition-all duration-200 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg 
                       bg-light-background dark:bg-dark-background border border-light-border 
                       dark:border-dark-border text-light-text dark:text-dark-text 
                       hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white 
                       hover:border-light-primary dark:hover:border-dark-primary 
                       transition-all duration-200 group"
              aria-label="Back to top"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-light-background dark:bg-dark-background border-t border-light-border dark:border-dark-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary text-center md:text-left">
              © {currentYear} Dakshin Capital. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                         hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                         hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/admin/login"
                className="text-sm text-light-textSecondary dark:text-dark-textSecondary 
                         hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
