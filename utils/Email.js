import { MailSlurp } from 'mailslurp-client';
import { MAILSLURP_API_KEY } from '../utils/Env.js';

const mailslurp = new MailSlurp({ apiKey: MAILSLURP_API_KEY });

export async function createTestInbox() {
  return await mailslurp.createInbox();
}

export async function waitForVerificationEmail(inboxId) {
  const email = await mailslurp.waitForLatestEmail(inboxId, 30000);
  const match = email.body.match(/(\d{6})/); // Assuming 6-digit token
  return match ? match[1] : null;
}
