import Link from "next/link";

interface LinkUIProps {
  children: React.ReactNode;
  href: string;
}

export const LinkUI = ({ children, href }: LinkUIProps) => {
  return (
    <Link href={href} className="text-sm hover:opacity-75 transition-all">
      {children}
    </Link>
  );
};
