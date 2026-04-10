// Professional Toast Notification System
// Theme-aware, animated, and customizable toast messages
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, Trash2, Plus, Edit, Send } from 'lucide-react';

// Custom toast configuration
const toastConfig = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '400px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// Success Toast
export const showSuccess = (message, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Success!</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    { duration: options.duration || 4000, position: options.position || 'top-right' }
  );
};

// Error Toast
export const showError = (message, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Error!</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    { duration: options.duration || 5000, position: options.position || 'top-right' }
  );
};

// Warning Toast
export const showWarning = (message, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Warning!</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    { duration: options.duration || 4000, position: options.position || 'top-right' }
  );
};

// Info Toast
export const showInfo = (message, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Info</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    { duration: options.duration || 4000, position: options.position || 'top-right' }
  );
};

// Loading Toast
export const showLoading = (message = 'Loading...') => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{message}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
};

// Promise Toast (for async operations)
export const showPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred',
    },
    {
      style: {
        minWidth: '250px',
        borderRadius: '12px',
        background: 'var(--color-bg-surface)',
        color: 'var(--color-text-primary)',
      },
      success: {
        duration: 4000,
        icon: '✅',
      },
      error: {
        duration: 5000,
        icon: '❌',
      },
    }
  );
};

// Specific action toasts
export const toastActions = {
  // Enquiry actions
  enquiryCreated: () => showSuccess('Enquiry submitted successfully! We will contact you soon.'),
  enquiryDeleted: () => showSuccess('Enquiry deleted successfully'),
  enquiryUpdated: () => showSuccess('Enquiry status updated successfully'),

  // Project actions
  projectCreated: () => showSuccess('Project created successfully'),
  projectDeleted: () => showSuccess('Project deleted successfully'),
  projectUpdated: () => showSuccess('Project updated successfully'),

  // Gallery actions
  imageUploaded: () => showSuccess('Image uploaded successfully'),
  imageDeleted: () => showSuccess('Image deleted successfully'),
  imagesUploaded: (count) => showSuccess(`${count} images uploaded successfully`),

  // Auth actions
  loginSuccess: () => showSuccess('Welcome back! Login successful'),
  logoutSuccess: () => showSuccess('Logged out successfully'),
  loginError: () => showError('Invalid credentials. Please try again'),

  // Generic actions
  saved: () => showSuccess('Changes saved successfully'),
  deleted: () => showSuccess('Deleted successfully'),
  updated: () => showSuccess('Updated successfully'),
  copied: () => showSuccess('Copied to clipboard'),

  // Errors
  networkError: () => showError('Network error. Please check your connection'),
  serverError: () => showError('Server error. Please try again later'),
  validationError: (message) => showError(message || 'Please check your input'),
};

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  promise: showPromise,
  actions: toastActions,
};
