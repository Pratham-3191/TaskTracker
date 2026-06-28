import React, { useEffect, useState } from 'react';

const Navbar = ({ onNewTaskClick }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header
      style={{
        height: 'var(--navbar-height)',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          width: '100%',
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          padding: '0 var(--space-4)',
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="var(--color-primary)"
            style={{ width: '24px', height: '24px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span className="font-bold text-lg" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
            Task Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted font-medium flex items-center gap-1" style={{ display: 'inline-flex' }}>
            <span>Press</span>
            <kbd
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 6px',
                fontSize: '10px',
                lineHeight: '1',
                boxShadow: 'var(--shadow-sm)',
                fontFamily: 'monospace',
              }}
            >
              N
            </kbd>
            <span>to Add</span>
          </span>

          <button
            className="btn-icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title="Toggle theme"
            style={{ width: '36px', height: '36px', border: '1px solid var(--color-border)' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button className="btn btn-primary btn-sm" onClick={onNewTaskClick}>
            + New Task
          </button>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          header > div {
            padding: 0 var(--space-6) !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
