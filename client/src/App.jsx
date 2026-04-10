// Main App Component
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTop from './components/common/BackToTop';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <ScrollToTop />
            <div
              className="min-h-screen bg-light-background dark:bg-dark-background 
                          text-light-text dark:text-dark-text transition-colors duration-300"
            >
              <AppRoutes />
              <BackToTop />
            </div>

            {/* Toast Notifications - Themed */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: '',
                style: {
                  background: 'var(--color-bg-card)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-lg)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--color-success)',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--color-error)',
                    secondary: '#fff',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: 'var(--color-accent-primary)',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
