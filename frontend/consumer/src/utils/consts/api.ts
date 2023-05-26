const API_SUB_PATH = {
  USERS: '/users',
} as const;

const API_SUB_PATH_BUILDER = {
  USER: (userId: number) => `/users/${userId}`,
} as const;

const FRONTEND_BASE_PATH = process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL;

export const FRONTEND_API_PATH = {
  USERS: FRONTEND_BASE_PATH + API_SUB_PATH.USERS,
} as const;

export const FRONTEND_API_PATH_BUILDER = {
  USER: (userId: number) => FRONTEND_BASE_PATH + API_SUB_PATH_BUILDER.USER(userId),
} as const;

const BACKEND_BASE_PATH = process.env.KIITA_BACKEND_API_BASE_URL;
export const BACKEND_API_PATH = {
  USERS: BACKEND_BASE_PATH + API_SUB_PATH.USERS,
} as const;

export const BACKEND_API_PATH_BUILDER = {
  USER: (userId: number) => BACKEND_BASE_PATH + API_SUB_PATH_BUILDER.USER(userId),
} as const;
