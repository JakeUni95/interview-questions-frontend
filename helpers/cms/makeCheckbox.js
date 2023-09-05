function makeCheckbox(skillsByCategoryMapping, idByNameMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    category: group.category,
    checkboxes: group.skills.map(skill => ({
      name: "selectedSkillSlugs",
      value: idByNameMapping[skill.skillName],
      text: skill.skillName,
    }))
  }));
}

module.exports = makeCheckbox;
