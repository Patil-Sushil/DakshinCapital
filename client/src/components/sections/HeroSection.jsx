// Hero Section - Homepage hero with CTA
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  ChevronDown,
  Star,
  Award,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';

const HeroSection = () => {
  const { isDark } = useTheme();

  const trustBadges = [
    { icon: Shield, text: 'RBI Approved', color: 'from-blue-500 to-blue-600' },
    { icon: Clock, text: 'Quick Approval', color: 'from-amber-500 to-amber-600' },
    { icon: TrendingUp, text: 'Low Interest', color: 'from-emerald-500 to-emerald-600' },
    { icon: CheckCircle, text: '100% Secure', color: 'from-violet-500 to-violet-600' },
  ];

  const stats = [
    { value: '₹500Cr+', label: 'Loans Disbursed', icon: '💰' },
    { value: '10,000+', label: 'Happy Customers', icon: '😊' },
    { value: '15+', label: 'Years Experience', icon: '🏆' },
    { value: '8.5%', label: 'Interest p.a.', icon: '📈' },
  ];

  /* ── animation variants ── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ════════════════════════════════════════
          BACKGROUND — fully swaps per theme
      ════════════════════════════════════════ */}

      {/* LIGHT background */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-700
          ${isDark ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 35%, #1D4ED8 65%, #1E40AF 100%)',
        }}
      />

      {/* DARK background */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-700
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0A0F1E 30%, #0F172A 60%, #1E1B4B 100%)',
        }}
      />

      {/* ── Grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Radial glow — colour shifts with theme ── */}
      <div
        className={`
          absolute inset-0 transition-all duration-700
          ${
            isDark
              ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]'
              : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(96,165,250,0.3),transparent)]'
          }
        `}
      />

      {/* ── Floating orbs ── */}
      <motion.div
        className={`
          absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-3xl
          transition-colors duration-700
          ${isDark ? 'bg-indigo-600/20' : 'bg-blue-400/20'}
        `}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`
          absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl
          transition-colors duration-700
          ${isDark ? 'bg-blue-700/20' : 'bg-indigo-500/20'}
        `}
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-amber-500/5"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Top pill badge ── */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div
              className={`
                inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold
                backdrop-blur-md transition-all duration-500
                ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300'
                    : 'bg-white/10 border-white/25 text-white'
                }
              `}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Trusted by 10,000+ Customers Across Maharashtra
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div variants={fadeUp} className="text-center mb-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Your Trusted Partner
              <br className="hidden sm:block" /> for{' '}
              <span className="relative inline-block">
                <span
                  className={`
                    bg-clip-text text-transparent transition-all duration-700
                    ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300'
                        : 'bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400'
                    }
                  `}
                >
                  Financial Freedom
                </span>
                {/* underline glow */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                />
              </span>
            </h1>
          </motion.div>

          {/* ── Subtitle ── */}
          <motion.p
            variants={fadeUp}
            className={`
              text-center text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto
              transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-blue-100/90'}
            `}
          >
            Quick approvals, competitive rates, and hassle-free loan processing. Get the financial
            support you need —{' '}
            <span className="text-amber-300 font-semibold">exactly when you need it.</span>
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            {/* Primary CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  text-base font-bold overflow-hidden shadow-2xl
                  transition-all duration-300
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 shadow-amber-500/25 hover:shadow-amber-500/40'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 shadow-amber-400/30 hover:shadow-amber-400/50'
                  }
                `}
              >
                <span className="relative z-10">Apply for Loan</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/emi-calculator">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  group inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  text-base font-bold border-2 backdrop-blur-sm
                  transition-all duration-300
                  ${
                    isDark
                      ? 'bg-white/5 border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white shadow-lg shadow-blue-900/20'
                  }
                `}
              >
                <Calculator className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span>Calculate EMI</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* ── Trust Badges ── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16"
          >
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.text}
                  variants={fadeIn}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className={`
                    flex items-center gap-2.5 px-5 py-2.5 rounded-full
                    border backdrop-blur-md cursor-default
                    transition-all duration-300
                    ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-400/40'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                    }
                  `}
                >
                  <div
                    className={`
                      w-7 h-7 rounded-full bg-gradient-to-br ${badge.color}
                      flex items-center justify-center shadow-lg flex-shrink-0
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span
                    className={`
                      text-sm font-semibold transition-colors duration-300
                      ${isDark ? 'text-slate-300' : 'text-white'}
                    `}
                  >
                    {badge.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Stats Grid ── */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`
                  relative group rounded-2xl p-5 border text-center
                  backdrop-blur-md overflow-hidden cursor-default
                  transition-all duration-400
                  ${
                    isDark
                      ? `bg-white/5 border-white/8
                       hover:bg-indigo-500/15 hover:border-indigo-400/40
                       shadow-xl shadow-black/30`
                      : `bg-white/10 border-white/20
                       hover:bg-white/20 hover:border-white/40
                       shadow-xl shadow-blue-900/20`
                  }
                `}
              >
                {/* glow on hover */}
                <div
                  className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-400 rounded-2xl
                    ${
                      isDark
                        ? 'bg-gradient-to-br from-indigo-600/10 to-purple-600/10'
                        : 'bg-gradient-to-br from-blue-400/10 to-indigo-400/10'
                    }
                  `}
                />

                <div className="relative z-10">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className={`
                      text-3xl md:text-4xl font-extrabold mb-1 bg-clip-text text-transparent
                      transition-all duration-500
                      ${
                        isDark
                          ? 'bg-gradient-to-br from-white to-indigo-300'
                          : 'bg-gradient-to-br from-white to-blue-200'
                      }
                    `}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`
                      text-xs font-medium tracking-wide uppercase
                      transition-colors duration-300
                      ${isDark ? 'text-slate-400' : 'text-blue-200/80'}
                    `}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className={`
            text-xs font-medium tracking-widest uppercase
            transition-colors duration-300
            ${isDark ? 'text-slate-500' : 'text-white/40'}
          `}
        >
          Scroll
        </span>
        <div
          className={`
            w-8 h-12 rounded-full border-2 flex items-start justify-center pt-2
            transition-colors duration-300
            ${isDark ? 'border-slate-600' : 'border-white/30'}
          `}
        >
          <motion.div
            className={`
              w-1.5 h-2.5 rounded-full transition-colors duration-300
              ${isDark ? 'bg-indigo-400' : 'bg-white/70'}
            `}
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ChevronDown
          className={`
            w-4 h-4 -mt-1 transition-colors duration-300
            ${isDark ? 'text-slate-600' : 'text-white/30'}
          `}
        />
      </motion.div>

      {/* ── Bottom fade into page ── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-32 pointer-events-none
          transition-all duration-700
          ${
            isDark
              ? 'bg-gradient-to-t from-[#020617] to-transparent'
              : 'bg-gradient-to-t from-slate-50 to-transparent'
          }
        `}
      />
    </section>
  );
};

export default HeroSection;
