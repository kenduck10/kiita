import {NextApiRequest, NextApiResponse} from 'next';
import axios, {AxiosResponse, HttpStatusCode} from 'axios';

// type CreateUserResponse = {
//   userId: number;
//   lastName: string;
//   firstLane: string;
// }

export type GetUsersResponse = {
  users: Array<{
    userId: number;
    lastName: string;
    firstName: string;
  }>;
};

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const BASE_URL = `${process.env.KIITA_BACKEND_API_BASE_URL}users`;
  if (request.method === 'GET') {
    const result = await axios.get(BASE_URL).then((response: AxiosResponse<GetUsersResponse>) => response.data);
    return response.status(HttpStatusCode.Ok).json(result);
  }

  if (request.method === 'POST') {
    const result = await axios.post(BASE_URL, request.body);
    console.log(result);
    return response.status(HttpStatusCode.Created);
  }
  return response.status(400);
};

export default handler;
