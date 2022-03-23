<template>
  <div
    :class="`flip-card m-5 cursor-pointer ${flipped ? 'flipped' : ''}`"
    @click="flipped = !flipped"
  >
    <div
      :class="`border
      rounded-md
      text-left
      relative
      flip-card-inner
      aspect-w-16
      aspect-h-12
      md:aspect-h-9
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
        md:text-3xl
        lg:text-lg
        xl:text-base`"
      >
        <div
          :class="`font-thin rounded-t-md px-5 py-3 bg-${question.categoryColor}-500`"
        >
          <span class="text-white font-bold">{{ htmlCategory }}</span>
          <IconStar
            v-for="(key, index) in starRating"
            :key="index"
            :hue="question.categoryColor"
          />
        </div>
        <div :class="`font-bold p-5 text-${question.categoryColor}-900`">
          <slot></slot>
          {{ htmlQuestion }}
        </div>

        <div />
      </div>
      <!-- back of card -->
      <div
        :class="`back rounded-md p-5 absolute w-full h-full bg-${question.categoryColor}-500 text-white`"
      >
        <div
          :class="`text-white text-lg sm:text-xl md:text-2xl lg:text-base xl:text-sm text-${question.categoryColor}-100`"
        >
          {{ htmlQuestion }}
        </div>
        <div
          class="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-2xl xl:text-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {{ htmlAnswer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { decode } from 'html-entities';
import { TriviaQuestion } from '~/@types/trivia-question';

const props = defineProps<{ question: TriviaQuestion }>();

const flipped = ref(false);

const starRating = computed(() => {
  const difficulties: string[] = ['easy', 'medium', 'hard'];
  const difficulty: string = props.question.difficulty;
  return new Array(difficulties.indexOf(difficulty) + 1);
});

const htmlCategory = computed(() => {
  return decode(props.question.category);
});

const htmlQuestion = computed(() => {
  return decode(props.question.formattedQuestion);
});

const htmlAnswer = computed(() => {
  return decode(props.question.correct_answer);
});
</script>

<style scoped>
.flip-card {
  perspective: 1200px;
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
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
</style>
