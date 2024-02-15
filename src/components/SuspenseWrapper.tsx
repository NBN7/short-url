import { Suspense } from "react";
import { CardSkeleton } from "./Card/CardSkeleton";

interface SuspenseWrapperProps {
  children: React.ReactNode;
}

export const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return <Suspense fallback={<CardSkeleton />}>{children}</Suspense>;
};
