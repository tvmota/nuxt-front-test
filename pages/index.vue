<script setup lang="ts">
import { useStorage } from '@vueuse/core';

import NInput from '@/components/common/NInput.vue';
import NButton from '@/components/common/NButton.vue';
import { loginSchema } from '@/schemas/login';
import { extractSchemaErr } from '@/utils/form';
import type { ValidationError } from 'yup';
import type { LoginModel } from '@/types/login';

const loginModel: LoginModel = reactive({
  userName: '',
  pass: '',
});

const loginErr: LoginModel = reactive({
  userName: '',
  pass: '',
});

const handlesubmit = async () => {
  try {
    await loginSchema.validate(loginModel, { abortEarly: false });
    const timestamp = useStorage('timestamp', '', localStorage);
    timestamp.value = '';
    timestamp.value = new Date(new Date().getTime() + 30 * 60000).toISOString();
    await navigateTo('/home');
  } catch (err) {
    const parsed: ValidationError = err as ValidationError;
    const errors = extractSchemaErr(parsed.inner);

    errors.forEach((err) => {
      const item: keyof LoginModel = err.item as keyof LoginModel;
      loginErr[item] = err.message;
    });
  }
};

const cleanErr = (field: keyof LoginModel) => {
  if (loginModel[field].length > 0) {
    loginErr[field] = '';
  }
};
</script>

<template>
  <div class="login__container">
    <div class="login__content">
      <div class="login__content__logo">
        <img alt="logo" src="~/assets/img/logo_white.png" />
      </div>
      <div class="login__content__main">
        <div class="login__content__main__header">
          <h3>Bem-vindo</h3>
          <p>Insira seus dados para acessar sua conta</p>
        </div>
        <form
          class="login__content__main__frm"
          novalidate
          @submit.prevent="handlesubmit"
        >
          <NInput
            v-model="loginModel.userName"
            field-name="inptUserLogin"
            field-placeholder="Nome de usuário"
            label-txt="Usuário"
            :field-required="true"
            :has-error="loginErr.userName.length > 0"
            :error-msg="loginErr.userName"
            field-type="text"
            @handle-blur="cleanErr('userName')"
          />
          <NInput
            v-model="loginModel.pass"
            field-name="inptPassLogin"
            field-placeholder="Senha"
            label-txt="Senha"
            :field-required="true"
            :has-error="loginErr.pass.length > 0"
            :error-msg="loginErr.pass"
            field-type="password"
            @handle-blur="cleanErr('pass')"
          />

          <NButton class="w-full h-12 mt-6" button-type="submit">
            Sign In
          </NButton>
        </form>
      </div>
      <div class="login__content__link">
        <span>
          Esqueceu sua senha?&nbsp;
          <a href="#">Redefinir</a>

          <NuxtLink to="/home">Home</NuxtLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.login {
  &__container {
    background-image: url('~/assets/img/trucks.jpg');
    background-repeat: no-repeat, repeat;
    background-size: cover;
    background-position: center;
    background-blend-mode: color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      display: flex;
      background-color: var(--color-secondary);
      opacity: 0.7;
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    width: 460px;
    position: absolute;
    display: flex;
    gap: 20px;
    flex-direction: column;

    &__logo {
      display: flex;
      justify-content: center;
      height: 60px;

      img {
        object-fit: cover;
        height: 100%;
        width: 220px;
      }
    }

    &__link {
      @apply text-sm text-gray-400;
      text-align: center;
      span {
        font-weight: 400;
      }

      a {
        @apply text-white;
        font-weight: 600;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    &__main {
      border-radius: 10px;
      background: #ffffff;
      height: 100%;
      width: 100%;
      padding: 42px 82px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;

      &__header {
        h3 {
          @apply text-3xl font-bold;
          color: var(--color-primary);
          margin-bottom: 16px;
          text-align: center;
        }

        p {
          @apply text-base font-semibold text-gray-400;
        }
      }

      &__frm {
        width: 100%;
      }
    }
  }
}

@media (max-width: 460px) {
  .login__content {
    width: calc(100% - 16px);
  }

  .login__content__main {
    height: 460px;
    padding: 24px 36px;
  }
}
</style>
