// Constants - Application-wide constants

// Loan Types - Based on Dakshin Capital Services
export const LOAN_TYPES = [
  {
    id: 'construction',
    name: 'Construction & Builder Finance',
    icon: 'Building2',
    description:
      'Structured project funding for residential, commercial, or redevelopment projects',
  },
  {
    id: 'corporate',
    name: 'Corporate & SME Loans',
    icon: 'Building',
    description: 'Working capital, expansion funding, or term loans for businesses',
  },
  {
    id: 'lap',
    name: 'Loan Against Property (LAP)',
    icon: 'Home',
    description: 'Secured loans against residential or commercial property',
  },
  {
    id: 'home',
    name: 'Home & Property Purchase Loans',
    icon: 'Home',
    description: 'Finance for new purchase, resale, or joint development',
  },
  {
    id: 'lrd',
    name: 'Lease Rental Discounting (LRD)',
    icon: 'FileText',
    description: 'Funding against rental income for cash flow enhancement',
  },
  {
    id: 'machinery',
    name: 'Machinery Loans',
    icon: 'Settings',
    description: 'Funding for machinery assets and working capital optimization',
  },
];

// Enquiry Status
export const ENQUIRY_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  RESOLVED: 'resolved',
};

// Project Status
export const PROJECT_STATUS = {
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  UPCOMING: 'upcoming',
};

// Gallery Categories
export const GALLERY_CATEGORIES = ['All', 'Office', 'Events', 'Projects', 'Team', 'Achievements'];

// Company Info - Dakshin Capital
export const COMPANY_INFO = {
  name: 'Dakshin Capital',
  tagline: 'Your Trusted Financial Partner',
  phone: '+91 8208790605',
  email: 'shreyasmalangave056@gmail.com',
  address:
    'Shop No. 7, Second Floor, Govind Plaza, Opposite to Court, Vijaynagar, Sangli, Maharashtra',
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Sat: 9:00 AM - 2:00 PM',
    sunday: 'Closed',
  },
};

// Key Features - What Sets Us Apart
export const KEY_FEATURES = [
  {
    id: 'nationalized',
    title: 'Direct Association with Nationalized Banks',
    description:
      'Ensures stability, authenticity, and access to low-interest institutional capital',
    icon: 'Building2',
  },
  {
    id: 'zero-broker',
    title: 'Zero Broker Dependency',
    description: 'Every case handled through trained internal teams ensuring control and accuracy',
    icon: 'Shield',
  },
  {
    id: 'digital',
    title: 'End-to-End Digital Workflow',
    description:
      'From lead entry to disbursement tracking, ensuring data integrity and real-time visibility',
    icon: 'Laptop',
  },
  {
    id: 'multi-lender',
    title: 'Multi-Lender Access',
    description: 'Clients can explore multiple bank options through one point of contact',
    icon: 'Network',
  },
  {
    id: 'compliance',
    title: 'Compliance-Based Operations',
    description: 'Every transaction follows banking, taxation, and anti-money laundering norms',
    icon: 'FileCheck',
  },
  {
    id: 'speed',
    title: 'Speed + Accuracy',
    description:
      'Local execution combined with institutional partnerships ensures timely disbursement',
    icon: 'Zap',
  },
  {
    id: 'relationship',
    title: 'Relationship-Focused Approach',
    description:
      'Building trust-based long-term relations with builders, industrialists, and investors',
    icon: 'Users',
  },
  {
    id: 'customized',
    title: 'Customized Structuring',
    description:
      'Loan solutions designed around actual cash flow and project needs, not rigid templates',
    icon: 'Settings',
  },
];

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://www.instagram.com/dakshin_capital',
  youtube: 'https://youtube.com',
  whatsapp: 'https://wa.me/918208790605',
};

// Validation Rules
export const VALIDATION = {
  phone: {
    pattern: /^[6-9]\d{9}$/,
    message: 'Please enter a valid 10-digit phone number',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters',
  },
  message: {
    minLength: 10,
    maxLength: 500,
    message: 'Message must be between 10 and 500 characters',
  },
};

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM DD, YYYY',
  full: 'MMMM DD, YYYY hh:mm A',
  short: 'MM/DD/YYYY',
};

// Pagination
export const PAGINATION = {
  itemsPerPage: 10,
  itemsPerPageOptions: [10, 25, 50, 100],
};

export default {
  LOAN_TYPES,
  ENQUIRY_STATUS,
  PROJECT_STATUS,
  GALLERY_CATEGORIES,
  COMPANY_INFO,
  KEY_FEATURES,
  SOCIAL_LINKS,
  VALIDATION,
  DATE_FORMATS,
  PAGINATION,
};

// Theme Colors - Semantic color tokens for consistent theming
export const THEME_COLORS = {
  light: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F0F4FF',
      card: '#FFFFFF',
      surface: '#EEF2FF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#1E3A8A',
      muted: '#64748B',
      inverted: '#FFFFFF',
    },
    accent: {
      primary: '#1E3A8A',
      secondary: '#2563EB',
      gold: '#F59E0B',
      hover: '#1D4ED8',
    },
    border: '#DBEAFE',
    status: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
    },
  },
  dark: {
    background: {
      primary: '#0A0F1E',
      secondary: '#0F172A',
      card: '#1E293B',
      surface: '#1E3A5F',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#93C5FD',
      muted: '#94A3B8',
      inverted: '#0F172A',
    },
    accent: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      gold: '#F59E0B',
      hover: '#2563EB',
    },
    border: 'rgba(30, 64, 175, 0.25)',
    status: {
      success: '#34D399',
      error: '#F87171',
      warning: '#FBBF24',
    },
  },
};

// Theme Classes - Reusable Tailwind class combinations
export const THEME_CLASSES = {
  // Backgrounds
  bg: {
    primary: 'bg-light-background dark:bg-dark-background',
    secondary: 'bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary',
    card: 'bg-light-card dark:bg-dark-card',
    surface: 'bg-light-surface dark:bg-dark-surface',
  },

  // Text
  text: {
    primary: 'text-light-text dark:text-dark-text',
    secondary: 'text-light-textSecondary dark:text-dark-textSecondary',
    muted: 'text-light-textMuted dark:text-dark-textMuted',
    inverted: 'text-light-textInverted dark:text-dark-textInverted',
  },

  // Borders
  border: {
    default: 'border-light-border dark:border-dark-border',
    primary: 'border-light-primary dark:border-dark-primary',
  },

  // Buttons
  button: {
    primary:
      'bg-light-primary dark:bg-dark-primary hover:bg-light-hover dark:hover:bg-dark-hover text-white',
    secondary: 'bg-light-secondary dark:bg-dark-secondary hover:opacity-90 text-white',
    gold: 'bg-light-accent dark:bg-dark-accent hover:opacity-90 text-light-text dark:text-dark-textInverted',
    outline:
      'border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white',
    ghost:
      'text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-surface',
  },

  // Cards
  card: {
    default:
      'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-light-md dark:shadow-dark-md',
    hover: 'hover:shadow-light-lg dark:hover:shadow-dark-lg hover:-translate-y-1',
    glass: 'bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10',
  },

  // Inputs
  input: {
    default:
      'bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text dark:text-dark-text',
    focus:
      'focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent',
  },

  // Gradients
  gradient: {
    navy: 'bg-gradient-navy dark:bg-gradient-navy-dark',
    gold: 'bg-gradient-gold',
    text: 'bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent',
  },
};
