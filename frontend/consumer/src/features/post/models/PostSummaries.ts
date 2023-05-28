import PostSummary from '@/features/post/models/PostSummary';
import { GetPostsResponse } from '@/pages/api/posts';

class PostSummaries {
  readonly value: Array<PostSummary>;

  constructor(response: GetPostsResponse) {
    this.value = response.posts.map((element) => new PostSummary(element));
  }
}

export default PostSummaries;
