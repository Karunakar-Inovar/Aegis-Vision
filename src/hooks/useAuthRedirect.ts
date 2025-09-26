import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Custom hook that redirects to login if user is not authenticated
 * @param redirectTo - Optional path to redirect to after successful login (defaults to current path)
 * @returns Object containing user, loading state, and authentication status
 */
export const useAuthRedirect = (redirectTo?: string) => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;

    // If no session/user, redirect to login with return path
    if (!session || !user) {
      const returnPath = redirectTo || location.pathname;
      navigate('/login', { 
        state: { from: { pathname: returnPath } },
        replace: true 
      });
    }
  }, [user, session, loading, navigate, location.pathname, redirectTo]);

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user && !!session,
  };
};
