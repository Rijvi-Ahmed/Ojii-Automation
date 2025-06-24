import { test, expect } from '@playwright/test';
  import { MailSlurp } from "mailslurp-client";

test('test', async ({ page }) => {
  await page.goto('https://stage.ojii.com/user/login');
  await page.getByRole('link', { name: 'Create New Account' }).click();
  await page.getByRole('textbox', { name: 'Full Name *' }).click();
  await page.getByRole('textbox', { name: 'Full Name *' }).fill('Rijvi Ahmed');
  await page.getByRole('textbox', { name: 'Email Address *' }).click();
  await page.getByRole('textbox', { name: 'Email Address *' }).fill('rijvi625@gmail.com');
  await page.getByRole('textbox', { name: 'Customer Type * Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Customer Type * Phone Number *' }).fill('01749906658');
  await page.getByRole('textbox', { name: 'Address *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Address *', exact: true }).fill('Dhaka');
  await page.getByRole('textbox', { name: 'Create Password *' }).click();
  await page.getByRole('textbox', { name: 'Create Password *' }).fill('Cse12345@');
  await page.getByRole('textbox', { name: 'Confirm Password *' }).click();
  await page.getByRole('textbox', { name: 'Confirm Password *' }).fill('Cse12345@');
  await page.getByRole('button', { name: 'Register' }).click();

const apiKey = process.env.MAILSLURP_API_KEY;
const mailslurp = new MailSlurp({ apiKey });

const inbox = await mailslurp.createInbox(); // Generates a new test inbox
await page.fill('#email', inbox.emailAddress);
await page.click('#register');

// Wait for the email to arrive
const email = await mailslurp.waitForLatestEmail(inbox.id, 30000);

// Extract token or link from email
const verificationLink = email.body.match(/https:\/\/[^ ]+/)[0];
  
  await page.goto('https://stage.ojii.com/user/register/verify');
  await page.getByRole('textbox', { name: 'Enter token' }).click();
  await page.getByRole('textbox', { name: 'Enter token' }).fill('115080');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.goto('https://stage.ojii.com/user/dashboard');
  await page.getByRole('link', { name: 'Edit Profile' }).nth(1).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
});
