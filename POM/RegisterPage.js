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