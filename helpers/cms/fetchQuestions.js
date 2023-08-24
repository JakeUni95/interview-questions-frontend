const { gql } = require("graphql-request");

const queryQuestionData = gql`

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

async function fetchQuestions(client, queryParams) {
  const response = await client.request(queryQuestionData, queryParams);
  return response.questions.data
  .map(question => ({
    question: question.attributes.question,
    whyDoWeAskThis: question.attributes.whyDoWeAskThis,
    guidanceAnswer: question.attributes.guidanceAnswer,
    skill: question.attributes.skills.data[0].attributes.skillName,
  }));
}

module.exports = fetchQuestions;
