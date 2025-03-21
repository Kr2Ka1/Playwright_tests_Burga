import { test, expect } from '@playwright/test';

test.describe('2. Product Categories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });
    await page.waitForSelector('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
    await page.click('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
  });

  test('2.1 Access Phone Cases category', async ({ page }) => {
    
    await page.click('.embla__container > [href="/collections/all"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Phone Cases');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});


test('2.2 Access Ring Holders category', async ({ page }) => {
    
    await page.click('.embla__container > [href="/collections/ring-holders"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Ring Holders');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.3 Access AirPods 3 Cases category', async ({ page }) => {
   
    await page.click('.embla__container > [href="/collections/airpods-3-cases"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('AirPods 3 Cases');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.4 Access Magnetic Power Banks category', async ({ page }) => {
   
    await page.click('.embla__container > [href="/collections/magnetic-power-banks"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Magnetic Power Banks');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.5 Access iPad Casescategory', async ({ page }) => {
    
    await page.click('.embla__container > [href="/collections/ipad-cases"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('iPad Cases');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.6 Access Insulated Travel Mugscategory', async ({ page }) => {
   
    await page.click('.embla__container > [href="/collections/travel-mugs"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Insulated Travel Mugs');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.7 Access Macbook Cases category', async ({ page }) => {
    
    await page.click('.embla__container > [href="/collections/hard-macbook-cases"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Macbook Cases');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.8 Access Watch Bands category', async ({ page }) => {
   
    await page.click('.embla__container > [href="/collections/watch-bands"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Watch Bands');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.9 Access Notebooks category', async ({ page }) => {
   
    await page.click('.embla__container > [href="/collections/notebooks"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Notebooks');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.10 Access Eyewear category', async ({ page }) => {
    
    await page.click('.embla__container > [href="/pages/eyewear"]');
    await expect(page.locator('.r-1c0teq4')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/div/div/div/div/div[3]/div/div/div/div/ul')).toBeVisible();
});
test('2.11 Access Screen and Lens Protectorscategory', async ({ page }) => {
  
    await page.click('.embla__container > [href="/collections/screen-protectors"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Screen and Lens Protectors');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.12 Access Charging category', async ({ page }) => {
  
    await page.click('.embla__container > [href="/collections/charging"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Charging');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
});
test('2.13 Access Accessories category', async ({ page }) => {
    await page.click('.embla__container > [href="/collections/accessories"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Accessories');
    await expect(page.locator('#shopify-section-template--24699570880846__products')).toBeVisible();
  });

  test('2.14 Ensure product information is visible', async ({ page }) => {
    await page.click('.embla__container > [href="/collections/all"]');
    await expect(page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs')).toContainText('Phone Cases');
    await expect(page.locator('[data-proudct-index="1"]')).toBeVisible();
    await expect(page.locator('[data-proudct-index="1"] > .column-wrap > .js-prod-thumb > div.cell-l--s > .h-style')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/section[3]/div/div/collection-product-grid-loader/div[1]/global-product-thumbnail/a/div[1]')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/section[3]/div/div/collection-product-grid-loader/div[1]/global-product-thumbnail/a/div[2]/div')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/section[3]/div/div/collection-product-grid-loader/div[1]/global-product-thumbnail/a/div[3]/global-product-thumb-form/form/button')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/section[2]/collection-navigation-loader/div/collection-phone-navigation/collection-filters-ui-toggle/button')).toBeVisible();

    const filterBtn = page.locator('xpath=/html/body/main/section[2]/collection-navigation-loader/div/collection-phone-navigation/collection-filters-ui-toggle/button');
    await filterBtn.click();
    await expect(page.locator('xpath=/html/body/main/section[2]/collection-navigation-loader/collection-filters-ui-sidebar/global-sidebar/div/div[2]/form/div[1]/h2')).toBeVisible();
    await expect(page.locator('xpath=/html/body/main/section[2]/collection-navigation-loader/collection-filters-ui-sidebar/global-sidebar/div/div[2]/form/div[1]/h2')).toContainText('Filter by');
    

    const hearts = page.locator('[data-value="Hearts"]');
    await hearts.click();
    await page.click('#onetrust-accept-btn-handler');
    await page.click('.js-filter-nav__toggle.js-filter-nav__update.btn.btn--green');
    await expect(page.locator('xpath=/html/body/main/section[2]/collection-navigation-loader/div/div[2]/collection-filters-sort-by/global-nice-selector/div[2]/div[2]')).toBeVisible();
    
  });
});
