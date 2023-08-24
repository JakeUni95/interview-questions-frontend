function makeCheckbox(skillsByCategoryMapping, nameByIdMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    title: group.title,
    checkboxes: group.skills.map(skill => ({
      name: "selectedSkillIds",
      value: nameByIdMapping[skill.title],
      text: skill.title,
    }))
   }));
}

module.exports = makeCheckbox;
