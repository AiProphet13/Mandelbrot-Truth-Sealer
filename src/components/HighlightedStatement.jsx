import React from 'react';

const HighlightedStatement = ({ text, conflicts }) => {
  const conflictWords = new Set(
    conflicts.flatMap(c => [
      c.originalWordA?.toLowerCase(),
      c.originalWordB?.toLowerCase()
    ]).filter(Boolean)
  );

  return (
    <div className="prose prose-invert max-w-none">
      {text.split(/\s+/).map((word, i) => {
        const cleanWord = word.replace(/[.,!?]/g, '').toLowerCase();
        return conflictWords.has(cleanWord) ? (
          <span key={i} className="bg-red-600/70 text-white font-bold px-1 rounded animate-pulse">
            {word}{' '}
          </span>
        ) : (
          <span key={i}>{word} </span>
        );
      })}
    </div>
  );
};

export default HighlightedStatement;
