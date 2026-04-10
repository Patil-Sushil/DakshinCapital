// 404 Not Found Page
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background pt-20">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <h1 className="text-9xl font-heading font-bold text-light-primary dark:text-dark-primary">
              404
            </h1>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button icon={Home} iconPosition="left">
                Go to Homepage
              </Button>
            </Link>
            <Button
              variant="outline"
              icon={ArrowLeft}
              iconPosition="left"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
              You might be looking for:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/services"
                className="text-sm text-light-primary dark:text-dark-primary hover:underline"
              >
                Our Services
              </Link>
              <Link
                to="/emi-calculator"
                className="text-sm text-light-primary dark:text-dark-primary hover:underline"
              >
                EMI Calculator
              </Link>
              <Link
                to="/contact"
                className="text-sm text-light-primary dark:text-dark-primary hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
