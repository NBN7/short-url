"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
