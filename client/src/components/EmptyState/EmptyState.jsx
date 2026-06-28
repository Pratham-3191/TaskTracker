import React from 'react';

const EmptyState = ({ message = 'No tasks found', onClearFilters }) => {
  return (
    <div
      className="card flex flex-col items-center justify-center text-center"
      style={{ minHeight: '300px', width: '100%', gap: 'var(--space-3)' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="var(--color-text-muted)"
        style={{ width: '48px', height: '48px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-1.103-.897-2-2-2h-3.5c-1.103 0-2 .897-2 2v2.625c0 .621.504 1.125 1.125 1.125h3.375m1.5 1.5h-.008v.008H12v-.008zM12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
        {message}
      </h3>
      <p className="text-sm text-muted" style={{ maxWidth: '340px', margin: '0 auto var(--space-2)' }}>
        Try adjusting your filters, search query, or add a new task to populate the dashboard.
      </p>
      {onClearFilters && (
        <button className="btn btn-secondary btn-sm" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
