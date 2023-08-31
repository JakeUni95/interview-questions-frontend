function groupQuestionsBySkills(allQuestions) {
  return allQuestions.reduce((groups, question) => {
    if (!groups[question.skill]) {
      groups[question.skill] = []; 
    }
    groups[question.skill].push({
      question: question.question,
      whyDoWeAskThis: question.whyDoWeAskThis,
      guidanceAnswer: question.guidanceAnswer,
    });
    return groups;
  }, {});
}

module.exports = groupQuestionsBySkills;
