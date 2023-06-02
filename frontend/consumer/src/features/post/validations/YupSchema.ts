import * as yup from 'yup';
import Post from '@/features/post/models/Post';

export const TITLE_YUP_SCHEMA = yup
  .string()
  .required('タイトルの入力は必須です')
  .max(Post.TITLE_NAME_MAX_LENGTH, `タイトルは${Post.TITLE_NAME_MAX_LENGTH}文字以内で入力してください`);
