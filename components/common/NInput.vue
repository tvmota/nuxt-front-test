<script setup lang="ts">
import { vMaska, type MaskaDetail } from 'maska';
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue', 'handleBlur']);

const props = defineProps({
  errorMsg: {
    type: String,
    default: '',
  },
  fieldName: {
    type: String,
    required: true,
  },
  fieldType: {
    type: String,
    default: 'text',
  },
  fieldPlaceholder: {
    type: String,
    default: '',
  },
  fieldRequired: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  hasMask: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  labelTxt: {
    type: String,
    default: '',
  },
  mask: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'sm',
  },
});

const getSizeClass = computed(() => {
  const sizes = ['sm', 'md', 'lg'];
  if (sizes.includes(props.size.toLowerCase())) {
    return `dt-input__${props.size}`;
  }

  return `dt-input__sm`;
});

const handleInput = (evt: Event) => {
  const target: HTMLInputElement = evt.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleInputMaska = (event: CustomEvent<MaskaDetail>) => {
  emit('update:modelValue', event.detail.masked);
};
</script>

<template>
  <div class="n-input" :class="[getSizeClass]">
    <label class="n-input--label" :class="[getSizeClass]" :for="fieldName">{{
      labelTxt
    }}</label>
    <input
      v-if="!hasMask"
      class="n-input__field"
      :class="[`${hasError && fieldRequired ? 'n-input__field__error' : ''}`]"
      :name="fieldName"
      :placeholder="fieldPlaceholder || labelTxt"
      :type="fieldType"
      :value="modelValue"
      :required="fieldRequired"
      @input="handleInput"
      @blur="emit('handleBlur')"
    />
    <input
      v-else
      v-maska
      class="n-input__field"
      :class="[`${hasError && fieldRequired ? 'n-input__field__error' : ''}`]"
      :data-maska="mask"
      :name="fieldName"
      :placeholder="fieldPlaceholder || labelTxt"
      :type="fieldType"
      :value="modelValue"
      :required="fieldRequired"
      @maska="handleInputMaska"
      @blur="emit('handleBlur')"
    />
    <span v-if="hasError && fieldRequired" class="n-input__field__error--msg">
      {{ errorMsg }}
    </span>
  </div>
</template>

<style>
.n-input {
  @apply mb-3 relative;

  &--label {
    @apply text-sm block font-bold mb-2 text-gray-400 font-thin;
  }

  &__field {
    @apply font-semibold w-full py-2 border border-gray-300 rounded-md focus:outline-none px-3;
    color: var(--color-primary);

    &__error {
      @apply border-red-500;

      &--msg {
        @apply flex items-center font-medium tracking-wide text-red-500 text-xs mt-1;
      }
    }

    &__has-icon {
      .dt-input__field {
        @apply pl-10 pr-2;
      }
    }

    &:focus {
      border: 1px solid var(--color-primary);
    }
  }

  &__sm {
    .n-input--label {
      @apply text-sm;
    }

    .n-input__field {
      @apply py-2 px-2 text-sm;
    }
  }

  &__md {
    .n-input--label {
      @apply text-base;
    }

    .n-input__field {
      @apply py-2 px-3 text-base;
    }
  }

  &__lg {
    .n-input--label {
      @apply text-lg;
    }

    .n-input__field {
      @apply py-3 px-5 text-lg;
    }
  }
}
</style>
