import { PartyIcon } from './(public)/patch-notes/components/party-icon';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-2 max-w-[500px] flex-wrap h-full">
        <PartyIcon party="PT" />
        <PartyIcon party="PL" />
        <PartyIcon party="UNIÃO" />
        <PartyIcon party="REPUBLICANOS" />
        <PartyIcon party="PP" />
        <PartyIcon party="MDB" />
        <PartyIcon party="PSD" />
        <PartyIcon party="PDT" />
        <PartyIcon party="PODE" />
        <PartyIcon party="PSOL" />
        <PartyIcon party="PSDB" />
        <PartyIcon party="PSB" />
        <PartyIcon party="PCdoB" />
        <PartyIcon party="AVANTE" />
        <PartyIcon party="PV" />
        <PartyIcon party="NOVO" />
        <PartyIcon party="SOLIDARIEDADE" />
        <PartyIcon party="CIDADANIA" />
        <PartyIcon party="REDE" />
        <PartyIcon party="PRD" />
      </div>
    </div>
  );
}
