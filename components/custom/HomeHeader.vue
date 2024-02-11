<script setup lang="ts">
import NLogout from '../common/icons/NLogout.vue';

const logout = async () => {
  window.localStorage.removeItem('timestamp');
  await navigateTo('/');
};
</script>

<template>
  <header class="home__header" role="banner">
    <NuxtLink to="/home">
      <img
        class="home__header__logo"
        src="~/assets/img/logo_white.png"
        alt="logo_home"
      />
    </NuxtLink>

    <button
      class="home__header__logout-btn"
      title="sair"
      type="button"
      @click="logout"
    >
      <NLogout class="home__header__logout-btn--icon" w="28px" h="28px" />
    </button>
  </header>
</template>

<style>
.home {
  &__header {
    @apply flex items-center justify-between w-full relative sm:px-10 px-4;
    background-color: var(--color-primary);
    grid-area: 1 / 1 / 2 / 2;

    &__logo {
      height: var(--headerHeight - 8px);
      width: 200px;
      object-fit: cover;
    }

    &__logout-btn {
      &--icon {
        @apply text-slate-200;
        width: 32px;
        height: 32px;

        &:hover {
          color: var(--color-tertiary);
        }
      }
    }
  }
}

@media (max-width: 640px) {
  .home__header__logo {
    height: var(--headerHeight - 32px);
    width: 148px;
  }
}
</style>
