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
  // ... existing implementation with enhanced pattern matching
  // Add stemming to word comparisons for better matches
  // Consider partial matches and synonyms
}
