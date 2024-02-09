import { useMutation } from "@tanstack/react-query";

import { deleteLink } from "@/services/deleteLink";

import { toastSuccess, toastError } from "@/utils/toastNotifications";

interface useDeleteLinkProps {
  shortUrl: string;
  authorId: string;
  refetch: () => void;
}

export const useDeleteLink = ({
  shortUrl,
  authorId,
  refetch,
}: useDeleteLinkProps) => {
  const { mutate: callDeleteMutation } = useMutation({
    mutationFn: () => deleteLink({ shortUrl, authorId }),
    onSuccess: () => {
      toastSuccess("Link deleted");
      refetch();
    },
    onError: () => {
      toastError("Error deleting link");
    },
  });

  return {
    callDeleteMutation,
  };
};
