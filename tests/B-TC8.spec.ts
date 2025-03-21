import { test, expect } from '@playwright/test';

test.describe('8. Customer Support', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });

    // Accept cookies if visible
    const acceptCookies = page.locator('#onetrust-accept-btn-handler');
    if (await acceptCookies.isVisible()) {
      await acceptCookies.click();
    }
  });

  test('8.1 Access the Help Center', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const helpCenterLink = page.locator('[href="https://support.burga.com/en-US"]');
    await helpCenterLink.waitFor({ state: 'visible', timeout: 5000 });
    await expect(helpCenterLink).toContainText('Help Center');
    
    await helpCenterLink.click();
    
    // Cypress `cy.pause()` equivalent in Playwright
    await page.pause(); // JIRA issue: site detects automation, causing failure
  });

  test('8.2 Try to connect directly to Help Center', async ({ page }) => {
    // This test is expected to fail due to server blocking automation tools
    await page.goto('https://support.burga.com/en-US?_gl=1*w4cobj*_gcl_au*MjE0NTU4NDkuMTc0MjIwNzYyMg..*_ga*MTI5MTgzOTU0Mi4xNzQyMjA3NjIx*_ga_5HQMENMVMS*MTc0MjI4NTM2Ni4zLjEuMTc0MjI4NjM2NC41OS4wLjA.');
    
    // Optional: check if a blocking message appears
    await expect(page).toHaveURL(/burga.com/); // Ensures redirection doesn't happen
  });

  test('8.3 Does clicking on Contact Us open a contact form', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const contactUsLink = page.locator('[href="/pages/contact"]');
    await contactUsLink.waitFor({ state: 'visible', timeout: 5000 });
    await expect(contactUsLink).toContainText('Contact Us');

    await contactUsLink.click();

    const contactUsHeader = page.locator('xpath=/html/body/main/div/div/div/div/h1');
    await contactUsHeader.waitFor({ state: 'visible', timeout: 5000 });
    await expect(contactUsHeader).toContainText('Contact US');

    // Uncomment if you want to check for the contact form
    // const contactForm = page.locator('.css-ekyqmx.e1qubwr112');
    // await expect(contactForm).toBeVisible();
    // await expect(contactForm).not.toBeEmpty();
  });

});
