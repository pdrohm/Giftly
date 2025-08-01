import { renderHook, act } from '@testing-library/react-native';
import { useSignInScreen } from '../../../../src/features/auth/hooks/useSignInScreen';
import { useAppDispatch } from '../../../../src/hooks/useAppDispatch';
import { useAppSelector } from '../../../../src/hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';

// Mock dependencies
jest.mock('../../../../src/hooks/useAppDispatch');
jest.mock('../../../../src/hooks/useAppSelector');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../../../../src/store/slices/authSlice', () => ({
  signIn: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>;

describe('useSignInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
    });
    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
    } as any);
  });

  it('should return form control and handlers', () => {
    const { result } = renderHook(() => useSignInScreen());

    expect(result.current.control).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.authError).toBe(null);
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.handleSignUpPress).toBeDefined();
  });

  it('should show loading state when auth is loading', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => useSignInScreen());

    expect(result.current.isSubmitting).toBe(true);
  });

  it('should show error when auth has error', () => {
    const mockError = 'Invalid credentials';
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useSignInScreen());

    expect(result.current.authError).toBe(mockError);
  });

  it('should navigate to SignUp when handleSignUpPress is called', () => {
    const { result } = renderHook(() => useSignInScreen());

    act(() => {
      result.current.handleSignUpPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });

  it('should dispatch signIn action when form is submitted', () => {
    const { result } = renderHook(() => useSignInScreen());

    const formData = {
      email: 'test@example.com',
      password: 'password123',
    };

    act(() => {
      result.current.handleSubmit(formData as any);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should have default form values', () => {
    const { result } = renderHook(() => useSignInScreen());

    // The form should be initialized with empty values
    expect(result.current.control._formValues).toEqual({
      email: '',
      password: '',
    });
  });
}); 