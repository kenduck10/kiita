import { GetPostResponse } from '@/pages/api/posts/[id]';

class Post {
  static readonly TITLE_NAME_MAX_LENGTH = 100;

  readonly id?: number;
  readonly title: string;
  readonly body: string;
  readonly authorId: number;
  readonly authorName: string;
  readonly firstPublishedAt;
  readonly lastPublishedAt;
  readonly isRePublishedAt;

  constructor(id: number, response: GetPostResponse) {
    this.id = id;
    this.title = response.title;
    this.body = response.body;
    this.authorId = response.authorId;
    this.authorName = response.authorName;
    this.firstPublishedAt = response.firstPublishedAt;
    this.lastPublishedAt = response.lastPublishedAt;
    this.isRePublishedAt = response.isRePublished;
  }
}

export default Post;
