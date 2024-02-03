export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // toast success
  } catch (error) {
    // toast error
  }
};
