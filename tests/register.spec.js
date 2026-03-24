// // const { test, expect } = require('@playwright/test');
// // const RegisterPage = require('../POM/RegisterPage');

// // test.describe('Register Module - Popup Handling', () => {

// //   test.beforeEach(async ({ page }) => {
// //     const register = new RegisterPage(page);
// //     await register.navigate();
// //   });

// //   // ✅ 1. Valid Registration
// //   test('TC01 - Valid registration', async ({ page }) => {
// //     const register = new RegisterPage(page);

// //     page.on('dialog', async dialog => {
// //       expect(dialog.message()).toContain('success'); // adjust message
// //       await dialog.accept();
// //     });

// //     await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');
// //     await register.clickRegister();
// //   });

// //   // ✅ 2. Empty Fields
// //   test('TC02 - Empty fields', async ({ page }) => {
// //     const register = new RegisterPage(page);

// //     page.on('dialog', async dialog => {
// //       expect(dialog.message()).toContain('fill'); // adjust message
// //       await dialog.accept();
// //     });

// //     await register.clickRegister();
// //   });

// //   // ✅ 3. Invalid Email
// //   test('TC03 - Invalid email', async ({ page }) => {
// //     const register = new RegisterPage(page);

// //     page.on('dialog', async dialog => {
// //       expect(dialog.message()).toContain('invalid');
// //       await dialog.accept();
// //     });

// //     await register.register('John', 'abc', 'Password123');
// //     await register.clickRegister();
// //   });

// //   // ✅ 4. Duplicate Email
// //   test('TC04 - Duplicate email', async ({ page }) => {
// //     const register = new RegisterPage(page);

// //     page.on('dialog', async dialog => {
// //       expect(dialog.message()).toContain('already');
// //       await dialog.accept();
// //     });

// //     await register.register('John', 'testuser@gmail.com', 'Password123');
// //     await register.clickRegister();
// //   });

// //   // ✅ 5. Short Password
// //   test('TC05 - Short password', async ({ page }) => {
// //     const register = new RegisterPage(page);

// //     page.on('dialog', async dialog => {
// //       expect(dialog.message()).toContain('password');
// //       await dialog.accept();
// //     });

// //     await register.register('John', 'test@gmail.com', '123');
// //     await register.clickRegister();
// //   });

// // });

const { test, expect } = require('@playwright/test');
const RegisterPage = require('../POM/RegisterPage');

test.describe('Register Module - ShopEase (Popup आधारित)', () => {

  test.beforeEach(async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();
  });

  // 🔹 Helper to handle popup
  async function handleDialog(page, expectedText = '') {
    page.once('dialog', async dialog => {
      console.log('Popup:', dialog.message());
      if (expectedText) {
        expect(dialog.message().toLowerCase()).toContain(expectedText.toLowerCase());
      }
      await dialog.accept();
    });
  }

  // 1️⃣ Valid Registration
  test('TC01 - Valid registration', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'success');
    await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');
    await register.clickRegister();
  });

  // 2️⃣ Empty All Fields
  test('TC02 - Empty fields', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'fill');
    await register.clickRegister();
  });

  // 3️⃣ Empty Name
  test('TC03 - Empty name', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'fill');
    await register.register('', 'test@gmail.com', 'Password123');
    await register.clickRegister();
  });

  // 4️⃣ Empty Email
  test('TC04 - Empty email', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'fill');
    await register.register('John', '', 'Password123');
    await register.clickRegister();
  });

  // 5️⃣ Empty Password
  test('TC05 - Empty password', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'fill');
    await register.register('John', 'test@gmail.com', '');
    await register.clickRegister();
  });

  // 6️⃣ Invalid Email Format
  test('TC06 - Invalid email', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'invalid');
    await register.register('John', 'abc', 'Password123');
    await register.clickRegister();
  });

  // 7️⃣ Duplicate Email
  test('TC07 - Duplicate email', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'exist');
    await register.register('John', 'testuser@gmail.com', 'Password123');
    await register.clickRegister();
  });

  // 8️⃣ Short Password
  test('TC08 - Short password', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'password');
    await register.register('John', 'test@gmail.com', '123');
    await register.clickRegister();
  });

  // 9️⃣ Long Input Values
  test('TC09 - Long input values', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page); // no strict validation
    await register.register('a'.repeat(50), `user${Date.now()}@gmail.com`, 'Password123');
    await register.clickRegister();
  });

  // 🔟 SQL Injection
  test('TC10 - SQL injection', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page);
    await register.register("' OR 1=1 --", "test@gmail.com", "Password123");
    await register.clickRegister();
  });

  // 1️⃣1️⃣ XSS Attack
  test('TC11 - XSS attack', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page);
    await register.register('<script>alert(1)</script>', 'test@gmail.com', 'Password123');
    await register.clickRegister();
  });

  // 1️⃣2️⃣ Special Characters in Name
  test('TC12 - Special characters', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page);
    await register.register('@#$%', `user${Date.now()}@gmail.com`, 'Password123');
    await register.clickRegister();
  });

  // 1️⃣3️⃣ Spaces Only Input
  test('TC13 - Spaces only input', async ({ page }) => {
    const register = new RegisterPage(page);
    await handleDialog(page, 'fill');
    await register.register('   ', '   ', '   ');
    await register.clickRegister();
  });

  // 1️⃣4️⃣ Multiple Clicks
 test('TC14 - Multiple clicks before navigation', async ({ page }) => {
  const register = new RegisterPage(page);

  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');

  // ✅ Double click quickly
  await page.dblclick('button:has-text("Create Account")');

  await page.waitForTimeout(2000);
});

  // 1️⃣5️⃣ Network Failure Simulation
  test('TC15 - Network failure', async ({ page }) => {
    const register = new RegisterPage(page);

    await page.route('**/register', route => route.abort());

    await handleDialog(page);
    await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');
    await register.clickRegister();
  });

});

// const { test, expect } = require('@playwright/test');
// const RegisterPage = require('../POM/RegisterPage');

// test.describe('Register Module - ShopEase (Popup आधारित) with Assertions', () => {

//   test.beforeEach(async ({ page }) => {
//     const register = new RegisterPage(page);
//     await register.navigate();
//   });

//   // 🔹 Helper to handle popup with assertion
//   async function handleDialog(page, expectedText = '') {
//     page.once('dialog', async dialog => {
//       console.log('Popup:', dialog.message());
//       if (expectedText) {
//         expect(dialog.message().toLowerCase()).toContain(expectedText.toLowerCase());
//       }
//       await dialog.accept();
//     });
// });


//   // 1️⃣ Valid Registration
//   test('TC01 - Valid registration', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'success');

//     const email = `user${Date.now()}@gmail.com`;
//     await register.register('John', email, 'Password123');
//     await register.clickRegister();

//     // ✅ Assertion: After registration, maybe URL changes or success message appears
//     await expect(page).toHaveURL(/.*success/); // adjust according to your app
//   });

//   // 2️⃣ Empty All Fields
//   test('TC02 - Empty fields', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'fill');

//     await register.clickRegister();

//     // ✅ Assertion: Ensure error message displayed or input has 'required' validation
//     const error = await page.locator('.error-message'); // adjust selector
//     await expect(error).toHaveText(/fill/i);
//   });

//   // 3️⃣ Empty Name
//   test('TC03 - Empty name', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'fill');

//     await register.register('', 'test@gmail.com', 'Password123');
//     await register.clickRegister();

//     const nameInput = await page.locator('#name'); // adjust selector
//     await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
//   });

//   // 4️⃣ Empty Email
//   test('TC04 - Empty email', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'fill');

//     await register.register('John', '', 'Password123');
//     await register.clickRegister();

//     const emailInput = await page.locator('#email'); // adjust selector
//     await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
//   });

//   // 5️⃣ Empty Password
//   test('TC05 - Empty password', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'fill');

//     await register.register('John', 'test@gmail.com', '');
//     await register.clickRegister();

//     const passwordInput = await page.locator('#password'); // adjust selector
//     await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
//   });

//   // 6️⃣ Invalid Email Format
//   test('TC06 - Invalid email', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'invalid');

//     await register.register('John', 'abc', 'Password123');
//     await register.clickRegister();

//     const emailInput = await page.locator('#email'); // adjust selector
//     await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
//   });

//   // 7️⃣ Duplicate Email
//   test('TC07 - Duplicate email', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'exist');

//     await register.register('John', 'testuser@gmail.com', 'Password123');
//     await register.clickRegister();

//     const error = await page.locator('.error-message'); // adjust selector
//     await expect(error).toHaveText(/already exists|exist/i);
//   });

//   // 8️⃣ Short Password
//   test('TC08 - Short password', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'password');

//     await register.register('John', 'test@gmail.com', '123');
//     await register.clickRegister();

//     const passwordInput = await page.locator('#password'); // adjust selector
//     await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
//   });

//   // 9️⃣ Long Input Values
//   test('TC09 - Long input values', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page);

//     const longName = 'a'.repeat(50);
//     const email = `user${Date.now()}@gmail.com`;
//     await register.register(longName, email, 'Password123');
//     await register.clickRegister();

//     // ✅ Assertion: Check registration success
//     await expect(page.locator('.success-message')).toHaveText(/success/i); 
//   });

//   // 🔟 SQL Injection
//   test('TC10 - SQL injection', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page);

//     await register.register("' OR 1=1 --", "test@gmail.com", "Password123");
//     await register.clickRegister();

//     // ✅ Assertion: Ensure registration blocked or proper validation message
//     await expect(page.locator('.error-message')).toHaveText(/invalid|blocked/i);
//   });

//   // 1️⃣1️⃣ XSS Attack
//   test('TC11 - XSS attack', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page);

//     await register.register('<script>alert(1)</script>', 'test@gmail.com', 'Password123');
//     await register.clickRegister();

//     await expect(page.locator('.error-message')).toHaveText(/invalid/i);
//   });

//   // 1️⃣2️⃣ Special Characters in Name
//   test('TC12 - Special characters', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page);

//     await register.register('@#$%', `user${Date.now()}@gmail.com`, 'Password123');
//     await register.clickRegister();

//     await expect(page.locator('.success-message')).toHaveText(/success/i);
//   });

//   // 1️⃣3️⃣ Spaces Only Input
//   test('TC13 - Spaces only input', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page, 'fill');

//     await register.register('   ', '   ', '   ');
//     await register.clickRegister();

//     await expect(page.locator('.error-message')).toHaveText(/fill/i);
//   });

//   // 1️⃣4️⃣ Multiple Clicks
//   test('TC14 - Multiple clicks before navigation', async ({ page }) => {
//     const register = new RegisterPage(page);
//     await handleDialog(page);

//     await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');

//     await page.dblclick('button:has-text("Create Account")');
//     await expect(page.locator('.success-message')).toHaveText(/success/i);
//   });

//   // 1️⃣5️⃣ Network Failure Simulation
//   test('TC15 - Network failure', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await page.route('**/register', route => route.abort());

//     await handleDialog(page);

//     await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');
//     await register.clickRegister();

//     // ✅ Assertion: check for network error message in UI
//     const error = await page.locator('.error-message');
//     await expect(error).toHaveText(/network|failed/i);
//   });

// });


// const { test, expect } = require('@playwright/test');
// const RegisterPage = require('../POM/RegisterPage');

// test.describe('Register Module - ShopEase (Popup आधारित)', () => {

//   test.beforeEach(async ({ page }) => {
//     const register = new RegisterPage(page);
//     await register.navigate();
//     await expect(page).toHaveTitle(/Register/i);  // Assertion → Page loaded
//   });

//   // 🔹 Popup Handler with Assertion
//   async function handleDialog(page, expectedText = '') {
//     page.once('dialog', async dialog => {
//       const msg = dialog.message().toLowerCase();
//       console.log("Popup:", msg);

//       if (expectedText) {
//         expect(msg).toContain(expectedText.toLowerCase()); // Assertion → Popup text validation
//       }

//       await dialog.accept();
//     });
//   }

//   // 1️⃣ Valid Registration
//   test('TC01 - Valid registration', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'success');

//     const email = `user${Date.now()}@gmail.com`;
//     await register.register('John', email, 'Password123');
//     await register.clickRegister();

//     // Assertion → After success, fields should reset
//     await expect(register.nameInput).toHaveValue('');
//     await expect(register.emailInput).toHaveValue('');
//   });

//   // 2️⃣ Empty All Fields
//   test('TC02 - Empty fields', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'fill');
//     await register.clickRegister();

//     // Assertion
//     await expect(page).not.toHaveURL(/dashboard/); 
//   });

//   // 3️⃣ Empty Name
//   test('TC03 - Empty name', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'fill');
//     await register.register('', 'test@gmail.com', 'Password123');
//     await register.clickRegister();

//     await expect(register.nameInput).toHaveValue('');
//   });

//   // 4️⃣ Empty Email
//   test('TC04 - Empty email', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'fill');
//     await register.register('John', '', 'Password123');
//     await register.clickRegister();

//     await expect(register.emailInput).toHaveValue('');
//   });

//   // 5️⃣ Empty Password
//   test('TC05 - Empty password', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'fill');
//     await register.register('John', 'test@gmail.com', '');
//     await register.clickRegister();

//     await expect(register.passwordInput).toHaveValue('');
//   });

//   // 6️⃣ Invalid Email Format
//   test('TC06 - Invalid email', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'invalid');
//     await register.register('John', 'abc', 'Password123');
//     await register.clickRegister();

//     await expect(register.emailInput).toHaveValue('abc');
//   });

//   // 7️⃣ Duplicate Email
//   test('TC07 - Duplicate email', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'exist');
//     await register.register('John', 'testuser@gmail.com', 'Password123');
//     await register.clickRegister();

//     await expect(page).not.toHaveURL(/dashboard/);
//   });

//   // 8️⃣ Short Password
//   test('TC08 - Short password', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'password');
//     await register.register('John', 'test@gmail.com', '123');
//     await register.clickRegister();

//     await expect(register.passwordInput).toHaveValue('123');
//   });

//   // 9️⃣ Long Input Values
//   test('TC09 - Long input values', async ({ page }) => {
//     const register = new RegisterPage(page);

//     const longName = 'a'.repeat(50);
//     await handleDialog(page);
//     await register.register(longName, `user${Date.now()}@gmail.com`, 'Password123');
//     await register.clickRegister();

//     await expect(register.nameInput).toHaveValue('');
//   });

//   // 🔟 SQL Injection
//   test('TC10 - SQL injection', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page);
//     await register.register("' OR 1=1 --", "test@gmail.com", "Password123");
//     await register.clickRegister();

//     await expect(page).not.toHaveURL(/dashboard/);
//   });

//   // 1️⃣1️⃣ XSS Attack
//   test('TC11 - XSS attack', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page);
//     await register.register('<script>alert(1)</script>', 'test@gmail.com', 'Password123');
//     await register.clickRegister();

//     await expect(page.locator('script')).toHaveCount(0);  // No XSS executed
//   });

//   // 1️⃣2️⃣ Special Characters in Name
//   test('TC12 - Special characters', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page);
//     await register.register('@#$%', `user${Date.now()}@gmail.com`, 'Password123');
//     await register.clickRegister();

//     await expect(register.nameInput).not.toBeVisible();
//   });

//   // 1️⃣3️⃣ Spaces Only Input
//   test('TC13 - Spaces only input', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await handleDialog(page, 'fill');
//     await register.register('   ', '   ', '   ');
//     await register.clickRegister();

//     await expect(page).not.toHaveURL(/dashboard/);
//   });

//   // 1️⃣4️⃣ Multiple Clicks
//   test('TC14 - Multiple clicks before navigation', async ({ page }) => {
//     const register = new RegisterPage(page);

//     page.once('dialog', async dialog => {
//       await dialog.accept();
//     });

//     await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');

//     await page.dblclick('button:has-text("Create Account")');

//     // Assertion
//     await expect(page).not.toHaveURL(/error/);
//   });

//   // 1️⃣5️⃣ Network Failure Simulation
//   test('TC15 - Network failure', async ({ page }) => {
//     const register = new RegisterPage(page);

//     await page.route('**/register', route => route.abort());

//     await handleDialog(page);
//     await register.register('John', `user${Date.now()}@gmail.com`, 'Password123');
//     await register.clickRegister();

//     await expect(page).not.toHaveURL(/dashboard/);
//   });

// });


// tests/register.spec.js

// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../POM/RegisterPage';

// test.describe('Register Module Tests', () => {
//   let registerPage;

//   test.beforeEach(async ({ page }) => {
//     registerPage = new RegisterPage(page);
//     await registerPage.navigate();
//     await registerPage.openRegisterPage();
//   });

//   test('1. Valid Registration - Popup Handling', async ({ page }) => {
//     // Listen for popup alert
//     page.once('dialog', async dialog => {
//       expect(dialog.message()).toContain("Registration successful");
//       await dialog.accept();
//     });

//     await registerPage.fillForm('Jaswanth', 'jaswanth@example.com', 'password123');
//     await registerPage.submit();

//     // Keep small verification (optional)
//     await expect(registerPage.emailInput).toHaveValue('jaswanth@example.com');
//   });

//   test('2. Invalid Email Format', async ({ page }) => {
//     page.once('dialog', async dialog => {
//       expect(dialog.message()).toBe("Enter valid email");
//       await dialog.accept();
//     });

//     await registerPage.fillForm('TestUser', 'invalid-email', 'password123');
//     await registerPage.submit();
//   });

//   test('3. Empty Fields Validation', async ({ page }) => {
//     page.once('dialog', async dialog => {
//       expect(dialog.message()).toBe("All fields are required");
//       await dialog.accept();
//     });

//     await registerPage.fillForm('', '', '');
//     await registerPage.submit();
//   });
// });