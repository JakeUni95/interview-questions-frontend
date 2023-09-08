function fetchSelectedSkillsSlugs(selectedSkillEntries) {
  return selectedSkillEntries.map(entry => entry.slug);
}

module.exports = fetchSelectedSkillsSlugs;
