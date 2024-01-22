"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import { AboveTheFold } from "@/components/AboveTheFold";

import { Button } from "@nextui-org/button";

import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const props = {
    title: "Welcome!",
    description: "Sign In to make the most of the app",
  };

  const handleClick = () => {
    signIn("github");
  };

  //   useEffect(() => {
  //     if (session) {
  //       router.push("/");
  //     }
  //   }, [session]);

  return (
    <AboveTheFold {...props}>
      <Button
        className="mt-10"
        variant="light"
        startContent={<FaGithub size="20px" />}
        onClick={handleClick}
      >
        Sign In with GitHub
      </Button>
    </AboveTheFold>
  );
}
