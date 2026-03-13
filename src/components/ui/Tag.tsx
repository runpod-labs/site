export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[0.625rem] font-mono tracking-wider uppercase text-muted/70 border border-border-strong rounded hover:text-purple-light hover:border-purple/20 transition-colors cursor-default">
      {label}
    </span>
  );
}
