const groupSkillsByCategory = require('./groupSkillsByCategory');

const javaSkillWithCategory = {
  id: '1',
  skillName: 'Java',
  slug: 'java',
  category: 'Programming language',
};

const javaSkillWithoutCategory = {
  id: '1',
  skillName: 'Java',
  slug: 'java',
};

const cSharpSkillWithCategory = {
  id: '2',
  skillName: 'C#',
  slug: 'c-sharp',
  category: 'Programming language',
};

const AzureSkillWithCategory = {
  id: '3',
  skillName: 'Azure',
  slug: 'azure',
  category: 'Technical experience',
};

describe('groupSkillsByCategory', () => {
  describe('Typical Usage', () => {
    it.each([
      [
        [javaSkillWithCategory],
        {
          'Programming language': {
            category: 'Programming language',
            skills: [javaSkillWithCategory],
          },
        },
      ],
      [
        [javaSkillWithCategory, cSharpSkillWithCategory],
        {
          'Programming language': {
            category: 'Programming language',
            skills: [javaSkillWithCategory, cSharpSkillWithCategory],
          },
        },
      ],
      [
        [javaSkillWithCategory, AzureSkillWithCategory],
        {
          'Programming language': {
            category: 'Programming language',
            skills: [javaSkillWithCategory],
          },
          'Technical experience': {
            category: 'Technical experience',
            skills: [AzureSkillWithCategory],
          },
        },
      ],
    ])('given skills %p, should group by category as %p', (input, expectedResult) => {
      expect(groupSkillsByCategory(input)).toEqual(expectedResult);
    });
  });

  describe('Edge Cases', () => {
    it.each([
      [
        [],
        {},
      ],
      [
        [javaSkillWithoutCategory],
        {
          undefined: {
            category: undefined,
            skills: [javaSkillWithoutCategory],
          },
        },
      ],
    ])('given skills %p, should group by category as %p', (input, expectedResult) => {
      expect(groupSkillsByCategory(input)).toEqual(expectedResult);
    });
  });
});
