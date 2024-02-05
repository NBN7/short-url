import { toastSuccess, toastError } from "./toastNotifications";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toastSuccess("Copied to clipboard");
  } catch (error) {
    toastError("Failed to copy");
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
