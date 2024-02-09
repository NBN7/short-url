import { useQuery } from "@tanstack/react-query";

import { redirect } from "@/services/redirect";

interface useRedirectProps {
  shortUrl: string | string[];
}

export const useRedirect = ({ shortUrl }: useRedirectProps) => {
  const {
    isLoading,
    isError,
    data: link,
  } = useQuery({
    queryKey: ["redirect", shortUrl],
    queryFn: () => redirect({ shortUrl }),
  });

  return {
    isLoading,
    isError,
    link,
  };
};
