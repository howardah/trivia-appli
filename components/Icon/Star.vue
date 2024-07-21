<template>
  <svg
    class="h-3 mt-1 float-right inline-block"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 864 864"
    style="enable-background: new 0 0 864 864"
    xml:space="preserve"
  >
    <polygon
      :class="`fill-current ${textColor}`"
      points="431.5,21 565.2,291.8 864,335.2 647.8,546 698.8,843.6 431.5,703.1 164.2,843.6 215.3,546 -1,335.2
        297.9,291.8 "
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import colors from 'tailwindcss/colors';

const props = defineProps({
  hue: {
    type: String,
    default: 'gray',
    validator: (value: string) => {
      return [...Object.keys(colors), 'lightGray', 'brown'].includes(value);
    }
  },
  tint: {
    type: Number,
    default: 700,
    validator: (value: number) => {
      return /[1-9]0{0,1}/.test(value.toString());
    }
  }
});

const textColor = computed((): string => {
  return `text-${props.hue.toString()}-${props.tint.toString()}`;
});
</script>
