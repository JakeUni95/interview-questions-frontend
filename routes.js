const { GraphQLClient } = require("graphql-request");

const fetchAllSkills = require('./helpers/cms/fetchAllSkills');
const groupSlugsByName = require('./helpers/cms/groupSlugsByName.js');
const groupSkillsByCategory = require('./helpers/cms/groupSkillsByCategory');
const makeCheckbox = require('./helpers/cms/makeCheckbox');
const fetchQuestions = require('./helpers/cms/fetchQuestions.js');
const buildSelectedSkillsQueryFilter = require('./helpers/cms/buildSelectedSkillsQueryFilter.js');
const groupQuestionsBySkills = require('./helpers/cms/groupQuestionsBySkills.js');
const sortSelectedSkills = require('./helpers/cms/sortSelectedSkills.js');
const fetchSkillsWithSlugs = require('./helpers/cms/fetchSkillsWithSlugs.js');
const getPostedArray = require ('./helpers/forms/getPostedArray');

function setupRoutes(app) {
  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  });
  
  app.get('/', async(req, res) => {
    const allSkills = await fetchAllSkills(client);
    const skillsByCategoryMapping = groupSkillsByCategory(allSkills);
    const IdByNameMapping = groupSlugsByName(allSkills);

    const checkboxGroups = makeCheckbox(skillsByCategoryMapping, IdByNameMapping);

    res.render('index.njk', {  
      checkboxGroups: checkboxGroups, 
    });
  });
  
  app.post('/', async(req, res) => {
    let selectedSkillsInputs = getPostedArray(req, "selectedSkillSlugs");

    const skillSelection = selectedSkillsInputs.join(',');

    res.redirect(`/question?skills=${skillSelection}`);
  });

  app.get('/question', async(req, res) => {
    const selectedSkillsInputs = req.query.skills.split(',');
    const queryParams = buildSelectedSkillsQueryFilter(selectedSkillsInputs);
    const allQuestions = await fetchQuestions(client, queryParams);
    const questionBySkillsMapping = groupQuestionsBySkills(allQuestions);

    const accordion = Object.values(questionBySkillsMapping);

    const selectedSkillEntries = await fetchSkillsWithSlugs(client, selectedSkillsInputs);
    const groupedSelectedSkills = Object.values(groupSkillsByCategory(selectedSkillEntries));
    const groupedSelectedSkillsSorted = sortSelectedSkills(groupedSelectedSkills);

    res.render('question.njk', { 
      skillSelectionOverview: groupedSelectedSkillsSorted,
      accordion: accordion,
    });
  });
}

module.exports = setupRoutes;
