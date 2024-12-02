import sgMail from "@sendgrid/mail";
import { ADMIN_EMAIL_ADDRESS, SENDGRID_API_KEY } from "../config.ts";

type EmailMessage = {
  to: string;
  subject: string;
  text?: string;
  html: string;
};

export interface MailClient {
  send(message: EmailMessage): Promise<boolean>;
}

export function sendMail(client: MailClient, message: EmailMessage) {
  return client.send(message);
}

function createMailClientWithSendGrid(sgMail: sgMail.MailService): MailClient {
  sgMail.setApiKey(SENDGRID_API_KEY);
  return {
    send: async (message) => {
      const [res] = await sgMail.send({
        ...message,
        from: ADMIN_EMAIL_ADDRESS,
      });
      return res.statusCode < 300;
    },
  };
}

export function createMailClient() {
  return createMailClientWithSendGrid(sgMail);
}
