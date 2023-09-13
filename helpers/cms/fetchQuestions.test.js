const fetchQuestions = require('./fetchQuestions');
const { GraphQLClient } = require('graphql-request');

describe('fetchQuestions', () => {

  it('it should receive a GraphQL response and return a list of questions related to the skills', async () => {

    const mockedResponse = {
      questions: {
        data: [{
          attributes: {
            question: 'What is a class?',
            whyDoWeAskThis: 'To see if they have an understanding of classes.',
            guidanceAnswer: 'A class is like a blueprint for creating objects.',
            skills: {
              data: [{
                attributes: {
                  skillName: 'Java',
                }
              }]
            }
          }
        }]
      }
    };

    GraphQLClient.prototype.request = jest.fn().mockResolvedValue(mockedResponse);

    const mockClient = new GraphQLClient('dummy_endpoint');

    const result = await fetchQuestions(mockClient);

    const expectedOutput = [{
      question: 'What is a class?',
      whyDoWeAskThis: 'To see if they have an understanding of classes.',
      guidanceAnswer: 'A class is like a blueprint for creating objects.',
      skill: 'Java'
    }];

    expect(result).toEqual(expectedOutput);
  });

});
