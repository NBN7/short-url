import { toastSuccess, toastError } from "./toastNotifications";

export const deleteLink = async (
  shortUrl: string,
  authorId: string,
  refetch: () => void
) => {
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
      toastSuccess("Link deleted");
      refetch();
    }

    return data;
  } catch (error) {
    toastError("Failed to delete link");
  }
};
