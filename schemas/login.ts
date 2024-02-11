import { object, string } from 'yup';
import type { InferType } from 'yup';

export const loginSchema = object({
  pass: string()
    .required('Senha é requerida')
    .matches(/(123456789)/, 'Senha inválida'),
  userName: string()
    .required('Usuário requerido')
    .matches(/(admin)/, 'Usuário inválido'),
});

export type LoginModel = InferType<typeof loginSchema>;
