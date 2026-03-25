const { test, expect } = require('@playwright/test');
const RegisterPage = require('../POM/RegisterPage');

async function validatePopup(page, expected) {
  return new Promise(resolve => {
    page.once("dialog", async dialog => {
      const msg = dialog.message().toLowerCase();
      console.log("POPUP:", msg);
      expect(msg).toContain(expected.toLowerCase());
      await dialog.accept();
      resolve();
    });
  });
}

test.describe("Register Module - ShopEase", () => {

  test("TC01 - Valid Registration", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("Raghu", `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

test("TC02 - Empty All Fields (should fail)", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.navigate();

  await register.clickSignup();

  await expect(page.locator(register.nameError)).toBeVisible();
  await expect(page.locator(register.emailError)).toBeVisible();
  await expect(page.locator(register.passwordError)).toBeVisible();
});

test("TC03 - Empty Name", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.navigate();

  await register.register("", "test@gmail.com", "12345678");
  await register.clickSignup();

  await expect(page.locator(register.nameError)).toBeVisible();
});

  test("TC04 - Empty Email", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "registration failed");
    await register.register("Raghu", "", "12345678");
    await register.clickSignup();
    await popup;
  });

  test("TC05 - Empty Password", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "registration failed");
    await register.register("Raghu", "abc@gmail.com", "");
    await register.clickSignup();
    await popup;
  });

test("TC06 - Invalid email format", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.navigate();

  await register.register("Raghu", "fewfj", "12345678");

  // Try to submit
  await register.clickSignup();

  // Capture browser validation message
    const emailValidationMessage = await register.emailInput.evaluate(
  el => el.validationMessage
);
expect(emailValidationMessage).toContain("Please ");
});


  test("TC07 - Duplicate Email", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "email already registered");
    await register.register("Raghu", "raghu@gmail.com", "12345678");
    await register.clickSignup();
    await popup;
  });

test("TC08 - Short password", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.navigate();

  await register.register("Raghu", "test@gmail.com", "123");
  await register.clickSignup();

  await expect(page.locator(register.passwordError)).toBeVisible();
});

  test("TC09 - Long Values", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("a".repeat(50), `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

  test("TC10 - SQL Injection", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("' OR 1=1 --", `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

  test("TC11 - XSS Attack", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("<script>alert(1)</script>", `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

  test("TC12 - Special Characters", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("@#$%", `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

  test("TC13 - Spaces Only", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "registration failed");
    await register.register("   ", "   ", "   ");
    await register.clickSignup();
    await expect(page.locator(register.emailError)).toHaveText("Invalid email address");

  });

  test("TC14 - Multiple Clicks", async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "account created!");
    await register.register("Raghu", `auto${Date.now()}@gmail.com`, "12345678");

    await page.dblclick('button:has-text("Sign up")');
    await popup;
  });

  test("TC15 - Network Failure", async ({ page }) => {
    await page.route("**/register", route => route.abort());

    const register = new RegisterPage(page);
    await register.navigate();

    const popup = validatePopup(page, "failed");
    await register.register("Raghu", `auto${Date.now()}@gmail.com`, "12345678");
    await register.clickSignup();
    await popup;
  });

});