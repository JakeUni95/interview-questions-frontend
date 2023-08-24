function groupIdsByName(allSkillIds) {
    return allSkillIds.reduce((groups, id) => {
      if(!groups[id.skill]) {
        groups[id.skill] = []; 
      }
      groups[id.skill].push(id.id); 
      return groups;
    }, {});
}

module.exports = groupIdsByName;
