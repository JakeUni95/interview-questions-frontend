const { gql, GraphQLClient } = require("graphql-request");
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

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

const querySkill = gql`
query {
  skills {
    data {
      attributes {
        skillName
     }
    }
   }
  }
  `;

app.get('/', async(req, res) => {
  const data = await client.request(querySkill)

  const skills = data.skills.data.map(skillData => ({
    skillText: skillData.attributes.skillName
  }))

  res.render('index.njk', {
    skills: skills
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


