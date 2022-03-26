const nodemailer = require("nodemailer");
const sendMail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL_ADDRESS,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SMTP_EMAIL_ADDRESS,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };

  await transporter.sendMail(mailOption);
};
module.exports = sendMail;
