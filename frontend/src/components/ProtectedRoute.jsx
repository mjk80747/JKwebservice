import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        color: 'var(--gold)',
        fontFamily: 'var(--font-heading)'
      }}>
        <h2>Verifying access permissions...</h2>
      </div>
    );
  }

  if (!user) {
    // If not logged in, redirect to appropriate login page
    return <Navigate to={adminOnly ? '/admin/login' : '/login'} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // If admin route and user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
