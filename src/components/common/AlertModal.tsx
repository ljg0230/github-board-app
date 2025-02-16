import React from 'react';
import { Button, Stack } from 'react-bootstrap';

interface AlertModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  message,
  confirmText = '확인',
  onClose
}) => {
  return (
    <div style={{ minWidth: '300px' }}>
      {title && <h4 className="mb-3 text-center">{title}</h4>}
      <p className="mb-4 text-center" style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'pre-line' }}>
        {message}
      </p>
      <Stack direction="horizontal" gap={3} className="justify-content-center">
        <Button 
          variant="primary" 
          onClick={onClose}
          style={{ minWidth: '100px', padding: '8px 16px' }}
        >
          {confirmText}
        </Button>
      </Stack>
    </div>
  );
};

export default AlertModal; 