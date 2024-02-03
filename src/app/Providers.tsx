"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
