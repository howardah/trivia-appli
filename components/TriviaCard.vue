<template>
  <div
    :class="`flip-card m-5 cursor-pointer ${flipped ? 'flipped' : ''}`"
    @click="() => (flipped = !flipped)"
  >
    <div
      :class="`border
      rounded-md
      text-left
      relative
      flip-card-inner
      aspect-w-16
      aspect-h-10
      sm:aspect-h-9
      md:aspect-h-10
      lg:aspect-h-9
      ${question.categoryClass}`"
    >
      <!-- front of card -->
      <div
        :class="`front
        rounded-md
        absolute
        w-full
        h-full
        bg-${question.categoryColor}-300
        text-xl
        sm:text-2xl
        md:text-lg
        lg:text-lg
        xl:text-base`"
      >
        <div
          :class="`font-thin rounded-t-md px-5 py-3 bg-${question.categoryColor}-500 grid grid-cols-[1fr_auto]`"
          ref="cardHeader"
        >
          <span class="text-white font-bold">{{ htmlCategory }}</span>
          <span>
            <IconStar
              v-for="(key, index) in question.starRating"
              :key="index"
              :hue="question.categoryColor"
            />
          </span>
        </div>

        <div class="flex flex-col" style="height: calc(100% - cardHeaderHeight);">
          <div
            :class="`font-bold px-5 pt-5 text-${question.categoryColor}-900 ${
              question.mustShowChoices ? 'text-sm' : ''
            }`"
          >
            <slot />
            {{ htmlQuestion }}
          </div>

          <div class="flex-grow flex items-center justify-center">
            <div
              v-if="question.mustShowChoices"
              :class="`grid grid-cols-2 rounded px-5 w-full items-center justify-center`"
            >
              <div
                v-for="(choice, index) in shuffledChoices"
                :key="choice"
                :class="`text-${question.categoryColor}-900 flex items-center justify-left md:text-lg`"
              >
                <span>{{ ['a', 'b', 'c', 'd'][index] }}.&nbsp;</span>
                {{ choice }}
              </div>
            </div>
          </div>
        </div>


        <div />
      </div>
      <!-- back of card -->
      <div
        :class="`back rounded-md p-5 absolute w-full h-full bg-${question.categoryColor}-500 text-white flex flex-col`"
      >
        <div
          :class="`text-white text-lg sm:text-xl md:text-xl lg:text-base xl:text-sm text-${question.categoryColor}-100`"
        >
          {{ htmlQuestion }}
        </div>
        <div
          class="text-white font-bold text-4xl sm:text-5xl md:text-3xl lg:text-2xl xl:text-2xl text-center flex flex-grow items-center justify-center"
        >
          {{ htmlAnswer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import { decode } from 'html-entities'
import { TriviaQuestion } from '~/@types/trivia-question'

const cardHeader = ref<HTMLDivElement | null>(null)

const props = defineProps({
  question: {
    type: Object as PropType<TriviaQuestion>,
    required: true
  }
})

const flipped = ref(false)

const htmlCategory = computed(() => {
  return decode(props.question.category)
})

const htmlQuestion = computed(() => {
  return decode(props.question.formattedQuestion)
})

const htmlAnswer = computed(() => {
  return decode(props.question.correct_answer)
})

const shuffledChoices = computed(() => {
  const choices = [
    ...props.question.incorrect_answers,
    props.question.correct_answer
  ]
  return choices.sort(() => Math.random() - 0.5)
})

const cardHeaderHeight = computed(() => {
  return cardHeader.value?.clientHeight || 0
})
</script>

<style lang="scss" scoped>
.flip-card {
  perspective: 1200px;

  .flip-card-inner {
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  &.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .back {
    transform: rotateY(180deg);
  }
}
</style>
