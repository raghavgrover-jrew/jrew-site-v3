// Small letterspaced label above a chapter headline. Rationed: only where the printed
// spread carried one and the section opens a chapter (see DESIGN.md).
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={["eyebrow mb-4", className].filter(Boolean).join(" ")}>{children}</p>;
}
