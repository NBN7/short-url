"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider>
          <ProgressBar
            color="#ffffff"
            height="2px"
            options={{
              showSpinner: false,
            }}
          />
          {children}
          <Toaster />
        </SessionProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
