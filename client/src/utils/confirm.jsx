// Professional Confirm Dialog System
// Theme-aware, animated confirmation dialogs
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, Info, AlertCircle } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'danger',
  confirmText,
  cancelText,
}) => {
  const icons = {
    danger: Trash2,
    warning: AlertTriangle,
    info: Info,
    default: AlertCircle,
  };

  const colors = {
    danger: {
      icon: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
      button: 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700',
    },
    warning: {
      icon: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      button: 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700',
    },
    info: {
      icon: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
    },
    default: {
      icon: 'text-gray-600 dark:text-gray-400',
      bg: 'bg-gray-100 dark:bg-gray-900/30',
      button: 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700',
    },
  };

  const Icon = icons[type] || icons.default;
  const colorScheme = colors[type] || colors.default;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10"
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-16 h-16 rounded-full ${colorScheme.bg} flex items-center justify-center`}
              >
                <Icon className={`w-8 h-8 ${colorScheme.icon}`} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {title}
            </h3>

            {/* Message */}
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">{message}</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {cancelText || 'Cancel'}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 px-4 py-2.5 ${colorScheme.button} text-white rounded-lg font-medium transition-colors`}
              >
                {confirmText || 'Confirm'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Create a promise-based confirm function
export const confirm = ({
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  type = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
} = {}) => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleClose = () => {
      root.unmount();
      document.body.removeChild(container);
      resolve(false);
    };

    const handleConfirm = () => {
      root.unmount();
      document.body.removeChild(container);
      resolve(true);
    };

    root.render(
      <ConfirmDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={title}
        message={message}
        type={type}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    );
  });
};

// Specific confirm dialogs
export const confirmDelete = (itemName = 'this item') => {
  return confirm({
    title: 'Delete Confirmation',
    message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
    type: 'danger',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  });
};

export const confirmAction = (action, itemName) => {
  return confirm({
    title: `${action} Confirmation`,
    message: `Are you sure you want to ${action.toLowerCase()} ${itemName}?`,
    type: 'warning',
    confirmText: action,
    cancelText: 'Cancel',
  });
};

export const confirmLogout = () => {
  return confirm({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    type: 'info',
    confirmText: 'Logout',
    cancelText: 'Stay',
  });
};

export default confirm;
