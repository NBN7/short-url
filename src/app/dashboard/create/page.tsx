"use client";

import { useState, useEffect, useId } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useGetLinks } from "@/hooks/useGetLinks";
import { useCreateLink } from "@/hooks/useCreateLink";

import { AboveTheFold } from "@/components/AboveTheFold";

import { validateUrl, validateShortUrl } from "@/utils/validators";

import { ROUTES } from "@/constants/routes";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function CreatePage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const id = useId();

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [description, setDescription] = useState("");

  const [isUrlValid, setIsUrlValid] = useState(true);
  const [isShortUrlValid, setIsShortUrlValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const { refetch } = useGetLinks({ session });

  const { callCreateMutation } = useCreateLink({
    url,
    shortUrl,
    description,
    authorId: session?.user?.email!,
    refetch,
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleShortUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    callCreateMutation();

    router.push(ROUTES.DASHBOARD);
  };

  // useEffect(() => {
  //   if (status) {
  //     if (status === "unauthenticated") {
  //       router.push(ROUTES.HOME);
  //     }
  //   }
  // }, [status, router]);

  useEffect(() => {
    if (url) {
      setIsUrlValid(validateUrl(url));
    }
  }, [url]);

  useEffect(() => {
    if (shortUrl) {
      setIsShortUrlValid(validateShortUrl(shortUrl));
    }
  }, [shortUrl]);

  useEffect(() => {
    setIsDescriptionValid(description.length <= 40);
  }, [description]);

  return (
    <AboveTheFold title="Create">
      <section className="w-full flex flex-col items-center gap-6 mt-6">
        <form
          className="flex flex-col gap-3 sm:w-[500px] w-full"
          onSubmit={handleSubmit}
        >
          <Input
            id={`${id}create-url-input`}
            label="URL"
            placeholder="https://example.com"
            autoComplete="off"
            errorMessage={!isUrlValid ? "Invalid URL" : ""}
            onChange={handleUrlChange}
          />
          <Input
            id={`${id}create-short-url-input`}
            label="Short URL"
            autoComplete="off"
            errorMessage={!isShortUrlValid ? "Invalid short URL" : ""}
            onChange={handleShortUrlChange}
          />
          <Textarea
            id={`${id}create-description-input`}
            label="Description"
            autoComplete="off"
            description={`${description.length} / 40`}
            errorMessage={!isDescriptionValid ? "Description is too long" : ""}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end">
            <Button
              color="primary"
              type="submit"
              isDisabled={
                !url ||
                !shortUrl ||
                !isUrlValid ||
                !isShortUrlValid ||
                !isDescriptionValid
              }
            >
              Create link
            </Button>
          </div>
        </form>
      </section>
    </AboveTheFold>
  );
}
