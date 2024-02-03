import type { Session } from "next-auth";
import type { Link } from "@prisma/client";

export const getLinks = async (
  session: Session | null
): Promise<Link[] | void> => {
  if (!session) return;

  const res = await fetch(`/api/urls/${session.user?.email}`);
  const data = await res.json();

  return data;
};
