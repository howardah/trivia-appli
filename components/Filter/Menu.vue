<template>
  <div class="filters max-w-screen-lg pb-0 md:pb-2 p-2 m-auto">
    <div :class="`mobile title ${menuClass}`" @click="showMenu = !showMenu">
      FILTERS <span class="arrow">^</span>
    </div>
    <div :class="`menu ${menuClass}`">
      <span class="desktop title">FILTERS:</span>
      <filter-button
        v-for="(category, index) in categories"
        :key="index"
        :color="category.color"
        :active="category.active"
        @click="toggle(index)"
        @contextmenu="
          (e) => {
            e.preventDefault();
            filterSelect(index);
          }
        "
      >
        {{ category.title.replace(/-/g, " ") }}
      </filter-button>
      <input v-model="searcher" class="border rounded-md px-2" placeholder="SEARCH" type="text">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { CategoryFilter } from '~/@types/components';

const search = ref('');
const showMenu = ref(false);

const props =
  defineProps<{ categories: CategoryFilter[]; toggle: Function; alterSearch: Function }>();

const menuClass = computed((): string => {
  return showMenu.value ? 'open' : 'closed';
});

const setSearch = (newSearch: string):void => {
  search.value = newSearch;
  props.alterSearch(newSearch);
};

const searcher = computed({
  get (): string {
    return search.value;
  },
  set (value: string) {
    setSearch(value);
  }
});
</script>

<style lang="sass" scoped>
$border: 2px solid #e4e7eb

.title
  &.mobile
    display: none

@media screen and (max-width: 640px)
  .menu
    padding: 1em 0
    overflow-y: hidden
    max-height: 400px

    transition-property: all
    transition-duration: .5s
    // transition-timing-function: cubic-bezier(0, 1, 0.5, 1)
    border-bottom: $border

    &.closed
      max-height: 0
      padding: 0

  .title
    &.desktop
      display: none

    &.mobile
      display: inherit
      position: relative
      border-top: $border
      padding: .5em 0
      color: #bcc6d2
      background: #e2e8f054

      .arrow
        position: absolute
        left: calc(50% + 2em)
        top: .7em

      &.open
        .arrow
          transform: rotate(180deg)
          top: .4em
</style>
