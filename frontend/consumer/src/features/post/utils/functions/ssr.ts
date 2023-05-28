import {buildServerSideRedirect} from '@/utils/functions/route';
import axios, {HttpStatusCode} from 'axios';
import {PAGE_PATH} from '@/utils/consts/route';
import {FRONTEND_API_PATH} from '@/utils/consts/api';
import PostSummaries from '@/features/post/models/PostSummaries';

// export const fetchUser = async (userId: number) => {
//   const userResponse = await axios
//     .get(FRONTEND_API_PATH_BUILDER.USER(userId))
//     .then((response) => {
//       return {
//         user: new User(userId, response.data),
//         status: response.status,
//       };
//     })
//     .catch((error: AxiosError) => {
//       return {
//         user: undefined,
//         status: error.response?.status,
//       };
//     });
//
//   const status = userResponse.status;
//   if (status === HttpStatusCode.Ok) {
//     return {
//       props: {
//         user: JSON.parse(JSON.stringify(userResponse.user)),
//       },
//     };
//   }
//
//   if (userResponse.status === HttpStatusCode.NotFound) {
//     return buildServerSideRedirect(PAGE_PATH.NOT_FOUND);
//   }
//
//   return buildServerSideRedirect(PAGE_PATH.ERROR);
// };
export const fetchPostSummaries = async () => {
  const postSummariesResponse = await axios
    .get(FRONTEND_API_PATH.POSTS)
    .then((response) => {
      return {
        postSummaries: new PostSummaries(response.data),
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        postSummaries: undefined,
        status: error.status,
      };
    });

  const status = postSummariesResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        postSummaries: JSON.parse(JSON.stringify(postSummariesResponse.postSummaries)),
      },
    };
  }

  return buildServerSideRedirect(PAGE_PATH.ERROR);
};
