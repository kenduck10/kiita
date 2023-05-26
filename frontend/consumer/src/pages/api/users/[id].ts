import { NextApiRequest, NextApiResponse } from 'next';
import axios, { HttpStatusCode } from 'axios';
import { BACKEND_API_PATH_BUILDER } from '@/utils/consts/api';

export type GetUserResponse = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const apiPath = BACKEND_API_PATH_BUILDER.USER(Number(id));
  if (request.method === 'GET') {
    const result = await axios
      .get(apiPath)
      .then((response) => {
        return {
          getUserResponse: response.data,
          statusCode: HttpStatusCode.Ok,
        };
      })
      .catch((error) => {
        return {
          getUserResponse: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.getUserResponse);
  }

  if (request.method === 'DELETE') {
    const result = await axios
      .delete(apiPath)
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

  if (request.method === 'PUT') {
    const result = await axios
      .put(apiPath, request.body)
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
