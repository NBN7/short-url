import { useMutation } from "@tanstack/react-query";

import { createLink } from "@/services/createLink";

import { toastSuccess, toastError } from "@/utils/toastNotifications";

interface useCreateLinkProps {
  url: string;
  shortUrl: string;
  description: string;
  authorId: string;
}

export const useCreateLink = ({
  url,
  shortUrl,
  description,
  authorId,
}: useCreateLinkProps) => {
  const { mutate: callCreateMutation } = useMutation({
    mutationFn: () => createLink({ url, shortUrl, description, authorId }),
    onSuccess: () => {
      toastSuccess("Link created");
    },
    onError: () => {
      toastError("Failed to create link");
    },
  });

  return {
    callCreateMutation,
  };
};
