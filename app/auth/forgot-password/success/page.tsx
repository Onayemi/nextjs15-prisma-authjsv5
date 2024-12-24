import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function SuccessPage() {
  return (
    <main>
      <h1>Password Reset</h1>
      <p>If the email doesn't show up, check your spam folder.</p>
      <Button>
        <Link href="/auth/login">Return to Login</Link>
      </Button>
    </main>
  );
}
