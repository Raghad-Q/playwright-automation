import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('User can login and complete checkout', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await page.goto('/');

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productsPage.productsTitle).toBeVisible();

    await productsPage.addProductToCart('Sauce Labs Backpack');

    await productsPage.openCart();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});


test('User can sort products by price', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await page.goto('/');

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productsPage.productsTitle).toBeVisible();

    const pricesBeforeSorting = await productsPage.getProductPrices();

    await productsPage.sortProducts('lohi');

    const pricesAfterSorting = await productsPage.getProductPrices();

    const expectedPrices = [...pricesBeforeSorting].sort((a, b) => a - b);

    expect(pricesAfterSorting).toEqual(expectedPrices);
});