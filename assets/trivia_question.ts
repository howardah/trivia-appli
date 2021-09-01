const colorLookup: Record<string, string> = {
  "general-knowledge": "rose",
  entertainment: "fuchsia",
  science: "indigo",
  mythology: "purple",
  sports: "lime",
  geography: "emerald",
  history: "brown",
  politics: "red",
  arts: "teal",
  celebrities: "amber",
  animals: "orange",
  vehicles: "gray"
};

type TriviaQuestionType = {
  id?: number;
  category: string;
  type: string;
  question: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type TriviaQuestion = {
  id?: number;
  category: string;
  categoryClass: string;
  categoryColor: string;
  type: string;
  difficulty: string;
  question: string;
  formattedQuestion: string;
  correct_answer: string;
  incorrect_answers: string[];
};

function initialiseTriviaQuestion(
  trivia_question: TriviaQuestionType
): TriviaQuestion {
  const categoryClass = (() => {
    let categoryClass: string = trivia_question.category.toLowerCase();

    if (categoryClass === "science & nature") categoryClass = "science";

    const subCategory: RegExp = /(\w+):[\W]*(.*)/;
    if (subCategory.test(categoryClass)) {
      const catMatch = categoryClass.match(subCategory);
      if (catMatch !== null) categoryClass = catMatch[1];
    }

    return categoryClass.replaceAll(" ", "-");
  })();

  const categoryColor = colorLookup[categoryClass];

  const formattedQuestion = (() => {
    if (trivia_question.type === "boolean")
      return "True or False: " + trivia_question.question;
    return trivia_question.question;
  })();

  return {
    id: trivia_question.id,
    category: trivia_question.category,
    difficulty: trivia_question.difficulty,
    type: trivia_question.type,
    question: trivia_question.question,
    correct_answer: trivia_question.correct_answer,
    incorrect_answers: trivia_question.incorrect_answers,
    categoryClass: categoryClass,
    categoryColor: categoryColor,
    formattedQuestion: formattedQuestion
  };
}

export {
  TriviaQuestion,
  TriviaQuestionType,
  initialiseTriviaQuestion,
  colorLookup
};
