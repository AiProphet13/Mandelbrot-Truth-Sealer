const TruthBadge = ({ score }) => {
  if (score > 0.9) return (
    <span className="bg-red-600/70 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
      EXTREME DECEPTION
    </span>
  );
  if (score > 0.7) return (
    <span className="bg-orange-600/70 text-white px-2 py-1 rounded-full text-xs font-bold">
      HIGH ALERT
    </span>
  );
  if (score > 0.5) return (
    <span className="bg-yellow-600/70 text-white px-2 py-1 rounded-full text-xs font-bold">
      SUSPICIOUS
    </span>
  );
  return (
    <span className="bg-green-600/70 text-white px-2 py-1 rounded-full text-xs font-bold">
      VERIFIED TRUTH
    </span>
  );
};
