import Toast from 'react-native-toast-message';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

class ToastService {
  show(options: ToastOptions): void {
    const { title, message, type = 'info' } = options;
    
    Toast.show({
      type: type,
      text1: title || this.getDefaultTitle(type),
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  }

  success(message: string, title?: string): void {
    this.show({ title, message, type: 'success' });
  }

  error(message: string, title?: string): void {
    this.show({ title, message, type: 'error' });
  }

  info(message: string, title?: string): void {
    this.show({ title, message, type: 'info' });
  }

  private getDefaultTitle(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'info':
        return 'Info';
      default:
        return 'Message';
    }
  }
}

export const toastService = new ToastService(); 