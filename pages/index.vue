<template>
  <div class="font-sans m-auto items-center flex text-center justify-center min-h-screen">
    <div class="w-full">
      <div
        class="sticky z-10 bg-white w-full md:border-b-2 -top-24 md:-top-28 lg:-top-44 right-0 md:pb-5"
      >
        <h1
          class="title font-press-start text-4xl p-10 pb-5 text-gray-700 sm:text-7xl sm:p-15 sm:pb-5 lg:text-8xl lg:p-20 lg:pb-5"
        >
          trivia!
        </h1>
        <FilterMenu
          :toggle="filterToggle"
          :alter-search="
            (newSearch) => {
              search = newSearch;
            }
          "
          :categories="categories"
        />
      </div>
      <div
        class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max max-w-screen-xl m-auto mt-5"
      >
        <TriviaCard v-for="question in questionsDisplay" :key="question.id" :question="question" />
        <TriviaCardPlaceholder v-for="(empty, index) in loadingCards" :key="questionsDisplay.length + index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
// import { useRoute, useRouter } from "@nuxtjs/composition-api";
import axios from 'axios';
import { CategoryFilter } from '~/@types/components';
import { colorLookup, initialiseTriviaQuestion, TriviaQuestion } from '~/@types/trivia-question';

const search = ref('');
const categories = ref([] as CategoryFilter[]);
const questions = ref([] as TriviaQuestion[]);
const loading = ref(true);

const route = useRoute();
const router = useRouter();

let fetching:boolean = false;
const fetchQuestions = async (quantity: number):Promise<void> => {
  if (fetching) return;
  fetching = true;
  loading.value = true;
  const triviaApi: string = 'https://opentdb.com/api.php';
  const triviaResults = await axios
    .get(`${triviaApi}?amount=${quantity}`)
    .catch((_e) => {
      // ToDo: add error handling
    });

  if (triviaResults && triviaResults?.data?.results) {
    triviaResults.data.results.forEach((questionResult: any, _index: number) => {
      const question: TriviaQuestion = initialiseTriviaQuestion({
        ...questionResult,
        id: null
      });
      questions.value.push(question);
    });
  }

  loading.value = false;

  // Do not make more than one call per half second
  setTimeout(() => {
    fetching = false;
  }, 500);
};

for (const key in colorLookup) {
  categories.value.push({
    title: key,
    color: colorLookup[key],
    active: true
  });
}

const activeCategories = computed(() => {
  return categories.value.filter((category: CategoryFilter) => category.active);
});

const questionsDisplay = computed(() => {
  let filteredQuestions: TriviaQuestion[] = questions.value.filter((q: TriviaQuestion) => {
    return activeCategories.value.some((cat: CategoryFilter) => cat.title === q.categoryClass);
  });

  if (search.value !== '') {
    const searchPhrase = search.value.toLowerCase();
    const furtherFilteredQuestions: TriviaQuestion[] = filteredQuestions.filter(
      (q: TriviaQuestion) => {
        if (q.question.toLowerCase().includes(searchPhrase)) return true;
        if (q.category.toLowerCase().includes(searchPhrase)) return true;
        if (q.difficulty.toLowerCase().includes(searchPhrase)) return true;
        if (q.type.toLowerCase().includes(searchPhrase)) return true;
        if (q.correct_answer.toLowerCase().includes(searchPhrase)) return true;
        return false;
      }
    );
    filteredQuestions = furtherFilteredQuestions;
  }
  if (filteredQuestions.length < 4) {
    fetchQuestions(200);
  }
  return filteredQuestions;
});

const loadingCards = computed(() => {
  return loading.value ? new Array(25) : [];
});

const loadMoreIfNeeded = () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >
    document.documentElement.offsetHeight - 100;
  if (bottomOfWindow) {
    // Here, it would be better to have an API endpoint
    // where I could ask for the trivia questions that match my filters
    // because, as is, if there are no more questions in the db
    // that match the filters/search, then the application will just
    // keep battering the API with requests and have no way
    // of knowing that it should stop asking.
    const requestCount = search.value === '' ? 25 : 200;
    fetchQuestions(requestCount);
  }
};

const filterToggle = (index: number) => {
  const categoriesDup: CategoryFilter[] = [...categories.value];
  categoriesDup[index].active = !categoriesDup[index].active;
  categories.value = categoriesDup;
  updateCategoriesQuery();
};

// const filterSelect = (index: number) => {
//   const categoriesDup: CategoryFilter[] = [...categories.value];
//   if (activeCategories.value.length === 1 && categories[index].active) {
//     categoriesDup.forEach((category: CategoryFilter, catIndex: number) => {
//       category.active = !(catIndex === index);
//     });
//   } else {
//     categoriesDup.forEach((category: CategoryFilter, catIndex: number) => {
//       category.active = catIndex === index;
//     });
//   }

//   categories.value = categoriesDup;
//   updateCategoriesQuery();
// };

const updateCategoriesQuery = () => {
  const activeCategories: CategoryFilter[] = categories.value.filter(
    (category: CategoryFilter) => category.active
  );

  router.push({
    path: route.path,
    query: {
      ...route.query,
      categories: activeCategories
        .reduce((p: string, cat: CategoryFilter) => p + cat.title + ',', '')
        .slice(0, -1)
    }
  });
};

onMounted(() => {
  window.onscroll = () => {
    loadMoreIfNeeded();
  };

  fetchQuestions(25);

  if (route.query.categories !== undefined && typeof route.query.categories === 'string') {
    const filterList: string[] = route.query.categories.split(',');
    const categoriesDup: CategoryFilter[] = [...categories.value];
    categoriesDup.forEach((category) => {
      if (!filterList.includes(category.title)) {
        category.active = false;
      }
    });
    categories.value = categoriesDup;
  } else {
    updateCategoriesQuery();
  }
});
</script>

<style scoped></style>
