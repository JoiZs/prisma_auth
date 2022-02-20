import nodemailer from "nodemailer";

export async function sendMail(to: string, html: string) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"..." <foo@example.com>',
    to: to,
    subject: "Password Reset",
    text: "Change Password",
    html: html,
  });

  return nodemailer.getTestMessageUrl(info);
}
