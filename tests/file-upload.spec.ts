import { test, expect } from '@playwright/test';

test('User can upload a file using file chooser', async ({ page }) => {
    test.setTimeout(90000);

    await page.goto('https://the-internet.herokuapp.com/upload', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    const uploadInput = page.locator('#file-upload');
    await expect(uploadInput).toBeVisible({ timeout: 30000 });

    const fileChooserPromise = page.waitForEvent('filechooser');
    await uploadInput.click();

    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles({
        name: 'test-file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Playwright file upload test')
    });

    await Promise.all([
        page.waitForURL('**/upload', { timeout: 30000 }),
        page.getByRole('button', { name: 'Upload' }).click()
    ]);

    await expect(page.locator('h3')).toHaveText('File Uploaded!', {
        timeout: 30000
    });

    await expect(page.locator('#uploaded-files')).toHaveText('test-file.txt');
});