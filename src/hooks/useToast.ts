import { useCallback } from 'react';
import { toastService } from '../services/ToastService';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const useToast = () => {
  const showToast = useCallback((options: ToastOptions) => {
    toastService.show(options);
  }, []);

  const showSuccess = useCallback((message: string, title?: string) => {
    toastService.success(message, title);
  }, []);

  const showError = useCallback((message: string, title?: string) => {
    toastService.error(message, title);
  }, []);

  const showInfo = useCallback((message: string, title?: string) => {
    toastService.info(message, title);
  }, []);

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
  };
}; 