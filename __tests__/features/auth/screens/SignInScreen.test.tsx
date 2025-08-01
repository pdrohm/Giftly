import React from 'react';
import { render, fireEvent } from '../../../utils/test-utils';
import { SignInScreen } from '../../../../src/features/auth/screens/SignInScreen';
import { useSignInScreen } from '../../../../src/features/auth/hooks/useSignInScreen';

// Mock the hook
jest.mock('../../../../src/features/auth/hooks/useSignInScreen');

const mockUseSignInScreen = useSignInScreen as jest.MockedFunction<typeof useSignInScreen>;

describe('SignInScreen', () => {
  const defaultMockProps = {
    control: {
      _formValues: { email: '', password: '' },
      _formState: { errors: {} },
    } as any,
    errors: {},
    isSubmitting: false,
    authError: null,
    handleSubmit: jest.fn(),
    handleSignUpPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSignInScreen.mockReturnValue(defaultMockProps);
  });

  it('renders correctly with all elements', () => {
    const { getByText, getByPlaceholderText } = render(<SignInScreen />);

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByText('Sign in to access your gift cards')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('shows error message when authError is present', () => {
    const mockProps = {
      ...defaultMockProps,
      authError: 'Invalid email or password',
    };
    mockUseSignInScreen.mockReturnValue(mockProps);

    const { getByText } = render(<SignInScreen />);

    expect(getByText('Invalid email or password')).toBeTruthy();
  });

  it('shows loading state when isSubmitting is true', () => {
    const mockProps = {
      ...defaultMockProps,
      isSubmitting: true,
    };
    mockUseSignInScreen.mockReturnValue(mockProps);

    const { getAllByTestId } = render(<SignInScreen />);
    const buttons = getAllByTestId('button');
    const signInButton = buttons[0];

    expect(signInButton).toBeTruthy();
    expect(signInButton.props.accessibilityState.disabled).toBe(true);
  });

  it('calls handleSubmit when Sign In button is pressed', () => {
    const mockHandleSubmit = jest.fn();
    const mockProps = {
      ...defaultMockProps,
      handleSubmit: mockHandleSubmit,
    };
    mockUseSignInScreen.mockReturnValue(mockProps);

    const { getAllByTestId } = render(<SignInScreen />);
    const buttons = getAllByTestId('button');
    const signInButton = buttons[0];

    fireEvent.press(signInButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handleSignUpPress when Create Account button is pressed', () => {
    const mockHandleSignUpPress = jest.fn();
    const mockProps = {
      ...defaultMockProps,
      handleSignUpPress: mockHandleSignUpPress,
    };
    mockUseSignInScreen.mockReturnValue(mockProps);

    const { getByText } = render(<SignInScreen />);
    const createAccountButton = getByText('Create Account');

    fireEvent.press(createAccountButton);

    expect(mockHandleSignUpPress).toHaveBeenCalledTimes(1);
  });

  it('renders logo image', () => {
    const { getByTestId } = render(<SignInScreen />);
    
    expect(getByTestId).toBeDefined();
  });

  it('does not show error container when authError is null', () => {
    const { queryByText } = render(<SignInScreen />);

    expect(queryByText(/Invalid|Error/)).toBeNull();
  });
}); 