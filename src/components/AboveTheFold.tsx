import { Container } from "./Container";

interface AboveTheFoldProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  short?: boolean;
}

export const AboveTheFold = ({
  children,
  title,
  description,
  short,
}: AboveTheFoldProps) => {
  return (
    <section className="w-full flex flex-col items-center mt-20">
      <div className="sm:max-w-[800px] flex flex-col gap-2">
        <h1 className="text-6xl font-semibold">{title}</h1>
        <p className={`text-gray-400 text-pretty ${short ? "sm:w-1/2" : ""}`}>
          {description}
        </p>
      </div>

      <Container>{children}</Container>
    </section>
  );
};
