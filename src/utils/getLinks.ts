import type { Session } from "next-auth";
import type { Link } from "@prisma/client";

interface GetLinksProps {
  session: Session | null;
}

export const getLinks = async ({
  session,
}: GetLinksProps): Promise<Link[] | null> => {
  try {
    if (!session) return null;

    const res = await fetch(`/api/urls/user/${session.user?.email}`);
    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
