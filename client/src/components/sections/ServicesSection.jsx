// ServicesSection.jsx
import { Link } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  Car,
  GraduationCap,
  Gem,
  ArrowRight,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ServicesSection = () => {
  const { isDark } = useTheme();

  const services = [
    {
      icon: Home,
      title: 'Home Loan',
      description:
        'Make your dream home a reality with our affordable home loan solutions and flexible repayment options.',
      rate: '8.5% – 9.5%',
      tag: 'Most Popular',
      iconColor: 'text-blue-400',
      tagColor: isDark
        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
        : 'bg-blue-50 text-blue-700 border-blue-200',
      bgIcon: isDark ? 'bg-blue-500/15 border-blue-500/25' : 'bg-blue-50 border-blue-200',
      rateColor: isDark ? 'text-blue-400' : 'text-blue-700',
      glowHover: isDark ? 'group-hover:shadow-blue-500/15' : 'group-hover:shadow-blue-200/60',
      barColor: 'from-blue-400 to-blue-600',
    },
    {
      icon: User,
      title: 'Personal Loan',
      description:
        'Quick personal loans for all your immediate financial needs with minimal documentation.',
      rate: '10.5% – 15%',
      tag: 'Fast Disbursal',
      iconColor: 'text-emerald-400',
      tagColor: isDark
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      bgIcon: isDark
        ? 'bg-emerald-500/15 border-emerald-500/25'
        : 'bg-emerald-50 border-emerald-200',
      rateColor: isDark ? 'text-emerald-400' : 'text-emerald-700',
      glowHover: isDark ? 'group-hover:shadow-emerald-500/15' : 'group-hover:shadow-emerald-200/60',
      barColor: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: Briefcase,
      title: 'Business Loan',
      description:
        'Fuel your business growth with flexible business financing options tailored to your needs.',
      rate: '9% – 12%',
      tag: 'High Limit',
      iconColor: 'text-violet-400',
      tagColor: isDark
        ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
        : 'bg-violet-50 text-violet-700 border-violet-200',
      bgIcon: isDark ? 'bg-violet-500/15 border-violet-500/25' : 'bg-violet-50 border-violet-200',
      rateColor: isDark ? 'text-violet-400' : 'text-violet-700',
      glowHover: isDark ? 'group-hover:shadow-violet-500/15' : 'group-hover:shadow-violet-200/60',
      barColor: 'from-violet-400 to-violet-600',
    },
    {
      icon: Car,
      title: 'Car Loan',
      description:
        'Drive your dream car home with our easy car loan schemes and competitive rates.',
      rate: '8.75% – 10%',
      tag: 'Quick Process',
      iconColor: 'text-rose-400',
      tagColor: isDark
        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
        : 'bg-rose-50 text-rose-700 border-rose-200',
      bgIcon: isDark ? 'bg-rose-500/15 border-rose-500/25' : 'bg-rose-50 border-rose-200',
      rateColor: isDark ? 'text-rose-400' : 'text-rose-700',
      glowHover: isDark ? 'group-hover:shadow-rose-500/15' : 'group-hover:shadow-rose-200/60',
      barColor: 'from-rose-400 to-rose-600',
    },
    {
      icon: GraduationCap,
      title: 'Education Loan',
      description:
        'Invest in your future with our comprehensive education loan plans for top institutions.',
      rate: '9.5% – 11.5%',
      tag: 'Low Rate',
      iconColor: 'text-amber-400',
      tagColor: isDark
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-700 border-amber-200',
      bgIcon: isDark ? 'bg-amber-500/15 border-amber-500/25' : 'bg-amber-50 border-amber-200',
      rateColor: isDark ? 'text-amber-400' : 'text-amber-700',
      glowHover: isDark ? 'group-hover:shadow-amber-500/15' : 'group-hover:shadow-amber-200/60',
      barColor: 'from-amber-400 to-amber-600',
    },
    {
      icon: Gem,
      title: 'Gold Loan',
      description:
        'Get instant loans against your gold assets with minimal documentation and fast approval.',
      rate: '7.5% – 9%',
      tag: 'Instant Cash',
      iconColor: 'text-yellow-400',
      tagColor: isDark
        ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30'
        : 'bg-yellow-50 text-yellow-700 border-yellow-200',
      bgIcon: isDark ? 'bg-yellow-500/15 border-yellow-500/25' : 'bg-yellow-50 border-yellow-200',
      rateColor: isDark ? 'text-yellow-400' : 'text-yellow-700',
      glowHover: isDark ? 'group-hover:shadow-yellow-500/15' : 'group-hover:shadow-yellow-200/60',
      barColor: 'from-yellow-400 to-yellow-500',
    },
  ];

  /* ── variants ── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      className={`relative py-28 overflow-hidden transition-colors duration-700
        ${isDark ? 'bg-[#0A0F1E]' : 'bg-slate-50'}`}
    >
      {/* ── Subtle top gradient accent ── */}
      <div
        className={`
          absolute top-0 left-0 right-0 h-1 transition-all duration-700
          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent'
          }
        `}
      />

      {/* ── Background tint blobs ── */}
      <div
        className={`
          absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700
          ${isDark ? 'bg-indigo-600/5' : 'bg-blue-200/30'}
        `}
      />
      <div
        className={`
          absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700
          ${isDark ? 'bg-purple-700/5' : 'bg-indigo-200/25'}
        `}
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
                border text-sm font-semibold transition-all duration-500
                ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }
              `}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              What We Offer
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className={`
              text-4xl md:text-5xl font-extrabold mb-4 leading-tight
              transition-colors duration-500
              ${isDark ? 'text-white' : 'text-slate-900'}
            `}
          >
            Our{' '}
            <span className="relative inline-block">
              <span
                className={`
                  bg-clip-text text-transparent transition-all duration-700
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-400'
                      : 'bg-gradient-to-r from-blue-700 to-indigo-700'
                  }
                `}
              >
                Loan Services
              </span>
              <motion.span
                className={`
                  absolute -bottom-1 left-0 h-0.5 rounded-full transition-colors duration-700
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-400'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  }
                `}
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className={`
              text-lg leading-relaxed transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-slate-500'}
            `}
          >
            Comprehensive loan solutions tailored to meet your diverse financial requirements —
            backed by years of expertise and trust.
          </motion.p>
        </motion.div>

        {/* ── Services grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`
                  group relative rounded-2xl p-7 border overflow-hidden
                  cursor-pointer transition-all duration-400
                  shadow-lg ${service.glowHover}
                  ${
                    isDark
                      ? 'bg-[#111827] border-white/6 hover:border-white/12 hover:shadow-2xl'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-2xl'
                  }
                `}
              >
                {/* ── Top accent bar on hover ── */}
                <div
                  className={`
                    absolute top-0 left-0 right-0 h-1
                    bg-gradient-to-r ${service.barColor}
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-400 rounded-t-2xl
                  `}
                />

                {/* ── Inner glow on hover ── */}
                <div
                  className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    rounded-2xl transition-opacity duration-400 pointer-events-none
                    ${
                      isDark
                        ? 'bg-gradient-to-br from-white/2 to-transparent'
                        : 'bg-gradient-to-br from-slate-50/80 to-transparent'
                    }
                  `}
                />

                <div className="relative z-10">
                  {/* ── Icon + tag row ── */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`
                        w-14 h-14 rounded-2xl border flex items-center justify-center
                        ${service.bgIcon}
                        group-hover:scale-110 transition-transform duration-400
                      `}
                    >
                      <Icon className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <span
                      className={`
                        text-xs font-semibold px-3 py-1 rounded-full border
                        ${service.tagColor}
                      `}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* ── Title ── */}
                  <h3
                    className={`
                      text-xl font-bold mb-2.5 transition-colors duration-300
                      ${isDark ? 'text-white' : 'text-slate-900'}
                    `}
                  >
                    {service.title}
                  </h3>

                  {/* ── Description ── */}
                  <p
                    className={`
                      text-sm leading-relaxed mb-6 transition-colors duration-300
                      ${isDark ? 'text-slate-400' : 'text-slate-500'}
                    `}
                  >
                    {service.description}
                  </p>

                  {/* ── Bottom row ── */}
                  <div
                    className={`
                      flex items-center justify-between pt-5 border-t
                      transition-colors duration-300
                      ${isDark ? 'border-white/6' : 'border-slate-100'}
                    `}
                  >
                    <div>
                      <p
                        className={`
                          text-xs font-medium uppercase tracking-wider mb-1
                          transition-colors duration-300
                          ${isDark ? 'text-slate-500' : 'text-slate-400'}
                        `}
                      >
                        Interest Rate p.a.
                      </p>
                      <p className={`text-base font-bold ${service.rateColor}`}>{service.rate}</p>
                    </div>

                    <div
                      className={`
                        w-9 h-9 rounded-xl flex items-center justify-center
                        border transition-all duration-300
                        group-hover:scale-110
                        ${
                          isDark
                            ? 'bg-white/5 border-white/8 group-hover:bg-white/10 group-hover:border-white/15'
                            : 'bg-slate-50 border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-200'
                        }
                      `}
                    >
                      <ArrowRight
                        className={`
                          w-4 h-4 transition-all duration-300
                          group-hover:translate-x-0.5
                          ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-400 group-hover:text-blue-600'}
                        `}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`
                group relative inline-flex items-center gap-3
                px-9 py-4 rounded-xl text-base font-bold
                overflow-hidden shadow-xl transition-all duration-300
                ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-blue-700/25 hover:shadow-blue-700/40'
                }
              `}
            >
              <span className="relative z-10">View All Services</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              {/* shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
