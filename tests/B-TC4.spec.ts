import { test, expect } from '@playwright/test';

test.describe('4. Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });

    // Close pop-up if visible
    const closePopup = page.locator('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
    await page.waitForTimeout(5000);
    if (await closePopup.isVisible()) {
      await closePopup.click();
    }
  });

  //4. Search Functionality
    // 4.1 Test the search bar for products.
      // 4.1.1 Check for suggestions or autocomplete features.
      // 4.1.2 Verify search results are relevant.


  test('4.1 Test the search bar for products.', async ({ page }) => {
    // Search with suggestions
    const searchButton = page.locator('.mh__button.mh__button--search.btn-reset.js-wbsk-sidebar-search__open');
    await searchButton.click();

    const searchWrapper = page.locator('.block-fh.wbsk-ui-scroll-flex.js-sidebar-search__wrapper');
    await expect(searchWrapper).toBeVisible();

    const searchInput = page.locator('.js-sidebar-search__input.reset-input.sidebar-search__input--icon-left');
    await searchInput.fill('Pink');
    await searchInput.press('Enter');
    await page.waitForTimeout(3000);

    const shearchResult = page.locator('xpath=/html/body/main/div/div/div[1]/div/span');
    await expect(shearchResult).toBeVisible();
    await expect(shearchResult).not.toBeEmpty();

    const searchRelevent = page.locator('xpath=/html/body/main/div/div/ul/li[2]/global-product-thumbnail/a/div[2]/h3');
    await expect(searchRelevent).toBeVisible();
    await expect(searchRelevent).toContainText('Think Pink');



    // await page.fill('.js-sidebar-search__input.reset-input.sidebar-search__input--icon-left', 'pink');
    // await page.waitForFunction(() => {
    //   const suggestions = document.querySelectorAll('ul[role="listbox"] li a');
    //   return suggestions.length > 0;
    // }, { timeout: 10000 });//suggestions neatsivaizduoja PW testavime, tiesiog nematoma dalis, kuri neužsikrauna


    // const suggestionsText = page.locator('xpath=/html/body/global-sidebar[2]/div/div[2]/global-sidebar-search/div/div[1]/div/label[1]');
    // await expect(suggestionsText).toContainText('Suggestions'); - nesimato suggestin visiškai langas.

    // const secondSuggestion = page.locator('xpath=/html/body/global-sidebar[2]/div/div[2]/global-sidebar-search/div/div[1]/div/ul[1]/li[2]/a');
    // await secondSuggestion.click();

    // const productGrid = page.locator('.align-stretch');
    // await expect(productGrid).toBeVisible();
    // await expect(productGrid).not.toBeEmpty();

    // const productText = page.locator('xpath=/html/body/main/div/div/ul/li[1]/global-product-thumbnail/a');
    // await expect(productText).toContainText('Pink Beach');

    // // Search product
    // await searchButton.click();
    // await expect(searchWrapper).toBeVisible();

    // await searchInput.fill('drinkware');

    // // await expect(suggestionsText).toBeVisible();
    // // await expect(suggestionsText).toContainText('Products');

    // const predictiveSearch = page.locator('xpath=/html/body/global-sidebar[2]/div/div[2]/global-sidebar-search/div/div[1]/div/ul[1]');
    // await expect(predictiveSearch).toBeVisible();
    // await expect(predictiveSearch).not.toBeEmpty();//nesimato modalinio lango turinys net ir su visais delay ir laukimais.

    // // Accept cookies if visible
    // const acceptCookies = page.locator('#onetrust-accept-btn-handler');
    // if (await acceptCookies.isVisible()) {
    //   await acceptCookies.click();
    // }


    // await searchInput.fill('Pink Beach');
    // const viewAllResults = page.locator('xpath=/html/body/global-sidebar[2]/div/div[2]/global-sidebar-search/div/div[1]/div/div/a');
    // await expect(viewAllResults).toBeVisible();
    // await expect(viewAllResults).toContainText('VIEW ALL  RESULTS');
    // await viewAllResults.click();

    // const ajaxResults = page.locator('.js-ajax-search-results');
    // await expect(ajaxResults).toBeVisible();
    // await expect(ajaxResults).toContainText('Travel Mug');
  });

});
