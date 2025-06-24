import { test, expect } from '../utils/Incognito.js';
//import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { USER_EMAIL, USER_PASSWORD } from '../utils/Env.js';


test.describe('Login tests', () => {

    test('user can login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(USER_EMAIL, USER_PASSWORD);

        await expect(page).toHaveURL(/.*\/user\/dashboard/);
    });

    test('login fails with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(USER_EMAIL, 'WrongPassword123');

        // Wait for popup and assert message
        const errorPopup = page.getByText('Invalid Email or Password!', { exact: false });
        await expect(errorPopup).toBeVisible();
        await expect(page).not.toHaveURL(/.*\/user\/dashboard/);
    });

    test('login fails with invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login('invalid@email.com', USER_PASSWORD);

        // Wait for popup and assert message
        const errorPopup = page.getByText('Invalid Email or Password!', { exact: false });
        await expect(errorPopup).toBeVisible();
        await expect(page).not.toHaveURL(/.*\/user\/dashboard/);
    });

    test('login fails with empty email and password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login('', '');

        await expect(page.getByText('The email field is required.')).toBeVisible();
        await expect(page.getByText('The password field is required.')).toBeVisible();

    });

    test('login fails with invalid email format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();

        // Set up listener BEFORE triggering the action
        page.on('dialog', async (dialog) => {
            // Log the message to help you learn what it says
            console.log('Dialog message:', dialog.message());
            await dialog.accept();
        });

        await loginPage.login('not-an-email', USER_PASSWORD);
    });


});