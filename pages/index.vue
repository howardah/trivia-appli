<template>
  <div
    class="font-sans m-auto items-center flex text-center justify-center min-h-screen pb-6"
  >
    <div class="w-full">
      <div
        class="sticky z-10 bg-white w-full md:border-b-2 -top-24 md:-top-28 lg:-top-44 right-0 md:pb-5"
      >
        <h1
          class="title font-press-start text-4xl p-10 pb-5 text-gray-700 sm:text-7xl sm:p-15 sm:pb-5 lg:text-8xl lg:p-20 lg:pb-5"
        >
          trivia!
        </h1>
        <TheMenu />
      </div>
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-max max-w-screen-xl m-auto mt-5"
      >
        <TriviaCard
          v-for="question in trivia.questionsDisplay"
          :key="question.id"
          :question="question"
        />
        <TriviaCardPlaceholder
          v-for="(empty, index) in trivia.loadingCards"
          :key="trivia.questionsDisplay.length + index"
        />
        <div class="col-span-full col-start-1">
          <button
            v-if="noLoadingCards"
            class="text-gray-800 inline-block border group px-4 py-1 capitalize m-2 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300"
            @click="loadMoreIfNeeded"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import clone from 'just-clone'
import type { CategoryFilter } from '~/@types/components'
import { TriviaQuestion } from '~/@types/trivia-question'
import { getTriviaQuestions, getTriviaSession } from '~/assets/calls'

import { useTriviaStore } from '~/store/trivia'

const trivia = useTriviaStore()

const route = useRoute()
const router = useRouter()
const toast = useToast()

let fetching: boolean = false
let currentSession: string | null

const noLoadingCards = computed(() => trivia.loadingCards.length === 0)

const fetchQuestions = async (quantity: number): Promise<TriviaQuestion[]> => {
  // Don't fetch more if already fetching
  if (fetching) return []
  fetching = true
  trivia.loading = true

  if (!currentSession) currentSession = await getTriviaSession()

  const newQuestions = await getTriviaQuestions(
    trivia.categories,
    quantity,
    currentSession
  )

  const previousFilteredQuestions = clone(trivia.questionsDisplay)
  const previousQuestionsCount = trivia.questions.length
  newQuestions.forEach((questionResult: any, index: number) => {
    trivia.questions.push(
      new TriviaQuestion(questionResult, previousQuestionsCount + index)
    )
  })

  trivia.loading = false

  // Do not make more than one call per half second
  setTimeout(() => {
    fetching = false
  }, 500)

  return trivia.questionsDisplay.filter(
    q => !previousFilteredQuestions.some(pq => q.id === pq.id)
  )
}

const loadMoreIfNeeded = async () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >
    document.documentElement.offsetHeight - 100
  if (bottomOfWindow) {
    // Here, it would be better to have an API endpoint
    // where I could ask for the trivia questions that match my filters
    // because, as is, if there are no more questions in the db
    // that match the filters/search, then the application will just
    // keep battering the API with requests and have no way
    // of knowing that it should stop asking.
    const requestCount = trivia.search === '' ? 25 : 200
    const newQuestions = await fetchQuestions(requestCount)

    // Change alert to toast
    setTimeout(() => {
      if (newQuestions.length >= 5) return
      toast.warning(
        `We didn't find ${
          newQuestions.length === 0 ? 'any' : 'many'
        } questions, you might consider ammending your search parameters`,
        {
          position: "top-left",
          queue: true,
          dismissible: true,
          duration: 5000,
          pauseOnHover: true,
        }
      )
    }, 100)
    // if(trivia.numOfQuestions > 400)
  }
}

const updateCategoriesQuery = () => {
  if (!router) return

  router.push({
    path: route.path,
    query: {
      ...route.query,
      categories: trivia.activeCategories
        .reduce((p: string, cat: CategoryFilter) => p + cat.title + ',', '')
        .slice(0, -1)
    }
  })
}

onMounted(() => {
  window.onscroll = () => {
    if (trivia.numOfQuestions < 400) loadMoreIfNeeded()
  }

  fetchQuestions(25)

  console.log('route', route)

  if (
    route?.query?.categories !== undefined &&
    typeof route?.query?.categories === 'string'
  ) {
    const filterList: string[] = route.query.categories.split(',')
    const categoriesDup: CategoryFilter[] = [...trivia.categories]
    categoriesDup.forEach(category => {
      if (!filterList.includes(category.title)) {
        category.active = false
      }
    })
    trivia.categories = categoriesDup
  } else {
    updateCategoriesQuery()
  }

  watch(trivia.activeCategories, updateCategoriesQuery)
})
</script>
