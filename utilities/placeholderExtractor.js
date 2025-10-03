function extractPlaceholders(text) {
  const matches = text.match(/{{(.*?)}}/g);
  if (!matches) return [];
  return matches.map(ph => ph.trim()); // clean and return
}

module.exports = extractPlaceholders;
