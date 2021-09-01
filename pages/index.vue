<template>
  <div class="container">
    <div class="w-full">
      <div
        class="md:sticky md:z-10 md:bg-white w-full md:border-b-2 top-0 right-0 pb-5"
      >
        <h1 class="title">
          Trivia!
        </h1>
        <div class="max-w-screen-lg p-2 m-auto">
          FILTERS:
          <filter-button
            v-for="(category, index) in categories"
            :color="category.color"
            :active="category.active"
            :key="index"
            @click.native="filterToggle(index)"
            @contextmenu.native="
              e => {
                e.preventDefault();
                filterSelect(index);
              }
            "
            >{{ category.title.replaceAll("-", " ") }}</filter-button
          >
          <input
            class="border rounded-md px-2"
            placeholder="SEARCH"
            type="text"
            v-model="search"
          />
          <close-button
            class="cursor-pointer"
            v-if="search !== ''"
            color="gray"
            @click.native="clearSearch"
          ></close-button>
        </div>
      </div>
      <div
        class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max max-w-screen-xl m-auto mt-5"
      >
        <trivia-card
          v-for="question in questions"
          :key="question.id"
          :question="question"
        >
        </trivia-card>
        <trivia-placeholder-card
          v-for="(empty, index) in loadingCards"
          :key="index + 20000"
        ></trivia-placeholder-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { colorLookup, TriviaQuestion } from "~/assets/trivia_question";

type CategoryFilter = {
  title: string;
  color: string;
  active: boolean;
};

const categories: CategoryFilter[] = [];
for (let key in colorLookup) {
  categories.push({
    title: key,
    color: colorLookup[key],
    active: true
  });
}

export default Vue.extend({
  async asyncData({ store }) {
    await store.dispatch("trivia/fetchQuestions");
    // store.commit("trivia/ADD_QUESTIONS", store.state.trivia.questions);
  },
  data() {
    return { search: "", categories: categories as CategoryFilter[] };
  },
  computed: {
    activeCategories() {
      const activeCategories: CategoryFilter[] = this.categories.filter(
        (category: CategoryFilter) => category.active
      );

      return activeCategories;
    },
    questions() {
      if (this.search === "")
        return this.$store.state.trivia.questions.filter(
          (q: TriviaQuestion) => {
            return this.activeCategories.some(
              (cat: CategoryFilter) => cat.title === q.categoryClass
            );
          }
        );

      const searchPhrase = this.search.toLowerCase();
      const questions: TriviaQuestion[] = this.$store.state.trivia.questions.filter(
        (q: TriviaQuestion, index: number) => {
          if (
            !this.activeCategories.some(
              (cat: CategoryFilter) => cat.title === q.categoryClass
            )
          )
            return false;

          if (q.question.toLowerCase().includes(searchPhrase)) return true;
          if (q.category.toLowerCase().includes(searchPhrase)) return true;
          if (q.difficulty.toLowerCase().includes(searchPhrase)) return true;
          if (q.type.toLowerCase().includes(searchPhrase)) return true;
          if (q.correct_answer.toLowerCase().includes(searchPhrase))
            return true;
          for (let i = 0; i < q.incorrect_answers.length; i++) {
            if (q.incorrect_answers[i].toLowerCase().includes(searchPhrase))
              return true;
          }

          return false;
        }
      );
      if (questions.length < 4)
        this.$store.dispatch("trivia/fetchQuestions", 200);
      return questions;
    },
    loadingCards() {
      return this.$store.state.trivia.loading ? new Array(25) : [];
    }
  },
  methods: {
    loadMoreOnScroll() {
      window.onscroll = () => {
        this.loadMoreIfNeeded();
      };
    },
    loadMoreIfNeeded() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        const requestCount = this.search === "" ? 25 : 200;
        this.$store.dispatch("trivia/fetchQuestions", requestCount);
        console.log(this.$store.getters["trivia/questionCount"]);
      }
    },
    filterToggle(index: number) {
      const categories: CategoryFilter[] = [...this.categories];
      categories[index].active = !categories[index].active;
      this.categories = categories;
      this.updateCategoriesQuery();
    },
    filterSelect(index: number) {
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
      // categories[index].active = !categories[index].active;
      this.categories = categories;
      this.updateCategoriesQuery();
    },
    updateCategoriesQuery() {
      const activeCategories: CategoryFilter[] = this.categories.filter(
        (category: CategoryFilter) => category.active
      );

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          categories: activeCategories
            .reduce((p: string, cat: CategoryFilter) => p + cat.title + ",", "")
            .slice(0, -1)
        }
      });
    },
    clearSearch() {
      this.search = "";
    }
  },
  mounted() {
    this.loadMoreOnScroll();

    if (
      this.$route.query.categories !== undefined &&
      typeof this.$route.query.categories === "string"
    ) {
      const filterList: string[] = this.$route.query.categories.split(",");
      const categories: CategoryFilter[] = [...this.categories];
      categories.forEach(category => {
        if (!filterList.includes(category.title)) category.active = false;
      });
      this.categories = categories;
    } else {
      this.updateCategoriesQuery();
    }
  }
});
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
