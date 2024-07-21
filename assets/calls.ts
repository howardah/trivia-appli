import axios from "axios";
import { CategoryFilter } from "~/@types/components";
import { TriviaQuestionApiResult } from "~/@types/trivia-question";
import { categoryIds } from "./dictionaries";
import { shuffleArray } from "./tools";

const triviaApi: string = "https://opentdb.com/api.php";
const triviaApiSession: string =
  "https://opentdb.com/api_token.php?command=request";

const getTriviaSession = async (): Promise<string> =>
  (await axios.get(triviaApiSession))?.data?.token;

const triviaRequest = async (
  session: string,
  quantity: number,
  category?: number
) => {
  // Build query
  let queryString = `token=${session}`;
  if (category) queryString += `&category=${category}`;
  queryString += `&amount=${quantity}`;
  const result = await axios.get(`${triviaApi}?${queryString}`).catch((_e) => {
    // ToDo: add error handling`
  });
  const resultArray = [];
  if (result && result?.data?.results)
    resultArray.push(...result?.data?.results);
  return resultArray;
};

const getTriviaQuestions = async (
  categories: CategoryFilter[],
  quantity: number,
  session: string
): Promise<TriviaQuestionApiResult[]> => {
    const now = new Date();
  const newQuestions: TriviaQuestionApiResult[] = [];
  const promises: Promise<TriviaQuestionApiResult[]>[] = [];
  if (categories.some((category) => !category.active)) {
    const activeCategories = categories.filter((category) => category.active);
    const categoryCount = activeCategories.reduce(
      (t, c) => t + categoryIds[c.title].length,
      0
    );
    const categoryQuantity = Math.max(Math.ceil(quantity / categoryCount), 10);
    for (let i = 0; i < activeCategories.length; i++) {
      const category = activeCategories[i];
      const ids = categoryIds[category.title];
      for (let ii = 0; ii < ids.length; ii++) {
        const id = ids[ii];
        promises.push(triviaRequest(session, categoryQuantity, id));
        // newQuestions.push(... await triviaRequest(session, categoryQuantity, id));
      }
    }
  } else promises.push(triviaRequest(session, quantity));
//   } else newQuestions.push(... await triviaRequest(session, quantity));

  const data = await Promise.all(promises);
  data.forEach((results) => {
    newQuestions.push(...results);
  });

  shuffleArray(newQuestions);

  const newNow = new Date();
  console.log(newNow.getTime() - now.getTime());

  return newQuestions;
};

export { getTriviaSession, getTriviaQuestions };
