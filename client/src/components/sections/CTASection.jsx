// CTA Section - Call to action
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  BadgePercent,
  HeadphonesIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const CTASection = () => {
  const { isDark } = useTheme();

  const trustPoints = [
    { icon: ShieldCheck, text: 'No Hidden Charges', color: 'text-emerald-400' },
    { icon: Clock, text: 'Quick Approval', color: 'text-blue-400' },
    { icon: BadgePercent, text: 'Lowest Interest', color: 'text-amber-400' },
    { icon: HeadphonesIcon, text: '24/7 Support', color: 'text-violet-400' },
  ];

  /* ── animation variants ── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-28 overflow-hidden">
      {/* ════════════════════════════════════════
          DUAL BACKGROUNDS — swap on theme change
      ════════════════════════════════════════ */}

      {/* Light theme background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 40%, #1D4ED8 75%, #1E40AF 100%)',
        }}
      />

      {/* Dark theme background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0A0F1E 35%, #0F172A 65%, #1E1B4B 100%)',
        }}
      />

      {/* ── Dot-grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Top radial glow ── */}
      <div
        className={`
          absolute inset-0 transition-all duration-700
          ${
            isDark
              ? 'bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(99,102,241,0.2),transparent)]'
              : 'bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(96,165,250,0.25),transparent)]'
          }
        `}
      />

      {/* ── Floating orbs ── */}
      <motion.div
        className={`
          absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl
          transition-colors duration-700
          ${isDark ? 'bg-indigo-600/20' : 'bg-blue-400/20'}
        `}
        animate={{ scale: [1, 1.18, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`
          absolute -bottom-16 -left-16 w-96 h-96 rounded-full blur-3xl
          transition-colors duration-700
          ${isDark ? 'bg-purple-700/15' : 'bg-indigo-500/15'}
        `}
        animate={{ scale: [1, 1.22, 1], x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[500px] h-[500px] rounded-full blur-3xl bg-amber-500/5 pointer-events-none"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      {/* ════════════════════════════════════════
          CONTENT
      ════════════════════════════════════════ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* ── Pill label ── */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div
              className={`
                inline-flex items-center gap-2 px-5 py-2 rounded-full
                border text-sm font-semibold backdrop-blur-md
                transition-all duration-500
                ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300'
                    : 'bg-white/10 border-white/25 text-white'
                }
              `}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Limited Time — Process Starts in 24 Hours
              <motion.span
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div variants={fadeUp} className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Ready to Achieve
              <br className="hidden sm:block" /> Your{' '}
              <span className="relative inline-block">
                <span
                  className={`
                    bg-clip-text text-transparent
                    transition-all duration-700
                    ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300'
                        : 'bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400'
                    }
                  `}
                >
                  Financial Goals?
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full
                             bg-gradient-to-r from-amber-400 to-yellow-300"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
                />
              </span>
            </h2>
          </motion.div>

          {/* ── Subtitle ── */}
          <motion.p
            variants={fadeUp}
            className={`
              text-center text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto
              transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-blue-100/85'}
            `}
          >
            Take the first step towards your dreams. Apply now and our experts will guide you
            through a <span className="text-amber-300 font-semibold">100% hassle-free</span> loan
            process — from approval to disbursement.
          </motion.p>

          {/* ── CTA Card ── */}
          <motion.div
            variants={fadeUp}
            className={`
              relative rounded-3xl p-8 md:p-10 mb-10 overflow-hidden
              border backdrop-blur-md transition-all duration-500
              ${
                isDark
                  ? 'bg-white/5 border-white/8 shadow-2xl shadow-black/40'
                  : 'bg-white/10 border-white/20 shadow-2xl shadow-blue-900/30'
              }
            `}
          >
            {/* inner glow */}
            <div
              className={`
                absolute inset-0 rounded-3xl pointer-events-none
                transition-all duration-700
                ${
                  isDark
                    ? 'bg-gradient-to-br from-indigo-600/8 via-transparent to-purple-600/8'
                    : 'bg-gradient-to-br from-blue-400/8 via-transparent to-indigo-400/8'
                }
              `}
            />

            <div className="relative z-10">
              {/* ── Buttons row ── */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                {/* Primary — Apply */}
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      group relative inline-flex items-center gap-3
                      px-8 py-4 rounded-xl text-base font-bold
                      overflow-hidden shadow-xl transition-all duration-300
                      ${
                        isDark
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 shadow-amber-500/25 hover:shadow-amber-500/40'
                          : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 shadow-amber-400/35 hover:shadow-amber-400/55'
                      }
                    `}
                  >
                    <span className="relative z-10">Apply for Loan Now</span>
                    <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    {/* shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3.5 }}
                    />
                  </motion.button>
                </Link>

                {/* Secondary — Call */}
                <a href="tel:+918208790605">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      group inline-flex items-center gap-3
                      px-8 py-4 rounded-xl text-base font-bold
                      border-2 backdrop-blur-sm transition-all duration-300
                      ${
                        isDark
                          ? 'bg-white/5 border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 shadow-lg shadow-indigo-500/10'
                          : 'bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white shadow-lg shadow-blue-900/20'
                      }
                    `}
                  >
                    <Phone className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
                    <span>+91 82087 90605</span>
                  </motion.button>
                </a>

                {/* Tertiary — WhatsApp */}
                <a href="https://wa.me/918208790605" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      group inline-flex items-center gap-3
                      px-8 py-4 rounded-xl text-base font-bold
                      border-2 transition-all duration-300
                      bg-emerald-500/15 border-emerald-400/40 text-emerald-300
                      hover:bg-emerald-500/25 hover:border-emerald-400
                      shadow-lg shadow-emerald-500/10
                    `}
                  >
                    <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>WhatsApp Us</span>
                  </motion.button>
                </a>
              </div>

              {/* ── Divider ── */}
              <div
                className={`
                  w-full h-px mb-8 transition-colors duration-500
                  ${isDark ? 'bg-white/8' : 'bg-white/15'}
                `}
              />

              {/* ── Trust points ── */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {trustPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={point.text}
                      variants={fadeIn}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className={`
                        flex flex-col items-center gap-2 p-4 rounded-2xl
                        border text-center cursor-default transition-all duration-300
                        ${
                          isDark
                            ? 'bg-white/4 border-white/6 hover:bg-white/8 hover:border-white/12'
                            : 'bg-white/8 border-white/12 hover:bg-white/15 hover:border-white/25'
                        }
                      `}
                    >
                      <div
                        className={`
                          w-10 h-10 rounded-xl flex items-center justify-center
                          transition-colors duration-300
                          ${isDark ? 'bg-white/6' : 'bg-white/10'}
                        `}
                      >
                        <Icon className={`w-5 h-5 ${point.color}`} />
                      </div>
                      <span
                        className={`
                          text-sm font-semibold leading-tight
                          transition-colors duration-300
                          ${isDark ? 'text-slate-300' : 'text-white'}
                        `}
                      >
                        {point.text}
                      </span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: trustPoints.indexOf(point) * 0.4,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Bottom micro-copy ── */}
          <motion.p
            variants={fadeUp}
            className={`
              text-center text-xs leading-relaxed
              transition-colors duration-500
              ${isDark ? 'text-slate-600' : 'text-white/30'}
            `}
          >
            By applying, you agree to our{' '}
            <Link
              to="/terms"
              className={`
                underline underline-offset-2 transition-colors duration-300
                ${
                  isDark
                    ? 'text-indigo-400/60 hover:text-indigo-300'
                    : 'text-white/50 hover:text-white/80'
                }
              `}
            >
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className={`
                underline underline-offset-2 transition-colors duration-300
                ${
                  isDark
                    ? 'text-indigo-400/60 hover:text-indigo-300'
                    : 'text-white/50 hover:text-white/80'
                }
              `}
            >
              Privacy Policy
            </Link>
            . Loan approval is subject to credit assessment.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-24 pointer-events-none
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

export default CTASection;
