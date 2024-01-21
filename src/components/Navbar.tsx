import { useState } from "react";

import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Link,
} from "@nextui-org/react";

import { NAVBAR_ITEMS } from "../../constants/navbarItems";
import { ROUTES } from "../../constants/routes";

export const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOnClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link
            className="sm:hidden"
            color="foreground"
            href={`#${ROUTES.HOME.PATH}`}
          >
            <p className="sm:hidden font-bold">IB</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand className="cursor-pointer">
          <Link color="foreground" href={`#${ROUTES.HOME.PATH}`}>
            <p className="font-bold">IB</p>
          </Link>
        </NavbarBrand>

        {NAVBAR_ITEMS.map(({ NAME, PATH }, index) => (
          <NavbarItem key={index}>
            <Link size="sm" color="foreground" href={`#${PATH}`}>
              {NAME}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {NAVBAR_ITEMS.map(({ NAME, PATH }, index) => (
          <NavbarMenuItem key={index}>
            <Link
              onClick={handleOnClick}
              color="foreground"
              className="w-full"
              href={`#${PATH}`}
              size="lg"
            >
              {NAME}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
