<template>
  <div
    :class="`flip-card m-5 cursor-pointer ${flipped ? 'flipped' : ''}`"
    @click="flipped = !flipped"
  >
    <div
      :class="
        `border rounded-md text-left relative flip-card-inner aspect-w-16 aspect-h-9 ${cClass}`
      "
    >
      <!-- front of card -->
      <div
        :class="
          `front rounded-md absolute w-full h-full bg-${cColor}-300 text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-base`
        "
      >
        <div :class="`font-thin rounded-t-md px-5 py-3 bg-${cColor}-500`">
          <span class="text-white font-bold" v-html="question.category" />
          <IconsStar
            v-for="(key, index) in starRating"
            :key="index"
            :hue="cColor"
          />
        </div>
        <div
          :class="`font-bold p-5 text-${cColor}-900`"
          v-html="question.formattedQuestion"
        />

        <div />
      </div>
      <!-- back of card -->
      <div
        :class="
          `back rounded-md p-5 absolute w-full h-full bg-${cColor}-500 text-white`
        "
      >
        <div
          :class="
            `text-white text-lg sm:text-xl md:text-2xl lg:text-base xl:text-sm text-${cColor}-100`
          "
          v-html="question.formattedQuestion"
        />
        <div
          class="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-2xl xl:text-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          v-html="question.correct_answer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TriviaQuestion } from '~/@types/trivia-question';

export default Vue.extend({
  props: {
    question: {
      required: true,
      type: Object as () => TriviaQuestion
    }
  },
  
  data () {
    return {
      displaySide: 'front',
      flipped: false
    };
  },

  computed: {
    starRating () {
      const difficulties: string[] = ['easy', 'medium', 'hard'];
      const difficulty: string = this.question.difficulty;
      return new Array(difficulties.indexOf(difficulty) + 1);
    },

    cClass () {
      const cClass: string = this.question.categoryClass;
      return cClass;
    },

    cColor () {
      const cColor: string = this.question.categoryColor;
      return cColor;
    }
    // Because the API is intended for multiple choice
    // formatted questions, some questions don't make sense
    // on their own. And though I prefer the questions without
    // choices, there are some cases where they would be needed.
    //
    // So, here could go another computed method with some
    // logic to look in the question for phrases like
    // "which of the following", or "which of these" and
    // selectively choose these questions to display
    // the multiple choices.
  }
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
