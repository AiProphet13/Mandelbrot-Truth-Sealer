export const ANTONYMS = {
  // Original entries
  "no": ["yes", "had", "existed", "were", "confirmed"],
  "not": ["did", "was", "were", "had", "definitely"],
  "never": ["always", "repeatedly", "often", "frequently", "sometimes", "regularly", "shows", "logs"],
  "nothing": ["something", "everything", "involved", "connected", "tied"],
  "deny": ["admit", "confirm", "affirm", "acknowledge", "accept"],
  "false": ["true", "correct", "accurate", "factual"],
  "unaware": ["knew", "aware", "informed", "conscious"],
  "ended": ["continues", "ongoing", "active", "current"],
  
  // New entries for v5.0
  "impossible": ["possible", "feasible", "achievable", "realistic"],
  "improbable": ["probable", "likely", "expected", "predictable"],
  "unrelated": ["related", "connected", "associated", "linked"],
  "irrelevant": ["relevant", "pertinent", "germane", "applicable"],
  "inconsistent": ["consistent", "coherent", "uniform", "harmonious"],
  "unreliable": ["reliable", "dependable", "trustworthy", "consistent"],
  "inaccurate": ["accurate", "precise", "exact", "correct"]
};

export function detectLies(statements) {
  const results = [];
  let totalLieScore = 0;
  let conflictCount = 0;

  for (let i = 0; i < statements.length; i++) {
    for (let j = i + 1; j < statements.length; j++) {
      const A = statements[i].toLowerCase();
      const B = statements[j].toLowerCase();

      let hasConflict = false;
      let conflictDetails = [];

      for (const [word, antonyms] of Object.entries(ANTONYMS)) {
        if (A.includes(word)) {
          const hits = antonyms.filter(ant => B.includes(ant));
          if (hits.length > 0) {
            hasConflict = true;
            conflictDetails.push({ word, antonyms: hits });
          }
        }
      }

      if (hasConflict) {
        const lieScore = Math.min(0.99, 0.7 + conflictDetails.length * 0.1);
        results.push({
          indexA: i,
          indexB: j,
          statementA: statements[i],
          statementB: statements[j],
          lieScore,
          conflicts: conflictDetails
        });
        totalLieScore += lieScore;
        conflictCount++;
      }
    }
  }

  return {
    conflicts: results,
    overallLieScore: conflictCount ? totalLieScore / conflictCount : 0
  };
}
