// TestimonialsSection.jsx
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const TestimonialsSection = () => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      location: 'Sangli, Maharashtra',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=1D4ED8&color=fff&size=128',
      rating: 5,
      loanType: 'Business Loan',
      amount: '₹25 Lakhs',
      text: 'Dakshin Capital helped me expand my business with their quick business loan approval. The process was seamless and the interest rates were very competitive. My application was approved within 48 hours!',
      tagColor: isDark
        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
        : 'bg-blue-50 text-blue-700 border-blue-200',
      avatarBg: '1D4ED8',
    },
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      location: 'Kolhapur, Maharashtra',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=059669&color=fff&size=128',
      rating: 5,
      loanType: 'Home Loan',
      amount: '₹45 Lakhs',
      text: "Got my dream home thanks to Dakshin Capital's home loan. The team was incredibly supportive and guided me through every single step. The documentation process was simple and hassle-free. Best decision I ever made!",
      tagColor: isDark
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avatarBg: '059669',
    },
    {
      name: 'Amit Patel',
      role: 'Software Engineer',
      location: 'Pune, Maharashtra',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=D97706&color=fff&size=128',
      rating: 5,
      loanType: 'Personal Loan',
      amount: '₹5 Lakhs',
      text: 'Needed urgent funds for a medical emergency. Dakshin Capital processed my personal loan within 24 hours with zero hassle. Their customer service team was available every step of the way. Forever grateful!',
      tagColor: isDark
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-700 border-amber-200',
      avatarBg: 'D97706',
    },
    {
      name: 'Sneha Reddy',
      role: 'MBA Graduate',
      location: 'Nashik, Maharashtra',
      image: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=7C3AED&color=fff&size=128',
      rating: 5,
      loanType: 'Education Loan',
      amount: '₹12 Lakhs',
      text: 'Education loan made absolutely easy! Dakshin Capital helped me pursue my MBA abroad with minimal documentation and excellent interest rates. They truly invest in your future. Highly recommend to every student!',
      tagColor: isDark
        ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
        : 'bg-violet-50 text-violet-700 border-violet-200',
      avatarBg: '7C3AED',
    },
    {
      name: 'Suresh Desai',
      role: 'Farmer',
      location: 'Satara, Maharashtra',
      image: 'https://ui-avatars.com/api/?name=Suresh+Desai&background=DC2626&color=fff&size=128',
      rating: 5,
      loanType: 'Gold Loan',
      amount: '₹3 Lakhs',
      text: 'I pledged my gold and got instant cash to save my crop season. Dakshin Capital gave me the best gold loan rate in the city with zero processing fee. The staff treated me with great respect. Very trustworthy!',
      tagColor: isDark
        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
        : 'bg-rose-50 text-rose-700 border-rose-200',
      avatarBg: 'DC2626',
    },
  ];

  /* ── Auto-play ── */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const goNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  /* ── Slide variants ── */
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
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

  return (
    <section
      className={`
        relative py-28 overflow-hidden transition-colors duration-700
        ${isDark ? 'bg-[#060B18]' : 'bg-white'}
      `}
    >
      {/* ── Background blobs ── */}
      <div
        className={`
          absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700
          ${isDark ? 'bg-indigo-700/6' : 'bg-blue-100/60'}
        `}
      />
      <div
        className={`
          absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl
          pointer-events-none transition-all duration-700
          ${isDark ? 'bg-purple-700/5' : 'bg-indigo-100/50'}
        `}
      />

      {/* ── Top border line ── */}
      <div
        className={`
          absolute top-0 left-0 right-0 h-px transition-all duration-700
          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-300/50 to-transparent'
          }
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
              <MessageSquare className="w-3.5 h-3.5" />
              Customer Stories
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
                  transition-colors duration-700
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

        {/* ── Carousel area ── */}
        <div className="max-w-4xl mx-auto">
          {/* ── Main card ── */}
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
                  relative rounded-3xl p-8 md:p-12 overflow-hidden
                  border transition-all duration-500
                  ${
                    isDark
                      ? 'bg-[#111827] border-white/6 shadow-2xl shadow-black/50'
                      : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/80'
                  }
                `}
              >
                {/* ── Decorative quote icon ── */}
                <div
                  className={`
                    absolute top-8 right-8 transition-colors duration-500
                    ${isDark ? 'text-white/4' : 'text-slate-100'}
                  `}
                >
                  <Quote className="w-28 h-28" />
                </div>

                {/* ── Top accent bar ── */}
                <div
                  className={`
                    absolute top-0 left-0 right-0 h-1 rounded-t-3xl
                    transition-all duration-500
                    ${
                      isDark
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600'
                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800'
                    }
                  `}
                />

                <div className="relative z-10">
                  {/* ── Loan type badge + Stars row ── */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(current.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                        >
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                      <span
                        className={`
                          ml-2 text-sm font-semibold transition-colors duration-300
                          ${isDark ? 'text-amber-400' : 'text-amber-600'}
                        `}
                      >
                        5.0
                      </span>
                    </div>

                    {/* Loan badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          text-xs font-semibold px-3 py-1 rounded-full border
                          ${current.tagColor}
                        `}
                      >
                        {current.loanType}
                      </span>
                      <span
                        className={`
                          text-xs font-bold px-3 py-1 rounded-full border
                          transition-all duration-500
                          ${
                            isDark
                              ? 'bg-white/5 border-white/10 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }
                        `}
                      >
                        {current.amount}
                      </span>
                    </div>
                  </div>

                  {/* ── Quote text ── */}
                  <blockquote
                    className={`
                      text-lg md:text-xl leading-relaxed mb-8 font-medium
                      transition-colors duration-500
                      ${isDark ? 'text-slate-200' : 'text-slate-700'}
                    `}
                  >
                    <span
                      className={`
                        text-3xl font-serif leading-none mr-1
                        transition-colors duration-500
                        ${isDark ? 'text-blue-400' : 'text-blue-600'}
                      `}
                    >
                      "
                    </span>
                    {current.text}
                    <span
                      className={`
                        text-3xl font-serif leading-none ml-1
                        transition-colors duration-500
                        ${isDark ? 'text-blue-400' : 'text-blue-600'}
                      `}
                    >
                      "
                    </span>
                  </blockquote>

                  {/* ── Divider ── */}
                  <div
                    className={`
                      h-px mb-7 transition-colors duration-500
                      ${isDark ? 'bg-white/6' : 'bg-slate-100'}
                    `}
                  />

                  {/* ── Author row ── */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={current.image}
                          alt={current.name}
                          className={`
                            w-14 h-14 rounded-2xl object-cover
                            ring-2 transition-all duration-500
                            ${
                              isDark
                                ? 'ring-white/10 shadow-lg shadow-black/30'
                                : 'ring-blue-100 shadow-md shadow-slate-200'
                            }
                          `}
                        />
                        {/* verified dot */}
                        <div
                          className={`
                            absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                            flex items-center justify-center
                            bg-emerald-500 border-2
                            transition-colors duration-500
                            ${isDark ? 'border-[#111827]' : 'border-white'}
                          `}
                        >
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Name + role + location */}
                      <div>
                        <h4
                          className={`
                            text-base font-bold transition-colors duration-300
                            ${isDark ? 'text-white' : 'text-slate-900'}
                          `}
                        >
                          {current.name}
                        </h4>
                        <p
                          className={`
                            text-sm transition-colors duration-300
                            ${isDark ? 'text-slate-400' : 'text-slate-500'}
                          `}
                        >
                          {current.role}
                        </p>
                        <p
                          className={`
                            text-xs mt-0.5 transition-colors duration-300
                            ${isDark ? 'text-slate-600' : 'text-slate-400'}
                          `}
                        >
                          📍 {current.location}
                        </p>
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div
                      className={`
                        hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                        text-xs font-semibold border transition-all duration-500
                        ${
                          isDark
                            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        }
                      `}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Verified Customer
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Prev button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={goPrev}
              aria-label="Previous testimonial"
              className={`
                w-11 h-11 rounded-xl flex items-center justify-center
                border transition-all duration-300
                ${
                  isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10 hover:border-white/15 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 shadow-sm'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`
                    rounded-full transition-all duration-400 ease-out
                    ${
                      index === currentIndex
                        ? `w-8 h-2.5 ${isDark ? 'bg-blue-500' : 'bg-blue-700'}`
                        : `w-2.5 h-2.5 ${isDark ? 'bg-white/15 hover:bg-white/30' : 'bg-slate-200 hover:bg-slate-300'}`
                    }
                  `}
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={goNext}
              aria-label="Next testimonial"
              className={`
                w-11 h-11 rounded-xl flex items-center justify-center
                border transition-all duration-300
                ${
                  isDark
                    ? 'bg-white/5 border-white/8 text-slate-300 hover:bg-white/10 hover:border-white/15 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 shadow-sm'
                }
              `}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* ── Auto-play progress bar ── */}
          {isAutoPlaying && (
            <div
              className={`
                mt-5 h-0.5 rounded-full overflow-hidden mx-auto max-w-xs
                transition-colors duration-500
                ${isDark ? 'bg-white/6' : 'bg-slate-100'}
              `}
            >
              <motion.div
                key={currentIndex}
                className={`
                  h-full rounded-full transition-colors duration-500
                  ${
                    isDark
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700'
                  }
                `}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          )}

          {/* ── Summary stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`
              mt-14 grid grid-cols-3 gap-4 rounded-2xl p-6 border
              transition-all duration-500
              ${
                isDark
                  ? 'bg-[#111827] border-white/6 shadow-xl shadow-black/30'
                  : 'bg-slate-50 border-slate-100 shadow-lg shadow-slate-100'
              }
            `}
          >
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '4.9 / 5', label: 'Average Rating' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className={`
                    text-xl md:text-2xl font-extrabold mb-1 bg-clip-text text-transparent
                    transition-all duration-500
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
                    text-xs font-medium transition-colors duration-300
                    ${isDark ? 'text-slate-500' : 'text-slate-400'}
                  `}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-px pointer-events-none
          transition-all duration-700
          ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-200/60 to-transparent'
          }
        `}
      />
    </section>
  );
};

export default TestimonialsSection;
