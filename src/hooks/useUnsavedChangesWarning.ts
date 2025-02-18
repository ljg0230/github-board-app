import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import { useModal } from '@/contexts/ModalContext';

const useUnsavedChangesWarning = (hasUnsavedChanges: boolean) => {
  const { confirm } = useModal();

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      !hasUnsavedChanges ||
      currentLocation.pathname === nextLocation.pathname
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const checkNavigation = async () => {
      if (blocker.state === 'blocked') {
        const shouldProceed = await confirm({
          title: '작성 중인 내용이 있습니다.',
          message:
            '이 페이지를 벗어나면 작성 중인 내용이 사라집니다.\n\n이동하시겠습니까?',
          confirmText: '이동하기',
          cancelText: '취소'
        });

        if (shouldProceed) {
          blocker.proceed();
        } else {
          blocker.reset();
        }
      }
    };

    checkNavigation();
  }, [blocker, confirm]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // 브라우저 기본 메시지 표시
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
};

export default useUnsavedChangesWarning;
