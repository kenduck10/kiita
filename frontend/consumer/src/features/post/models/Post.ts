import { GetPostResponse } from '@/pages/api/posts/[id]';

class Post {
  static readonly TITLE_NAME_MAX_LENGTH = 100;

  readonly id?: number;
  readonly title: string;
  readonly body: string;

  constructor(id: number, response: GetPostResponse) {
    this.id = id;
    this.title = response.title;
    this.body = response.body;
  }
}

export default Post;
