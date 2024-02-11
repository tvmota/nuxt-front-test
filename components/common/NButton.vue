<script setup lang="ts">
import { computed } from 'vue';
import type { PropType, ButtonHTMLAttributes } from 'vue';

const props = defineProps({
  buttonType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  buttonTitle: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'sm',
  },
  url: {
    type: String,
    default: '',
  },
});

const getVariantClass = computed(() => {
  const variants = ['primary', 'secondary', 'neutral'];
  if (variants.includes(props.variant.toLowerCase())) {
    return `n-btn__${props.variant}`;
  }

  return `n-btn__primary`;
});

const getSizeClass = computed(() => {
  const sizes = ['sm', 'md', 'lg'];
  if (sizes.includes(props.size.toLowerCase())) {
    return `n-btn__${props.size}`;
  }

  return `n-btn__sm`;
});
</script>

<template>
  <NuxtLink
    v-if="isLink"
    class="n-btn"
    :class="[getVariantClass, getSizeClass]"
    :title="buttonText || buttonTitle"
    :to="url"
    v-bind="$attrs"
  >
    <slot>{{ buttonText }}</slot>
  </NuxtLink>

  <button
    v-else
    class="n-btn"
    :class="[getVariantClass, getSizeClass]"
    :type="buttonType"
    :title="buttonText || buttonTitle"
    v-bind="$attrs"
  >
    <slot>{{ buttonText }}</slot>
  </button>
</template>

<style>
.n-btn {
  @apply rounded-md
    font-bold
    uppercase
    shadow-md
  text-white
    transition-all
    hover:shadow-md
    focus:shadow-none
    active:shadow-none
    disabled:pointer-events-none
    disabled:opacity-50
    disabled:shadow-none;

  &__sm {
    @apply py-2 px-4 text-xs;
  }

  &__md {
    @apply py-3 px-6 text-sm;
  }

  &__lg {
    @apply py-3.5 px-7 text-base;
  }

  &__primary {
    @apply active:opacity-[0.9] focus:opacity-[0.9];
    background-color: var(--color-primary);
    &:hover {
      box-shadow:
        0 4px 6px -1px var(--color-primary),
        0 2px 4px -2px var(--color-primary);
    }
  }

  &__secondary {
    @apply active:opacity-[0.75] focus:opacity-[0.75];
    background-color: var(--color-secondary);
    &:hover {
      box-shadow:
        0 4px 6px -1px var(--color-secondary),
        0 2px 4px -2px var(--color-secondary);
    }
  }

  &__neutral {
    background-color: var(--color-tertiary);
    &:hover {
      box-shadow:
        0 4px 6px -1px var(--color-tertiary),
        0 2px 4px -2px var(--color-tertiary);
    }
  }
}
</style>
