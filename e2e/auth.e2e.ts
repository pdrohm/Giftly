import { device, element, by, expect } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show sign in screen on app launch', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
    await expect(element(by.text('Email'))).toBeVisible();
    await expect(element(by.text('Password'))).toBeVisible();
  });

  it('should navigate to sign up screen', async () => {
    await element(by.text('Create Account')).tap();
    await expect(element(by.text('Sign Up'))).toBeVisible();
  });

  it('should show validation errors for invalid email', async () => {
    const emailInput = element(by.id('email-input'));
    const passwordInput = element(by.id('password-input'));
    const signInButton = element(by.text('Sign In'));

    await emailInput.typeText('invalid-email');
    await passwordInput.typeText('password123');
    await signInButton.tap();

    await expect(element(by.text('Please enter a valid email'))).toBeVisible();
  });

  it('should show validation errors for empty fields', async () => {
    const signInButton = element(by.text('Sign In'));
    await signInButton.tap();

    await expect(element(by.text('Email is required'))).toBeVisible();
    await expect(element(by.text('Password is required'))).toBeVisible();
  });

  it('should navigate back to sign in from sign up', async () => {
    await element(by.text('Create Account')).tap();
    await expect(element(by.text('Sign Up'))).toBeVisible();
    
    await element(by.text('Already have an account?')).tap();
    await expect(element(by.text('Sign In'))).toBeVisible();
  });
}); 