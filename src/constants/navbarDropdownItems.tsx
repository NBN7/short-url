import { ROUTES } from "@/constants/routes";

import { FiPlus } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export const NAVBAR_DROPDOWN_ITEMS = [
  {
    TITLE: "Create new link",
    ICON: <FiPlus />,
    PATH: ROUTES.CREATE,
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
    DANGER: true,
    EVENT: true,
  },
];
