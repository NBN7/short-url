import { useGetLinks } from "@/hooks/useGetLinks";

import { LinkUI } from "./LinkUI";
import { CardDropdown } from "./CardDropdown";

import { Card, CardHeader } from "@nextui-org/card";

import { ROUTES } from "@/constants/routes";

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
                  <LinkUI href={`${ROUTES.REDIRECT}/${link.shortUrl}`}>
                    {ROUTES.REDIRECT}/{link.shortUrl}
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
