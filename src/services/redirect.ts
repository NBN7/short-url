interface RedirectProps {
  shortUrl: string | string[];
}

export const redirect = async ({ shortUrl }: RedirectProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/urls/${shortUrl}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await res.json();

    window.location.href = data.url;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
