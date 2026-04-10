// Premium Enquiry Form Component - Dakshin Capital
// Enhanced form with better UX and no message validation
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Send,
  Loader2,
  User,
  Mail as MailIcon,
  Phone as PhoneIcon,
  IndianRupee,
  Briefcase,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { LOAN_TYPES, VALIDATION } from '../../utils/constants';
import { submitEnquiry } from '../../services/enquiry.service';

const EnquiryForm = ({ variant = 'full' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await submitEnquiry(data);

      setIsSuccess(true);
      toast.success(
        'Thank you! Your enquiry has been submitted successfully. We will contact you soon.',
        { duration: 5000, icon: '🎉' }
      );

      reset();

      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error(
        error.message || 'Failed to submit enquiry. Please try again or contact us directly.',
        { duration: 5000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Animation
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
          Enquiry Submitted!
        </h3>
        <p className="text-light-textSecondary dark:text-dark-textSecondary text-center">
          We'll get back to you within 24 hours
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
        >
          <User className="w-4 h-4 text-light-primary dark:text-dark-primary" />
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: VALIDATION.name.minLength,
              message: VALIDATION.name.message,
            },
            maxLength: {
              value: VALIDATION.name.maxLength,
              message: VALIDATION.name.message,
            },
          })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-light-border dark:border-dark-border focus:ring-light-primary dark:focus:ring-dark-primary'
          } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 transition-all duration-300`}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1 text-sm text-red-500 flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-red-500" />
              {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email and Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
          >
            <MailIcon className="w-4 h-4 text-light-primary dark:text-dark-primary" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: VALIDATION.email.pattern,
                message: VALIDATION.email.message,
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-light-border dark:border-dark-border focus:ring-light-primary dark:focus:ring-dark-primary'
            } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 transition-all duration-300`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-500 flex items-center gap-1"
              >
                <span className="w-1 h-1 rounded-full bg-red-500" />
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
          >
            <PhoneIcon className="w-4 h-4 text-light-primary dark:text-dark-primary" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: VALIDATION.phone.pattern,
                message: VALIDATION.phone.message,
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-light-border dark:border-dark-border focus:ring-light-primary dark:focus:ring-dark-primary'
            } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 transition-all duration-300`}
            placeholder="9876543210"
            disabled={isSubmitting}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-sm text-red-500 flex items-center gap-1"
              >
                <span className="w-1 h-1 rounded-full bg-red-500" />
                {errors.phone.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Loan Type and Amount */}
      {variant === 'full' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Loan Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="loanType"
              className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-light-primary dark:text-dark-primary" />
              Loan Type
            </label>
            <select
              id="loanType"
              {...register('loanType')}
              className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-300"
              disabled={isSubmitting}
            >
              <option value="">Select loan type</option>
              {LOAN_TYPES.map((loan) => (
                <option key={loan.id} value={loan.name}>
                  {loan.name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Loan Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="loanAmount"
              className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
            >
              <IndianRupee className="w-4 h-4 text-light-primary dark:text-dark-primary" />
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loanAmount"
              {...register('loanAmount', {
                min: {
                  value: 100000,
                  message: 'Minimum loan amount is ₹1,00,000',
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.loanAmount
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-light-border dark:border-dark-border focus:ring-light-primary dark:focus:ring-dark-primary'
              } bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 transition-all duration-300`}
              placeholder="e.g., 2500000"
              disabled={isSubmitting}
            />
            <AnimatePresence>
              {errors.loanAmount && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-500 flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-red-500" />
                  {errors.loanAmount.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Message - NO VALIDATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2 flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-light-primary dark:text-dark-primary" />
          Message (Optional)
        </label>
        <textarea
          id="message"
          rows={variant === 'compact' ? 3 : 5}
          {...register('message')}
          className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text placeholder:text-light-textMuted dark:placeholder:text-dark-textMuted focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all duration-300 resize-none"
          placeholder="Tell us about your requirements..."
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-light-textSecondary dark:text-dark-textSecondary">
          Share any additional details about your loan requirements
        </p>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-light-primary via-light-accent to-light-secondary dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary rounded-lg shadow-lg group hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Enquiry
              </>
            )}
          </span>
        </button>
      </motion.div>

      {/* Privacy Notice */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-center text-light-textSecondary dark:text-dark-textSecondary"
      >
        By submitting this form, you agree to our{' '}
        <a
          href="/privacy-policy"
          className="text-light-primary dark:text-dark-primary hover:underline font-medium"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="/terms"
          className="text-light-primary dark:text-dark-primary hover:underline font-medium"
        >
          Terms & Conditions
        </a>
      </motion.p>
    </form>
  );
};

export default EnquiryForm;
