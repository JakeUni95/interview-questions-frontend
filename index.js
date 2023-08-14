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

const queryQuestion = gql`
  query {
    questions {
      data {
        attributes {
          question
        }
      }
    }
  }
`;


 const queryGetSkillData = gql` {
    skills{
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
  const data = await client.request(queryQuestion);
  
  const questions = data.questions.data.map(questionData => ({
    questionText: questionData.attributes.question,
  }));
    res.render('question.njk', {
      questions: questions
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`view here: http://localhost:${port}`);
});




  
