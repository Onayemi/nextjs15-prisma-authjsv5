"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";
import { RegisterSchema } from "@/schema";
import { v4 as uuid } from "uuid";
import { sendEmail } from "@/data/sendEmail";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validateData = RegisterSchema.parse(data);

    if (!validateData) {
      return { error: "Invalid input data" };
    }
    const { email, name, password, passwordConfirmation } = validateData;
    if (password !== passwordConfirmation) {
      return { error: "Password does not match" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      return { error: "user already exists" };
    }
    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    // Send verification Email
    const verificationToken = uuid();
    // console.log("uuid v4 verification code : ", uuid());
    const verificationLink = `
    click here to  <a href='${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}'>verify email</a> 
    <br/><br/> Verifcation token expires in 30 minutes
    <p className="bg-gray-300 p-6 my-3">
      If you’re running Node.js version 6 or later, you can use Nodemailer. There are no specific platform or resource requirements. All Nodemailer methods support both callbacks and Promises (if no callback is provided). If you want to use async..await, you’ll need Node.js v8.0.0 or newer. 
      <br/><br/>
      Check out EmailEngine – a self-hosted email gateway that allows you to make REST requests to IMAP and SMTP servers. EmailEngine also sends webhooks whenever something changes on the registered accounts.
    </p>
    `;
    await sendEmail(lowerCaseEmail, "Email Verification", verificationLink);
    // const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser?.id}`;
    return { success: "User created Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
