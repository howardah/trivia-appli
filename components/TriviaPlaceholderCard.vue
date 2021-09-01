<template>
  <div :class="`flip-card m-5`">
    <div :class="`border rounded-md text-left relative flip-card-inner aspect-w-16 aspect-h-9`">
      <div :class="`front rounded-md p-5 absolute w-full h-full bg-white`">
        <div :class="`font-thin bg-gray-100`">
&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div :class="`font-thin bg-gray-100 m-5`">
&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div :class="`font-thin bg-gray-100`">
&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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

.front, .back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

</style>
