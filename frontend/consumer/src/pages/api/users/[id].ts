import { NextApiRequest, NextApiResponse } from 'next';
import axios, { HttpStatusCode } from 'axios';

export type GetUserResponse = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const BASE_URL = `${process.env.KIITA_BACKEND_API_BASE_URL}users/${id}`;
  if (request.method === 'GET') {
    const result = await axios
      .get(BASE_URL)
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
    return response.status(HttpStatusCode.Ok).json(result.getUserResponse);
  }

  if (request.method === 'DELETE') {
    const result = await axios
      .delete(BASE_URL)
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
      .put(BASE_URL, request.body)
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
