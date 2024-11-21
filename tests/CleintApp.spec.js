const { test, expect } = require('@playwright/test');

test('Valid Login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  console.log(await page.title());
  await expect(page).toHaveTitle('OrangeHRM');
  await page.locator("[name='username']").fill("Admin");
  await page.locator("[type='password']").fill("admin123")
  await page.locator("[type='submit']").click();
  console.log(await page.locator("//span[@class='oxd-topbar-header-breadcrumb']").textContent());
  await expect(page.locator("//span[@class='oxd-topbar-header-breadcrumb']")).toContainText('Dashboard');
});

test.only('Invalid Login', async ({ page }) => {
  const userName= page.locator("[name='username']")
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  console.log(await page.title());
  await expect(page).toHaveTitle('OrangeHRM');
  await userName.fill("Admin");
  await page.locator("[type='password']").fill("admin")
  await page.locator("[type='submit']").click();
  console.log(await page.locator("//p[text()='Invalid credentials']").textContent());
  await expect(page.locator("//p[text()='Invalid credentials']")).toContainText('Invalid');
  await userName.fill("");
  
});

test('Context Url', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  console.log(await page.title());
  await expect(page).toHaveTitle('Your Store');
  
});
