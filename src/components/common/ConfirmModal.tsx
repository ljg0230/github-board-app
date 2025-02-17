import React from 'react';
import { Button, Stack } from 'react-bootstrap';

interface ConfirmModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onClose
}) => {
  return (
    <div style={{ minWidth: '300px' }}>
      {title && <h4 className="mb-3 text-center">{title}</h4>}
      <p className="mb-4 text-center" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'pre-line' }}>
        {message}
      </p>
      <Stack direction="horizontal" gap={5} className="justify-content-center">
        <Button 
          variant="secondary" 
          onClick={onClose}
          style={{ minWidth: '100px', padding: '8px 16px' }}
        >
          {cancelText}
        </Button>
        <Button 
          variant="primary" 
          onClick={onConfirm}
          style={{ minWidth: '100px', padding: '8px 16px' }}
        >
          {confirmText}
        </Button>
      </Stack>
    </div>
  );
};

export default ConfirmModal; 