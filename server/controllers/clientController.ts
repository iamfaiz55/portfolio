import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import sendEmail from "../utils/email";
import Client from "../models/Client";
import sendEmail from "../utils/email";

interface RegisterRequestBody {
  name: string;
  email: string;
  mobile: number | string;
  message: string;
}

export const contact = asyncHandler(
  async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
  ): Promise<any> => {
    const { name, email, mobile, message } = req.body;

    await Client.create({ name, email, mobile, message });

    const clientEmailSent = await sendEmail({
      to: email,
      subject: "Registration",
      message: `Hi ${name}, thank you for reaching out! I appreciate your message and will get back to you as soon as possible. Have a great day!`,
    });

    const adminEmailSent = await sendEmail({
      to: process.env.EMAIL || "",
      subject: "Registration",
      message: `
      Name: ${name},
      Email: ${email},
      mobile: ${mobile},
      Message: ${message}
    `,
    });

    if (clientEmailSent && adminEmailSent) {
      return res.status(200).json({ message: "Emails sent successfully" });
    } else {
      return res.status(400).json({ message: "Unable to send email(s)" });
    }
  }
);
