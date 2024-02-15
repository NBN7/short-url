interface CreateLinkProps {
  url: string;
  shortUrl: string;
  description: string;
  authorId: string;
}

export const createLink = async ({
  url,
  shortUrl,
  description,
  authorId,
}: CreateLinkProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/urls/${shortUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, shortUrl, description, authorId }),
    });
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
