"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function githubAuthenticate() {
  try {
    await signIn("github", {
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // console.log(error.type);
      switch (error.type) {
        case "OAuthAccountNotLinked":
          return { error: "Email has been used for another provider" };
        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }
}
