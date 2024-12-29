import { type DefaultSession } from "next-auth";
declare module "nodemailer";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
