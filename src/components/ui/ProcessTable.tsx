import { processStages } from "@/data/process";

// Spread 07 right as a real table. Under 640 px each row stacks (stage above capability) via CSS grid on the row.
export function ProcessTable() {
  return (
    <table className="w-full border-collapse text-left text-[15px]">
      <caption className="sr-only">Plate to product: nine manufacturing stages and their capability</caption>
      <thead className="hidden sm:table-header-group">
        <tr className="border-b-2 border-ink text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-3">
          <th scope="col" className="w-12 py-3 pr-3">No.</th>
          <th scope="col" className="w-[13rem] py-3 pr-6">Stage</th>
          <th scope="col" className="py-3">Capability</th>
        </tr>
      </thead>
      <tbody>
        {processStages.map((p, i) => (
          <tr key={p.stage} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-3 sm:table-row sm:py-0">
            <td className="tnum py-1 pr-3 text-[13px] font-semibold text-marigold-deep sm:py-4">{String(i + 1).padStart(2, "0")}</td>
            <th scope="row" className="display-md py-1 pr-6 text-[16px] font-bold text-ink sm:py-4">
              {p.stage}
            </th>
            <td className="col-span-2 py-1 leading-relaxed text-ink-2 sm:col-span-1 sm:py-4">{p.capability}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
