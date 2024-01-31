import Link from "next/link";

interface LinkUIProps {
  children: React.ReactNode;
  href: string;
  size?: string;
}

export const LinkUI = ({ children, href, size }: LinkUIProps) => {
  return (
    <Link
      href={href}
      className="text-sm hover:opacity-75 transition-all truncate"
    >
      {children}
    </Link>
  );
};
