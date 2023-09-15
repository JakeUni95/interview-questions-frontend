const sortSelectedSkills = require('./sortSelectedSkills');

describe('sortSelectedSkills', () => {

  it('It should correctly sort skill categories and skill names', () => {

    const emptyInput = [];
    const emptyOutput = [];

    const OneSkillsSameCategory = [
      {
        category: 'Programming languages',
        skills: [
          { skillName: 'Java' }
        ],
      },
    ];

    const OneSkillsSameCategoryOutput = [
      {
        skillCategory: 'Programming languages',
        skillNames: ['Java']
      },
    ];

    const TwoSkillsSameCategory = [
      {
        category: 'Programming languages',
        skills: [
          { skillName: 'Java', },
          { skillName: 'C#' }
        ],
      },
    ];

    const TwoSkillsSameCategoryOutput = [
      {
        skillCategory: 'Programming languages',
        skillNames: ['C#', 'Java'],
      },
    ];

    const ThreeSkillsSameCategory = [
      {
        category: 'Programming languages',
        skills: [
          { skillName: 'Python', },
          { skillName: 'C#' },
          { skillName: 'Java' }
        ],
      },
    ];

    const ThreeSkillsSameCategoryOutput = [
      {
        skillCategory: 'Programming languages',
        skillNames: ['C#', 'Java', 'Python']
      },
    ];

    const OneSkillInTwoCategories = [
      {
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
      }
    ];

    const OneSkillInTwoCategoriesOutput = [
      {
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
      }
    ];
    const emptyInputResult = sortSelectedSkills(emptyInput);
    expect(emptyInputResult).toEqual(emptyOutput);

    const OneSkillsSameCategoryResult = sortSelectedSkills(OneSkillsSameCategory);
    expect(OneSkillsSameCategoryResult).toEqual(OneSkillsSameCategoryOutput);

    const TwoSkillsSameCategoryResult = sortSelectedSkills(TwoSkillsSameCategory);
    expect(TwoSkillsSameCategoryResult).toEqual(TwoSkillsSameCategoryOutput);

    const ThreeSkillsSameCategoryResult = sortSelectedSkills(ThreeSkillsSameCategory);
    expect(ThreeSkillsSameCategoryResult).toEqual(ThreeSkillsSameCategoryOutput);

    const OneSkillInTwoCategoriesResult = sortSelectedSkills(OneSkillInTwoCategories)
    expect(OneSkillInTwoCategoriesResult).toEqual(OneSkillInTwoCategoriesOutput);
  });
});
