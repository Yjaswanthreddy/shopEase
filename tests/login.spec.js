// const { test, expect } = require('@playwright/test');
// const LoginPage = require('../POM/LoginPage'); 

// test.describe('Login Module - ShopEase', () => {

//   test.beforeEach(async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.navigate();
//   });

//   // 1️⃣ Valid Login
//   test('TC01 - Valid login', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', 'Password123');
//     await expect(page).toHaveURL('/index.html');
//   });

//   // 2️⃣ Invalid Password
//   test('TC02 - Invalid password', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', 'wrong123');
//     await expect(page.locator('#error')).toHaveText('Invalid credentials');
//   });

//   // 3️⃣ Invalid Email
//   test('TC03 - Invalid email', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('wrong@gmail.com', 'Password123');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 4️⃣ Empty Fields
//   test('TC04 - Empty fields', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.clickLogin();
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 5️⃣ Empty Email
//   test('TC05 - Empty email', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('', 'Password123');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 6️⃣ Empty Password
//   test('TC06 - Empty password', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', '');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 7️⃣ Invalid Email Format
//   test('TC07 - Invalid email format', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('abc', 'Password123');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 8️⃣ Password Case Sensitivity
//   test('TC08 - Password case sensitivity', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', 'password123');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 9️⃣ Long Input Values
//   test('TC09 - Long input values', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('a'.repeat(100) + '@gmail.com', 'b'.repeat(50));
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 🔟 SQL Injection
//   test('TC10 - SQL injection attempt', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login("' OR 1=1 --", "' OR 1=1 --");
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 1️⃣1️⃣ XSS Input
//   test('TC11 - XSS input', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('<script>alert(1)</script>', 'test');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 1️⃣2️⃣ Refresh After Login
//   test('TC12 - Refresh after login', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', 'Password123');
//     await page.reload();
//     await expect(page).toHaveURL('/index.html');
//   });

//   // 1️⃣3️⃣ Direct URL Access Without Login
//   test('TC13 - Access protected page without login', async ({ page }) => {
//     await page.goto('/index.html');
//     await expect(page).toHaveURL('/login.html');
//   });

//   // 1️⃣4️⃣ Network Failure Simulation
//   test('TC14 - Network failure', async ({ page }) => {
//     await page.route('**/api/login', route => route.abort());
//     const login = new LoginPage(page);
//     await login.login('testuser@gmail.com', 'Password123');
//     await expect(page.locator('#error')).toBeVisible();
//   });

//   // 1️⃣5️⃣ Multiple Login Clicks
//   test('TC15 - Multiple login clicks', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.enterEmail('testuser@gmail.com');
//     await login.enterPassword('Password123');
//     await login.clickLogin();
//     await login.clickLogin();
//     await expect(page).toHaveURL('/index.html');
//   });

// });