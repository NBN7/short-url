import { Suspense, lazy } from "react";

import { useGetLinks } from "@/hooks/useGetLinks";

const Card = lazy(() => import("./Card/index"));
import { CardSkeleton } from "./Card/CardSkeleton";
import { CardEmpty } from "./Card/CardEmpty";

import type { Link } from "@prisma/client";
import type { Session } from "next-auth";

interface DashboardProps {
  session: Session | null;
}

export const Dashboard = ({ session }: DashboardProps) => {
  const { links } = useGetLinks({ session });

  const reversedLinks = links ? [...links].reverse() : [];

  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {links && (
        <>
          {links?.length === 0 ? (
            <CardEmpty />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {reversedLinks?.map((link: Link) => (
                <Suspense key={link.id} fallback={<CardSkeleton />}>
                  <Card link={link} session={session} />
                </Suspense>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
