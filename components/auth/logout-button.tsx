"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      className="mt-3"
      variant={"destructive"}
      onClick={() => {
        signOut({
          callbackUrl: "/auth/login",
        });
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
