function sortSelectedSkills(groupedSelectedSkills){
  return groupedSelectedSkills
    .map(group => ({
      title: group.title,
      skillNames: group.skills
        .map(skill => skill.title)
        .sort(),
    }))
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
}

module.exports = sortSelectedSkills;

