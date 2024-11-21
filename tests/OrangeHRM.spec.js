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

test('Invalid Login', async ({ page }) => {
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

test.only('OrangeHRM E2E - Add New Employee', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  console.log(await page.title());
  await expect(page).toHaveTitle('OrangeHRM');

  //Entering Login Details 
  await page.locator("[name='username']").fill("Admin");
  await page.locator("[type='password']").fill("admin123")
  await page.locator("[type='submit']").click();

  //Dashboard page verification 
  console.log(await page.locator("//span[@class='oxd-topbar-header-breadcrumb']").textContent());
  await expect(page.locator("//span[@class='oxd-topbar-header-breadcrumb']")).toContainText('Dashboard');
  
  //Navigate to Employee Management
  await page.locator("//span[text()='PIM']").click();
  await page.click('.oxd-icon.bi-plus.oxd-button-icon'); 

  //Adding New Employee
  await page.fill("//input[@placeholder='First name']", 'Ranjani');
  await page.fill("//input[@placeholder='Last Name']", 'Magesh');
  const employeeId = await page.inputValue("(//label[text()='Employee Id']//following::div//input)[1]"); // Capture generated Employee ID
  await page.click("//button[text()=' Save ']"); // Save employee details
  // const errorVisible = await page.isVisible('div.validation-error'); // Check for error message
  
  // if (errorVisible) {
  //   const errorMessage = await page.textContent('div.validation-error');
  //   console.log(`Error: ${errorMessage}`);

  //   if (errorMessage.includes('Employee Id already exists')) {
  //     console.log('Generating a new Employee ID...');
  //     const newEmployeeID = Math.floor(10000 + Math.random() * 90000).toString(); // Generate random Employee ID
  //     await page.fill('input#employeeId', newEmployeeID);
  //     await page.click('button#btnSave'); // Retry Save
  //     console.log('Employee added successfully with new Employee ID.');
  //   }
  // } else {
  //   console.log('Employee added successfully on the first attempt.');
  // }

  await page.textContent("//h6[text()='Personal Details']");
  expect(await page.locator("//h6[text()='Personal Details']")).toHaveText('Personal Details'); // Confirm navigation to personal details

  //Verify Employee Addition
  await page.click("//span[text()='PIM']"); // Navigate back to PIM
  await page.click("//a[text()='Employee List']"); // Open Employee List 
  // await page.click("//div[@class='--toggle']//button"); 
  await page.textContent("(//label[text()='Employee Id']//following::div//input)[1]");
  await page.fill("(//label[text()='Employee Id']//following::div//input)[1]", employeeId); // Search by Employee ID
  await page.click("//button[text()=' Search ']"); // Perform search  
  await expect(page.locator("//span[text()='(1) Record Found']")).toHaveText('(1) Record Found'); 
  await page.click(".oxd-table-body");
  await page.waitForTimeout(6000); 
  const employeeName = await page.textContent(".oxd-text.oxd-text--h6.--strong");
  expect(employeeName).toBe('Ranjani Magesh'); // Validate name appears in list

  //Logout
  await page.click('.oxd-userdropdown-tab'); // Open profile menu
  await page.click("//a[text()='Logout']"); // Click logout
  await expect(page.locator("//h5[text()='Login']")).toHaveText('Login'); // Confirm redirection to login page
});




