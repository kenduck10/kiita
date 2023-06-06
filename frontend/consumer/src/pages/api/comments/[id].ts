import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_API_PATH_BUILDER } from '@/utils/consts/api';
import { requestDelete } from '@/utils/functions/api';

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const apiPath = BACKEND_API_PATH_BUILDER.COMMENT(Number(id));

  if (request.method === 'DELETE') {
    return requestDelete(apiPath, response);
  }
  return response.status(400);
};

export default handler;
