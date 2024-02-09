interface DeleteLinkProps {
  shortUrl: string;
  authorId: string;
}

export const deleteLink = async ({ shortUrl, authorId }: DeleteLinkProps) => {
  try {
    const res = await fetch(`/api/urls/${shortUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId }),
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
