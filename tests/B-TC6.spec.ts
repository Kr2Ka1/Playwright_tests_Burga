import { test, expect } from '@playwright/test';

async function addProductsToCart(page) {
  const allCollection = page.locator('.embla__container > [href="/collections/all"]');
  await expect(allCollection).toBeVisible();
  await allCollection.click();

  const firstAddToCart = page.locator('.btn-reset.col-thumb-btn.col-thumb-btn--atc').first();
  await expect(firstAddToCart).toBeVisible();
  await firstAddToCart.click();

  const travelMugs = page.locator('.embla__container > [href="/collections/travel-mugs"]');
  await expect(travelMugs).toBeVisible();
  await travelMugs.click();

  await expect(firstAddToCart).toBeVisible();
  await firstAddToCart.click();
}

test.describe('6. Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });
  });

  test('6.1 Proceed to checkout, without signing in', async ({ page }) => {
    await addProductsToCart(page);

    const cartButton = page.locator('.js-wbsk-sidebar-cart__open.mh__button.mh__button--cart');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    const cartModal = page.locator('.modal-sidebar');
    await expect(cartModal).toBeVisible();

    const checkoutButton = page.locator('.js-goto-checkout');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    // Select "Latvia" from the dropdown
    const countryDropdown = page.locator('.ZHJU6');
    await expect(countryDropdown).toBeVisible();
    await countryDropdown.selectOption({ label: 'Latvia' });

    const emailField = page.locator('._7ozb2uq').nth(0);
    await expect(emailField).toHaveAttribute('placeholder', 'Email');
    await emailField.fill('Vard@test.lko');

    const marketingOptIn = page.locator('#marketing_opt_in');
    await expect(marketingOptIn).toBeVisible();
    await marketingOptIn.click();

    const firstNameField = page.locator('._7ozb2uq').nth(1);
    await expect(firstNameField).toHaveAttribute('placeholder', 'First name');
    await firstNameField.fill('Vardenė');

    const lastNameField = page.locator('._7ozb2uq').nth(2);
    await expect(lastNameField).toHaveAttribute('placeholder', 'Last name');
    await lastNameField.fill('Pavardenė');

    const addressField = page.locator('._7ozb2uq').nth(3);
    await expect(addressField).toHaveAttribute('placeholder', 'Address');
    await addressField.fill('Testinė g. 5');

    const cityField = page.locator('._7ozb2uq').nth(4);
    await expect(cityField).toHaveAttribute('placeholder', 'City');
    await cityField.fill('Testaunas');

    const postalCodeField = page.locator('._7ozb2uq').nth(5);
    await expect(postalCodeField).toHaveAttribute('placeholder', 'Postal code');
    await postalCodeField.fill('01234');

    const phoneField = page.locator('._7ozb2uq').nth(6);
    await expect(phoneField).toHaveAttribute('placeholder', 'Phone');
    await phoneField.fill('61234567');

    const standardDelivery = page.locator('.yyi4nyv').nth(0);
    await expect(standardDelivery).toBeVisible();
    await expect(standardDelivery).toContainText('Standard Delivery');
  });

  test('6.2 If data is entered incorrectly, errors are displayed.', async ({ page }) => {
    await addProductsToCart(page);

    const cartButton = page.locator('[aria-label="Open Cart"]');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    const cartModal = page.locator('.modal-sidebar');
    await expect(cartModal).toBeVisible();

    const checkoutButton = page.locator('.js-goto-checkout');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    const emailField = page.locator('#email');
    await expect(emailField).toHaveAttribute('placeholder', 'Email');
    await emailField.fill('Vard.test.lko');

    const marketingOptIn = page.locator('#marketing_opt_in');
    await expect(marketingOptIn).toBeVisible();
    await marketingOptIn.click();

    const emailError = page.locator('#error-for-email');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('Missing a valid contact method.');

    const firstNameField = page.locator('._7ozb2uq').nth(1);
    await expect(firstNameField).toHaveAttribute('placeholder', 'First name');
    await firstNameField.fill('Vardenė');

    const lastNameField = page.locator('._7ozb2uq').nth(2);
    await expect(lastNameField).toHaveAttribute('placeholder', 'Last name');
    await lastNameField.fill('Pavardenė');

    const addressField = page.locator('._7ozb2uq').nth(3);
    await expect(addressField).toHaveAttribute('placeholder', 'Address');
    await addressField.fill('Testinė g. 5');

    const cityField = page.locator('._7ozb2uq').nth(4);
    await expect(cityField).toHaveAttribute('placeholder', 'City');
    await cityField.fill('Testaunas');

    const postalCodeField = page.locator('._7ozb2uq').nth(5);
    await expect(postalCodeField).toHaveAttribute('placeholder', 'Postal code');
    await postalCodeField.fill('MHHJJ');
    await postalCodeField.press('Enter');

    const postalCodeError = page.locator('#error-for-TextField4');
    await expect(postalCodeError).toBeVisible();
    await expect(postalCodeError).toContainText('code for Lithuania');
  });
});
