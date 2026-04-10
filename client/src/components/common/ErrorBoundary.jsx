// Error Boundary Component - Catches React errors
import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div
              className="w-20 h-20 bg-light-error/10 dark:bg-dark-error/10 rounded-full 
                          flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-10 h-10 text-light-error dark:text-dark-error" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-light-text dark:text-dark-text mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary
                  className="cursor-pointer text-light-textSecondary dark:text-dark-textSecondary 
                                  hover:text-light-primary dark:hover:text-dark-primary"
                >
                  Error Details (Development Only)
                </summary>
                <pre
                  className="mt-4 p-4 bg-light-surface dark:bg-dark-surface rounded-lg 
                              text-xs overflow-auto text-light-text dark:text-dark-text"
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
