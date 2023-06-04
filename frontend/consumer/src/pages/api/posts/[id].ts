import { NextApiRequest, NextApiResponse } from 'next';
import axios, { HttpStatusCode } from 'axios';
import { BACKEND_API_PATH_BUILDER } from '@/utils/consts/api';
import { requestDelete } from '@/utils/functions/api';

export type GetPostResponse = {
  title: string;
  body: string;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const apiPath = BACKEND_API_PATH_BUILDER.POST(Number(id));
  if (request.method === 'GET') {
    const result = await axios
      .get(apiPath)
      .then((response) => {
        return {
          getPostResponse: response.data,
          statusCode: HttpStatusCode.Ok,
        };
      })
      .catch((error) => {
        return {
          getPostResponse: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.getPostResponse);
  }

  if (request.method === 'DELETE') {
    return requestDelete(apiPath, response);
  }

  if (request.method === 'PATCH') {
    const result = await axios
      .patch(apiPath, request.body)
      .then(() => {
        return {
          statusCode: HttpStatusCode.Ok,
        };
      })
      .catch((error) => {
        return {
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(null);
  }
};

export default handler;
