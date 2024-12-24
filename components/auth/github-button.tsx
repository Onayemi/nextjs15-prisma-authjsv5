"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import { BsGithub } from "react-icons/bs";
import { githubAuthenticate } from "@/actions/github-login";
import { FormError } from "./form-error";

export default function GithubLogin() {
  const [errorMsgGithub, dispatchGithub] = useActionState(
    githubAuthenticate,
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
      <p>{errorMsgGithub?.error}</p>
      {/* <FormError message={errorMsgGithub} /> */}
    </form>
  );
}
