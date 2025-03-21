import { test, expect } from '@playwright/test';

test.describe('9. Footer Links', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });

    // Close the popup if it appears
    const popupCloseButton = page.locator('.needsclick.klaviyo-close-form');
    if (await popupCloseButton.isVisible()) {
      await popupCloseButton.click();
    }

    // Accept cookies if visible
    const acceptCookies = page.locator('#onetrust-accept-btn-handler');
    if (await acceptCookies.isVisible()) {
      await acceptCookies.click();
    }
  });

  test('9.1 Navigate to and verify that "About Us" page and information is visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const aboutUsLink = page.locator('[href="/pages/about-us"]');
    await aboutUsLink.waitFor({ state: 'visible' });
    await expect(aboutUsLink).toContainText('About Us');
    
    await aboutUsLink.click();
    
    const aboutUsHeader = page.locator('xpath=/html/body/main/div/div/div/div/h1');
    await aboutUsHeader.waitFor({ state: 'visible' });
    await expect(aboutUsHeader).toContainText('About Us');

    const aboutUsContent = page.locator('.block-c > .rte-content');
    await expect(aboutUsContent).toBeVisible();
    await expect(aboutUsContent).not.toBeEmpty();
  });

  test('9.2 Navigate to and verify that "Blog" section page and information is visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const blogLink = page.locator('[href="https://burga.com/blogs/news"]');
    await blogLink.waitFor({ state: 'visible' });
    await expect(blogLink).toContainText('Blog');
    
    // Verify the link is correct but don't click (as it's external)
    await expect(blogLink).toHaveAttribute('href', 'https://burga.com/blogs/news');
  });

  test('9.3 Navigate to and verify that "Partnerships and Collaborations" section page and information is visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const partnershipsLink = page.locator('[href="/pages/partnerships-collaborations"]');
    await partnershipsLink.waitFor({ state: 'visible' });
    await expect(partnershipsLink).toContainText('Partnerships and Collaborations');
    
    await partnershipsLink.click();

    const joinFamilyText = page.locator('.r-1c743lo > span > h3 > strong');
    await joinFamilyText.waitFor({ state: 'visible' });
    await expect(joinFamilyText).toContainText('Join our Partnerships Family');

    const clickHereButton = page.locator('.r-1rludnl > p > strong > span');
    await clickHereButton.waitFor({ state: 'visible' });
    await clickHereButton.click();

    const impactLink = page.locator('xpath=/html/body/main/div/div/div/div/div[3]/div[1]/a');
    await expect(impactLink).toHaveAttribute('href', /impact\.com/);
  });

  test('9.4 Check if the redirect to Instagram works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const instagramLink = page.locator('[href="https://www.instagram.com/burgaofficial/"]');
    await instagramLink.waitFor({ state: 'visible' });
    await expect(instagramLink).toContainText('Instagram');

    // Verify Instagram redirect link without clicking (avoiding navigation)
    await expect(instagramLink).toHaveAttribute('href', /instagram\.com/);
  });

  test('9.5 Check if the redirect to Facebook works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const facebookLink = page.locator('[href="https://www.facebook.com/BurgaOfficial/"]');
    await facebookLink.waitFor({ state: 'visible' });
    await expect(facebookLink).toContainText('Facebook');

    // Verify Facebook redirect link without clicking
    await expect(facebookLink).toHaveAttribute('href', /facebook\.com/);
  });

  test('9.6 Check if the redirect to TikTok works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const tiktokLink = page.locator('[href="https://www.tiktok.com/@burgaofficial"]');
    await tiktokLink.waitFor({ state: 'visible' });
    await expect(tiktokLink).toContainText('TikTok');

    // Verify TikTok redirect link without clicking
    await expect(tiktokLink).toHaveAttribute('href', /tiktok\.com/);
  });

  test('9.7 Check if the redirect to YouTube works', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const youtubeLink = page.locator('[href="https://www.youtube.com/@burgaofficial"]');
    await youtubeLink.waitFor({ state: 'visible' });
    await expect(youtubeLink).toContainText('YouTube');

    // Verify YouTube redirect link without clicking
    await expect(youtubeLink).toHaveAttribute('href', /youtube\.com/);
  });

});
