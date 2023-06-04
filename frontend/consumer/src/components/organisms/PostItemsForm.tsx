import { Box, SxProps, Theme } from '@mui/material';
import { ControlledTextField } from '@/components/molecules/ControlledTextField';
import React from 'react';
import { Control } from 'react-hook-form';
import { ControlledTextareaAutosize } from '@/components/molecules/ControlledTextareaAutosize';

type SubmitArguments = {
  title: string;
  body: string;
};
export const PostItemsForm = ({
  control,
  isLoading,
  sx,
}: {
  control: Control<SubmitArguments>;
  isLoading: boolean;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={sx}>
      <ControlledTextField
        control={control}
        name={'title'}
        type={'text'}
        disabled={isLoading}
        label={'タイトル'}
        fullWidth={true}
        id={'title-field'}
        sx={{ backgroundColor: 'white' }}
      />
      <Box mt={3}>
        <ControlledTextareaAutosize control={control} name={'body'} minRows={30} style={{ width: '100%' }} />
      </Box>
    </Box>
  );
};
