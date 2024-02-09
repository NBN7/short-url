import { CardDropdown } from "./CardDropdown";
import { LinkUI } from "../LinkUI";

import { Card as CardUI, CardHeader } from "@nextui-org/card";

import { ROUTES } from "@/constants/routes";

import type { Link } from "@prisma/client";
import type { Session } from "next-auth";

interface CardProps {
  link: Link;
  session: Session | null;
}

const Card = ({ link, session }: CardProps) => {
  return (
    <CardUI key={link.id}>
      <CardHeader className="justify-between">
        <div className="overflow-hidden">
          <LinkUI
            href={`${ROUTES.REDIRECT}/${link.shortUrl}`}
            className="text-base"
          >
            {ROUTES.REDIRECT}/{link.shortUrl}
          </LinkUI>
          <p className="text-gray-500 truncate">{link.url}</p>
          <p className="text-gray-400 mt-2 truncate">{link.description}</p>
        </div>

        <CardDropdown session={session} link={link} />
      </CardHeader>
    </CardUI>
  );
};

export default Card;
