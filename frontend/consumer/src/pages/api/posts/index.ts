import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { BACKEND_API_PATH } from '@/utils/consts/api';
import { buildXAuthTokenHeader, getAccessToken } from '@/utils/functions/api'; // type CreateUserResponse = {

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

  const accessToken = await getAccessToken(request, response);
  if (request.method === 'POST') {
    if (!accessToken) {
      return response.status(HttpStatusCode.Unauthorized);
    }
    const result = await axios
      .post(BACKEND_API_PATH.POSTS, request.body, {
        headers: buildXAuthTokenHeader(accessToken),
      })
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
