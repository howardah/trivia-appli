<template>
  <svg
    class="h-3 mt-1 float-right inline-block"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 864 864"
    style="enable-background:new 0 0 864 864;"
    xml:space="preserve"
  >
    <polygon
      :class="`fill-current text-${hue.toString()}-${tint.toString()}`"
      points="431.5,21 565.2,291.8 864,335.2 647.8,546 698.8,843.6 431.5,703.1 164.2,843.6 215.3,546 -1,335.2
        297.9,291.8 "
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    hue: {
      type: String,
      default: 'gray'
    },
    tint: {
      type: String,
      default: '700'
    }
  }
});
</script>
