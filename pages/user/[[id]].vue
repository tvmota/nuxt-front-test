<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { toast } from 'vue3-toastify';
import NInput from '@/components/common/NInput.vue';
import NButton from '@/components/common/NButton.vue';
import { userSchema } from '@/schemas/user';
import type { UserModel, UserList } from '@/types/user';
import type { ValidationError } from 'yup';

definePageMeta({
  layout: 'home',
  middleware: 'auth',
});

const route = useRoute();
const { id } = route.params;

const userModel: UserModel = reactive({
  userName: '',
  email: '',
  pass: '',
});

const userErr: UserModel = reactive({
  userName: '',
  email: '',
  pass: '',
});

const cleanErr = (field: keyof UserModel) => {
  if (userErr[field].length > 0) {
    userErr[field] = '';
  }
};

const successAlert = (msg: string) =>
  toast(msg, {
    type: 'success',
    position: toast.POSITION.TOP_RIGHT,
    onClose: () => navigateTo('/home'),
  });

const handleSubmit = async () => {
  try {
    const userList = useStorage('userList', [] as UserList[], localStorage);
    await userSchema.validate(userModel, { abortEarly: false });

    if (id) {
      const idx = userList.value.findIndex((u) => u.id === id);
      userList.value[idx].email = userModel.email;
      userList.value[idx].userName = userModel.userName;
      userList.value[idx].pass = userModel.pass;
      successAlert('Usuário salvo com sucesso');
    } else {
      userList.value.push({
        id: window.crypto.randomUUID(),
        ...userModel,
      });
      successAlert('Usuário cadastrado com sucesso');
    }
  } catch (err) {
    const parsed: ValidationError = err as ValidationError;
    const errors = extractSchemaErr(parsed.inner);

    errors.forEach((err) => {
      const item: keyof UserModel = err.item as keyof UserModel;
      userErr[item] = err.message;
    });
  }
};

const findUser = () => {
  const userList = useStorage('userList', [] as UserList[], localStorage);
  if (id) {
    const user = userList.value.find((u) => u.id === id);
    userModel.userName = user?.userName || '';
    userModel.email = user?.email || '';
    userModel.pass = user?.pass || '';
  }
};

findUser();
</script>

<template>
  <section class="user-edit__content">
    <section class="user-edit__content__header">Editar Usuário</section>
    <form novalidate autocomplete="off" @submit.prevent="handleSubmit">
      <NInput
        v-model="userModel.userName"
        field-name="inptUserName"
        field-placeholder="Nome de usuário"
        label-txt="Usuário"
        :field-required="true"
        :has-error="userErr.userName.length > 0"
        :error-msg="userErr.userName"
        field-type="text"
        @handle-blur="cleanErr('userName')"
      />
      <NInput
        v-model="userModel.email"
        field-name="inptUserEmail"
        field-placeholder="E-mail"
        label-txt="E-mail"
        :field-required="true"
        :has-error="userErr.email.length > 0"
        :error-msg="userErr.email"
        field-type="email"
        @handle-blur="cleanErr('email')"
      />
      <NInput
        v-model="userModel.pass"
        field-name="inptUserPass"
        field-placeholder="Senha"
        label-txt="Senha"
        :field-required="true"
        :has-error="userErr.pass.length > 0"
        :error-msg="userErr.pass"
        field-type="password"
        @handle-blur="cleanErr('pass')"
      />

      <section class="user-edit__content__frm__actions">
        <NButton
          variant="neutral"
          button-type="button"
          size="sm"
          :is-link="true"
          url="/home"
        >
          voltar
        </NButton>
        <NButton size="sm" button-type="submit"> salvar </NButton>
      </section>
    </form>
  </section>
</template>

<style>
.user-edit {
  &__content {
    @apply h-full lg:max-w-5xl md:container mx-auto pt-10;
    display: grid;
    grid-template-rows: auto 1fr;
    row-gap: 2rem;

    &__header {
      @apply text-lg font-semibold capitalize;
      color: var(--color-primary);
    }

    &__frm {
      &__actions {
        @apply flex gap-2 justify-end pt-10;
      }
    }
  }
}
</style>
