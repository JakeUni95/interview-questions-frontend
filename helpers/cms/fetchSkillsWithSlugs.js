const fetchAllSkills = require('./fetchAllSkills');

async function fetchSkillsWithSlugs(client, selectedSkillSlugs) {
  const skillSelectionSet = new Set(selectedSkillSlugs);
  const allSkills = await fetchAllSkills(client);
  return allSkills.filter(skill => skillSelectionSet.has(skill.slug));
}

module.exports = fetchSkillsWithSlugs;
