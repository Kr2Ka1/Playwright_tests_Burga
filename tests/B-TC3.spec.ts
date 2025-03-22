import { test, expect } from '@playwright/test';

test.describe('3. Product Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });
    await page.waitForSelector('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
    await page.click('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
    await page.click('#onetrust-accept-btn-handler');
  });

  test('3.1 Ensure product images are displayed', async ({ page }) => {
    // Go to the product category page
    const categoryLink = page.locator('.embla__container > [href="/collections/travel-mugs"]');
    await categoryLink.click();
    const categoryTitle = page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs');
    await expect(categoryTitle).toHaveText('Insulated Travel Mugs');
    
    // Select product and check images
    const productLink = page.locator('[href="/products/tricked-me-travel-mug"]');
    await productLink.click();
    const productImage = page.locator('[alt="Tricked Me - Travel Mug 1"]').first();
    await expect(productImage).toBeVisible();
    
    const productGallery = page.locator('.prod-main-gallery--has-thumbs.block-rel');
    await expect(productGallery).toBeVisible();
    
    const carouselPagination = page.locator('.js-prod-image-gallery__carousel-pagination.embla__pagination');
    await expect(carouselPagination).toBeVisible();
    
    // Select volume size
    const sizeOption = page.locator('[value="700ml"]');
    await expect(sizeOption).toBeVisible();
    await sizeOption.click();

    const stockText = page.locator('.prod-stock__text');
    await expect(stockText).toHaveText('Limited Stock | Ships out in 2-3 business days');
    
    const designSelector = page.locator('.js-prod-design-selector');
    await expect(designSelector).toBeVisible();
    
    const drinkwareType = page.locator('.js-prod-drinkware-type-target');
    await expect(drinkwareType).toContainText('Type:');
    
    const sizeKey = page.locator('xpath=/html/body/main/div[2]/div/div[2]/div/product-form/form/div[2]/global-product-option-selector/div[1]');
    await expect(sizeKey).toContainText('Size:');

    const lidType = page.locator('xpath=/html/body/main/div[2]/div/div[2]/div/product-form/form/div[2]/global-product-option-selector/div[2]/label');
    await expect(lidType).toContainText('Lid Type:');

    // Click on Add to Cart
    const addToCartButton = page.locator('#addtocartmain');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    const addedToCartMessage = page.locator('xpath=/html/body/global-atc-modal/div/div/div/div[1]/h2');
    await expect(addedToCartMessage).toHaveText('ADDED TO CART');
  });

  test('3.2 Verify that you can see Description', async ({ page }) => {
    const categoryLink = page.locator('.embla__container > [href="/collections/travel-mugs"]');
    await categoryLink.click();
    const categoryTitle = page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs');
    await expect(categoryTitle).toHaveText('Insulated Travel Mugs');
    
    const productLink = page.locator('[href="/products/tricked-me-travel-mug"]');
    await productLink.click();
    
    await page.evaluate(() => window.scrollBy(0, 600)); 
    
    const upsellWrapper = page.locator('.js-wbsk-product-upsell-wrapper');
    await expect(upsellWrapper).toContainText('Add accessories');
    
    const accordionSections = page.locator('#shopify-section-product__tag-accordion-sections');
    await expect(accordionSections).toBeVisible();
    
    const descriptionTitle = page.locator('.js-prod-accord__title.prod-accord__title.prod-accord__title--design');
    await descriptionTitle.click();
    const descriptionContent = page.locator('xpath=/html/body/main/div[2]/div/div[2]/div/div[10]/ul/div/li[1]/div[2]');
    await expect(descriptionContent).toBeVisible();
  
    const shippingTitle = page.locator('.js-prod-accord__title.prod-accord__title.prod-accord__title--shipping');
    await shippingTitle.scrollIntoViewIfNeeded();
    await shippingTitle.click();  
    const shippingContent = page.locator('xpath=//*[@id="shippin"]');
    await shippingContent.scrollIntoViewIfNeeded(); 
  
     const faqTitle = page.locator('.js-prod-accord__title.prod-accord__title.prod-accord__title--faq');
    await faqTitle.scrollIntoViewIfNeeded();
    await faqTitle.click();
    const faqContent = page.locator('xpath=/html/body/main/div[2]/div/div[2]/div/div[10]/ul/div/li[3]/div[2]');
    await expect(faqContent).toBeVisible();
  });
  

  test('3.3 Add to cart button', async ({ page }) => {
    // Go to the product category page
    const categoryLink = page.locator('.embla__container > [href="/collections/travel-mugs"]');
    await categoryLink.click();
    const categoryTitle = page.locator('h1.h-style.h-xxl.f-w700.t-ucase.f-hs');
    await expect(categoryTitle).toHaveText('Insulated Travel Mugs');
    
    // Click on product and select size
    const productLink = page.locator('[href="/products/tricked-me-travel-mug"]');
    await productLink.click();
    const sizeOption = page.locator('[value="700ml"]');
    await sizeOption.click();

    // Add to cart
    const addToCartBtn = page.locator('#addtocartmain');
    await expect(addToCartBtn).toContainText('ADD TO CART');
    await addToCartBtn.click();

    // Verify the added to cart confirmation
    const addedToCartMessage = page.locator('xpath=/html/body/global-atc-modal/div/div/div/div[1]/h2');
    await expect(addedToCartMessage).toBeVisible();
    await expect(addedToCartMessage).toHaveText('ADDED TO CART');
  });
});
