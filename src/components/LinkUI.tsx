import Link from "next/link";

import { twMerge } from "tailwind-merge";

interface LinkUIProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const LinkUI = ({ children, href, className }: LinkUIProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-sm text-white hover:opacity-75 transition-all truncate",
        className
      )}
    >
      {children}
    </Link>
  );
};
