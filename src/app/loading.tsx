import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
  return (
    <main className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <CircularProgress color="default" size="sm" aria-label="Loading.." />
    </main>
  );
}
