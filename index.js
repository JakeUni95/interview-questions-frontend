const { gql, GraphQLClient } = require("graphql-request");
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

dotenv.config();

const port = process.env.PORT ?? 3000;

const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `bearer ${process.env.GRAPHQL_TOKEN}`,
  },
});
console.log(process.env.GRAPHQL_ENDPOINT)

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const query = gql`
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

app.get('/', async(req, res) => {
  const data = await client.request(query);

  const questions = data.questions.data.map(questionData => ({
    questionText: questionData.attributes.question,
  }));
  
  console.log(questions);

  //console.log(JSON.stringify(data, null, 2))
  res.render('index.njk', {
    questions,
    someNumber: 42,
    someItems: [   
      {   
        title: 'First item',  
      },  
      {  
        title: 'Second item', 
      },  
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`view here: http://localhost:${port}`);
});
