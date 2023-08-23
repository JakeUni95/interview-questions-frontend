const { gql, GraphQLClient } = require("graphql-request");

const fetchAllSkills = require('./helpers/cms/fetchAllSkills');
const getPostedArray = require('./helpers/forms/getPostedArray');

const queryGetQuestionData = gql`
  query ($selectedSkills:SkillFiltersInput) {
    questions (filters:{skills:$selectedSkills}) {
      data {
        attributes {
          question
          whyDoWeAskThis
          guidanceAnswer
          skills {
            data {
              attributes {
                skillName
              }
            } 
          }  
        }
      }
    }
  }
`;

const queryGetSkillId = gql`
  {
    skills {
      data {
        id
        attributes {
          skillName
        }
      }
    }
  }
`;

function fetchSkillId(rawIds){
  return rawIds.map(rawIds => ({
    id: rawIds.id,
    skill: rawIds.attributes.skillName,
}));
}

function groupIdsbyName(allSkillIds) {
    return allSkillIds.reduce((groups, id) => {
      if(!groups[id.skill]) {
        groups[id.skill] = []; 
      }
      groups[id.skill].push(id.id); 
      return groups;
    }, {});
}



function groupSkillsByCategory(allSkills){
  return allSkills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
        groups[skill.category] = {
          title: skill.category,
          skills: [],
        };
      }
      groups[skill.category].skills.push(skill);
      return groups;
      }, {});
}

function fetchCheckbox(skillsByCategoryMapping, nameByIdMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    title: group.title,
    checkboxes: group.skills.map(skill => ({
      name: "selectedSkillIds",
      value: nameByIdMapping[skill.title],
      text: skill.title,
    }))
   }));
}

function fetchQuestions(rawQuestions) {
  return rawQuestions.map(question => ({
    question: question.attributes.question,
    whyDoWeAskThis: question.attributes.whyDoWeAskThis,
    guidanceAnswer: question.attributes.guidanceAnswer,
    skill: question.attributes.skills.data[0].attributes.skillName,
  }));
}


function fetchQuestionsBySkillsMapping(allQuestions) {
  return allQuestions.reduce((groups, question) => {
    if (!groups[question.skill]) {
      groups[question.skill] = []; 
    }
    groups[question.skill].push({
      question: question.question,
      whyDoWeAskThis: question.whyDoWeAskThis,
      guidanceAnswer: question.guidanceAnswer
    });
    return groups;
  }, {});
}

function setupRoutes(app) {

  const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  });
  
  app.get('/', async(req, res) => {
    const allSkills = await fetchAllSkills(client);
    const skillsByCategoryMapping = groupSkillsByCategory(allSkills);
  
    const skillIdData = await client.request(queryGetSkillId);
    const rawIds = skillIdData.skills.data;
    const allSkillIds = fetchSkillId(rawIds);
    const IdByNameMapping = groupIdsbyName(allSkillIds);
  
    const checkboxGroups = fetchCheckbox(skillsByCategoryMapping, IdByNameMapping);
  
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

    const queryParams = {
      selectedSkills: {
        or: selectedSkillsInputs.map(skillId => ({
          id: { 
            eq: skillId 
          }
        }))
      }
    };

    const data = await client.request(queryGetQuestionData, queryParams);
    const rawQuestions = data.questions.data;
    const allQuestions = fetchQuestions(rawQuestions);
    const questionBySkillsMapping = fetchQuestionsBySkillsMapping(allQuestions);
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
