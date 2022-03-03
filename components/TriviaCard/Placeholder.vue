<template>
  <TriviaCard :question="question" />
</template>

<script lang="ts">
import Vue from 'vue';
import { TriviaQuestion } from '~/assets/trivia_question';

const placeholderQuestion: TriviaQuestion = {
  id: 0,
  category: '&nbsp;',
  categoryClass: 'placeholder',
  categoryColor: 'lightGray',
  type: '',
  difficulty: 'hard',
  question: "<div class='font-thin bg-gray-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='font-thin bg-gray-100 m-5'>&nbsp;&nbsp;&nbsp;</div><div class='font-thin bg-gray-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>",
  formattedQuestion: "<div class='font-thin bg-gray-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='font-thin bg-gray-100 m-5'>&nbsp;&nbsp;&nbsp;</div><div class='font-thin bg-gray-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>",
  correct_answer: '&nbsp;&nbsp;',
  incorrect_answers: ['&nbsp;', '&nbsp;', '&nbsp;']
};

export default Vue.extend({
  data () {
    return {
      question: placeholderQuestion
    };
  }
});
</script>

<style scoped>

</style>
