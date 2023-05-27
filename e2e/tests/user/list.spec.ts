import { expect, test } from '@playwright/test';

test('display user table', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('#main-content-title')).toContainText('ユーザー一覧');

  await expect(page.locator('#head-0')).toContainText('ID');
  await expect(page.locator('#head-1')).toContainText('姓');
  await expect(page.locator('#head-2')).toContainText('名');
  await expect(page.locator('#head-3')).toContainText('メールアドレス');

  await expect(page.locator('#row-0-column-0')).toContainText('1');
  await expect(page.locator('#row-0-column-1')).toContainText('田中');
  await expect(page.locator('#row-0-column-2')).toContainText('一郎');
  await expect(page.locator('#row-0-column-3')).toContainText('tanaka@xxx.com');

  await expect(page.locator('#row-1-column-0')).toContainText('2');
  await expect(page.locator('#row-1-column-1')).toContainText('鈴木');
  await expect(page.locator('#row-1-column-2')).toContainText('二郎');
  await expect(page.locator('#row-1-column-3')).toContainText('suzuki@xxx.com');

  await expect(page.locator('#row-2')).toHaveCount(0);
});
