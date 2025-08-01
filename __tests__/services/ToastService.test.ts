import { toastService } from '../../src/services/ToastService';
import Toast from 'react-native-toast-message';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('ToastService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('show method', () => {
    it('should call Toast.show with correct parameters', () => {
      const options = {
        title: 'Test Title',
        message: 'Test Message',
        type: 'success' as const,
      };

      toastService.show(options);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Test Title',
        text2: 'Test Message',
        position: 'top',
        visibilityTime: 3000,
      });
    });

    it('should use default title when title is not provided', () => {
      const options = {
        message: 'Test Message',
        type: 'error' as const,
      };

      toastService.show(options);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error',
        text2: 'Test Message',
        position: 'top',
        visibilityTime: 3000,
      });
    });

    it('should use info as default type', () => {
      const options = {
        message: 'Test Message',
      };

      toastService.show(options);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: 'Info',
        text2: 'Test Message',
        position: 'top',
        visibilityTime: 3000,
      });
    });
  });

  describe('success method', () => {
    it('should call show with success type', () => {
      const message = 'Success message';
      const title = 'Custom Success';

      toastService.success(message, title);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Custom Success',
        text2: 'Success message',
        position: 'top',
        visibilityTime: 3000,
      });
    });

    it('should use default success title when title is not provided', () => {
      const message = 'Success message';

      toastService.success(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Success',
        text2: 'Success message',
        position: 'top',
        visibilityTime: 3000,
      });
    });
  });

  describe('error method', () => {
    it('should call show with error type', () => {
      const message = 'Error message';
      const title = 'Custom Error';

      toastService.error(message, title);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Custom Error',
        text2: 'Error message',
        position: 'top',
        visibilityTime: 3000,
      });
    });

    it('should use default error title when title is not provided', () => {
      const message = 'Error message';

      toastService.error(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error',
        text2: 'Error message',
        position: 'top',
        visibilityTime: 3000,
      });
    });
  });

  describe('info method', () => {
    it('should call show with info type', () => {
      const message = 'Info message';
      const title = 'Custom Info';

      toastService.info(message, title);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: 'Custom Info',
        text2: 'Info message',
        position: 'top',
        visibilityTime: 3000,
      });
    });

    it('should use default info title when title is not provided', () => {
      const message = 'Info message';

      toastService.info(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: 'Info',
        text2: 'Info message',
        position: 'top',
        visibilityTime: 3000,
      });
    });
  });

  describe('getDefaultTitle method', () => {
    it('should return correct default titles for each type', () => {
      const successOptions = { message: 'test', type: 'success' as const };
      const errorOptions = { message: 'test', type: 'error' as const };
      const infoOptions = { message: 'test', type: 'info' as const };

      toastService.show(successOptions);
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({ text1: 'Success' })
      );

      toastService.show(errorOptions);
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({ text1: 'Error' })
      );

      toastService.show(infoOptions);
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({ text1: 'Info' })
      );
    });
  });
}); 