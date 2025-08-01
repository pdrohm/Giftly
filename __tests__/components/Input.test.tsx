import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { Input } from '../../src/components/ui/Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('calls onChange when text is entered', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={mockOnChange} />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'test input');
    
    expect(mockOnChange).toHaveBeenCalledWith('test input');
  });

  it('renders with label', () => {
    const { getByText } = render(<Input label="Email" placeholder="Enter email" />);
    
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders with error message', () => {
    const { getByText } = render(
      <Input placeholder="Enter text" error="This field is required" />
    );
    
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('renders with secure text entry', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter password" secureTextEntry />
    );
    
    const input = getByPlaceholderText('Enter password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" style={customStyle} />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with testID', () => {
    const { getByTestId } = render(
      <Input placeholder="Enter text" testID="email-input" />
    );
    
    expect(getByTestId('email-input')).toBeTruthy();
  });
}); 