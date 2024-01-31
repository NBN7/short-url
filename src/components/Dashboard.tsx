import { LinkUI } from "./LinkUI";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Card, CardHeader } from "@nextui-org/card";

import type { TLink } from "@/app/types/link";

import { BiDotsVerticalRounded } from "react-icons/bi";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links?.map((link: TLink) => (
          <Card key={link.id}>
            <CardHeader className="justify-between">
              <div className="overflow-hidden">
                <LinkUI
                  href={`/z/${link.shortUrl}`}
                  style="text-lg font-semibold"
                >
                  /z/{link.shortUrl}
                </LinkUI>
                <p className="text-gray-400 truncate">{link.url}</p>
                <p className="truncate">{link.description}</p>
              </div>

              <Tooltip content="More" delay={1000} closeDelay={0}>
                <Button isIconOnly className="bg-transparent" radius="full">
                  <BiDotsVerticalRounded size="20px" />
                </Button>
              </Tooltip>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
