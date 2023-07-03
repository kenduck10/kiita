import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Comment from '@/features/comment/models/Comment';
import { SelectDialog } from '@/components/molecules/SelectDialog';
import { useCommentDelete } from '@/features/comment/hooks/useCommentDelete';

export const PostComment = ({ comment, onDeleteComment }: { comment: Comment; onDeleteComment: () => void }) => {
  const commentId = comment.commentId;
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const { doDelete, isDeleting, errorMessage } = useCommentDelete(commentId, () => {
    setIsOpenDeleteDialog(false);
    onDeleteComment();
  });

  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };

  const onClickDeleteAgreement = () => {
    doDelete().then();
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>{`@${comment.commenterName}`}</Typography>
        </Box>
        <Box>
          <Typography>{comment.commentedAt}</Typography>
        </Box>
      </Box>
      <Box mt={1}>
        <Typography>{comment.body}</Typography>
      </Box>
      {!comment.isDeleted && (
        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
          <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isDeleting}>
            削除
          </Button>
        </Box>
      )}
      <SelectDialog
        open={isOpenDeleteDialog}
        onClose={() => setIsOpenDeleteDialog(false)}
        dialogTitle={'本当に削除しますか？'}
        dialogContentText={'削除したコメントは元に戻すことができません'}
        dialogButtons={[
          { action: onClickDeleteCancel, label: 'キャンセル', color: 'secondary' },
          { action: onClickDeleteAgreement, label: '削除', color: 'error' },
        ]}
        isLoading={isDeleting}
      />
    </>
  );
};
