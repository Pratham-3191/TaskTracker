import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, hasNextPage, hasPrevPage, total } = pagination;

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between flex-wrap gap-4"
      style={{ padding: 'var(--space-3) 0', borderTop: '1px solid var(--color-border)' }}
      aria-label="Pagination Navigation"
    >
      <div className="text-sm text-muted">
        Showing page <span className="font-semibold text-primary" style={{ color: 'var(--color-text-primary)' }}>{page}</span> of{' '}
        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{totalPages}</span> ({total} tasks total)
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          aria-label="Previous Page"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1;
          const isCurrent = pageNum === page;
          return (
            <button
              key={pageNum}
              className={`btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
              style={{ minWidth: '32px' }}
              onClick={() => onPageChange(pageNum)}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Go to page ${pageNum}`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
