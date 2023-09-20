const sortSelectedSkills = require('./sortSelectedSkills');

describe('sortSelectedSkills', () => {

  describe('Typical Usage', () => {

    it.each([
      [
        [{
            category: 'Programming languages',
            skills: [
              { skillName: 'Java' },
              { skillName: 'C#' }
            ],
          }],
        [{
            skillCategory: 'Programming languages',
            skillNames: ['C#', 'Java'],
          }]
      ],
      [
        [{
            category: 'Programming languages',
            skills: [
              { skillName: 'Python' },
              { skillName: 'C#' },
              { skillName: 'Java' }
            ],
          }],
        [{
            skillCategory: 'Programming languages',
            skillNames: ['C#', 'Java', 'Python']
          }]
      ],
      [
        [{
            category: 'Programming languages',
            skills: [
              { skillName: 'Java' }
            ]
          },
          { 
            category: 'Infrastructure',
            skills: [
              { skillName: 'Azure' }
            ]
          }],
        [{
            skillCategory: 'Infrastructure',
            skillNames: [
              'Azure'
            ]
          },
          {
            skillCategory: 'Programming languages',
            skillNames: [
              'Java'
            ]
          }],
      ],
    ])('It should correctly sort skill categories and skill names', (input, expectedResult) => {
      expect(sortSelectedSkills(input)).toEqual(expectedResult);
    });
  });

  describe('Edge Cases', () => {

    it.each([
      [
        [], 
        []
      ],
      [  
        [
          {
            category: 'Programming languages',
            skills: [
              { skillName: 'Java' }
            ],
          },
        ],
        [
          {
            skillCategory: 'Programming languages',
            skillNames: ['Java'],
          },
        ]
      ],
    ])('It should handle edge cases and return %p', (input, expectedResult) => {
      expect(sortSelectedSkills(input)).toEqual(expectedResult);
    });
  });
});
