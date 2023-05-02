import * as yup from 'yup';
import User from '@/features/user/models/User';

export const LAST_NAME_YUP_SCHEMA = yup
  .string()
  .required('姓の入力は必須です')
  .max(User.LAST_NAME_MAX_LENGTH, `姓は${User.LAST_NAME_MAX_LENGTH}文字以内で入力してください`);
export const FIRST_NAME_YUP_SCHEMA = yup
  .string()
  .required('名の入力は必須です')
  .max(User.FIRST_NAME_MAX_LENGTH, `名は${User.FIRST_NAME_MAX_LENGTH}文字以内で入力してください`);
