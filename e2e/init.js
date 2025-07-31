const { device, element, by, expect } = require('detox');

describe('Giftly App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show welcome screen', async () => {
    await expect(element(by.text('CardNest'))).toBeVisible();
  });

  it('should navigate to add card screen', async () => {
    await element(by.text('+ Add Card')).tap();
    await expect(element(by.text('Add New Card'))).toBeVisible();
  });

  it('should add a new card', async () => {
    await element(by.text('+ Add Card')).tap();
    
    await element(by.label('Brand or store name')).typeText('Test Store');
    await element(by.label('Card amount')).typeText('100');
    await element(by.label('Currency code')).typeText('USD');
    await element(by.label('Card expiration date')).typeText('2024-12-31');
    await element(by.label('Last 4 digits of card number')).typeText('1234');
    
    await element(by.text('Add Card')).tap();
    
    await expect(element(by.text('Success'))).toBeVisible();
  });

  it('should show card details', async () => {
    await element(by.text('Test Store')).tap();
    await expect(element(by.text('Card Details'))).toBeVisible();
    await expect(element(by.text('$100.00'))).toBeVisible();
  });

  it('should delete a card', async () => {
    await element(by.text('Test Store')).tap();
    
    await element(by.text('Delete Card')).tap();
    
    await element(by.text('Delete')).tap();
    
    await expect(element(by.text('CardNest'))).toBeVisible();
  });
}); 