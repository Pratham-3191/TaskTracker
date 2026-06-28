import React from 'react';

const Loading = ({ type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
          width: '100%',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="card flex flex-col justify-between"
            style={{
              minHeight: '220px',
              gap: 'var(--space-4)',
              borderLeft: '4px solid var(--color-border)',
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>
              <div className="skeleton" style={{ height: '14px', width: '90%' }}></div>
              <div className="skeleton" style={{ height: '14px', width: '80%' }}></div>
            </div>
            <div className="flex flex-col gap-3" style={{ marginTop: 'auto' }}>
              <div className="flex justify-between items-center">
                <div className="skeleton" style={{ height: '18px', width: '80px' }}></div>
                <div className="skeleton" style={{ height: '18px', width: '60px' }}></div>
              </div>
              <hr className="divider" style={{ margin: 0 }} />
              <div className="flex justify-between items-center">
                <div className="skeleton" style={{ height: '14px', width: '70px' }}></div>
                <div className="flex gap-2">
                  <div className="skeleton" style={{ height: '32px', width: '50px', borderRadius: 'var(--radius-md)' }}></div>
                  <div className="skeleton" style={{ height: '32px', width: '60px', borderRadius: 'var(--radius-md)' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full" style={{ minHeight: '260px' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--color-border)',
          borderTop: '3px solid var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
