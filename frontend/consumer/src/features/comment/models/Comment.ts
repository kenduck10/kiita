import { GetCommentsResponseElement } from '@/pages/api/posts/[id]/comments';

class Comment {
  readonly commentId: number;
  readonly commenterId: number;
  readonly commenterName: string;
  readonly body: string;
  readonly commentedAt: Date;
  readonly isDeleted: boolean;

  constructor(element: GetCommentsResponseElement) {
    this.commentId = element.commentId;
    this.commenterId = element.commenterId;
    this.commenterName = element.commenterName;
    this.body = element.body;
    this.commentedAt = new Date(element.commentedAt);
    this.isDeleted = element.deleted;
  }
}

export default Comment;
