import { test, expect, BrowserContext, Page } from '@playwright/test';

// DRIVER A : สร้าง Driver เพื่อเรียกหน้า Card / Stub
async function driverOpenCardStub(
    context: BrowserContext
): Promise<Page> {
    const page = await context.newPage();
    
    // จำลองเนื้อหา HTML พร้อมใส่ชื่อ-นามสกุล
    await page.setContent(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Card Stub</title>
        </head>
        <body>
          <h1>Card Stub Page</h1>
          <div data-test="card-stub">
            นางสาว วิมลสิริ เกวี
          </div>
        </body>
      </html>
    `);

    return page;
}

test('Bottom-Up DRIVER: Call Card Stub and Verify', async ({ browser }) => {
    const context = await browser.newContext();
    
    try {
        // เรียกใช้ Driver ที่สร้างขึ้น
        const page = await driverOpenCardStub(context);

        // ตรวจสอบว่า element แสดงผลจริง
        await expect(
          page.locator('[data-test="card-stub"]')
        ).toBeVisible();

        // ตรวจสอบข้อความข้างใน
        await expect(
          page.locator('[data-test="card-stub"]')
        ).toContainText('นางสาว วิมลสิริ เกวี');

    } finally {
        await context.close();
    }
});