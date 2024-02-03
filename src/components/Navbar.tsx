"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Link from "next/link";

import { LinkUI } from "./LinkUI";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { CircularProgress } from "@nextui-org/progress";

import { NAVBAR_DROPDOWN_ITEMS } from "@/constants/navbarDropdownItems";
import { ROUTES } from "@/constants/routes";

export const NavbarComponent = () => {
  const { data: session, status } = useSession();

  const handleClick = () => {
    signOut();
  };

  return (
    <Navbar isBordered>
      <NavbarContent className="flex gap-4" justify="start">
        <NavbarBrand className="cursor-pointer">
          <LinkUI href={ROUTES.HOME}>Short URL</LinkUI>
        </NavbarBrand>

        <NavbarItem>
          {status === "loading" ? (
            <CircularProgress
              color="default"
              size="sm"
              aria-label="Loading.."
            />
          ) : (
            <>
              {session ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Avatar
                      className="cursor-pointer"
                      size="sm"
                      src={session.user!.image!}
                    />
                  </DropdownTrigger>

                  <DropdownMenu variant="light" aria-label="Static Actions">
                    {NAVBAR_DROPDOWN_ITEMS.map(
                      ({ TITLE, ICON, PATH, DANGER, EVENT }) => (
                        <DropdownItem
                          key={TITLE}
                          startContent={ICON}
                          textValue={TITLE}
                          color={DANGER ? "danger" : "default"}
                          onClick={EVENT ? handleClick : () => {}}
                        >
                          <Link href={PATH}>{TITLE}</Link>
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <LinkUI href="/auth">Sign In</LinkUI>
              )}
            </>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
