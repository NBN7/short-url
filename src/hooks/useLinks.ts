import { useQuery } from "@tanstack/react-query";

import { getLinks } from "@/utils/getLinks";

import type { Session } from "next-auth";

interface useLinksProps {
  session: Session | null;
}

export const useLinks = ({ session }: useLinksProps) => {
  const {
    isLoading,
    isError,
    data: links,
    refetch,
  } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(session),
    enabled: !!session,
  });

  return {
    isLoading,
    isError,
    links,
    refetch,
  };
};
