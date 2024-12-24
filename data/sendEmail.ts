import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // set errro flag in next.d.ts

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string
) => {
  try {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL } =
      process.env;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: SMTP_FROM_EMAIL,
      to: userEmail,
      subject,
      html: message, //text: message,
    };

    await transporter.sendMail(mailOptions);
    // console.log("Message sent: %s", info.messageId);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong" + error,
      },
      { status: 500 }
    );
    // return { error: "Something went wrong" };
  }
};
