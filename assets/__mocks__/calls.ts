import { CategoryFilter } from "~/@types/components";
import { TriviaQuestionApiResult } from "~/@types/trivia-question";

const triviaApi: string = "https://opentdb.com/api.php";
const triviaApiSession: string =
  "https://opentdb.com/api_token.php?command=request";

const apiResults = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question:
        "Who played the female lead in the 1933 film &quot;King Kong&quot;?",
      correct_answer: "Fay Wray",
      incorrect_answers: ["Jean Harlow", "Vivien Leigh", "Mae West"],
    },
    {
      category: "Entertainment: Film",
      type: "boolean",
      difficulty: "easy",
      question:
        "Leonardo DiCaprio won an Oscar for Best Actor in 2004&#039;s &quot;The Aviator&quot;.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question: "Who directed the 1973 film &quot;American Graffiti&quot;?",
      correct_answer: "George Lucas",
      incorrect_answers: [
        "Ron Howard",
        "Francis Ford Coppola",
        "Steven Spielberg",
      ],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question:
        "In which African country was the 2006 film &#039;Blood Diamond&#039; mostly set in?",
      correct_answer: "Sierra Leone",
      incorrect_answers: [
        "Liberia",
        "Burkina Faso",
        "Central African Republic",
      ],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question:
        "In the 2010 Nightmare on Elm Street reboot, who played Freddy Kruger?",
      correct_answer: "Jackie Earle Haley",
      incorrect_answers: ["Tyler Mane", "Derek Mears", "Gunnar Hansen"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question: "Which one of these films are shot entirely in one-take?",
      correct_answer: "Russian Ark",
      incorrect_answers: [
        "Good Will Hunting",
        "Birdman",
        "Schindler&#039;s List",
      ],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question: "Who played Sgt. Gordon Elias in &#039;Platoon&#039; (1986)?",
      correct_answer: "Willem Dafoe",
      incorrect_answers: ["Charlie Sheen", "Matt Damon", "Johnny Depp"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question: "In Mulan (1998), who is the leader of the Huns?",
      correct_answer: "Shan Yu",
      incorrect_answers: ["Chien-Po", "Li Shang", "Fa Zhou"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question: "In Big Hero 6, what fictional city is the Big Hero 6 from?",
      correct_answer: "San Fransokyo",
      incorrect_answers: ["San Tokyo", "Tokysisco", "Sankyo"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "medium",
      question:
        "In the 2014 film &quot;Birdman&quot;, what is the primary instrument in the score?",
      correct_answer: "Drums",
      incorrect_answers: ["Saxophone", "Violin", "Actual Live Birds Singing"],
    },
  ],
};

const apiSessionResults = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "f26a74b2241259fc21faa209c63237fa19c971bc68576d4c6143f7460aed00f7",
};

export { apiResults, apiSessionResults };

const getTriviaSession = async (): Promise<string> => apiSessionResults.token;

const getTriviaQuestions = async (
  categories: CategoryFilter[],
  quantity: number,
  session: string
): Promise<TriviaQuestionApiResult[]> => {
  console.log("SOMEONEOIHOTIHKSJB")
  return apiResults.results;
};

export { getTriviaSession, getTriviaQuestions };
