import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import Modal from '@/components/common/Modal';

const ModalManager: React.FC = () => {
  const { state, closeModal } = useModal();

  return (
    <>
      {state.modals.map(({ id, component: Component, props }) => (
        <Modal key={id} isOpen={true} onClose={() => closeModal(id)}>
          <Component {...props} onClose={() => closeModal(id)} />
        </Modal>
      ))}
    </>
  );
};

export default ModalManager;
