const question = "Which of these is not a key value of Agile software development?";

const choices = ["Scrum", "Kanban", "Lean", "Waterfall"];

const correctAnswer = "Waterfall";


const needsChoices = /which of (?:the following|these)|which .* (?:is|was) not/i.test(question)

console.log(needsChoices)