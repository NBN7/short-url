import { copyToClipboard } from "@/utils/copyToClipboard";
import { deleteLink } from "@/utils/deleteLink";

import { IoCopyOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { BiQr } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const CARD_DROPDOWN_ITEMS = [
  {
    TITLE: "Copy",
    ICON: <IoCopyOutline />,
    EVENT: ({ textToCopy }: { textToCopy: string }) =>
      copyToClipboard(textToCopy),
  },
  {
    TITLE: "Edit",
    ICON: <MdEdit />,
    EVENT: () => {},
  },
  {
    TITLE: "Generate QR Code",
    ICON: <BiQr />,
    EVENT: () => {},
  },
  {
    TITLE: "Delete",
    ICON: <MdDelete />,
    DANGER: true,
    EVENT: ({ shortUrl, authorId }: { shortUrl: string; authorId: string }) =>
      deleteLink(shortUrl, authorId),
  },
];
