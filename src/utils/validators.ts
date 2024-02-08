export const validateUrl = (url: string) => {
  const urlRegex =
    /^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(:[0-9]{1,5})?(\/[^\s]*)?$/;
  return urlRegex.test(url);
};

export const validateShortUrl = (url: string) => {
  const regex = /^[A-Za-z0-9-_.]+$/;
  return regex.test(url);
};
