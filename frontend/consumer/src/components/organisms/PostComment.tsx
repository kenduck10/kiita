import { Typography } from '@mui/material';
import React from 'react';
import Comment from '@/features/comment/models/Comment';

export const PostComment = ({ comment }: { comment: Comment }) => {
  return <Typography>{comment.body}</Typography>;
};
