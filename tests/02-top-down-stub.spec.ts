import { test, expect, BrowserContext, Page } from '@playwright/test';

// DRIVER A : ทำหน้าที่จำลองการข้าม Login และเปิดหน้า Stub Card ของคุณ
async function driverOpenCardStub(
    context: BrowserContext
): Promise<Page> {
    const page = await context.newPage();
    
    // จำลองการset content หรือเปิดไฟล์ card.html ตามโจทย์
    await page.setContent(`
      <!doctype html>
      <html>
        <head><title>Card Stub</title></head>
        <body>
          <div data-test="card-stub">นางสาว วิมลสิริ เกวี</div>
        </body>
      </html>
    `);

    return page;
}

test('Bottom-Up DRIVER: Call Card Stub', async ({ browser }) => {
    const context = await browser.newContext();
    
    try {
        const page = await driverOpenCardStub(context);

        // Assert ตรวจสอบว่าแสดงผลถูกต้อง
        await expect(page.locator('[data-test="card-stub"]')).toBeVisible();
        await expect(page.locator('[data-test="card-stub"]')).toContainText('นางสาว วิมลสิริ เกวี');

    } finally {
        await context.close();
    }
});