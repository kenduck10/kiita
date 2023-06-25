import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_API_PATH_BUILDER } from '@/utils/consts/api';
import { buildXAuthTokenHeader, getAccessToken, requestDelete } from '@/utils/functions/api';
import { HttpStatusCode } from 'axios';

export const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const apiPath = BACKEND_API_PATH_BUILDER.COMMENT(Number(id));

  const accessToken = await getAccessToken(request, response);
  if (!accessToken) {
    return response.status(HttpStatusCode.Unauthorized);
  }

  const config = { headers: buildXAuthTokenHeader(accessToken) };

  if (request.method === 'DELETE') {
    return requestDelete(apiPath, response, config);
  }
  return response.status(400);
};

export default handler;
