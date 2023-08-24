const { gql, GraphQLClient } = require("graphql-request");

const fetchAllSkills = require('./helpers/cms/fetchAllSkills');
const fetchAllSkillIds = require('./helpers/cms/fetchAllSkillIds');
const groupIdsByName = require('./helpers/cms/groupIdsByName.js');
const groupSkillsByCategory = require('./helpers/cms/groupSkillsByCategory');
const makeCheckbox = require('./helpers/cms/makeCheckbox');
const fetchQuestions = require('./helpers/cms/fetchQuestions.js');
const fetchQueryParamsId = require('./helpers/cms/fetchQueryParamsId.js');
const groupQuestionsBySkills = require('./helpers/cms/groupQuestionsBySkills.js');

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
  
    const allSkillIdData = await fetchAllSkillIds(client);
    const IdByNameMapping = groupIdsByName(allSkillIdData);
  
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
    const questions = [];

    const skillSelectionSet = new Set(selectedSkillsInputs);
    const selectedSkillEntries = (await fetchAllSkills(client))
      .filter(skill => skillSelectionSet.has(skill.id));
    const groupedSelectedSkills = Object.values(groupSkillsByCategory(selectedSkillEntries));

    res.render('question.njk', { 
      skillSelectionOverview: groupedSelectedSkills
        .map(group => ({
          title: group.title,
          skillNames: group.skills
            .map(skill => skill.title)
            .sort(),
        }))
        .sort((a, b) => {
          return a.title.localeCompare(b.title);
        }),
      questions,
      accordion: accordion,
    });
  });

}

module.exports = setupRoutes;
