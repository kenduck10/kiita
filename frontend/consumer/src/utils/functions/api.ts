import axios, { AxiosRequestConfig, HttpStatusCode } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const requestDelete = async (apiPath: string, response: NextApiResponse, config?: AxiosRequestConfig) => {
  const result = await axios
    .delete(apiPath, config)
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
};

export const buildXAuthTokenHeader = (accessToken: string) => {
  return {
    'x-auth-token': 'Bearer ' + accessToken,
  };
};

export const getAccessToken = async (request: NextApiRequest, response: NextApiResponse) => {
  return (await getServerSession(request, response, authOptions))?.user.accessToken;
};
