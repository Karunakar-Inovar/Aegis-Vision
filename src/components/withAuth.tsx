import React from 'react';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface WithAuthOptions {
  loadingMessage?: string;
}

/**
 * Higher-order component that adds authentication protection to any component
 * @param WrappedComponent - The component to protect
 * @param options - Configuration options
 * @returns Protected component with authentication checks
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { loadingMessage = 'Loading...' } = options;

  const AuthenticatedComponent = (props: P) => {
    const { loading, isAuthenticated } = useAuthRedirect();

    // Show loading state while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-white text-lg">{loadingMessage}</p>
          </div>
        </div>
      );
    }

    // Don't render if not authenticated (redirect will happen in useAuthRedirect)
    if (!isAuthenticated) {
      return null;
    }

    // User is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}
