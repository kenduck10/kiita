import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ControlledTextField } from '@/components/molecules/ControlledTextField';
import React from 'react';
import { Control } from 'react-hook-form';

type SubmitArguments = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};
export const UserItemsForm = ({
  control,
  isSubmitting,
  sx,
}: {
  control: Control<SubmitArguments>;
  isSubmitting: boolean;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={sx}>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
        名前
      </Typography>
      <Box mb={2}>
        <ControlledTextField
          control={control}
          name={'lastName'}
          type={'text'}
          label={'姓'}
          disabled={isSubmitting}
          sx={{ mr: 2, width: '120px' }}
        />
        <ControlledTextField
          control={control}
          name={'firstName'}
          type={'text'}
          label={'名'}
          disabled={isSubmitting}
          sx={{ width: '120px' }}
        />
      </Box>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
        メールアドレス
      </Typography>
      <Box mb={4}>
        <ControlledTextField
          control={control}
          name={'mailAddress'}
          type={'email'}
          disabled={isSubmitting}
          sx={{ maxWidth: '400px' }}
          fullWidth={true}
        />
      </Box>
    </Box>
  );
};
