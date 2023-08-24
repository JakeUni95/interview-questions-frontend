const { gql } = require("graphql-request");

const queryIdAndSkillName = gql`
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

async function fetchAllSkillIds(client){
  const response = await client.request(queryIdAndSkillName);
  return response.skills.data
  .map(rawIds => ({
    id: rawIds.id,
    skill: rawIds.attributes.skillName,
}));
}

module.exports = fetchAllSkillIds;
