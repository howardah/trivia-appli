import { GetterTree, ActionTree, MutationTree } from "vuex";
import { initialiseTriviaQuestion, TriviaQuestion } from "~/assets/trivia_question";

export const state = () => ({
  questions: [] as TriviaQuestion[],
  loading: false
});

export type TriviaState = ReturnType<typeof state>;

export const getters: GetterTree<TriviaState, TriviaState> = {
  questionCount: state => state.questions.length
};

export const mutations: MutationTree<TriviaState> = {
  ADD_QUESTIONS: (state, newQuestions: TriviaQuestion[]) => {
    newQuestions.forEach(newQuestion => {
      if (
        !state.questions.some(
          (q: TriviaQuestion) => q.question === newQuestion.question
        )
      ) {
        newQuestion.id = state.questions.length + 1;
        state.questions.push(newQuestion);
      }
    });
  },
  CHANGE_LOAD_STATE: (state, loadState: boolean) => (state.loading = loadState)
};

export const actions: ActionTree<TriviaState, TriviaState> = {
  async fetchQuestions({ commit }, quantity = 25) {
    commit("CHANGE_LOAD_STATE", true);

    const trivia_api: string = `https://opentdb.com/api.php`;
    const questions: TriviaQuestion[] = [];
    const triviaResults = await this.$axios
      .$get(`${trivia_api}?amount=${quantity}`)
      .catch(e => {
        //ToDo: add error handling
      });

    triviaResults.results.forEach((questionResult: any, index: number) => {
      const question: TriviaQuestion = initialiseTriviaQuestion({
        ...questionResult,
        id: null
      });
      questions.push(question);
    });

    commit("ADD_QUESTIONS", questions);
    commit("CHANGE_LOAD_STATE", false);
  }
};
