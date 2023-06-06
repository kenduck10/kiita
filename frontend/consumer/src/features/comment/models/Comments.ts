import { GetCommentsResponse } from '@/pages/api/posts/[id]/comments';
import Comment from '@/features/comment/models/Comment';

class Comments {
  readonly value: Array<Comment>;

  constructor(response: GetCommentsResponse) {
    this.value = response.comments.map((element) => new Comment(element));
  }
}

export default Comments;
