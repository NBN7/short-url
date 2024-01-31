import Link from "next/link";

interface LinkUIProps {
  children: React.ReactNode;
  href: string;
  style?: string;
}

export const LinkUI = ({ children, href, style }: LinkUIProps) => {
  return (
    <Link
      href={href}
      className={`text-sm hover:opacity-75 transition-all truncate ${style}`}
    >
      {children}
    </Link>
  );
};
