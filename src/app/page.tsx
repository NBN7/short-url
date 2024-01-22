import Link from "next/link";

import { AboveTheFold } from "@/components/AboveTheFold";

import { Button } from "@nextui-org/button";

import { LINKS } from "@/constants/links";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function HomePage() {
  const props = {
    title: "Stand out with short links",
    description:
      "Impress with powerful links. Our URL shortener provides the simplest and most effective way to share your content.",
    short: true,
  };

  const iconSize = "20px";

  return (
    <AboveTheFold {...props}>
      <div className="mt-10">
        <Link href={LINKS.GITHUB} target="_blank">
          <Button
            variant="light"
            radius="full"
            startContent={<FaGithub size={iconSize} />}
          >
            GitHub
          </Button>
        </Link>

        <Link href={LINKS.LINKEDIN} target="_blank">
          <Button
            variant="light"
            radius="full"
            startContent={<FaLinkedin size={iconSize} />}
          >
            LinkedIn
          </Button>
        </Link>
      </div>
    </AboveTheFold>
  );
}
