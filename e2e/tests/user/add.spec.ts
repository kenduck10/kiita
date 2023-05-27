import { expect, test } from '@playwright/test';

test('add user successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('#add-user-button').click();
  await expect(page).toHaveURL('http://localhost:3000/users/new');

  await expect(page.locator('#main-content-title')).toContainText('ユーザー追加');

  await expect(page.locator('#name-headline')).toContainText('名前');

  await expect(page.locator('#last-name-field-label')).toContainText('姓');
  const lastNameField = page.locator('#last-name-field');
  await expect(lastNameField).toHaveValue('');

  await expect(page.locator('#first-name-field-label')).toContainText('名');
  const firstNameField = page.locator('#first-name-field');
  await expect(firstNameField).toHaveValue('');

  await expect(page.locator('#mail-address-headline')).toContainText('メールアドレス');

  await expect(page.locator('#mail-address-field-label')).toHaveCount(0);
  const mailAddressField = page.locator('#mail-address-field');
  await expect(mailAddressField).toHaveValue('');

  await lastNameField.fill('山田');
  await firstNameField.fill('太郎');
  await mailAddressField.fill('yamada@xxx.com');

  await page.locator('#confirm-button').click();
  await expect(page).toHaveURL('http://localhost:3000/users/new/confirm');

  await expect(page.locator('#main-content-title')).toContainText('ユーザー追加');

  await expect(page.locator('#name-headline')).toContainText('名前');
  await expect(page.locator('#name')).toContainText('山田 太郎');

  await expect(page.locator('#mail-address-headline')).toContainText('メールアドレス');
  await expect(page.locator('#mail-address')).toContainText('yamada@xxx.com');

  await page.locator('#add-button').click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await expect(page.locator('#row-2-column-0')).toContainText('3');
  await expect(page.locator('#row-2-column-1')).toContainText('山田');
  await expect(page.locator('#row-2-column-2')).toContainText('太郎');
  await expect(page.locator('#row-2-column-3')).toContainText('yamada@xxx.com');
});
