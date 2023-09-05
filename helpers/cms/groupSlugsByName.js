function groupSlugsByName(allSkill) {
  return allSkill.reduce((groups, slug) => {
    if(!groups[slug.skillName]) {
      groups[slug.skillName] = []; 
    }
    groups[slug.skillName].push(slug.slug); 
    return groups;
  }, {});
}

module.exports = groupSlugsByName;
