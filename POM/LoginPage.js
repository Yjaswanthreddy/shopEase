// class LoginPage {
//   constructor(page) {
//     this.page = page;

//     // Locators
//     this.email = '#email';
//     this.password = '#password';
//     this.loginBtn = '#loginBtn';
//     this.errorMsg = '#error';
//   }

//   // Actions
//   async navigate() {
//     await this.page.goto('https://node-project--yjaswanthjessi.replit.app/login.html');
//   }

//   async enterEmail(email) {
//     await this.page.fill(this.email, email);
//   }

//   async enterPassword(password) {
//     await this.page.fill(this.password, password);
//   }

//   async clickLogin() {
//     await this.page.click(this.loginBtn);
//   }

//   async login(email, password) {
//     await this.enterEmail(email);
//     await this.enterPassword(password);
//     await this.clickLogin();
//   }

//   // Validations
//   async getErrorMessage() {
//     return await this.page.textContent(this.errorMsg);
//   }

//   async getCurrentUrl() {
//     return this.page.url();
//   }
// }

// module.exports = LoginPage;
