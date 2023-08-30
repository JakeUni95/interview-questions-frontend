const { gql } = require("graphql-request");

const queryAllSkills = gql` 
  {
    skills {
      data {
        id
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

async function fetchAllSkills(client) {
  const response = await client.request(queryAllSkills);
  return response.skills.data
    .map(rawSkill => ({
      id: rawSkill.id,
      skillName: rawSkill.attributes.skillName,
      category: rawSkill.attributes.skillCategories.data[0].attributes.skillCategoryName,
    }));
}

module.exports = fetchAllSkills;
