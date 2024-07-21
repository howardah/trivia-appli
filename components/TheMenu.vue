<template>
  <div class="filters max-w-screen-lg pb-0 md:pb-2 p-2 m-auto">
    <div
      :class="`mobile title cursor-pointer ${menuClass}`"
      @click="toggleMobileMenu"
    >
      FILTERS
      <span class="arrow">
        <ChevronUpIcon v-if="showMenu" class="h-5 w-5 text-gray-300" />
        <ChevronDownIcon v-else class="h-5 w-5 text-gray-300" />
      </span>
    </div>
    <div :class="`menu ${menuClass}`">
      <span class="desktop title">FILTERS:</span>
      <FilterButton
        v-for="(category, index) in trivia.categories"
        :key="index"
        :color="category.color"
        :active="category.active"
        @click="() => trivia.filterToggle(index)"
        @contextmenu="
          (e) => {
            e.preventDefault()
            trivia.filterSelect(index)
          }
        "
      >
        {{ category.title.replace(/-/g, ' ') }}
      </FilterButton>
      <input
        v-model="trivia.search"
        class="border rounded-md px-2"
        placeholder="SEARCH"
        type="text"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'
import { useTriviaStore } from '~/store/trivia'

const showMenu = ref(false)
const trivia = useTriviaStore()

const menuClass = computed((): string => {
  return showMenu.value ? 'open' : 'closed'
})

const toggleMobileMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<style lang="scss" scoped>
$border: 2px solid #e4e7eb;

.title {
  &.mobile {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .menu {
    padding: 1em 0;
    overflow-y: hidden;
    max-height: 400px;

    transition-property: all;
    transition-duration: 0.5s;
    border-bottom: $border;

    &.closed {
      max-height: 0;
      padding: 0;
    }
  }
  .title {
    &.desktop {
      display: none;
    }

    &.mobile {
      display: inherit;
      position: relative;
      border-top: $border;
      padding: 0.5em 0;
      color: #bcc6d2;
      background: #e2e8f054;

      .arrow {
        position: absolute;
        padding: 0 0.1em;
        transform: translateY(0.1em);
      }
    }
  }
}
</style>
