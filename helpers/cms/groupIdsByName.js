function groupIdsByName(allSkill) {
    return allSkill.reduce((groups, id) => {
      if(!groups[id.skillName]) {
        groups[id.skillName] = []; 
      }
      groups[id.skillName].push(id.id); 
      return groups;
    }, {});
}

module.exports = groupIdsByName;
