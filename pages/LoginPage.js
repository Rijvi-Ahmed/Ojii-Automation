// npx playwright test tests/Login.spec.js --debug
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Your Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.loginLink = page.getByRole('link', { name: 'Log In' });
  }

  async navigateToLoginPage() {
    await this.visitBaseUrl();
    await this.loginLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
  
}
