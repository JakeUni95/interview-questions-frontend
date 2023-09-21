function makeCheckbox(skillsByCategoryMapping, slugByNameMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    category: group.category,
    checkboxes: group.skills.map(skill => ({
      name: "selectedSkillSlugs",
      value: slugByNameMapping[skill.skillName],
      text: skill.skillName,
    }))
  }));
}

module.exports = makeCheckbox;
