
import { test, expect } from '@playwright/test';

test('User can interact with frames and iframes', async ({ page }) => {
    test.setTimeout(90000);

    // Nested frames
    await page.goto('https://the-internet.herokuapp.com/nested_frames', {
        waitUntil: 'commit',
        timeout: 60000
    });

    const topFrame = page.frameLocator('frame[name="frame-top"]');

    await expect(
        topFrame.frameLocator('frame[name="frame-left"]').locator('body')
    ).toHaveText(/LEFT/, { timeout: 15000 });

    await expect(
        topFrame.frameLocator('frame[name="frame-middle"]').locator('body')
    ).toHaveText(/MIDDLE/, { timeout: 15000 });

    await expect(
        topFrame.frameLocator('frame[name="frame-right"]').locator('body')
    ).toHaveText(/RIGHT/, { timeout: 15000 });

    // iFrame
    await page.goto('https://the-internet.herokuapp.com/iframe', {
        waitUntil: 'commit',
        timeout: 60000
    });

    const editor = page.frameLocator('#mce_0_ifr').locator('body#tinymce');

    await expect(editor).toBeVisible({ timeout: 15000 });
    await expect(editor).toContainText('Your content goes here.', {
        timeout: 15000
    });
});
