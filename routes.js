const { GraphQLClient } = require("graphql-request");

const groupSkillsByCategory = require('./helpers/cms/groupSkillsByCategory');
const fetchQuestions = require('./helpers/cms/fetchQuestions');
const buildSelectedSkillsQueryFilter = require('./helpers/cms/buildSelectedSkillsQueryFilter');
const groupQuestionsBySkills = require('./helpers/cms/groupQuestionsBySkills');
const sortSelectedSkills = require('./helpers/cms/sortSelectedSkills');
const fetchSkillsWithSlugs = require('./helpers/cms/fetchSkillsWithSlugs');
const getPostedArray = require ('./helpers/forms/getPostedArray');
const fetchSelectedSkillsSlugs = require('./helpers/forms/fetchSelectedSkillsSlugs');
const isValidSlug = require ('./helpers/forms/isValidSlug');
const handleSkillSelection = require ('./helpers/cms/handleSkillSelection');


function setupRoutes(app) {
  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  });

  app.get("/", (req, res) => {
    handleSkillSelection(client, req, res)
  })

  app.post("/", async (req, res) => {
    let selectedSkillsInputs = getPostedArray(req, "selectedSkillSlugs");

    const hasSkillSelection = !!selectedSkillsInputs.length;

    if (!hasSkillSelection) {
      res.locals.hasSelectionError = true;
      return handleSkillSelection(client, req, res);
    }
    res.redirect(`/question?skills=${selectedSkillsInputs.join(',')}`);
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

    const selectedSkillsSlugs = fetchSelectedSkillsSlugs(selectedSkillEntries);  

    if (isValidSlug(selectedSkillsSlugs, selectedSkillsInputs, res)) {
      return res.redirect(`/question?skills=${selectedSkillsSlugs.join(',')}`);
    } 

    res.render('question.njk', { 
      skillSelectionOverview: groupedSelectedSkillsSorted,
      accordion: accordion,
    });
  });

  app.get('/error', async (req, res) => {

    res.render('error.njk', {
      
    });
  });
}

module.exports = setupRoutes;
