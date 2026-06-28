import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight: 'calc(100vh - 120px)', padding: 'var(--space-6)' }}
    >
      <h1
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'var(--font-weight-bold)',
          marginBottom: 'var(--space-3)',
          color: 'var(--color-primary)',
        }}
      >
        404
      </h1>
      <h2
        className="font-semibold text-lg"
        style={{ marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}
      >
        Page Not Found
      </h2>
      <p
        className="text-sm text-muted"
        style={{ marginBottom: 'var(--space-6)', maxWidth: '400px' }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
