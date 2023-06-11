import { Alert, Box, Button, SxProps, Theme, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ControlledTextareaAutosize } from '@/components/molecules/ControlledTextareaAutosize';
import { useForm } from 'react-hook-form';
import { CommentCreateBody, useCommentCreate } from '@/features/comment/hooks/useCommentCreate';

export const PostCommentForm = ({
  postId,
  onSuccess,
  sx,
}: {
  postId: number;
  onSuccess: () => void;
  sx: SxProps<Theme>;
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { control, handleSubmit, reset, watch } = useForm<CommentCreateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      body: '',
    },
  });
  const isBlankBody = watch('body') === '';
  const { doCreate, isCreating: isCreatingComment } = useCommentCreate(
    postId,
    () => {
      onSuccess();
      reset();
    },
    (errorMessage: string) => {
      setErrorMessage(errorMessage);
    }
  );

  const onClickPost = async (createComment: CommentCreateBody) => {
    setErrorMessage('');
    await doCreate(createComment);
  };

  return (
    <Box sx={sx}>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold', mt: 3 }} textAlign={'left'}>
        コメントする
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box mt={1}>
        <ControlledTextareaAutosize control={control} name={'body'} minRows={10} style={{ width: '100%' }} />
      </Box>
      <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={handleSubmit(onClickPost)}
          sx={{ boxShadow: 'none' }}
          disabled={isCreatingComment || isBlankBody}
        >
          追加する
        </Button>
      </Box>
    </Box>
  );
};
