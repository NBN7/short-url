export const deleteLink = async (shortUrl: string, authorId: string) => {
  try {
    const res = await fetch(`/api/urls`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortUrl, authorId }),
    });
    const data = await res.json();

    if (res.ok) {
      // toast success
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
