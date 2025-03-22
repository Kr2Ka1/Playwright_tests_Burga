import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eu.burga.com/';

test.describe('7. User Account', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.setViewportSize({ width: 1640, height: 950 });
  });

  test('7.1 Register a new account', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const createAccountHeader = page.locator('.h-style.h-m.row.f-w500');
    const createAccountBtn = page.locator('.cell-l > .btn');
    const firstName = page.locator('#FirstName');
    const lastName = page.locator('#LastName');
    const email = page.locator('#Email');
    const password = page.locator('#CreatePassword');
    const confirmPassword = page.locator(':nth-child(7) > .reset-input');
    const submitBtn = page.locator('.block-r > .btn');

    await accountLink.click();
    await expect(createAccountHeader).toContainText('CREATE AN ACCOUNT');
    await createAccountBtn.click();
    await expect(page.locator('h1.h-style')).toContainText('CREATE AN ACCOUNT');

    await firstName.fill('Vardenis');
    await lastName.fill('Pavardenis');
    await email.fill('Vardenis_testas@testas.lt');
    await password.fill('TestasTestas1#');
    await confirmPassword.fill('TestasTestas1#');
    await submitBtn.click();
  });

  test('7.2 Log in to an existing account', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const welcomeBackHeader = page.locator('h1.h-style.h-l.f-w500.row');
    const email = page.locator('#CustomerEmail');
    const password = page.locator('#CustomerPassword');
    const loginBtn = page.locator('#customer_login > .block-r > .btn');

    await accountLink.click();
    await expect(welcomeBackHeader).toContainText('WELCOME BACK');
    await email.fill('Vardenis_testas@testas.lt');
    await password.fill('TestasTestas1#');
    await loginBtn.click();
  });

  test('7.7 Check that the password reminder works', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const forgotPassword = page.locator('.block-c.tac.cb--s.flex.row-wrap.align-center.justify-center');
    const resetHeader = page.locator('h2.h-style.h-l.f-w500.row');
    const recoverEmail = page.locator('#RecoverEmail');
    const confirmBtn = page.locator('#customer_reset > form > .block-r > .btn');

    await accountLink.click();
    await forgotPassword.click();
    await expect(resetHeader).toContainText('RESET PASSWORD');
    await recoverEmail.fill('Vardenis_testas@testas.lt');
    await confirmBtn.click();
  });

  test('7.8 Start getting a renewed password and cancel it', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const forgotPassword = page.locator('.block-c.tac.cb--s.flex.row-wrap.align-center.justify-center');
    const resetHeader = page.locator('h2.h-style.h-l.f-w500.row');
    const recoverEmail = page.locator('#RecoverEmail');
    const cancelReset = page.locator('#customer_reset > form > .block-c > a > u');

    await accountLink.click();
    await forgotPassword.click();
    await expect(resetHeader).toContainText('RESET PASSWORD');
    await recoverEmail.fill('Vardenis_testas@testas.lt');
    await cancelReset.click();
  });

  test('7.9 Try to login with no info', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const loginBtn = page.locator('#customer_login > .block-r > .btn');
    const email = page.locator('#CustomerEmail');
    
    await accountLink.click();
    await loginBtn.click();
    await expect(email).toBeEmpty();
    await expect(email.evaluate(el => el.validationMessage)).resolves.toBe('Please fill out this field.');
  });

  test('7.10 Try to login without @', async ({ page }) => {
    const accountLink = page.locator('.js-mh__account-link');
    const email = page.locator('#CustomerEmail');
    const loginBtn = page.locator('#customer_login > .block-r > .btn');
    
    await accountLink.click();
    await email.fill('Varde');
    await loginBtn.click();
    await expect(email.evaluate(el => el.validationMessage)).resolves.toBe("Please include an '@' in the email address. 'Varde' is missing an '@'.");
  });
});
