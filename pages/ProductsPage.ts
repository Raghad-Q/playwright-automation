import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productsTitle: Locator;
    readonly cartButton: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productsTitle = page.getByText('Products');
        this.cartButton = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async addProductToCart(productName: string) {
        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();

        return prices.map(price =>
            Number(price.replace('$', ''))
        );
    }

    async openCart() {
        await this.cartButton.click();
    }
}