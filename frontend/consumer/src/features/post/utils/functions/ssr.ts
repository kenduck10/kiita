import { buildServerSideRedirect } from '@/utils/functions/route';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH, FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';
import PostSummaries from '@/features/post/models/PostSummaries';
import Post from '@/features/post/models/Post';

export const fetchPost = async (postId: number) => {
  const postResponse = await axios
    .get(FRONTEND_API_PATH_BUILDER.POST(postId))
    .then((response) => {
      return {
        post: new Post(postId, response.data),
        status: response.status,
      };
    })
    .catch((error: AxiosError) => {
      return {
        post: undefined,
        status: error.response?.status,
      };
    });

  const status = postResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        post: JSON.parse(JSON.stringify(postResponse.post)),
      },
    };
  }

  if (postResponse.status === HttpStatusCode.NotFound) {
    return buildServerSideRedirect(PAGE_PATH.NOT_FOUND);
  }

  return buildServerSideRedirect(PAGE_PATH.ERROR);
};

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
