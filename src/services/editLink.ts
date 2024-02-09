interface EditLinkProps {
  url: string;
  shortUrl: string;
  description: string | null;
  authorId: string;
}

export const editLink = async ({
  url,
  shortUrl,
  description,
  authorId,
}: EditLinkProps) => {
  try {
    const res = await fetch(`/api/urls/${shortUrl}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, description, authorId }),
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
