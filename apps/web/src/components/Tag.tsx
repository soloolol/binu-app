interface TagProps {
  label: string;
  isHighlight?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, isHighlight, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-source text-dark/90 font-semibold text-[10pt] px-4 py-1.5 rounded-full transition-colors
        ${isHighlight ? "bg-primary/40" : "bg-dark/5"}
      `}
    >
      {label}
    </button>
  );
}
