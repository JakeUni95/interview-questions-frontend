const fetchAllSkills = require('./fetchAllSkills');
const { GraphQLClient } = require('graphql-request');

describe('fetchAllSkills', () => {

  it('it should receieve a GraphQL response and return a list of skills', async () => {

    const mockedResponse = {
      skills: {
        data: [{
          id: '1',
          attributes: {
            skillName: 'Java',
            slug: 'java',
            skillCategories: {
              data: [{
                attributes: {
                  skillCategoryName: 'programming languages',
                }
              }]
            }
          }
        }]
      }
    };

    GraphQLClient.prototype.request = jest.fn().mockResolvedValue(mockedResponse);

    const mockClient = new GraphQLClient('dummy_endpoint');

    const result = await fetchAllSkills(mockClient);

    const expectedOutput = [{
      id: '1',
      skillName: 'Java',
      slug: 'java',
      category: 'programming languages',
    }];

    expect(result).toEqual(expectedOutput);
  });

});
