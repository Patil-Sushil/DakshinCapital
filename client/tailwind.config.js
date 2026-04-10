/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        light: {
          background: '#FFFFFF',
          backgroundSecondary: '#F0F4FF',
          card: '#FFFFFF',
          surface: '#EEF2FF',
          border: '#DBEAFE',

          text: '#0F172A',
          textSecondary: '#1E3A8A',
          textMuted: '#64748B',
          textInverted: '#FFFFFF',

          primary: '#1E3A8A',
          secondary: '#2563EB',
          accent: '#F59E0B',
          hover: '#1D4ED8',

          success: '#10B981',
          error: '#EF4444',
          warning: '#F59E0B',
        },
        // Dark Theme Colors
        dark: {
          background: '#0A0F1E',
          backgroundSecondary: '#0F172A',
          card: '#1E293B',
          surface: '#1E3A5F',
          border: 'rgba(30, 64, 175, 0.25)',

          text: '#F8FAFC',
          textSecondary: '#93C5FD',
          textMuted: '#94A3B8',
          textInverted: '#0F172A',

          primary: '#3B82F6',
          secondary: '#60A5FA',
          accent: '#F59E0B',
          hover: '#2563EB',

          success: '#34D399',
          error: '#F87171',
          warning: '#FBBF24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'light-sm': '0 1px 2px 0 rgba(30, 58, 138, 0.05)',
        'light-md': '0 4px 6px -1px rgba(30, 58, 138, 0.1)',
        'light-lg': '0 10px 15px -3px rgba(30, 58, 138, 0.1)',
        'light-xl': '0 20px 25px -5px rgba(30, 58, 138, 0.1)',
        'dark-sm': '0 1px 2px 0 rgba(59, 130, 246, 0.1)',
        'dark-md': '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.5)',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        'gradient-navy-dark': 'linear-gradient(135deg, #0A0F1E 0%, #1E3A8A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'gradient-blue-light': 'linear-gradient(135deg, #DBEAFE 0%, #EEF2FF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
        'slide-in-down': 'slideInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
