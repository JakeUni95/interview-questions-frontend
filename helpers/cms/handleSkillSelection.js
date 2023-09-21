const fetchAllSkills = require('./fetchAllSkills');
const groupSkillsByCategory = require('./groupSkillsByCategory');
const groupSlugsByName = require('./groupSlugsByName');
const makeCheckbox = require('./makeCheckbox');

async function handleSkillSelection(client, req, res) {
  const allSkills = await fetchAllSkills(client);
  const skillsByCategoryMapping = groupSkillsByCategory(allSkills);
  const slugByNameMapping = groupSlugsByName(allSkills);
  const checkboxGroups = makeCheckbox(skillsByCategoryMapping, slugByNameMapping);

  if (res.locals.hasSelectionError) {
    res.render('index.njk', {  
      checkboxGroups: checkboxGroups,
      hasErrors: true,
    });
  } else {
    res.render('index.njk', {
      checkboxGroups: checkboxGroups,
      hasErrors: false,
    });
  }
}

module.exports = handleSkillSelection;
