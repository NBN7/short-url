import { LinkUI } from "./LinkUI";
import { CardDropdown } from "./CardDropdown";

import { Card, CardHeader } from "@nextui-org/card";

import type { TLink } from "@/app/types/link";

import type { Session } from "next-auth";

interface DashboardProps {
  session: Session | null;
}

const getLinks = async (session: Session | null): Promise<TLink[] | void> => {
  if (!session) return;

  const res = await fetch(`/api/urls/${session.user?.email}`);
  const data = await res.json();

  return data;
};

export const Dashboard = async ({ session }: DashboardProps) => {
  const links = await getLinks(session);

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
          {links?.map((link: TLink) => (
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
