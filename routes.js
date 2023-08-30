const { GraphQLClient } = require("graphql-request");

const fetchAllSkills = require('./helpers/cms/fetchAllSkills');
const fetchAllSkillIds = require('./helpers/cms/fetchAllSkillIds');
const groupIdsByName = require('./helpers/cms/groupIdsByName.js');
const groupSkillsByCategory = require('./helpers/cms/groupSkillsByCategory');
const makeCheckbox = require('./helpers/cms/makeCheckbox');
const fetchQuestions = require('./helpers/cms/fetchQuestions.js');
const fetchQueryParamsId = require('./helpers/cms/fetchQueryParamsId.js');
const groupQuestionsBySkills = require('./helpers/cms/groupQuestionsBySkills.js');
const sortSelectedSkills = require('./helpers/cms/sortSelectedSkills.js');
const fetchSkillsWithIds = require('./helpers/cms/fetchSkillsWithIds.js');
const getPostedArray = require('./helpers/forms/getPostedArray');

function setupRoutes(app) {
  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  });
  
  app.get('/', async(req, res) => {
    const allSkills = await fetchAllSkills(client);
    const skillsByCategoryMapping = groupSkillsByCategory(allSkills);
    const IdByNameMapping = groupIdsByName(allSkills);

    const checkboxGroups = makeCheckbox(skillsByCategoryMapping, IdByNameMapping);
 
    res.render('index.njk', {  
      checkboxGroups: checkboxGroups, 
    });
  });
  
  app.post('/', async(req, res) => {
    let selectedSkillsInputs = getPostedArray(req, "selectedSkillIds");

    const skillSelection = selectedSkillsInputs.join(',');

    res.redirect(`/question?skills=${skillSelection}`);
  });

  app.get('/question', async(req, res) => {
    const selectedSkillsInputs = req.query.skills.split(',');
    const queryParams = fetchQueryParamsId(selectedSkillsInputs);
    const allQuestions = await fetchQuestions(client, queryParams);
    const questionBySkillsMapping = groupQuestionsBySkills(allQuestions);

    const accordion = Object.values(questionBySkillsMapping);

    const selectedSkillEntries = await fetchSkillsWithIds(client, selectedSkillsInputs);
    const groupedSelectedSkills = Object.values(groupSkillsByCategory(selectedSkillEntries));
    const groupedSelectedSkillsSorted = sortSelectedSkills(groupedSelectedSkills);
    
    res.render('question.njk', { 
      skillSelectionOverview: groupedSelectedSkillsSorted,
      accordion: accordion,
    });
  });
}

module.exports = setupRoutes;
