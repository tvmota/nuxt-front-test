<script setup lang="ts">
import { computed } from 'vue';
import NChevronLeft from '@/components/common/icons/NChevronLeft.vue';
import NChevronRight from '@/components/common/icons/NChevronRight.vue';
import NDoubleChevronLeft from '@/components/common/icons/NDoubleChevronLeft.vue';
import NDoubleChevronRight from '@/components/common/icons/NDoubleChevronRight.vue';

const emit = defineEmits(['pagechanged']);

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages + 1 - props.maxVisibleButtons;
  }

  return props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];

  for (
    let i = startPage.value + 0;
    i <=
    Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    if (i > 0 && i <= props.totalPages) {
      range.push({
        name: i,
        isDisabled: i === props.currentPage,
      });
    }
  }

  return range;
});

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const isPageActive = (page: number) => {
  return props.currentPage === page;
};

const onClickFirstPage = () => {
  emit('pagechanged', 1);
};

const onClickPreviousPage = () => {
  emit('pagechanged', props.currentPage - 1);
};

const onClickPage = (page: number) => {
  emit('pagechanged', page);
};

const onClickNextPage = () => {
  emit('pagechanged', props.currentPage + 1);
};

const onClickLastPage = () => {
  emit('pagechanged', props.totalPages);
};
</script>

<template>
  <ul class="pagination">
    <li class="pagination__back">
      <button
        class="pagination__navigation-btn__first"
        type="button"
        :disabled="isInFirstPage"
        @click="onClickFirstPage"
      >
        <NDoubleChevronLeft w="2rem" h="2rem" />
      </button>

      <button
        class="pagination__navigation-btn"
        type="button"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        <NChevronLeft w="2rem" h="2rem" />
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li class="pagination__pages">
      <button
        v-for="page in pages"
        :key="page.name"
        type="button"
        class="pagination__page-btn"
        :class="{ 'pagination__page-btn--active': isPageActive(page.name) }"
        :disabled="page.isDisabled"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination__foward">
      <button
        class="pagination__navigation-btn"
        type="button"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        <NChevronRight w="2rem" h="2rem" />
      </button>

      <button
        class="pagination__navigation-btn__last"
        type="button"
        :disabled="isInLastPage"
        @click="onClickLastPage"
      >
        <NDoubleChevronRight w="2rem" h="2rem" />
      </button>
    </li>
  </ul>
</template>

<style>
.pagination {
  @apply flex items-center sm:gap-8 gap-2 justify-between max-w-80;

  &__back,
  &__foward {
    @apply flex gap-2;
  }

  &__navigation-btn,
  &__page-btn,
  &__navigation-btn__last,
  &__navigation-btn__first {
    @apply flex items-center rounded-md cursor-pointer;
    width: 32px;
    background-color: var(--color-primary);
    color: #ffffff;

    &:disabled {
      @apply cursor-not-allowed;
    }

    &:hover {
      background-color: var(--color-primary--dark);
    }

    &:focus {
      border: 1px solid var(--color-tertiary);
    }
  }

  &__page-btn {
    @apply flex items-center justify-center;
    background-color: var(--color-tertiary);
    height: 32px;

    &--active {
      background-color: var(--color-primary);
      color: #ffffff;
    }
  }

  &__pages {
    @apply flex items-center gap-2;
  }
}
</style>
