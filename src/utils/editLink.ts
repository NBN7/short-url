export const editLink = async ({
  url,
  shortUrl,
  description,
  authorId,
}: {
  url: string;
  shortUrl: string;
  description: string;
  authorId: string;
}) => {
  try {
    const res = await fetch("/api/urls", {
      method: "PATCH",
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
