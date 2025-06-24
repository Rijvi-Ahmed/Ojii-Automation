import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { USER_EMAIL, USER_PASSWORD } from '../utils/Env.js';

test.describe('Home page tests', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(USER_EMAIL, USER_PASSWORD);
    });

    test('should display user dashboard after login', async ({ page }) => {
        await expect(page).toHaveURL(/.*\/user\/dashboard/);
        // Add more assertions for dashboard elements
    });

    test('should show user profile information', async ({ page }) => {
        // Add test for profile information display
    });

    test('should allow user to navigate to different sections', async ({ page }) => {
        // Add test for navigation functionality
    });
});



