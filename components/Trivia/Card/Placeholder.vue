<template>
  <TriviaCard :question="question">
    <div class="font-thin bg-gray-100">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="font-thin bg-gray-100 m-5">&nbsp;&nbsp;&nbsp;</div>
    <div class="font-thin bg-gray-100">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
  </TriviaCard>
</template>

<script lang="ts" setup>
import { TriviaQuestion } from "~/@types/trivia-question";

const question: TriviaQuestion = {
  id: 0,
  category: "&nbsp;",
  categoryClass: "placeholder",
  categoryColor: "lightGray",
  type: "",
  difficulty: "hard",
  question: "",
  formattedQuestion: "",
  correct_answer: "&nbsp;&nbsp;",
  incorrect_answers: ["&nbsp;", "&nbsp;", "&nbsp;"],
};
</script>

<style scoped></style>
