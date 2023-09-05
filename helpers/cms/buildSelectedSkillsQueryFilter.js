function buildSelectedSkillsQueryFilter(selectedSkillsInputs) {
  return { 
    selectedSkills: {
      or: selectedSkillsInputs.map(skillSlug => ({
        slug: { 
          eq: skillSlug,
        }
      }))
    }
  };
}

module.exports = buildSelectedSkillsQueryFilter;
