function isValidSlug(selectedSkillsSlugs, selectedSkillsInputs) {
  return selectedSkillsSlugs.length !== selectedSkillsInputs.length;
}

module.exports = isValidSlug;
