"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/prisma";
import { RegisterSchema } from "@/schema";

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
    return { success: "User created Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
