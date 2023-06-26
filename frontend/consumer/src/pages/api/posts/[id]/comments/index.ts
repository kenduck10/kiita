import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { BACKEND_API_PATH_BUILDER } from '@/utils/consts/api';
import { buildXAuthTokenHeader, getAccessToken } from '@/utils/functions/api';

export type GetCommentsResponse = {
  comments: Array<GetCommentsResponseElement>;
};

export type GetCommentsResponseElement = {
  commentId: number;
  body: string;
  commentedAt: string;
  deleted: boolean;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  if (request.method === 'GET') {
    const result = await axios
      .get(BACKEND_API_PATH_BUILDER.POST_COMMENTS(Number(id)))
      .then((response: AxiosResponse<GetCommentsResponse>) => response.data);
    return response.status(HttpStatusCode.Ok).json(result);
  }

  const accessToken = await getAccessToken(request, response);
  if (!accessToken) {
    return response.status(HttpStatusCode.Unauthorized);
  }
  const config = { headers: buildXAuthTokenHeader(accessToken) };

  if (request.method === 'POST') {
    const result = await axios
      .post(BACKEND_API_PATH_BUILDER.POST_COMMENTS(Number(id)), request.body, config)
      .then((response: AxiosResponse<{ commentId: number; statusCode: number }>) => {
        return {
          commentId: response.data,
          statusCode: HttpStatusCode.Created,
        };
      })
      .catch((error) => {
        return {
          commentId: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.commentId);
  }

  return response.status(400);
};

export default handler;
