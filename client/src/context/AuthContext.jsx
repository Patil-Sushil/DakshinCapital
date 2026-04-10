// Auth Context - Manages authentication state
import { createContext, useState, useEffect } from 'react';
import { onAuthChange, logout as logoutService } from '../services/auth.service';
import { PageLoader } from '../components/common/Loader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-logout after inactivity (30 minutes)
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  let inactivityTimer;

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    if (user) {
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  };

  // Listen for user activity
  useEffect(() => {
    if (user) {
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

      events.forEach((event) => {
        window.addEventListener(event, resetInactivityTimer);
      });

      resetInactivityTimer();

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, resetInactivityTimer);
        });
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      };
    }
  }, [user]);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutService();
      setUser(null);
      setError(null);
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <PageLoader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
