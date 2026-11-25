import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Proposal A: the client's whole home page in one layout, with its own header and footer, as the redesign
// agent builds it. A placeholder until then.
export function ProposalA() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center py-32">
        <h1 className="text-2xl font-semibold">Propozycja A</h1>
      </main>
      <Footer />
    </>
  );
}
