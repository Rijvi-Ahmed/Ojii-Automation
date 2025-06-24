// pages/BasePage.js
import { BASE_URL } from '../utils/Env';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = BASE_URL;
  }

  async visitBaseUrl() {
    await this.page.goto(this.baseUrl, { timeout: 160000 });
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
