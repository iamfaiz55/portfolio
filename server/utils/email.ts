import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  message: string;
}

const sendEmail = ({
  to,
  subject,
  message,
}: SendEmailParams): Promise<string> =>
  new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    transport.sendMail(
      {
        from: process.env.EMAIL,
        to,
        subject,
        text: message,
      },
      (err) => {
        if (err) {
          console.error(err.message || "Unable to send email");
          reject(err.message || "Unable to send email");
        } else {
          console.log("Email sent successfully");
          resolve("Email sent successfully");
        }
      }
    );
  });

export default sendEmail;
