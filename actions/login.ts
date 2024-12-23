"use server";

import * as z from "zod";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.parse(data);

  if (!validateData) {
    return { error: "Invalid input data" };
  }
  const { email, password } = validateData;
  // const hashedPassword = await bcrypt.hash(password, 10);
  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExist || !userExist.password || !userExist.email) {
    return { error: "user not found" };
  }

  try {
    await signIn("credentials", {
      email: userExist.email,
      password,
      redirectTo: "/dashboard",
    });
    //return { success: "User created Successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }
  return { success: "User logged in successfully" };
};
