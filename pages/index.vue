<template>
  <div
    class="font-sans m-auto items-center flex text-center justify-center min-h-screen"
  >
    <div class="w-full">
      <div
        class="md:sticky md:z-10 md:bg-white w-full md:border-b-2 md:-top-28 lg:-top-44 right-0 pb-5"
      >
        <h1
          class="title font-press-start text-6xl p-10 pb-5 text-gray-700 sm:text-7xl sm:p-15 sm:pb-5 lg:text-8xl lg:p-20 lg:pb-5"
        >
          trivia!
        </h1>
        <div class="max-w-screen-lg p-2 m-auto">
          FILTERS:
          <filter-button
            v-for="(category, index) in categories"
            :key="index"
            :color="category.color"
            :active="category.active"
            @click.native="filterToggle(index)"
            @contextmenu.native="
              e => {
                e.preventDefault();
                filterSelect(index);
              }
            "
          >
            {{ category.title.replaceAll("-", " ") }}
          </filter-button>
          <input
            v-model="search"
            class="border rounded-md px-2"
            placeholder="SEARCH"
            type="text"
          >
          <CloseButton
            v-if="search !== ''"
            class="cursor-pointer"
            color="gray"
            @click.native="clearSearch"
          />
        </div>
      </div>
      <div
        class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max max-w-screen-xl m-auto mt-5"
      >
        <TriviaCard
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />
        <!-- placeholder cards index +20000 to avoid duplicate ids -->
        <TriviaCardPlaceholder
          v-for="(empty, index) in loadingCards"
          :key="index + 20000"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { colorLookup, TriviaQuestion } from '~/assets/trivia_question';

type CategoryFilter = {
  title: string;
  color: string;
  active: boolean;
};

const categories: CategoryFilter[] = [];
for (const key in colorLookup) {
  categories.push({
    title: key,
    color: colorLookup[key],
    active: true
  });
}

export default Vue.extend({
  async asyncData ({ store }) {
    await store.dispatch('trivia/fetchQuestions');
  },
  data () {
    return { search: '', categories: categories as CategoryFilter[] };
  },
  computed: {
    activeCategories () {
      const activeCategories: CategoryFilter[] = this.categories.filter(
        (category: CategoryFilter) => category.active
      );

      return activeCategories;
    },
    questions () {
      let filteredQuestions: TriviaQuestion[] = this.$store.state.trivia.questions.filter(
        (q: TriviaQuestion) => {
          return this.activeCategories.some(
            (cat: CategoryFilter) => cat.title === q.categoryClass
          );
        }
      );

      if (this.search !== '') {
        const searchPhrase = this.search.toLowerCase();
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
        this.$store.dispatch('trivia/fetchQuestions', 200);
      }
      return filteredQuestions;
    },
    loadingCards () {
      return this.$store.state.trivia.loading ? new Array(25) : [];
    }
  },
  mounted () {
    this.loadMoreOnScroll();

    if (
      this.$route.query.categories !== undefined &&
      typeof this.$route.query.categories === 'string'
    ) {
      const filterList: string[] = this.$route.query.categories.split(',');
      const categories: CategoryFilter[] = [...this.categories];
      categories.forEach((category) => {
        if (!filterList.includes(category.title)) {
          category.active = false;
        }
      });
      this.categories = categories;
    } else {
      this.updateCategoriesQuery();
    }
  },
  methods: {
    loadMoreOnScroll () {
      window.onscroll = () => {
        this.loadMoreIfNeeded();
      };
    },
    loadMoreIfNeeded () {
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
        const requestCount = this.search === '' ? 25 : 200;
        this.$store.dispatch('trivia/fetchQuestions', requestCount);
      }
    },
    filterToggle (index: number) {
      const categories: CategoryFilter[] = [...this.categories];
      categories[index].active = !categories[index].active;
      this.categories = categories;
      this.updateCategoriesQuery();
    },
    filterSelect (index: number) {
      const categories: CategoryFilter[] = [...this.categories];
      if (this.activeCategories.length === 1 && categories[index].active) {
        categories.forEach((category: CategoryFilter, catIndex: number) => {
          category.active = !(catIndex === index);
        });
      } else {
        categories.forEach((category: CategoryFilter, catIndex: number) => {
          category.active = catIndex === index;
        });
      }

      this.categories = categories;
      this.updateCategoriesQuery();
    },
    updateCategoriesQuery () {
      const activeCategories: CategoryFilter[] = this.categories.filter(
        (category: CategoryFilter) => category.active
      );

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          categories: activeCategories
            .reduce((p: string, cat: CategoryFilter) => p + cat.title + ',', '')
            .slice(0, -1)
        }
      });
    },
    clearSearch () {
      this.search = '';
    }
  }
});
</script>
