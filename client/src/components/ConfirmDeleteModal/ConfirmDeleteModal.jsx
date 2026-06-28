import React, { useEffect, useRef } from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, taskTitle, submitting }) => {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelBtnRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <div className="modal-header">
          <h2 id="delete-modal-title" className="modal-title">Delete Task</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1',
              padding: '4px',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body flex flex-col gap-2">
          <p className="text-sm text-muted" style={{ lineHeight: '1.5' }}>
            Are you sure you want to delete <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>"{taskTitle}"</span>?
          </p>
          <p className="text-xs text-danger" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button
            ref={cancelBtnRef}
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
