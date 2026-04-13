// TestimonialsSection.jsx
import { useState, useEffect } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  MessageSquare,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Users,
  Heart,
  Play,
  Pause,
  Clock,
  Award,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const TestimonialsSection = () => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [hoveredDot, setHoveredDot] = useState(null);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      location: 'Sangli, Maharashtra',
      company: 'Kumar Enterprises',
      image: 'https://mockmind-api.uifaces.co/content/human/211.jpg',
      rating: 5,
      loanType: 'Business Loan',
      amount: '₹25 Lakhs',
      processingTime: '48 Hours',
      text: 'Dakshin Capital helped me expand my business with their quick business loan approval. The process was seamless and the interest rates were very competitive. My application was approved within 48 hours!',
      gradient: 'from-blue-600 via-indigo-500 to-violet-600',
      accentColor: 'blue',
    },
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      location: 'Kolhapur, Maharashtra',
      company: 'IT Professional',
      image: 'https://mockmind-api.uifaces.co/content/human/219.jpg',
      rating: 5,
      loanType: 'Home Loan',
      amount: '₹45 Lakhs',
      processingTime: '5 Days',
      text: "Got my dream home thanks to Dakshin Capital's home loan. The team was incredibly supportive and guided me through every single step. The documentation process was simple and hassle-free. Best decision I ever made!",
      gradient: 'from-emerald-600 via-teal-500 to-green-600',
      accentColor: 'emerald',
    },
    {
      name: 'Amit Patel',
      role: 'Software Engineer',
      location: 'Pune, Maharashtra',
      company: 'Tech Solutions Pvt Ltd',
      image: 'https://mockmind-api.uifaces.co/content/human/195.jpg',
      rating: 5,
      loanType: 'Personal Loan',
      amount: '₹5 Lakhs',
      processingTime: '24 Hours',
      text: 'Needed urgent funds for a medical emergency. Dakshin Capital processed my personal loan within 24 hours with zero hassle. Their customer service team was available every step of the way. Forever grateful!',
      gradient: 'from-amber-600 via-orange-500 to-yellow-600',
      accentColor: 'amber',
    },
    {
      name: 'Sneha Reddy',
      role: 'MBA Graduate',
      location: 'Nashik, Maharashtra',
      company: 'International Business School',
      image: 'https://mockmind-api.uifaces.co/content/human/188.jpg',
      rating: 5,
      loanType: 'Education Loan',
      amount: '₹12 Lakhs',
      processingTime: '3 Days',
      text: 'Education loan made absolutely easy! Dakshin Capital helped me pursue my MBA abroad with minimal documentation and excellent interest rates. They truly invest in your future. Highly recommend to every student!',
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-600',
      accentColor: 'violet',
    },
    {
      name: 'Suresh Desai',
      role: 'Farmer',
      location: 'Satara, Maharashtra',
      company: 'Agriculture Business',
      image: 'https://mockmind-api.uifaces.co/content/human/171.jpg',
      rating: 5,
      loanType: 'Gold Loan',
      amount: '₹3 Lakhs',
      processingTime: '2 Hours',
      text: 'I pledged my gold and got instant cash to save my crop season. Dakshin Capital gave me the best gold loan rate in the city with zero processing fee. The staff treated me with great respect. Very trustworthy!',
      gradient: 'from-rose-600 via-pink-500 to-red-600',
      accentColor: 'rose',
    },
    {
      name: 'Vikram Singh',
      role: 'Construction Developer',
      location: 'Mumbai, Maharashtra',
      company: 'Singh Builders & Developers',
      image: 'https://mockmind-api.uifaces.co/content/human/131.jpg',
      rating: 5,
      loanType: 'Construction Finance',
      amount: '₹1.2 Crore',
      processingTime: '7 Days',
      text: 'Outstanding support for our construction project! Dakshin Capital provided structured funding with phased disbursement perfectly aligned with our project milestones. Their understanding of construction finance is exceptional.',
      gradient: 'from-cyan-600 via-blue-500 to-indigo-600',
      accentColor: 'cyan',
    },
  ];

  /* ── Auto-play ── */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  /* ── Animation Variants ── */
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

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

  const current = testimonials[currentIndex];

  // Helper function for accent colors
  const getAccentClasses = (color) => {
    const colors = {
      blue: {
        tag: isDark
          ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
          : 'bg-blue-50 text-blue-700 border-blue-200',
        badge: isDark
          ? 'bg-blue-500/10 border-blue-500/25 text-blue-400'
          : 'bg-blue-50 border-blue-200 text-blue-700',
      },
      emerald: {
        tag: isDark
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        badge: isDark
          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
          : 'bg-emerald-50 border-emerald-200 text-emerald-700',
      },
      amber: {
        tag: isDark
          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          : 'bg-amber-50 text-amber-700 border-amber-200',
        badge: isDark
          ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
          : 'bg-amber-50 border-amber-200 text-amber-700',
      },
      violet: {
        tag: isDark
          ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
          : 'bg-violet-50 text-violet-700 border-violet-200',
        badge: isDark
          ? 'bg-violet-500/10 border-violet-500/25 text-violet-400'
          : 'bg-violet-50 border-violet-200 text-violet-700',
      },
      rose: {
        tag: isDark
          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          : 'bg-rose-50 text-rose-700 border-rose-200',
        badge: isDark
          ? 'bg-rose-500/10 border-rose-500/25 text-rose-400'
          : 'bg-rose-50 border-rose-200 text-rose-700',
      },
      cyan: {
        tag: isDark
          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
          : 'bg-cyan-50 text-cyan-700 border-cyan-200',
        badge: isDark
          ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400'
          : 'bg-cyan-50 border-cyan-200 text-cyan-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      className={`
        relative py-28 overflow-hidden transition-colors duration-700
        ${isDark ? 'bg-[#060B18]' : 'bg-white'}
      `}
    >
      {/* ── Background Effects ── */}
      <div
        className={`
          absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700 animate-pulse-slow
          ${isDark ? 'bg-indigo-700/8' : 'bg-blue-100/70'}
        `}
      />
      <div
        className={`
          absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700 animate-pulse-slow
          ${isDark ? 'bg-purple-700/6' : 'bg-indigo-100/60'}
        `}
        style={{ animationDelay: '1s' }}
      />
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700 animate-pulse-slow
          ${isDark ? 'bg-pink-700/4' : 'bg-pink-100/40'}
        `}
        style={{ animationDelay: '2s' }}
      />

      {/* ── Top Border ── */}
      <motion.div
        className={`
          absolute top-0 left-0 right-0 h-px
          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-300/50 to-transparent'
          }
        `}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Pill Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border text-sm font-semibold transition-all duration-500
                ${
                  isDark
                    ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/15'
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                }
              `}
            >
              <MessageSquare className="w-4 h-4 animate-pulse" />
              Customer Stories
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className={`
              text-4xl md:text-5xl font-extrabold mb-4 leading-tight
              transition-colors duration-500
              ${isDark ? 'text-white' : 'text-slate-900'}
            `}
          >
            What Our{' '}
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
                Customers Say
              </span>
              <motion.span
                className={`
                  absolute -bottom-1 left-0 h-0.5 rounded-full
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-400'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  }
                `}
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className={`
              text-lg leading-relaxed transition-colors duration-500
              ${isDark ? 'text-slate-400' : 'text-slate-500'}
            `}
          >
            Real stories from real people who trusted us with their financial needs. Join thousands
            of satisfied customers across Maharashtra.
          </motion.p>
        </motion.div>

        {/* ── Testimonials Carousel ── */}
        <div className="max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`
                  relative rounded-3xl overflow-hidden
                  border transition-all duration-500
                  ${
                    isDark
                      ? 'bg-gradient-to-br from-[#111827] to-[#0F172A] border-white/6 shadow-2xl shadow-black/50'
                      : 'bg-gradient-to-br from-white to-slate-50 border-slate-100 shadow-2xl shadow-slate-200/80'
                  }
                `}
              >
                {/* Top Accent Bar */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />

                {/* Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8 p-8 md:p-12">
                  {/* Left Side - Customer Info & Quote */}
                  <div className="lg:col-span-8 relative">
                    {/* Decorative Quote - Positioned Better */}
                    <div
                      className={`
                        absolute -top-4 -left-4 opacity-[0.03] pointer-events-none
                        ${isDark ? 'text-white' : 'text-slate-900'}
                      `}
                    >
                      <Quote className="w-32 h-32" />
                    </div>

                    {/* Stars Row */}
                    <div className="flex items-center gap-1 mb-6 relative z-10">
                      {[...Array(current.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.3 + i * 0.08,
                            duration: 0.4,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          whileHover={{ scale: 1.2, rotate: 72 }}
                        >
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-lg" />
                        </motion.div>
                      ))}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`
                          ml-2 text-sm font-bold
                          ${isDark ? 'text-amber-400' : 'text-amber-600'}
                        `}
                      >
                        5.0
                      </motion.span>
                    </div>

                    {/* Quote Text */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className={`
                        text-lg md:text-xl leading-relaxed mb-8 font-medium relative z-10
                        ${isDark ? 'text-slate-200' : 'text-slate-700'}
                      `}
                    >
                      <span
                        className={`
                          text-4xl font-serif leading-none mr-2
                          ${isDark ? 'text-blue-400/60' : 'text-blue-600/60'}
                        `}
                      >
                        "
                      </span>
                      {current.text}
                      <span
                        className={`
                          text-4xl font-serif leading-none ml-2
                          ${isDark ? 'text-blue-400/60' : 'text-blue-600/60'}
                        `}
                      >
                        "
                      </span>
                    </motion.blockquote>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className={`
                        h-px mb-6 origin-left
                        ${isDark ? 'bg-white/6' : 'bg-slate-100'}
                      `}
                    />

                    {/* Author Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="flex items-center gap-4"
                    >
                      {/* Avatar */}
                      <div className="relative group">
                        <motion.div whileHover={{ scale: 1.1 }} className="relative">
                          <img
                            src={current.image}
                            alt={current.name}
                            className={`
                              w-16 h-16 rounded-2xl object-cover
                              ring-2 transition-all duration-500
                              ${
                                isDark
                                  ? 'ring-white/10 shadow-lg shadow-black/30'
                                  : 'ring-blue-100 shadow-md shadow-slate-200'
                              }
                            `}
                          />
                          {/* Verified Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: 'spring', stiffness: 500 }}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            className={`
                              absolute -bottom-1 -right-1 w-6 h-6 rounded-full
                              flex items-center justify-center
                              bg-emerald-500 border-2 shadow-lg
                              ${isDark ? 'border-[#111827]' : 'border-white'}
                            `}
                          >
                            <BadgeCheck className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Name & Details */}
                      <div>
                        <motion.h4
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9, duration: 0.4 }}
                          className={`
                            text-lg font-bold
                            ${isDark ? 'text-white' : 'text-slate-900'}
                          `}
                        >
                          {current.name}
                        </motion.h4>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1, duration: 0.4 }}
                          className={`
                            text-sm font-medium
                            ${isDark ? 'text-slate-400' : 'text-slate-500'}
                          `}
                        >
                          {current.role}
                          {current.company && (
                            <span className={`${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                              {' '}
                              · {current.company}
                            </span>
                          )}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1, duration: 0.4 }}
                          className={`
                            text-xs mt-0.5 flex items-center gap-1
                            ${isDark ? 'text-slate-600' : 'text-slate-400'}
                          `}
                        >
                          📍 {current.location}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Side - Loan Details */}
                  <div className="lg:col-span-4">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className={`
                        rounded-2xl p-6 h-full
                        border transition-all duration-500
                        ${
                          isDark
                            ? 'bg-white/[0.02] border-white/[0.05] backdrop-blur-sm'
                            : 'bg-slate-50/50 border-slate-100'
                        }
                      `}
                    >
                      <div className="flex flex-col gap-4 h-full">
                        {/* Loan Type Badge */}
                        <div>
                          <p
                            className={`
                              text-xs font-medium uppercase tracking-wider mb-2
                              ${isDark ? 'text-slate-500' : 'text-slate-400'}
                            `}
                          >
                            Loan Type
                          </p>
                          <div
                            className={`
                              inline-flex items-center gap-2 px-4 py-2 rounded-xl
                              text-sm font-semibold border
                              ${getAccentClasses(current.accentColor).tag}
                            `}
                          >
                            <Award className="w-4 h-4" />
                            {current.loanType}
                          </div>
                        </div>

                        {/* Amount */}
                        <div>
                          <p
                            className={`
                              text-xs font-medium uppercase tracking-wider mb-2
                              ${isDark ? 'text-slate-500' : 'text-slate-400'}
                            `}
                          >
                            Loan Amount
                          </p>
                          <div
                            className={`
                              text-2xl font-bold bg-clip-text text-transparent
                              ${
                                isDark
                                  ? 'bg-gradient-to-r from-white to-slate-300'
                                  : 'bg-gradient-to-r from-slate-900 to-slate-600'
                              }
                            `}
                          >
                            {current.amount}
                          </div>
                        </div>

                        {/* Processing Time */}
                        <div>
                          <p
                            className={`
                              text-xs font-medium uppercase tracking-wider mb-2
                              ${isDark ? 'text-slate-500' : 'text-slate-400'}
                            `}
                          >
                            Processing Time
                          </p>
                          <div
                            className={`
                              inline-flex items-center gap-2 px-4 py-2 rounded-xl
                              text-sm font-semibold border
                              ${
                                isDark
                                  ? 'bg-green-500/10 border-green-500/25 text-green-400'
                                  : 'bg-green-50 border-green-200 text-green-700'
                              }
                            `}
                          >
                            <Clock className="w-4 h-4" />
                            {current.processingTime}
                          </div>
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* Verified Badge */}
                        <div
                          className={`
                            flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                            text-sm font-semibold border
                            ${
                              isDark
                                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            }
                          `}
                        >
                          <Shield className="w-4 h-4" />
                          Verified Customer
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation Controls ── */}
          <div className="flex items-center justify-between mt-10 px-2">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              aria-label="Previous testimonial"
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                border transition-all duration-300 group
                ${
                  isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10 hover:border-white/15 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 shadow-sm hover:shadow-md'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>

            {/* Dots Navigation */}
            <div className="flex items-center gap-2.5">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative group">
                  <motion.button
                    onClick={() => goTo(index)}
                    onMouseEnter={() => setHoveredDot(index)}
                    onMouseLeave={() => setHoveredDot(null)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      rounded-full transition-all duration-400 ease-out relative
                      ${
                        index === currentIndex
                          ? `w-10 h-3 ${isDark ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-blue-700 shadow-md shadow-blue-700/50'}`
                          : `w-3 h-3 ${isDark ? 'bg-white/15 hover:bg-white/30' : 'bg-slate-200 hover:bg-slate-300'}`
                      }
                    `}
                  >
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeDot"
                        className={`absolute inset-0 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>

                  {/* Hover Tooltip */}
                  <AnimatePresence>
                    {hoveredDot === index && index !== currentIndex && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg
                          text-xs font-medium whitespace-nowrap pointer-events-none z-50
                          shadow-xl
                          ${
                            isDark
                              ? 'bg-slate-800 text-white border border-white/10'
                              : 'bg-slate-900 text-white'
                          }
                        `}
                      >
                        {testimonial.name}
                        <div className="text-[10px] opacity-70">{testimonial.loanType}</div>
                        <div
                          className={`
                            absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45
                            ${isDark ? 'bg-slate-800 border-r border-b border-white/10' : 'bg-slate-900'}
                          `}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              aria-label="Next testimonial"
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                border transition-all duration-300 group
                ${
                  isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10 hover:border-white/15 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 shadow-sm hover:shadow-md'
                }
              `}
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* ── Auto-play Controls ── */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAutoPlay}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                border transition-all duration-300
                ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </motion.button>

            {isAutoPlaying && (
              <div
                className={`
                  w-32 h-1 rounded-full overflow-hidden
                  ${isDark ? 'bg-white/6' : 'bg-slate-100'}
                `}
              >
                <motion.div
                  key={currentIndex}
                  className={`
                    h-full rounded-full
                    ${
                      isDark
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700'
                    }
                  `}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              </div>
            )}
          </div>

          {/* ── Statistics Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`
              mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl p-8 border
              transition-all duration-500
              ${
                isDark
                  ? 'bg-gradient-to-br from-[#111827] to-[#0F172A] border-white/6 shadow-xl shadow-black/30'
                  : 'bg-gradient-to-br from-slate-50 to-white border-slate-100 shadow-lg shadow-slate-100'
              }
            `}
          >
            {[
              { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-blue-500' },
              {
                icon: Star,
                value: '4.9 / 5',
                label: 'Average Rating',
                color: 'text-amber-500',
              },
              {
                icon: TrendingUp,
                value: '98%',
                label: 'Satisfaction Rate',
                color: 'text-emerald-500',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="text-center group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`
                      w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center
                      ${
                        isDark
                          ? 'bg-white/5 group-hover:bg-white/10'
                          : 'bg-slate-100 group-hover:bg-slate-200'
                      }
                      transition-colors duration-300
                    `}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </motion.div>
                  <div
                    className={`
                      text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent
                      ${
                        isDark
                          ? 'bg-gradient-to-br from-white to-slate-300'
                          : 'bg-gradient-to-br from-slate-900 to-slate-600'
                      }
                    `}
                  >
                    {item.value}
                  </div>
                  <div
                    className={`
                      text-sm font-medium transition-colors duration-300
                      ${isDark ? 'text-slate-500' : 'text-slate-400'}
                    `}
                  >
                    {item.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Border ── */}
      <motion.div
        className={`
          absolute bottom-0 left-0 right-0 h-px
          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-200/60 to-transparent'
          }
        `}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* ── Custom Animations ── */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
