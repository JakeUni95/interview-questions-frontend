const fetchAllSkills = require('./fetchAllSkills');

async function filterSelectedSkills(client, selectedSkillIds) {
  const skillSelectionSet = new Set(selectedSkillIds);
  const allSkills = await fetchAllSkills(client);
  return allSkills.filter(skill => skillSelectionSet.has(skill.id));
}

module.exports = filterSelectedSkills;
