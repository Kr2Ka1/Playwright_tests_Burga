import { test, expect } from '@playwright/test';

test.describe('1. Home Page', () => {
    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000); // Increase timeout
        await page.goto('https://eu.burga.com/');
        await page.setViewportSize({ width: 1640, height: 950 });

        // Wait dynamically for the close button
        await page.waitForSelector('.needsclick.klaviyo-close-form', { timeout: 30000 });
        await page.locator('.needsclick.klaviyo-close-form').click();
    });

    test('1.1 Verify the home page loads successfully', async ({ page }) => {
        await expect(page.locator('.gbl-has-b2b--')).toBeVisible();
        await expect(page.locator('#shopify-section-template--24699571372366__hero')).toBeVisible();
    });

    test('1.2 Confirm menus are accessible', async ({ page }) => {
        await page.locator('.js-global-sidebar-nav__toggle').click();
        await expect(page.locator('#shopify-section-global__sidebar-nav')).toBeVisible();
        await page.locator('.modal-close.btn-reset.sidebar-nav__close').click();
        await page.locator('.js-global-sidebar-nav__toggle').click();
        const sidebarMenuCollections = page.locator('xpath=/html/body/global-sidebar[1]/div/div[2]/global-sidebar-nav/div/div[2]/div[1]/div[1]/div/h3');
        await expect(sidebarMenuCollections).toBeVisible();
        await expect(sidebarMenuCollections).toContainText('Collections');
        const sidebarMenuPhoneC = page.locator('xpath=/html/body/global-sidebar[1]/div/div[2]/global-sidebar-nav/div/div[2]/div[2]/div[1]/a[1]/span');
        await expect(sidebarMenuPhoneC).toBeVisible();
        await expect(sidebarMenuPhoneC).toContainText('Phone Cases');
        await page.locator('.sidebar-nav__model-selector-wrap').click();
        await page.locator('[data-item="iPhone 13 Mini"]').click();
        await expect(page.locator('.sidebar-nav__model-selector-wrap')).toContainText('iPhone 13 Mini');
    });

    test('1.3 Search button is visible', async ({ page }) => {
        await page.locator('.mh__button--search').click();
        await expect(page.locator('.block-fh.wbsk-ui-scroll-flex')).toBeVisible();
        await page.locator('.js-sidebar-search__input').fill('samsung s20+');
        await page.waitForTimeout(10000);
        await expect(page.locator('xpath=/html/body/global-sidebar[2]/div/div[2]/global-sidebar-search/div/div[1]/div/label[1]')).toContainText('Suggestions');
        await page.locator('#onetrust-accept-btn-handler').click();
        await page.locator('.js-sidebar-search__clear').click();
        await expect(page.locator('input[placeholder="Type to search"]')).toBeVisible();
        await page.locator('.modal-close.sidebar-search-close').click();
    });

    test('1.5 Select brand and model to display search products information', async ({ page }) => {
        await page.locator('.mh__model-select.cell-l--s').click();
        await expect(page.locator('xpath=/html/body/global-sidebar[3]/div/div[2]/global-model-selector/div/div[1]/h2')).toContainText('SELECT MODEL');
        await page.locator('[data-item="iPhone 13 Mini"]').click();
        await expect(page.locator('.mh__model-select > .btn-reset > span')).toContainText('iPhone 13 Mini');
    });

    test('1.6 Notification of offers and discounts', async ({ page }) => {
        await page.locator('.js-news-center-toggle').click();
        await expect(page.locator('xpath=/html/body/global-news-center/global-sidebar/div/div[2]/div[1]/h2')).toContainText('Notifications');
    });

    test('1.7 Access to account', async ({ page }) => {
        await page.locator('.js-mh__account-link').click();
        await expect(page.locator('.h-style.h-m.row.f-w500')).toContainText('CREATE AN ACCOUNT');
        await expect(page.locator('h1.h-style.h-l.f-w500.row')).toContainText('WELCOME BACK');
    });

    test('1.8 Cart button', async ({ page }) => {
        await page.locator('.js-wbsk-sidebar-cart__open').click();
        await expect(page.locator('.modal-sidebar')).toContainText('Your Cart');
    });

    test('1.9 Main logo redirects to the home page when clicked', async ({ page }) => {
        await page.locator('.js-mh__account-link').click();
        await expect(page.locator('.h-style.h-m.row.f-w500')).toContainText('CREATE AN ACCOUNT');
        await page.locator('.block-abc.tac.mh__logo').click();
        await expect(page.locator('.gbl-has-b2b--')).toBeVisible();
    });
});
