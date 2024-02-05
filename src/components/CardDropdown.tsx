"use client";

import { useState, useRef } from "react";

import { useGetLinks } from "@/hooks/useGetLinks";
import { useEditLink } from "@/hooks/useEditLink";
import { useDeleteLink } from "@/hooks/useDeleteLink";

import { copyToClipboard } from "@/utils/copyToClipboard";

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

  const urlRef = useRef(url);
  const [descriptionState, setDescriptionState] = useState(description);

  const { refetch } = useGetLinks({ session });

  const { callEditMutation } = useEditLink({
    url: urlRef.current,
    shortUrl,
    description: descriptionState,
    authorId: session?.user?.email!,
    refetch,
  });

  const { callDeleteMutation } = useDeleteLink({
    shortUrl,
    authorId: session?.user?.email!,
    refetch,
  });

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

  const handleEdit = () => {
    onEditOpen();
  };

  const handleGenerateQRCode = () => {
    onQrCodeOpen();
  };

  const handleDelete = () => {
    callDeleteMutation();
  };

  const handleSave = async () => {
    callEditMutation();
    onEditClose();
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
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_URL}/z/${link.shortUrl}`
              )
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
            <Input
              label="URL"
              defaultValue={url}
              onChange={(e) => (urlRef.current = e.target.value)}
            />
            <Textarea
              label="Description"
              defaultValue={description ? description : ""}
              description={`${descriptionState?.length} / 40`}
              onChange={(e) => setDescriptionState(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              color="danger"
              onClick={() => {
                onEditClose();
                setDescriptionState(description);
              }}
            >
              Close
            </Button>

            <Button color="primary" onClick={handleSave}>
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
              value={`${process.env.NEXT_PUBLIC_URL}/z/${shortUrl}`}
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
