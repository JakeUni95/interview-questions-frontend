const { gql, GraphQLClient } = require("graphql-request");
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT ?? 3000;

const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
  },
});
console.log(process.env.GRAPHQL_ENDPOINT)

nunjucks.configure([
  'node_modules/govuk-frontend/',
  'views'
], {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

const queryGetQuestionData = gql`
{
  questions {
    data {
      attributes {
        question
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
const queryGetQuestionDatanew = gql`
query ($selectedSkills:SkillFiltersInput) {
  questions (filters:{skills:$selectedSkills}) {
    data {
      attributes {
        question
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


const queryGetSkillData = gql` 
{
  skills {
    data {
      attributes {
        skillName
        skillCategories {
          data {
            attributes {
              skillCategoryName
              }
            }
          }
        }
      }
    }
  }
`;

function fetchSkills(rawSkills) {
  return rawSkills.map(rawSkill => ({
    title: rawSkill.attributes.skillName,
    category: rawSkill.attributes.skillCategories.data[0].attributes.skillCategoryName,
  }));
}

function fetchSkillsByCategoryMapping(allSkills){
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

function fetchCheckbox(skillsByCategoryMapping) {
  return Object.values(skillsByCategoryMapping).map(group => ({
    title: group.title,
    checkboxes: group.skills.map(skill => ({
      value: skill.title,
      text: skill.title,
    }))
   }));
}

app.get('/', async(req, res) => {
  const data = await client.request(queryGetSkillData);
  const rawSkills = data.skills.data;
  const allSkills = fetchSkills(rawSkills);
  const skillsByCategoryMapping = fetchSkillsByCategoryMapping(allSkills);
  const checkboxGroups = fetchCheckbox(skillsByCategoryMapping);
  
  res.render('index.njk', {  
    checkboxGroups: checkboxGroups, 
  });
});

function fetchQuestions(rawQuestions) {
  return rawQuestions.map(question => ({
    question: question.attributes.question,
    skill: question.attributes.skills.data[0].attributes.skillName,
  }));
}

// function fetchQuestionsBySkillsMapping(allQuestions) {
//   return allQuestions.reduce((groups, question) => {
//     if (!groups[question.skill]) {
//       groups[question.skill] = {
//         skills: question.skill,
//         question: [],
//       };
//     }
//     groups[question.skill].question.push(question)
//    return groups;
//   }, {});
// }

function fetchQuestionsBySkillsMappingtest(allQuestions) {
  return allQuestions.reduce((groups, question) => {
    if (!groups[question.skill]) {
      groups[question.skill] = [];  // Initialize the skill key with an empty array
    }
    groups[question.skill].push(question.question);  // Push only the question string
    return groups;
  }, {});
}

app.post('/question', async(req, res) => {
  // const queryParams = {
  //   selectedSkills: {
  //     or: req.query.skills.split(",")
  //       .map(skillId =>({
  //         id: {
  //           eq: skillId
  //         }
  //       }))
  //   }
  // };
  const data = await client.request(queryGetQuestionData); //, queryParams)
  const rawQuestions = data.questions.data;
  const allQuestions = fetchQuestions(rawQuestions);
  const questionBySkillsMapping = fetchQuestionsBySkillsMappingtest(allQuestions);
  
 //console.log(questionBySkillsMapping);
  //console.log(req.body);

const accordion = Object.values(questionBySkillsMapping);

  res.render('question.njk', { 
    submittedData: req.body,
    accordion: accordion,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`view here: http://localhost:${port}`);
});

