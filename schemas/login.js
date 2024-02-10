import { object, string } from 'yup';

export const loginSchema = object({
  pass: string()
    .required('O campo nome é requerido')
    .matches(/(123456789)/, 'Senha inválido'),
  userName: string()
    .required('Usuário requerido')
    .matches(/(admin)/, 'Usuário inválida'),
});
