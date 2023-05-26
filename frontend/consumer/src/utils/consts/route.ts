export const PAGE_PATH = {
  HOME: '/',
  USER_NEW: '/users/new',
  USER_NEW_CONFIRM: '/users/new/confirm',
  ERROR: '/error',
  NOT_FOUND: '/notFound',
} as const;

export const PAGE_PATH_BUILDER = {
  USER_DETAIL: (userId: number) => `/users/${userId}`,
  USER_EDIT: (userId: number) => `/users/edit/${userId}`,
} as const;
