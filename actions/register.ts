"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";
import { ForgotSchema, RegisterSchema, ResetPasswordSchema } from "@/schema";
import { v4 as uuid } from "uuid";
import { sendEmail } from "@/data/sendEmail";
import { redirect, RedirectType } from "next/navigation";
import { NextResponse } from "next/server";

function getRandomSixDigit() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

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
    // let randomSixDigit = getRandomSixDigit();
    const val = {
      fullname: name,
      verificationToken: uuid(),
      number_token: getRandomSixDigit(),
    };
    // const verificationToken = uuid();
    // console.log("uuid v4 verification code : ", uuid());
    const verificationLink = `
    <p className="p-6 mb-3">Hey ${val.fullname},</p>
    <p className="bg-gray-300 p-6 mb-3">
      If you’re running Node.js version 6 or later, you can use Nodemailer. There are no specific platform or resource requirements. All Nodemailer methods support both callbacks and Promises (if no callback is provided). If you want to use async..await, you’ll need Node.js v8.0.0 or newer. 
      <br/><br/>
      click here to  <a href='${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${val.verificationToken}'>verify email</a> 
      <br/><br/> 
      Verifcation token expires in 30 minutes
      <br/><br/>
        Verify Code: <b> ${val.number_token}</b>
      <br/><br/>
      Check out EmailEngine – a self-hosted email gateway that allows you to make REST requests to IMAP and SMTP servers. EmailEngine also sends webhooks whenever something changes on the registered accounts.
    </p>
    `;
    await sendEmail(lowerCaseEmail, "Email Verification", verificationLink);
    // This is Query Parament ?verify={token}
    // const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser?.id}`;
    return { success: "User created Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

export const forgotPassword = async (data: z.infer<typeof ForgotSchema>) => {
  try {
    const validateData = ForgotSchema.parse(data);

    if (!validateData) {
      return { error: "Invalid input data" };
    }
    const { email } = validateData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "This email is not registered" };
    }

    const token = await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        // token: `${randomUUID()}${randomUUID()}`.replace(/-/g, '')
        token: uuid(),
      },
    });

    // 1. Query Parament ?verify={token} and 2. URL parameter password-reset/{token}
    const verificationLink = `
    <p className="p-6 mb-3">
      Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, 
      please click here: <a href='${process.env.NEXT_PUBLIC_URL}/password-reset/${token.token}'>${process.env.NEXT_PUBLIC_URL}/password-reset/${token.token}</a>
    </p>
    <p className="bg-gray-300 p-6 mb-3">
      For security reasons, this link is only valid for four hours
    </p>
    <p className="bg-gray-300 p-6 mb-3">
      If you did not request this reset, please ignore this email
    </p>
    `;
    // Send mail
    await sendEmail(user.email, "Reset Email Verification", verificationLink);
    // return { success: "Password reset successfully" };
    // return redirect("/auth/forgot-password/success");
    // redirect("/auth/forgot-password/success", RedirectType.replace);
    return NextResponse.redirect(`/auth/forgot-password/success`);
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  try {
    const validateData = ResetPasswordSchema.parse(data);

    if (!validateData) {
      return { error: "Invalid input data" };
    }
    const { password, confirm } = validateData;

    // const passwordResetToken = await prisma.passwordResetToken.findUnique({
    //   where: {
    //     token: params.token,
    //     // check if the token is created in 4 hours ago
    //     cretedAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
    //     resetAt: null,
    //   },
    // });

    // if (!passwordResetToken) {
    //   return { error: "Invalid input data" };
    // }

    //  const hashedPassword = await bcrypt.hash(password, 10);
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: passwordResetToken.userId,
    //     data: {
    //       password: hashedPassword
    //     }
    //   }
    // })

    //  const updateToken = await prisma.passwordResetToken.update({
    //   where: {
    //     id: PasswordReset.id,
    //   },
    //   data: {
    //     resetAt:  new Date(),
    //   }
    // });
    // try {
    //   await prisma.$transaction({updateUser, updateToken})
    // } catch (error) {
    //   console.log(error);
    //   return { error: "An unexpected error occurred. Please try again" };
    // }
    // redirect("/auth/login");
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

// export default function PasswordReset({
//   params,
// }: {
//   params: { token: string };
// }) {}
