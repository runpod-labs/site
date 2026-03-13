const statusConfig = {
  active: {
    label: "Active",
    dotClass: "bg-emerald text-emerald pulse-ring",
    textClass: "text-emerald",
  },
  experimental: {
    label: "Experimental",
    dotClass: "bg-purple-light text-purple-light pulse-ring",
    textClass: "text-purple-light",
  },
  archived: {
    label: "Archived",
    dotClass: "bg-muted/60 text-muted/60",
    textClass: "text-muted/60",
  },
} as const;

export function StatusBadge({
  status,
}: {
  status: keyof typeof statusConfig;
}) {
  const config = statusConfig[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      <span
        className={`text-[0.6875rem] font-mono tracking-wider uppercase ${config.textClass}`}
      >
        {config.label}
      </span>
    </span>
  );
}
