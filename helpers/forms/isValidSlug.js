function isValidSlug(selectedSkillsSlugs, selectedSkillsInputs, res) {
  if (selectedSkillsSlugs.length !== selectedSkillsInputs.length) {
    return true; 
  }
  return false; 
}

module.exports = isValidSlug;
