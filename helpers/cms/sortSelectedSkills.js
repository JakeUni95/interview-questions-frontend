function sortSelectedSkills(groupedSelectedSkills){
  return groupedSelectedSkills
    .map(group => ({
      skillCategory: group.category,
      skillNames: group.skills
        .map(skill => skill.skillName)
        .sort(),
    }))
    .sort((a, b) => {
      return a.skillCategory.localeCompare(b.skillCategory);
    });
}

module.exports = sortSelectedSkills;

