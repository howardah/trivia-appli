<template>
  <div
    :class="`text-${textColor}
      inline-block border grou
      px-4 py-1 capitalize m-2
      cursor-pointer rounded-full bg-${bgColor}-500
      hover:bg-${bgColor}-600`"
  >
    <slot />
    <IconClose v-if="active" :hue="color" />
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue';

const props = withDefaults(defineProps<{ active: boolean; color?: string }>(), {
  color: 'grey'
});

const bgColor = computed(() => {
  if (!props.active) return 'white';
  const color: string = props.color;
  return color;
});
const textColor = computed(() => {
  if (props.active) return 'white';
  return 'grey-800';
});

</script>

<style scoped>
.close {
  /* position: absolute; */
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
