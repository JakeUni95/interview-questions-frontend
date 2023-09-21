const makeCheckbox = require('./makeCheckbox');

describe('makeCheckbox', () => {

  describe('Typical Usage', () => {

    it('It should create checkboxes for skills by category', () => {
      
      const skillsByCategoryMapping = {
        'Programming languages': {
          category: 'Programming languages',
          skills: [
            { skillName: 'Java' },
            { skillName: 'C#' },
          ],
        },
        'Infrastructure': {
          category: 'Infrastructure',
          skills: [
            { skillName: 'Azure' },
          ],
        },
      };

      const idByNameMapping = {
        'Java': 'javaId',
        'C#': 'csharpId',
        'Azure': 'azureId',
      };

      const expectedResult = [
        {
          category: 'Programming languages',
          checkboxes: [
            {
              name: 'selectedSkillSlugs',
              value: 'javaId',
              text: 'Java',
            },
            {
              name: 'selectedSkillSlugs',
              value: 'csharpId',
              text: 'C#',
            },
          ],
        },
        {
          category: 'Infrastructure',
          checkboxes: [
            {
              name: 'selectedSkillSlugs',
              value: 'azureId',
              text: 'Azure',
            },
          ],
        },
      ];

      expect(makeCheckbox(skillsByCategoryMapping, idByNameMapping)).toEqual(expectedResult);
    });
  });

  describe('Edge Cases', () => {

    it('It should handle empty skillsByCategoryMapping', () => {
      const skillsByCategoryMapping = {};
      const idByNameMapping = {};

      const expectedResult = [];

      expect(makeCheckbox(skillsByCategoryMapping, idByNameMapping)).toEqual(expectedResult);
    });

    it('It should handle empty skills in a category', () => {
      const skillsByCategoryMapping = {
        'Programming languages': {
          category: 'Programming languages',
          skills: [],
        },
      };
      const idByNameMapping = {};

      const expectedResult = [
        {
          category: 'Programming languages',
          checkboxes: [],
        },
      ];

      expect(makeCheckbox(skillsByCategoryMapping, idByNameMapping)).toEqual(expectedResult);
    });

  });

});
