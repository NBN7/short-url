import { useMutation } from "@tanstack/react-query";

import { editLink } from "@/utils/editLink";

import { toastSuccess, toastError } from "@/utils/toastNotifications";

interface useEditLinkProps {
  url: string;
  shortUrl: string;
  description: string | null;
  authorId: string;
  refetch: () => void;
}

export const useEditLink = ({
  url,
  shortUrl,
  description,
  authorId,
  refetch,
}: useEditLinkProps) => {
  const { mutate: callEditMutation } = useMutation({
    mutationFn: () =>
      editLink({
        url,
        shortUrl,
        description,
        authorId,
      }),
    onSuccess: () => {
      toastSuccess("Link updated");
      refetch();
    },
    onError: () => {
      toastError("Error updating link");
    },
  });

  return {
    callEditMutation,
  };
};
