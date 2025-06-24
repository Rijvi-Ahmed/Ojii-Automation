import { test, expect } from '../utils/Incognito.js';
//import { test, expect } from '@playwright/test';
import { createTestInbox, waitForVerificationEmail } from '../utils/Email.js';
import { RegistrationPage } from '../pages/RegistrationPage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Register user and verify email token', async ({ page }) => {
    const registration = new RegistrationPage(page);
    const inbox = await createTestInbox();

    //got to registration page
    await registration.navigateToRegister();

    // Generate a random 11-digit BD phone number starting with 017
    const phone = `017${Math.floor(10000000 + Math.random() * 90000000)}`;
    // Generate a secure password
    const password = `Cse${Math.floor(1000 + Math.random() * 9000)}@`;

    //fillup registration data
    await registration.fillRegistrationForm({
        name: 'Rijvi Ahmed',
        email: inbox.emailAddress,
        phone,
        address: 'Dhaka',
        password,
    });
    await registration.submitRegistration();

    //verify account throug token
    const token = await waitForVerificationEmail(inbox.id);
    await registration.verifyToken(token);

     // using invalid email to unable to login but account is created
    const errorPopup = page.getByText('Your Email is not Verified!', { exact: false });
    await expect(errorPopup).toBeVisible(); 


    //saving credentials on storage file
    const registrationData = {
        email: inbox.emailAddress,
        password
    };

    const storagePath = path.join(__dirname, '../storage/loginCredential.json');

    fs.writeFileSync(storagePath, JSON.stringify(registrationData, null, 2));

    console.log(`Registration data saved to ${storagePath}`);
});
