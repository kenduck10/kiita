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
  isLoading,
  sx,
}: {
  control: Control<SubmitArguments>;
  isLoading: boolean;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={sx}>
      <Typography id={'name-headline'} variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
        名前
      </Typography>
      <Box mb={2}>
        <ControlledTextField
          control={control}
          name={'lastName'}
          type={'text'}
          label={'姓'}
          disabled={isLoading}
          sx={{ mr: 2, width: '120px' }}
          id={'last-name-field'}
        />
        <ControlledTextField
          control={control}
          name={'firstName'}
          type={'text'}
          label={'名'}
          disabled={isLoading}
          sx={{ width: '120px' }}
          id={'first-name-field'}
        />
      </Box>
      <Typography id={'mail-address-headline'} variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
        メールアドレス
      </Typography>
      <Box mb={4}>
        <ControlledTextField
          control={control}
          name={'mailAddress'}
          type={'email'}
          disabled={isLoading}
          sx={{ maxWidth: '400px' }}
          fullWidth={true}
          id={'mail-address-field'}
        />
      </Box>
    </Box>
  );
};
