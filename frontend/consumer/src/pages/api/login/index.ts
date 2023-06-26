import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { BACKEND_API_PATH } from '@/utils/consts/api';

export type LoginResponse = {
  id: number;
  name: string;
  mailAddress: string;
};
export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const result = await axios
      .post(BACKEND_API_PATH.LOGIN, request.body)
      .then((response: AxiosResponse<LoginResponse>) => {
        return {
          member: response.data,
          statusCode: HttpStatusCode.Created,
        };
      })
      .catch((error) => {
        return {
          member: undefined,
          statusCode: error.response.status,
        };
      });
    return response.status(result.statusCode).json(result.member);
  }

  return response.status(400);
};

export default handler;
