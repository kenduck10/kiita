import { GetCommentsResponseElement } from '@/pages/api/posts/[id]/comments';

class Comment {
  readonly commentId: number;
  readonly body: string;
  readonly commentedAt: string;
  readonly isDeleted: boolean;

  constructor(element: GetCommentsResponseElement) {
    this.commentId = element.commentId;
    this.body = element.body;
    this.commentedAt = element.commentedAt;
    this.isDeleted = element.deleted;
  }
}

export default Comment;
