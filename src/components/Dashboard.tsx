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
  const { links, isLoading } = useLinks({ session });

  const reversedLinks = links ? [...links].reverse() : [];

  return (
    <section className="w-full flex flex-col gap-6 mt-6">
      {links?.length === 0 ? (
        <Card>
          <CardHeader>
            <p className="font-semibold text-gray-400">No links to show</p>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {reversedLinks?.map((link: Link) => (
            <Card key={link.id}>
              <CardHeader className="justify-between">
                <div className="overflow-hidden">
                  <LinkUI href={`/z/${link.shortUrl}`}>
                    /z/{link.shortUrl}
                  </LinkUI>
                  <p className="text-gray-500 truncate">{link.url}</p>
                  <p className="text-sm text-gray-400 mt-2 truncate">
                    {link.description}
                  </p>
                </div>

                <CardDropdown session={session} link={link} />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
