// Enquiry Form Component - Contact/Enquiry form with validation
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { LOAN_TYPES, VALIDATION } from '../../utils/constants';
import { submitEnquiry } from '../../services/enquiry.service';

const EnquiryForm = ({ variant = 'full' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      toast.success(
        'Thank you! Your enquiry has been submitted successfully. We will contact you soon.',
        { duration: 5000 }
      );

      reset();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
        >
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
          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email and Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
          >
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
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
          >
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
            className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="9876543210"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Loan Type and Amount */}
      {variant === 'full' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Loan Type */}
          <div>
            <label
              htmlFor="loanType"
              className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
            >
              Loan Type
            </label>
            <select
              id="loanType"
              {...register('loanType')}
              className="input-field"
              disabled={isSubmitting}
            >
              <option value="">Select loan type</option>
              {LOAN_TYPES.map((loan) => (
                <option key={loan.id} value={loan.name}>
                  {loan.name}
                </option>
              ))}
            </select>
          </div>

          {/* Loan Amount */}
          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
            >
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
              className={`input-field ${errors.loanAmount ? 'border-red-500' : ''}`}
              placeholder="e.g., 2500000"
              disabled={isSubmitting}
            />
            {errors.loanAmount && (
              <p className="mt-1 text-sm text-red-500">{errors.loanAmount.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={variant === 'compact' ? 3 : 5}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: VALIDATION.message.minLength,
              message: VALIDATION.message.message,
            },
            maxLength: {
              value: VALIDATION.message.maxLength,
              message: VALIDATION.message.message,
            },
          })}
          className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
          placeholder="Tell us about your requirements..."
          disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        <p className="mt-1 text-xs text-light-textSecondary dark:text-dark-textSecondary">
          {VALIDATION.message.minLength} - {VALIDATION.message.maxLength} characters
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gold"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
        loading={isSubmitting}
        icon={isSubmitting ? Loader2 : Send}
        iconPosition="right"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>

      {/* Privacy Notice */}
      <p className="text-xs text-center text-light-textSecondary dark:text-dark-textSecondary">
        By submitting this form, you agree to our{' '}
        <a
          href="/privacy-policy"
          className="text-light-primary dark:text-dark-primary hover:underline"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="text-light-primary dark:text-dark-primary hover:underline">
          Terms & Conditions
        </a>
      </p>
    </form>
  );
};

export default EnquiryForm;
