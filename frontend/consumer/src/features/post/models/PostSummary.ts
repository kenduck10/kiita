import { GetPostsResponseElement } from '@/pages/api/posts';

class PostSummary {
  readonly id: number;
  readonly title: string;

  constructor(element: GetPostsResponseElement) {
    this.id = element.postId;
    this.title = element.title;
  }
}

export default PostSummary;
