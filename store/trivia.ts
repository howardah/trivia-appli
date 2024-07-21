import { defineStore } from "pinia";
import type { CategoryFilter } from "~/@types/components";
import { categoryColors, TriviaQuestion } from "~/@types/trivia-question";

export const useTriviaStore = defineStore("trivia", () => {
  const search = ref("");
  const categories = ref([] as CategoryFilter[]);
  const questions = ref([] as TriviaQuestion[]);
  const loading = ref(true);

  for (const key in categoryColors) {
    categories.value.push({
      title: key,
      color: categoryColors[key as keyof typeof categoryColors],
      active: true,
    });
  }

  const activeCategories = computed(() => {
    return categories.value.filter(
      (category: CategoryFilter) => category.active
    );
  });

  const questionsActiveCategories = computed((): TriviaQuestion[] => {
    return questions.value.filter((q: TriviaQuestion) => {
      return activeCategories.value.some(
        (cat: CategoryFilter) => cat.title === q.categoryClass
      );
    });
  });

  const questionsSearched = computed((): TriviaQuestion[] => {
    const searcher = search.value.toLowerCase();
    const difficulty = { "***": "hard", "**": "medium", "*": "easy" };
    return questionsActiveCategories.value.filter((q: TriviaQuestion) => {
      const searchString = q.question + q.category + q.type + q.correct_answer;

      if (searchString.toLowerCase().includes(searcher)) return true;
      if (
        difficulty[searcher as keyof typeof difficulty] &&
        q.difficulty.includes(difficulty[searcher as keyof typeof difficulty])
      ) {
        return true;
      }

      return false;
    });
  });

  const questionsDisplay = computed((): TriviaQuestion[] => {
    return questionsSearched.value;
  });

  const loadingCards = computed(() => {
    return loading.value ? new Array(25) : [];
  });

  const numOfQuestions = computed(() => questions.value.length);
  const numOfVisibleQuestions = computed(() => questionsDisplay.value.length);

  const filterToggle = (index: number) => {
    const categoriesCopy: CategoryFilter[] = [...categories.value];
    categoriesCopy[index].active = !categoriesCopy[index].active;
    categories.value = categoriesCopy;
  };

  const filterSelect = (index: number) => {
    const categoriesCopy: CategoryFilter[] = [...categories.value];
    if (activeCategories.value.length === 1 && categoriesCopy[index].active) {
      categoriesCopy.forEach((category: CategoryFilter, catIndex: number) => {
        category.active = !(catIndex === index);
      });
    } else {
      categoriesCopy.forEach((category: CategoryFilter, catIndex: number) => {
        category.active = catIndex === index;
      });
    }
    categories.value = categoriesCopy;
  };

  return {
    search,
    categories,
    questions,
    loading,
    activeCategories,
    questionsActiveCategories,
    questionsSearched,
    questionsDisplay,
    loadingCards,
    numOfQuestions,
    numOfVisibleQuestions,
    filterToggle,
    filterSelect,
  };
});