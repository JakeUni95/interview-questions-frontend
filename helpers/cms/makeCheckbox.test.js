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

      const slugByNameMapping = {
        'Java': 'java',
        'C#': 'c-sharp',
        'Azure': 'azure',
      };

      const expectedResult = [
        {
          category: 'Programming languages',
          checkboxes: [
            {
              name: 'selectedSkillSlugs',
              value: 'java',
              text: 'Java',
            },
            {
              name: 'selectedSkillSlugs',
              value: 'c-sharp',
              text: 'C#',
            },
          ],
        },
        {
          category: 'Infrastructure',
          checkboxes: [
            {
              name: 'selectedSkillSlugs',
              value: 'azure',
              text: 'Azure',
            },
          ],
        },
      ];

      expect(makeCheckbox(skillsByCategoryMapping, slugByNameMapping)).toEqual(expectedResult);
    });
  });

  describe('Edge Cases', () => {

    it('It should handle empty skillsByCategoryMapping', () => {
      const skillsByCategoryMapping = {};
      const slugByNameMapping = {};

      const expectedResult = [];

      expect(makeCheckbox(skillsByCategoryMapping, slugByNameMapping)).toEqual(expectedResult);
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
