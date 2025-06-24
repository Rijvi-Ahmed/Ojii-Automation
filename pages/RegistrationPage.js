// pages/Registration.js
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.createAccountLink = page.getByRole('link', { name: 'Create New Account' });
    this.nameInput = page.getByRole('textbox', { name: 'Full Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
    this.phoneInput = page.getByRole('textbox', { name: 'Customer Type * Phone Number *' });
    this.addressInput = page.getByRole('textbox', { name: 'Address *', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Create Password *' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password *' });
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.tokenInput = page.getByRole('textbox', { name: 'Enter token' });
    this.verifyBtn = page.getByRole('button', { name: 'Verify' });
  }

  async navigateToRegister() {
    await this.visitBaseUrl();
    await this.loginLink.click();
    await this.createAccountLink.click();
  }

  async fillRegistrationForm({ name, email, phone, address, password }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.addressInput.fill(address);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitRegistration() {
    await this.registerBtn.click();
  }

  async verifyToken(token) {
    await this.page.goto(`${this.getBaseUrl()}/user/register/verify`);
    await this.tokenInput.fill(token);
    await this.verifyBtn.click();
  }
}
