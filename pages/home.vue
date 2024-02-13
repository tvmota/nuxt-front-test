<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import NButton from '@/components/common/NButton.vue';
import NPagination from '~/components/common/NPagination.vue';
import NCloseIcon from '@/components/common/icons/NCloseIcon.vue';
import NPencil from '~/components/common/icons/NPencil.vue';
import type { UserList } from '~/types/user';

definePageMeta({
  layout: 'home',
  middleware: 'auth',
  pageTransition: {
    name: 'page',
    mode: 'in-out',
    onBeforeLeave: (el) => {
      el.parentElement.style.offset = 'hidden';
    },
    onBeforeEnter: (el) => {
      el.parentElement.style.offset = 'auto';
    },
  },
});

type List = {
  users: UserList[][];
};

const localUserList: List = reactive({
  users: [],
});

const currentPage = ref(1);
const totalPages = ref(0);
const perPage = 5;

const onPageChange = (page: number) => (currentPage.value = page);

const chunk = (arr: UserList[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const removeUser = (id: string) => {
  const userList = useStorage('userList', [] as UserList[], localStorage);
  userList.value = userList.value.filter((u) => u.id !== id);
  totalPages.value = Math.ceil(userList.value.length / perPage);
  localUserList.users = chunk(userList.value, perPage);
};

onBeforeMount(() => {
  const userList = useStorage('userList', [] as UserList[], localStorage);
  totalPages.value = Math.ceil(userList.value.length / perPage);
  localUserList.users = chunk(userList.value, perPage);
});
</script>

<template>
  <section class="user-list__content">
    <section class="user-list__content__header">
      <h3 class="user-list__content__header--title">Listagem de Usuários</h3>
      <NButton
        :is-link="true"
        button-text="Novo usuário"
        title="Novo Usuário"
        to="/user"
      />
    </section>

    <section class="user-list__content__main">
      <section class="user-list__content__main__pagination">
        <NPagination
          v-show="localUserList.users.length > 0"
          :total-pages="totalPages"
          :per-page="perPage"
          :total="localUserList.users.length"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        />
      </section>

      <ul
        v-if="localUserList.users.length > 0"
        class="user-list__content__main__list"
      >
        <li
          v-for="user in localUserList.users[currentPage - 1]"
          :key="user.id"
          class="user-list__content__main__list__item"
        >
          <section>
            <p class="user-list__content__main__list__item--txt">
              {{ user.userName }}
            </p>
            <span
              class="user-list__content__main__list__item--subTxt"
              :title="user.email"
            >
              {{ user.email }}
            </span>
          </section>
          <section class="user-list__content__main__list__item__actions">
            <NButton
              variant="neutral"
              size="sm"
              :button-title="`Editar usuário ${user.userName}`"
              :is-link="true"
              :url="`/user/${user.id}`"
            >
              <NPencil
                class="user-list__content__main__list__item__actions--icon"
                w="24px"
                h="24px"
              />
            </NButton>

            <NButton
              variant="neutral"
              size="sm"
              :button-title="`Remover Usuário ${user.userName}`"
              @click="removeUser(user.id)"
            >
              <NCloseIcon
                class="user-list__content__main__list__item__actions--icon"
                w="24px"
                h="24px"
              />
            </NButton>
          </section>
        </li>
      </ul>

      <section v-else class="user-list__content__main__list__no-user">
        <h3>Sem usuários cadastrados</h3>
      </section>
    </section>
  </section>
</template>

<style>
.user-list {
  &__content {
    @apply h-full lg:max-w-5xl md:container mx-auto md:pt-10 sm:pt-1;
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 32px;

    &__header {
      @apply py-2 flex justify-between;

      a {
        @apply w-fit;
      }

      &--title {
        @apply font-semibold capitalize text-lg;
        color: var(--color-primary);
      }
    }

    &__main {
      @apply flex flex-col items-center gap-8;

      &__list {
        @apply flex flex-col gap-3 py-1 pr-1 w-full justify-around;
        max-height: 480px;

        &__item {
          @apply flex justify-between py-3 px-3 md:px-8 shadow-sm rounded-lg border border-slate-300;

          &--txt {
            @apply font-semibold capitalize;
            color: var(--color-primary);
          }

          &--subTxt {
            @apply text-sm font-medium capitalize  sm:w-48 md:w-60 lg:w-fit xl:w-fit w-28 inline-block;
            color: var(--color-secondary--dark);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &__actions {
            @apply flex items-center gap-2 sm:gap-4;

            a,
            button {
              padding: 4px !important;
            }

            &--icon {
              @apply text-slate-200;
              cursor: pointer;

              &:hover {
                color: var(--color-secondary);
              }
            }
          }
        }

        &__no-user {
          @apply flex justify-center items-center w-full py-10 bg-slate-300 rounded-lg;

          h3 {
            @apply text-lg font-semibold;
          }
        }
      }

      &__pagination {
        @apply flex justify-end items-center w-full;
      }
    }
  }
}

@media (max-width: 460px) {
  .user-list__content__header {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
