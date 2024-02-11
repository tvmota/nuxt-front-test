import { object, string } from 'yup';

export const loginSchema = object({
  pass: string()
    .required('Senha é requerida')
    .matches(/\b123456789\b/, 'Senha inválida'),
  userName: string()
    .required('Usuário requerido')
    .matches(/\badmin\b/, 'Usuário inválido'),
});
