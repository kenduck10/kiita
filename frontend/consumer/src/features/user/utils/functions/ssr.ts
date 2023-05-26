import { buildServerSideRedirect } from '@/utils/functions/route';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import User from '@/features/user/models/User';
import UserSummaries from '@/features/user/models/UserSummaries';
import { PAGE_PATH } from '@/utils/consts/route';

export const fetchUser = async (userId: number) => {
  const userResponse = await axios
    .get(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${userId}`)
    .then((response) => {
      return {
        user: new User(userId, response.data),
        status: response.status,
      };
    })
    .catch((error: AxiosError) => {
      return {
        user: undefined,
        status: error.response?.status,
      };
    });

  const status = userResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(userResponse.user)),
      },
    };
  }

  if (userResponse.status === HttpStatusCode.NotFound) {
    return buildServerSideRedirect(PAGE_PATH.NOT_FOUND);
  }

  return buildServerSideRedirect(PAGE_PATH.ERROR);
};
export const fetchUserSummaries = async () => {
  const userSummariesResponse = await axios
    .get(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`)
    .then((response) => {
      return {
        userSummaries: new UserSummaries(response.data),
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        userSummaries: undefined,
        status: error.status,
      };
    });

  const status = userSummariesResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        userSummaries: JSON.parse(JSON.stringify(userSummariesResponse.userSummaries)),
      },
    };
  }

  return buildServerSideRedirect(PAGE_PATH.ERROR);
};
