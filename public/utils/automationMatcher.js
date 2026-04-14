import { CATEGORIES } from '../data/categories.js';

export function getCategoryForTool(toolId) {
  for (const cat of CATEGORIES) {
    if (cat.services.some(s => s.id === toolId)) return cat.label;
  }
  return null;
}

export function getMatchingAutomations(automations, selected) {
  const selectedArr = [...selected];

  // Exact matches: all tools must be selected (works for 2- and 3-tool entries)
  const exactMatches = automations.filter(a => a.tools && a.tools.every(t => selected.has(t)));

  // Build set of category pairs already covered by exact matches
  const coveredPairs = new Set();
  exactMatches.forEach(m => {
    const cats = m.tools.map(getCategoryForTool).filter(Boolean);
    for (let i = 0; i < cats.length; i++) {
      for (let j = i + 1; j < cats.length; j++) {
        coveredPairs.add([cats[i], cats[j]].sort().join('|||'));
      }
    }
  });

  // Category fallback: each listed category must have ≥1 selected tool,
  // and the combination must not already be covered by an exact match
  const selectedCategories = [...new Set(selectedArr.map(getCategoryForTool).filter(Boolean))];
  const categoryMatches = automations
    .filter(a => {
      if (!a.categories) return false;
      const key = [...a.categories].sort().join('|||');
      return !coveredPairs.has(key) &&
        a.categories.every(cat => selectedCategories.includes(cat));
    })
    .map(a => ({ ...a, isCategoryMatch: true }));

  return [...exactMatches, ...categoryMatches];
}
