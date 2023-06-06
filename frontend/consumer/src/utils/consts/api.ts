const API_SUB_PATH = {
  USERS: '/users',
  POSTS: '/posts',
} as const;

const API_SUB_PATH_BUILDER = {
  USER: (userId: number) => `/users/${userId}`,
  POST: (postId: number) => `/posts/${postId}`,
  POST_COMMENTS: (postId: number) => `/posts/${postId}/comments`,
  COMMENT: (commentId: number) => `/comments/${commentId}`,
} as const;

const FRONTEND_BASE_PATH = process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL;

export const FRONTEND_API_PATH = {
  USERS: FRONTEND_BASE_PATH + API_SUB_PATH.USERS,
  POSTS: FRONTEND_BASE_PATH + API_SUB_PATH.POSTS,
} as const;

export const FRONTEND_API_PATH_BUILDER = {
  USER: (userId: number) => FRONTEND_BASE_PATH + API_SUB_PATH_BUILDER.USER(userId),
  POST: (postId: number) => FRONTEND_BASE_PATH + API_SUB_PATH_BUILDER.POST(postId),
  POST_COMMENTS: (postId: number) => FRONTEND_BASE_PATH + API_SUB_PATH_BUILDER.POST_COMMENTS(postId),
  COMMENT: (commentId: number) => FRONTEND_BASE_PATH + API_SUB_PATH_BUILDER.COMMENT(commentId),
} as const;

const BACKEND_BASE_PATH = process.env.KIITA_BACKEND_API_BASE_URL;
export const BACKEND_API_PATH = {
  USERS: BACKEND_BASE_PATH + API_SUB_PATH.USERS,
  POSTS: BACKEND_BASE_PATH + API_SUB_PATH.POSTS,
} as const;

export const BACKEND_API_PATH_BUILDER = {
  USER: (userId: number) => BACKEND_BASE_PATH + API_SUB_PATH_BUILDER.USER(userId),
  POST: (postId: number) => BACKEND_BASE_PATH + API_SUB_PATH_BUILDER.POST(postId),
  POST_COMMENTS: (postId: number) => BACKEND_BASE_PATH + API_SUB_PATH_BUILDER.POST_COMMENTS(postId),
  COMMENT: (commentId: number) => BACKEND_BASE_PATH + API_SUB_PATH_BUILDER.COMMENT(commentId),
} as const;
