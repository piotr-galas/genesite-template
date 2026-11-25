import { pageMetadata } from "@/lib/metadata";
import { Proposals } from "@/components/proposals/Proposals";
import { ProposalA } from "@/components/proposals/ProposalA";
import { ProposalB } from "@/components/proposals/ProposalB";
import { ProposalC } from "@/components/proposals/ProposalC";

// A page only to show the client: kept out of Google, as it lives on our preview address
export const metadata = { ...pageMetadata({ title: "Propozycje wyglądu strony", path: "/" }), robots: { index: false, follow: false } };

export default function Home() {
  return (
    <Proposals
      proposals={[
        { letter: "A", name: "Propozycja A", page: <ProposalA /> },
        { letter: "B", name: "Propozycja B", page: <ProposalB /> },
        { letter: "C", name: "Propozycja C", page: <ProposalC /> },
      ]}
    />
  );
}
