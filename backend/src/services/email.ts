import "dotenv/config";

import { createTransport } from "nodemailer";

export async function sendEmail(recipient: string, subjectString: string, body: string) {
  const transporter = createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASS,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.GMAILUSER, // sender address
    to: recipient, // list of receivers
    subject: subjectString,
    text: body,
  };

  const response = await transporter.sendMail(mailData);

  return response;
}
