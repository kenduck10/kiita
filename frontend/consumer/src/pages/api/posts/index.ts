import {NextApiRequest, NextApiResponse} from 'next';
import axios, {AxiosResponse, HttpStatusCode} from 'axios';
import {BACKEND_API_PATH} from '@/utils/consts/api';

// type CreateUserResponse = {
//   userId: number;
//   lastName: string;
//   firstLane: string;
//   mailAddress: string;
// };

export type GetUsersResponse = {
  users: Array<GetUsersResponseElement>;
};

export type GetUsersResponseElement = {
  userId: number;
  lastName: string;
  firstName: string;
  mailAddress: string;
};

export type GetPostsResponse = {
  posts: Array<GetPostsResponseElement>;
};

export type GetPostsResponseElement = {
  postId: number;
  title: string;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    const result = await axios
      .get(BACKEND_API_PATH.POSTS)
      .then((response: AxiosResponse<GetPostsResponse>) => response.data);
    return response.status(HttpStatusCode.Ok).json(result);
  }

  if (request.method === 'POST') {
    const result = await axios
      .post(BACKEND_API_PATH.POSTS, request.body)
      .then((response: AxiosResponse<{ postId: number; statusCode: number }>) => {
        return {
          postId: response.data,
          statusCode: HttpStatusCode.Created,
        };
      })
      .catch((error) => {
        return {
          postId: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.postId);
  }

  return response.status(400);
};

export default handler;
