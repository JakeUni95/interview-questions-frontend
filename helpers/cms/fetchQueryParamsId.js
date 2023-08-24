function fetchQueryParamsId(selectedSkillsInputs) {
  return { 
   selectedSkills: {
     or: selectedSkillsInputs.map(skillId => ({
       id: { 
         eq: skillId 
       }
     }))
   }
 };
 }

 module.exports = fetchQueryParamsId;
