const { gql, GraphQLClient } = require("graphql-request");
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.urlencoded({ extended: true }));

app.get('/submit', (req, res) => {
  console.log(req.query);

  res.render('question.njk', { 
    submittedData: req.query 
  });
});

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


const queryGetSkillData = gql` {
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

app.get('/', async(req, res) => {
  const data = await client.request(queryGetSkillData)
  const rawSkills = data.skills.data;

  const allSkills = rawSkills.map(rawSkill => ({
    title: rawSkill.attributes.skillName,
    category: rawSkill.attributes.skillCategories.data[0].attributes.skillCategoryName,
    })
   );
 
  const skillsByCategoryMapping = allSkills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
        groups[skill.category] = {
          title: skill.category,
          skills: [],
        };
      }
      groups[skill.category].skills.push(skill);
      return groups;
      }, {});
      
   //console.log(skillsByCategoryMapping);
 
  const checkboxGroups = Object.values(skillsByCategoryMapping).map(group => ({
     title: group.title,
     checkboxes: group.skills.map(skill => ({
       value: skill.title,
       text: skill.title,
     }))
    }));
  
  res.render('index.njk', { 
    allSkills: allSkills, 
    checkboxGroups: checkboxGroups, 
  });
});

app.get('/question', async(req, res) => {
  const data = await client.request();
  
  const questions = data.questions.data.map(questionData => ({
    questionText: questionData.attributes.question,
  }));
  console.log(questions);
    res.render('question.njk', {
      questions: questions,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`view here: http://localhost:${port}`);
});

let a = {
  "data": {
    "questions": {
      "data": [
        {
          "attributes": {
            "question": "Is Java a pure object-oriented programming language?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "Java"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "In C# how could you sort the elements of an array in descending order?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "C#"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "If one member of your team has a different point of view about what direction a project should be heading, how do you rectify this?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "Working in a team"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "What is a class?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "Java"
                  }
                },
                {
                  "attributes": {
                    "skillName": "C#"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "What are the three models for cloud deployment?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "Azure"
                  }
                },
                {
                  "attributes": {
                    "skillName": "AWS"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "What is AWS?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "AWS"
                  }
                }
              ]
            }
          }
        },
        {
          "attributes": {
            "question": "How do you handle unexpected challenges or roadblocks when working independently?",
            "skills": {
              "data": [
                {
                  "attributes": {
                    "skillName": "Working alone"
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}
  
const rawQuestions = a.data.questions.data;
//console.log(rawQuestions);

const allQuestions = rawQuestions.map(question => ({
  question: question.attributes.question,
  skill: question.attributes.skills.data.map(skill => skill.attributes.skillName)
}));

//console.log(allQuestions)

const questionBySkillsMapping = allQuestions.reduce((groups, question) => {
  if (!groups[question.skill]) {
    groups[question.skill] = {
      skills: [],
      question: [],
    };
  }
  groups[question.skill].skills.push(question.skill)
  groups[question.skill].question.push(question)
 return groups;
}, {});
console.log(questionBySkillsMapping);
console.log(JSON.stringify(questionBySkillsMapping, null, 2));

//console.log(Object.values(questionBySkillsMapping));
// const skillsByCategoryMapping = allSkills.reduce((groups, skill) => {
//   if (!groups[skill.category]) {
//       groups[skill.category] = {
//         title: skill.category,
//         skills: [],
//       };
//     }
//     groups[skill.category].skills.push(skill);
//     return groups;
//     }, {});
