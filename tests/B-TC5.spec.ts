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

test.describe('5. Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://eu.burga.com/');
    await page.setViewportSize({ width: 1640, height: 950 });

    // Close popup if present
    const closePopup = page.locator('.needsclick.klaviyo-close-form.go4255485812.kl-private-reset-css-Xuajs1');
    await page.waitForTimeout(5000);
    if (await closePopup.isVisible()) {
      await closePopup.click();
    }
  });

  test('5.1 Add products to the cart.', async ({ page }) => {
    const allCollection = page.locator('.embla__container > [href="/collections/all"]');
    await expect(allCollection).toBeVisible();
    await allCollection.click();

    const firstAddToCart = page.locator('.btn-reset.col-thumb-btn.col-thumb-btn--atc').first();
    await expect(firstAddToCart).toBeVisible();
    await firstAddToCart.click();

    const addedToCartText = page.locator('.filter-nav__menu-header > .h-style');
    await expect(addedToCartText).toBeVisible();
    await expect(addedToCartText).toContainText('ADDED TO CART');

    const closeCartModal = page.locator('.filter-nav__menu-header > .js-atc-modal-close');
    await expect(closeCartModal).toBeVisible();
    await closeCartModal.click();
  });

  test('5.2 View items in the cart', async ({ page }) => {
    await addProductsToCart(page);

    const cartCounter = page.locator('.mh__cart-counter.block-abc.js-wbsk-sidebar-cart__cart-count');
    await expect(cartCounter).toBeVisible();
    await expect(cartCounter).not.toBeEmpty();
    await expect(cartCounter).toContainText('2');
  });

  test('5.3 Update product quantities.', async ({ page }) => {
    await addProductsToCart(page);

    const cartButton = page.locator('.js-wbsk-sidebar-cart__open.mh__button.mh__button--cart');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    const cartModal = page.locator('.modal-sidebar');
    await expect(cartModal).toBeVisible();

    const itemCount = page.locator('.flex.row-wrap.align-center.justify-space.block-rel > .t-grey.lh-reset');
    await expect(itemCount).toBeVisible();
    await expect(itemCount).toContainText('2 Items');

    const increaseQuantity = page.locator('span.qty-selector__ctrl.qty-selector__ctrl--plus').nth(1);
    await increaseQuantity.click();
    await expect(itemCount).toContainText('3 Items');

    const decreaseQuantity = page.locator('span.qty-selector__ctrl.qty-selector__ctrl--minus').nth(0);
    await decreaseQuantity.click();
    await expect(itemCount).toContainText('2 Items');
  });

  test('5.4 Remove products from the cart', async ({ page }) => {
    await addProductsToCart(page);

    const cartButton = page.locator('.js-wbsk-sidebar-cart__open.mh__button.mh__button--cart');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    const cartModal = page.locator('.modal-sidebar');
    await expect(cartModal).toBeVisible();

    const itemCount = page.locator('.flex.row-wrap.align-center.justify-space.block-rel > .t-grey.lh-reset');
    await expect(itemCount).toBeVisible();
    await expect(itemCount).toContainText('2 Items');

    const removeItem = page.locator('.cart-item__content > .js-sidebar-cart__remove.sidebar-cart__remove').nth(0);
    await expect(removeItem).toBeVisible();
    await removeItem.click();

    await expect(itemCount).toContainText('1 Item');
  });

  test('5.5 Proceed to checkout, without signing in', async ({ page }) => {
    await addProductsToCart(page);

    const cartButton = page.locator('.js-wbsk-sidebar-cart__open.mh__button.mh__button--cart');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    const cartModal = page.locator('.modal-sidebar');
    await expect(cartModal).toBeVisible();

    const checkoutButton = page.locator('.js-goto-checkout');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    const checkoutForm = page.locator('.i4DWM');
    await expect(checkoutForm).toBeVisible();
    await expect(checkoutForm).not.toBeEmpty();

    const deliverySection = page.locator('.gdtca');
    await expect(deliverySection).toBeVisible();
    await expect(deliverySection).not.toBeEmpty();
    await expect(deliverySection).toContainText('Delivery');

    const addressForm = page.locator('#shippingAddressForm');
    await expect(addressForm).toBeVisible();

    // Apply invalid discount code
    const discountField = page.locator('._7ozb2uq').nth(7);
    await discountField.fill('Discount');
    await discountField.press('Enter');

    const discountError = page.locator('span._7ozb2u1j > p#error-for-ReductionsInput0');
    await expect(discountError).toBeVisible();
    await expect(discountError).toContainText('Enter a valid discount code or gift card');
  });
});
