// StatsSection.jsx
import { TrendingUp, Users, Award, Building, Target, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

/* ── Counter Animation ── */
const CountUpAnimation = ({ value, suffix, prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold tracking-tight">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

/* ── Main Component ── */
const StatsSection = () => {
  const { isDark } = useTheme();

  const stats = [
    {
      icon: TrendingUp,
      value: 500,
      prefix: '₹',
      suffix: 'Cr+',
      label: 'Loans Disbursed',
      sublabel: 'Total portfolio value',
      iconColor: 'text-blue-400',
      glowColor: isDark ? 'rgba(59,130,246,0.25)' : 'rgba(37,99,235,0.2)',
      ringColor: isDark ? 'border-blue-500/30' : 'border-blue-400/40',
      bgIcon: isDark ? 'bg-blue-500/15' : 'bg-blue-500/20',
      accentBar: 'from-blue-400 to-blue-600',
    },
    {
      icon: Users,
      value: 10000,
      prefix: '',
      suffix: '+',
      label: 'Happy Customers',
      sublabel: 'Across Maharashtra',
      iconColor: 'text-emerald-400',
      glowColor: isDark ? 'rgba(16,185,129,0.25)' : 'rgba(5,150,105,0.2)',
      ringColor: isDark ? 'border-emerald-500/30' : 'border-emerald-400/40',
      bgIcon: isDark ? 'bg-emerald-500/15' : 'bg-emerald-500/20',
      accentBar: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: Award,
      value: 15,
      prefix: '',
      suffix: '+',
      label: 'Years Experience',
      sublabel: 'Trusted since 2009',
      iconColor: 'text-amber-400',
      glowColor: isDark ? 'rgba(245,158,11,0.25)' : 'rgba(217,119,6,0.2)',
      ringColor: isDark ? 'border-amber-500/30' : 'border-amber-400/40',
      bgIcon: isDark ? 'bg-amber-500/15' : 'bg-amber-500/20',
      accentBar: 'from-amber-400 to-amber-600',
    },
    {
      icon: Building,
      value: 50,
      prefix: '',
      suffix: '+',
      label: 'Branch Locations',
      sublabel: 'Pan Maharashtra',
      iconColor: 'text-violet-400',
      glowColor: isDark ? 'rgba(139,92,246,0.25)' : 'rgba(109,40,217,0.2)',
      ringColor: isDark ? 'border-violet-500/30' : 'border-violet-400/40',
      bgIcon: isDark ? 'bg-violet-500/15' : 'bg-violet-500/20',
      accentBar: 'from-violet-400 to-violet-600',
    },
  ];

  /* ── animation variants ── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 38 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section className="relative py-28 overflow-hidden">
      {/* ── Dual backgrounds ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #1D4ED8 75%, #1E40AF 100%)',
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0A0F1E 35%, #0F172A 65%, #1E1B4B 100%)',
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Radial glow ── */}
      <div
        className={`
          absolute inset-0 transition-all duration-700
          ${
            isDark
              ? 'bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(99,102,241,0.18),transparent)]'
              : 'bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(96,165,250,0.22),transparent)]'
          }
        `}
      />

      {/* ── Floating orbs ── */}
      <motion.div
        className={`absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl transition-colors duration-700
          ${isDark ? 'bg-indigo-600/15' : 'bg-blue-400/15'}`}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl transition-colors duration-700
          ${isDark ? 'bg-purple-700/12' : 'bg-indigo-500/12'}`}
        animate={{ scale: [1, 1.18, 1], x: [0, -25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* pill */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <div
              className={`
                inline-flex items-center gap-2 px-5 py-2 rounded-full
                border text-sm font-semibold backdrop-blur-md transition-all duration-500
                ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300'
                    : 'bg-white/10 border-white/25 text-white'
                }
              `}
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Our Track Record
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
          >
            Numbers That{' '}
            <span className="relative inline-block">
              <span
                className={`bg-clip-text text-transparent transition-all duration-700
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300'
                      : 'bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400'
                  }`}
              >
                Speak for Us
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
              />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className={`text-lg leading-relaxed transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-blue-100/85'}`}
          >
            Our commitment to excellence and customer satisfaction reflected in milestones we're
            proud to have achieved.
          </motion.p>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ scale: 1.04, y: -6 }}
                className={`
                  relative group rounded-2xl p-7 border overflow-hidden
                  backdrop-blur-md cursor-default transition-all duration-400
                  ${
                    isDark
                      ? 'bg-white/5 border-white/8 shadow-2xl shadow-black/40'
                      : 'bg-white/10 border-white/20 shadow-2xl shadow-blue-900/25'
                  }
                `}
                style={{
                  boxShadow: `0 8px 32px ${stat.glowColor}`,
                }}
              >
                {/* ── Hover glow overlay ── */}
                <div
                  className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    rounded-2xl transition-opacity duration-400
                    ${
                      isDark
                        ? 'bg-gradient-to-br from-white/4 to-white/2'
                        : 'bg-gradient-to-br from-white/10 to-white/5'
                    }
                  `}
                />

                {/* ── Top accent bar ── */}
                <div
                  className={`
                    absolute top-0 left-0 right-0 h-1
                    bg-gradient-to-r ${stat.accentBar}
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-400 rounded-t-2xl
                  `}
                />

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div
                    className={`
                      w-16 h-16 ${stat.bgIcon} rounded-2xl
                      flex items-center justify-center mx-auto mb-5
                      border ${stat.ringColor}
                      group-hover:scale-110 transition-transform duration-400
                    `}
                  >
                    <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>

                  {/* Counter */}
                  <div
                    className={`
                      bg-clip-text text-transparent transition-all duration-500
                      ${
                        isDark
                          ? 'bg-gradient-to-br from-white to-slate-300'
                          : 'bg-gradient-to-br from-white to-blue-100'
                      }
                    `}
                  >
                    <CountUpAnimation
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>

                  {/* Label */}
                  <p
                    className={`
                      text-base font-semibold mt-2 mb-1 transition-colors duration-300
                      ${isDark ? 'text-slate-200' : 'text-white'}
                    `}
                  >
                    {stat.label}
                  </p>

                  {/* Sublabel */}
                  <p
                    className={`
                      text-xs transition-colors duration-300
                      ${isDark ? 'text-slate-500' : 'text-white/55'}
                    `}
                  >
                    {stat.sublabel}
                  </p>

                  {/* Pulse dot */}
                  <div className="flex justify-center mt-4">
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full ${stat.iconColor} opacity-70`}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.2, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-24 pointer-events-none transition-all duration-700
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

export default StatsSection;
