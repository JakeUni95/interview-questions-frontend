function buildSelectedSkillsQueryFilter(selectedSkillsInputs) {
  return { 
    selectedSkills: {
      or: selectedSkillsInputs.map(skillId => ({
        id: { 
          eq: skillId,
        }
      }))
    }
  };
}

module.exports = buildSelectedSkillsQueryFilter;
