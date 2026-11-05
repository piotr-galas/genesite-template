import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Strona w przygotowaniu", path: "/" });

export default function Home() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <h1 className="text-2xl font-semibold">Strona w przygotowaniu</h1>
    </section>
  );
}
