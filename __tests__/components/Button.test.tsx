import React from 'react';
import { render, fireEvent } from '../utils/test-utils';
import { Button } from '../../src/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} />);
    
    fireEvent.press(getByText('Test Button'));
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with primary variant', () => {
    const { getByText } = render(
      <Button title="Primary Button" onPress={() => {}} variant="primary" />
    );
    
    expect(getByText('Primary Button')).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    const { getByText } = render(
      <Button title="Secondary Button" onPress={() => {}} variant="secondary" />
    );
    
    expect(getByText('Secondary Button')).toBeTruthy();
  });

  it('renders with danger variant', () => {
    const { getByText } = render(
      <Button title="Danger Button" onPress={() => {}} variant="danger" />
    );
    
    expect(getByText('Danger Button')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Disabled Button" onPress={mockOnPress} disabled />
    );
    
    const button = getByText('Disabled Button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading state when loading prop is true', () => {
    const { getByTestId } = render(
      <Button title="Loading Button" onPress={() => {}} loading />
    );
    
    // Check that the button is disabled when loading
    const button = getByTestId('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('does not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Loading Button" onPress={mockOnPress} loading />
    );
    
    const button = getByTestId('button');
    fireEvent.press(button);
    
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Button title="Custom Button" onPress={() => {}} style={customStyle} />
    );
    
    expect(getByText('Custom Button')).toBeTruthy();
  });
}); 