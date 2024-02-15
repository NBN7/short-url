"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AboveTheFold } from "@/components/AboveTheFold";
import { Dashboard } from "@/components/Dashboard";

import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(ROUTES.HOME);
    }
  }, [status, router]);

  const props = {
    title: "Dashboard",
  };

  return (
    <AboveTheFold {...props}>
      <Dashboard session={session} />
    </AboveTheFold>
  );
}
