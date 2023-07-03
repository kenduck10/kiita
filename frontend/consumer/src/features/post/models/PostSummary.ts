import { GetPostsResponseElement } from '@/pages/api/posts';
import { toJapaneseFormatDate } from '@/utils/functions/date';

class PostSummary {
  readonly id: number;
  readonly title: string;
  readonly authorId: number;
  readonly authorName: string;
  readonly publishedAt: string;

  constructor(element: GetPostsResponseElement) {
    this.id = element.postId;
    this.title = element.title;
    this.authorId = element.authorId;
    this.authorName = element.authorName;
    this.publishedAt = toJapaneseFormatDate(element.firstPublishedAt);
  }
}

export default PostSummary;
