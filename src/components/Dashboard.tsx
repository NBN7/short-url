import { useLinks } from "@/hooks/useLinks";

import { LinkUI } from "./LinkUI";
import { CardDropdown } from "./CardDropdown";

import { Card, CardHeader } from "@nextui-org/card";

import type { Link } from "@prisma/client";

import type { Session } from "next-auth";

interface DashboardProps {
  session: Session | null;
}

export const Dashboard = ({ session }: DashboardProps) => {
  const { links } = useLinks({ session });

  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {links?.length === 0 ? (
        <Card>
          <CardHeader className="justify-between">
            <p className="font-semibold text-gray-400">No links to show</p>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links?.map((link: Link) => (
            <Card key={link.id}>
              <CardHeader className="justify-between">
                <div className="overflow-hidden">
                  <LinkUI href={`/z/${link.shortUrl}`}>
                    /z/{link.shortUrl}
                  </LinkUI>
                  <p className="text-gray-400 truncate">{link.url}</p>
                  {/* <p className="truncate">{link.description}</p> */}
                </div>

                <CardDropdown
                  session={session}
                  shortUrl={link.shortUrl}
                  link={`${process.env.NEXT_PUBLIC_URL}/z/${link.shortUrl}`}
                />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
