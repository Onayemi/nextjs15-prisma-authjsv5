"use client";

import { googleAuthenticate } from "@/actions/google-login";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function GoogleLogin() {
  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthenticate,
    undefined
  );
  return (
    <form className="flex mt-4" action={dispatchGoogle}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGoogle />
        Google Sign In
      </Button>
      <p>{errorMsgGoogle}</p>
    </form>
  );
}

export function GithubLogin() {
  const [errorMsgGithub, dispatchGithub] = useActionState(
    googleAuthenticate,
    undefined
  );
  return (
    <form className="flex mt-4" action={dispatchGithub}>
      <Button
        variant={"outline"}
        className="flex flex-row items-center gap-3 w-full"
      >
        <BsGithub />
        Github Sign In
      </Button>
      <p>{errorMsgGithub}</p>
    </form>
  );
}
// export default GoogleLogin;
