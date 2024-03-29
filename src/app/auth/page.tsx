"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import { AboveTheFold } from "@/components/AboveTheFold";

import { Button } from "@nextui-org/button";

import { ROUTES } from "@/constants/routes";

import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const { status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    await signIn("github");

    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push(ROUTES.HOME);
    }
  }, [status, router]);

  return (
    <AboveTheFold
      title="Welcome!"
      description="Sign In to make the most of the app"
    >
      <Button
        className="mt-10"
        variant="light"
        startContent={isLoading ? null : <FaGithub size="20px" />}
        isLoading={isLoading}
        onClick={handleClick}
      >
        Sign In with GitHub
      </Button>
    </AboveTheFold>
  );
}
