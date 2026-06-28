import React from 'react';

const SearchBar = ({ value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex-grow-1 flex-1" style={{ position: 'relative' }}>
      <label htmlFor="search-tasks" className="sr-only">Search Tasks</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="var(--color-text-muted)"
          style={{
            position: 'absolute',
            left: '14px',
            width: '16px',
            height: '16px',
            pointerEvents: 'none',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          id="search-tasks"
          type="text"
          className="form-input"
          style={{ paddingLeft: '40px', paddingRight: value ? '36px' : '14px' }}
          placeholder="Search tasks by title..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '12px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            aria-label="Clear search query"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
