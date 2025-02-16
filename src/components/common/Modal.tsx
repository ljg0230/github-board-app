import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from 'focus-trap-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, returnFocusRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <FocusTrap>
      <div
        className="modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={modalRef}
          className="modal-content"
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};

export default Modal; 