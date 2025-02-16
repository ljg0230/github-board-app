import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AlertModal from '../components/common/AlertModal';
import ConfirmModal from '../components/common/ConfirmModal';

interface ModalState {
  modals: {
    id: string;
    component: React.ComponentType<any>;
    props: any;
  }[];
}

interface AlertOptions {
  title?: string;
  confirmText?: string;
}

interface ConfirmOptions extends AlertOptions {
  cancelText?: string;
  message: string;
}

const ModalContext = createContext<{
  state: ModalState;
  openModal: (id: string, component: React.ComponentType<any>, props?: any) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  alert: (message: string, options?: AlertOptions) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
} | null>(null);

const initialState: ModalState = {
  modals: [],
};

const modalReducer = (state: ModalState, action: any): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: [...state.modals, action.payload],
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: state.modals.filter((modal) => modal.id !== action.payload.id),
      };
    case 'CLOSE_ALL':
      return {
        ...state,
        modals: [],
      };
    default:
      return state;
  }
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const location = useLocation();

  // 라우트 변경 시 모든 모달 닫기
  useEffect(() => {
    closeAllModals();
  }, [location]);

  // 모달 스택이 변경될 때마다 body 스크롤 제어
  useEffect(() => {
    if (state.modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.modals]);

  const openModal = useCallback((id: string, component: React.ComponentType<any>, props: any = {}) => {
    dispatch({ type: 'OPEN_MODAL', payload: { id, component, props } });
  }, []);

  const closeModal = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_MODAL', payload: { id } });
  }, []);

  const closeAllModals = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL' });
  }, []);

  const alert = useCallback((message: string, options: AlertOptions = {}) => {
    const id = `alert-${Date.now()}`;
    openModal(id, AlertModal, {
      message,
      title: options.title,
      confirmText: options.confirmText
    });
  }, [openModal]);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = `confirm-${Date.now()}`;
      openModal(id, ConfirmModal, {
        message: options.message,
        title: options.title,
        confirmText: options.confirmText || '확인',
        cancelText: options.cancelText || '취소',
        onConfirm: () => {
          resolve(true);
          closeModal(id);
        },
        onCancel: () => {
          resolve(false);
          closeModal(id);
        }
      });
    });
  }, [openModal, closeModal]);

  return (
    <ModalContext.Provider value={{ 
      state, 
      openModal, 
      closeModal, 
      closeAllModals,
      alert,
      confirm 
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 