import { object, string } from 'yup';
import type { InferType } from 'yup';

export const userSchema = object({
  userName: string().required('Usuário requerido'),
  email: string().required('E-mail requerido').email('E-mail inválido'),
  pass: string().required('Senha requerida'),
});

export type UserModel = InferType<typeof userSchema>;
