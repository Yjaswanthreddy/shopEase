const { expect } = require('@playwright/test');

class RegisterPage {

  constructor(page) {
    this.page = page;

    // Locators
    this.nameInput = page.getByRole('textbox', { name: 'John Doe' });
    this.emailInput = page.getByRole('textbox', { name: 'you@example.com' });
    this.passwordInput = page.getByRole('textbox', { name: '••••••••' });
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
    // this.emailInput = 'input[placeholder="you@example.com"]';


    // Error messages
    this.nameError = "text=Name must be at least 2 characters";
    this.emailError = "text=Invalid email address";
    this.passwordError = "text=Password must be at least 6 characters";
  }

  async navigate() {
    await this.page.goto('https://asset-manager--jaswanth1502.replit.app/');
    await this.signupLink.click();
  }

  async register(name, email, password) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async handleAlert(expectedText = '') {
    this.page.once('dialog', async dialog => {
      console.log("Popup:", dialog.message());
      if (expectedText) {
        expect(dialog.message()).toContain(expectedText);
      }
      await dialog.accept();
    });
  }
}

module.exports = RegisterPage;