// Import the file system module
const fs = require('fs');

// Define the question class with attributes
class Question {
  constructor(question, subject, topic, difficulty, marks) {
    this.question = question;
    this.subject = subject;
    this.topic = topic;
    this.difficulty = difficulty;
    this.marks = marks;
  }
}

// Define the question paper class with methods
class QuestionPaper {
  constructor(totalMarks, difficultyDistribution) {
    this.totalMarks = totalMarks;
    this.difficultyDistribution = difficultyDistribution;
    this.questions = [];
    this.marks = 0;
  }

  // Add a question to the question paper if it meets the criteria
  addQuestion(question) {
    // Check if the question paper has reached the total marks
    if (this.marks >= this.totalMarks) {
      return false;
    }

    // Check if the question paper has enough space for the question marks
    if (this.marks + question.marks > this.totalMarks) {
      return false;
    }

    // Check if the question paper has enough percentage for the question difficulty
    let difficultyCount = this.questions.filter(
      (q) => q.difficulty === question.difficulty
    ).length;
    let difficultyPercentage =
      (difficultyCount * 100) / this.questions.length || 0;
    if (
      difficultyPercentage >=
      this.difficultyDistribution[question.difficulty]
    ) {
      return false;
    }

    // Add the question to the question paper
    this.questions.push(question);
    this.marks += question.marks;
    return true;
  }

  // Display the question paper in a formatted way
  display() {
    console.log(`Question Paper: ${this.totalMarks} marks`);
    console.log(`Difficulty Distribution: ${JSON.stringify(
      this.difficultyDistribution
    )}`);
    console.log(`Number of Questions: ${this.questions.length}`);
    console.log(`Total Marks: ${this.marks}`);
    console.log(`Questions:`);
    for (let i = 0; i < this.questions.length; i++) {
      let question = this.questions[i];
      console.log(
        `${i + 1}. ${question.question} (${question.subject}, ${
          question.topic
        }, ${question.difficulty}, ${question.marks} marks)`
      );
    }
  }
}

// Read the sample data from a JSON file
fs.readFile('questions.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the data into an array of questions
  let questions = JSON.parse(data).map(
    (q) =>
      new Question(
        q.question,
        q.subject,
        q.topic,
        q.difficulty,
        q.marks
      )
  );

  // Shuffle the questions array
  questions.sort(() => Math.random() - 0.5);

  // Create a new question paper with the given criteria
  let questionPaper = new QuestionPaper(100, {
    Easy: 20,
    Medium: 50,
    Hard: 30,
  });

  // Try to add each question to the question paper
  for (let question of questions) {
    questionPaper.addQuestion(question);
  }

  // Display the question paper
  questionPaper.display();
});
