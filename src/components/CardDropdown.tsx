"use client";

import { useLinks } from "@/hooks/useLinks";
import { useMutation } from "@tanstack/react-query";

import { copyToClipboard } from "@/utils/copyToClipboard";
import { editLink } from "@/utils/editLink";
import { deleteLink } from "@/utils/deleteLink";
import { toastSuccess, toastError } from "@/utils/toastNotifications";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";

import QRCode from "react-qr-code";

import type { Session } from "next-auth";
import type { Link } from "@prisma/client";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiQr } from "react-icons/bi";

interface CardDropdownProps {
  session: Session | null;
  link: Link;
}

export const CardDropdown = ({ session, link }: CardDropdownProps) => {
  const { shortUrl, url, description, authorId } = link;

  const { refetch } = useLinks({ session });

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isQrCodeOpen,
    onOpen: onQrCodeOpen,
    onOpenChange: onQrCodeOpenChange,
    onClose: onQrCodeClose,
  } = useDisclosure();

  const { mutate: callCopyMutation } = useMutation({
    mutationFn: (textToCopy: string) => copyToClipboard(textToCopy),
    onSuccess: () => {
      toastSuccess("Copied to clipboard");
      refetch();
    },
    onError: () => {
      toastError("Failed to copy");
    },
  });

  const { mutate: callEditMutation } = useMutation({
    mutationFn: () =>
      editLink({ url, shortUrl, description, authorId: session?.user?.email! }),
    onSuccess: () => {
      toastSuccess("Link updated");
      refetch();
    },
    onError: () => {
      toastError("Error updating link");
    },
  });

  const { mutate: callDeleteMutation } = useMutation({
    mutationFn: () => deleteLink({ shortUrl, authorId: session?.user?.email! }),
    onSuccess: () => {
      toastSuccess("Link deleted");
      refetch();
    },
    onError: () => {
      toastError("Error deleting link");
    },
  });

  const handleCopy = (textToCopy: string) => {
    callCopyMutation(textToCopy);
  };

  const handleEdit = () => {
    onEditOpen();
  };

  const handleGenerateQRCode = () => {
    onQrCodeOpen();
  };

  const handleDelete = () => {
    callDeleteMutation();
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly className="bg-transparent" radius="full">
            <BiDotsVerticalRounded size="20px" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu variant="light" aria-label="Static Actions">
          <DropdownItem
            key="Copy"
            startContent={<IoCopyOutline />}
            textValue="text"
            color="default"
            onClick={() =>
              handleCopy(`${process.env.NEXT_PUBLIC_URL}/z/${link.shortUrl}`)
            }
          >
            Copy
          </DropdownItem>

          <DropdownItem
            key="Edit"
            startContent={<MdEdit />}
            textValue="text"
            color="default"
            onClick={handleEdit}
          >
            Edit
          </DropdownItem>

          <DropdownItem
            key="Generate QR Code"
            startContent={<BiQr />}
            textValue="text"
            color="default"
            onClick={handleGenerateQRCode}
          >
            Generate QR Code
          </DropdownItem>

          <DropdownItem
            key="Delete"
            startContent={<MdDelete />}
            textValue="text"
            color="default"
            onClick={handleDelete}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          <ModalHeader>{`/z/${shortUrl}`}</ModalHeader>
          <ModalBody>
            <Input label="URL" defaultValue={url} />
            <Textarea label="Description" />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color="danger" onClick={onEditClose}>
              Close
            </Button>

            <Button color="primary" onClick={onEditClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isQrCodeOpen} onOpenChange={onQrCodeOpenChange}>
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalBody className="items-center">
            <QRCode
              value="http://localhost:3000/dashboard"
              bgColor="#18181B"
              fgColor="#ffffff"
              size={150}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color="danger" onClick={onQrCodeClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
