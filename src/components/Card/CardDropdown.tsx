"use client";

import { useState, useEffect, useId } from "react";

import { useGetLinks } from "@/hooks/useGetLinks";
import { useEditLink } from "@/hooks/useEditLink";
import { useDeleteLink } from "@/hooks/useDeleteLink";
import { copyToClipboard } from "@/utils/copyToClipboard";

import { validateUrl } from "@/utils/validators";

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
import { Card, CardBody } from "@nextui-org/card";

import QRCode from "react-qr-code";

import { ROUTES } from "@/constants/routes";

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
  const { shortUrl, url, description } = link;

  const id = useId();

  const [urlState, setUrlState] = useState(url);
  const [descriptionState, setDescriptionState] = useState(description);

  const [isUrlValid, setUrlValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const linkToCopy = `${process.env.NEXT_PUBLIC_URL}${ROUTES.REDIRECT}/${shortUrl}`;

  const { refetch } = useGetLinks({ session });

  const { callEditMutation } = useEditLink({
    url: urlState,
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

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEdit = () => {
    onEditOpen();
  };

  const handleGenerateQRCode = () => {
    onQrCodeOpen();
  };

  const handleDelete = () => {
    onDeleteOpen();
  };

  const handleEditSave = async () => {
    callEditMutation();
    onEditClose();
  };

  const handleDeleteAccept = () => {
    callDeleteMutation();
    onDeleteClose();
  };

  useEffect(() => {
    if (urlState === "") {
      setUrlValid(true);
      return;
    }

    setUrlValid(validateUrl(urlState));
  }, [urlState]);

  useEffect(() => {
    if (descriptionState) {
      setIsDescriptionValid(descriptionState.length <= 40);
    }
  }, [descriptionState]);

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
            onClick={() => copyToClipboard(linkToCopy)}
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
            color="danger"
            onClick={handleDelete}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          <ModalHeader>
            <p>
              <span className="text-gray-400">Edit </span>
              {`/z/${shortUrl}`}
            </p>
          </ModalHeader>
          <ModalBody>
            <Input
              id={`${id}edit-url-input`}
              label="URL"
              defaultValue={url}
              errorMessage={!isUrlValid ? "Invalid URL" : ""}
              onChange={(e) => setUrlState(e.target.value)}
            />
            <Textarea
              id={`${id}edit-description-input`}
              label="Description"
              defaultValue={description ? description : ""}
              description={`${descriptionState?.length} / 40`}
              errorMessage={
                !isDescriptionValid ? "Description is too long" : ""
              }
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

            <Button
              color="primary"
              onClick={handleEditSave}
              isDisabled={!url || !isUrlValid || !isDescriptionValid}
            >
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

      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          <ModalHeader>
            <p>
              <span className="text-gray-400">Delete </span>
              {`/z/${shortUrl}`}
            </p>
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <p className="text-center">
                  Are you sure you want to delete this link?
                </p>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" color="danger" onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleDeleteAccept}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
