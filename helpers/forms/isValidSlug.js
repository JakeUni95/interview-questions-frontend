function isValidSlug(selectedSkillsSlugs, selectedSkillsInputs, res) {
  if (selectedSkillsSlugs.length !== selectedSkillsInputs.length) {
      res.redirect(`/question?skills=${selectedSkillsSlugs.join(',')}`);
      return true; 
  }
  return false; 
}

module.exports = isValidSlug;
