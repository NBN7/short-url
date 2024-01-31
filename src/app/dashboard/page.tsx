"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AboveTheFold } from "@/components/AboveTheFold";
import { Dashboard } from "@/components/Dashboard";

import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push(ROUTES.HOME);
    }
  }, [session]);

  const props = {
    title: "Dashboard",
  };

  return (
    <AboveTheFold {...props}>
      <Dashboard session={session} />
    </AboveTheFold>
  );
}
