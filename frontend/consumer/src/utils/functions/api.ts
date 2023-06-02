import axios, { HttpStatusCode } from 'axios';
import { NextApiResponse } from 'next';

export const requestDelete = async (apiPath: string, response: NextApiResponse) => {
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
};
