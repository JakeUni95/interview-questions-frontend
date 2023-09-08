
function isValidSlug(validSlugs, selectedSkillsInputs, res) {
  if (validSlugs.length !== selectedSkillsInputs.length) {
      res.redirect(`/question?skills=${validSlugs.join(',')}`);
      return true; 
  }
  return false; 
}

module.exports = isValidSlug;
