// Calculate Shannon Entropy of any JS object (stringified)
export function calculateEntropy(data) {
  const json = typeof data === 'string' ? data : JSON.stringify(data);
  if (!json) return 0.0;

  const freq = {};
  for (const char of json) {
    freq[char] = (freq[char] || 0) + 1;
  }

  const len = json.length;
  let entropy = 0;

  for (const count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}
