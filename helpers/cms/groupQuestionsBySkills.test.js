const groupQuestionsBySkills = require('./groupQuestionsBySkills');

const javaQuestionWithSkill = {
  question: 'Is Java a pure object-oriented programming language?',
  whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
  guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
  skill: 'Java',
}

const javaQuestionWithoutSkill = {
  question: 'Is Java a pure object-oriented programming language?',
  whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
  guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
}

const classQuestionWithSkill = {
  question: 'What is a class?',
  whyDoWeAskThis: 'To see if they have an understanding of classes.',
  guidanceAnswer: 'A class is like a blueprint for creating objects.',
  skill: 'Java',
}

const classQuestionWithoutSkill = {
  question: 'What is a class?',
  whyDoWeAskThis: 'To see if they have an understanding of classes.',
  guidanceAnswer: 'A class is like a blueprint for creating objects.',
}


describe('groupQuestionsBySkills', () => {
  it.each([
    [
      [], 
      {}
    ],
    [
      [{skill: 'Java'}],
      { 'Java': [{}]}
    ],
    [
      [javaQuestionWithSkill], 
      {'Java': [javaQuestionWithoutSkill]}
    ],
    [
      [classQuestionWithSkill, javaQuestionWithSkill], 
      {'Java': [classQuestionWithoutSkill, javaQuestionWithoutSkill]}
    ],
  ])('given questions %p, should group by skills as %p', (input, expectedResult) => {
    expect(groupQuestionsBySkills(input)).toEqual(expectedResult);
  });
});
