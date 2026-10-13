import { test, expect } from '@playwright/test';

test('User can handle dynamic loading', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1', {
        waitUntil: 'commit',
        timeout: 60000
    });

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish h4')).toHaveText('Hello World!', {
        timeout: 30000
    });
});