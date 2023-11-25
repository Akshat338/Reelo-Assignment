// QuestionPaperGenerator.js

const questionStore = require('./QuestionStore');

class QuestionPaperGenerator {
  constructor(percentageDistribution) {
    this.percentageDistribution = percentageDistribution;
  }

  generateQuestionPaper(totalMarks) {
    const questionPaper = [];
    const totalQuestions = questionStore.length;

    for (const difficulty in this.percentageDistribution) {
      const percentage = this.percentageDistribution[difficulty];
      const difficultyQuestions = this.getQuestionsByDifficulty(difficulty);
      const count = Math.floor((percentage / 100) * totalMarks);

      if (count > difficultyQuestions.length) {
        throw new Error(`Insufficient questions of difficulty ${difficulty}`);
      }

      const selectedQuestions = this.getRandomQuestions(difficultyQuestions, count);
      questionPaper.push(...selectedQuestions);
    }

    return questionPaper;
  }

  getQuestionsByDifficulty(difficulty) {
    return questionStore.filter(question => question.difficulty === difficulty);
  }

  getRandomQuestions(questions, count) {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, count);
  }
}

module.exports = QuestionPaperGenerator;
