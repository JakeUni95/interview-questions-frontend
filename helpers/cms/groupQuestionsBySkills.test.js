const groupQuestionsBySkills = require('./groupQuestionsBySkills');

describe('groupQuestionsBySkills', () => {

  it('It should group questions by their associated skills', () => {

    const emptyInput = [];
    const emptyOutput = {};

    const noQuestions = [{
      skill: 'Java'
    }];

    const noQuestionOutput = {
      'Java': [{
      }]
    };

    const oneQuestionOneSkill = [{
      question: 'Is Java a pure object-oriented programming language?',
      whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
      guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      skill: 'Java',
    }];

    const oneQuestionOneSkillOutput = {
      'Java': [{
        question: 'Is Java a pure object-oriented programming language?',
        whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
        guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      }]
    };

    const TwoQuestionsOneSkill = [{
      question: 'What is a class?',
      whyDoWeAskThis: 'To see if they have an understanding of classes.',
      guidanceAnswer: 'A class is like a blueprint for creating objects.',
      skill: 'Java',
    },
    {
      question: 'Is Java a pure object-oriented programming language?',
      whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
      guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      skill: 'Java',
    }];

    const TwoQuestionsOneSkillOutput = {
      'Java': [{
        question: 'What is a class?',
        whyDoWeAskThis: 'To see if they have an understanding of classes.',
        guidanceAnswer: 'A class is like a blueprint for creating objects.',
      },
      {
        question: 'Is Java a pure object-oriented programming language?',
        whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
        guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      }]
    };

    const emptyInputResult = groupQuestionsBySkills(emptyInput);
    expect(emptyInputResult).toEqual(emptyOutput);

    const noQuestionsResult = groupQuestionsBySkills(noQuestions);
    expect(noQuestionsResult).toEqual(noQuestionOutput);

    const oneQuestionOneSkillResult = groupQuestionsBySkills(oneQuestionOneSkill);
    expect(oneQuestionOneSkillResult).toEqual(oneQuestionOneSkillOutput);

    const TwoQuestionsOneSkillResult = groupQuestionsBySkills(TwoQuestionsOneSkill);
    expect(TwoQuestionsOneSkillResult).toEqual(TwoQuestionsOneSkillOutput);
  })
})
