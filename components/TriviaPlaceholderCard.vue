<template>
  <div class="flip-card m-5 cursor-pointer">
    <div
      class="border rounded-md text-left relative flip-card-inner aspect-w-16 aspect-h-9"
    >
      <div
        class="front rounded-md absolute w-full h-full bg-white-300 text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-base"
      >
        <div class="front rounded-md absolute w-full h-full bg-white">
          <div class="font-thin rounded-t-md px-5 py-3 bg-gray-200">
            <span class="text-white font-bold">&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <icon-star
              v-for="(key, index) in Array(3)"
              :key="index"
              hue="gray"
              tint="300"
            />
          </div>
          <div class="px-5 py-7">
            <div class="font-thin bg-gray-100">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="font-thin bg-gray-100 m-5">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="font-thin bg-gray-100">
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
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
