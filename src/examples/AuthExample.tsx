import React from 'react';
import { withAuth } from '@/components/withAuth';
import MainLayout from '@/components/MainLayout';

// Example of a simple page component
const ExamplePage: React.FC = () => {
  return (
    <MainLayout activeModule="example">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Example Page</h1>
        <p className="text-gray-300">
          This page is protected by authentication. You can only see this if you're logged in.
        </p>
      </div>
    </MainLayout>
  );
};

// Export the component wrapped with authentication protection
// This is the easiest way to protect any page component
export default withAuth(ExamplePage, {
  loadingMessage: 'Loading example page...'
});

// Alternative usage - you can also use the hook directly:
/*
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const ExamplePageWithHook: React.FC = () => {
  const { loading, isAuthenticated } = useAuthRedirect();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <MainLayout activeModule="example">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Example Page</h1>
        <p className="text-gray-300">
          This page is protected by authentication.
        </p>
      </div>
    </MainLayout>
  );
};
*/
