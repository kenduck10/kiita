import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'GET') {
    const result = await (await fetch(`${process.env.KIITA_BACKEND_API_BASE_URL}users`)).json();
    return response.status(200).json(result);
  }
  return response.status(400);
};

export default handler;
