import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { BACKEND_API_PATH } from '@/utils/consts/api';

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const result = await axios
      .post(BACKEND_API_PATH.MEMBERS, request.body)
      .then((response: AxiosResponse<{ memberId: number; statusCode: number }>) => {
        return {
          memberId: response.data,
          statusCode: HttpStatusCode.Created,
        };
      })
      .catch((error) => {
        return {
          memberId: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.memberId);
  }

  return response.status(400);
};

export default handler;
