<template>
  <div
    :class="
      `text-${textColor} 
      inline-block border group
      px-4 py-1 capitalize m-2 
      cursor-pointer rounded-full bg-${bgColor}-500 
      hover:bg-${bgColor}-600`
    "
  >
    <slot></slot>
    <icon-ex v-if="active" :hue="color"></icon-ex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconEx from "./IconEx.vue";

export default Vue.extend({
  components: { IconEx },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      default: "grey"
    }
  },
  computed: {
    bgColor() {
      if (!this.active) return "white";
      const color: string = this.color;
      return color;
    },
    textColor() {
      if (this.active) return "white";
      return "grey-800";
    }
  }
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
