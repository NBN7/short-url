"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

import { CARD_DROPDOWN_ITEMS } from "@/constants/cardDropdownItems";

import type { Session } from "next-auth";

import { BiDotsVerticalRounded } from "react-icons/bi";

interface CardDropdownProps {
  session: Session | null;
  shortUrl: string;
  link: string;
}

export const CardDropdown = ({
  session,
  shortUrl,
  link,
}: CardDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent" radius="full">
          <BiDotsVerticalRounded size="20px" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="light" aria-label="Static Actions">
        {CARD_DROPDOWN_ITEMS.map(({ TITLE, ICON, DANGER, EVENT }) => (
          <DropdownItem
            key={TITLE}
            startContent={ICON}
            textValue="text"
            color={DANGER ? "danger" : "default"}
            onClick={() =>
              EVENT({
                textToCopy: link,
                shortUrl: shortUrl,
                authorId: session?.user?.email as string,
              })
            }
          >
            {TITLE}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
