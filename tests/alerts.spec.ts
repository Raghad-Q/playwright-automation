import { test, expect } from '@playwright/test';

test('User can handle JavaScript alerts, confirms, and prompts', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts', {
        waitUntil: 'domcontentloaded',
        timeout: 45000
    });

    // JavaScript Alert
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText(
        'You successfully clicked an alert'
    );

    // JavaScript Confirm
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

    // JavaScript Prompt
    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('Playwright Test');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText(
        'You entered: Playwright Test'
    );
});