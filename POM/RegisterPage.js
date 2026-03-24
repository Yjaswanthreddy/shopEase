class RegisterPage {
  constructor(page) {
    this.page = page;

    this.name = '#name';
    this.email = '#email';
    this.password = '#password';
    this.createAccountBtn = 'button:has-text("Create Account")';
  }

  async navigate() {
    await this.page.goto('https://node-project--yjaswanthjessi.replit.app/register.html');
  }

  async register(name, email, password) {
    await this.page.fill(this.name, name);
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
  }

 async clickRegister() {
  await Promise.all([
    this.page.waitForLoadState('load'),
    this.page.click(this.createAccountBtn)
  ]);
}
}

module.exports = RegisterPage;

// POM/RegisterPage.js

// export class RegisterPage {
//   constructor(page) {
//     this.page = page;

//     // Locators (using Inspect from your project)
//     this.registerLink = page.getByText('Register');
//     this.nameInput = page.locator('#name');
//     this.emailInput = page.locator('#email');
//     this.passwordInput = page.locator('#password');
//     this.submitButton = page.getByRole('button', { name: 'Register' });
//   }

//   async navigate() {
//     await this.page.goto('https://node-project--yjaswanthjessi.replit.app/');
//   }

//   async openRegisterPage() {
//     await this.registerLink.click();
//   }

//   async fillForm(name, email, password) {
//     await this.nameInput.fill(name);
//     await this.emailInput.fill(email);
//     await this.passwordInput.fill(password);
//   }

//   async submit() {
//     await this.submitButton.click();
//   }
// }