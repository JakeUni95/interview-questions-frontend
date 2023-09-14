const groupQuestionsBySkills = require('./groupQuestionsBySkills');

describe('groupQuestionsBySkills', () => {

  it('should group questions by their associated skills when there is one skill with many questions', () => {
  
    const sampleQuestions = [{
      question: 'Is Java a pure object-oriented programming language?',
      whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
      guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      skill: 'Java',
    }];

    const expectedOutput = {
      'Java': [{
        question: 'Is Java a pure object-oriented programming language?',
        whyDoWeAskThis: 'We want to know if the interviewee knows what makes a language object-oriented.',
        guidanceAnswer: 'Java is not a pure object-oriented language as it uses primitive types such as byte, boolean, char, short, int, float, long and double.',
      }]
    };


    const result = groupQuestionsBySkills(sampleQuestions);

    expect(result).toEqual(expectedOutput);
// do 0 1 and 2 questions for tests
  })})
