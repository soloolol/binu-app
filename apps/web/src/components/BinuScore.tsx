import BinuIcon from "./BinuIcon";

interface BinuScoreProps {
  score: number;
  size?: number;
}

export default function BinuScore({ score, size = 16 }: BinuScoreProps) {
  const max = 5;
  let empty = max - score;
  if (empty < 0) empty = 0;
  return (
    <div className="flex gap-0.5">
      {[...Array(score)].map((_, i) => (
        <BinuIcon key={i} fill={true} width={size} height={size} />
      ))}
      {[...Array(empty)].map((_, i) => (
        <BinuIcon key={i} width={size} height={size} />
      ))}
    </div>
  );
}
