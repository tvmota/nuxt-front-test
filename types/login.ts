import type { InferType } from 'yup';
import { loginSchema } from '~/schemas/login';

export type LoginModel = InferType<typeof loginSchema>;
