import { device, element, by, expect } from 'detox';

describe('Gift Cards Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show empty state when no cards exist', async () => {
    // Assuming user is already authenticated or we're testing the cards screen directly
    await expect(element(by.text('No gift cards yet'))).toBeVisible();
    await expect(element(by.text('Add your first gift card'))).toBeVisible();
  });

  it('should navigate to add card screen', async () => {
    await element(by.text('Add Card')).tap();
    await expect(element(by.text('Add Gift Card'))).toBeVisible();
    await expect(element(by.text('Brand'))).toBeVisible();
    await expect(element(by.text('Amount'))).toBeVisible();
    await expect(element(by.text('Expiration Date'))).toBeVisible();
  });

  it('should show validation errors for empty required fields', async () => {
    await element(by.text('Add Card')).tap();
    await element(by.text('Save')).tap();

    // Wait for validation errors to appear
    await expect(element(by.text('Brand is required'))).toBeVisible();
    await expect(element(by.text('Amount is required'))).toBeVisible();
    await expect(element(by.text('Expiration date is required'))).toBeVisible();
  });

  it('should add a new gift card successfully', async () => {
    await element(by.text('Add Card')).tap();
    
    const brandInput = element(by.id('brand-input'));
    const amountInput = element(by.id('amount-input'));
    const saveButton = element(by.text('Save'));

    await brandInput.typeText('Starbucks');
    await amountInput.typeText('50');
    
    // Select expiration date (this might need adjustment based on your date picker implementation)
    await element(by.text('Select Date')).tap();
    await element(by.text('OK')).tap();
    
    await saveButton.tap();

    // Wait for success message or navigation back
    await expect(element(by.text('Gift card added successfully'))).toBeVisible();
  });

  it('should navigate back from add card screen', async () => {
    await element(by.text('Add Card')).tap();
    await expect(element(by.text('Add Gift Card'))).toBeVisible();
    
    await element(by.text('Cancel')).tap();
    await expect(element(by.text('My Cards'))).toBeVisible();
  });

  it('should show card details when tapping on a card', async () => {
    // First add a card
    await element(by.text('Add Card')).tap();
    
    const brandInput = element(by.id('brand-input'));
    const amountInput = element(by.id('amount-input'));
    const saveButton = element(by.text('Save'));

    await brandInput.typeText('Amazon');
    await amountInput.typeText('100');
    await element(by.text('Select Date')).tap();
    await element(by.text('OK')).tap();
    await saveButton.tap();

    // Now tap on the card to view details
    await element(by.text('Amazon')).tap();
    await expect(element(by.text('Card Details'))).toBeVisible();
    await expect(element(by.text('Amazon'))).toBeVisible();
    await expect(element(by.text('$100.00'))).toBeVisible();
  });

  it('should delete a card with confirmation', async () => {
    // Assuming we have a card to delete
    await element(by.text('Amazon')).tap();
    await expect(element(by.text('Card Details'))).toBeVisible();
    
    await element(by.text('Delete')).tap();
    await expect(element(by.text('Delete Card'))).toBeVisible();
    await expect(element(by.text('Are you sure you want to delete this card?'))).toBeVisible();
    
    await element(by.text('Confirm')).tap();
    await expect(element(by.text('Card deleted successfully'))).toBeVisible();
  });
}); 