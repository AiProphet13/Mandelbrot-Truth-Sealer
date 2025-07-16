// src/utils/stemmer.js
export function stemWord(word) {
  const rules = [
    { suffix: 'ies', replacement: 'y' },
    { suffix: 'es', replacement: '' },
    { suffix: 'ed', replacement: '' },
    { suffix: 'ing', replacement: '' },
    { suffix: 's', replacement: '' }
  ];
  
  let stemmed = word.toLowerCase();
  for (const rule of rules) {
    if (stemmed.endsWith(rule.suffix)) {
      stemmed = stemmed.slice(0, -rule.suffix.length) + rule.replacement;
      break;
    }
  }
  return stemmed;
}

