import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service in production if needed
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ minHeight: '100vh', padding: 'var(--space-6)' }}
        >
          <div
            className="card p-8 flex flex-col items-center gap-4"
            style={{ maxWidth: '440px', width: '100%' }}
          >
            <div
              style={{
                fontSize: '32px',
                lineHeight: '1',
                padding: 'var(--space-2)',
                backgroundColor: 'var(--color-danger-light)',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            >
              ⚠️
            </div>
            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
              Something went wrong
            </h2>
            <p className="text-sm text-muted">
              An unexpected client error occurred. The application was forced to stop to prevent data corruption.
            </p>
            {this.state.error?.message && (
              <pre
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '11px',
                  color: 'var(--color-danger)',
                  overflowX: 'auto',
                  textAlign: 'left',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button className="btn btn-primary w-full" onClick={handleReset}>
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
