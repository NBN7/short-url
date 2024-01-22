import { ROUTES } from "@/constants/routes";

import { FaPlus } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export const DROPDOWN_ITEMS = [
  {
    TITLE: "Create new link",
    ICON: <FaPlus />,
    PATH: ROUTES.DASHBOARD,
  },
  {
    TITLE: "Dashboard",
    ICON: <MdSpaceDashboard />,
    PATH: ROUTES.DASHBOARD,
  },
  {
    TITLE: "Sign Out",
    ICON: <MdLogout />,
    PATH: ROUTES.AUTH,
    COLOR: true,
    EVENT: true,
  },
];
