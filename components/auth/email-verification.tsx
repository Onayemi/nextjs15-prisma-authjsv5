"use client";
import { useSearchParams } from "next/navigation";

export default function EmailVerification() {
  const searchParams = useSearchParams();
  const search = searchParams.get("verifyToken");

  //   verify the email

  // update the database column emailverification
  return <div>email Verification {search}</div>;
}
