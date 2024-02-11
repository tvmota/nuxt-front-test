import type { InferType } from 'yup';
import { userSchema } from '~/schemas/user';

export type UserModel = InferType<typeof userSchema>;
export type UserList = UserModel & {
  id: string;
};
