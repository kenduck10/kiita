import * as yup from 'yup';

export const BODY_YUP_SCHEMA = yup.string().required('コメントの入力は必須です');
