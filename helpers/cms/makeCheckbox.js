function makeCheckbox(skillsByCategoryMapping, nameByIdMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    category: group.category,
    checkboxes: group.skills.map(skill => ({
      name: "selectedSkillIds",
      value: nameByIdMapping[skill.skillName],
      text: skill.skillName,
    }))
   }));
}

module.exports = makeCheckbox;
