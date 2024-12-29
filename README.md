This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
npx create-next-app@latest
npm i prisma--save-dev
npx prisma init

npx prisma db push
npx prisma studio

npm i @prisma/client @auth/prisma-adapter
npm i next-auth@beta

--- Create Model for Schema ---
npm prisma generate
npx prisma db push

auth.ts
auth.config.ts

npm i bcryptjs zod
npm i -save-dev @types/bcryptjs

npm i react-hook-form
npm i @hookform/resolvers

npm i react-icons

.env
DATABASE_URL="postgresql://postgres:light@localhost:5432/nextjs15_authv5?schema=public"
AUTH_SECRET=hfgkjhjkfgdfgjhghgjhgjjk
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

"use client"
import { signIn } from 'next-auth/react'

export default function GitHubButton() {
return (
<button onClick={() => signIn('github')>Continue with GitHub</button>
 )
}

'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

const { data: session } = useSession()
const pathname = usePathname()

https://www.twblocks.com/

npm i framer-motion

```

## Github Push

```bash
git init
git add .
git commit -m "Added auth"
git branch -M main
git remote add origin git@github.com:Onayemi/nextjs15-prisma-authjsv5.git
git push -u origin main
```

```bash
git add .
git commit -m "Added auth"
git push -u origin main
```

```bash
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
    };
    token: {
      id: string;
      role: string;
    };
  }
}

```

```bash
npm i uuid --force ---> Nextjs 15 to generate random
JavaScript / TypeScript:
import { v4 as uuid } from "uuid";
 console.log("uuid verification code : ", uuid());
 uuid v6 verification code :  1efc1e2e-20d5-6930-b278-495867e170ab
 uuid v4 verification code :  60bab2b6-3057-459c-8642-24d938699ee9

npm i nodemailer

To install nodemailer in Nextjs 15 React 19
npm i nodemailer --legacy-peer-deps

Verification link
const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser?.id}`

utils/sendEmail.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // set it in next.d.ts

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject,
      text: message, //html: message,
    };

    await transporter.sendEmail(mailOptions);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong" + error,
      },
      { status: 500 }
    );
  }
};


.env
NEXT_PUBLIC_URL="http://localhost:3000"
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=

In the register server action form
await sendEmail(newUser?.email, "Email Verification", verificationLink);
```

```bash
see video: https://www.youtube.com/watch?v=vu78olWoV0I
Forgot Password Method
Tips:
# find the user with email
# create a reset token
# save the reset token in ForgotPasswordToken
# send reset password link in email

# Reset Password
password-reset/[token]/page.tsx
```

```bash
Add backgroundImage to tailwind

extend: {
  backgroundImage: {
    bannerImg: "url("/bannerImg.jpg")"
  },
  ...
}

bg-bannerImg bg-repeat bg-cover bg-bottom w-full
```

```bash
types/authjs.d.ts

import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}


auth.ts
async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // If there is existing account meaning they login with google account
      const existingAccount = await getAccountByUserId(existingUser.id);
      // token.role = user.role;
      // token.isOauth --> if they authenticated with google provider
      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;
      return token;
    },
    async session({ token, session }) {
      // console.log("session token", token);
      // console.log("session object", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
          name: token.name,
          role: token?.role,
        },
      };
    },
```

```bash
--- axios.ts ---
import axios from "axios"

const myAxios = axios.create({
  baseUrl: "http://localhost:8000/api",
  headers: {
      Accept: "application/json",
      Authorization: `Bearer ${user.token}`,
    }
})
export default myAxios;

----------------
import { useRouter } from "next/navigation"
import axios from "axios"

const deletePost =() => {
  axios.delete(`${POST_URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
    }
  }).then(() => {
    toast.success("Post Deleted Successfully", { theme: "colored"});
    router.refresh()
  }).catch((err) => {
    toast.error("Something went wrong, please try again", { theme: "colored" });
  })
}

npm i react-toastify

```
