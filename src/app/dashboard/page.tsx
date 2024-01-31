"use client";

import { useSession } from "next-auth/react";

import { AboveTheFold } from "@/components/AboveTheFold";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  const { data: session } = useSession();

  const props = {
    title: "Dashboard",
  };

  return (
    <AboveTheFold {...props}>
      <Dashboard session={session} />
    </AboveTheFold>
  );
}
